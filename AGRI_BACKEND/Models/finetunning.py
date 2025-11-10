"""
train_agri_lora.py

Adaptive fine-tuning (LoRA) for EleutherAI/gpt-neo-1.3B on an agriculture QA dataset.

Requirements (from shell):
  pip install transformers accelerate datasets peft bitsandbytes sentencepiece
"""

import os
from dataclasses import dataclass
from typing import Dict, Any, List

import torch
from datasets import load_dataset
from transformers import (
    AutoTokenizer,
    AutoModelForCausalLM,
    Trainer,
    TrainingArguments,
    DataCollatorForLanguageModeling,
)

from peft import LoraConfig, get_peft_model, TaskType, prepare_model_for_kbit_training

# ---------- Config (edit these) ----------
MODEL_NAME = "EleutherAI/gpt-neo-1.3B"   # ~1.3B
HF_DATASET = "KisanVaani/agriculture-qa-english-only"  # farming QA dataset
OUTPUT_DIR = "./agri_gptneo_lora"

# training hyperparams
NUM_EPOCHS = 3
LEARNING_RATE = 2e-4
PER_DEVICE_BATCH = 4            # per GPU batch size
GRAD_ACCUM_STEPS = 8           # increase effective batch size
MAX_LENGTH = 512               # max tokens per example (prompt+answer)
WEIGHT_DECAY = 0.0
LR_SCHEDULER_TYPE = "linear"
WARMUP_STEPS = 100
FP16 = True                    # use mixed precision if GPU supports it
SEED = 42
# ----------------------------------------

# Small utility: build instruction-style prompt from QA pair
def build_prompt(question: str, answer: str) -> str:
    """
    Create an instruction-answer style prompt suitable for causal LM fine-tuning.
    Keep it simple and consistent so model learns the pattern.
    """
    # You can customize language, add system instruction, or multilingual patterns.
    prompt = (
        "Instruction: You are an expert agronomist. Answer the user's query concisely.\n\n"
        f"Question: {question.strip()}\n\n"
        "Answer:"
    )
    # We'll append the ground-truth answer as labels for teacher forcing
    return prompt + " " + answer.strip()

# Main
def main():
    torch.manual_seed(SEED)

    # 1) Load dataset from Hugging Face
    print("Loading dataset:", HF_DATASET)
    ds = load_dataset(HF_DATASET)  # expects train split; dataset may have 'train'
    # check splits
    print("Dataset splits:", ds.keys())

    # 2) Convert QA rows to instruction-following text pairs
    # adapt to dataset field names - many datasets use 'question' and 'answer' or similar
    def to_prompt_example(ex):
        # try multiple field names gracefully
        q = ex.get("question") or ex.get("QUESTION") or ex.get("Question") or ex.get("QUESTION.question") or ex.get("QUESTION.question")
        a = ex.get("answer") or ex.get("ANSWER") or ex.get("Answer") or ex.get("answer_text") or ex.get("ANSWER.answer")
        # Some datasets have nested keys; fallback to common names
        if q is None:
            # inspect possible fields
            keys = list(ex.keys())
            # try likely options
            for k in keys:
                if "question" in k.lower():
                    q = ex[k]
        if a is None:
            keys = list(ex.keys())
            for k in keys:
                if "answer" in k.lower() or "response" in k.lower():
                    a = ex[k]
        if q is None or a is None:
            # If missing, treat full text as answer or skip
            return {"text": None}
        text = build_prompt(q, a)
        return {"text": text}

    print("Building prompts...")
    ds = ds.map(lambda ex: to_prompt_example(ex), remove_columns=ds["train"].column_names, batched=False)
    # filter out any None
    ds = ds.filter(lambda ex: ex["text"] is not None)
    print("After mapping -> first example:\n", ds["train"][0]["text"][:500])

    # 3) Tokenizer and model load (8-bit + device_map=auto)
    print("Loading tokenizer and model (8-bit)...")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME, use_fast=True)
    # ensure tokenizer has pad and eos tokens
    if tokenizer.pad_token is None:
        tokenizer.add_special_tokens({"pad_token": "<|pad|>"})
    if tokenizer.eos_token is None:
        tokenizer.add_special_tokens({"eos_token": ""})

    # Load model in 8-bit to save memory
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        load_in_8bit=True,            # requires bitsandbytes
        device_map="auto",            # auto device placement
        torch_dtype=torch.float16,
    )

    # resize token embeddings if tokenizer changed (pad_token added)
    model.resize_token_embeddings(len(tokenizer))

    # prepare model for k-bit training (patches LayerNorm + disabled gradients where appropriate)
    model = prepare_model_for_kbit_training(model)

    # 4) Apply LoRA (PEFT)
    # You can change target_modules to selectively adapt e.g., ['q_proj','v_proj','o_proj'] depending on model architecture
    lora_config = LoraConfig(
        r=16,                 # rank
        lora_alpha=32,
        target_modules=["q_proj", "v_proj"],  # common choice; may differ by architecture
        lora_dropout=0.05,
        bias="none",
        task_type=TaskType.CAUSAL_LM
    )
    model = get_peft_model(model, lora_config)
    model.print_trainable_parameters()  # show LoRA params count

    # 5) Tokenize dataset (concatenate prompt+answer already in single text)
    def tokenize_fn(examples):
        # pad/truncate to MAX_LENGTH
        out = tokenizer(
            examples["text"],
            truncation=True,
            max_length=MAX_LENGTH,
            padding=False,  # we will collate later
        )
        # For causal LM, labels == input_ids (we don't shift here; Trainer does internally)
        out["labels"] = out["input_ids"].copy()
        return out

    print("Tokenizing dataset...")
    tokenized = ds.map(tokenize_fn, batched=True, remove_columns=["text"])
    print("Tokenized dataset example keys:", tokenized["train"].column_names)
    print("Num train samples:", len(tokenized["train"]))

    # 6) Data collator for causal LM (pad to batch max length)
    data_collator = DataCollatorForLanguageModeling(
        tokenizer=tokenizer,
        mlm=False,  # causal LM
    )

    # 7) TrainingArguments & Trainer
    training_args = TrainingArguments(
        output_dir=OUTPUT_DIR,
        per_device_train_batch_size=PER_DEVICE_BATCH,
        gradient_accumulation_steps=GRAD_ACCUM_STEPS,
        num_train_epochs=NUM_EPOCHS,
        learning_rate=LEARNING_RATE,
        weight_decay=WEIGHT_DECAY,
        warmup_steps=WARMUP_STEPS,
        fp16=FP16,
        evaluation_strategy="no",
        save_strategy="epoch",
        save_total_limit=3,
        logging_steps=50,
        optim="adamw_torch",
        report_to="none",
    )

    trainer = Trainer(
        model=model,
        args=training_args,
        train_dataset=tokenized["train"],
        data_collator=data_collator,
        tokenizer=tokenizer,
    )

    # 8) Train
    print("Starting training...")
    trainer.train()

    # 9) Save LoRA adapters and tokenizer (small)
    print("Saving peft adapters to", OUTPUT_DIR)
    model.save_pretrained(OUTPUT_DIR)
    tokenizer.save_pretrained(OUTPUT_DIR)

    print("Training complete. Adapters saved at:", OUTPUT_DIR)

    # 10) Example: load the adapter for inference (small snippet)
    # from peft import PeftModel
    # base = AutoModelForCausalLM.from_pretrained(MODEL_NAME, device_map="auto", torch_dtype=torch.float16)
    # model_with_lora = PeftModel.from_pretrained(base, OUTPUT_DIR)
    # Use tokenizer to generate answers: tokenizer(prompt, return_tensors='pt').to(device)
    # outputs = model_with_lora.generate(...)

if __name__ == "__main__":
    main()

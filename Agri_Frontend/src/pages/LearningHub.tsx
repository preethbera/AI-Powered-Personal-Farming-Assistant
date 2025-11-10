import { useState } from "react";
import { motion } from "framer-motion";
import {
  Play,
  BookOpen,
  ExternalLink,
  Filter,
  Globe,
  Tag
} from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";

// Text Tutorial Interface
interface TextTutorial {
  id: string;
  title: string;
  description: string;
  source: string;
  language: "English" | "Hindi";
  category: "Crop" | "Fertilizer" | "Pest" | "Irrigation" | "Government Schemes" | "Women Empowerment";
  url: string;
  readTime: string;
}

// Iframes List
const iframeVideos = [
  { id: "1",  src: "https://www.youtube.com/embed/t5pxW_g0T2A?si=s-44V485BAp6JmNg" , title:"Sustainable Agriculture Practices (Malayalam)" },
  { id: "2", src: "https://www.youtube.com/embed/m9CYwsafD-Y?si=L7uFOW4sYvqfKls2" , title:" Modern methods of agriculture in Malayalam" },
  { id: "3", src: "https://www.youtube.com/embed/eCQsk5KeWwY?si=1WlA13PDW2uLPTy7" , title:"Farming Techniques in Malayalam - Best Farming Techniques" },
  { id: "4", src: "https://www.youtube.com/embed/CsaQV7Cn_to?si=v6INMB2KPKI3oeaW" ,title:" Organic Farming Methods" },
  { id: "5", src: "https://www.youtube.com/embed/N7lG-Ly6iys?si=vCYCtkFbITG0k91h" , title:"Profitable and affordable vegetable cultivation "},
  { id: "6", src: "https://www.youtube.com/embed/heTxEsrPVdQ?si=kclEoxLwkq8X975V", title:"How to Start a Small Farm | A Step-by-Step Guide" },
  { id: "7", src: "https://www.youtube.com/embed/q7JnJ0oBa94?si=KY6hBeAloc7C94oz", title:"Climate-Smart Agriculture in Action" },
  { id: "8", src: "https://www.youtube.com/embed/iIqi3Fy2kXM?si=y_uaEV7DpPy2Trll", title:"Sustainable Agriculture - Exploring Eco Friendly Farming Practices (20 Minutes)" },
  { id: "9", src: "https://www.youtube.com/embed/k_RiNPKJNdE?si=a-ZZ5sOnXXjx2Iti" , title:"How farmers are protecting the soil and our food security | DW Documentary"},
  { id: "10", src: "https://www.youtube.com/embed/AFjd6DrlwsQ?si=g4QDAaMzct49Ydb6" , title:"Sustainable Agriculture Practices | Integrated Farming System"},
];

// Sample text tutorials
const textTutorials: TextTutorial[] = [
  {
    id: "1",
    title: "Comprehensive Guide to Organic Farming Practices in India",
    description: "Detailed manual covering all aspects of organic farming including certification, composting, and market linkages.",
    source: "ICAR - National Centre for Organic Farming",
    language: "English",
    category: "Crop",
    url: "https://ncof.dacnet.nic.in/Training_manuals/Training_manuals_english/Comprehensive_Guide_Organic_Farming.pdf",
    readTime: "45 min"
  },
  {
    id: "2",
    title: "Integrated Nutrient Management for Sustainable Agriculture",
    description: "Guidelines for balanced fertilizer use, soil health improvement, and sustainable nutrient management practices.",
    source: "Indian Institute of Soil Science - ICAR",
    language: "English",
    category: "Fertilizer",
    url: "https://www.iiss.nic.in/sites/default/files/technologies/Integrated_Nutrient_Management.pdf",
    readTime: "30 min"
  },
  {
    id: "3",
    title: "Pradhan Mantri Fasal Bima Yojana - Complete Guidelines",
    description: "Detailed information about crop insurance scheme, coverage, premium, and claim procedures.",
    source: "Ministry of Agriculture & Farmers Welfare",
    language: "English",
    category: "Government Schemes",
    url: "https://pmfby.gov.in/pdf/PMFBY_Guidelines_English.pdf",
    readTime: "30 min"
  },
  {
    id: "4",
    title: "Women in Agriculture - Empowerment and Opportunities",
    description: "Comprehensive report on women's role in agriculture, available schemes, and empowerment initiatives.",
    source: "FAO India & UN Women",
    language: "English",
    category: "Women Empowerment",
    url: "https://www.fao.org/3/i3153e/i3153e.pdf",
    readTime: "35 min"
  }
];

const categories = ["All", "Crop", "Fertilizer", "Pest", "Irrigation", "Government Schemes", "Women Empowerment", "Other"];
const languages = ["All", "English", "Hindi", "Other"];

const LearningHub = () => {
  const [textLanguageFilter, setTextLanguageFilter] = useState("All");
  const [textCategoryFilter, setTextCategoryFilter] = useState("All");

  const filteredTexts = textTutorials.filter(text => {
    const languageMatch = textLanguageFilter === "All" || text.language === textLanguageFilter;
    const categoryMatch = textCategoryFilter === "All" || text.category === textCategoryFilter;
    return languageMatch && categoryMatch;
  });

  const handleTextClick = (url: string) => {
    window.open(url, '_blank');
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Crop": "bg-primary text-primary-foreground",
      "Fertilizer": "bg-earth text-earth-dark",
      "Pest": "bg-destructive text-destructive-foreground",
      "Irrigation": "bg-sage text-sage-dark",
      "Government Schemes": "bg-accent text-accent-foreground",
      "Women Empowerment": "bg-primary-light text-primary-foreground",
      "Other": "bg-muted text-muted-foreground"
    };
    return colors[category as keyof typeof colors] || "bg-muted text-muted-foreground";
  };

  return (
    <div className="min-h-screen bg-grey-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">Learning Hub</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Access comprehensive agricultural knowledge through videos and articles from trusted Indian institutions like ICAR.
          </p>
        </motion.div>

        {/* Tabs */}
        <Tabs defaultValue="videos" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-8">
            <TabsTrigger value="videos" className="flex items-center gap-2">
              <Play className="w-4 h-4" /> Video Tutorials
            </TabsTrigger>
            <TabsTrigger value="texts" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" /> Text Tutorials
            </TabsTrigger>
          </TabsList>

          {/* Video Tutorials */}
          <TabsContent value="videos">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 py-3">
                {iframeVideos.map((video, idx) => (
                  <motion.div
                    key={video.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <Card className="agricultural-card p-0 overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
                      <div className="relative w-full aspect-video bg-muted">
                        <iframe
                          width="100%"
                          height="100%"
                          src={video.src}
                          title={video.title}
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                          className="rounded-t-lg w-full h-full absolute inset-0"
                          style={{ minHeight: 180 }}
                        ></iframe>
                      </div>
                      <CardContent className="flex-1 flex flex-col justify-between p-4">
                        <div>
                          <h3 className="font-semibold text-lg text-foreground mb-1 line-clamp-2">{video.title}</h3>
                          
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
          {/* Text Tutorials */}
          <TabsContent value="texts">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
              {/* Filters */}
              <div className="flex flex-wrap gap-4 mb-6 p-4 bg-card rounded-lg border">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-muted-foreground" />
                  <Select value={textLanguageFilter} onValueChange={setTextLanguageFilter}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Language" />
                    </SelectTrigger>
                    <SelectContent>
                      {languages.map(language => <SelectItem key={language} value={language}>{language}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center gap-2">
                  <Tag className="w-4 h-4 text-muted-foreground" />
                  <Select value={textCategoryFilter} onValueChange={setTextCategoryFilter}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => <SelectItem key={category} value={category}>{category}</SelectItem>)}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {/* Text List */}
              <div className="space-y-4">
                {filteredTexts.map((text, index) => (
                  <motion.div key={text.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: index * 0.1 }}>
                    <Card className="agricultural-card cursor-pointer group" onClick={() => handleTextClick(text.url)}>
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <CardTitle className="text-xl group-hover:text-primary transition-colors mb-2">{text.title}</CardTitle>
                            <CardDescription className="text-base">{text.description}</CardDescription>
                          </div>
                          <Badge className={`${getCategoryColor(text.category)} ml-4 mt-2`}>{text.category}</Badge>
                        </div>
                        <p className="text-muted-foreground text-sm mt-2">{text.readTime} | {text.language}</p>
                      </CardHeader>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default LearningHub;

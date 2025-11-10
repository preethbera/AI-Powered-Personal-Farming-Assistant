import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar as CalendarIcon,
  Sun,
  ChevronLeft,
  ChevronRight,
  TrendingUp,
  Plus,
  Edit,
  Trash2,
  Tractor,
  Droplets,
  Sprout,
  MoreHorizontal
} from "lucide-react";

/** ---------------- Activity Categories & Colors ---------------- **/
const ACTIVITY_CATEGORIES = [
  { 
    value: "field-preparation", 
    label: "Field Preparation", 
    color: "bg-amber-100 text-amber-800 border-amber-200",
    icon: <Tractor className="w-4 h-4" />
  },
  { 
    value: "sowing-planting", 
    label: "Sowing & Planting", 
    color: "bg-green-100 text-green-800 border-green-200",
    icon: <Sprout className="w-4 h-4" />
  },
  { 
    value: "irrigation", 
    label: "Irrigation", 
    color: "bg-blue-100 text-blue-800 border-blue-200",
    icon: <Droplets className="w-4 h-4" />
  },
  { 
    value: "fertilizer-pesticide", 
    label: "Fertilizer & Pesticide Application", 
    color: "bg-purple-100 text-purple-800 border-purple-200",
    icon: <Sun className="w-4 h-4" />
  },
  { 
    value: "harvesting", 
    label: "Harvesting & Post-Harvest", 
    color: "bg-orange-100 text-orange-800 border-orange-200",
    icon: <MoreHorizontal className="w-4 h-4" />
  },
  { 
    value: "others", 
    label: "Others", 
    color: "bg-gray-100 text-gray-800 border-gray-200",
    icon: <Plus className="w-4 h-4" />
  }
];

/** ---------------- Mock Data & Handlers ---------------- **/
const formatDate = (year: number, month: number, day: number) => {
  const mm = String(month + 1).padStart(2, "0");
  const dd = String(day).padStart(2, "0");
  return `${year}-${mm}-${dd}`;
};

// Mock data for activities
const generateMockActivities = () => {
  const activities = [];
  const today = new Date();
  
  // Generate some mock activities for the current month
  for (let i = 0; i < 15; i++) {
    const randomDay = Math.floor(Math.random() * 28) + 1;
    const category = ACTIVITY_CATEGORIES[Math.floor(Math.random() * ACTIVITY_CATEGORIES.length)];
    
    activities.push({
      id: `activity-${i}`,
      title: `${category.label} Task ${i + 1}`,
      date: formatDate(today.getFullYear(), today.getMonth(), randomDay),
      category: category.value,
      notes: `Sample notes for ${category.label.toLowerCase()} activity`,
      status: Math.random() > 0.3 ? "scheduled" : "completed"
    });
  }
  
  return activities;
};
const fetchActivitiesByMonth = async (month: number, year: number) => {

  await new Promise(resolve => setTimeout(resolve, 100));
  
  const mockData = generateMockActivities();
  return mockData.filter(activity => {
    const activityDate = new Date(activity.date + "T00:00:00");
    return activityDate.getMonth() === month - 1 && activityDate.getFullYear() === year;
  });
};

const fetchAllActivities = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return generateMockActivities();
};

const addActivity = async (activity: any) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return {
    ...activity,
    id: `activity-${Date.now()}`,
    status: "scheduled"
  };
};

const updateActivity = async (id: string, updates: any) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { id, ...updates };
};

const deleteActivity = async (id: string) => {
  await new Promise(resolve => setTimeout(resolve, 100));
  return { success: true };
};
/** ---------------- Component ---------------- **/

const DailyActivityTracker = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<number | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingActivity, setEditingActivity] = useState<any>(null);

  const [activityDetails, setActivityDetails] = useState<{ [day: number]: any }>({});
  const [activitiesList, setActivitiesList] = useState<any[]>([]);

  const today = new Date();

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const navigateMonth = (direction: "prev" | "next") => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === "prev" ? -1 : 1));
      return newDate;
    });
    setSelectedDay(null);
    setShowAddForm(false);
    setEditingActivity(null);
  };

  const getCategoryColor = (category: string) => {
    const categoryData = ACTIVITY_CATEGORIES.find(cat => cat.value === category);
    return categoryData?.color || "bg-gray-100 text-gray-800 border-gray-200";
  };

  const getDayStatus = (day: number) => {
    const activities = activityDetails[day];

    if (
      today.getDate() === day &&
      today.getMonth() === currentDate.getMonth() &&
      today.getFullYear() === currentDate.getFullYear()
    ) {
      return "today";
    }

    if (Array.isArray(activities)) {
      if (activities.some((a) => a.status === "completed")) return "done";
      if (activities.some((a) => a.status === "scheduled")) return "scheduled";
    }

    return "normal";
  };

  const getActivitiesForDay = (day: number) => activityDetails[day] || null;

  /** ---------------- Effects ---------------- **/
  useEffect(() => {
    const month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();

    fetchActivitiesByMonth(month, year).then((data) => {
      const details: { [day: number]: any[] } = {};

      data.forEach((activity: any) => {
        const day = new Date(activity.date + "T00:00:00").getDate();

        if (!details[day]) {
          details[day] = [];
        }

        details[day].push({
          ...activity,
          status: activity.status || "scheduled",
        });
      });

      setActivityDetails(details);
    });
  }, [currentDate]);

  useEffect(() => {
    fetchAllActivities().then(data => setActivitiesList(data));
  }, []);

  const handleDayDoubleClick = (day: number) => {
    const activities = activityDetails[day];
    if (!activities) {
      setSelectedDay(day);
      setShowAddForm(true);
      setEditingActivity(null);
    }
  };

  const handleAddActivity = async (formData: FormData) => {
    if (!selectedDay) return;

    const newActivity = {
      title: String(formData.get("title")),
      date: formatDate(currentDate.getFullYear(), currentDate.getMonth(), selectedDay),
      category: String(formData.get("category")),
      notes: String(formData.get("notes")) || "",
    };

    const added = await addActivity(newActivity);

    if (added) {
      setActivityDetails(prev => {
        const updated = { ...prev };
        if (!updated[selectedDay]) updated[selectedDay] = [];
        updated[selectedDay].push(added);
        return updated;
      });

      setActivitiesList(prev => [...prev, added]);
      setShowAddForm(false);
    }
  };

  const handleEditActivity = async (formData: FormData) => {
    if (!editingActivity) return;

    const updates = {
      title: String(formData.get("title")),
      category: String(formData.get("category")),
      notes: String(formData.get("notes")) || "",
    };

    const updated = await updateActivity(editingActivity.id, updates);

    if (updated) {
      setActivityDetails(prev => {
        const newDetails = { ...prev };
        Object.keys(newDetails).forEach(day => {
          const dayNum = parseInt(day);
          newDetails[dayNum] = newDetails[dayNum].map((activity: any) =>
            activity.id === editingActivity.id ? { ...activity, ...updates } : activity
          );
        });
        return newDetails;
      });

      setActivitiesList(prev => prev.map(activity =>
        activity.id === editingActivity.id ? { ...activity, ...updates } : activity
      ));
      
      setEditingActivity(null);
    }
  };

  const handleDeleteActivity = async (activityId: string) => {
    const success = await deleteActivity(activityId);

    if (success) {
      setActivityDetails(prev => {
        const newDetails = { ...prev };
        Object.keys(newDetails).forEach(day => {
          const dayNum = parseInt(day);
          newDetails[dayNum] = newDetails[dayNum].filter((activity: any) => activity.id !== activityId);
        });
        return newDetails;
      });

      setActivitiesList(prev => prev.filter(activity => activity.id !== activityId));
    }
  };

  const recommendations = [
    {
      icon: <Droplets className="w-5 h-5 text-blue-500" />,
      title: "Optimal Activity Planning",
      description: "Plan irrigation and fertilizer activities together for maximum efficiency"
    },
    {
      icon: <Sun className="w-5 h-5 text-orange-500" />,
      title: "Weather-Based Planning",
      description: "Schedule field work during favorable weather conditions"
    },
    {
      icon: <TrendingUp className="w-5 h-5 text-green-500" />,
      title: "Activity Coordination",
      description: "Coordinate sowing and irrigation schedules for optimal crop growth"
    }
  ];

  /** ---------------- Render ---------------- **/
  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">🌾 Daily Activity Tracker</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Plan and track your daily farming activities with smart scheduling and organization.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Calendar */}
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} className="xl:col-span-2 agricultural-card p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-semibold text-foreground flex items-center gap-3">
                <CalendarIcon className="w-6 h-6 text-primary" /> Activity Calendar
              </h2>
              <div className="flex items-center gap-4">
                <button onClick={() => navigateMonth("prev")} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <h3 className="text-lg font-medium min-w-[200px] text-center">
                  {currentDate.toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                </h3>
                <button onClick={() => navigateMonth("next")} className="p-2 hover:bg-muted rounded-lg transition-colors">
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 gap-2 mb-4">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                <div key={day} className="text-center text-sm font-medium text-muted-foreground p-2">{day}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-2">
              {Array.from({ length: getFirstDayOfMonth(currentDate) }).map((_, i) => <div key={`empty-${i}`} className="p-2"></div>)}
              {Array.from({ length: getDaysInMonth(currentDate) }).map((_, i) => {
                const day = i + 1;
                const status = getDayStatus(day);
                const activities = getActivitiesForDay(day);
                const hasMultipleCategories = activities && activities.length > 1;
                
                return (
                  <motion.button
                    key={day}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedDay(selectedDay === day ? null : day)}
                    onDoubleClick={() => handleDayDoubleClick(day)}
                    className={`p-3 rounded-lg text-sm font-medium transition-all duration-200 relative
                      ${status === "today" ? "ring-2 ring-primary ring-offset-2 bg-primary/10 text-primary" : ""}
                      ${status === "scheduled" ? "bg-blue-100 text-blue-700 hover:bg-blue-200" : ""}
                      ${status === "done" ? "bg-green-100 text-green-700 hover:bg-green-200" : ""}
                      ${status === "normal" ? "hover:bg-muted text-foreground" : ""}
                      ${selectedDay === day ? "scale-105 shadow-soft" : ""}`}
                  >
                    {day}
                    {activities && activities.length > 0 && (
                      <div className="absolute -top-1 -right-1 flex gap-0.5">
                        {hasMultipleCategories ? (
                          <div className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full"></div>
                        ) : (
                          <div className={`w-2 h-2 rounded-full ${getCategoryColor(activities[0].category).split(' ')[0].replace('bg-', 'bg-').replace('-100', '-400')}`}></div>
                        )}
                      </div>
                    )}
                  </motion.button>
                );
              })}
            </div>

            {/* Selected Day Details */}
            <AnimatePresence>
              {selectedDay && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mt-6 p-4 bg-card border border-border rounded-lg">
                  <h4 className="font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CalendarIcon className="w-4 h-4" /> {currentDate.toLocaleDateString("en-US", { month: "long" })} {selectedDay}
                  </h4>

                  {getActivitiesForDay(selectedDay) ? (
                    <div className="space-y-3">
                      {getActivitiesForDay(selectedDay).map((activity: any) => {
                        const categoryData = ACTIVITY_CATEGORIES.find(cat => cat.value === activity.category);
                        return (
                          <div key={activity.id} className={`p-3 rounded-lg border ${getCategoryColor(activity.category)}`}>
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-2">
                                  {categoryData?.icon}
                                  <h5 className="font-medium">{activity.title}</h5>
                                </div>
                                <p className="text-sm opacity-75 mb-2">{categoryData?.label}</p>
                                {activity.notes && (
                                  <p className="text-sm opacity-90">{activity.notes}</p>
                                )}
                              </div>
                              <div className="flex gap-1 ml-2">
                                <button
                                  onClick={() => setEditingActivity(activity)}
                                  className="p-1 hover:bg-white/20 rounded"
                                >
                                  <Edit className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => handleDeleteActivity(activity.id)}
                                  className="p-1 hover:bg-red-200/50 rounded text-red-600"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                      
                      <button
                        onClick={() => setShowAddForm(true)}
                        className="w-full p-3 border-2 border-dashed border-muted-foreground/20 rounded-lg hover:border-primary/50 hover:bg-primary/5 transition-colors flex items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                      >
                        <Plus className="w-4 h-4" />
                        Add Another Activity
                      </button>
                    </div>
                  ) : showAddForm || editingActivity ? (
                    <form
                      className="space-y-4"
                      onSubmit={async (e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        
                        if (editingActivity) {
                          await handleEditActivity(formData);
                        } else {
                          await handleAddActivity(formData);
                        }
                      }}
                    >
                      <input 
                        name="title" 
                        placeholder="Activity Title" 
                        required 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        defaultValue={editingActivity?.title || ""}
                      />
                      
                      <select 
                        name="category" 
                        required 
                        className="w-full p-3 border border-border rounded-lg bg-background"
                        defaultValue={editingActivity?.category || ""}
                      >
                        <option value="">Select Category</option>
                        {ACTIVITY_CATEGORIES.map(category => (
                          <option key={category.value} value={category.value}>
                            {category.label}
                          </option>
                        ))}
                      </select>
                      
                      <textarea 
                        name="notes" 
                        placeholder="Notes / Description" 
                        rows={3}
                        className="w-full p-3 border border-border rounded-lg bg-background resize-none"
                        defaultValue={editingActivity?.notes || ""}
                      />
                      
                      <div className="flex gap-2">
                        <button type="submit" className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                          {editingActivity ? "Update Activity" : "Add Activity"}
                        </button>
                        <button 
                          type="button" 
                          onClick={() => {
                            setShowAddForm(false);
                            setEditingActivity(null);
                          }}
                          className="px-4 py-2 border border-border rounded-lg hover:bg-muted transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Sun className="w-4 h-4" />
                      <span className="text-sm">No activities scheduled for this day. Double-click to add one.</span>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Sidebar */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6">
            {/* Upcoming Activities */}
            <div className="agricultural-card p-6">
              <h3 className="text-xl font-semibold mb-4">Upcoming Activities</h3>
              <ul className="space-y-2 max-h-[400px] overflow-y-auto">
                {activitiesList.slice(0, 10).map(activity => {
                  const categoryData = ACTIVITY_CATEGORIES.find(cat => cat.value === activity.category);
                  return (
                    <li key={activity.id} className={`p-3 rounded-lg ${getCategoryColor(activity.category)}`}>
                      <div className="flex items-start gap-2">
                        {categoryData?.icon}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{activity.title}</p>
                          <p className="text-xs opacity-75">{new Date(activity.date).toLocaleDateString()}</p>
                          <p className="text-xs opacity-75">{categoryData?.label}</p>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

            {/* AI Suggestions */}
           
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default DailyActivityTracker;

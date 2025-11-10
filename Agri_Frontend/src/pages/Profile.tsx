import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  User, 
  MapPin, 
  CreditCard, 
  Sprout, 
  Calendar,
  Trophy,
  FileText
} from "lucide-react";

const Profile = () => {
  // Placeholder data
  const personalInfo = {
    name: "Rajesh Kumar",
    location: "Pune, Maharashtra",
    aadhaar: "XXXX-XXXX-5678"
  };

  const fieldInfo = {
    currentCrop: "Wheat",
    sowingDate: "November 15, 2024",
    expectedHarvest: "March 2025",
    fieldSize: "5.2 acres"
  };

  const cropHistory = [
    { crop: "Rice", season: "Kharif 2024", yield: "4.2 tons/acre", status: "Harvested" },
    { crop: "Sugarcane", season: "2023-24", yield: "65 tons/acre", status: "Harvested" },
    { crop: "Cotton", season: "Kharif 2023", yield: "8.5 quintals/acre", status: "Harvested" },
    { crop: "Wheat", season: "Rabi 2022-23", yield: "3.8 tons/acre", status: "Harvested" }
  ];

  const governmentSchemes = [
    { 
      name: "PM-KISAN", 
      status: "Active", 
      description: "Income support for farmers",
      benefit: "₹6,000/year"
    },
    { 
      name: "Pradhan Mantri Fasal Bima Yojana", 
      status: "Active", 
      description: "Crop insurance scheme",
      benefit: "Premium subsidy"
    },
    { 
      name: "Soil Health Card Scheme", 
      status: "Enrolled", 
      description: "Soil testing and recommendations",
      benefit: "Free soil testing"
    }
  ];

  return (
    <div className="min-h-full bg-gradient-to-br from-background via-background to-muted/30 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">
            Farmer Profile
          </h1>
          <p className="text-lg text-muted-foreground">
            Manage your farming profile and track your agricultural journey
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Personal Information */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <User className="w-5 h-5 text-primary" />
                  Personal Information
                </CardTitle>
                <CardDescription>
                  Your basic profile information
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-full flex items-center justify-center">
                    <User className="w-6 h-6 text-primary-foreground" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{personalInfo.name}</p>
                    <p className="text-sm text-muted-foreground">Farmer</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <MapPin className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Location</p>
                      <p className="text-sm text-muted-foreground">{personalInfo.location}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                    <CreditCard className="w-4 h-4 text-primary" />
                    <div>
                      <p className="text-sm font-medium text-foreground">Aadhaar Number</p>
                      <p className="text-sm text-muted-foreground">{personalInfo.aadhaar}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Current Crop Information */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Sprout className="w-5 h-5 text-primary" />
                  Current Crop
                </CardTitle>
                <CardDescription>
                  Information about your current farming cycle
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-center p-4 bg-gradient-to-r from-primary/10 to-primary/5 rounded-lg border border-primary/20">
                  <div className="w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-3">
                    <Sprout className="w-8 h-8 text-primary-foreground" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-1">{fieldInfo.currentCrop}</h3>
                  <Badge variant="secondary">{fieldInfo.fieldSize}</Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Calendar className="w-4 h-4 text-primary mb-2" />
                    <p className="text-xs font-medium text-foreground">Sowing Date</p>
                    <p className="text-sm text-muted-foreground">{fieldInfo.sowingDate}</p>
                  </div>
                  
                  <div className="p-3 bg-muted/50 rounded-lg">
                    <Trophy className="w-4 h-4 text-primary mb-2" />
                    <p className="text-xs font-medium text-foreground">Expected Harvest</p>
                    <p className="text-sm text-muted-foreground">{fieldInfo.expectedHarvest}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Crop History */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="lg:col-span-2"
          >
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Crop History
                </CardTitle>
                <CardDescription>
                  Your previous farming seasons and yields
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {cropHistory.map((crop, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.4 + index * 0.1 }}
                      className="p-4 border border-border rounded-lg hover:bg-muted/30 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{crop.crop}</h4>
                        <Badge variant="outline">{crop.status}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{crop.season}</p>
                      <p className="text-sm font-medium text-primary">Yield: {crop.yield}</p>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Government Schemes */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="lg:col-span-2"
          >
            <Card className="agricultural-card">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="w-5 h-5 text-primary" />
                  Government Schemes
                </CardTitle>
                <CardDescription>
                  Schemes you're currently enrolled in and their benefits
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {governmentSchemes.map((scheme, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + index * 0.1 }}
                      className="p-4 border border-border rounded-lg hover:shadow-soft transition-all"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-foreground">{scheme.name}</h4>
                        <Badge variant={scheme.status === "Active" ? "default" : "secondary"}>
                          {scheme.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{scheme.description}</p>
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-primary">Benefit:</span>
                        <span className="text-sm text-foreground">{scheme.benefit}</span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
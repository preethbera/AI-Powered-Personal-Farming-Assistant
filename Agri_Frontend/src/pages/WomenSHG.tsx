import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  Heart, 
  Users, 
  BookOpen, 
  FileText, 
  Bot, 
  Calendar,
  MapPin,
  Phone,
  MessageSquare,
  Star,
  Award,
  Sprout,
  Home
} from "lucide-react";

const WomenSHG = () => {
  const [selectedGroup, setSelectedGroup] = useState<number | null>(null);

  // Mock data for modern slider banner
  const bannerSlides = [
    {
      id: 1,
      title: "Women Leading Agricultural Innovation",
      description: "Empowering female farmers with modern techniques and sustainable practices",
      image: "https://images.unsplash.com/photo-1594736797933-d0301ba2fe65?w=800&h=500&fit=crop",
      highlight: "Innovation",
    },
    {
      id: 2,
      title: "Self Help Groups Transforming Lives",
      description: "Building strong communities through collective farming and financial independence",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=800&h=500&fit=crop",
      highlight: "Community",
    },
    {
      id: 3,
      title: "Training & Skill Development",
      description: "Comprehensive programs for women entrepreneurs in agriculture and agri-business",
      image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=500&fit=crop",
      highlight: "Training",
    },
    {
      id: 4,
      title: "Collective Farming Success",
      description: "Women farmers working together for better yields and shared prosperity",
      image: "https://images.unsplash.com/photo-1574021970513-e9d0169de750?w=800&h=500&fit=crop",
      highlight: "Success",
    },
  ];

  // Mock SHG groups data for your location
  const localSHGGroups = [
    {
      id: 1,
      name: "सरस्वती महिला स्वयं सहायता समूह",
      description: "जैविक कृषि, महिला सशक्तिकरण और वित्तीय साक्षरता पर केंद्रित समूह",
      members: 28,
      location: "आपका क्षेत्र",
      rating: 4.8,
      established: "2019",
      focus: "Organic Farming & Women Empowerment"
    },
    {
      id: 2,
      name: "शक्ति कृषि महिला संघ",
      description: "आधुनिक कृषि तकनीक, फसल विविधीकरण और बाज़ार पहुंच में विशेषज्ञता",
      members: 35,
      location: "आपका क्षेत्र",
      rating: 4.9,
      established: "2018",
      focus: "Modern Agriculture & Market Access"
    },
    {
      id: 3,
      name: "अन्नपूर्णा उद्यमी समूह",
      description: "कृषि उद्यमिता, मूल्य संवर्धन और डिजिटल साक्षरता पर केंद्रित",
      members: 32,
      location: "आपका क्षेत्र", 
      rating: 4.7,
      established: "2020",
      focus: "Agri-entrepreneurship & Value Addition"
    },
  ];

  // Quick access cards data
  const quickAccessCards = [
    {
      id: 1,
      title: "Learning Hub",
      description: "Educational resources and training materials",
      icon: BookOpen,
      gradient: "bg-gradient-rose", // changed
      link: "/learning-hub",
    },
    {
      id: 2,
      title: "Government Schemes",
      description: "Latest schemes and news for women farmers",
      icon: FileText,
      gradient: "bg-gradient-lavender", // changed
      link: "/government-schemes",
    },
    {
      id: 3,
      title: "Chat Bot",
      description: "Get instant help with crop and women queries",
      icon: Bot,
      gradient: "bg-gradient-mint", // changed
      link: "/chat",
    },
    {
      id: 4,
      title: "Smart Planner",
      description: "Plan your crops, irrigation, and farming schedule",
      icon: Calendar,
      gradient: "bg-gradient-rose", // changed
      link: "/irrigation-planner",
    },
  ];

  const handleJoinRequest = (groupId: number) => {
    // Mock function for join request
    console.log(`Join request sent for group ${groupId}`);
    // In a real app, this would send an API request
  };

  return (
    <div className="min-h-screen bg-gradient-women">
      {/* Hero Banner Slideshow */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="relative"
      >
          <Carousel 
            className="w-full" 
            opts={{ 
              loop: true,
              duration: 30,
            }}
          >
            <CarouselContent>
              {bannerSlides.map((slide) => (
                <CarouselItem key={slide.id} className="relative">
                  <div className="relative h-[500px] md:h-[600px] lg:h-[650px] overflow-hidden">
                    {/* Background Image */}
                    <img 
                      src={slide.image} 
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                    {/* Dark Overlay */}
                    <div className="absolute inset-0 bg-black/40"></div>
                    
                    {/* Content Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="text-center text-white px-6 md:px-12 max-w-4xl">
                        <motion.h1 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.3 }}
                          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6"
                        >
                          {slide.title}
                        </motion.h1>
                        <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.5 }}
                          className="text-lg md:text-xl lg:text-2xl mb-6 md:mb-8 text-white/90"
                        >
                          {slide.description}
                        </motion.p>
                        <motion.div
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: 0.7 }}
                        >
                          <Button 
                            size="lg" 
                            className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg font-semibold rounded-full border-none shadow-lg hover:shadow-xl transition-all duration-300"
                          >
                            {slide.highlight === "Innovation" ? "Learn More" : 
                             slide.highlight === "Community" ? "Join Us" :
                             slide.highlight === "Training" ? "Start Learning" : "Get Started"}
                          </Button>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12" />
            <CarouselNext className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 bg-white/20 border-white/30 text-white hover:bg-white/30 hover:text-white w-12 h-12" />
          </Carousel>
        </motion.div>

      <div className="max-w-7xl mx-auto p-6 space-y-8">
        {/* Local SHG Groups Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Users className="w-6 h-6 text-lavender-dark" />
            <h2 className="text-2xl font-semibold text-foreground">Local SHG Groups Near You</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {localSHGGroups.map((group) => (
              <Card key={group.id} className="agricultural-card">
                <CardHeader className="bg-gradient-lavender rounded-t-lg">
                  <CardTitle className="flex items-center gap-2 text-white">
                    <MapPin className="w-5 h-5" />
                    {group.name}
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-4">
                  <div className="space-y-3">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-muted-foreground">{group.rating}</span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        Since {group.established}
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mb-3">{group.description}</p>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Members:</span>
                        <span className="font-medium">{group.members}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-muted-foreground">Focus:</span>
                        <span className="font-medium text-xs">{group.focus}</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handleJoinRequest(group.id)}
                      className="w-full bg-gradient-mint hover:bg-mint-dark text-white border-none mt-3"
                    >
                      Request to Join
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Quick Access Cards Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-2">
            <Sprout className="w-6 h-6 text-mint-dark" />
            <h2 className="text-2xl font-semibold text-foreground">Quick Access Hub</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickAccessCards.map((card) => (
              <motion.div
                key={card.id}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link to={card.link}>
                  <Card className={`agricultural-card cursor-pointer ${card.gradient} border-none h-full`}>
                    <CardContent className="p-6 text-center">
                      <div className="mb-4">
                        <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-3">
                          <card.icon className="w-8 h-8 text-white" />
                        </div>
                        <h3 className="text-lg font-semibold text-white mb-2">{card.title}</h3>
                        <p className="text-sm text-white/80">{card.description}</p>
                      </div>
                      <Button 
                        variant="outline" 
                        className="w-full bg-white/10 text-white border-white/20 hover:bg-white/20"
                      >
                        Access Now
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-center py-8"
        >
          <div className="flex items-center justify-center gap-4 text-4xl">
            <span>🌾</span>
            <span>💡</span>
            <span>👩‍🌾</span>
            <span>💬</span>
          </div>
          <p className="mt-4 text-muted-foreground">
            Empowering women farmers through knowledge, community, and technology
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default WomenSHG;
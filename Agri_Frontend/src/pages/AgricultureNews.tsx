import { useState } from "react";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ExternalLink, 
  Search,
  Filter,
  Bookmark,
  Share2,
  TrendingUp,
  Globe,
  Leaf,  Newspaper
} from "lucide-react";

const AgricultureNews = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedState, setSelectedState] = useState("all");

  // Mock news data
  const newsArticles = [
    {
      id: 1,
      title: "Revolutionary Drought-Resistant Wheat Varieties Show 40% Higher Yields",
      summary: "New genetically modified wheat varieties developed by international researchers demonstrate remarkable resistance to drought conditions while maintaining nutritional value.",
      category: "technology",
      source: "Agricultural Research Today",
      publishedAt: "2024-06-15T08:30:00Z",
      readTime: "5 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: true,
      state: "punjab"
    },
    {
      id: 2,
      title: "Global Fertilizer Prices Expected to Stabilize by Q4 2024",
      summary: "Market analysts predict fertilizer prices will normalize as supply chain disruptions ease and new production facilities come online.",
      category: "market",
      source: "Farm Economics Weekly",
      publishedAt: "2024-06-14T14:15:00Z",
      readTime: "3 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: false,
      state: "haryana"
    },
    {
      id: 3,
      title: "AI-Powered Pest Detection Systems Reduce Crop Loss by 35%",
      summary: "Farmers adopting AI-based monitoring systems report significant reduction in pest-related crop damage and decreased pesticide usage.",
      category: "technology",
      source: "Smart Farming Magazine",
      publishedAt: "2024-06-14T10:45:00Z",
      readTime: "4 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: true,
      state: "maharashtra"
    },
    {
      id: 4,
      title: "Climate Change Adaptation Strategies for Small-Scale Farmers",
      summary: "New research reveals effective low-cost adaptation techniques helping small farmers cope with changing weather patterns.",
      category: "climate",
      source: "Environmental Agriculture",
      publishedAt: "2024-06-13T16:20:00Z",
      readTime: "6 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: false,
      state: "rajasthan"
    },
    {
      id: 5,
      title: "Organic Farming Market Grows 15% Annually as Consumer Demand Rises",
      summary: "The organic farming sector continues its strong growth trajectory, driven by health-conscious consumers and premium pricing.",
      category: "market",
      source: "Organic Trade Association",
      publishedAt: "2024-06-13T09:00:00Z",
      readTime: "4 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: false,
      state: "kerala"
    },
    {
      id: 6,
      title: "Vertical Farming Ventures Secure $500M in New Investment Funding",
      summary: "Major agricultural technology companies attract significant investment as vertical farming scales up for commercial production.",
      category: "technology",
      source: "AgTech Investor",
      publishedAt: "2024-06-12T12:30:00Z",
      readTime: "3 min read",
      imageUrl: "/api/placeholder/400/200",
      trending: true,
      state: "karnataka"
    }
  ];

  // Government schemes data
  const governmentSchemes = [
    {
      id: 1,
      title: "PM-KISAN Scheme: Direct Income Support for Farmers",
      summary: "Under this scheme, income support of ₹6,000 per year is provided to all farmer families across the country in three equal installments of ₹2,000 each.",
      category: "government-schemes",
      source: "Ministry of Agriculture",
      publishedAt: "2024-06-15T08:30:00Z",
      readTime: "3 min read",
      state: "all",
      benefits: "₹6,000 annual income support"
    },
    {
      id: 2,
      title: "Pradhan Mantri Fasal Bima Yojana (PMFBY)",
      summary: "Crop insurance scheme providing financial support to farmers suffering crop loss/damage arising out of unforeseen events.",
      category: "government-schemes",
      source: "Ministry of Agriculture",
      publishedAt: "2024-06-14T14:15:00Z",
      readTime: "4 min read",
      state: "all",
      benefits: "Up to ₹2 lakh insurance coverage"
    },
    {
      id: 3,
      title: "Soil Health Card Scheme",
      summary: "Government initiative to issue soil health cards to farmers which will carry crop-wise recommendations of nutrients and fertilizers.",
      category: "government-schemes",
      source: "Department of Agriculture",
      publishedAt: "2024-06-14T10:45:00Z",
      readTime: "3 min read",
      state: "all",
      benefits: "Free soil testing and recommendations"
    },
    {
      id: 4,
      title: "National Agriculture Market (e-NAM)",
      summary: "Online platform for agricultural commodities to facilitate farmers, traders, and buyers with transparent price discovery.",
      category: "government-schemes",
      source: "Ministry of Agriculture",
      publishedAt: "2024-06-13T16:20:00Z",
      readTime: "4 min read",
      state: "all",
      benefits: "Better price realization for farmers"
    }
  ];

  // Indian states and union territories
  const indianStates = [
    { value: "all", label: "All States" },
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "arunachal-pradesh", label: "Arunachal Pradesh" },
    { value: "assam", label: "Assam" },
    { value: "bihar", label: "Bihar" },
    { value: "chhattisgarh", label: "Chhattisgarh" },
    { value: "goa", label: "Goa" },
    { value: "gujarat", label: "Gujarat" },
    { value: "haryana", label: "Haryana" },
    { value: "himachal-pradesh", label: "Himachal Pradesh" },
    { value: "jharkhand", label: "Jharkhand" },
    { value: "karnataka", label: "Karnataka" },
    { value: "kerala", label: "Kerala" },
    { value: "madhya-pradesh", label: "Madhya Pradesh" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "manipur", label: "Manipur" },
    { value: "meghalaya", label: "Meghalaya" },
    { value: "mizoram", label: "Mizoram" },
    { value: "nagaland", label: "Nagaland" },
    { value: "odisha", label: "Odisha" },
    { value: "punjab", label: "Punjab" },
    { value: "rajasthan", label: "Rajasthan" },
    { value: "sikkim", label: "Sikkim" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    { value: "telangana", label: "Telangana" },
    { value: "tripura", label: "Tripura" },
    { value: "uttar-pradesh", label: "Uttar Pradesh" },
    { value: "uttarakhand", label: "Uttarakhand" },
    { value: "west-bengal", label: "West Bengal" },
    { value: "andaman-nicobar", label: "Andaman and Nicobar Islands" },
    { value: "chandigarh", label: "Chandigarh" },
    { value: "dadra-nagar-haveli", label: "Dadra and Nagar Haveli and Daman and Diu" },
    { value: "delhi", label: "Delhi" },
    { value: "jammu-kashmir", label: "Jammu and Kashmir" },
    { value: "ladakh", label: "Ladakh" },
    { value: "lakshadweep", label: "Lakshadweep" },
    { value: "puducherry", label: "Puducherry" }
  ];

  const categories = [
    { value: "all", label: "All News", icon: <Globe className="w-4 h-4" /> },
    { value: "market", label: "Market", icon: <TrendingUp className="w-4 h-4" /> },
    { value: "government-schemes", label: "Government Schemes", icon: <Leaf className="w-4 h-4" /> }
  ];

  const filteredNews = newsArticles.filter(article => {
    const matchesCategory = selectedCategory === "all" || article.category === selectedCategory;
    const matchesState = selectedState === "all" || article.state === selectedState;
    return matchesCategory && matchesState;
  });

  const filteredSchemes = governmentSchemes.filter(scheme => {
    const matchesState = selectedState === "all" || scheme.state === "all" || scheme.state === selectedState;
    return matchesState;
  });

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "market": return "bg-green-100 text-green-800";
      case "government-schemes": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
         <span className="flex items-center gap-2">   <Newspaper/> Agricultural Schemes & News</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Stay updated with the latest developments in agriculture, technology, and market trends.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="agricultural-card p-6 mb-8"
        >
          <div className="flex flex-col lg:flex-row gap-4 items-start lg:items-center">

            {/* State Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedState}
                onChange={(e) => setSelectedState(e.target.value)}
                className="appearance-none bg-background border border-input rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-primary min-w-[200px]"
              >
                {indianStates.map((state) => (
                  <option key={state.value} value={state.value}>
                    {state.label}
                  </option>
                ))}
              </select>
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                <svg className="w-4 h-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 9-7 7-7-7" />
                </svg>
              </div>
            </div>

            {/* Category Filter */}
            <div className="flex items-center gap-2">
              <Filter className="w-4 h-4 text-muted-foreground" />
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.value}
                    onClick={() => setSelectedCategory(category.value)}
                    className={`
                      flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200
                      ${selectedCategory === category.value 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-muted text-muted-foreground hover:bg-muted/80'
                      }
                    `}
                  >
                    {category.icon}
                    {category.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Government Schemes Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-semibold text-foreground mb-4 flex items-center gap-3">
            <Leaf className="w-6 h-6 text-primary" />
            Government Schemes for Farmers
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredSchemes.map((scheme, index) => (
              <motion.div
                key={scheme.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
                className="agricultural-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                      Government Scheme
                    </div>
                    <div className="bg-green-100 text-green-800 px-3 py-1 rounded-lg text-xs font-medium">
                      {scheme.benefits}
                    </div>
                  </div>
                  
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                    {scheme.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {scheme.summary}
                  </p>
                  
                  <div className="flex items-center justify-between pt-3 border-t border-border">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <span className="font-medium">{scheme.source}</span>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3" />
                        {scheme.readTime}
                      </div>
                    </div>
                    <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredSchemes.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No schemes found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or state filter.
              </p>
            </motion.div>
          )}
        </motion.div>

        {/* All News */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-2xl font-semibold text-foreground mb-6">
            Latest News ({filteredNews.length} articles)
          </h2>
          
          <div className="space-y-6">
            {filteredNews.map((article, index) => (
              <motion.div
                key={article.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 + index * 0.1 }}
                className="agricultural-card p-6 hover:shadow-lg transition-all duration-300 cursor-pointer group"
              >
                <div className="flex flex-col lg:flex-row gap-6">
                  {/* Image */}
                  <div className="lg:w-48 lg:h-32 w-full h-40 bg-gradient-to-br from-green-100 to-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Leaf className="w-8 h-8 text-green-500" />
                  </div>
                  
                  {/* Content */}
                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-2">
                        <div className="flex items-center gap-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getCategoryColor(article.category)}`}>
                            {article.category.charAt(0).toUpperCase() + article.category.slice(1)}
                          </span>
                          {article.trending && (
                            <span className="bg-red-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        
                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                          {article.title}
                        </h3>
                        
                        <p className="text-muted-foreground">
                          {article.summary}
                        </p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Bookmark className="w-4 h-4" />
                        </button>
                        <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                          <Share2 className="w-4 h-4" />
                        </button>
                        <ExternalLink className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <div className="flex items-center gap-4">
                        <span className="font-medium">{article.source}</span>
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(article.publishedAt)}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {article.readTime}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {filteredNews.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-12"
            >
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">No articles found</h3>
              <p className="text-muted-foreground">
                Try adjusting your search terms or category filter.
              </p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default AgricultureNews;
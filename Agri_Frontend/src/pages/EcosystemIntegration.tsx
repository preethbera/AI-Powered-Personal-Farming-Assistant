import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Warehouse, Truck, Banknote, Phone, ExternalLink, MapPin, Loader2 } from "lucide-react";

const ColdStorages = [
  { name: "Krishi Agro Cold Storage", capacity: "800 MT", distance: "6 km", contact: "9876543210" },
  { name: "MahaFresh Onion Storage", capacity: "1200 MT", distance: "15 km", contact: "9765432101" },
  { name: "Farmer Co-op Cold Chain", capacity: "500 MT", distance: "9 km", contact: "9123456789" },
];

const Logistics = [
  { provider: "Agri Transport Services", type: "Mini Truck (Tata Ace)", cost: "₹14/km", contact: "9988776655" },
  { provider: "Green Wheels Logistics", type: "Bolero Pickup", cost: "₹18/km", contact: "9876501234" },
  { provider: "Mandi Express", type: "Tractor + Trolley", cost: "₹12/km", contact: "9753102468" },
];

const FinancePartners = [
  { name: "Jai Kisan", type: "NBFC – Farm Loans", link: "https://www.jaikisan.com" },
  { name: "NABKISAN Finance", type: "NBFC – Crop & Agri Finance", link: "https://www.nabkisan.org" },
  { name: "State Bank of India (Agri Loans)", type: "Bank", link: "https://sbi.co.in/web/agriculture-banking" },
  { name: "IFFCO Tokio Crop Insurance", type: "Insurance", link: "https://www.iffcotokio.co.in" },
];

const EcosystemIntegration = () => {
  const [isLocating, setIsLocating] = useState(false);
  const [isLocationFound, setIsLocationFound] = useState(false);
  const [userLocation, setUserLocation] = useState(null);

  const handleLocateMe = async () => {
    setIsLocating(true);
    
    
    setTimeout(() => {
      setUserLocation("Pune, Maharashtra");
      setIsLocating(false);
      setIsLocationFound(true);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-12">
        {/* Page Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center space-y-6"
        >
          <h1 className="text-4xl lg:text-5xl font-bold text-foreground">
            Farm Support Hub
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Connect with storage facilities, logistics partners, and financial services to streamline your agricultural operations
          </p>
          
          {!isLocationFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col items-center space-y-4"
            >
              <p className="text-muted-foreground">First, let us find services near you</p>
              <Button 
                onClick={handleLocateMe}
                disabled={isLocating}
                size="lg"
                className="min-w-[200px]"
              >
                {isLocating ? (
                  <>
                    <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                    Locating...
                  </>
                ) : (
                  <>
                    <MapPin className="h-5 w-5 mr-2" />
                    Locate Me
                  </>
                )}
              </Button>
            </motion.div>
          )}

          {isLocationFound && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-primary/10 border border-primary/20 rounded-lg p-4 max-w-md mx-auto"
            >
              <div className="flex items-center justify-center gap-2 text-primary">
                <MapPin className="h-5 w-5" />
                <span className="font-medium">Location: {userLocation}</span>
              </div>
            </motion.div>
          )}
        </motion.div>

        {/* Sections - Only show after location is found */}
        {isLocationFound && (
          <>
        {/* Cold Storage Discovery Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Warehouse className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">Cold Storage Discovery</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ColdStorages.map((storage, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{storage.name}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p className="text-sm">Capacity: {storage.capacity}</p>
                        <p className="text-sm">Distance: {storage.distance}</p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact: {storage.contact}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Logistics Integration Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Truck className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">Transportation</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Logistics.map((logistics, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{logistics.provider}</CardTitle>
                    <CardDescription>
                      <div className="space-y-1">
                        <p className="text-sm">Vehicle: {logistics.type}</p>
                        <p className="text-sm font-semibold text-primary">Cost: {logistics.cost}</p>
                      </div>
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button className="w-full" variant="outline">
                      <Phone className="h-4 w-4 mr-2" />
                      Contact: {logistics.contact}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* Financial Linkages Section */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="space-y-6"
        >
          <div className="flex items-center gap-3 mb-6">
            <Banknote className="h-8 w-8 text-primary" />
            <h2 className="text-3xl font-semibold text-foreground">Loans and Finances</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
            {FinancePartners.map((partner, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 + index * 0.1 }}
              >
                <Card className="h-full">
                  <CardHeader>
                    <CardTitle className="text-lg">{partner.name}</CardTitle>
                    <CardDescription>{partner.type}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button 
                      className="w-full" 
                      onClick={() => window.open(partner.link, '_blank')}
                    >
                      <ExternalLink className="h-4 w-4 mr-2" />
                      Apply Now
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.section>
          </>
        )}
      </div>
    </div>
  );
};

export default EcosystemIntegration;
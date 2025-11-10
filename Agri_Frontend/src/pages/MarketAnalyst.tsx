import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  BarChart3, 
  Calendar,
  AlertCircle,
  RefreshCw
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
const API_BASE = "http://127.0.0.1:8000";
const MarketAnalyst = () => {
  const [selectedItem, setSelectedItem] = useState("wheat");
  const [timeframe, setTimeframe] = useState("1month");


 useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`${API_BASE}/api_model/item-price/${selectedItem}`);
        const data = await res.json();
      } catch (err) {
        console.error("Error fetching market data:", err);
      }
    };
    fetchData();
  }, [selectedItem]);



  const marketDataMock = {

    wheat: {
      currentPrice: 45.50,
      change: 2.3,
      trend: "up",
      priceHistory: [
        { date: "Jan", price: 42 },
        { date: "Feb", price: 44 },
        { date: "Mar", price: 43 },
        { date: "Apr", price: 45 },
        { date: "May", price: 46 },
        { date: "Jun", price: 45.5 }
      ]
    },
    corn: {
      currentPrice: 38.20,
      change: -1.5,
      trend: "down",
      priceHistory: [
        { date: "Jan", price: 40 },
        { date: "Feb", price: 39 },
        { date: "Mar", price: 40.5 },
        { date: "Apr", price: 39.8 },
        { date: "May", price: 38.5 },
        { date: "Jun", price: 38.2 }
      ]
    },
    rice: {
      currentPrice: 52.75,
      change: 4.2,
      trend: "up",
      priceHistory: [
        { date: "Jan", price: 48 },
        { date: "Feb", price: 49 },
        { date: "Mar", price: 50 },
        { date: "Apr", price: 51 },
        { date: "May", price: 52 },
        { date: "Jun", price: 52.75 }
      ]
    }
  };

  const topItemsMock = [
    { name: "Rice", price: 52.75, change: 4.2, volume: "1,245 tons" },
    { name: "Wheat", price: 45.50, change: 2.3, volume: "2,180 tons" },
    { name: "Corn", price: 38.20, change: -1.5, volume: "3,420 tons" },
    { name: "Soybeans", price: 67.30, change: 1.8, volume: "890 tons" },
    { name: "Cotton", price: 89.45, change: -0.8, volume: "560 tons" }
  ];

  const currentItemData = marketDataMock[selectedItem as keyof typeof marketDataMock];

  
 

  return (
    <div className="min-h-full bg-background p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">📊 Market Analyst</h1>
          <p className="text-xl text-muted-foreground max-w-2xl">
            Real-time market prices, trends analysis, and AI-powered trading recommendations for agricultural commodities.
          </p>
        </motion.div>

        {/* Controls */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="agricultural-card p-6 mb-8">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
            <div className="flex flex-col sm:flex-row gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Select Item</label>
                <select
                  value={selectedItem}
                  onChange={(e) => setSelectedItem(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="wheat">Wheat</option>
                  <option value="corn">Corn</option>
                  <option value="rice">Rice</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Timeframe</label>
                <select
                  value={timeframe}
                  onChange={(e) => setTimeframe(e.target.value)}
                  className="px-4 py-2 border border-input rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  <option value="1week">1 Week</option>
                  <option value="1month">1 Month</option>
                  <option value="3months">3 Months</option>
                  <option value="1year">1 Year</option>
                </select>
              </div>
            </div>

            <button className="flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Refresh Data
            </button>
          </div>
        </motion.div>

        {/* Charts and Top Items */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }} className="xl:col-span-2 space-y-6">
            {/* Current Price Card */}
            <div className="agricultural-card p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground capitalize">{selectedItem} Market Price</h2>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Last updated: 2 mins ago</span>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-foreground mb-1">${currentItemData.currentPrice}</div>
                  <div className="text-sm text-muted-foreground">per quintal</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold mb-1 flex items-center justify-center gap-2 ${
                    currentItemData.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {currentItemData.trend === 'up' ? <TrendingUp className="w-6 h-6" /> : <TrendingDown className="w-6 h-6" />}
                    {currentItemData.change > 0 ? '+' : ''}{currentItemData.change}%
                  </div>
                  <div className="text-sm text-muted-foreground">24h change</div>
                </div>
              </div>

              {/* Price Chart */}
              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={currentItemData.priceHistory}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                    <XAxis dataKey="date" stroke="#64748b" fontSize={12} />
                    <YAxis stroke="#64748b" fontSize={12} domain={['dataMin - 2', 'dataMax + 2']} />
                    <Tooltip contentStyle={{ backgroundColor: 'white', border: '1px solid #e2e8f0', borderRadius: '8px' }} />
                    <Line type="monotone" dataKey="price" stroke="#16a34a" strokeWidth={3} dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }} activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2 }} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Top Items */}
            <div className="agricultural-card p-6">
              <h3 className="text-xl font-semibold text-foreground mb-6 flex items-center gap-3">
                <BarChart3 className="w-5 h-5 text-primary" />Today's Top Performers
              </h3>
              <div className="space-y-4">
                {topItemsMock.map((item, index) => (
                  <motion.div key={item.name} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + index * 0.1 }} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg hover:bg-muted/50 transition-colors">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-gradient-primary rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{item.name.charAt(0)}</span>
                      </div>
                      <div>
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">Vol: {item.volume}</div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-foreground">${item.price}</div>
                      <div className={`text-sm font-medium ${item.change > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {item.change > 0 ? '+' : ''}{item.change}%
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default MarketAnalyst;

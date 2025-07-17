import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Clock, 
  Zap, 
  BarChart3, 
  Eye, 
  Target,
  CheckCircle,
  TrendingDown,
  Users,
  Activity,
  Sparkles
} from 'lucide-react';

const CustomToolAnimation: React.FC = React.memo(() => {
  const [currentScene, setCurrentScene] = useState<'pain' | 'turning' | 'daily' | 'ux' | 'market'>('pain');

  useEffect(() => {
    const sceneDuration = 5000; // 5 seconds per scene

    const interval = setInterval(() => {
      setCurrentScene((prev) => {
        if (prev === 'pain') return 'turning';
        if (prev === 'turning') return 'daily';
        if (prev === 'daily') return 'ux';
        if (prev === 'ux') return 'market';
        return 'pain';
      });
    }, sceneDuration);

    return () => clearInterval(interval);
  }, []);

  const dashboardTabs = useMemo(() => [
    { name: "Daily Report", icon: BarChart3, active: true },
    { name: "UX Monitor", icon: Eye, active: false },
    { name: "Market Watch", icon: Target, active: false }
  ], []);

  return (
    <div className="relative rounded-xl overflow-hidden bg-gray-900/50 border border-gray-700 h-80">
      <AnimatePresence mode="wait">
        {/* Scene 1 - The Pain */}
        {currentScene === 'pain' && (
          <motion.div
            key="pain"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              className="w-20 h-20 bg-red-500/10 border-2 border-red-500/20 rounded-2xl flex items-center justify-center mb-6"
            >
              <Clock className="w-10 h-10 text-red-400" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center max-w-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Still stuck doing everything manually?
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                No dashboards. No visibility. Just messy processes and wasted hours.
              </p>
            </motion.div>

            {/* Floating timer icons */}
            <div className="absolute inset-0 pointer-events-none">
              {[...Array(4)].map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 0.2, scale: 1 }}
                  transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                  className="absolute w-8 h-8 bg-red-500/20 rounded-lg flex items-center justify-center"
                  style={{
                    left: `${15 + (i * 20)}%`,
                    top: `${20 + (i * 15)}%`,
                  }}
                >
                  <Clock className="w-4 h-4 text-red-400" />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Scene 2 - The Turning Point */}
        {currentScene === 'turning' && (
          <motion.div
            key="turning"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 flex flex-col items-center justify-center p-8 bg-gradient-to-br from-cyan-500/5 to-blue-500/5"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
              className="w-24 h-24 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
            >
              <Sparkles className="w-12 h-12 text-white" />
            </motion.div>
            
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-center max-w-lg"
            >
              <h3 className="text-2xl font-bold text-white mb-4">
                Let's automate that.
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                We build internal tools tailored to your exact workflows.
              </p>
            </motion.div>

            {/* BoostAI Logo */}
            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 1, duration: 0.6, type: "spring", stiffness: 200 }}
              className="mt-8"
            >
              <div className="backdrop-blur-xl bg-white/10 border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
                <img src="/assets/Logo2.png" alt="BoostAI Consulting" className="h-10 w-auto" />
              </div>
            </motion.div>
          </motion.div>
        )}

        {/* Scene 3 - Daily Report Solution */}
        {currentScene === 'daily' && (
          <motion.div
            key="daily"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 p-4"
          >
            {/* Dashboard Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-600 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">Daily Report Dashboard</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-1 mb-4"
            >
              {dashboardTabs.map((tab, index) => (
                <div
                  key={tab.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    tab.name === "Daily Report"
                      ? 'bg-cyan-500/20 text-cyan-400 border border-cyan-500/30' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* AI Summary Card */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Zap className="w-4 h-4 text-cyan-400" />
                  <span className="text-white text-xs font-medium">AI Summary</span>
                </div>
                <div className="text-cyan-400 text-sm font-medium">Daily insights generated</div>
              </motion.div>

              {/* Automation Toggle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-medium">Auto Reports</span>
                  <div className="w-6 h-3 bg-cyan-500 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </motion.div>

              {/* Chart Preview */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs font-medium">Performance</span>
                </div>
                <div className="w-full h-8 bg-gray-700 rounded flex items-end space-x-1 p-1">
                  <div className="w-2 bg-green-400 rounded-t" style={{ height: '60%' }}></div>
                  <div className="w-2 bg-green-400 rounded-t" style={{ height: '80%' }}></div>
                  <div className="w-2 bg-green-400 rounded-t" style={{ height: '40%' }}></div>
                  <div className="w-2 bg-green-400 rounded-t" style={{ height: '90%' }}></div>
                </div>
              </motion.div>

              {/* Status Card */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs font-medium">Status</span>
                </div>
                <div className="text-green-400 text-sm font-medium">Report ready</div>
              </motion.div>
            </div>


          </motion.div>
        )}

        {/* Scene 4 - UX Monitor Solution */}
        {currentScene === 'ux' && (
          <motion.div
            key="ux"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 p-4"
          >
            {/* Dashboard Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-600 rounded-lg flex items-center justify-center">
                  <Eye className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">UX Monitor Dashboard</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-1 mb-4"
            >
              {dashboardTabs.map((tab, index) => (
                <div
                  key={tab.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    tab.name === "UX Monitor"
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* User Behavior Card */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Users className="w-4 h-4 text-purple-400" />
                  <span className="text-white text-xs font-medium">User Behavior</span>
                </div>
                <div className="text-purple-400 text-sm font-medium">Real-time tracking</div>
              </motion.div>

              {/* Heatmap Toggle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-medium">Heatmap</span>
                  <div className="w-6 h-3 bg-purple-500 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </motion.div>

              {/* Session Recording */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-pink-400" />
                  <span className="text-white text-xs font-medium">Sessions</span>
                </div>
                <div className="text-pink-400 text-sm font-medium">1,247 recorded</div>
              </motion.div>

              {/* Conversion Rate */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs font-medium">Conversion</span>
                </div>
                <div className="text-green-400 text-sm font-medium">+23% this week</div>
              </motion.div>
            </div>


          </motion.div>
        )}

        {/* Scene 5 - Market Watch Solution */}
        {currentScene === 'market' && (
          <motion.div
            key="market"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 p-4"
          >
            {/* Dashboard Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-orange-500 to-red-600 rounded-lg flex items-center justify-center">
                  <Target className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">Market Watch Dashboard</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Tabs */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-1 mb-4"
            >
              {dashboardTabs.map((tab, index) => (
                <div
                  key={tab.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    tab.name === "Market Watch"
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30' 
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Dashboard Content */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Competitor Alert */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <Activity className="w-4 h-4 text-orange-400" />
                  <span className="text-white text-xs font-medium">Competitor Alert</span>
                </div>
                <div className="text-orange-400 text-sm font-medium">New feature detected</div>
              </motion.div>

              {/* Market Trends */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between">
                  <span className="text-white text-xs font-medium">Trends</span>
                  <div className="w-6 h-3 bg-orange-500 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
              </motion.div>

              {/* Market Share */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.0 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-4 h-4 text-red-400" />
                  <span className="text-white text-xs font-medium">Market Share</span>
                </div>
                <div className="text-red-400 text-sm font-medium">+5.2% this month</div>
              </motion.div>

              {/* Price Monitoring */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1.2 }}
                className="bg-gray-800/50 rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center space-x-2 mb-2">
                  <TrendingDown className="w-4 h-4 text-green-400" />
                  <span className="text-white text-xs font-medium">Price Changes</span>
                </div>
                <div className="text-green-400 text-sm font-medium">3 alerts today</div>
              </motion.div>
            </div>


          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
});

export default CustomToolAnimation; 
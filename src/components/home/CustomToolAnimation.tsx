import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Clock, AlertTriangle, Sparkles, BarChart3, TrendingUp, Users, Zap, Settings, CheckCircle, ArrowRight, Calendar, FileText, PieChart, Activity, Target, Award } from 'lucide-react';

const CustomToolAnimation: React.FC = () => {
  const [currentScene, setCurrentScene] = useState<'pain' | 'turning' | 'daily' | 'seo' | 'content'>('pain');

  useEffect(() => {
    const scenes: Array<'pain' | 'turning' | 'daily' | 'seo' | 'content'> = ['pain', 'turning', 'daily', 'seo', 'content'];
    let currentIndex = 0;

    const interval = setInterval(() => {
      currentIndex = (currentIndex + 1) % scenes.length;
      setCurrentScene(scenes[currentIndex]);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const dashboardTabs = [
    { name: "Daily Report", icon: FileText },
    { name: "Analytics", icon: BarChart3 },
    { name: "Performance", icon: TrendingUp }
  ];

  const seoTabs = [
    { name: "Keywords", icon: Target },
    { name: "Traffic", icon: TrendingUp },
    { name: "Rankings", icon: Award }
  ];

  const contentTabs = [
    { name: "Articles", icon: FileText },
    { name: "Engagement", icon: Users },
    { name: "Analytics", icon: PieChart }
  ];

  return (
    <div className="relative rounded-xl overflow-hidden bg-black border border-gray-700 h-80">
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
            {/* Floating pain indicators */}
            {[0, 1, 2, 3].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0.2, scale: 1 }}
                transition={{ delay: 0.8 + i * 0.1, duration: 0.5 }}
                className="absolute w-8 h-8 border border-red-500/20 rounded-lg flex items-center justify-center"
                style={{
                  left: `${15 + (i * 20)}%`,
                  top: `${20 + (i * 15)}%`
                }}
              >
                <AlertTriangle className="w-4 h-4 text-red-400" />
              </motion.div>
            ))}

            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }}
              className="w-20 h-20 border-2 border-red-500/20 rounded-2xl flex items-center justify-center mb-6"
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
                Manual tasks taking forever?
              </h3>
              <p className="text-gray-400 text-base leading-relaxed">
                Reports, data entry, repetitive workflows... there's a better way.
              </p>
            </motion.div>
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
            className="absolute inset-0 flex flex-col items-center justify-center p-8"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, duration: 0.6, type: "spring", stiffness: 200 }}
              className="w-24 h-24 border border-white/20 rounded-3xl flex items-center justify-center mb-6 shadow-2xl"
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
              <div className="bg-black border border-white/20 rounded-2xl px-6 py-4 shadow-2xl">
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
                <div className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center">
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
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-black rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">AI Summary</span>
                  <Zap className="w-4 h-4 text-cyan-400" />
                </div>
                <div className="text-cyan-400 text-sm font-medium">Daily insights generated</div>
              </motion.div>

              {/* Time Saved Card */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-black rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Time Saved</span>
                  <div className="w-6 h-3 bg-cyan-500 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="text-white text-sm font-medium">2.5 hours/day</div>
              </motion.div>

              {/* Chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-black rounded-lg p-3 border border-gray-700 col-span-2"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">Weekly Progress</span>
                  <div className="flex space-x-1">
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '60%' }}></div>
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '80%' }}></div>
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '40%' }}></div>
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '90%' }}></div>
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '70%' }}></div>
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '85%' }}></div>
                    <div className="w-2 bg-green-400 rounded-t" style={{ height: '95%' }}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scene 4 - SEO Solution */}
        {currentScene === 'seo' && (
          <motion.div
            key="seo"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 p-4"
          >
            {/* SEO Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">SEO Performance</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* SEO Tabs */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-1 mb-4"
            >
              {seoTabs.map((tab, index) => (
                <div
                  key={tab.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    tab.name === "Keywords"
                      ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.name}</span>
                </div>
              ))}
            </motion.div>

            {/* SEO Content */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Keyword Rankings */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-black rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Top Keywords</span>
                  <Target className="w-4 h-4 text-purple-400" />
                </div>
                <div className="text-purple-400 text-sm font-medium">15 ranking #1-3</div>
              </motion.div>

              {/* Traffic Growth */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-black rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Traffic Growth</span>
                  <div className="w-6 h-3 bg-purple-500 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="text-white text-sm font-medium">+127% this month</div>
              </motion.div>

              {/* Rankings Chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-black rounded-lg p-3 border border-gray-700 col-span-2"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">Keyword Rankings</span>
                  <div className="flex space-x-1">
                    <div className="w-2 bg-purple-400 rounded-t" style={{ height: '90%' }}></div>
                    <div className="w-2 bg-purple-400 rounded-t" style={{ height: '75%' }}></div>
                    <div className="w-2 bg-purple-400 rounded-t" style={{ height: '85%' }}></div>
                    <div className="w-2 bg-purple-400 rounded-t" style={{ height: '60%' }}></div>
                    <div className="w-2 bg-purple-400 rounded-t" style={{ height: '95%' }}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}

        {/* Scene 5 - Content Solution */}
        {currentScene === 'content' && (
          <motion.div
            key="content"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 p-4"
          >
            {/* Content Header */}
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex items-center justify-between mb-4"
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 border border-white/20 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <span className="text-white font-semibold text-sm">Content Hub</span>
              </div>
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
              </div>
            </motion.div>

            {/* Content Tabs */}
            <motion.div
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="flex space-x-1 mb-4"
            >
              {contentTabs.map((tab, index) => (
                <div
                  key={tab.name}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
                    tab.name === "Articles"
                      ? 'bg-orange-500/20 text-orange-400 border border-orange-500/30'
                      : 'text-gray-400 hover:text-gray-300'
                  }`}
                >
                  <tab.icon className="w-3 h-3" />
                  <span>{tab.name}</span>
                </div>
              ))}
            </motion.div>

            {/* Content Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              {/* Articles Published */}
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="bg-black rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Published</span>
                  <FileText className="w-4 h-4 text-orange-400" />
                </div>
                <div className="text-orange-400 text-sm font-medium">47 articles this month</div>
              </motion.div>

              {/* Engagement Rate */}
              <motion.div
                initial={{ x: 20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7 }}
                className="bg-black rounded-lg p-3 border border-gray-700"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs text-gray-400">Engagement</span>
                  <div className="w-6 h-3 bg-orange-500 rounded-full relative">
                    <div className="w-2 h-2 bg-white rounded-full absolute right-0.5 top-0.5"></div>
                  </div>
                </div>
                <div className="text-white text-sm font-medium">8.9% avg. rate</div>
              </motion.div>

              {/* Performance Chart */}
              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="bg-black rounded-lg p-3 border border-gray-700 col-span-2"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs text-gray-400">Content Performance</span>
                  <div className="flex space-x-1">
                    <div className="w-2 bg-orange-400 rounded-t" style={{ height: '70%' }}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{ height: '85%' }}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{ height: '60%' }}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{ height: '90%' }}></div>
                    <div className="w-2 bg-orange-400 rounded-t" style={{ height: '75%' }}></div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CustomToolAnimation; 
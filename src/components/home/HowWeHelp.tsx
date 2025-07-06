import React from 'react';
import { Wrench, Globe, Lightbulb } from 'lucide-react';

const HowWeHelp: React.FC = () => (
  <section className="py-20 relative z-10">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">How We Help</h2>
      <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
        Concrete solutions for real problems. We help you save time and focus on what matters.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 group hover:bg-gray-800/50">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Wrench className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors">Custom Tools</h3>
          <p className="text-gray-300">
            Automate your tasks with custom tools (OCR, dashboards, etc.)
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 group hover:bg-gray-800/50">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Globe className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors">Online Presence</h3>
          <p className="text-gray-300">
            Websites, landing pages, and Instagram to make your business visible and credible.
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 group hover:bg-gray-800/50">
          <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
            <Lightbulb className="w-6 h-6 text-white" />
          </div>
          <h3 className="text-xl font-semibold mb-4 text-white group-hover:text-cyan-400 transition-colors">Tech Guidance</h3>
          <p className="text-gray-300">
            We help you choose the right tools — no jargon, just results.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HowWeHelp; 
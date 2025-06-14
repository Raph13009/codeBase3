import React from 'react';
import { Wrench, Globe, Lightbulb } from 'lucide-react';

const HowWeHelp: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4">How We Help</h2>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Concrete solutions for real problems. We help you save time and focus on what matters.
      </p>
      
      <div className="grid md:grid-cols-3 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <Wrench className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Custom Tools</h3>
          <p className="text-gray-600">
            Automate your tasks with custom tools (OCR, dashboards, etc.)
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <Globe className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Online Presence</h3>
          <p className="text-gray-600">
            Websites, landing pages, and Instagram to make your business visible and credible.
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mb-6">
            <Lightbulb className="w-6 h-6 text-blue-600" />
          </div>
          <h3 className="text-xl font-semibold mb-4">Tech Guidance</h3>
          <p className="text-gray-600">
            We help you choose the right tools — no jargon, just results.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default HowWeHelp; 
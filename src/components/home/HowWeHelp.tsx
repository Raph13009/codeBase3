import React from 'react';
import { Wrench, Globe, Lightbulb } from 'lucide-react';
import PixelTransition from '../ui/PixelTransition';

const HowWeHelp: React.FC = () => (
  <section className="py-20 relative z-10">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">How We Help</h2>
      <p className="text-xl text-gray-300 text-center mb-8 max-w-3xl mx-auto">
        Concrete solutions for real problems. We help you save time and focus on what matters.
      </p>
      
      <div className="text-center mb-12">
        <p className="text-lg text-cyan-400 font-medium">💡 Hover or click on cards to see details</p>
      </div>
      
      <div className="grid grid-cols-3 gap-4 md:gap-8">
        <div className="flex justify-center">
          <PixelTransition
            firstContent={
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-4 p-2 rounded-xl border border-gray-700 h-full flex flex-col justify-center items-center text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <Wrench className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-xl font-semibold text-white leading-tight">Custom Tools</h3>
              </div>
            }
            secondContent={
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-4 p-2 rounded-xl border border-gray-700 h-full flex flex-col justify-center items-center text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <Wrench className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-xl font-semibold mb-2 md:mb-4 text-white leading-tight">Custom Tools</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  Automate your tasks<br />with custom tools<br />(OCR, dashboards, etc.)
                </p>
              </div>
            }
            gridSize={12}
            pixelColor='#00d4ff'
            animationStepDuration={0.4}
            className="custom-pixel-card"
            style={{ width: '100%', maxWidth: '400px' }}
            aspectRatio="120%"
          />
        </div>

        <div className="flex justify-center">
          <PixelTransition
            firstContent={
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-4 p-2 rounded-xl border border-gray-700 h-full flex flex-col justify-center items-center text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <Globe className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-xl font-semibold text-white leading-tight">Online Presence</h3>
              </div>
            }
            secondContent={
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-4 p-2 rounded-xl border border-gray-700 h-full flex flex-col justify-center items-center text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <Globe className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-xl font-semibold mb-2 md:mb-4 text-white leading-tight">Online Presence</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  Websites, landing pages,<br />and digital platforms<br />to make your business<br />visible and credible.
                </p>
              </div>
            }
            gridSize={12}
            pixelColor='#00d4ff'
            animationStepDuration={0.4}
            className="custom-pixel-card"
            style={{ width: '100%', maxWidth: '400px' }}
            aspectRatio="120%"
          />
        </div>

        <div className="flex justify-center">
          <PixelTransition
            firstContent={
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-4 p-2 rounded-xl border border-gray-700 h-full flex flex-col justify-center items-center text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-xl font-semibold text-white leading-tight">Tech Guidance</h3>
              </div>
            }
            secondContent={
              <div className="bg-gray-900/50 backdrop-blur-sm p-4 md:p-4 p-2 rounded-xl border border-gray-700 h-full flex flex-col justify-center items-center text-center">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-lg flex items-center justify-center mb-2 md:mb-3">
                  <Lightbulb className="w-3 h-3 md:w-4 md:h-4 text-white" />
                </div>
                <h3 className="text-xs md:text-xl font-semibold mb-2 md:mb-4 text-white leading-tight">Tech Guidance</h3>
                <p className="text-gray-300 text-xs md:text-sm leading-relaxed">
                  We help you choose<br />the right tools —<br />no jargon, just results.
                </p>
              </div>
            }
            gridSize={12}
            pixelColor='#00d4ff'
            animationStepDuration={0.4}
            className="custom-pixel-card"
            style={{ width: '100%', maxWidth: '400px' }}
            aspectRatio="120%"
          />
        </div>
      </div>
    </div>
  </section>
);

export default HowWeHelp; 
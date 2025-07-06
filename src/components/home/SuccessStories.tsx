import React from 'react';

const SuccessStories: React.FC = () => (
  <section className="py-20 relative z-10">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4 text-white">They Trusted Us</h2>
      <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
        Real results for entrepreneurs like you
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 group hover:bg-gray-800/50">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/images/CodigLogo.png" 
                alt="Codig Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">Codig</h3>
              <p className="text-sm text-gray-400">International chemical distribution company</p>
            </div>
          </div>
          <p className="text-gray-300 italic mb-4 leading-relaxed">
            "Huge thanks for the OCR tool — I used to waste over 30 minutes manually entering data. Now it's done in seconds. Total game-changer for my team."
          </p>
          <p className="text-cyan-400 font-medium">
            — Sophie, Head of Accounting
          </p>
        </div>

        <div className="bg-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700 hover:border-cyan-500 transition-all duration-300 group hover:bg-gray-800/50">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/images/logo_BG.png" 
                alt="Blue Garden Logo" 
                className="w-8 h-8 object-contain"
              />
            </div>
            <div>
              <h3 className="font-semibold text-white group-hover:text-cyan-400 transition-colors">Blue Garden</h3>
              <p className="text-sm text-gray-400">Social impact organization</p>
            </div>
          </div>
          <p className="text-gray-300 italic mb-4 leading-relaxed">
            "The site is exactly what I had in mind. Clean, modern and perfectly aligned with Blue Garden's spirit. I'm proud to share it with my clients."
          </p>
          <p className="text-cyan-400 font-medium">
            — Nacia, Director
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default SuccessStories; 
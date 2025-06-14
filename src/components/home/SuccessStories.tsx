import React from 'react';

const SuccessStories: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4">They Trusted Us</h2>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Real results for entrepreneurs like you
      </p>
      
      <div className="grid md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-6">
            <img 
              src="/images/CodigLogo.png" 
              alt="Codig Logo" 
              className="w-12 h-12 object-contain mr-4"
            />
            <div>
              <h3 className="font-semibold">Codig</h3>
              <p className="text-sm text-gray-500">International chemical distribution company</p>
            </div>
          </div>
          <p className="text-gray-700 italic mb-4">
            "Huge thanks for the OCR tool — I used to waste over 30 minutes manually entering data. Now it's done in seconds. Total game-changer for my team."
          </p>
          <p className="text-blue-600 font-medium">
            — Sophie, Head of Accounting
          </p>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
          <div className="flex items-center mb-6">
            <img 
              src="/images/logo_BG.png" 
              alt="Blue Garden Logo" 
              className="w-12 h-12 object-contain mr-4"
            />
            <div>
              <h3 className="font-semibold">Blue Garden</h3>
              <p className="text-sm text-gray-500">Social impact organization</p>
            </div>
          </div>
          <p className="text-gray-700 italic mb-4">
            "The site is exactly what I had in mind. Clean, modern and perfectly aligned with Blue Garden's spirit. I'm proud to share it with my clients."
          </p>
          <p className="text-blue-600 font-medium">
            — Nacia, Director
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default SuccessStories; 
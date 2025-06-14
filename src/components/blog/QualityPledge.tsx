import React from 'react';

const QualityPledge: React.FC = () => (
  <section className="py-20 bg-gray-50">
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-2xl shadow text-center">
      <div className="flex justify-center mb-4">
        <span className="inline-block text-blue-600">
          <svg width="40" height="40" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M12 2l7 4v6c0 5.25-3.5 10-7 10s-7-4.75-7-10V6l7-4zm0 2.18L6 6.09v5.91c0 4.5 2.94 8.5 6 8.5s6-4 6-8.5V6.09l-6-1.91zm0 3.32a1 1 0 01.993.883L13 8v4a1 1 0 01-1.993.117L11 12V8a1 1 0 011-1zm0 8a1.25 1.25 0 110 2.5 1.25 1.25 0 010-2.5z"></path></svg>
        </span>
      </div>
      <h3 className="text-2xl font-semibold mb-4">Quality Commitment</h3>
      <p className="text-gray-600 leading-relaxed mb-6">
        At BoostAI Consulting, we are committed to providing quality information based on thorough research and aligned with our values. We encourage you to consult multiple sources to form your own opinion. Despite our efforts to ensure the accuracy of our content, mistakes can happen. If you notice any inconsistencies, please contact us.
      </p>
      <button 
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="text-blue-600 hover:text-blue-700 font-medium flex items-center mx-auto"
      >
        Back to top ↑
      </button>
    </div>
  </section>
);

export default QualityPledge; 
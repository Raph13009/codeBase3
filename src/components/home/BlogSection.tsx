import React from 'react';
import { Link } from 'react-router-dom';

const BlogSection: React.FC = () => (
  <section className="py-20 bg-white">
    <div className="max-w-6xl mx-auto px-4">
      <h2 className="text-4xl font-bold text-center mb-4">Latest Insights</h2>
      <p className="text-xl text-gray-600 text-center mb-16 max-w-3xl mx-auto">
        Tips, trends, and insights about automation, AI, and digital tools
      </p>

      <div className="grid md:grid-cols-3 gap-8">
        <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img 
            src="/images/blog/ai-automation.jpg" 
            alt="AI and Automation" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">How AI is Transforming Small Business Operations</h3>
            <p className="text-gray-600 mb-4">
              Discover how AI tools can automate your daily tasks and boost productivity.
            </p>
            <Link to="/blog/ai-automation" className="text-blue-600 hover:text-blue-700 font-medium">
              Read more →
            </Link>
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img 
            src="/images/blog/ocr-tools.jpg" 
            alt="OCR Tools" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">OCR Tools: Save Hours of Manual Data Entry</h3>
            <p className="text-gray-600 mb-4">
              Learn how OCR technology can streamline your document processing workflow.
            </p>
            <Link to="/blog/ocr-tools" className="text-blue-600 hover:text-blue-700 font-medium">
              Read more →
            </Link>
          </div>
        </article>

        <article className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
          <img 
            src="/images/blog/digital-presence.jpg" 
            alt="Digital Presence" 
            className="w-full h-48 object-cover"
          />
          <div className="p-6">
            <h3 className="text-xl font-semibold mb-3">Building a Strong Digital Presence in 2024</h3>
            <p className="text-gray-600 mb-4">
              Essential strategies to make your business stand out online.
            </p>
            <Link to="/blog/digital-presence" className="text-blue-600 hover:text-blue-700 font-medium">
              Read more →
            </Link>
          </div>
        </article>
      </div>

      <div className="mt-16 text-center">
        <Link 
          to="/blog" 
          className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
        >
          View all articles
        </Link>
      </div>

      <div className="mt-20 p-8 bg-gray-50 rounded-2xl text-center">
        <h3 className="text-2xl font-semibold mb-4">Quality Commitment</h3>
        <p className="text-gray-600 leading-relaxed">
          At BoostAI Consulting, we are committed to providing quality information based on thorough research and aligned with our values. We encourage you to consult multiple sources to form your own opinion. Despite our efforts to ensure the accuracy of our content, mistakes can happen. If you notice any inconsistencies, please contact us.
        </p>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="mt-6 text-blue-600 hover:text-blue-700 font-medium flex items-center"
        >
          Back to top ↑
        </button>
      </div>
    </div>
  </section>
);

export default BlogSection; 
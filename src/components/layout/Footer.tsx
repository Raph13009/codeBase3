import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Linkedin, Mail, Phone, X } from 'lucide-react';

const Footer: React.FC = () => {
  const { t } = useTranslation();
  const [showPrivacyModal, setShowPrivacyModal] = useState(false);
  const [showTermsModal, setShowTermsModal] = useState(false);
  
  const currentYear = new Date().getFullYear();

  const PrivacyModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Privacy Policy</h2>
            <button
              onClick={() => setShowPrivacyModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="prose prose-sm text-gray-700 space-y-4">
            <p>
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Information We Collect</h3>
            <p>
              We collect information you provide directly to us, such as when you contact us, 
              subscribe to our newsletter, or use our services.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">How We Use Your Information</h3>
            <p>
              We use the information we collect to provide, maintain, and improve our services, 
              communicate with you, and comply with legal obligations.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Information Sharing</h3>
            <p>
              We do not sell, trade, or otherwise transfer your personal information to third parties 
              without your consent, except as described in this policy.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Contact Us</h3>
            <p>
              If you have any questions about this Privacy Policy, please contact us at 
              contact@boostaiconsulting.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  const TermsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-gray-900">Terms of Service</h2>
            <button
              onClick={() => setShowTermsModal(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
          </div>
          <div className="prose prose-sm text-gray-700 space-y-4">
            <p>
              <strong>Last updated:</strong> {new Date().toLocaleDateString()}
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Acceptance of Terms</h3>
            <p>
              By accessing and using BoostAI Consulting services, you accept and agree to be bound 
              by these Terms of Service.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Use of Services</h3>
            <p>
              You may use our services only for lawful purposes and in accordance with these Terms. 
              You agree not to use the services in any way that violates applicable laws.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Intellectual Property</h3>
            <p>
              The service and its original content, features, and functionality are owned by 
              BoostAI Consulting and are protected by copyright and other intellectual property laws.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Limitation of Liability</h3>
            <p>
              In no event shall BoostAI Consulting be liable for any indirect, incidental, 
              special, consequential, or punitive damages.
            </p>
            
            <h3 className="text-lg font-semibold mt-6">Contact Information</h3>
            <p>
              Questions about the Terms of Service should be sent to us at 
              contact@boostaiconsulting.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
  
  return (
    <>
      <footer className="bg-black/80 backdrop-blur-sm text-gray-300 border-t border-gray-800 relative z-10">
        <div className="container mx-auto px-4 md:px-6 pt-16 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-10">
            {/* Logo and About */}
            <div className="space-y-4">
              <Link to="/" className="inline-block">
                <img src="/assets/Logo2.png" alt="BoostAI Consulting" className="h-24 mb-6" />
              </Link>
              <div className="flex space-x-4 pt-2">
                <a
                  href="https://www.linkedin.com/company/boostai-consulting"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-cyan-400 transition-colors duration-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
            
            {/* Quick Links */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Quick Links</h3>
              <ul className="space-y-3">
                <li>
                  <Link to="/" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/solutions" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    Solutions
                  </Link>
                </li>
                <li>
                  <Link to="/blog" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    Blog
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            
            {/* Resources */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Resources</h3>
              <ul className="space-y-3">
                <li>
                  <button
                    onClick={() => setShowTermsModal(true)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-left"
                  >
                    Terms of Service
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => setShowPrivacyModal(true)}
                    className="text-gray-400 hover:text-cyan-400 transition-colors duration-300 text-left"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                    Support
                  </a>
                </li>
              </ul>
            </div>
            
            {/* Contact */}
            <div>
              <h3 className="text-white font-medium text-lg mb-4">Contact Us</h3>
              <ul className="space-y-4">
                <li className="flex items-center">
                  <Phone className="w-5 h-5 text-cyan-400 mr-3" />
                  <span className="text-gray-400">+33 6 02 61 73 29</span>
                </li>
                <li className="flex items-center">
                  <Mail className="w-5 h-5 text-cyan-400 mr-3" />
                  <a href="mailto:contact@boostaiconsulting.com" className="text-gray-400 hover:text-cyan-400 transition-colors duration-300">
                  contact@boostaiconsulting.com
                  </a>
                </li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
            <p>© {currentYear} BoostAI Consulting. All rights reserved.</p>
            <div className="mt-4 md:mt-0 flex space-x-4">
              <button
                onClick={() => setShowTermsModal(true)}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Terms of Service
              </button>
              <button
                onClick={() => setShowPrivacyModal(true)}
                className="hover:text-cyan-400 transition-colors duration-300"
              >
                Privacy Policy
              </button>
              <a href="#" className="hover:text-cyan-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      {showPrivacyModal && <PrivacyModal />}
      {showTermsModal && <TermsModal />}
    </>
  );
};

export default Footer;

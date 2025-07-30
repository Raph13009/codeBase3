import React from 'react';
import './ContactPopup.css';

interface ContactPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

const ContactPopup: React.FC<ContactPopupProps> = ({ isOpen, onClose }) => {
  React.useEffect(() => {
    if (isOpen) {
      document.body.classList.add('popup-open');
    } else {
      document.body.classList.remove('popup-open');
    }

    return () => {
      document.body.classList.remove('popup-open');
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleEmailClick = () => {
    window.open('mailto:raphaellevy027@gmail.com', '_blank');
  };

  const handleLinkedInClick = () => {
    window.open('https://www.linkedin.com/in/rapha%C3%ABl-levy-b7656a237/', '_blank');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/33602617329', '_blank');
  };

  const handleRedditClick = () => {
    window.open('https://www.reddit.com/user/Limp_Leader_9794/', '_blank');
  };

  return (
    <div className="contact-popup-overlay" onClick={onClose}>
      <div className="contact-popup" onClick={(e) => e.stopPropagation()}>
        <button className="contact-popup-close" onClick={onClose}>
          ×
        </button>
        
        <div className="contact-popup-header">
          <h3>Me Contacter</h3>
          <p>Choisissez votre méthode préférée</p>
        </div>

        <div className="contact-popup-content">
          <div className="contact-option" onClick={handleEmailClick}>
            <div className="contact-icon">
              <img src="/assets/gmail.png" alt="Gmail" />
            </div>
            <div className="contact-info">
              <h4>Gmail</h4>
              <p>raphaellevy027@gmail.com</p>
            </div>
          </div>

          <div className="contact-option" onClick={handleLinkedInClick}>
            <div className="contact-icon">
              <img src="/assets/linkedin.png" alt="LinkedIn" />
            </div>
            <div className="contact-info">
              <h4>LinkedIn</h4>
              <p>Raphaël Levy</p>
            </div>
          </div>

          <div className="contact-option" onClick={handleWhatsAppClick}>
            <div className="contact-icon">
              <img src="/assets/whatsapp.png" alt="WhatsApp" />
            </div>
            <div className="contact-info">
              <h4>WhatsApp</h4>
              <p>+33 6 02 61 73 29</p>
            </div>
          </div>

          <div className="contact-option" onClick={handleRedditClick}>
            <div className="contact-icon">
              <img src="/assets/reddit.png" alt="Reddit" />
            </div>
            <div className="contact-info">
              <h4>Reddit</h4>
              <p>Limp_Leader_9794</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPopup; 
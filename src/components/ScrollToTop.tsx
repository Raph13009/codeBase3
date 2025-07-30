import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ScrollToTop: React.FC = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll instantané vers le haut à chaque changement de route
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'instant'
    });
  }, [location.pathname]);

  useEffect(() => {
    // Gestion du refresh de page
    const handleBeforeUnload = () => {
      sessionStorage.setItem('scrollToTop', 'true');
    };

    const handleLoad = () => {
      if (sessionStorage.getItem('scrollToTop')) {
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'instant'
        });
        sessionStorage.removeItem('scrollToTop');
      }
    };

    // Gestion du retour en arrière/avant
    const handlePopState = () => {
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: 'instant'
      });
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    window.addEventListener('load', handleLoad);
    window.addEventListener('popstate', handlePopState);
    
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      window.removeEventListener('load', handleLoad);
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return null; // Ce composant ne rend rien
};

export default ScrollToTop; 
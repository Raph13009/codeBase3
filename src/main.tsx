import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// Smooth scrolling for anchor links and programmatic scrolls
document.addEventListener('DOMContentLoaded', () => {
  // Handle all anchor links
  const handleAnchorClick = (e: Event) => {
    const anchor = e.currentTarget as HTMLAnchorElement;
    const href = anchor.getAttribute('href');
    if (href && href !== '#' && href.startsWith('#')) {
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.getBoundingClientRect().top + window.pageYOffset;
        const headerOffset = 80; // Account for fixed header
        window.scrollTo({
          top: offsetTop - headerOffset,
          behavior: 'smooth'
        });
      }
    }
  };

  // Add event listeners to existing anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', handleAnchorClick);
  });

  // Observe for dynamically added anchor links
  const linkObserver = new MutationObserver(() => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      if (!anchor.hasAttribute('data-smooth-scroll')) {
        anchor.setAttribute('data-smooth-scroll', 'true');
        anchor.addEventListener('click', handleAnchorClick);
      }
    });
  });

  linkObserver.observe(document.body, {
    childList: true,
    subtree: true
  });
});

// Hide Botpress powered by message
const observer = new MutationObserver((mutations) => {
  document.querySelectorAll('.bpComposerPoweredBy').forEach(element => {
    element.setAttribute('data-hidden', 'true');
  });
});

// Start observing the document with the configured parameters
observer.observe(document.documentElement, { 
  childList: true, 
  subtree: true 
});

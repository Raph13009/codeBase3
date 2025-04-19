import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById("root")!).render(<App />);

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

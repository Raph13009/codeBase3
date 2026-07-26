import { useEffect } from 'react';

const CSS = `
:root {
  --lumio-page-bg: #FAF9F5;
  --lumio-panel-bg: #F0EFEB;
  --lumio-soft-card: #E9E8E4;
  --lumio-text: #1B1B1B;
  --lumio-muted: #8C8880;
  --lumio-line: #D9D7D0;
  --lumio-white-card: #FFFDF8;
}
.lumio-page {
  background-color: var(--lumio-page-bg);
  color: var(--lumio-text);
  font-family: Helvetica, Arial, sans-serif;
  min-height: 100vh;
  -webkit-font-smoothing: antialiased;
}
.lumio-page .text-muted-lumio { color: var(--lumio-muted); }
.lumio-page .bg-panel-lumio { background-color: var(--lumio-panel-bg); }
.lumio-page .bg-card-lumio { background-color: var(--lumio-white-card); }
.lumio-page .border-line-lumio { border-color: var(--lumio-line); }
`;

/** Injects shared Lumio tokens + cream page class helpers. */
const LumioStyles = () => {
  useEffect(() => {
    const id = 'lumio-shared-styles';
    if (!document.getElementById(id)) {
      const style = document.createElement('style');
      style.id = id;
      style.textContent = CSS;
      document.head.appendChild(style);
    }
    const fontId = 'material-symbols-lumio';
    if (!document.getElementById(fontId)) {
      const link = document.createElement('link');
      link.id = fontId;
      link.rel = 'stylesheet';
      link.href =
        'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap';
      document.head.appendChild(link);
    }
    const prev = document.body.style.backgroundColor;
    document.body.style.backgroundColor = '#FAF9F5';
    return () => {
      document.body.style.backgroundColor = prev;
    };
  }, []);

  return null;
};

export default LumioStyles;

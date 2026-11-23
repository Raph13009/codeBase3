import React from 'react';

/**
 * Kept for the pages that render it. The Google tag (G-8WY18DVJ39) is loaded once for the whole site in the root
 * layout. Under Vite this component's <script> tags were inserted by React on the client and never executed;
 * rendered on the server they would run and count each visit twice, so it renders nothing.
 */
const GoogleAnalytics: React.FC = () => null;

export default GoogleAnalytics;

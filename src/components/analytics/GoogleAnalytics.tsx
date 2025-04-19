import React from 'react';

const GoogleAnalytics: React.FC = () => {
  return (
    <>
      <script
        async
        src="https://www.googletagmanager.com/gtag/js?id=G-8WY18DVJ39"
      />
      <script
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-8WY18DVJ39');
          `,
        }}
      />
    </>
  );
};

export default GoogleAnalytics; 
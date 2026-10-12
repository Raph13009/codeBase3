import React from 'react';
import { Link } from 'react-router-dom';
import BoostAIMark from '@/components/brand/BoostAIMark';

type BoostAILogoProps = {
  to?: string | null | false;
  /** Horizontal mark + wordmark (nav) or stacked (footer/hero) */
  layout?: 'horizontal' | 'stacked';
  /** Light wordmark for dark backgrounds */
  inverted?: boolean;
  markSize?: number;
  className?: string;
  showConsulting?: boolean;
};

const BoostAILogo: React.FC<BoostAILogoProps> = ({
  to = '/',
  layout = 'horizontal',
  inverted = false,
  markSize = 36,
  className = '',
  showConsulting = true,
}) => {
  const textColor = inverted ? 'text-white' : 'text-boost-navy';
  const consultingColor = inverted ? 'text-white/70' : 'text-boost-muted';

  const content = (
    <span
      className={`inline-flex items-center gap-3 ${
        layout === 'stacked' ? 'flex-col gap-2 text-center' : ''
      } ${className}`}
    >
      <BoostAIMark size={markSize} to={false} />
      <span className={`flex flex-col ${layout === 'horizontal' ? 'items-start leading-none' : 'items-center'}`}>
        <span
          className={`font-sans font-bold tracking-[0.04em] uppercase ${textColor}`}
          style={{ fontSize: layout === 'stacked' ? '1.35rem' : '0.95rem' }}
        >
          BoostAI
        </span>
        {showConsulting && (
          <span
            className={`font-sans font-medium uppercase ${consultingColor}`}
            style={{
              fontSize: layout === 'stacked' ? '0.62rem' : '0.52rem',
              letterSpacing: '0.28em',
              marginTop: '0.2em',
            }}
          >
            Consulting
          </span>
        )}
      </span>
    </span>
  );

  if (typeof to === 'string' && to.length > 0) {
    return (
      <Link
        to={to}
        aria-label="BoostAI Consulting Accueil"
        className="inline-flex focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-boost-purple focus-visible:ring-offset-2"
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default BoostAILogo;

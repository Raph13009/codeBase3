import React from 'react';
import { Link } from 'react-router-dom';

type BoostAIMarkProps = {
  size?: number;
  /** Pass null/false to render mark without a link */
  to?: string | null | false;
  className?: string;
  /** Kept for call-site compatibility; always uses the dark mark */
  variant?: 'onDark' | 'onLight' | 'onBlackFill';
  'aria-label'?: string;
};

function pickSrc(size: number) {
  const need = size * 2;
  if (need <= 64) {
    return { webp: '/brand/boostai-logo-64.webp', png: '/brand/boostai-logo-64.png' };
  }
  if (need <= 128) {
    return { webp: '/brand/boostai-logo-128.webp', png: '/brand/boostai-logo-128.png' };
  }
  return { webp: '/brand/boostai-logo-192.webp', png: '/brand/boostai-logo.png' };
}

const BoostAIMark: React.FC<BoostAIMarkProps> = ({
  size = 34,
  to = '/',
  className = '',
  'aria-label': ariaLabel = 'BoostAI Accueil',
}) => {
  const assets = pickSrc(size);
  const linked = typeof to === 'string' && to.length > 0;

  const mark = (
    <picture>
      <source srcSet={assets.webp} type="image/webp" />
      <img
        src={assets.png}
        alt=""
        width={size}
        height={size}
        decoding="async"
        className={`shrink-0 rounded-full object-contain ${className}`}
        style={{ width: size, height: size }}
        aria-hidden={linked ? undefined : true}
      />
    </picture>
  );

  if (!linked) return mark;

  return (
    <Link to={to} aria-label={ariaLabel} className="shrink-0 inline-flex">
      {mark}
    </Link>
  );
};

export default BoostAIMark;

import React from 'react';
import { Link } from 'react-router-dom';

type BoostAIMarkProps = {
  size?: number;
  /** Pass null/false to render mark without a link */
  to?: string | null | false;
  className?: string;
  /** Kept for call-site compatibility */
  variant?: 'onDark' | 'onLight' | 'onBlackFill';
  'aria-label'?: string;
};

function pickSrc(size: number) {
  const need = size * 2;
  if (need <= 64) {
    return { webp: '/brand/boostai-symbol-64.webp', png: '/brand/boostai-symbol-64.png' };
  }
  if (need <= 128) {
    return { webp: '/brand/boostai-symbol-128.webp', png: '/brand/boostai-symbol-128.png' };
  }
  if (need <= 192) {
    return { webp: '/brand/boostai-symbol-192.webp', png: '/brand/boostai-symbol-192.png' };
  }
  return { webp: '/brand/boostai-symbol-512.webp', png: '/brand/boostai-symbol-512.png' };
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
        className={`shrink-0 object-contain ${className}`}
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

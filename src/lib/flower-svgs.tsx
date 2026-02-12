import React from 'react';
import {
  HibiscusSVG, LotusSVG, JasmineSVG, MagnoliaSVG, MarigoldSVG,
  CosmosSVG, BluebellSVG, DaffodilSVG, PansySVG, ZinniaSVG,
  EucalyptusSVG, FernSVG, MonsteraSVG, AnemoneSVG, RanunculusSVG
} from './flower-svgs-new';

interface FlowerSVGProps {
  color?: string;
  scale?: number;
}

// Helper: lighten/darken a hex color
function adjustColor(hex: string, amount: number): string {
  const num = parseInt(hex.replace('#', ''), 16);
  const r = Math.min(255, Math.max(0, ((num >> 16) & 255) + amount));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 255) + amount));
  const b = Math.min(255, Math.max(0, (num & 255) + amount));
  return `#${((r << 16) | (g << 8) | b).toString(16).padStart(6, '0')}`;
}

// ─── ROSE (Head Only) ────────────────────────
export const RoseSVG: React.FC<FlowerSVGProps> = ({ color = '#FFB6C1', scale = 1 }) => {
  const light = adjustColor(color, 50);
  const mid = adjustColor(color, -10);
  const dark = adjustColor(color, -60);

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px`, overflow: 'visible' }}>
      <defs>
        <radialGradient id="rose-depth" cx="50%" cy="60%" r="50%">
          <stop offset="0%" stopColor={mid} stopOpacity={0.9} />
          <stop offset="100%" stopColor={dark} stopOpacity={1} />
        </radialGradient>
        <linearGradient id="rose-petal-sheen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="20%" stopColor={light} stopOpacity={0.9} />
          <stop offset="90%" stopColor={color} stopOpacity={0.8} />
        </linearGradient>
        <filter id="rose-blur"><feGaussianBlur stdDeviation="0.5" /></filter>
      </defs>

      {/* Bloom Construction: Layered from back to front - Centered */}
      <g transform="translate(0, 10)">
        {/* Back Petals */}
        <path d="M 30 40 C 20 20 40 10 50 15 C 60 10 80 20 70 40 C 65 55 35 55 30 40" fill={dark} opacity="0.8" filter="url(#rose-blur)" />

        {/* Outer Guard Petals */}
        <path d="M 25 45 C 15 25 45 -5 85 30" fill="none" stroke={mid} strokeWidth="1" opacity="0.5" />
        <path d="M 20 50 C 15 30 35 20 45 35" fill="url(#rose-petal-sheen)" opacity="0.85" filter="url(#organic-edge)" />
        <path d="M 80 50 C 85 30 65 20 55 35" fill="url(#rose-petal-sheen)" opacity="0.85" filter="url(#organic-edge)" />

        {/* Main Body Cup */}
        <path d="M 25 50 C 25 75 75 75 75 50 C 75 35 25 35 25 50" fill="url(#rose-depth)" opacity="0.95" />

        {/* Inner Swirls */}
        <path d="M 30 45 C 35 55 65 55 70 45 C 70 30 30 30 30 45" fill="url(#rose-petal-sheen)" opacity="0.9" />
        <path d="M 35 48 C 40 52 60 52 65 48 C 65 40 35 40 35 48" fill={light} opacity="0.8" />
        <path d="M 40 45 C 42 50 58 50 60 45" fill="none" stroke={dark} strokeWidth="2" strokeLinecap="round" opacity="0.4" />

        {/* Subtle Highlight Reflection */}
        <path d="M 35 40 Q 50 35 65 40" stroke="white" strokeWidth="1" opacity="0.3" filter="url(#rose-blur)" />
      </g>
    </svg>
  );
};

// ─── TULIP (Head Only) ────────────────────────
export const TulipSVG: React.FC<FlowerSVGProps> = ({ color = '#FF69B4', scale = 1 }) => {
  const light = adjustColor(color, 45);
  const dark = adjustColor(color, -40);

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px`, overflow: 'visible' }}>
      <defs>
        <linearGradient id="tulip-grad" x1="0.5" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor={light} />
          <stop offset="100%" stopColor={dark} />
        </linearGradient>
        <path id="tulip-petal" d="M 50 15 C 30 20 25 50 40 70 C 45 80 55 80 60 70 C 75 50 70 20 50 15" />
      </defs>

      {/* Bloom - Layers */}
      <g transform="translate(0, 5)">
        {/* Back Petals */}
        <use href="#tulip-petal" transform="translate(-8, 5) rotate(-15 50 80)" fill={dark} opacity="0.8" filter="url(#watercolor)" />
        <use href="#tulip-petal" transform="translate(8, 5) rotate(15 50 80)" fill={dark} opacity="0.8" filter="url(#watercolor)" />

        {/* Front Petals */}
        <path d="M 50 10 C 35 15 28 45 42 65 C 48 72 52 72 58 65 C 72 45 65 15 50 10"
          fill="url(#tulip-grad)" opacity="0.95" filter="url(#organic-edge)" />

        {/* Side Curves */}
        <path d="M 42 65 Q 30 40 50 15" fill="none" stroke={light} strokeWidth="1" opacity="0.6" />
        <path d="M 58 65 Q 70 40 50 15" fill="none" stroke={light} strokeWidth="1" opacity="0.6" />
      </g>
    </svg>
  );
};

// ─── LILY (Head Only) ───────────────────────────
export const LilySVG: React.FC<FlowerSVGProps> = ({ color = '#FFFFFF', scale = 1 }) => {
  const petalFill = color === '#FFFFFF' ? '#FFF8F0' : color;
  const dark = adjustColor(petalFill, -30);
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <radialGradient id="lily-pg" cx="50%" cy="50%"><stop offset="0%" stopColor={petalFill} /><stop offset="100%" stopColor={dark} /></radialGradient>
        <filter id="lily-sh"><feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodOpacity="0.2" /></filter>
      </defs>
      {/* 6 petals radiating from center 50,50 */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => (
        <ellipse key={angle} cx="50" cy="30" rx="10" ry="25" fill="url(#lily-pg)" opacity={0.85 + (i % 2) * 0.1}
          filter="url(#lily-sh)" transform={`rotate(${angle} 50 50)`} />
      ))}
      {/* Petal spots/freckles */}
      {[0, 60, 120, 180, 240, 300].map((angle) => (
        <g key={`spots-${angle}`} transform={`rotate(${angle} 50 50)`}>
          <circle cx="50" cy="35" r="1" fill="#8B4513" opacity="0.3" />
          <circle cx="49" cy="40" r="0.8" fill="#8B4513" opacity="0.25" />
        </g>
      ))}
      {/* Stamen */}
      {[0, 72, 144, 216, 288].map(angle => (
        <g key={`stamen-${angle}`} transform={`rotate(${angle} 50 50)`}>
          <line x1="50" y1="50" x2="50" y2="40" stroke="#7a6a30" strokeWidth="0.8" />
          <ellipse cx="50" cy="39" rx="2" ry="1.5" fill="#D4A017" />
        </g>
      ))}
      <circle cx="50" cy="50" r="4" fill="#90EE90" opacity="0.5" />
    </svg>
  );
};

// ─── SUNFLOWER (Head Only) ──────────────────────
export const SunflowerSVG: React.FC<FlowerSVGProps> = ({ color = '#FFD700', scale = 1 }) => {
  const dark = adjustColor(color, -40);
  const light = adjustColor(color, 30);
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <radialGradient id="sun-center"><stop offset="0%" stopColor="#5a3a10" /><stop offset="60%" stopColor="#3a2508" /><stop offset="100%" stopColor="#2a1a05" /></radialGradient>
        <linearGradient id="sun-petal" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor={light} /><stop offset="100%" stopColor={dark} /></linearGradient>
        <filter id="sun-sh"><feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodOpacity="0.22" /></filter>
      </defs>
      {/* Back petals */}
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={`back-${i}`} cx="50" cy="20" rx="6" ry="18" fill={dark} opacity="0.6"
          transform={`rotate(${i * 25.7 + 12} 50 50)`} />
      ))}
      {/* Front petals */}
      {Array.from({ length: 14 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="22" rx="7" ry="19" fill="url(#sun-petal)" filter="url(#sun-sh)" opacity="0.9"
          transform={`rotate(${i * 25.7} 50 50)`} />
      ))}
      {/* Center disk with seed texture */}
      <circle cx="50" cy="50" r="14" fill="url(#sun-center)" />
      {/* Seed dots */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = (i * 30 * Math.PI) / 180;
        const r = 5 + (i % 3) * 2;
        return <circle key={`seed-${i}`} cx={50 + r * Math.cos(angle)} cy={50 + r * Math.sin(angle)} r="1" fill="#8a6a20" opacity="0.5" />;
      })}
    </svg>
  );
};

// ─── ORCHID (Head Only) ─────────────────────────
export const OrchidSVG: React.FC<FlowerSVGProps> = ({ color = '#DA70D6', scale = 1 }) => {
  const light = adjustColor(color, 40);
  const dark = adjustColor(color, -40);
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <radialGradient id="orchid-pg" cx="50%" cy="40%"><stop offset="0%" stopColor={light} /><stop offset="100%" stopColor={dark} /></radialGradient>
        <filter id="orchid-sh"><feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodOpacity="0.25" /></filter>
      </defs>
      {/* Top sepal */}
      <ellipse cx="50" cy="20" rx="10" ry="20" fill="url(#orchid-pg)" filter="url(#orchid-sh)" opacity="0.9" />
      {/* Side sepals */}
      <ellipse cx="30" cy="40" rx="9" ry="18" fill={color} filter="url(#orchid-sh)" opacity="0.85" transform="rotate(-20 30 40)" />
      <ellipse cx="70" cy="40" rx="9" ry="18" fill={color} filter="url(#orchid-sh)" opacity="0.85" transform="rotate(20 70 40)" />
      {/* Lower petals */}
      <ellipse cx="40" cy="60" rx="8" ry="14" fill={light} opacity="0.8" transform="rotate(-10 40 60)" />
      <ellipse cx="60" cy="60" rx="8" ry="14" fill={light} opacity="0.8" transform="rotate(10 60 60)" />
      {/* Labellum (lip) */}
      <path d="M 50 55 C 44 60 40 68 44 75 C 48 80 52 80 56 75 C 60 68 56 60 50 55" fill={dark} opacity="0.7" />
      <path d="M 50 58 C 47 62 45 66 47 70 C 49 73 51 73 53 70 C 55 66 53 62 50 58" fill="#FFE4F0" opacity="0.5" />
      {/* Column */}
      <ellipse cx="50" cy="48" rx="4" ry="6" fill="#FFE4B5" opacity="0.7" />
    </svg>
  );
};

// ─── GERBERA DAISY (Head Only) ──────────────────
export const DaisySVG: React.FC<FlowerSVGProps> = ({ color = '#FF69B4', scale = 1 }) => {
  const light = adjustColor(color, 35);
  const dark = adjustColor(color, -35);
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <linearGradient id="daisy-pg" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor={light} /><stop offset="100%" stopColor={dark} /></linearGradient>
        <radialGradient id="daisy-center"><stop offset="0%" stopColor="#FFE066" /><stop offset="60%" stopColor="#DAA520" /><stop offset="100%" stopColor="#B8860B" /></radialGradient>
        <filter id="daisy-sh"><feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodOpacity="0.2" /></filter>
      </defs>
      {/* Back petals layer */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={`back-${i}`} cx="50" cy="20" rx="6" ry="18" fill={dark} opacity="0.55"
          filter="url(#daisy-sh)" transform={`rotate(${i * 30 + 15} 50 50)`} />
      ))}
      {/* Front petals */}
      {Array.from({ length: 12 }).map((_, i) => (
        <ellipse key={i} cx="50" cy="24" rx="7" ry="16" fill="url(#daisy-pg)" filter="url(#daisy-sh)" opacity="0.9"
          transform={`rotate(${i * 30} 50 50)`} />
      ))}
      {/* Center */}
      <circle cx="50" cy="50" r="10" fill="url(#daisy-center)" />
    </svg>
  );
};

// ─── BABY'S BREATH (Filler Cloud) ──────────────────
export const BabyBreathSVG: React.FC<FlowerSVGProps> = ({ color = '#FFFFFF', scale = 1 }) => {
  const florets = Array.from({ length: 60 }).map((_, i) => {
    const r = (i * 1337) % 360;
    const d = 5 + ((i * 31) % 35);
    const rad = (r * Math.PI) / 180;
    return {
      x: 50 + d * Math.cos(rad),
      y: 50 + d * Math.sin(rad) * 0.8,
      s: 1.5 + ((i * 7) % 20) / 10
    };
  });
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      {florets.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={p.s} fill={color} opacity={0.8} filter={i % 3 === 0 ? "url(#watercolor)" : undefined} />
      ))}
    </svg>
  );
};

// ─── PEONY (Head Only) ────────────────────────
export const PeonySVG: React.FC<FlowerSVGProps> = ({ color = '#FFB6C1', scale = 1 }) => {
  const light = adjustColor(color, 40);
  const mid = adjustColor(color, -10);
  const dark = adjustColor(color, -40);

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px`, overflow: 'visible' }}>
      <defs>
        <radialGradient id="peony-grad" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={mid} />
          <stop offset="100%" stopColor={dark} />
        </radialGradient>
      </defs>
      {/* Bloom - Massive Ruffled Cloud (Centered) */}
      <g transform="translate(0, 5)">
        <path d="M 20 30 Q 50 0 80 30 Q 90 60 50 80 Q 10 60 20 30" fill={dark} opacity="0.9" filter="url(#watercolor)" />
        <path d="M 25 35 Q 50 10 75 35 Q 85 55 50 70 Q 15 55 25 35" fill={mid} opacity="0.85" filter="url(#organic-edge)" />
        <path d="M 35 40 Q 50 25 65 40 Q 70 50 50 60 Q 30 50 35 40" fill={light} opacity="0.9" filter="url(#organic-edge)" />
        <path d="M 40 45 Q 50 55 60 45" stroke={dark} strokeWidth="1" fill="none" opacity="0.3" />
      </g>
    </svg>
  );
};

// ─── CARNATION (Head Only) ──────────────────────
export const CarnationSVG: React.FC<FlowerSVGProps> = ({ color = '#FFB6C1', scale = 1 }) => {
  const light = adjustColor(color, 35);
  const dark = adjustColor(color, -35);
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <radialGradient id="carn-pg" cx="50%" cy="50%"><stop offset="0%" stopColor={light} /><stop offset="100%" stopColor={dark} /></radialGradient>
        <filter id="carn-sh"><feDropShadow dx="0.5" dy="1.5" stdDeviation="1.5" floodOpacity="0.22" /></filter>
      </defs>
      {/* Ruffled petals */}
      {Array.from({ length: 24 }).map((_, i) => {
        const angle = i * 15;
        const rad = (angle * Math.PI) / 180;
        const dist = 16 + Math.sin(i * 1.2) * 3;
        const x = 50 + dist * Math.cos(rad);
        const y = 50 + dist * Math.sin(rad) * 0.8;
        return (
          <ellipse key={i} cx={x} cy={y} rx="6" ry="8" fill="url(#carn-pg)"
            filter="url(#carn-sh)" opacity={0.8 + (i % 3) * 0.06}
            transform={`rotate(${angle + 45} ${x} ${y})`} />
        );
      })}
      {/* Inner ruffles */}
      {Array.from({ length: 12 }).map((_, i) => {
        const angle = i * 30 + 10;
        const rad = (angle * Math.PI) / 180;
        const x = 50 + 8 * Math.cos(rad);
        const y = 50 + 8 * Math.sin(rad) * 0.8;
        return (
          <ellipse key={`inner-${i}`} cx={x} cy={y} rx="4" ry="5.5" fill={light}
            opacity={0.7} transform={`rotate(${angle} ${x} ${y})`} />
        );
      })}
    </svg>
  );
};

// ─── LAVENDER (Spike Only) ───────────────────────
export const LavenderSVG: React.FC<FlowerSVGProps> = ({ color = '#E6E6FA', scale = 1 }) => {
  const dark = adjustColor(color, -40);
  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <linearGradient id="lav-pg" x1="0.5" y1="0" x2="0.5" y2="1"><stop offset="0%" stopColor={color} /><stop offset="100%" stopColor={dark} /></linearGradient>
        <filter id="lav-sh"><feDropShadow dx="0.3" dy="1" stdDeviation="1" floodOpacity="0.18" /></filter>
      </defs>
      {/* Flower spike - paired buds going up */}
      {Array.from({ length: 12 }).map((_, i) => {
        const y = 80 - i * 6;
        const spread = 4 + Math.sin(i * 0.8) * 1;
        return (
          <g key={i}>
            <ellipse cx={50 - spread} cy={y} rx="4" ry="2.5" fill="url(#lav-pg)" filter="url(#lav-sh)" opacity={0.7 + i * 0.03} />
            <ellipse cx={50 + spread} cy={y} rx="4" ry="2.5" fill={color} filter="url(#lav-sh)" opacity={0.65 + i * 0.03} />
          </g>
        );
      })}
    </svg>
  );
};

// ─── HYDRANGEA (Head Only) ──────────────────────
export const HydrangeaSVG: React.FC<FlowerSVGProps> = ({ color = '#DDA0DD', scale = 1 }) => {
  const light = adjustColor(color, 30);
  const dark = adjustColor(color, -30);
  const florets = Array.from({ length: 40 }).map((_, i) => {
    const r = (i * 90) % 360;
    const d = Math.sqrt(i) * 6;
    const rad = (r * Math.PI) / 180;
    return { x: 50 + d * Math.cos(rad), y: 50 + d * Math.sin(rad) };
  });

  return (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
      <defs>
        <filter id="hyd-sh"><feDropShadow dx="0.3" dy="1" stdDeviation="1.2" floodOpacity="0.18" /></filter>
      </defs>
      {florets.map((p, i) => (
        <g key={i} transform={`translate(${p.x}, ${p.y}) rotate(${i * 15})`}>
          <circle r="6" fill={color} opacity={0.8} filter="url(#hyd-sh)" />
          <circle cx="-2" cy="-2" r="2.5" fill={light} />
          <circle cx="2" cy="-2" r="2.5" fill={light} />
          <circle cx="-2" cy="2" r="2.5" fill={dark} />
          <circle cx="2" cy="2" r="2.5" fill={dark} />
        </g>
      ))}
    </svg>
  );
};

export const FLOWER_SVG_MAP: Record<string, React.FC<FlowerSVGProps>> = {
  rose: RoseSVG,
  tulip: TulipSVG,
  lily: LilySVG,
  sunflower: SunflowerSVG,
  orchid: OrchidSVG,
  daisy: DaisySVG,
  carnation: CarnationSVG,
  lavender: LavenderSVG,
  hydrangea: HydrangeaSVG,
  babysbreath: BabyBreathSVG,
  peony: PeonySVG,
  hibiscus: HibiscusSVG,
  lotus: LotusSVG,
  jasmine: JasmineSVG,
  magnolia: MagnoliaSVG,
  marigold: MarigoldSVG,
  cosmos: CosmosSVG,
  bluebell: BluebellSVG,
  daffodil: DaffodilSVG,
  pansy: PansySVG,
  zinnia: ZinniaSVG,
  eucalyptus: EucalyptusSVG,
  fern: FernSVG,
  monstera: MonsteraSVG,
  anemone: AnemoneSVG,
  ranunculus: RanunculusSVG
};

export function getFlowerSVG(flowerId: string, color?: string): React.ReactElement | null {
  const Component = FLOWER_SVG_MAP[flowerId];
  if (!Component) return null;
  return <Component color={color} />;
}

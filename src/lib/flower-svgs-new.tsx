import React from 'react';

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

// ─── HIBISCUS (Head Only) ───────────────────────────
export const HibiscusSVG: React.FC<FlowerSVGProps> = ({ color = '#FF69B4', scale = 1 }) => {
    const dark = adjustColor(color, -40);
    const light = adjustColor(color, 40);
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            <defs>
                <radialGradient id="hib-grad" cx="50%" cy="50%"><stop offset="0%" stopColor={dark} /><stop offset="60%" stopColor={color} /><stop offset="100%" stopColor={light} /></radialGradient>
            </defs>
            {/* 5 Petals Centered */}
            {[0, 72, 144, 216, 288].map(a => (
                <path key={a} d="M 50 50 Q 30 30 35 20 T 70 25 Q 70 40 50 50" fill="url(#hib-grad)" transform={`rotate(${a} 50 50)`} opacity="0.9" />
            ))}
            {/* Stamen */}
            <path d="M 50 50 L 50 20" stroke="#FFFACD" strokeWidth="2" strokeLinecap="round" />
            <circle cx="50" cy="20" r="2" fill="#FFA500" />
            <circle cx="48" cy="22" r="1.5" fill="#FFA500" />
            <circle cx="52" cy="22" r="1.5" fill="#FFA500" />
        </svg>
    );
};

// ─── LOTUS (Head Only) ──────────────────────────────
export const LotusSVG: React.FC<FlowerSVGProps> = ({ color = '#FFB6C1', scale = 1 }) => {
    const mid = adjustColor(color, -20);
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            <defs>
                <linearGradient id="lot-grad" x1="0.5" y1="1" x2="0.5" y2="0"><stop offset="0%" stopColor="#FFFFFF" /><stop offset="100%" stopColor={color} /></linearGradient>
            </defs>
            <ellipse cx="50" cy="60" rx="20" ry="30" fill={mid} />
            <ellipse cx="35" cy="55" rx="15" ry="25" fill="url(#lot-grad)" transform="rotate(-30 50 70)" />
            <ellipse cx="65" cy="55" rx="15" ry="25" fill="url(#lot-grad)" transform="rotate(30 50 70)" />
            <ellipse cx="50" cy="50" rx="12" ry="28" fill="url(#lot-grad)" />
        </svg>
    );
};

// ─── JASMINE (Head Only - Cluster) ──────────────────
export const JasmineSVG: React.FC<FlowerSVGProps> = ({ color = '#FFFFFF', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {[
                { x: 50, y: 50 }, { x: 35, y: 60 }, { x: 65, y: 55 }, { x: 50, y: 35 }
            ].map((pos, i) => (
                <g key={i} transform={`translate(${pos.x}, ${pos.y})`}>
                    {[0, 72, 144, 216, 288].map(a => (
                        <ellipse key={a} cx="0" cy="-6" rx="2" ry="6" fill={color} transform={`rotate(${a})`} />
                    ))}
                    <circle r="1.5" fill="#FFE4B5" />
                </g>
            ))}
        </svg>
    );
};

// ─── MAGNOLIA (Head Only) ───────────────────────────
export const MagnoliaSVG: React.FC<FlowerSVGProps> = ({ color = '#FFFFFF', scale = 1 }) => {
    const dark = adjustColor(color, -20);
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            <path d="M 50 60 C 30 50 25 20 50 10 C 75 20 70 50 50 60" fill={color} stroke={dark} strokeWidth="0.5" />
            <path d="M 50 60 C 35 55 30 30 45 20" fill={dark} opacity="0.3" />
            <path d="M 50 60 C 65 55 60 30 55 20" fill={dark} opacity="0.3" />
        </svg>
    );
};

// ─── MARIGOLD (Head Only) ───────────────────────────
export const MarigoldSVG: React.FC<FlowerSVGProps> = ({ color = '#FFA500', scale = 1 }) => {
    const dark = adjustColor(color, -40);
    const mid = adjustColor(color, -20);

    const ruffles = [
        // Outer layer
        { r: 7, d: 22, a: 0 }, { r: 7, d: 22, a: 30 }, { r: 7, d: 22, a: 60 }, { r: 7, d: 22, a: 90 },
        { r: 7, d: 22, a: 120 }, { r: 7, d: 22, a: 150 }, { r: 7, d: 22, a: 180 }, { r: 7, d: 22, a: 210 },
        { r: 7, d: 22, a: 240 }, { r: 7, d: 22, a: 270 }, { r: 7, d: 22, a: 300 }, { r: 7, d: 22, a: 330 },
        // Mid layer
        { r: 6, d: 15, a: 15 }, { r: 6, d: 15, a: 45 }, { r: 6, d: 15, a: 75 }, { r: 6, d: 15, a: 105 },
        { r: 6, d: 15, a: 135 }, { r: 6, d: 15, a: 165 }, { r: 6, d: 15, a: 195 }, { r: 6, d: 15, a: 225 },
        { r: 6, d: 15, a: 255 }, { r: 6, d: 15, a: 285 }, { r: 6, d: 15, a: 315 }, { r: 6, d: 15, a: 345 },
        // Inner layer
        { r: 5, d: 8, a: 0 }, { r: 5, d: 8, a: 45 }, { r: 5, d: 8, a: 90 }, { r: 5, d: 8, a: 135 },
        { r: 5, d: 8, a: 180 }, { r: 5, d: 8, a: 225 }, { r: 5, d: 8, a: 270 }, { r: 5, d: 8, a: 315 },
    ];

    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            <circle cx="50" cy="50" r="22" fill={dark} />
            {ruffles.map((ruff, i) => {
                const rad = (ruff.a * Math.PI) / 180;
                const x = 50 + ruff.d * Math.cos(rad);
                const y = 50 + ruff.d * Math.sin(rad) * 0.9;
                return <circle key={i} cx={x} cy={y} r={ruff.r} fill={i % 2 === 0 ? color : mid} opacity="0.9" />;
            })}
            <circle cx="50" cy="50" r="5" fill="#8B4513" opacity="0.4" />
        </svg>
    );
};

// ─── COSMOS (Head Only) ─────────────────────────────
export const CosmosSVG: React.FC<FlowerSVGProps> = ({ color = '#FF69B4', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {[0, 45, 90, 135, 180, 225, 270, 315].map(a => (
                <path key={a} d="M 50 50 L 55 20 L 50 18 L 45 20 Z" fill={color} transform={`rotate(${a} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="6" fill="#FFD700" />
        </svg>
    );
};

// ─── BLUEBELL (Head Cluster) ────────────────────────
export const BluebellSVG: React.FC<FlowerSVGProps> = ({ color = '#6495ED', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {[0, 1, 2].map(i => (
                <g key={i} transform={`translate(15, ${20 + i * 20})`}>
                    <path d={`M 20 0 Q 30 10 35 25 L 20 20 Z`} fill={color} transform="rotate(-30 20 0)" />
                </g>
            ))}
            <path d="M 40 10 Q 30 90 40 90" stroke="#3a6b25" strokeWidth="1" fill="none" opacity="0.5" />
        </svg>
    );
};

// ─── DAFFODIL (Head Only) ───────────────────────────
export const DaffodilSVG: React.FC<FlowerSVGProps> = ({ color = '#FFFF00', scale = 1 }) => {
    const center = adjustColor(color, -40);
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {[0, 60, 120, 180, 240, 300].map(a => (
                <ellipse key={a} cx="50" cy="50" rx="8" ry="22" fill={color} transform={`rotate(${a} 50 50)`} opacity="0.9" />
            ))}
            <circle cx="50" cy="50" r="10" fill="#FFA500" />
            <circle cx="50" cy="50" r="6" fill={center} opacity="0.6" />
        </svg>
    );
};

// ─── PANSY (Head Only) ──────────────────────────────
export const PansySVG: React.FC<FlowerSVGProps> = ({ color = '#8A2BE2', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            <path d="M 50 50 C 35 25 25 25 20 50 C 15 65 50 70 50 50" fill={color} />
            <path d="M 50 50 C 65 25 75 25 80 50 C 85 65 50 70 50 50" fill={color} />
            <path d="M 50 50 C 35 80 65 80 50 50" fill={color} opacity="0.8" />
            <circle cx="50" cy="50" r="6" fill="#FFFF00" />
        </svg>
    );
};

// ─── ZINNIA (Head Only) ─────────────────────────────
export const ZinniaSVG: React.FC<FlowerSVGProps> = ({ color = '#FF1493', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {Array.from({ length: 20 }).map((_, i) => (
                <ellipse key={i} cx="50" cy="50" rx="6" ry="18" fill={color} transform={`rotate(${i * 18} 50 50)`} />
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
                <ellipse key={i} cx="50" cy="50" rx="4" ry="10" fill={adjustColor(color, 30)} transform={`rotate(${i * 36} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="5" fill="#654321" />
        </svg>
    );
};

// ─── EUCALYPTUS (Foliage) ───────────────────────────
export const EucalyptusSVG: React.FC<FlowerSVGProps> = ({ color = '#5F9EA0', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" style={{ width: `${80 * scale}px`, height: `${130 * scale}px` }}>
            <path d="M 50 20 C 50 60 48 100 50 160" stroke="#5F9EA0" strokeWidth="1.5" fill="none" />
            {[0, 1, 2, 3, 4, 5].map(i => (
                <g key={i}>
                    <circle cx="40" cy={30 + i * 18} r="8" fill={color} opacity="0.9" />
                    <circle cx="60" cy={35 + i * 18} r="8" fill={color} opacity="0.9" />
                </g>
            ))}
        </svg>
    );
};

// ─── FERN (Foliage) ─────────────────────────────────
export const FernSVG: React.FC<FlowerSVGProps> = ({ color = '#228B22', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" style={{ width: `${80 * scale}px`, height: `${130 * scale}px` }}>
            <path d="M 50 160 Q 55 80 40 20" stroke={color} strokeWidth="2" fill="none" />
            {Array.from({ length: 15 }).map((_, i) => {
                const y = 30 + i * 8;
                const w = 6 + i * 1.5;
                const xc = 40 + (i * 0.5); // approximate curve
                return (
                    <g key={i} transform={`translate(0, ${y})`}>
                        <path d={`M ${xc} 0 L ${xc - w} -5`} stroke={color} strokeWidth="1.5" />
                        <path d={`M ${xc + 3} 2 L ${xc + 3 + w} -3`} stroke={color} strokeWidth="1.5" />
                    </g>
                );
            })}
        </svg>
    );
};

// ─── MONSTERA (Foliage) ─────────────────────────────
export const MonsteraSVG: React.FC<FlowerSVGProps> = ({ color = '#006400', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" style={{ width: `${80 * scale}px`, height: `${130 * scale}px` }}>
            <defs>
                <mask id="monstera-mask">
                    <rect x="0" y="0" width="100" height="160" fill="white" />
                    <circle cx="65" cy="35" r="4" fill="black" />
                    <circle cx="35" cy="45" r="3" fill="black" />
                    <circle cx="70" cy="55" r="3" fill="black" />
                    <circle cx="30" cy="65" r="2" fill="black" />
                </mask>
            </defs>
            <path d="M 50 80 C 50 100 49 120 50 160" stroke={color} strokeWidth="4" fill="none" />
            <path d="M 50 80 C 20 70 15 30 50 15 C 85 30 80 70 50 80" fill={color} mask="url(#monstera-mask)" />
        </svg>
    );
};

// ─── ANEMONE (Head Only) ────────────────────────────
export const AnemoneSVG: React.FC<FlowerSVGProps> = ({ color = '#FFFFFF', scale = 1 }) => {
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {[0, 72, 144, 216, 288].map(a => (
                <ellipse key={a} cx="50" cy="50" rx="12" ry="24" fill={color} transform={`rotate(${a} 50 50)`} />
            ))}
            <circle cx="50" cy="50" r="10" fill="#111111" />
            <circle cx="50" cy="50" r="4" fill="#333333" />
        </svg>
    );
};

// ─── RANUNCULUS (Head Only) ─────────────────────────
export const RanunculusSVG: React.FC<FlowerSVGProps> = ({ color = '#FFA500', scale = 1 }) => {
    const dark = adjustColor(color, -30);
    return (
        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style={{ width: `${100 * scale}px`, height: `${100 * scale}px` }}>
            {Array.from({ length: 8 }).map((_, i) => (
                <circle key={i} cx="50" cy="50" r={26 - i * 3} fill={i % 2 === 0 ? color : dark} />
            ))}
        </svg>
    );
};

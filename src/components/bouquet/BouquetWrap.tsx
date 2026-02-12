import { WrapStyle } from "@/lib/flowers-data";

interface BouquetWrapProps {
  wrap: WrapStyle;
  width?: number; // Internal coordinate width
  height?: number; // Internal coordinate height
  layer?: 'back' | 'front'; // 'back' renders behind flowers, 'front' overlays lower stems
}

export const BouquetWrap = ({ wrap, width = 400, height = 500, layer = 'back' }: BouquetWrapProps) => {
  const cx = width / 2;

  // RESTORED TALLER, ELEGANT CONE SHAPE
  const topY = height * 0.05;
  const gatherY = height * 0.72;
  const bottomY = height * 0.95;

  const topW = width * 0.82;
  const gatherW = width * 0.22;

  // Make transparent wraps less opaque base
  const isTrans = wrap.opacity < 1;
  const baseOpacity = isTrans ? 0.3 : 1;

  const isNewspaper = wrap.style === 'newspaper';
  const isBlack = wrap.style === 'black-luxury';

  const svgProps = {
    width: "100%",
    height: "100%",
    viewBox: `0 0 ${width} ${height}`,
    preserveAspectRatio: "xMidYMid meet",
    className: "absolute inset-0 pointer-events-none",
  };

  if (layer === 'front') {
    return (
      <svg {...svgProps} style={{ zIndex: 5 }}>
        <defs>
          {/* Front gradient with slight variations for folds */}
          <linearGradient id={`front-grad-${wrap.id}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor={wrap.color} stopOpacity={isTrans ? 0.1 : 0.9} />
            <stop offset="50%" stopColor={wrap.color} stopOpacity={isTrans ? 0.2 : 0.85} />
            <stop offset="100%" stopColor={wrap.color} stopOpacity={isTrans ? 0.3 : 0.95} />
          </linearGradient>

          <filter id="wrap-texture-overlay">
            <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
            <feComponentTransfer>
              <feFuncA type="linear" slope="0.1" />
            </feComponentTransfer>
            <feComposite operator="in" in2="SourceGraphic" />
            <feBlend mode="multiply" in2="SourceGraphic" />
          </filter>

          <filter id="wrap-shadow" x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="2" dy="4" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Left front fold - Darker + Shadow */}
        <path
          d={`M ${cx - topW * 0.42} ${height * 0.18}
             C ${cx - topW * 0.44} ${height * 0.35} ${cx - gatherW * 0.8} ${gatherY * 0.7} ${cx - gatherW * 0.5} ${gatherY}
             L ${cx} ${gatherY + 8}
             L ${cx - topW * 0.1} ${height * 0.25}
             Z`}
          fill={`url(#front-grad-${wrap.id})`}
          filter="url(#wrap-texture-overlay)" // Add texture
          opacity={0.95}
        />
        {/* Crease shadow line */}
        <path
          d={`M ${cx - topW * 0.42} ${height * 0.18}
             C ${cx - topW * 0.44} ${height * 0.35} ${cx - gatherW * 0.8} ${gatherY * 0.7} ${cx - gatherW * 0.5} ${gatherY}`}
          stroke="black" strokeWidth="1" opacity="0.1" fill="none"
        />

        {/* Right front fold */}
        <path
          d={`M ${cx + topW * 0.42} ${height * 0.18}
             C ${cx + topW * 0.44} ${height * 0.35} ${cx + gatherW * 0.8} ${gatherY * 0.7} ${cx + gatherW * 0.5} ${gatherY}
             L ${cx} ${gatherY + 8}
             L ${cx + topW * 0.1} ${height * 0.25}
             Z`}
          fill={`url(#front-grad-${wrap.id})`}
          filter="url(#wrap-texture-overlay)" // Add texture
          opacity={0.95}
        />

        {/* Bottom gather section — Opaque handle */}
        <path
          d={`M ${cx - gatherW * 0.8} ${gatherY - 5}
             C ${cx - gatherW * 0.6} ${gatherY + 10} ${cx + gatherW * 0.6} ${gatherY + 10} ${cx + gatherW * 0.8} ${gatherY - 5}
             L ${cx + gatherW * 0.4} ${bottomY}
             C ${cx + gatherW * 0.2} ${bottomY + 8} ${cx - gatherW * 0.2} ${bottomY + 8} ${cx - gatherW * 0.4} ${bottomY}
             Z`}
          fill={wrap.color}
          filter="url(#wrap-shadow)"
        />

        {/* Ribbon tie - High Quality Bow */}
        <g transform={`translate(${cx}, ${gatherY + 8}) scale(1.4)`}>
          <filter id="ribbon-shadow" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="0" dy="2" stdDeviation="2" floodOpacity="0.3" />
          </filter>

          {/* Tails */}
          <path d="M -5 5 Q -15 25 -25 45 L -15 48 Q -8 30 5 10 Z" fill={isBlack ? '#C8AA78' : isNewspaper ? '#A08060' : '#FFD700'} filter="url(#ribbon-shadow)" />
          <path d="M 5 5 Q 15 25 25 45 L 15 48 Q 8 30 -5 10 Z" fill={isBlack ? '#C8AA78' : isNewspaper ? '#A08060' : '#FFD700'} filter="url(#ribbon-shadow)" />

          {/* Loops */}
          <path d="M 0 0 C -20 -20 -40 -10 -5 5 Z" fill={isBlack ? '#C8AA78' : isNewspaper ? '#A08060' : 'white'} filter="url(#ribbon-shadow)" />
          <path d="M 0 0 C 20 -20 40 -10 5 5 Z" fill={isBlack ? '#C8AA78' : isNewspaper ? '#A08060' : 'white'} filter="url(#ribbon-shadow)" />

          {/* Knot */}
          <circle r="4" fill={isBlack ? '#E8CA98' : isNewspaper ? '#C0A080' : '#FFFACD'} filter="url(#ribbon-shadow)" />
        </g>
      </svg>
    );
  }

  // ─── BACK LAYER (Opaque Base) ───────────────────
  return (
    <svg {...svgProps}>
      <defs>
        <linearGradient id={`wrap-main-${wrap.id}`} x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor={wrap.color} stopOpacity={1} />
          <stop offset="50%" stopColor={wrap.color} stopOpacity={0.9} /> {/* Slightly lighter center */}
          <stop offset="100%" stopColor={wrap.color} stopOpacity={1} />
        </linearGradient>

        <filter id={`wrap-sh-${wrap.id}`} x="-10%" y="-10%" width="120%" height="130%">
          <feDropShadow dx="0" dy="6" stdDeviation="10" floodOpacity="0.25" />
        </filter>

        {/* Re-define texture for back layer scope */}
        <filter id="wrap-texture-back">
          <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncA type="linear" slope="0.1" />
          </feComponentTransfer>
          <feComposite operator="in" in2="SourceGraphic" />
          <feBlend mode="multiply" in2="SourceGraphic" />
        </filter>
      </defs>

      {/* Shadow Blob */}
      <ellipse cx={cx} cy={bottomY + 18} rx={gatherW * 1.5} ry={10}
        fill="rgba(0,0,0,0.2)" filter={`url(#wrap-sh-${wrap.id})`} />

      {/* Main Back Shape - Opaque */}
      <path
        d={`M ${cx} ${topY}
           C ${cx + topW * 0.15} ${topY} ${cx + topW * 0.5} ${topY + 10} ${cx + topW * 0.52} ${topY + 20}
           C ${cx + topW * 0.55} ${height * 0.25} ${cx + gatherW * 1.2} ${gatherY - 30} ${cx + gatherW * 0.55} ${gatherY}
           L ${cx + gatherW * 0.4} ${bottomY}
           C ${cx + gatherW * 0.15} ${bottomY + 10} ${cx - gatherW * 0.15} ${bottomY + 10} ${cx - gatherW * 0.4} ${bottomY}
           L ${cx - gatherW * 0.55} ${gatherY}
           C ${cx - gatherW * 1.2} ${gatherY - 30} ${cx - topW * 0.55} ${height * 0.25} ${cx - topW * 0.52} ${topY + 20}
           C ${cx - topW * 0.5} ${topY + 10} ${cx - topW * 0.15} ${topY} ${cx} ${topY}
           Z`}
        fill={`url(#wrap-main-${wrap.id})`}
        filter="url(#wrap-texture-back)"
      />

      {/* Inner Shadow for Depth */}
      <path
        d={`M ${cx} ${topY}
           C ${cx + topW * 0.15} ${topY} ${cx + topW * 0.5} ${topY + 10} ${cx + topW * 0.52} ${topY + 20}
           L ${cx} ${gatherY} 
           L ${cx - topW * 0.52} ${topY + 20} 
           C ${cx - topW * 0.55} ${height * 0.25} ${cx - gatherW * 1.2} ${gatherY - 30} ${cx - gatherW * 0.55} ${gatherY}
           Z`}
        fill="black" opacity="0.1" filter="blur(4px)"
      />

      {/* Gold Rim/Edge for style - Kept as User Liked 'aesthetic' improvements typically */}
      <path
        d={`M ${cx - topW * 0.5} ${topY + 20} C ${cx} ${topY - 10} ${cx} ${topY - 10} ${cx + topW * 0.5} ${topY + 20}`}
        stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" fill="none"
      />
    </svg>
  );
};

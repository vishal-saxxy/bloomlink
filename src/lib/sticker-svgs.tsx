// Hand-drawn doodle-style sticker SVGs with organic imperfection
export const STICKER_SVGS: Record<string, React.ReactNode> = {
  // ─── HEARTS ─────────────────────────────────────
  's-heart': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sh-heart"><feDropShadow dx="0" dy="1.5" stdDeviation="2" floodOpacity="0.15" /></filter>
      </defs>
      {/* Sketchy hand-drawn heart */}
      <path
        d="M 50 82 C 25 68 6 55 8 38 C 10 22 20 14 32 14 C 40 14 46 20 50 28 C 54 20 60 14 68 14 C 80 14 90 22 92 38 C 94 55 75 68 50 82 Z"
        fill="none" stroke="#FF6B9D" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
        strokeDasharray="2,0" filter="url(#sh-heart)" />
      <path
        d="M 50 78 C 28 65 12 52 14 38 C 16 26 24 18 34 18 C 40 18 46 22 50 30 C 54 22 60 18 66 18 C 76 18 84 26 86 38 C 88 52 72 65 50 78 Z"
        fill="#FF6B9D" opacity="0.25" />
      {/* Sketch imperfection lines */}
      <path d="M 30 30 C 28 35 30 42 35 48" stroke="#FF6B9D" strokeWidth="0.8" fill="none" opacity="0.3" />
    </svg>
  ),
  's-sparkle-heart': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sh-sparkle"><feDropShadow dx="0" dy="1.5" stdDeviation="2" floodOpacity="0.15" /></filter>
      </defs>
      <path
        d="M 50 80 C 22 65 8 50 10 36 C 12 22 22 15 33 15 C 40 15 46 20 50 28 C 54 20 60 15 67 15 C 78 15 88 22 90 36 C 92 50 78 65 50 80 Z"
        fill="#FFB6D9" opacity="0.35" filter="url(#sh-sparkle)" />
      <path
        d="M 50 80 C 22 65 8 50 10 36 C 12 22 22 15 33 15 C 40 15 46 20 50 28 C 54 20 60 15 67 15 C 78 15 88 22 90 36 C 92 50 78 65 50 80 Z"
        fill="none" stroke="#FFB6D9" strokeWidth="2" strokeLinecap="round" />
      {/* Hand-drawn sparkles around heart */}
      <path d="M 22 25 L 24 18 L 26 25 L 30 22 L 26 25 L 28 30 L 24 26 L 22 25" stroke="#FFD700" strokeWidth="1.2" fill="none" opacity="0.7" />
      <path d="M 75 22 L 76 16 L 78 22 L 82 20 L 78 23 L 79 28 L 76 24 L 75 22" stroke="#FFD700" strokeWidth="1" fill="none" opacity="0.6" />
      <circle cx="50" cy="10" r="1.5" fill="#FFD700" opacity="0.5" />
    </svg>
  ),
  's-growing-heart': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <filter id="sh-grow"><feDropShadow dx="0" dy="1.5" stdDeviation="2.5" floodOpacity="0.15" /></filter>
      </defs>
      {/* Inner solid heart */}
      <path
        d="M 50 75 C 28 62 14 50 16 38 C 18 26 26 20 35 20 C 40 20 45 23 50 30 C 55 23 60 20 65 20 C 74 20 82 26 84 38 C 86 50 72 62 50 75 Z"
        fill="#FF1493" opacity="0.4" filter="url(#sh-grow)" />
      {/* Radiating doodle lines = "growing" */}
      <path d="M 50 75 C 28 62 14 50 16 38 C 18 26 26 20 35 20 C 40 20 45 23 50 30 C 55 23 60 20 65 20 C 74 20 82 26 84 38 C 86 50 72 62 50 75 Z"
        fill="none" stroke="#FF1493" strokeWidth="2" strokeLinecap="round" />
      {/* Pulse rings */}
      <path d="M 50 85 C 18 68 2 50 5 34 C 8 18 20 10 33 10 C 40 10 46 15 50 24 C 54 15 60 10 67 10 C 80 10 92 18 95 34 C 98 50 82 68 50 85 Z"
        fill="none" stroke="#FF1493" strokeWidth="1" opacity="0.25" strokeDasharray="4,4" />
    </svg>
  ),
  's-two-hearts': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Left tilted heart - sketch style */}
      <g transform="rotate(-15 35 45)">
        <path d="M 32 62 C 18 52 10 44 12 34 C 14 24 20 20 28 20 C 32 20 36 23 38 28 C 40 23 44 20 48 20 C 56 20 62 24 64 34 C 66 44 58 52 32 62 Z"
          fill="#FF69B4" opacity="0.3" />
        <path d="M 32 62 C 18 52 10 44 12 34 C 14 24 20 20 28 20 C 32 20 36 23 38 28 C 40 23 44 20 48 20 C 56 20 62 24 64 34 C 66 44 58 52 32 62 Z"
          fill="none" stroke="#FF69B4" strokeWidth="1.8" strokeLinecap="round" />
      </g>
      {/* Right heart - overlapping */}
      <g transform="rotate(10 65 50)">
        <path d="M 62 65 C 50 56 44 48 46 38 C 48 28 54 24 60 24 C 64 24 67 27 68 30 C 69 27 72 24 76 24 C 82 24 88 28 90 38 C 92 48 86 56 62 65 Z"
          fill="#FFB6C1" opacity="0.35" />
        <path d="M 62 65 C 50 56 44 48 46 38 C 48 28 54 24 60 24 C 64 24 67 27 68 30 C 69 27 72 24 76 24 C 82 24 88 28 90 38 C 92 48 86 56 62 65 Z"
          fill="none" stroke="#FFB6C1" strokeWidth="1.8" strokeLinecap="round" />
      </g>
    </svg>
  ),

  // ─── SPARKLES ──────────────────────────────────
  's-star': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn star with wobbly edges */}
      <path d="M 50 8 L 58 35 L 88 38 L 64 56 L 72 85 L 50 68 L 28 85 L 36 56 L 12 38 L 42 35 Z"
        fill="none" stroke="#DAA520" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M 50 8 L 58 35 L 88 38 L 64 56 L 72 85 L 50 68 L 28 85 L 36 56 L 12 38 L 42 35 Z"
        fill="#FFD700" opacity="0.2" />
      {/* Watercolor wash effect */}
      <path d="M 50 20 L 55 38 L 72 40 L 60 50 L 64 68 L 50 58 L 36 68 L 40 50 L 28 40 L 45 38 Z"
        fill="#FFD700" opacity="0.15" />
    </svg>
  ),
  's-sparkles': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* 4-point sparkle doodles */}
      <path d="M 50 10 C 52 25 52 25 65 30 C 52 35 52 35 50 50 C 48 35 48 35 35 30 C 48 25 48 25 50 10"
        fill="none" stroke="#FFD700" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 50 10 C 52 25 52 25 65 30 C 52 35 52 35 50 50 C 48 35 48 35 35 30 C 48 25 48 25 50 10"
        fill="#FFD700" opacity="0.15" />
      {/* Smaller sparkle */}
      <path d="M 75 50 C 76 58 76 58 82 60 C 76 62 76 62 75 70 C 74 62 74 62 68 60 C 74 58 74 58 75 50"
        fill="none" stroke="#FFA500" strokeWidth="1.2" opacity="0.7" />
      <path d="M 25 55 C 26 62 26 62 32 64 C 26 66 26 66 25 73 C 24 66 24 66 18 64 C 24 62 24 62 25 55"
        fill="none" stroke="#FFD700" strokeWidth="1" opacity="0.6" />
      {/* Dots */}
      <circle cx="60" cy="18" r="1.5" fill="#FFD700" opacity="0.4" />
      <circle cx="38" cy="65" r="1" fill="#FFA500" opacity="0.35" />
    </svg>
  ),
  's-glowing-star': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="glow-doodle"><stop offset="0%" stopColor="#FFD700" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFD700" stopOpacity="0" /></radialGradient>
      </defs>
      {/* Soft glow */}
      <circle cx="50" cy="50" r="35" fill="url(#glow-doodle)" />
      {/* Hand-drawn 8-point star */}
      <path d="M 50 12 L 54 38 L 78 22 L 60 44 L 88 50 L 60 56 L 78 78 L 54 62 L 50 88 L 46 62 L 22 78 L 40 56 L 12 50 L 40 44 L 22 22 L 46 38 Z"
        fill="none" stroke="#DAA520" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 50 12 L 54 38 L 78 22 L 60 44 L 88 50 L 60 56 L 78 78 L 54 62 L 50 88 L 46 62 L 22 78 L 40 56 L 12 50 L 40 44 L 22 22 L 46 38 Z"
        fill="#FFD700" opacity="0.12" />
    </svg>
  ),

  // ─── NATURE ────────────────────────────────────
  's-butterfly': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Sketch-style butterfly */}
      {/* Left wings */}
      <path d="M 48 42 C 38 28 18 18 14 28 C 10 38 22 48 34 48 C 32 52 24 62 18 68 C 14 72 22 78 34 68 C 40 62 44 56 48 52"
        fill="none" stroke="#BA68C8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 48 42 C 38 28 18 18 14 28 C 10 38 22 48 34 48" fill="#E1BEE7" opacity="0.3" />
      <path d="M 48 52 C 40 62 22 78 18 68 C 14 58 32 52 34 48" fill="#CE93D8" opacity="0.2" />
      {/* Right wings */}
      <path d="M 52 42 C 62 28 82 18 86 28 C 90 38 78 48 66 48 C 68 52 76 62 82 68 C 86 72 78 78 66 68 C 60 62 56 56 52 52"
        fill="none" stroke="#BA68C8" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 52 42 C 62 28 82 18 86 28 C 90 38 78 48 66 48" fill="#E1BEE7" opacity="0.3" />
      <path d="M 52 52 C 60 62 78 78 82 68 C 86 58 68 52 66 48" fill="#CE93D8" opacity="0.2" />
      {/* Body */}
      <path d="M 50 30 C 50 35 50 55 50 70" stroke="#6A1B9A" strokeWidth="2" strokeLinecap="round" />
      {/* Antennae */}
      <path d="M 50 32 C 44 22 40 18 38 14" stroke="#6A1B9A" strokeWidth="1" fill="none" />
      <path d="M 50 32 C 56 22 60 18 62 14" stroke="#6A1B9A" strokeWidth="1" fill="none" />
      <circle cx="38" cy="13" r="1.5" fill="#6A1B9A" opacity="0.6" />
      <circle cx="62" cy="13" r="1.5" fill="#6A1B9A" opacity="0.6" />
      {/* Wing spots */}
      <circle cx="28" cy="34" r="3" fill="#FFD700" opacity="0.25" />
      <circle cx="72" cy="34" r="3" fill="#FFD700" opacity="0.25" />
    </svg>
  ),
  's-bee': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Cute doodle bee */}
      {/* Wings */}
      <ellipse cx="35" cy="38" rx="14" ry="10" fill="none" stroke="#90CAF9" strokeWidth="1.2" opacity="0.6" transform="rotate(-20 35 38)" />
      <ellipse cx="35" cy="38" rx="14" ry="10" fill="#E3F2FD" opacity="0.2" transform="rotate(-20 35 38)" />
      <ellipse cx="65" cy="38" rx="14" ry="10" fill="none" stroke="#90CAF9" strokeWidth="1.2" opacity="0.6" transform="rotate(20 65 38)" />
      <ellipse cx="65" cy="38" rx="14" ry="10" fill="#E3F2FD" opacity="0.2" transform="rotate(20 65 38)" />
      {/* Body */}
      <ellipse cx="50" cy="52" rx="16" ry="20" fill="none" stroke="#333" strokeWidth="1.8" />
      <ellipse cx="50" cy="52" rx="16" ry="20" fill="#FFD54F" opacity="0.3" />
      {/* Stripes */}
      <path d="M 36 44 C 42 42 58 42 64 44" stroke="#333" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M 34 52 C 42 50 58 50 66 52" stroke="#333" strokeWidth="2" fill="none" opacity="0.5" />
      <path d="M 36 60 C 42 58 58 58 64 60" stroke="#333" strokeWidth="2" fill="none" opacity="0.5" />
      {/* Face */}
      <circle cx="44" cy="38" r="2" fill="#333" opacity="0.6" />
      <circle cx="56" cy="38" r="2" fill="#333" opacity="0.6" />
      <path d="M 47 42 C 49 44 51 44 53 42" stroke="#333" strokeWidth="0.8" fill="none" opacity="0.4" />
      {/* Antennae */}
      <path d="M 46 34 C 42 26 38 22 36 20" stroke="#333" strokeWidth="1" fill="none" />
      <path d="M 54 34 C 58 26 62 22 64 20" stroke="#333" strokeWidth="1" fill="none" />
      <circle cx="36" cy="19" r="1.5" fill="#333" opacity="0.5" />
      <circle cx="64" cy="19" r="1.5" fill="#333" opacity="0.5" />
    </svg>
  ),
  's-ribbon': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn bow ribbon */}
      {/* Left loop */}
      <path d="M 50 48 C 40 32 20 28 18 38 C 16 48 30 56 50 48"
        fill="#FF69B4" opacity="0.25" />
      <path d="M 50 48 C 40 32 20 28 18 38 C 16 48 30 56 50 48"
        fill="none" stroke="#FF69B4" strokeWidth="1.8" strokeLinecap="round" />
      {/* Right loop */}
      <path d="M 50 48 C 60 32 80 28 82 38 C 84 48 70 56 50 48"
        fill="#FF69B4" opacity="0.25" />
      <path d="M 50 48 C 60 32 80 28 82 38 C 84 48 70 56 50 48"
        fill="none" stroke="#FF69B4" strokeWidth="1.8" strokeLinecap="round" />
      {/* Tails */}
      <path d="M 50 52 C 42 60 35 72 28 82" stroke="#FF69B4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M 50 52 C 58 60 65 72 72 82" stroke="#FF69B4" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Center knot */}
      <circle cx="50" cy="48" r="5" fill="none" stroke="#DC143C" strokeWidth="1.5" />
      <circle cx="50" cy="48" r="5" fill="#DC143C" opacity="0.2" />
    </svg>
  ),

  // ─── DECOR ─────────────────────────────────────
  's-gift': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn gift box */}
      <rect x="20" y="42" width="60" height="44" rx="3" fill="none" stroke="#FF69B4" strokeWidth="2" strokeLinecap="round" />
      <rect x="20" y="42" width="60" height="44" rx="3" fill="#FFE4EC" opacity="0.2" />
      {/* Lid */}
      <rect x="16" y="32" width="68" height="14" rx="3" fill="none" stroke="#FF69B4" strokeWidth="2" />
      <rect x="16" y="32" width="68" height="14" rx="3" fill="#FFE4EC" opacity="0.25" />
      {/* Ribbon cross */}
      <line x1="50" y1="32" x2="50" y2="86" stroke="#DC143C" strokeWidth="2" strokeDasharray="3,2" />
      <line x1="16" y1="39" x2="84" y2="39" stroke="#DC143C" strokeWidth="2" strokeDasharray="3,2" />
      {/* Bow on top */}
      <path d="M 50 32 C 42 22 34 20 36 26 C 38 32 46 34 50 32" fill="none" stroke="#DC143C" strokeWidth="1.5" />
      <path d="M 50 32 C 58 22 66 20 64 26 C 62 32 54 34 50 32" fill="none" stroke="#DC143C" strokeWidth="1.5" />
    </svg>
  ),
  's-diamond': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn diamond */}
      <path d="M 50 10 L 78 40 L 50 90 L 22 40 Z" fill="none" stroke="#64B5F6" strokeWidth="2" strokeLinejoin="round" />
      <path d="M 50 10 L 78 40 L 50 90 L 22 40 Z" fill="#BBDEFB" opacity="0.15" />
      {/* Facet lines */}
      <path d="M 50 10 L 50 90" stroke="#64B5F6" strokeWidth="0.8" opacity="0.3" />
      <path d="M 22 40 L 78 40" stroke="#64B5F6" strokeWidth="0.8" opacity="0.3" />
      <path d="M 50 10 L 36 40 L 50 90" stroke="#64B5F6" strokeWidth="0.6" opacity="0.2" />
      <path d="M 50 10 L 64 40 L 50 90" stroke="#64B5F6" strokeWidth="0.6" opacity="0.2" />
      {/* Sparkle */}
      <path d="M 42 32 L 44 26 L 46 32 L 48 28 L 44 32 Z" stroke="#FFD700" strokeWidth="0.8" fill="none" opacity="0.4" />
    </svg>
  ),
  's-crown': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Doodle crown */}
      <path d="M 15 70 L 15 40 L 30 55 L 50 25 L 70 55 L 85 40 L 85 70 Z"
        fill="none" stroke="#DAA520" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
      <path d="M 15 70 L 15 40 L 30 55 L 50 25 L 70 55 L 85 40 L 85 70 Z"
        fill="#FFD700" opacity="0.15" />
      {/* Base band */}
      <rect x="15" y="66" width="70" height="10" rx="2" fill="none" stroke="#DAA520" strokeWidth="1.5" />
      <rect x="15" y="66" width="70" height="10" rx="2" fill="#FFD700" opacity="0.1" />
      {/* Gems */}
      <circle cx="30" cy="71" r="3" fill="none" stroke="#FF69B4" strokeWidth="1.2" />
      <circle cx="50" cy="71" r="3" fill="none" stroke="#FF69B4" strokeWidth="1.2" />
      <circle cx="70" cy="71" r="3" fill="none" stroke="#FF69B4" strokeWidth="1.2" />
      {/* Point tips */}
      <circle cx="15" cy="38" r="2" fill="#FFD700" opacity="0.3" />
      <circle cx="50" cy="23" r="2" fill="#FFD700" opacity="0.3" />
      <circle cx="85" cy="38" r="2" fill="#FFD700" opacity="0.3" />
    </svg>
  ),

  // ─── LOVE ──────────────────────────────────────
  's-love-letter': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Doodle envelope */}
      <rect x="14" y="30" width="72" height="48" rx="3" fill="none" stroke="#FFB6D9" strokeWidth="2" strokeLinecap="round" />
      <rect x="14" y="30" width="72" height="48" rx="3" fill="#FFF0F5" opacity="0.25" />
      {/* Flap */}
      <path d="M 14 30 L 50 56 L 86 30" fill="none" stroke="#FFB6D9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      {/* Little heart seal */}
      <path d="M 50 48 C 48 46 44 46 44 49 C 44 52 50 56 50 56 C 50 56 56 52 56 49 C 56 46 52 46 50 48 Z"
        fill="#FF1493" opacity="0.5" />
      <path d="M 50 48 C 48 46 44 46 44 49 C 44 52 50 56 50 56 C 50 56 56 52 56 49 C 56 46 52 46 50 48 Z"
        fill="none" stroke="#FF1493" strokeWidth="1" opacity="0.7" />
    </svg>
  ),
  's-kiss': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Doodle lips/kiss mark */}
      <path d="M 50 30 C 38 28 26 34 24 42 C 22 50 30 56 40 54 C 44 58 46 62 50 66 C 54 62 56 58 60 54 C 70 56 78 50 76 42 C 74 34 62 28 50 30 Z"
        fill="#FF69B4" opacity="0.3" />
      <path d="M 50 30 C 38 28 26 34 24 42 C 22 50 30 56 40 54 C 44 58 46 62 50 66 C 54 62 56 58 60 54 C 70 56 78 50 76 42 C 74 34 62 28 50 30 Z"
        fill="none" stroke="#FF69B4" strokeWidth="1.8" strokeLinecap="round" />
      {/* Lip line */}
      <path d="M 28 44 C 36 46 44 42 50 46 C 56 42 64 46 72 44" stroke="#DC143C" strokeWidth="1" fill="none" opacity="0.3" />
    </svg>
  ),

  // ─── NATURE 2 ──────────────────────────────────
  's-cloud': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Soft hand-drawn cloud */}
      <path d="M 22 58 C 14 58 10 50 14 44 C 18 38 22 38 26 36 C 28 28 36 22 46 24 C 52 18 62 18 68 26 C 76 24 84 30 82 40 C 88 42 90 52 82 56 C 80 60 72 60 68 58 Z"
        fill="none" stroke="#B0BEC5" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M 22 58 C 14 58 10 50 14 44 C 18 38 22 38 26 36 C 28 28 36 22 46 24 C 52 18 62 18 68 26 C 76 24 84 30 82 40 C 88 42 90 52 82 56 C 80 60 72 60 68 58 Z"
        fill="#ECEFF1" opacity="0.2" />
    </svg>
  ),
  's-leaf': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn leaf */}
      <path d="M 50 15 C 68 30 75 50 70 68 C 65 82 55 88 48 86 C 35 82 28 65 32 45 C 35 30 42 20 50 15 Z"
        fill="none" stroke="#66BB6A" strokeWidth="2" strokeLinecap="round" />
      <path d="M 50 15 C 68 30 75 50 70 68 C 65 82 55 88 48 86 C 35 82 28 65 32 45 C 35 30 42 20 50 15 Z"
        fill="#A5D6A7" opacity="0.15" />
      {/* Center vein */}
      <path d="M 50 18 C 52 35 52 55 50 80" stroke="#4CAF50" strokeWidth="1" fill="none" opacity="0.5" />
      {/* Side veins */}
      <path d="M 50 35 C 58 38 62 42 65 48" stroke="#4CAF50" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 50 45 C 42 48 38 52 36 58" stroke="#4CAF50" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 50 55 C 56 58 60 62 62 68" stroke="#4CAF50" strokeWidth="0.6" fill="none" opacity="0.3" />
      <path d="M 50 65 C 44 68 40 72 38 76" stroke="#4CAF50" strokeWidth="0.6" fill="none" opacity="0.3" />
    </svg>
  ),
  's-moon': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="moon-doodle"><stop offset="0%" stopColor="#FFFDE7" stopOpacity="0.3" /><stop offset="100%" stopColor="#FFFDE7" stopOpacity="0" /></radialGradient>
      </defs>
      {/* Glow */}
      <circle cx="50" cy="50" r="38" fill="url(#moon-doodle)" />
      {/* Hand-drawn crescent */}
      <path d="M 56 14 C 38 18 24 34 24 52 C 24 70 38 86 56 88 C 44 82 36 68 36 52 C 36 36 44 22 56 14 Z"
        fill="none" stroke="#FFD54F" strokeWidth="2" strokeLinecap="round" />
      <path d="M 56 14 C 38 18 24 34 24 52 C 24 70 38 86 56 88 C 44 82 36 68 36 52 C 36 36 44 22 56 14 Z"
        fill="#FFF9C4" opacity="0.2" />
      {/* Stars nearby */}
      <path d="M 70 24 L 72 20 L 74 24 L 78 22 L 74 25 L 76 28 L 72 26 L 70 24" stroke="#FFD700" strokeWidth="0.8" fill="none" opacity="0.5" />
      <circle cx="78" cy="40" r="1" fill="#FFD700" opacity="0.4" />
      <circle cx="72" cy="68" r="1.2" fill="#FFD700" opacity="0.35" />
    </svg>
  ),
  's-clover': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn 4-leaf clover */}
      {/* Top leaf */}
      <path d="M 50 45 C 45 32 38 22 44 18 C 50 14 56 22 56 32 C 56 38 53 42 50 45" fill="none" stroke="#43A047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 50 45 C 45 32 38 22 44 18 C 50 14 56 22 56 32 C 56 38 53 42 50 45" fill="#66BB6A" opacity="0.2" />
      {/* Right leaf */}
      <path d="M 55 50 C 68 45 78 38 82 44 C 86 50 78 56 68 56 C 62 56 58 53 55 50" fill="none" stroke="#43A047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 55 50 C 68 45 78 38 82 44 C 86 50 78 56 68 56 C 62 56 58 53 55 50" fill="#66BB6A" opacity="0.2" />
      {/* Bottom leaf */}
      <path d="M 50 55 C 55 68 62 78 56 82 C 50 86 44 78 44 68 C 44 62 47 58 50 55" fill="none" stroke="#43A047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 50 55 C 55 68 62 78 56 82 C 50 86 44 78 44 68 C 44 62 47 58 50 55" fill="#66BB6A" opacity="0.2" />
      {/* Left leaf */}
      <path d="M 45 50 C 32 45 22 38 18 44 C 14 50 22 56 32 56 C 38 56 42 53 45 50" fill="none" stroke="#43A047" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M 45 50 C 32 45 22 38 18 44 C 14 50 22 56 32 56 C 38 56 42 53 45 50" fill="#66BB6A" opacity="0.2" />
      {/* Stem */}
      <path d="M 50 58 C 52 68 54 78 52 88" stroke="#2E7D32" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  ),
  's-rainbow': (
    <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
      {/* Hand-drawn rainbow arcs */}
      <path d="M 12 72 Q 50 8 88 72" fill="none" stroke="#EF5350" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M 18 72 Q 50 16 82 72" fill="none" stroke="#FFA726" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M 24 72 Q 50 24 76 72" fill="none" stroke="#FFEE58" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M 30 72 Q 50 32 70 72" fill="none" stroke="#66BB6A" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M 36 72 Q 50 40 64 72" fill="none" stroke="#42A5F5" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      <path d="M 42 72 Q 50 48 58 72" fill="none" stroke="#AB47BC" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      {/* Cloud doodles */}
      <path d="M 6 70 C 4 66 8 62 14 64 C 16 60 22 62 20 66 C 24 66 22 72 18 72 Z" fill="none" stroke="#B0BEC5" strokeWidth="1" opacity="0.4" />
      <path d="M 80 70 C 78 66 82 62 88 64 C 90 60 96 62 94 66 C 98 66 96 72 92 72 Z" fill="none" stroke="#B0BEC5" strokeWidth="1" opacity="0.4" />
    </svg>
  ),
};

export function getStickerSVG(stickerId: string): React.ReactNode | undefined {
  return STICKER_SVGS[stickerId];
}

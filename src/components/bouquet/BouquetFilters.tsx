import React from 'react';

export const BouquetFilters = () => (
    <svg width="0" height="0" className="absolute pointer-events-none">
        <defs>
            {/* 1. Watercolor Blur - Softens filled shapes for a paint-like bleed */}
            <filter id="watercolor" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur in="SourceGraphic" stdDeviation="1.5" result="blur" />
                <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
                <feComposite in="SourceGraphic" in2="goo" operator="atop" />
            </filter>

            {/* 2. Organic Edges - Roughens vector paths to look like hand-painted edges */}
            <filter id="organic-edge" x="-20%" y="-20%" width="140%" height="140%">
                <feTurbulence type="fractalNoise" baseFrequency="0.05" numOctaves="3" result="noise" />
                <feDisplacementMap in="SourceGraphic" in2="noise" scale="3" xChannelSelector="R" yChannelSelector="G" />
            </filter>

            {/* 3. Paper Texture - Adds grain to flat colors */}
            <filter id="paper-texture">
                <feTurbulence type="fractalNoise" baseFrequency="0.8" numOctaves="3" stitchTiles="stitch" />
                <feColorMatrix type="saturate" values="0" />
                <feComponentTransfer>
                    <feFuncR type="linear" slope="0.5" intercept="0.7" />
                    <feFuncG type="linear" slope="0.5" intercept="0.7" />
                    <feFuncB type="linear" slope="0.5" intercept="0.7" />
                </feComponentTransfer>
                <feBlend mode="multiply" in="SourceGraphic" />
            </filter>

            {/* 4. Soft Shadow - Depth between petals */}
            <filter id="soft-depth" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="1" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
            </filter>

            {/* 5. Stem Texture - Linear noise for stalks */}
            <filter id="stem-texture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="turbulence" baseFrequency="0.5 0.05" numOctaves="2" result="noise" />
                <feComposite operator="in" in="noise" in2="SourceGraphic" result="texturedNoise" />
                <feBlend mode="multiply" in="texturedNoise" in2="SourceGraphic" />
            </filter>
        </defs>
    </svg>
);

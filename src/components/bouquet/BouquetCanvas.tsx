import { useRef, useCallback, useState, useEffect, useLayoutEffect } from "react";
import { PlacedElement } from "@/lib/bouquet-store";
import { WRAP_STYLES } from "@/lib/flowers-data";
import { getElementImage } from "@/lib/flower-assets";
import { getStickerSVG } from "@/lib/sticker-svgs";
import { getFlowerSVG } from "@/lib/flower-svgs";
import { BouquetWrap } from "./BouquetWrap";
import { BouquetFilters } from "./BouquetFilters";

interface BouquetCanvasProps {
  elements: PlacedElement[];
  wrapId: string;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<PlacedElement>) => void;
  onDeleteElement: (id: string) => void;
}

// 400x500 Internal Coordinate Space
const INTERNAL_WIDTH = 400;
const INTERNAL_HEIGHT = 500;

// Boundary constants relative to 400x500 space
// Restored for taller bouquet (82% width, near full height)
// TopY=25, BottomY=475. Center=250. Ry=225. Rx=164.
const BOUNDARY = { cx: 200, cy: 250, rx: 164, ry: 225 };

// Flowers that shouldn't be clipped (tall/sprig types)
const NO_CLIP_IDS = ['eucalyptus', 'fern', 'monstera', 'jasmine', 'bluebell', 'lavender', 'babysbreath', 'cherry-blossom'];

export const BouquetCanvas = ({
  elements,
  wrapId,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
}: BouquetCanvasProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);
  const dragRef = useRef<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null);

  // Resize observer to maintain consistent scale
  useLayoutEffect(() => {
    if (!containerRef.current) return;
    const updateScale = () => {
      if (containerRef.current) {
        const { width } = containerRef.current.getBoundingClientRect();
        setScale(width / INTERNAL_WIDTH);
      }
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    observer.observe(containerRef.current);

    return () => observer.disconnect();
  }, []);

  const wrap = WRAP_STYLES.find(w => w.id === wrapId) || WRAP_STYLES[0];

  const clampToBoundary = useCallback((x: number, y: number) => {
    let dx = x - BOUNDARY.cx;
    let dy = y - BOUNDARY.cy;

    // 1. Vertical limit (allow sticking out top more)
    if (dy > BOUNDARY.ry * 0.8) dy = BOUNDARY.ry * 0.8;
    if (dy < -BOUNDARY.ry * 1.2) dy = -BOUNDARY.ry * 1.2;

    // 2. Cone shape horizontal limit (Trapezoid)
    const yLevel = dy / BOUNDARY.ry;
    const widthFactor = 1 - (Math.max(0, yLevel) * 0.6);
    const currentMaxX = BOUNDARY.rx * widthFactor;

    if (dx < -currentMaxX) dx = -currentMaxX;
    if (dx > currentMaxX) dx = currentMaxX;

    return { x: BOUNDARY.cx + dx, y: BOUNDARY.cy + dy };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent, el: PlacedElement) => {
    e.stopPropagation();
    e.preventDefault();
    onSelectElement(el.id);
    const target = e.currentTarget as HTMLElement;
    target.setPointerCapture(e.pointerId);

    dragRef.current = {
      id: el.id,
      startX: e.clientX,
      startY: e.clientY,
      elX: el.x,
      elY: el.y,
    };
  }, [onSelectElement]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;

    const dx = (e.clientX - dragRef.current.startX) / scale;
    const dy = (e.clientY - dragRef.current.startY) / scale;

    const rawX = dragRef.current.elX + dx;
    const rawY = dragRef.current.elY + dy;

    const clamped = clampToBoundary(rawX, rawY);
    onUpdateElement(dragRef.current.id, { x: clamped.x, y: clamped.y });
  }, [scale, onUpdateElement, clampToBoundary]);

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  const sortedElements = [...elements].sort((a, b) => a.zIndex - b.zIndex);

  return (
    <div
      className="w-full h-full flex items-center justify-center overflow-hidden bg-background/5 p-4"
      style={{
        background: `radial-gradient(circle at center, hsl(var(--background)), hsl(var(--muted)))`,
        touchAction: 'none'
      }}
    >
      <div
        ref={containerRef}
        className="relative shadow-2xl rounded-sm"
        style={{
          width: '100%',
          maxWidth: '85vh',
          aspectRatio: '0.8',
          background: 'transparent'
        }}
      >
        <div
          className="absolute inset-0 z-0"
          onClick={() => onSelectElement(null)}
        />
        <BouquetFilters />

        <div
          className="absolute top-0 left-0 origin-top-left pointer-events-none"
          style={{
            width: INTERNAL_WIDTH,
            height: INTERNAL_HEIGHT,
            transform: `scale(${scale})`,
          }}
        >
          {/* Back wrap layer */}
          <BouquetWrap wrap={wrap} width={INTERNAL_WIDTH} height={INTERNAL_HEIGHT} layer="back" />

          {/* Flowers and stickers */}
          <div className="absolute inset-0" style={{ zIndex: 10 }}>
            {sortedElements.map(el => {
              const stickerSVG = el.type === 'sticker' ? getStickerSVG(el.dataId) : null;
              const flowerSVG = el.type === 'flower' ? getFlowerSVG(el.dataId, el.color) : null;
              const fallbackImage = getElementImage(el.type, el.dataId);
              const size = el.scale * (el.type === 'flower' ? 80 : 56);
              // Clipping Logic:
              // If flower is in top half (y < 250) AND not a tall type, clip stem.
              // Clip bottom 50% of the SVG box.
              const shouldClip = el.type === 'flower' && el.y < 240 && !NO_CLIP_IDS.includes(el.dataId);

              const isSelected = selectedElementId === el.id;

              return (
                <div
                  key={el.id}
                  className={`absolute select-none touch-none pointer-events-auto ${isSelected ? 'cursor-grabbing' : 'cursor-grab'}`}
                  style={{
                    left: el.x - size / 2,
                    top: el.y - size / 2,
                    width: size,
                    height: size,
                    transform: `rotate(${el.rotation}deg)`,
                    zIndex: el.zIndex,
                    opacity: el.opacity,
                    filter: isSelected
                      ? 'drop-shadow(0 0 8px rgba(255,105,180,0.8))'
                      : (el.type === 'flower' ? 'drop-shadow(0 4px 8px rgba(0,0,0,0.15))' : 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))'),
                    cursor: isSelected ? 'grabbing' : 'grab',
                    touchAction: 'none',
                    // Apply clipping to hide stems
                    transition: 'clip-path 0.3s ease',
                  }}
                  onPointerDown={e => handlePointerDown(e, el)}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                >
                  {flowerSVG ? (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                      {flowerSVG}
                    </div>
                  ) : stickerSVG ? (
                    <div className="w-full h-full flex items-center justify-center pointer-events-none">
                      {stickerSVG}
                    </div>
                  ) : fallbackImage ? (
                    <img
                      src={fallbackImage}
                      alt={el.dataId}
                      className="w-full h-full object-contain pointer-events-none"
                      draggable={false}
                    />
                  ) : (
                    <span style={{ fontSize: `${el.scale * 2}rem` }} className="pointer-events-none">{el.emoji}</span>
                  )}
                </div>
              );
            })}
          </div>

          {/* Front wrap overlay - masking stems */}
          <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 20 }}>
            <BouquetWrap wrap={wrap} width={INTERNAL_WIDTH} height={INTERNAL_HEIGHT} layer="front" />
          </div>
        </div>

        {elements.length === 0 && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ zIndex: 30 }}>
            <div className="text-center bg-background/30 backdrop-blur-sm p-4 rounded-xl border border-white/20">
              <p className="text-4xl mb-2">🌸</p>
              <p className="text-sm font-medium text-foreground/70">
                Drag detailed flowers & doodles here!
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

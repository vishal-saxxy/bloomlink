import { useRef, useCallback } from "react";
import { PlacedElement } from "@/lib/bouquet-store";
import { WRAP_STYLES } from "@/lib/flowers-data";
import { getElementImage } from "@/lib/flower-assets";

interface BouquetCanvasProps {
  elements: PlacedElement[];
  wrapId: string;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<PlacedElement>) => void;
  onDeleteElement: (id: string) => void;
}

const BOUNDARY = { cx: 0.5, cy: 0.55, rx: 0.38, ry: 0.42 };

export const BouquetCanvas = ({
  elements,
  wrapId,
  selectedElementId,
  onSelectElement,
  onUpdateElement,
}: BouquetCanvasProps) => {
  const canvasRef = useRef<HTMLDivElement>(null);
  const dragRef = useRef<{ id: string; startX: number; startY: number; elX: number; elY: number } | null>(null);

  const wrap = WRAP_STYLES.find(w => w.id === wrapId) || WRAP_STYLES[0];

  const clampToBoundary = useCallback((x: number, y: number) => {
    if (!canvasRef.current) return { x, y };
    const rect = canvasRef.current.getBoundingClientRect();
    const cx = rect.width * BOUNDARY.cx;
    const cy = rect.height * BOUNDARY.cy;
    const rx = rect.width * BOUNDARY.rx;
    const ry = rect.height * BOUNDARY.ry;

    const dx = x - cx;
    const dy = y - cy;
    const dist = (dx * dx) / (rx * rx) + (dy * dy) / (ry * ry);

    if (dist <= 1.3) return { x, y }; // allow slight overflow

    const angle = Math.atan2(dy / ry, dx / rx);
    return {
      x: cx + rx * 1.15 * Math.cos(angle),
      y: cy + ry * 1.15 * Math.sin(angle),
    };
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
    const dx = e.clientX - dragRef.current.startX;
    const dy = e.clientY - dragRef.current.startY;
    const clamped = clampToBoundary(dragRef.current.elX + dx, dragRef.current.elY + dy);
    onUpdateElement(dragRef.current.id, { x: clamped.x, y: clamped.y });
  }, [onUpdateElement, clampToBoundary]);

  const handlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      ref={canvasRef}
      className="w-full h-full relative overflow-hidden cursor-crosshair"
      style={{ background: `linear-gradient(135deg, hsl(var(--background)), hsl(var(--muted)))` }}
      onClick={() => onSelectElement(null)}
    >
      {/* Wrap paper base - always visible */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        {/* Outer wrap fold */}
        <div
          className="absolute w-[75%] h-[80%] rounded-t-[40%] rounded-b-xl"
          style={{
            background: `linear-gradient(180deg, ${wrap.color}${Math.round(wrap.opacity * 200).toString(16).padStart(2, '0')}, ${wrap.color}${Math.round(wrap.opacity * 120).toString(16).padStart(2, '0')} 60%, ${wrap.color}${Math.round(wrap.opacity * 255).toString(16).padStart(2, '0')})`,
            boxShadow: `0 8px 32px ${wrap.color}40, inset 0 -20px 40px ${wrap.color}30`,
            top: '10%',
          }}
        />
        {/* Inner wrap layer for depth */}
        <div
          className="absolute w-[65%] h-[70%] rounded-t-[35%] rounded-b-lg"
          style={{
            background: `linear-gradient(170deg, ${wrap.color}${Math.round(wrap.opacity * 140).toString(16).padStart(2, '0')}, transparent 80%)`,
            top: '15%',
          }}
        />
        {/* Left fold crease */}
        <div
          className="absolute w-[10%] h-[60%] -rotate-6"
          style={{
            background: `linear-gradient(90deg, transparent, ${wrap.color}25, transparent)`,
            left: '15%',
            top: '20%',
          }}
        />
        {/* Right fold crease */}
        <div
          className="absolute w-[10%] h-[60%] rotate-6"
          style={{
            background: `linear-gradient(90deg, transparent, ${wrap.color}25, transparent)`,
            right: '15%',
            top: '20%',
          }}
        />
        {/* Bottom gather/tie point */}
        <div
          className="absolute w-16 h-8 rounded-full"
          style={{
            background: `radial-gradient(ellipse, ${wrap.color}90, transparent)`,
            bottom: '8%',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        />
      </div>

      {/* Bouquet boundary guide */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="border border-dashed border-primary/10 rounded-[50%]"
          style={{
            width: `${BOUNDARY.rx * 200}%`,
            height: `${BOUNDARY.ry * 200}%`,
            marginTop: `${(BOUNDARY.cy - 0.5) * 200}%`,
          }}
        />
      </div>

      {/* Grid hint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Elements */}
      {elements.map(el => {
        const image = getElementImage(el.type, el.dataId);
        const size = el.scale * (el.type === 'flower' ? 80 : 56);

        return (
          <div
            key={el.id}
            className={`absolute select-none touch-none transition-shadow ${
              selectedElementId === el.id ? 'ring-2 ring-primary/50 ring-offset-2 rounded-lg' : ''
            }`}
            style={{
              left: el.x - size / 2,
              top: el.y - size / 2,
              width: size,
              height: size,
              transform: `rotate(${el.rotation}deg)`,
              zIndex: el.zIndex,
              opacity: el.opacity,
              cursor: 'grab',
              filter: el.type === 'flower'
                ? 'drop-shadow(0 3px 6px rgba(0,0,0,0.15))'
                : 'drop-shadow(0 2px 3px rgba(0,0,0,0.1))',
            }}
            onPointerDown={e => handlePointerDown(e, el)}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
          >
            {image ? (
              <img
                src={image}
                alt={el.dataId}
                className="w-full h-full object-contain pointer-events-none"
                draggable={false}
              />
            ) : (
              <span style={{ fontSize: `${el.scale * 2}rem` }}>{el.emoji}</span>
            )}
          </div>
        );
      })}

      {/* Empty state */}
      {elements.length === 0 && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="text-center">
            <p className="text-4xl mb-3 opacity-30">🌸</p>
            <p className="text-sm text-muted-foreground/40">
              Pick flowers from the panel to start building
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

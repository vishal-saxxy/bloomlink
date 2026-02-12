import { useRef, useCallback } from "react";
import { PlacedElement } from "@/lib/bouquet-store";
import { WRAP_STYLES } from "@/lib/flowers-data";

interface BouquetCanvasProps {
  elements: PlacedElement[];
  wrapId: string;
  selectedElementId: string | null;
  onSelectElement: (id: string | null) => void;
  onUpdateElement: (id: string, updates: Partial<PlacedElement>) => void;
  onDeleteElement: (id: string) => void;
}

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
    onUpdateElement(dragRef.current.id, {
      x: dragRef.current.elX + dx,
      y: dragRef.current.elY + dy,
    });
  }, [onUpdateElement]);

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
      {/* Wrap visualization */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div
          className="w-72 h-72 md:w-96 md:h-96 rounded-3xl"
          style={{
            background: `radial-gradient(ellipse at center bottom, ${wrap.color}${Math.round(wrap.opacity * 255).toString(16).padStart(2, '0')}, transparent 75%)`,
          }}
        />
      </div>

      {/* Grid hint */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage: 'radial-gradient(circle, hsl(var(--foreground)) 1px, transparent 1px)',
          backgroundSize: '30px 30px',
        }}
      />

      {/* Elements */}
      {elements.map(el => (
        <div
          key={el.id}
          className={`absolute select-none touch-none transition-shadow ${
            selectedElementId === el.id ? 'ring-2 ring-primary/50 ring-offset-2 rounded-lg' : ''
          }`}
          style={{
            left: el.x,
            top: el.y,
            fontSize: `${el.scale * 2}rem`,
            transform: `rotate(${el.rotation}deg)`,
            zIndex: el.zIndex,
            opacity: el.opacity,
            cursor: 'grab',
            filter: el.type === 'flower' ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.1))' : undefined,
          }}
          onPointerDown={e => handlePointerDown(e, el)}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
        >
          {el.emoji}
        </div>
      ))}

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

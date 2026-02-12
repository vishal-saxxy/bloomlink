import { PlacedElement } from "@/lib/bouquet-store";
import { FLOWERS } from "@/lib/flowers-data";

interface CustomizationPanelProps {
  element: PlacedElement;
  onUpdate: (updates: Partial<PlacedElement>) => void;
  onDelete: () => void;
  onDeselect?: () => void;
}

export const CustomizationPanel = ({ element, onUpdate, onDelete, onDeselect }: CustomizationPanelProps) => {
  const flowerData = element.type === 'flower' ? FLOWERS.find(f => f.id === element.dataId) : null;

  return (
    <div className="w-full h-full flex flex-col gap-6 p-4">

      {/* Element Info */}
      <div className="flex items-center justify-between border-b border-border/40 pb-2">
        <h3 className="font-medium text-lg capitalize">{element.dataId.replace('-', ' ')}</h3>
        <button
          onClick={onDelete}
          className="p-2 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
          title="Delete Element"
        >
          🗑️
        </button>
      </div>

      {/* Colors (Flowers Only) */}
      {flowerData && flowerData.colors.length > 0 && (
        <div className="space-y-3">
          <label className="text-sm font-medium text-muted-foreground">Color</label>
          <div className="grid grid-cols-5 gap-2">
            {flowerData.colors.map(c => (
              <button
                key={c}
                onClick={() => onUpdate({ color: c })}
                className={`w-8 h-8 rounded-full border border-white/10 shadow-sm transition-transform hover:scale-110 ${element.color === c ? 'ring-2 ring-primary ring-offset-2 ring-offset-card scale-110' : ''}`}
                style={{ background: c }}
                title={c}
              />
            ))}
          </div>
        </div>
      )}

      {/* Size Control */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">Size</span>
          <span className="text-xs opacity-70">{Math.round(element.scale * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.5"
          max="3.0"
          step="0.1"
          value={element.scale}
          onChange={e => onUpdate({ scale: parseFloat(e.target.value) })}
          className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Rotation Control */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">Rotation</span>
          <span className="text-xs opacity-70">{Math.round(element.rotation)}°</span>
        </div>
        <input
          type="range"
          min="-180"
          max="180"
          step="5"
          value={element.rotation}
          onChange={e => onUpdate({ rotation: parseFloat(e.target.value) })}
          className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Opacity Control */}
      <div className="space-y-3">
        <div className="flex justify-between text-sm">
          <span className="font-medium text-muted-foreground">Opacity</span>
          <span className="text-xs opacity-70">{Math.round(element.opacity * 100)}%</span>
        </div>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.05"
          value={element.opacity}
          onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
          className="w-full accent-primary h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
        />
      </div>

      {/* Spacer to push content up */}
      <div className="flex-1" />

      {/* Close/Deselect Button (Mobile friendly mostly) */}
      {onDeselect && (
        <button
          onClick={onDeselect}
          className="w-full py-3 mt-4 rounded-xl bg-secondary hover:bg-secondary/80 text-secondary-foreground font-medium transition-colors"
        >
          Done Editing
        </button>
      )}
    </div>
  );
};

import { PlacedElement } from "@/lib/bouquet-store";

interface CustomizationPanelProps {
  element: PlacedElement;
  onUpdate: (updates: Partial<PlacedElement>) => void;
  onDelete: () => void;
  onDeselect: () => void;
}

export const CustomizationPanel = ({ element, onUpdate, onDelete, onDeselect }: CustomizationPanelProps) => {
  return (
    <div className="glass-panel px-4 py-3 flex items-center gap-3 flex-wrap justify-center">
      {/* Size */}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Size</span>
        <input
          type="range"
          min="0.5"
          max="4"
          step="0.1"
          value={element.scale}
          onChange={e => onUpdate({ scale: parseFloat(e.target.value) })}
          className="w-20 accent-primary"
        />
      </label>

      {/* Rotation */}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Rotate</span>
        <input
          type="range"
          min="-180"
          max="180"
          step="5"
          value={element.rotation}
          onChange={e => onUpdate({ rotation: parseFloat(e.target.value) })}
          className="w-20 accent-primary"
        />
      </label>

      {/* Opacity */}
      <label className="flex items-center gap-2 text-xs text-muted-foreground">
        <span>Opacity</span>
        <input
          type="range"
          min="0.2"
          max="1"
          step="0.05"
          value={element.opacity}
          onChange={e => onUpdate({ opacity: parseFloat(e.target.value) })}
          className="w-16 accent-primary"
        />
      </label>

      {/* Delete */}
      <button
        onClick={onDelete}
        className="text-xs px-3 py-1.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
      >
        🗑️
      </button>

      {/* Deselect */}
      <button
        onClick={onDeselect}
        className="text-xs px-3 py-1.5 rounded-full bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
      >
        ✓
      </button>
    </div>
  );
};

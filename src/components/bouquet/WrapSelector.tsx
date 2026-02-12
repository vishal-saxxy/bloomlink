import { WRAP_STYLES } from "@/lib/flowers-data";

interface WrapSelectorProps {
  selectedWrapId: string;
  onSelect: (id: string) => void;
}

export const WrapSelector = ({ selectedWrapId, onSelect }: WrapSelectorProps) => {
  return (
    <div className="space-y-2">
      <p className="text-xs text-muted-foreground mb-3">Choose a wrapping style</p>
      {WRAP_STYLES.map(wrap => (
        <button
          key={wrap.id}
          onClick={() => onSelect(wrap.id)}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-colors ${
            selectedWrapId === wrap.id
              ? 'bg-primary/10 border-2 border-primary/30'
              : 'bg-secondary/30 border-2 border-transparent hover:bg-secondary/50'
          }`}
        >
          <div
            className="w-10 h-10 rounded-lg border border-border/50"
            style={{
              background: `linear-gradient(135deg, ${wrap.color}, ${wrap.color}88)`,
              opacity: wrap.opacity,
            }}
          />
          <div className="text-left">
            <p className="text-sm font-medium">{wrap.name}</p>
            <p className="text-[10px] text-muted-foreground capitalize">{wrap.style}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

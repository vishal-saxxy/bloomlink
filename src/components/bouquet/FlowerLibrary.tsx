import { FLOWERS, type FlowerData } from "@/lib/flowers-data";

interface FlowerLibraryProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelect: (id: string) => void;
}

export const FlowerLibrary = ({ searchQuery, onSearchChange, onSelect }: FlowerLibraryProps) => {
  const filtered = FLOWERS.filter(f => {
    if (!searchQuery) return true;
    const q = searchQuery.toLowerCase();
    return (
      f.name.toLowerCase().includes(q) ||
      f.botanicalName.toLowerCase().includes(q) ||
      f.vibes.some(v => v.includes(q))
    );
  });

  return (
    <div>
      <input
        type="text"
        placeholder="Search by name, color, vibe..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
      />
      <div className="grid grid-cols-3 gap-2">
        {filtered.map(flower => (
          <button
            key={flower.id}
            onClick={() => onSelect(flower.id)}
            className="flex flex-col items-center gap-1 p-2 rounded-xl bg-secondary/30 hover:bg-secondary transition-colors group"
          >
            <span className="text-3xl group-hover:scale-110 transition-transform">{flower.emoji}</span>
            <span className="text-[10px] text-muted-foreground leading-tight text-center">{flower.name}</span>
          </button>
        ))}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground/50 py-8">No flowers found 🥀</p>
      )}
    </div>
  );
};

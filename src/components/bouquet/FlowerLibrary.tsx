import { useState } from "react";
import { FLOWERS } from "@/lib/flowers-data";
import { getFlowerSVG } from "@/lib/flower-svgs";

interface FlowerLibraryProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onSelect: (id: string) => void;
}

export const FlowerLibrary = ({ searchQuery, onSearchChange, onSelect }: FlowerLibraryProps) => {
  const [filter, setFilter] = useState<'all' | 'blooms' | 'greenery'>('all');

  const filtered = FLOWERS.filter(f => {
    // 1. Apply Search
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      if (!f.name.toLowerCase().includes(q) &&
        !f.botanicalName.toLowerCase().includes(q) &&
        !f.vibes.some(v => v.includes(q))) {
        return false;
      }
    }
    // 2. Apply Category Filter
    if (filter === 'greenery') return f.vibes.includes('greenery');
    if (filter === 'blooms') return !f.vibes.includes('greenery');
    return true;
  });

  return (
    <div>
      {/* Category Filter Chips */}
      <div className="flex gap-2 mb-3">
        {(['all', 'blooms', 'greenery'] as const).map(cat => (
          <button
            key={cat}
            onClick={() => setFilter(cat)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${filter === cat
                ? 'bg-primary text-primary-foreground shadow-sm'
                : 'bg-secondary/50 text-muted-foreground hover:bg-secondary'
              }`}
          >
            {cat.charAt(0).toUpperCase() + cat.slice(1)}
          </button>
        ))}
      </div>

      <input
        type="text"
        placeholder="Search..."
        value={searchQuery}
        onChange={e => onSearchChange(e.target.value)}
        className="w-full px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 text-sm placeholder:text-muted-foreground/50 focus:outline-none focus:ring-2 focus:ring-primary/30 mb-3"
      />
      <div className="grid grid-cols-3 gap-2">
        {filtered.map(flower => {
          const svgPreview = getFlowerSVG(flower.id, flower.defaultColor);
          return (
            <button
              key={flower.id}
              onClick={() => onSelect(flower.id)}
              className="flex flex-col items-center gap-1 p-2 rounded-xl hover:bg-secondary/40 transition-colors group"
            >
              {svgPreview ? (
                <div className="w-14 h-14 flex items-center justify-center group-hover:scale-110 transition-transform">
                  {svgPreview}
                </div>
              ) : (
                <span className="text-3xl group-hover:scale-110 transition-transform">{flower.emoji}</span>
              )}
              <span className="text-[10px] text-muted-foreground leading-tight text-center">{flower.name}</span>
            </button>
          );
        })}
      </div>
      {filtered.length === 0 && (
        <p className="text-center text-sm text-muted-foreground/50 py-8">No flowers found 🥀</p>
      )}
    </div>
  );
};

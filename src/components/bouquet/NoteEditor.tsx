import { NOTE_FONTS } from "@/lib/flowers-data";

interface NoteEditorProps {
  recipientName: string;
  note: string;
  noteFont: string;
  noteColor: string;
  onUpdate: (updates: { recipientName?: string; note?: string; noteFont?: string; noteColor?: string }) => void;
}

const COLORS = [
  { id: 'rose', value: '#8B4557' },
  { id: 'pink', value: '#D4698A' },
  { id: 'brown', value: '#7B6856' },
  { id: 'navy', value: '#3B4A6B' },
  { id: 'forest', value: '#4A6B5A' },
];

export const NoteEditor = ({ recipientName, note, noteFont, noteColor, onUpdate }: NoteEditorProps) => {
  return (
    <div className="space-y-4">
      {/* Recipient */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">To:</label>
        <input
          type="text"
          placeholder="Recipient's name"
          maxLength={40}
          value={recipientName}
          onChange={e => onUpdate({ recipientName: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 text-sm focus:outline-none focus:ring-2 focus:ring-primary/30"
        />
      </div>

      {/* Note */}
      <div>
        <label className="text-xs text-muted-foreground mb-1 block">Your message:</label>
        <textarea
          placeholder="Write something sweet..."
          maxLength={300}
          rows={4}
          value={note}
          onChange={e => onUpdate({ note: e.target.value })}
          className="w-full px-3 py-2 rounded-xl bg-secondary/50 border border-border/50 text-sm resize-none focus:outline-none focus:ring-2 focus:ring-primary/30"
          style={{ fontFamily: noteFont, color: noteColor }}
        />
        <p className="text-[10px] text-muted-foreground/50 text-right mt-1">{note.length}/300</p>
      </div>

      {/* Font */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">Font:</label>
        <div className="flex gap-2">
          {NOTE_FONTS.map(font => (
            <button
              key={font.id}
              onClick={() => onUpdate({ noteFont: font.family })}
              className={`flex-1 py-2 px-2 rounded-lg text-sm border-2 transition-colors ${
                noteFont === font.family
                  ? 'border-primary/40 bg-primary/5'
                  : 'border-transparent bg-secondary/30'
              }`}
              style={{ fontFamily: font.family }}
            >
              {font.name}
            </button>
          ))}
        </div>
      </div>

      {/* Color */}
      <div>
        <label className="text-xs text-muted-foreground mb-2 block">Ink color:</label>
        <div className="flex gap-2">
          {COLORS.map(c => (
            <button
              key={c.id}
              onClick={() => onUpdate({ noteColor: c.value })}
              className={`w-8 h-8 rounded-full border-2 transition-transform ${
                noteColor === c.value ? 'border-foreground/30 scale-110' : 'border-transparent'
              }`}
              style={{ background: c.value }}
            />
          ))}
        </div>
      </div>

      {/* Preview */}
      {(note || recipientName) && (
        <div className="glass-panel p-4 text-center">
          {recipientName && (
            <p className="text-xs text-muted-foreground mb-1">To {recipientName}</p>
          )}
          {note && (
            <p style={{ fontFamily: noteFont, color: noteColor, fontSize: noteFont.includes('Caveat') ? '1.1rem' : '0.875rem' }}>
              {note}
            </p>
          )}
        </div>
      )}
    </div>
  );
};

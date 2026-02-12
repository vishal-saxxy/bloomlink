export interface PlacedElement {
  id: string;
  type: 'flower' | 'sticker';
  dataId: string;
  x: number;
  y: number;
  scale: number;
  rotation: number;
  color: string;
  emoji: string;
  zIndex: number;
  opacity: number;
}

export interface BouquetConfig {
  elements: PlacedElement[];
  wrapId: string;
  recipientName: string;
  note: string;
  noteFont: string;
  noteColor: string;
}

export function encodeBouquet(config: BouquetConfig): string {
  const json = JSON.stringify(config);
  return btoa(encodeURIComponent(json));
}

export function decodeBouquet(encoded: string): BouquetConfig | null {
  try {
    const json = decodeURIComponent(atob(encoded));
    return JSON.parse(json);
  } catch {
    return null;
  }
}

export function createEmptyBouquet(): BouquetConfig {
  return {
    elements: [],
    wrapId: 'korean',
    recipientName: '',
    note: '',
    noteFont: 'Caveat, cursive',
    noteColor: '#8B4557',
  };
}

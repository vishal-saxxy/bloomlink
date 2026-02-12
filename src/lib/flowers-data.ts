export interface FlowerData {
  id: string;
  name: string;
  botanicalName: string;
  emoji: string;
  colors: string[];
  vibes: string[];
  defaultColor: string;
}

export interface StickerData {
  id: string;
  name: string;
  emoji: string;
  category: string;
}

export interface WrapStyle {
  id: string;
  name: string;
  color: string;
  opacity: number;
  style: 'korean' | 'minimal' | 'vintage' | 'luxury' | 'transparent';
}

export const FLOWERS: FlowerData[] = [
  { id: 'rose', name: 'Rose', botanicalName: 'Rosa', emoji: '🌹', colors: ['#FFB6C1', '#FF69B4', '#DC143C', '#FFF0F5', '#FF1493', '#FFDAB9'], vibes: ['romantic', 'elegant', 'bold'], defaultColor: '#FFB6C1' },
  { id: 'tulip', name: 'Tulip', botanicalName: 'Tulipa', emoji: '🌷', colors: ['#FF69B4', '#FF6347', '#FFD700', '#FFF8DC', '#DA70D6', '#FF4500'], vibes: ['soft', 'pastel', 'elegant'], defaultColor: '#FF69B4' },
  { id: 'lily', name: 'Lily', botanicalName: 'Lilium', emoji: '🪷', colors: ['#FFFFFF', '#FFF0F5', '#FFB6C1', '#FFDAB9', '#E6E6FA'], vibes: ['elegant', 'soft', 'romantic'], defaultColor: '#FFFFFF' },
  { id: 'sunflower', name: 'Sunflower', botanicalName: 'Helianthus annuus', emoji: '🌻', colors: ['#FFD700', '#FFA500', '#F0E68C', '#DAA520'], vibes: ['bold', 'cheerful'], defaultColor: '#FFD700' },
  { id: 'orchid', name: 'Orchid', botanicalName: 'Orchidaceae', emoji: '🪻', colors: ['#DA70D6', '#DDA0DD', '#EE82EE', '#BA55D3', '#FFB6C1'], vibes: ['elegant', 'exotic', 'romantic'], defaultColor: '#DA70D6' },
  { id: 'babysbreath', name: "Baby's Breath", botanicalName: 'Gypsophila', emoji: '🤍', colors: ['#FFFFFF', '#FFF0F5', '#F0F8FF'], vibes: ['soft', 'pastel', 'romantic'], defaultColor: '#FFFFFF' },
  { id: 'carnation', name: 'Carnation', botanicalName: 'Dianthus caryophyllus', emoji: '💮', colors: ['#FFB6C1', '#FF69B4', '#DC143C', '#FFFFFF', '#FF1493'], vibes: ['soft', 'romantic', 'bold'], defaultColor: '#FFB6C1' },
  { id: 'lavender', name: 'Lavender', botanicalName: 'Lavandula', emoji: '💜', colors: ['#E6E6FA', '#9370DB', '#8A2BE2', '#DDA0DD'], vibes: ['soft', 'pastel', 'elegant'], defaultColor: '#E6E6FA' },
  { id: 'daisy', name: 'Gerbera Daisy', botanicalName: 'Gerbera', emoji: '🌼', colors: ['#FF69B4', '#FF6347', '#FFD700', '#FF4500', '#FFA07A'], vibes: ['cheerful', 'bold', 'pastel'], defaultColor: '#FF69B4' },
  { id: 'cherry-blossom', name: 'Cherry Blossom', botanicalName: 'Prunus serrulata', emoji: '🌸', colors: ['#FFB7C5', '#FFC0CB', '#FFE4E1', '#FFF0F5'], vibes: ['soft', 'romantic', 'pastel'], defaultColor: '#FFB7C5' },
  { id: 'peony', name: 'Peony', botanicalName: 'Paeonia', emoji: '🩷', colors: ['#FFB6C1', '#FF69B4', '#FFC0CB', '#FFDAB9', '#FFFFFF'], vibes: ['romantic', 'elegant', 'soft'], defaultColor: '#FFB6C1' },
  { id: 'hydrangea', name: 'Hydrangea', botanicalName: 'Hydrangea', emoji: '💠', colors: ['#87CEEB', '#DDA0DD', '#FFB6C1', '#98FB98', '#E6E6FA'], vibes: ['soft', 'pastel', 'elegant'], defaultColor: '#DDA0DD' },
];

export const STICKERS: StickerData[] = [
  { id: 's-heart', name: 'Heart', emoji: '❤️', category: 'love' },
  { id: 's-sparkle-heart', name: 'Sparkle Heart', emoji: '💖', category: 'love' },
  { id: 's-growing-heart', name: 'Growing Heart', emoji: '💗', category: 'love' },
  { id: 's-two-hearts', name: 'Two Hearts', emoji: '💕', category: 'love' },
  { id: 's-star', name: 'Star', emoji: '⭐', category: 'sparkle' },
  { id: 's-sparkles', name: 'Sparkles', emoji: '✨', category: 'sparkle' },
  { id: 's-glowing-star', name: 'Glowing Star', emoji: '🌟', category: 'sparkle' },
  { id: 's-butterfly', name: 'Butterfly', emoji: '🦋', category: 'nature' },
  { id: 's-bee', name: 'Bee', emoji: '🐝', category: 'nature' },
  { id: 's-ribbon', name: 'Ribbon', emoji: '🎀', category: 'decor' },
  { id: 's-gift', name: 'Gift', emoji: '🎁', category: 'decor' },
  { id: 's-love-letter', name: 'Love Letter', emoji: '💌', category: 'love' },
  { id: 's-kiss', name: 'Kiss', emoji: '💋', category: 'love' },
  { id: 's-rainbow', name: 'Rainbow', emoji: '🌈', category: 'sparkle' },
  { id: 's-cloud', name: 'Cloud', emoji: '☁️', category: 'nature' },
  { id: 's-moon', name: 'Moon', emoji: '🌙', category: 'nature' },
  { id: 's-leaf', name: 'Leaf', emoji: '🍃', category: 'nature' },
  { id: 's-clover', name: 'Clover', emoji: '🍀', category: 'nature' },
  { id: 's-diamond', name: 'Diamond', emoji: '💎', category: 'sparkle' },
  { id: 's-crown', name: 'Crown', emoji: '👑', category: 'decor' },
];

export const WRAP_STYLES: WrapStyle[] = [
  { id: 'korean', name: 'Korean Wrap', color: '#FFD1DC', opacity: 0.7, style: 'korean' },
  { id: 'minimal', name: 'Minimal Wrap', color: '#FFF5EE', opacity: 0.9, style: 'minimal' },
  { id: 'vintage', name: 'Vintage Layered', color: '#FAEBD7', opacity: 0.8, style: 'vintage' },
  { id: 'luxury', name: 'Luxury Satin', color: '#F5E6CC', opacity: 0.85, style: 'luxury' },
  { id: 'transparent', name: 'Transparent', color: '#FFFFFF', opacity: 0.3, style: 'transparent' },
];

export const NOTE_FONTS = [
  { id: 'caveat', name: 'Handwritten', family: 'Caveat, cursive' },
  { id: 'quicksand', name: 'Clean', family: 'Quicksand, sans-serif' },
  { id: 'playfair', name: 'Elegant', family: 'Playfair Display, serif' },
];

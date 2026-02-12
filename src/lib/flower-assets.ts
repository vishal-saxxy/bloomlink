// Flower images
import rose from '@/assets/flowers/rose.png';
import tulip from '@/assets/flowers/tulip.png';
import lily from '@/assets/flowers/lily.png';
import sunflower from '@/assets/flowers/sunflower.png';
import orchid from '@/assets/flowers/orchid.png';
import babysbreath from '@/assets/flowers/babysbreath.png';
import carnation from '@/assets/flowers/carnation.png';
import lavender from '@/assets/flowers/lavender.png';
import daisy from '@/assets/flowers/daisy.png';
import cherryBlossom from '@/assets/flowers/cherry-blossom.png';
import peony from '@/assets/flowers/peony.png';
import hydrangea from '@/assets/flowers/hydrangea.png';

// Sticker images
import heart from '@/assets/stickers/heart.png';
import sparkle from '@/assets/stickers/sparkle.png';
import ribbon from '@/assets/stickers/ribbon.png';
import loveLetter from '@/assets/stickers/love-letter.png';
import diamond from '@/assets/stickers/diamond.png';

export const FLOWER_IMAGES: Record<string, string> = {
  rose,
  tulip,
  lily,
  sunflower,
  orchid,
  babysbreath,
  carnation,
  lavender,
  daisy,
  'cherry-blossom': cherryBlossom,
  peony,
  hydrangea,
};

export const STICKER_IMAGES: Record<string, string> = {
  's-heart': heart,
  's-sparkle-heart': heart,
  's-growing-heart': heart,
  's-two-hearts': heart,
  's-star': sparkle,
  's-sparkles': sparkle,
  's-glowing-star': sparkle,
  's-butterfly': sparkle, // fallback
  's-bee': sparkle, // fallback
  's-ribbon': ribbon,
  's-gift': ribbon, // fallback
  's-love-letter': loveLetter,
  's-kiss': heart, // fallback
  's-rainbow': sparkle, // fallback
  's-cloud': sparkle, // fallback
  's-moon': sparkle, // fallback
  's-leaf': sparkle, // fallback
  's-clover': sparkle, // fallback
  's-diamond': diamond,
  's-crown': diamond, // fallback
};

export function getFlowerImage(dataId: string): string | undefined {
  return FLOWER_IMAGES[dataId];
}

export function getStickerImage(dataId: string): string | undefined {
  return STICKER_IMAGES[dataId];
}

export function getElementImage(type: 'flower' | 'sticker', dataId: string): string | undefined {
  return type === 'flower' ? getFlowerImage(dataId) : getStickerImage(dataId);
}

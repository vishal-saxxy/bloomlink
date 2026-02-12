import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { decodeBouquet } from "@/lib/bouquet-store";
import { WRAP_STYLES } from "@/lib/flowers-data";
import { getElementImage } from "@/lib/flower-assets";
import { getStickerSVG } from "@/lib/sticker-svgs";
import { getFlowerSVG } from "@/lib/flower-svgs";
import { BouquetWrap } from "@/components/bouquet/BouquetWrap";
import Footer from "@/components/Footer";

const ConfettiPiece = ({ delay, color }: { delay: number; color: string }) => (
  <motion.div
    className="absolute w-2 h-2 rounded-full pointer-events-none"
    style={{
      background: color,
      left: `${Math.random() * 100}%`,
      top: -10,
    }}
    animate={{
      y: ["0vh", "100vh"],
      x: [0, (Math.random() - 0.5) * 200],
      rotate: [0, 720],
      opacity: [1, 1, 0],
    }}
    transition={{
      duration: 3 + Math.random() * 2,
      delay,
      ease: "easeIn",
    }}
  />
);

const TypewriterText = ({ text, style, delay }: { text: string; style: React.CSSProperties; delay: number }) => {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      let i = 0;
      const interval = setInterval(() => {
        setDisplayed(text.slice(0, i + 1));
        i++;
        if (i >= text.length) clearInterval(interval);
      }, 40);
      return () => clearInterval(interval);
    }, delay * 1000);
    return () => clearTimeout(timer);
  }, [text, delay]);

  return <p style={style}>{displayed}<span className="animate-pulse">|</span></p>;
};

const ViewBouquet = () => {
  const { encoded } = useParams<{ encoded: string }>();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);
  const [revealed, setRevealed] = useState(false);

  const bouquet = useMemo(() => {
    if (!encoded) return null;
    return decodeBouquet(encoded);
  }, [encoded]);

  useEffect(() => {
    const t1 = setTimeout(() => setRevealed(true), 600);
    const t2 = setTimeout(() => setShowConfetti(false), 5000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const handleReplay = () => {
    setRevealed(false);
    setShowConfetti(true);
    setTimeout(() => setRevealed(true), 600);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  if (!bouquet) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <p className="text-4xl mb-4">🥀</p>
          <p className="text-muted-foreground">This bouquet doesn't exist</p>
          <button onClick={() => navigate("/")} className="mt-4 glow-button text-sm px-4 py-2">
            Create Your Own
          </button>
        </div>
      </div>
    );
  }

  const wrap = WRAP_STYLES.find(w => w.id === bouquet.wrapId) || WRAP_STYLES[0];
  const confettiColors = ['#FFB6C1', '#FF69B4', '#FFD700', '#DDA0DD', '#87CEEB', '#FFA07A'];

  // Animation timing: wrap → flowers → stickers → note
  const flowerElements = bouquet.elements.filter(e => e.type === 'flower');
  const stickerElements = bouquet.elements.filter(e => e.type === 'sticker');
  const flowersDone = 0.8 + flowerElements.length * 0.1;
  const stickersDone = flowersDone + stickerElements.length * 0.08;
  const noteDelay = stickersDone + 0.5;

  return (
    <div className="min-h-screen bg-background sparkle-bg overflow-hidden relative flex flex-col items-center justify-center px-4 py-8">
      {/* Confetti */}
      {showConfetti && [...Array(30)].map((_, i) => (
        <ConfettiPiece key={i} delay={i * 0.1} color={confettiColors[i % confettiColors.length]} />
      ))}

      {/* Ambient glow */}
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center">
        <div
          className="w-[500px] h-[500px] rounded-full blur-3xl opacity-20"
          style={{ background: `radial-gradient(circle, ${wrap.color}, transparent)` }}
        />
      </div>

      {/* Recipient name */}
      <AnimatePresence>
        {bouquet.recipientName && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-center mb-6 relative z-10"
          >
            <p className="text-sm text-muted-foreground mb-1">A bouquet for</p>
            <h1 className="text-3xl md:text-4xl font-display text-gradient-pink">
              {bouquet.recipientName}
            </h1>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bouquet display */}
      <motion.div
        initial={{ scale: 0.7, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 80, damping: 15 }}
        className="relative w-80 h-96 md:w-[420px] md:h-[500px] mx-auto z-10 flex items-center justify-center"
      >
        {/* Wrap paper back layer - animated entrance */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <BouquetWrap wrap={wrap} width={420} height={500} layer="back" />
        </motion.div>

        {/* Elements with proper layering and animation */}
        <div className="absolute inset-0" style={{ zIndex: 2 }}>
          {bouquet.elements.map((el, i) => {
            const flowerSVG = el.type === 'flower' ? getFlowerSVG(el.dataId, el.color) : null;
            const stickerSVG = el.type === 'sticker' ? getStickerSVG(el.dataId) : null;
            const fallbackImage = getElementImage(el.type, el.dataId);
            const size = el.scale * (el.type === 'flower' ? 80 : 56);

            const isFlower = el.type === 'flower';
            const flowerIdx = isFlower ? flowerElements.findIndex(e => e.id === el.id) : 0;
            const stickerIdx = !isFlower ? stickerElements.findIndex(e => e.id === el.id) : 0;
            const delay = isFlower
              ? 0.5 + flowerIdx * 0.1
              : flowersDone + 0.2 + stickerIdx * 0.08;

            return (
              <motion.div
                key={el.id}
                className="absolute select-none"
                initial={{ y: 60, scale: 0, opacity: 0 }}
                animate={revealed ? { y: 0, scale: 1, opacity: el.opacity } : {}}
                transition={{
                  delay,
                  type: "spring",
                  stiffness: 180,
                  damping: 14,
                }}
                style={{
                  left: el.x - size / 2,
                  top: el.y - size / 2,
                  width: size,
                  height: size,
                  zIndex: el.zIndex + 10,
                  transform: `rotate(${el.rotation}deg)`,
                  filter: isFlower
                    ? 'drop-shadow(0 5px 10px rgba(0,0,0,0.15))'
                    : 'drop-shadow(0 2px 5px rgba(0,0,0,0.1))',
                  background: 'transparent',
                }}
              >
                {flowerSVG ? (
                  <div className="w-full h-full flex items-center justify-center pointer-events-none">
                    {flowerSVG}
                  </div>
                ) : stickerSVG ? (
                  <div className="w-full h-full flex items-center justify-center pointer-events-none">
                    {stickerSVG}
                  </div>
                ) : fallbackImage ? (
                  <img
                    src={fallbackImage}
                    alt={el.dataId}
                    className="w-full h-full object-contain pointer-events-none"
                    draggable={false}
                  />
                ) : (
                  <span style={{ fontSize: `${el.scale * 2}rem` }} className="select-none">{el.emoji}</span>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Front wrap overlay - covers stems */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="absolute inset-0 flex items-center justify-center"
          style={{ zIndex: 5 }}
        >
          <BouquetWrap wrap={wrap} width={420} height={500} layer="front" />
        </motion.div>
      </motion.div>

      {/* Note with typewriter */}
      {bouquet.note && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: noteDelay }}
          className="mt-8 glass-panel px-6 py-4 max-w-sm text-center relative z-10"
        >
          <TypewriterText
            text={bouquet.note}
            delay={noteDelay + 0.3}
            style={{
              fontFamily: bouquet.noteFont,
              color: bouquet.noteColor,
              fontSize: bouquet.noteFont.includes('Caveat') ? '1.25rem' : '1rem',
            }}
          />
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: noteDelay + 1 }}
        className="mt-8 flex gap-3 flex-wrap justify-center relative z-10"
      >
        <button
          onClick={handleReplay}
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          🔄 Replay
        </button>
        <button
          onClick={() => navigator.clipboard.writeText(window.location.href)}
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          📋 Copy Link
        </button>
        <button
          onClick={() => navigate("/")}
          className="glow-button text-sm px-4 py-2"
        >
          🌷 Create Your Own
        </button>
      </motion.div>

      <Footer />
    </div>
  );
};

export default ViewBouquet;

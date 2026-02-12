import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { decodeBouquet, BouquetConfig } from "@/lib/bouquet-store";
import { WRAP_STYLES } from "@/lib/flowers-data";

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
      delay: delay,
      ease: "easeIn",
    }}
  />
);

const ViewBouquet = () => {
  const { encoded } = useParams<{ encoded: string }>();
  const navigate = useNavigate();
  const [phase, setPhase] = useState<'reveal' | 'shown'>('reveal');
  const [showConfetti, setShowConfetti] = useState(true);

  const bouquet = useMemo(() => {
    if (!encoded) return null;
    return decodeBouquet(encoded);
  }, [encoded]);

  useEffect(() => {
    const timer = setTimeout(() => setPhase('shown'), 800);
    const confettiTimer = setTimeout(() => setShowConfetti(false), 5000);
    return () => { clearTimeout(timer); clearTimeout(confettiTimer); };
  }, []);

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

  return (
    <div className="min-h-screen bg-background sparkle-bg overflow-hidden relative flex flex-col items-center justify-center px-4">
      {/* Confetti */}
      {showConfetti && [...Array(30)].map((_, i) => (
        <ConfettiPiece
          key={i}
          delay={i * 0.1}
          color={confettiColors[i % confettiColors.length]}
        />
      ))}

      {/* Recipient name */}
      <AnimatePresence>
        {bouquet.recipientName && (
          <motion.p
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-sm text-muted-foreground mb-2"
          >
            A bouquet for
          </motion.p>
        )}
      </AnimatePresence>

      {bouquet.recipientName && (
        <motion.h1
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.5, type: "spring" }}
          className="text-3xl md:text-4xl font-display text-gradient-pink mb-8"
        >
          {bouquet.recipientName}
        </motion.h1>
      )}

      {/* Bouquet display */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 100, damping: 15 }}
        className="relative w-80 h-80 md:w-[400px] md:h-[400px] mx-auto"
      >
        {/* Wrap background */}
        <div
          className="absolute inset-0 rounded-3xl"
          style={{
            background: `radial-gradient(ellipse at center, ${wrap.color}${Math.round(wrap.opacity * 255).toString(16).padStart(2, '0')}, transparent 70%)`,
          }}
        />

        {/* Elements */}
        {bouquet.elements.map((el, i) => (
          <motion.div
            key={el.id}
            initial={{ scale: 0, opacity: 0, rotate: -20 }}
            animate={{ scale: 1, opacity: el.opacity, rotate: el.rotation }}
            transition={{
              delay: 0.5 + i * 0.15,
              type: "spring",
              stiffness: 200,
              damping: 12,
            }}
            className="absolute select-none"
            style={{
              left: el.x,
              top: el.y,
              fontSize: `${el.scale * 2}rem`,
              zIndex: el.zIndex,
              transform: `rotate(${el.rotation}deg)`,
              filter: el.type === 'flower' ? `drop-shadow(0 2px 4px rgba(0,0,0,0.1))` : undefined,
            }}
          >
            {el.emoji}
          </motion.div>
        ))}
      </motion.div>

      {/* Note */}
      {bouquet.note && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 + bouquet.elements.length * 0.15 }}
          className="mt-8 glass-panel px-6 py-4 max-w-sm text-center"
        >
          <p
            style={{
              fontFamily: bouquet.noteFont,
              color: bouquet.noteColor,
              fontSize: bouquet.noteFont.includes('Caveat') ? '1.25rem' : '1rem',
            }}
          >
            {bouquet.note}
          </p>
        </motion.div>
      )}

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="mt-8 flex gap-3 flex-wrap justify-center"
      >
        <button
          onClick={() => { setPhase('reveal'); setShowConfetti(true); setTimeout(() => setPhase('shown'), 800); setTimeout(() => setShowConfetti(false), 5000); }}
          className="px-4 py-2 rounded-full bg-secondary text-secondary-foreground text-sm font-medium hover:bg-secondary/80 transition-colors"
        >
          🔄 Replay
        </button>
        <button
          onClick={() => { navigator.clipboard.writeText(window.location.href); }}
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

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5 }}
        className="mt-6 text-xs text-muted-foreground/40"
      >
        Made with bloomlink 💕
      </motion.p>
    </div>
  );
};

export default ViewBouquet;

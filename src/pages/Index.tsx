import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import heroBouquet from "@/assets/hero-bouquet.jpg";

const FloatingPetal = ({ delay, left, size }: { delay: number; left: string; size: number }) => (
  <motion.div
    className="absolute text-primary pointer-events-none select-none"
    style={{ left, top: -20, fontSize: size }}
    animate={{
      y: ["0vh", "100vh"],
      rotate: [0, 720],
      opacity: [0, 1, 1, 0],
    }}
    transition={{
      duration: 6 + Math.random() * 4,
      delay,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    🌸
  </motion.div>
);

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background sparkle-bg overflow-hidden relative">
      {/* Floating petals */}
      {[...Array(8)].map((_, i) => (
        <FloatingPetal
          key={i}
          delay={i * 0.8}
          left={`${10 + i * 11}%`}
          size={16 + Math.random() * 12}
        />
      ))}

      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4">
        {/* Hero Image */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="w-64 h-64 md:w-80 md:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-2xl">
            <img
              src={heroBouquet}
              alt="Beautiful flower bouquet"
              className="w-full h-full object-cover"
            />
          </div>
          <motion.div
            className="absolute -top-2 -right-2 text-3xl"
            animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            ✨
          </motion.div>
          <motion.div
            className="absolute -bottom-1 -left-3 text-2xl"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
          >
            🌸
          </motion.div>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="text-4xl md:text-6xl font-display text-center mb-4"
        >
          <span className="text-gradient-pink">bloomlink</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-muted-foreground text-center mb-2 max-w-md"
        >
          Build a bouquet that never dies.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.8 }}
          className="text-sm text-muted-foreground/70 text-center mb-10 max-w-sm"
        >
          Create, customize, and share a digital bouquet with someone you love 💕
        </motion.p>

        {/* CTA */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          onClick={() => navigate("/builder")}
          className="glow-button text-lg"
        >
          🌷 Start Creating
        </motion.button>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-6 text-xs text-muted-foreground/50"
        >
          No sign up needed · 100% free · Share instantly
        </motion.p>
      </div>
    </div>
  );
};

export default Index;

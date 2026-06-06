import { useEffect, useState } from 'react';
import { motion } from 'motion/react';

export default function LoadingScreen({ onLoadingComplete }: { onLoadingComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onLoadingComplete, 800);
          return 100;
        }
        return prev + 2;
      });
    }, 30);

    return () => clearInterval(timer);
  }, [onLoadingComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
      initial={{ opacity: 1 }}
      animate={{ opacity: progress >= 100 ? 0 : 1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
    >
      {/* Shutter Blades */}
      <div className="relative w-64 h-64">
        {[...Array(8)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0 origin-center"
            style={{
              transform: `rotate(${i * 45}deg)`,
            }}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: progress >= 100 ? 0 : 1 }}
            transition={{ duration: 0.6, delay: 0.05 * i, ease: 'easeInOut' }}
          >
            <div
              className="absolute w-full h-full bg-gradient-to-b from-white/90 to-white/60"
              style={{
                clipPath: 'polygon(45% 0%, 55% 0%, 52% 100%, 48% 100%)',
              }}
            />
          </motion.div>
        ))}

        {/* Center Circle */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center"
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <div className="relative w-24 h-24 rounded-full bg-black border-4 border-white/20 flex items-center justify-center">
            <motion.div
              className="w-16 h-16 rounded-full border-2 border-white/30"
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
            />
          </div>
        </motion.div>
      </div>

      {/* Loading Text */}
      <motion.div
        className="absolute bottom-20 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <p className="text-white/60 text-sm tracking-[0.3em] uppercase mb-2">Loading</p>
        <div className="w-48 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-white/40"
            style={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}

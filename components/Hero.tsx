'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { useState, useEffect, useMemo } from 'react';

interface HeroProps {
  onJoinWaitlist: () => void;
}

export function Hero({ onJoinWaitlist }: HeroProps) {
  const [mounted, setMounted] = useState(false);

  // Generate particle positions once on mount to avoid hydration mismatch
  const particles = useMemo(() => {
    return [...Array(20)].map(() => ({
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    }));
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative py-24 md:py-32 px-4 overflow-hidden">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 -z-10">
        <motion.div
          className="absolute top-0 left-1/4 w-96 h-96 bg-primary rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{
            x: [0, 50, 0],
            y: [0, 30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-0 right-1/4 w-96 h-96 bg-secondary rounded-full mix-blend-screen filter blur-3xl opacity-30"
          animate={{
            x: [0, -50, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-light rounded-full mix-blend-screen filter blur-3xl opacity-20"
          animate={{
            rotate: [0, 360],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      </div>

      {/* Floating particles - only render after mount to avoid hydration mismatch */}
      {mounted && particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute w-1 h-1 bg-primary-light rounded-full opacity-40"
          style={{
            left: `${particle.left}%`,
            top: `${particle.top}%`,
          }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.2, 0.6, 0.2],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}

      <div className="container max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <span className="text-gradient">
            Platformless AI
          </span>
        </motion.h1>

        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-foreground"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
        >
          AI Without the Platform
        </motion.h2>

        <motion.p
          className="text-lg sm:text-xl text-neutrals-copy-light max-w-2xl mx-auto flex items-center justify-center gap-2 flex-wrap"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <span>Trustless</span>
          <span className="text-primary">•</span>
          <span>Private</span>
          <span className="text-secondary">•</span>
          <span>Censorship-Resistant</span>
        </motion.p>

        <motion.div
          className="pt-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="lg"
            onClick={onJoinWaitlist}
            className="bg-gradient-animated text-white font-semibold text-lg px-8 py-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 border-0"
          >
            Join Waitlist
          </Button>
        </motion.div>
      </div>
    </section>
  );
}

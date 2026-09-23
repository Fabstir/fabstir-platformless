'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { NetworkCanvas } from '@/components/NetworkCanvas';
import { CountUp } from '@/components/CountUp';

interface HeroProps {
  onJoinWaitlist: () => void;
}

const stats = [
  { value: 13, suffix: '', label: 'AI video generation modes' },
  { value: 90, suffix: '%', label: 'of every payment goes to the host' },
  { value: 2, suffix: '', label: 'drop-in APIs: Anthropic and OpenAI compatible' },
  { value: 0, suffix: '', label: 'platforms in the middle' },
];

export function Hero({ onJoinWaitlist }: HeroProps) {
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

      {/* Peer-to-peer mesh: hosts, clients and encrypted packets */}
      <NetworkCanvas className="opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_75%)]" />

      <div className="container max-w-5xl mx-auto text-center space-y-8 relative z-10">
        <motion.a
          href="#video"
          className="inline-flex items-center gap-2 rounded-full border border-secondary/40 bg-background/60 px-4 py-1.5 text-sm text-neutrals-copy-light backdrop-blur hover:border-secondary transition-colors"
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs font-semibold text-white">New</span>
          AI video generation, now inside Blender
          <ArrowRight className="h-4 w-4 text-secondary-light" />
        </motion.a>

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

        <motion.p
          className="text-base sm:text-lg text-neutrals-copy max-w-3xl mx-auto leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          Chat, coding agents, image and video generation, streaming and fine-tuning on a
          peer-to-peer marketplace of independent GPU hosts. Encrypted end to end, settled
          by smart contracts, with no company in between.
        </motion.p>

        <motion.div
          className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.6, ease: "easeOut" }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              onClick={onJoinWaitlist}
              className="bg-gradient-animated text-white font-semibold text-lg px-8 py-6 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/50 border-0"
            >
              Join Waitlist
            </Button>
          </motion.div>
          <motion.a
            href="#showreel"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-3 rounded-md border border-primary-light/40 bg-background/40 px-6 py-3 text-lg font-semibold text-foreground backdrop-blur transition-colors hover:border-secondary hover:bg-secondary/10"
          >
            <Play className="h-5 w-5 fill-secondary text-secondary" />
            Watch the film
          </motion.a>
        </motion.div>

        <motion.dl
          className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-10 max-w-4xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col rounded-xl border border-neutrals-border/50 bg-background/50 px-4 py-5 backdrop-blur"
            >
              <dt className="order-last mt-1 text-xs sm:text-sm text-neutrals-copy leading-snug">
                {stat.label}
              </dt>
              <dd className="text-4xl font-extrabold text-foreground">
                <CountUp to={stat.value} suffix={stat.suffix} />
              </dd>
            </div>
          ))}
        </motion.dl>
      </div>
    </section>
  );
}

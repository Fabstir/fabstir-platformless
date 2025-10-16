'use client';

import { Card } from '@/components/ui/card';
import { X, Check } from 'lucide-react';
import { motion } from 'framer-motion';
import { useInView } from 'framer-motion';
import { useRef } from 'react';

export function ValueProposition() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const traditionalItems = [
    'Trust the company with your data',
    'Accept their terms and censorship rules',
    'Pay their markup prices',
    'Risk deplatforming',
  ];

  const platformlessItems = [
    'End-to-end encryption (your data, your keys)',
    'Smart contract payments (trustless settlement)',
    'P2P model access (no platform gatekeepers)',
    'Open source (verify everything)',
  ];

  return (
    <section ref={ref} className="py-16 px-4 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="absolute top-1/4 right-0 w-72 h-72 bg-primary rounded-full filter blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 left-0 w-72 h-72 bg-secondary rounded-full filter blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container max-w-7xl mx-auto space-y-12">
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-primary-light via-secondary to-primary bg-clip-text text-transparent">
            What is Platformless AI?
          </h2>
          <p className="text-lg text-neutrals-copy-light max-w-4xl mx-auto">
            Platformless AI is a decentralized peer-to-peer network for accessing AI models
            without trusting a centralized company. Unlike traditional AI services,
            there&apos;s no platform that can censor your prompts, access your data, or deplatform you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Traditional AI Platforms */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-2 border-error/40 hover:border-error/60 hover:shadow-2xl hover:shadow-error/20 transition-all duration-300 bg-card/80 backdrop-blur-xl h-full">
              <h3 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-error">✗</span> Traditional AI Platforms
              </h3>
              <ul className="space-y-4">
                {traditionalItems.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: -20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <X className="h-5 w-5 text-error shrink-0 mt-0.5 group-hover:scale-125 group-hover:rotate-90 transition-all" />
                    <span className="text-neutrals-copy-light group-hover:text-foreground transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>

          {/* Platformless AI */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="p-8 border-2 border-success/40 hover:border-success/60 hover:shadow-2xl hover:shadow-success/20 transition-all duration-300 bg-card/80 backdrop-blur-xl h-full relative overflow-hidden">
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-success/5 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />

              <h3 className="text-2xl font-bold text-foreground mb-6 text-center flex items-center justify-center gap-2">
                <span className="text-success">✓</span> Platformless AI
              </h3>
              <ul className="space-y-4">
                {platformlessItems.map((item, index) => (
                  <motion.li
                    key={index}
                    className="flex items-start gap-3 group"
                    initial={{ opacity: 0, x: 20 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                  >
                    <Check className="h-5 w-5 text-success shrink-0 mt-0.5 group-hover:scale-125 transition-all" />
                    <span className="text-neutrals-copy-light group-hover:text-foreground transition-colors">{item}</span>
                  </motion.li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>

        <motion.p
          className="text-center text-sm text-neutrals-copy"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          Built by <span className="text-primary-light font-semibold">Fabstir</span>, powered by <span className="text-secondary font-semibold">Base/opBNB</span>, secured by <span className="text-primary font-semibold">STARK proofs</span>.
        </motion.p>
      </div>
    </section>
  );
}

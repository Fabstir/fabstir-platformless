'use client';

import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import { CheckCircle2, CircleDashed, Loader2, Map as MapIcon } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

type Status = 'done' | 'active' | 'planned';

const milestones: { phase: string; title: string; status: Status; items: string }[] = [
  {
    phase: 'Phase 1',
    title: 'Foundation',
    status: 'done',
    items: 'Upgradeable smart contracts, the SDK, the Rust host node and the session lifecycle on Base.',
  },
  {
    phase: 'Phase 2',
    title: 'Security',
    status: 'done',
    items: 'End-to-end encryption by default: ECDH key exchange, XChaCha20-Poly1305, forward secrecy.',
  },
  {
    phase: 'Phase 3',
    title: 'Storage',
    status: 'done',
    items: 'Encrypted conversations and proof data on S5 and Sia, owned by your wallet.',
  },
  {
    phase: 'Phase 4',
    title: 'Advanced features',
    status: 'done',
    items: 'RAG, web search, vision, FLUX.2 images, STARK proofs, NVENC transcoding, HLS streaming, and 13-mode LTX 2.3 video inside Blender.',
  },
  {
    phase: 'Phase 5',
    title: 'Agentic AI',
    status: 'done',
    items: 'Claude Bridge and OpenAI Bridge, validated with Claude Code and OpenCode on decentralised hosts.',
  },
  {
    phase: 'Phase 6',
    title: 'Multi-agent orchestration',
    status: 'done',
    items: 'Task graphs, model routing, A2A and x402, released as experimental.',
  },
  {
    phase: 'Security workstream',
    title: 'Confidential computing',
    status: 'active',
    items: 'Real Intel TDX attestation is live. Next: attestation from confidential-computing NVIDIA GPUs.',
  },
  {
    phase: 'Training M0',
    title: 'Private fine-tuning',
    status: 'active',
    items: 'Demonstrated end to end on real GPUs and served across hosts. Next: paid settlement gates on testnet, then confidential training.',
  },
  {
    phase: 'Mainnet prerequisite',
    title: 'Weight binding for video hosts',
    status: 'planned',
    items: 'Hash every weight file a video template loads and register the root on-chain, so third-party hosts can join.',
  },
  {
    phase: 'Phase 7',
    title: 'Economic refinement',
    status: 'planned',
    items: 'Live uptime and latency metrics, on-chain reputation, and dynamic pricing.',
  },
  {
    phase: 'Phase 8',
    title: 'Decentralisation',
    status: 'planned',
    items: 'Multi-sig, then a FAB-weighted DAO for upgrades, model approval and disputes.',
  },
  {
    phase: 'Phase 9',
    title: 'Scaling',
    status: 'planned',
    items: 'More L2s, cross-chain sessions, proof batching and an agent marketplace.',
  },
];

const statusMeta: Record<Status, { label: string; icon: typeof CheckCircle2; dot: string; text: string }> = {
  done: { label: 'Complete', icon: CheckCircle2, dot: 'border-success bg-success/20 text-success', text: 'text-success' },
  active: { label: 'In progress', icon: Loader2, dot: 'border-warning bg-warning/20 text-warning', text: 'text-warning' },
  planned: { label: 'Planned', icon: CircleDashed, dot: 'border-neutrals-border bg-muted text-neutrals-copy', text: 'text-neutrals-copy' },
};

export function Roadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 75%', 'end 60%'] });
  const lineProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <section id="roadmap" className="py-20 px-4">
      <div className="container max-w-6xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <MapIcon className="h-3.5 w-3.5" /> Roadmap
            </>
          }
          title="Built in public, shipped in phases"
          description="Six of nine phases are complete. Confidential computing and private fine-tuning are in progress, and each one states exactly what is left."
        />

        <div ref={ref} className="relative md:pb-24">
          {/* Track and scroll-driven fill */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-neutrals-border/40 md:left-1/2 md:-translate-x-1/2" />
          <motion.div
            className="absolute left-4 top-0 bottom-0 w-0.5 origin-top bg-gradient-to-b from-success via-warning to-primary md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: lineProgress }}
          />

          <ol className="relative md:grid md:grid-cols-2 md:gap-x-16 md:gap-y-6">
            {milestones.map((m, i) => {
              const meta = statusMeta[m.status];
              const left = i % 2 === 0;
              return (
                <li
                  key={m.title}
                  className={cn('relative mb-6 pl-12 md:mb-0 md:pl-0', !left && 'md:translate-y-1/2')}
                >
                  {/* Dot sits on the centre track: the middle of the column gap */}
                  <span
                    className={cn(
                      'absolute left-4 top-4 flex h-8 w-8 -translate-x-1/2 items-center justify-center rounded-full border-2',
                      left ? 'md:left-[calc(100%+2rem)]' : 'md:left-[-2rem]',
                      meta.dot
                    )}
                  >
                    <meta.icon className={cn('h-4 w-4', m.status === 'active' && 'animate-spin [animation-duration:3s]')} />
                  </span>
                  <motion.div
                    className={cn(
                      'rounded-xl border bg-card/70 p-5 backdrop-blur',
                      m.status === 'active' ? 'border-warning/40' : m.status === 'done' ? 'border-success/25' : 'border-neutrals-border/40',
                      left && 'md:text-right'
                    )}
                    initial={{ opacity: 0, x: left ? -30 : 30 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: '-60px' }}
                    transition={{ duration: 0.5 }}
                  >
                    <p className={cn('text-xs font-semibold uppercase tracking-wider', meta.text)}>
                      {m.phase} · {meta.label}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-foreground">{m.title}</h3>
                    <p className="mt-1 text-sm text-neutrals-copy leading-relaxed">{m.items}</p>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

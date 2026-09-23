'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import { Cpu, GitBranch, HardDrive, Lock, LockOpen, Scale, Tv, Unlock } from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { cn } from '@/lib/utils';

const SEGMENTS = 12;
const PREVIEW_SEGMENTS = 3;
const renditions = ['1080p', '720p', '480p'];

const facts: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: Cpu,
    title: 'Two revenue streams, one GPU',
    body: 'NVENC is dedicated encoder silicon, separate from the CUDA cores, so a host can transcode video and serve AI inference at the same time without either slowing down.',
  },
  {
    icon: Tv,
    title: 'H.264, HEVC and AV1',
    body: 'Several resolutions from one job, as a whole file or as HLS fMP4 segments with client-side M3U8 playlists for adaptive bitrate playback.',
  },
  {
    icon: Scale,
    title: 'Load balanced across hosts',
    body: 'Jobs overflow to the next-ranked host when one fills up. In a stress test, 7 concurrent jobs across 2 GPU hosts completed 100%.',
  },
  {
    icon: GitBranch,
    title: 'Verified per group of pictures',
    body: 'Every GOP is hashed with PSNR and SSIM quality metrics. The Merkle root goes on-chain and the full proof tree on S5, for anyone to spot-check.',
  },
  {
    icon: HardDrive,
    title: 'Never written to disk',
    body: 'The source is decrypted only in memory, transcoded on the GPU, and encrypted again before upload. No central server sees the video.',
  },
];

/** An HLS rendition ladder: free preview segments play openly, paid ones unlock as the playhead reaches them. */
function SegmentStrip() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [playhead, setPlayhead] = useState(0);

  useEffect(() => {
    if (reduceMotion) {
      setPlayhead(SEGMENTS);
      return;
    }
    if (!isInView) return;
    const timer = setInterval(() => setPlayhead((p) => (p >= SEGMENTS + 2 ? 0 : p + 1)), 650);
    return () => clearInterval(timer);
  }, [isInView, reduceMotion]);

  // Adaptive bitrate: the player steps down a rendition part-way through, then recovers.
  const rendition = playhead >= 6 && playhead < 9 ? 1 : playhead === 9 ? 2 : 0;
  const paid = playhead > PREVIEW_SEGMENTS;

  return (
    <div ref={ref} className="rounded-2xl border border-neutrals-border/60 bg-background/60 p-5 sm:p-6 backdrop-blur">
      <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-foreground">HLS with per-segment encryption</p>
        <span
          className={cn(
            'flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold transition-colors',
            paid ? 'bg-success/15 text-success' : 'bg-primary/20 text-primary-light'
          )}
        >
          {paid ? <Unlock className="h-3.5 w-3.5" /> : <LockOpen className="h-3.5 w-3.5" />}
          {paid ? 'Paid in USDC: segments decrypting' : 'Free preview playing'}
        </span>
      </div>

      <div className="space-y-2">
        {renditions.map((name, row) => (
          <div key={name} className="grid grid-cols-[44px_1fr] items-center gap-2 sm:gap-3">
            <span className={cn('text-xs tabular-nums transition-colors', row === rendition ? 'text-foreground font-semibold' : 'text-neutrals-copy')}>
              {name}
            </span>
            <div className="grid gap-1" style={{ gridTemplateColumns: `repeat(${SEGMENTS}, minmax(0, 1fr))` }}>
              {Array.from({ length: SEGMENTS }, (_, i) => {
                const preview = i < PREVIEW_SEGMENTS;
                const played = i < playhead;
                const current = i === playhead - 1 && row === rendition;
                return (
                  <div
                    key={i}
                    className={cn(
                      'relative flex h-8 sm:h-10 items-center justify-center rounded-[4px] border transition-all duration-300',
                      preview
                        ? 'border-primary/40 bg-primary/15'
                        : played
                          ? 'border-success/40 bg-success/10'
                          : 'border-neutrals-border/50 bg-muted/60',
                      row !== rendition && 'opacity-40',
                      current && 'ring-2 ring-secondary scale-110 z-10'
                    )}
                  >
                    {!preview &&
                      (played ? (
                        <Unlock className="h-3 w-3 text-success" />
                      ) : (
                        <Lock className="h-3 w-3 text-neutrals-copy" />
                      ))}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-xs text-neutrals-copy">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-[3px] border border-primary/40 bg-primary/15" /> Preview: public segments
        </span>
        <span className="flex items-center gap-2">
          <Lock className="h-3 w-3" /> Paid: XChaCha20-Poly1305, key in the CID
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-[3px] ring-2 ring-secondary" /> Playhead, switching rendition
        </span>
      </div>
    </div>
  );
}

export function Streaming() {
  return (
    <section id="streaming" className="py-20 px-4">
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow={
            <>
              <Tv className="h-3.5 w-3.5" /> Video infrastructure
            </>
          }
          title="Transcode and stream, encrypted end to end"
          description="Upload encrypted, transcode on independent GPUs, and stream with adaptive bitrate. Viewers get a free preview while paid segments stay locked until they pay. It is the base for white-label film and music platforms, including our first customer, Fabstir v2."
        />

        <div className="space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <SegmentStrip />
          </motion.div>

          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
            {facts.map((fact, i) => (
              <motion.li
                key={fact.title}
                className="rounded-xl border border-neutrals-border/40 bg-background/40 p-5"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <fact.icon className="mb-3 h-5 w-5 text-secondary" />
                <div>
                  <h3 className="font-semibold text-primary-content">{fact.title}</h3>
                  <p className="mt-1 text-sm text-neutrals-copy leading-relaxed">{fact.body}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import type { LucideIcon } from 'lucide-react';
import {
  Archive,
  ArrowRightLeft,
  Camera,
  CloudRain,
  Expand,
  Film,
  FileCheck2,
  Frame,
  ImagePlay,
  Layers,
  Moon,
  Palette,
  PenLine,
  Receipt,
  ScanSearch,
  Sparkles,
  SunDim,
  Type,
  Wand2,
  ZoomIn,
} from 'lucide-react';
import { SectionHeader } from '@/components/SectionHeader';
import { VideoPlayer, type VideoChapter } from '@/components/VideoPlayer';
import { CompareSlider } from '@/components/CompareSlider';
import { cn } from '@/lib/utils';

const IMG = '/images/video-modes';

const blenderChapters: VideoChapter[] = [
  { time: 5, label: 'First-last frame', thumbnail: `${IMG}/first-last-frame.webp` },
  { time: 13, label: 'New camera angle', thumbnail: `${IMG}/new-camera-angle.webp` },
  { time: 19, label: 'Outpaint to a new aspect', thumbnail: `${IMG}/outpaint.webp` },
  { time: 37, label: 'Restyle (IC-LoRA)', thumbnail: `${IMG}/restyle-after.webp` },
  { time: 54, label: 'Edit by prompt', thumbnail: `${IMG}/edit-after.webp` },
  { time: 71, label: 'Add water', thumbnail: `${IMG}/water-after.webp` },
  { time: 75, label: 'Day to night', thumbnail: `${IMG}/night-after.webp` },
  { time: 90, label: 'Ingredients (reference sheet)', thumbnail: `${IMG}/ingredients.webp` },
];

// The first entry is the tab shown on load.
const comparisons = [
  {
    id: 'edit',
    label: 'Edit',
    caption: 'Add, remove or replace something by prompt, and the rest of the frame is preserved.',
    before: { src: `${IMG}/edit-before.webp`, alt: 'A man walking down a narrow sunlit alley', label: 'Source clip' },
    after: { src: `${IMG}/edit-after.webp`, alt: 'The same alley with a golden retriever added in the foreground', label: 'Edited' },
  },
  {
    id: 'restyle',
    label: 'Restyle',
    caption: 'A reference still sets the look. Your clip supplies the motion and the camera.',
    before: { src: `${IMG}/restyle-before.webp`, alt: 'Live-action street shot of a man in a hoodie', label: 'Source clip' },
    after: { src: `${IMG}/restyle-after.webp`, alt: 'The same shot restyled as a hand-drawn cartoon', label: 'Restyled' },
  },
  {
    id: 'water',
    label: 'Water',
    caption: 'Rivers, rain, surf or floods, added to a scene you have already shot.',
    before: { src: `${IMG}/edit-after.webp`, alt: 'A dry alley with a man walking and a dog lying down', label: 'Source clip' },
    after: { src: `${IMG}/water-after.webp`, alt: 'The same alley, now flooded with shallow reflective water', label: 'Water added' },
  },
  {
    id: 'night',
    label: 'Day to night',
    caption: 'Lighting, sky and practical lamps are re-derived for night, rather than filtered darker.',
    before: { src: `${IMG}/night-before.webp`, alt: 'A living room in warm afternoon daylight', label: 'Day' },
    after: { src: `${IMG}/night-after.webp`, alt: 'The same living room at night, lit by lamps', label: 'Night' },
  },
];

interface Mode {
  icon: LucideIcon;
  name: string;
  body: string;
}

const modeGroups: { title: string; note: string; modes: Mode[] }[] = [
  {
    title: 'Generate',
    note: 'From a prompt or your own stills',
    modes: [
      { icon: Type, name: 'Text to video', body: 'A clip from a prompt, a seed and a resolution.' },
      { icon: ImagePlay, name: 'Image to video', body: 'Your still, encrypted on your device, becomes the first frame.' },
      { icon: Frame, name: 'First-last frame', body: 'Two stills in order. The model creates the motion between them.' },
    ],
  },
  {
    title: 'Reference',
    note: 'Consistency across shots',
    modes: [
      { icon: Layers, name: 'Ingredients', body: 'One reference sheet carries characters, props and looks from shot to shot.' },
    ],
  },
  {
    title: 'Guided by your footage',
    note: 'IC-LoRA union control, plain video in',
    modes: [
      { icon: Palette, name: 'Restyle', body: 'Re-skin a clip to a reference look, keeping its motion and camera.' },
      { icon: Expand, name: 'Outpaint', body: 'Refit a shot to a new aspect ratio (16:9 to 9:16 or back) and paint the rest.' },
      { icon: PenLine, name: 'Edit', body: 'Add, remove, replace or restyle something by prompt.' },
      { icon: Wand2, name: 'Restore', body: 'Re-render a degraded clip with detail recovered and framing kept.' },
      { icon: ZoomIn, name: 'Upscale', body: 'A true 2x enlargement, without repainting.' },
      { icon: CloudRain, name: 'Water', body: 'Add rivers, rain, surf, floods or splashes to a scene.' },
      { icon: Moon, name: 'Day to night', body: 'Turn a daylight clip into night, lighting and all.' },
      { icon: Camera, name: 'Cross-view', body: 'Re-render the scene from a camera position the original never had.' },
      { icon: SunDim, name: 'SDR to HDR', body: 'Reconstruct HDR, delivered scene-linear for grading.' },
    ],
  },
];

// Current test pricing for a 5-second clip (whitepaper 4.7, Billing).
const clipPrices = [
  { resolution: 'SD', price: 0.04 },
  { resolution: '1080p', price: 0.23 },
  { resolution: '1440p', price: 0.4 },
  { resolution: '4K', price: 0.91 },
];
const maxPrice = Math.max(...clipPrices.map((p) => p.price));

const proofPoints: { icon: LucideIcon; title: string; body: string }[] = [
  {
    icon: ScanSearch,
    title: 'Provenance you can check',
    body: 'Each mode runs a pinned, hash-committed ComfyUI graph. Every input still and control clip is bound byte for byte into an attestation that is anchored on-chain at settlement.',
  },
  {
    icon: Receipt,
    title: 'Priced before you pay',
    body: "Billed in megapixel-frames at the host's on-chain price. You see the cost first, your client rejects any over-claim, and unused deposit refunds automatically.",
  },
  {
    icon: Sparkles,
    title: '4K, proven live',
    body: 'A 5-second 3840×2160 clip rendered in 8 minutes 15 seconds and settled on-chain at exactly its pre-flight estimate.',
  },
  {
    icon: Film,
    title: 'Studio-grade delivery',
    body: 'H.264 or an opt-in 16-bit EXR master sequence with an MP4 preview. Clips of 5 to 15 seconds at 24, 25, 48 or 50 fps, with generated audio.',
  },
  {
    icon: Archive,
    title: 'Your archive, not ours',
    body: 'Delivered clips are encrypted under your own key and archived to your own Sia account, then restored onto the timeline whenever you need them.',
  },
  {
    icon: FileCheck2,
    title: 'Straight onto the timeline',
    body: 'In Blender the gesture is the edit itself: select strips, see a cost card, and the finished clip replaces its placeholder at the exact frame count.',
  },
];

export function VideoGeneration() {
  const [activeComparison, setActiveComparison] = useState(comparisons[0].id);
  const comparison = comparisons.find((c) => c.id === activeComparison) ?? comparisons[0];

  return (
    <section id="video" className="relative isolate py-20 px-4 overflow-hidden">
      <div className="absolute -z-10 top-40 -left-40 h-[500px] w-[500px] rounded-full bg-secondary/20 blur-3xl" />
      <div className="absolute -z-10 bottom-20 -right-40 h-[500px] w-[500px] rounded-full bg-primary/20 blur-3xl" />

      <div className="container max-w-7xl mx-auto space-y-16">
        <SectionHeader
          eyebrow={
            <>
              <Film className="h-3.5 w-3.5" /> AI video generation
            </>
          }
          title="Direct AI video from your timeline"
          description="Thirteen LTX 2.3 generation modes run on independent GPU hosts. Each clip is paid for individually and bound to a provenance record that your own client checks. Drive them from the SDK, the web app, or straight from Blender's Video Sequence Editor."
        />

        {/* Blender extension demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <VideoPlayer
            src="/videos/platformless-ai-blender-extension.mp4"
            poster={`${IMG}/blender-poster.webp`}
            title="Platformless AI Blender extension v0.1, generating with Lightricks LTX 2.3 (1:38)"
            chapters={blenderChapters}
            chaptersHeading="Jump to a mode"
          />
        </motion.div>

        {/* Before / after */}
        <div className="grid gap-8 lg:grid-cols-5 items-center">
          <motion.div
            className="lg:col-span-2 space-y-5"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
              Your footage in, a new take out
            </h3>
            <p className="text-neutrals-copy-light leading-relaxed">
              The guided modes take a clip you already have. The node derives the control
              geometry from it inside the graph, so you never prepare depth passes or masks.
              Drag the handle to compare real frames from the demo above.
            </p>
            <div role="tablist" aria-label="Before and after examples" className="flex flex-wrap gap-2">
              {comparisons.map((c) => (
                <button
                  key={c.id}
                  type="button"
                  role="tab"
                  aria-selected={c.id === activeComparison}
                  onClick={() => setActiveComparison(c.id)}
                  className={cn(
                    'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors',
                    c.id === activeComparison
                      ? 'border-secondary bg-secondary/20 text-foreground'
                      : 'border-neutrals-border/60 text-neutrals-copy hover:border-primary hover:text-foreground'
                  )}
                >
                  {c.label}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={comparison.id}
                className="flex items-start gap-2 text-sm text-neutrals-copy"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <ArrowRightLeft className="h-4 w-4 mt-0.5 shrink-0 text-secondary-light" />
                {comparison.caption}
              </motion.p>
            </AnimatePresence>
          </motion.div>

          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6 }}
          >
            <CompareSlider key={comparison.id} before={comparison.before} after={comparison.after} />
          </motion.div>
        </div>

        {/* All thirteen modes */}
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-bold text-foreground">Thirteen modes, one set of rails</h3>
            <p className="mt-2 text-neutrals-copy">
              Each mode has its own pinned template and on-chain model id. All of them settle through the same escrow.
            </p>
          </div>
          <div className="grid gap-5 lg:grid-cols-4">
            {modeGroups.map((group, groupIndex) => (
              <motion.div
                key={group.title}
                className={cn(
                  'rounded-2xl border border-neutrals-border/60 bg-card/60 p-5 backdrop-blur',
                  groupIndex === 0 && 'lg:col-span-3',
                  groupIndex === 2 && 'lg:col-span-4'
                )}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: groupIndex * 0.1 }}
              >
                <div className="mb-4 flex items-baseline justify-between gap-3">
                  <h4 className="font-semibold text-primary-content">{group.title}</h4>
                  <span className="text-xs text-neutrals-copy">{group.note}</span>
                </div>
                <ul className={cn('grid gap-3', group.modes.length > 1 && 'sm:grid-cols-2 lg:grid-cols-3')}>
                  {group.modes.map((mode) => (
                    <li
                      key={mode.name}
                      className="group flex items-start gap-3 rounded-xl border border-transparent p-2 transition-colors hover:border-primary/40 hover:bg-primary/5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary-light transition-transform group-hover:scale-110">
                        <mode.icon className="h-4 w-4" />
                      </span>
                      <span>
                        <span className="block text-sm font-semibold text-foreground">{mode.name}</span>
                        <span className="block text-sm text-neutrals-copy leading-snug">{mode.body}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Proof points + pricing */}
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 grid gap-4 sm:grid-cols-2">
            {proofPoints.map((point, i) => (
              <motion.div
                key={point.title}
                className="rounded-xl border border-neutrals-border/50 bg-background/50 p-5 backdrop-blur hover:border-secondary/50 transition-colors"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-60px' }}
                transition={{ duration: 0.5, delay: (i % 2) * 0.08 }}
              >
                <div className="flex items-start gap-3">
                  <point.icon className="h-5 w-5 mt-0.5 shrink-0 text-secondary" />
                  <div>
                    <h4 className="font-semibold text-primary-content">{point.title}</h4>
                    <p className="mt-1 text-sm text-neutrals-copy leading-relaxed">{point.body}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.figure
            className="rounded-2xl border border-primary/30 bg-card/70 p-6 backdrop-blur"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.5 }}
          >
            <figcaption>
              <h4 className="font-semibold text-foreground">What a 5-second clip costs</h4>
              <p className="text-xs text-neutrals-copy">Current test pricing, in USD</p>
            </figcaption>
            <ul className="mt-6 space-y-4">
              {clipPrices.map((row, i) => (
                <li key={row.resolution} className="group grid grid-cols-[52px_1fr] items-center gap-3" title={`${row.resolution}: $${row.price.toFixed(2)} per 5-second clip`}>
                  <span className="text-sm text-neutrals-copy-light tabular-nums">{row.resolution}</span>
                  <span className="flex items-center gap-2">
                    <motion.span
                      className="block h-5 rounded-r-[4px] bg-primary transition-colors group-hover:bg-secondary"
                      initial={{ width: 0 }}
                      whileInView={{ width: `${(row.price / maxPrice) * 78}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.9, delay: 0.2 + i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                      style={{ minWidth: 4 }}
                    />
                    <span className="text-sm font-semibold text-foreground tabular-nums">${row.price.toFixed(2)}</span>
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-6 text-xs text-neutrals-copy leading-relaxed">
              Cost scales with frames × width × height. 90% goes to the host and 10% to the
              protocol treasury.
            </p>
          </motion.figure>
        </div>

        <p className="mx-auto max-w-4xl text-center text-sm text-neutrals-copy">
          Video generation runs on the reference operator&apos;s GPUs today. Opening it to
          third-party hosts waits on binding the exact weight files by hash, which is on the roadmap.
        </p>
      </div>
    </section>
  );
}

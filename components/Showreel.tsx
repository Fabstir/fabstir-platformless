'use client';

import { motion } from 'framer-motion';
import { SectionHeader } from '@/components/SectionHeader';
import { VideoPlayer, type VideoChapter } from '@/components/VideoPlayer';

const chapters: VideoChapter[] = [
  { time: 0, label: 'AI without the platform' },
  { time: 3, label: "What platforms see, and what we don't" },
  { time: 19, label: 'Private AI, sovereign storage' },
  { time: 28, label: 'Agentic coding on decentralised GPUs' },
  { time: 41, label: 'Multi-agent orchestration' },
  { time: 50, label: 'Decentralised video transcoding' },
  { time: 59, label: 'AI video generation, inside Blender' },
  { time: 68, label: 'First customer: Fabstir v2' },
  { time: 99, label: 'One marketplace, two tiers of host' },
  { time: 106, label: 'Audited, funded, partnered' },
  { time: 114, label: 'Built by one founder, in public' },
];

export function Showreel() {
  return (
    <section id="showreel" className="relative isolate py-16 px-4 overflow-hidden">
      <div className="absolute inset-0 -z-10 bg-dot-grid opacity-40 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <div className="container max-w-7xl mx-auto space-y-12">
        <SectionHeader
          eyebrow="The film"
          title="Platformless AI in two minutes"
          description="Private chat on sovereign storage, coding agents, multi-agent orchestration, video transcoding and AI video generation inside Blender, all running on independent GPU hosts. Jump to any chapter."
        />
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
        >
          <VideoPlayer
            src="/videos/platformless-ai-montage.mp4"
            poster="/images/video-modes/montage-poster.webp"
            title="Platformless AI montage (2:13)"
            chapters={chapters}
          />
        </motion.div>
      </div>
    </section>
  );
}

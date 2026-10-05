'use client';

import { useEffect, useRef, useState, type CSSProperties } from 'react';
import { useInView, useReducedMotion } from 'framer-motion';
import { Pause, Play } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Clip {
  src: string;
  poster: string;
}

interface LoopingClipsProps {
  /** Clips of the same length, shown side by side and kept in step. */
  clips: Clip[];
  /** One per column, laid over its top-left corner. The last is styled as the result. */
  labels: string[];
  /** Width over height of the whole strip. */
  aspectRatio: number;
  title: string;
  className?: string;
}

const columns = (count: number): CSSProperties => ({
  gridTemplateColumns: `repeat(${count}, minmax(0, 1fr))`,
});

const playVideo = (video: HTMLVideoElement, onRefused: () => void) =>
  video.play().catch((error: DOMException) => {
    // Autoplay can be refused (low-power mode, for one); the play button takes over.
    if (error.name === 'NotAllowedError') onRefused();
  });

/**
 * Silent clips that loop in step while they are on screen. Nothing is
 * downloaded until they scroll into view (preload="none"), and with reduced
 * motion they wait for the play button.
 */
export function LoopingClips({ clips, labels, aspectRatio, title, className }: LoopingClipsProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const inView = useInView(containerRef, { margin: '-80px' });
  const reduceMotion = useReducedMotion();
  const [paused, setPaused] = useState<boolean | null>(null);
  const isPaused = paused ?? Boolean(reduceMotion);

  useEffect(() => {
    for (const video of videoRefs.current) {
      if (!video) continue;
      if (inView && !isPaused) playVideo(video, () => setPaused(true));
      else video.pause();
    }
  }, [inView, isPaused]);

  // The clips do not loop on their own: the first one restarts them all, so a pair never drifts apart.
  const restart = () => {
    for (const video of videoRefs.current) {
      if (!video) continue;
      video.currentTime = 0;
      playVideo(video, () => setPaused(true));
    }
  };

  return (
    <div
      ref={containerRef}
      role="group"
      aria-label={title}
      className={cn('relative overflow-hidden bg-background', className)}
      style={{ aspectRatio }}
    >
      <div className="grid h-full gap-px bg-white/10" style={columns(clips.length)}>
        {clips.map((clip, i) => (
          <video
            key={clip.src}
            ref={(el) => {
              videoRefs.current[i] = el;
            }}
            src={clip.src}
            poster={clip.poster}
            muted
            playsInline
            preload="none"
            onEnded={i === 0 ? restart : undefined}
            className="h-full w-full bg-background object-cover"
          />
        ))}
      </div>

      <div
        className="pointer-events-none absolute inset-0 grid items-start justify-items-start"
        style={columns(labels.length)}
      >
        {labels.map((label, i) => (
          <span
            key={label}
            className={cn(
              'm-2 rounded-full px-2.5 py-0.5 text-[11px] font-semibold text-white backdrop-blur sm:m-3 sm:px-3 sm:py-1 sm:text-xs',
              i === labels.length - 1 ? 'bg-secondary/80' : 'bg-black/70'
            )}
          >
            {label}
          </span>
        ))}
      </div>

      <button
        type="button"
        onClick={() => setPaused(!isPaused)}
        aria-label={isPaused ? 'Play clips' : 'Pause clips'}
        className="absolute bottom-2 right-2 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light sm:bottom-3 sm:right-3"
      >
        {isPaused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
      </button>
    </div>
  );
}

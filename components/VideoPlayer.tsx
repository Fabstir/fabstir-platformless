'use client';

import { useRef, useState } from 'react';
import Image from 'next/image';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface VideoChapter {
  time: number;
  label: string;
  thumbnail?: string;
}

interface VideoPlayerProps {
  src: string;
  poster: string;
  title: string;
  chapters?: VideoChapter[];
  chaptersHeading?: string;
  className?: string;
}

const formatTime = (seconds: number) =>
  `${Math.floor(seconds / 60)}:${String(Math.floor(seconds % 60)).padStart(2, '0')}`;

/**
 * Click-to-play video with a chapter list. Nothing is downloaded until the
 * viewer presses play or picks a chapter (preload="none").
 */
export function VideoPlayer({
  src,
  poster,
  title,
  chapters = [],
  chaptersHeading = 'Chapters',
  className,
}: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [started, setStarted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);

  const playFrom = (time?: number) => {
    const video = videoRef.current;
    if (!video) return;
    setStarted(true);
    if (time !== undefined) {
      if (video.readyState >= HTMLMediaElement.HAVE_METADATA) {
        video.currentTime = time;
      } else {
        video.addEventListener('loadedmetadata', () => (video.currentTime = time), { once: true });
      }
      setCurrentTime(time);
    }
    video.play().catch(() => {
      // Autoplay with sound can be refused; the native controls remain available.
    });
  };

  const activeIndex = started
    ? chapters.reduce((active, chapter, i) => (currentTime >= chapter.time ? i : active), 0)
    : -1;

  return (
    <div className={cn('grid gap-6', chapters.length > 0 && 'xl:grid-cols-[minmax(0,1fr)_280px]', className)}>
      <div className="relative">
        {/* Glow frame */}
        <div className="absolute -inset-px rounded-2xl bg-gradient-to-br from-primary via-secondary to-primary-light opacity-60 blur-md" />
        <div className="relative overflow-hidden rounded-2xl border border-primary/40 bg-black aspect-video">
          <video
            ref={videoRef}
            src={src}
            poster={poster}
            preload="none"
            playsInline
            controls={started}
            onTimeUpdate={(e) => setCurrentTime(e.currentTarget.currentTime)}
            className="h-full w-full object-contain"
            aria-label={title}
          />
          {!started && (
            <button
              type="button"
              onClick={() => playFrom()}
              className="group absolute inset-0 flex items-end bg-gradient-to-t from-black/80 via-black/10 to-transparent p-4 text-left focus-visible:outline-none sm:p-6"
              aria-label={`Play video: ${title}`}
            >
              <span className="flex items-center gap-4">
                <span className="relative flex h-14 w-14 shrink-0 items-center justify-center sm:h-16 sm:w-16">
                  <span className="absolute inset-0 rounded-full bg-secondary/40 animate-ping" />
                  <span className="relative flex h-full w-full items-center justify-center rounded-full bg-gradient-animated shadow-2xl shadow-secondary/40 transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-primary-light">
                    <Play className="h-6 w-6 translate-x-0.5 fill-white text-white sm:h-7 sm:w-7" />
                  </span>
                </span>
                <span className="hidden text-sm font-medium text-white/90 sm:block sm:text-base">{title}</span>
              </span>
            </button>
          )}
        </div>
      </div>

      {chapters.length > 0 && (
        <div className="relative min-w-0">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-neutrals-copy">
            {chaptersHeading}
          </p>
          {/* On wide screens the list is pinned to the video's height and scrolls inside it */}
          <ol className="no-scrollbar flex gap-2 overflow-x-auto pb-1 xl:absolute xl:inset-x-0 xl:top-7 xl:bottom-0 xl:flex-col xl:overflow-y-auto xl:overflow-x-visible xl:pb-6 xl:[mask-image:linear-gradient(to_bottom,black_88%,transparent)]">
            {chapters.map((chapter, i) => (
              <li key={chapter.time} className="shrink-0 xl:shrink">
                <button
                  type="button"
                  onClick={() => playFrom(chapter.time)}
                  aria-current={i === activeIndex ? 'true' : undefined}
                  className={cn(
                    'flex w-full items-center gap-3 rounded-lg border px-3 py-1.5 text-left text-sm transition-colors',
                    i === activeIndex
                      ? 'border-secondary/60 bg-secondary/15 text-foreground'
                      : 'border-neutrals-border/50 bg-background/40 text-neutrals-copy-light hover:border-primary/60 hover:text-foreground'
                  )}
                >
                  {chapter.thumbnail && (
                    <span className="relative hidden h-9 w-16 shrink-0 overflow-hidden rounded sm:block">
                      <Image src={chapter.thumbnail} alt="" fill sizes="64px" className="object-cover" />
                    </span>
                  )}
                  <span className="font-mono text-xs text-primary-light tabular-nums">
                    {formatTime(chapter.time)}
                  </span>
                  <span className="whitespace-nowrap xl:whitespace-normal">{chapter.label}</span>
                </button>
              </li>
            ))}
          </ol>
        </div>
      )}
    </div>
  );
}

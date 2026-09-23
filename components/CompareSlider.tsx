'use client';

import { useEffect, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import Image from 'next/image';
import { animate, useInView, useReducedMotion } from 'framer-motion';
import { ChevronsLeftRight } from 'lucide-react';

interface CompareImage {
  src: string;
  alt: string;
  label: string;
}

interface CompareSliderProps {
  before: CompareImage;
  after: CompareImage;
}

const clamp = (value: number) => Math.min(100, Math.max(0, value));

/** Drag (or use arrow keys) to wipe between a source frame and the generated result. */
export function CompareSlider({ before, after }: CompareSliderProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState(50);
  const [dragging, setDragging] = useState(false);
  const touched = useRef(false);
  const isInView = useInView(containerRef, { once: true, margin: '-120px' });
  const reduceMotion = useReducedMotion();

  // A one-off sweep so visitors see the slider is interactive.
  useEffect(() => {
    if (!isInView || reduceMotion) return;
    const controls = animate(50, [50, 22, 78, 50], {
      duration: 2.4,
      ease: 'easeInOut',
      delay: 0.4,
      onUpdate: (v) => {
        if (!touched.current) setPosition(v);
      },
    });
    return () => controls.stop();
  }, [isInView, reduceMotion]);

  const moveTo = (clientX: number) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    setPosition(clamp(((clientX - rect.left) / rect.width) * 100));
  };

  const handlePointerDown = (e: PointerEvent<HTMLDivElement>) => {
    touched.current = true;
    setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
    moveTo(e.clientX);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const steps: Record<string, number> = { ArrowLeft: -5, ArrowRight: 5, Home: -100, End: 100 };
    if (!(e.key in steps)) return;
    e.preventDefault();
    touched.current = true;
    setPosition((p) => clamp(p + steps[e.key]));
  };

  return (
    <div
      ref={containerRef}
      className="relative aspect-video w-full touch-pan-y select-none overflow-hidden rounded-2xl border border-primary/40 bg-black cursor-ew-resize"
      onPointerDown={handlePointerDown}
      onPointerMove={(e) => dragging && moveTo(e.clientX)}
      onPointerUp={() => setDragging(false)}
      onPointerCancel={() => setDragging(false)}
    >
      <Image src={after.src} alt={after.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" draggable={false} />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <Image src={before.src} alt={before.alt} fill sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" draggable={false} />
      </div>

      <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        {before.label}
      </span>
      <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
        {after.label}
      </span>

      <div
        role="slider"
        tabIndex={0}
        aria-label={`Compare ${before.label.toLowerCase()} and ${after.label.toLowerCase()}`}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={Math.round(position)}
        onKeyDown={handleKeyDown}
        className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_12px_rgba(236,72,153,0.8)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-light"
        style={{ left: `${position}%` }}
      >
        <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary/90 text-white shadow-lg">
          <ChevronsLeftRight className="h-5 w-5" />
        </span>
      </div>
    </div>
  );
}

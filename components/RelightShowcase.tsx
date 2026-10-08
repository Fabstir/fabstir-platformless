'use client';

/**
 * Relight showcase for the AI video section (#video), placed directly below "Two new modes for film work".
 *
 * Each look is ONE stacked video (source clip in the top half, relit clip in the bottom half), so both sides of the
 * wipe are always the same frame. A canvas draws the relit half, then the source half up to the handle. Until the video
 * has a frame, the canvas draws the two poster stills instead, so the wipe works before anything plays.
 */
import { useCallback, useEffect, useId, useRef, useState, type KeyboardEvent, type PointerEvent } from 'react';
import { ChevronsLeftRight, Pause, Play, Sparkles, SunMedium } from 'lucide-react';

const W = 1920;
const H = 1008;

type Look = { id: string; label: string; blurb: string; alt: string };

const LOOKS: Look[] = [
  {
    id: 'golden-hour',
    label: 'Golden hour',
    blurb: 'The flat overcast daylight replaced with a low, warm sun.',
    alt: 'Two people on a canal bridge in Amsterdam, relit from overcast daylight to a warm golden hour',
  },
  {
    id: 'blue-hour',
    label: 'Blue hour',
    blurb: 'The same daylight taken down to blue hour, with a soft, cool fill as the light fades.',
    alt: 'Two people on a canal bridge in Amsterdam, relit from overcast daylight to a cool blue hour',
  },
  {
    id: 'fill-light',
    label: 'Fill light',
    blurb: 'A soft fill holds the faces up while the rest of the frame settles a little darker, so the eye goes to them.',
    alt: 'Two people on a canal bridge in Amsterdam, with a soft fill light added to their faces',
  },
];

// The top thumbnail steps through these; base colour stays fixed below it.
const PASS_THUMBS = [
  { id: 'normal', label: 'Normal', alt: 'The normal pass for the first frame: surface directions as colour' },
  { id: 'depth', label: 'Depth', alt: 'The depth pass for the first frame: relative distance, far is white' },
  { id: 'roughness', label: 'Roughness', alt: 'The roughness pass for the first frame: rough surfaces are white, glossy ones dark' },
  { id: 'metallic', label: 'Metallic', alt: 'The metallic pass for the first frame: surfaces read as metal are white' },
];
const PASS_STEP_MS = 2600;

const videoBase = (base: string, id: string) => `${base}/videos/relight/relight-${id}`;
const posterSrc = (base: string, id: string) => `${base}/images/video-modes/relight-${id}-poster.webp`;

type FrameCallbacks = {
  requestVideoFrameCallback?: (cb: () => void) => number;
  cancelVideoFrameCallback?: (handle: number) => void;
};

const clamp = (n: number) => Math.min(100, Math.max(0, n));

/** `assetBase` prefixes every media URL: leave it empty when the files sit in `public/`, or give a CDN origin. */
export default function RelightShowcase({ assetBase = '' }: { assetBase?: string }) {
  const [lookIndex, setLookIndex] = useState(0);
  const [split, setSplit] = useState(50);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [near, setNear] = useState(false);
  const [passIndex, setPassIndex] = useState(0);
  const [passAuto, setPassAuto] = useState(true);

  const mediaRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const splitRef = useRef(50);
  const lookRef = useRef(LOOKS[0].id);
  const postersRef = useRef(new Map<string, HTMLImageElement>());
  const draggingRef = useRef(false);
  const pendingRef = useRef(0);
  const tabsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const panelId = useId();
  const look = LOOKS[lookIndex];
  lookRef.current = look.id;

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;
    const cw = canvas.width;
    const ch = canvas.height;
    const x = Math.round((cw * splitRef.current) / 100);
    const v = videoRef.current;
    if (v && v.readyState >= 2 && v.videoWidth > 0) {
      const vw = v.videoWidth;
      const vh = v.videoHeight / 2;
      ctx.drawImage(v, 0, vh, vw, vh, 0, 0, cw, ch);
      if (x > 0) ctx.drawImage(v, 0, 0, (vw * x) / cw, vh, 0, 0, x, ch);
      return;
    }
    const after = postersRef.current.get(lookRef.current);
    const before = postersRef.current.get('source');
    if (!after?.complete || !after.naturalWidth || !before?.complete || !before.naturalWidth) return;
    ctx.drawImage(after, 0, 0, cw, ch);
    if (x > 0) ctx.drawImage(before, 0, 0, (before.naturalWidth * x) / cw, before.naturalHeight, 0, 0, x, ch);
  }, []);

  const requestDraw = useCallback(() => {
    if (pendingRef.current) return;
    pendingRef.current = requestAnimationFrame(() => {
      pendingRef.current = 0;
      draw();
    });
  }, [draw]);

  // Reduced motion: start paused; the viewer can still press play.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) setPaused(true);
  }, []);

  // Two observers: posters load as the section approaches, the video plays only while it is on screen.
  useEffect(() => {
    const el = mediaRef.current;
    if (!el) return;
    const nearObs = new IntersectionObserver(([e]) => e.isIntersecting && setNear(true), { rootMargin: '600px 0px' });
    const viewObs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 });
    nearObs.observe(el);
    viewObs.observe(el);
    return () => {
      nearObs.disconnect();
      viewObs.disconnect();
    };
  }, []);

  // The canvas backing store follows the displayed size (times the pixel ratio, at most 1920 wide), so a phone does not
  // redraw a full-HD canvas every frame. Changing the size clears the canvas, hence the redraw.
  useEffect(() => {
    const el = mediaRef.current;
    const canvas = canvasRef.current;
    if (!el || !canvas) return;
    const fit = () => {
      const cw = Math.min(W, Math.max(1, Math.round(el.clientWidth * (window.devicePixelRatio || 1))));
      if (canvas.width === cw) return;
      canvas.width = cw;
      canvas.height = Math.round((cw * H) / W);
      draw();
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(el);
    return () => ro.disconnect();
  }, [draw]);

  useEffect(() => {
    if (!near) return;
    for (const id of ['source', ...LOOKS.map((l) => l.id)]) {
      if (postersRef.current.has(id)) continue;
      const img = new Image();
      img.decoding = 'async';
      img.onload = requestDraw;
      img.src = posterSrc(assetBase, id);
      postersRef.current.set(id, img);
    }
  }, [near, requestDraw, assetBase]);

  // Redraw on every presented video frame (requestVideoFrameCallback), or every animation frame while playing where
  // that is missing. The video element is remounted per look (key), so this runs again on a tab change.
  useEffect(() => {
    requestDraw();
    const v = videoRef.current as (HTMLVideoElement & FrameCallbacks) | null;
    if (!v) return;
    let cancelled = false;
    let handle = 0;
    let raf = 0;
    const rvfc = typeof v.requestVideoFrameCallback === 'function';
    const onVideoFrame = () => {
      draw();
      if (!cancelled) handle = v.requestVideoFrameCallback!(onVideoFrame);
    };
    const onAnimationFrame = () => {
      draw();
      if (!cancelled && !v.paused) raf = requestAnimationFrame(onAnimationFrame);
    };
    const onPlaying = () => {
      if (rvfc) return;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(onAnimationFrame);
    };
    if (rvfc) handle = v.requestVideoFrameCallback!(onVideoFrame);
    v.addEventListener('loadeddata', draw);
    v.addEventListener('seeked', draw);
    v.addEventListener('playing', onPlaying);
    return () => {
      cancelled = true;
      if (rvfc) v.cancelVideoFrameCallback?.(handle);
      cancelAnimationFrame(raf);
      v.removeEventListener('loadeddata', draw);
      v.removeEventListener('seeked', draw);
      v.removeEventListener('playing', onPlaying);
    };
  }, [lookIndex, draw, requestDraw]);

  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    if (inView && !paused) {
      v.play().catch((e: unknown) => {
        // Autoplay refused (e.g. iOS Low Power Mode): show the play button. An AbortError only means the source changed.
        if (e instanceof DOMException && e.name === 'NotAllowedError') setPaused(true);
      });
    } else {
      v.pause();
    }
  }, [inView, paused, lookIndex]);

  // The pass carousel moves only while the clip plays, so the pause button (and reduced motion) stops all motion in the
  // block. Picking a pass with its dot stops the auto-advance for good.
  useEffect(() => {
    if (!passAuto || !inView || paused) return;
    const t = window.setInterval(() => setPassIndex((i) => (i + 1) % PASS_THUMBS.length), PASS_STEP_MS);
    return () => window.clearInterval(t);
  }, [passAuto, inView, paused]);

  const moveTo = useCallback(
    (pct: number) => {
      const next = clamp(pct);
      splitRef.current = next;
      setSplit(next);
      requestDraw();
    },
    [requestDraw],
  );

  const fromPointer = (clientX: number) => {
    const r = mediaRef.current?.getBoundingClientRect();
    if (r && r.width > 0) moveTo(((clientX - r.left) / r.width) * 100);
  };

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;
    draggingRef.current = true;
    e.currentTarget.setPointerCapture(e.pointerId);
    fromPointer(e.clientX);
  };
  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    if (draggingRef.current) fromPointer(e.clientX);
  };
  const endDrag = () => {
    draggingRef.current = false;
  };

  const onSliderKey = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 2;
    const moves: Record<string, number> = {
      ArrowLeft: splitRef.current - step,
      ArrowDown: splitRef.current - step,
      ArrowRight: splitRef.current + step,
      ArrowUp: splitRef.current + step,
      PageDown: splitRef.current - 10,
      PageUp: splitRef.current + 10,
      Home: 0,
      End: 100,
    };
    if (e.key in moves) {
      e.preventDefault();
      moveTo(moves[e.key]);
    }
  };

  const onTabKey = (e: KeyboardEvent<HTMLButtonElement>, i: number) => {
    const delta = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
    if (!delta) return;
    e.preventDefault();
    const next = (i + delta + LOOKS.length) % LOOKS.length;
    setLookIndex(next);
    tabsRef.current[next]?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <span className="inline-flex items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary-light">
          <Sparkles className="h-3.5 w-3.5" aria-hidden="true" /> New: VFX Passes
        </span>
        <h3 className="mt-4 text-2xl sm:text-3xl font-bold text-foreground">Relight footage you have already shot</h3>
        <p className="mx-auto mt-2 max-w-3xl text-neutrals-copy">
          VFX Passes reads a live-action shot and returns, frame for frame, the passes a 3D render would give you. Start
          from the EXR sequence your pipeline already uses: the passes come back as EXR, and the Blender extension relights
          your plate from them in scene-linear float on your own machine, writing a 16-bit EXR sequence for Nuke, Resolve or
          After Effects. Relighting runs locally, so it needs no new job and costs nothing extra.
        </p>
      </div>

      <div className="space-y-3 text-center">
        <div role="tablist" aria-label="Relit looks" className="flex flex-wrap justify-center gap-2">
          {LOOKS.map((l, i) => {
            const selected = i === lookIndex;
            return (
              <button
                key={l.id}
                ref={(el) => {
                  tabsRef.current[i] = el;
                }}
                type="button"
                role="tab"
                aria-selected={selected}
                aria-controls={panelId}
                tabIndex={selected ? 0 : -1}
                onClick={() => setLookIndex(i)}
                onKeyDown={(e) => onTabKey(e, i)}
                className={
                  'rounded-full border px-4 py-1.5 text-sm font-medium transition-colors ' +
                  (selected
                    ? 'border-secondary bg-secondary/20 text-foreground'
                    : 'border-neutrals-border/60 text-neutrals-copy hover:border-primary hover:text-foreground')
                }
              >
                {l.label}
              </button>
            );
          })}
        </div>
        <p className="mx-auto max-w-2xl text-sm text-neutrals-copy" aria-live="polite">
          <ChevronsLeftRight className="mr-1.5 inline h-4 w-4 -translate-y-px text-secondary-light" aria-hidden="true" />
          {look.blurb} Drag the handle to compare.
        </p>
      </div>

      <figure className="overflow-hidden rounded-2xl border border-primary/30 bg-card/60 backdrop-blur">
        <div
          ref={mediaRef}
          id={panelId}
          role="tabpanel"
          aria-label={`Relight comparison, ${look.label}: the source clip on the left of the handle, the relit clip on the right`}
          className="relative w-full cursor-ew-resize touch-pan-y select-none overflow-hidden bg-background"
          style={{ aspectRatio: `${W} / ${H}` }}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
        >
          {/* Stays visible under the poster and canvas: browsers may pause muted video they consider hidden. */}
          <video
            key={look.id}
            ref={videoRef}
            muted
            loop
            playsInline
            preload="none"
            aria-hidden="true"
            tabIndex={-1}
            className="pointer-events-none absolute inset-x-0 top-0 h-[200%] w-full -translate-y-1/2 object-fill"
          >
            <source src={`${videoBase(assetBase, look.id)}.webm`} type='video/webm; codecs="vp9"' />
            <source src={`${videoBase(assetBase, look.id)}.mp4`} type='video/mp4; codecs="avc1.640032"' />
          </video>
          {/* eslint-disable-next-line @next/next/no-img-element -- plain still under the canvas; also the no-JS view */}
          <img
            src={posterSrc(assetBase, look.id)}
            alt={look.alt}
            width={W}
            height={H}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="pointer-events-none absolute inset-0 h-full w-full object-cover"
          />
          <canvas ref={canvasRef} width={W} height={H} aria-hidden="true" className="absolute inset-0 h-full w-full" />

          <span className="pointer-events-none absolute left-3 top-3 rounded-full bg-black/70 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Source clip
          </span>
          <span className="pointer-events-none absolute right-3 top-3 rounded-full bg-secondary/80 px-3 py-1 text-xs font-semibold text-white backdrop-blur">
            Relit: {look.label}
          </span>

          <div
            role="slider"
            tabIndex={0}
            aria-label="Compare source clip and relit clip"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(split)}
            aria-valuetext={`${Math.round(split)}% source`}
            onKeyDown={onSliderKey}
            className="absolute inset-y-0 -ml-px w-0.5 bg-white/90 shadow-[0_0_12px_rgba(236,72,153,0.8)] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary-light"
            style={{ left: `${split}%` }}
          >
            <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border-2 border-white bg-primary/90 text-white shadow-lg">
              <ChevronsLeftRight className="h-5 w-5" aria-hidden="true" />
            </span>
          </div>

          <button
            type="button"
            aria-label={paused ? 'Play clip' : 'Pause clip'}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setPaused((p) => !p)}
            className="absolute bottom-2 right-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-black/60 text-white backdrop-blur transition-colors hover:bg-primary/80 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light sm:bottom-3 sm:right-3"
          >
            {paused ? <Play className="h-4 w-4" aria-hidden="true" /> : <Pause className="h-4 w-4" aria-hidden="true" />}
          </button>
        </div>

        <div className="grid gap-6 p-5 sm:p-6 md:grid-cols-[1fr_auto] md:items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-secondary/15 text-secondary-light">
                <SunMedium className="h-4 w-4" aria-hidden="true" />
              </span>
              <h4 className="text-lg font-semibold text-foreground">VFX Passes, then Relight</h4>
            </div>
            <p className="max-w-3xl text-neutrals-copy-light leading-relaxed">
              Built on NVIDIA Cosmos DiffusionRenderer. Key returns normals, Standard adds base colour, and Full adds depth,
              roughness and metallic, each as its own EXR sequence on the timeline. Replace lighting swaps the broad light of the shot for your own lights while keeping the
              footage&apos;s own detail (skin texture, fabric, catch-lights), so it stays photographic. Add light keeps the
              light as shot and adds to it.
            </p>
            <ul className="flex flex-wrap gap-2">
              {['EXR in, EXR out', '1920×1088', '24 or 25 fps', 'Up to five passes', 'Relit on your machine'].map((chip) => (
                <li key={chip} className="rounded-full border border-neutrals-border/60 px-3 py-1 text-xs text-neutrals-copy">
                  {chip}
                </li>
              ))}
            </ul>
          </div>
          <div className="md:w-56">
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              <div
                role="group"
                aria-roledescription="carousel"
                aria-label="Normal, depth, roughness and metallic passes"
                className="relative aspect-video overflow-hidden rounded-lg border border-neutrals-border/60 bg-background"
              >
                {PASS_THUMBS.map((p, i) => (
                  // eslint-disable-next-line @next/next/no-img-element -- small static thumbnails; next/image works too
                  <img
                    key={p.id}
                    src={`${assetBase}/images/video-modes/relight-pass-${p.id}.webp`}
                    alt={p.alt}
                    aria-hidden={i !== passIndex}
                    width={640}
                    height={336}
                    loading="lazy"
                    decoding="async"
                    className={
                      'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 motion-reduce:transition-none ' +
                      (i === passIndex ? 'opacity-100' : 'opacity-0')
                    }
                  />
                ))}
                <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-black/70 px-2 py-px text-[10px] font-semibold text-white backdrop-blur">
                  {PASS_THUMBS[passIndex].label}
                </span>
                <div className="absolute right-1 top-1 flex rounded-full bg-black/45 backdrop-blur">
                  {PASS_THUMBS.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      aria-label={`Show the ${p.label.toLowerCase()} pass`}
                      aria-current={i === passIndex}
                      onClick={() => {
                        setPassAuto(false);
                        setPassIndex(i);
                      }}
                      className="group flex h-6 w-6 cursor-pointer items-center justify-center rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-light"
                    >
                      <span
                        className={
                          'h-1.5 w-1.5 rounded-full shadow transition-colors ' +
                          (i === passIndex ? 'bg-white' : 'bg-white/45 group-hover:bg-white/80')
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div className="relative aspect-video overflow-hidden rounded-lg border border-neutrals-border/60">
                {/* eslint-disable-next-line @next/next/no-img-element -- small static thumbnail; next/image works too */}
                <img
                  src={`${assetBase}/images/video-modes/relight-pass-basecolor.webp`}
                  alt="The base colour pass for the first frame: surface colour with the lighting removed"
                  width={640}
                  height={336}
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover"
                />
                <span className="pointer-events-none absolute bottom-1.5 left-1.5 rounded-full bg-black/70 px-2 py-px text-[10px] font-semibold text-white backdrop-blur">
                  Base colour
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs text-neutrals-copy">All five passes the network returned for this shot (Full preset)</p>
          </div>
        </div>

        <figcaption className="border-t border-neutrals-border/40 px-5 py-3 text-xs text-neutrals-copy sm:px-6">
          Live-action footage relit with AI-derived passes, shown here as web video; the deliverables are EXR. Source:{' '}
          <em>Tears of Steel</em> EXR plates, (CC){' '}
          <a href="https://mango.blender.org" className="underline hover:text-foreground" target="_blank" rel="noopener noreferrer">
            Blender Foundation | mango.blender.org
          </a>
          ,{' '}
          <a
            href="https://creativecommons.org/licenses/by/3.0/"
            className="underline hover:text-foreground"
            target="_blank"
            rel="noopener noreferrer"
          >
            CC BY 3.0
          </a>
          , cropped and relit. Passes from Platformless AI&apos;s VFX Passes mode, built on NVIDIA Cosmos; relit in Blender
          with the Platformless AI extension.
        </figcaption>
      </figure>
    </div>
  );
}

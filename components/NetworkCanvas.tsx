'use client';

import { useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';

interface NetNode {
  x: number;
  y: number;
  vx: number;
  vy: number;
  host: boolean;
}

interface Packet {
  from: number;
  to: number;
  t: number;
}

const LINK_DISTANCE = 150;
const PACKET_SECONDS = 1.3;
const SPAWN_SECONDS = 0.22;

/**
 * Drifting peer-to-peer mesh: larger violet nodes are GPU hosts, small ones are
 * clients, and pink pulses are encrypted packets hopping between neighbours.
 */
export function NetworkCanvas({ className }: { className?: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let width = 0;
    let height = 0;
    let nodes: NetNode[] = [];
    let packets: Packet[] = [];
    let frame = 0;
    let lastTime = 0;
    let spawnTimer = 0;
    let onScreen = true;

    const seed = () => {
      const count = Math.min(72, Math.max(26, Math.round((width * height) / 15000)));
      nodes = Array.from({ length: count }, (_, i) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 18,
        vy: (Math.random() - 0.5) * 18,
        host: i % 5 === 0,
      }));
      packets = [];
    };

    const distance = (a: NetNode, b: NetNode) => Math.hypot(a.x - b.x, a.y - b.y);

    const spawnPacket = () => {
      const from = Math.floor(Math.random() * nodes.length);
      const candidates: number[] = [];
      nodes.forEach((n, i) => {
        if (i !== from && distance(nodes[from], n) < LINK_DISTANCE) candidates.push(i);
      });
      if (candidates.length === 0) return;
      const to = candidates[Math.floor(Math.random() * candidates.length)];
      packets.push({ from, to, t: 0 });
    };

    const step = (dt: number) => {
      for (const n of nodes) {
        n.x += n.vx * dt;
        n.y += n.vy * dt;
        if (n.x < -20) n.x = width + 20;
        if (n.x > width + 20) n.x = -20;
        if (n.y < -20) n.y = height + 20;
        if (n.y > height + 20) n.y = -20;
      }
      spawnTimer += dt;
      while (spawnTimer > SPAWN_SECONDS) {
        spawnTimer -= SPAWN_SECONDS;
        spawnPacket();
      }
      packets = packets.filter((p) => {
        p.t += dt / PACKET_SECONDS;
        return p.t < 1 && distance(nodes[p.from], nodes[p.to]) < LINK_DISTANCE * 1.3;
      });
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      ctx.lineWidth = 1;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const d = distance(nodes[i], nodes[j]);
          if (d >= LINK_DISTANCE) continue;
          ctx.strokeStyle = `rgba(167, 139, 250, ${(1 - d / LINK_DISTANCE) * 0.28})`;
          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.stroke();
        }
      }

      for (const p of packets) {
        const a = nodes[p.from];
        const b = nodes[p.to];
        const x = a.x + (b.x - a.x) * p.t;
        const y = a.y + (b.y - a.y) * p.t;
        const fade = Math.sin(Math.PI * p.t);
        ctx.fillStyle = `rgba(236, 72, 153, ${0.18 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 6, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = `rgba(244, 114, 182, ${0.95 * fade})`;
        ctx.beginPath();
        ctx.arc(x, y, 1.8, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const n of nodes) {
        if (n.host) {
          ctx.fillStyle = 'rgba(139, 92, 246, 0.18)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 9, 0, Math.PI * 2);
          ctx.fill();
          ctx.fillStyle = 'rgba(167, 139, 250, 0.95)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 3, 0, Math.PI * 2);
          ctx.fill();
        } else {
          ctx.fillStyle = 'rgba(229, 231, 235, 0.55)';
          ctx.beginPath();
          ctx.arc(n.x, n.y, 1.5, 0, Math.PI * 2);
          ctx.fill();
        }
      }
    };

    const loop = (now: number) => {
      const dt = lastTime ? Math.min(0.05, (now - lastTime) / 1000) : 0;
      lastTime = now;
      step(dt);
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frame || !onScreen || document.hidden) return;
      lastTime = 0;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      seed();
      draw();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const intersectionObserver = new IntersectionObserver(([entry]) => {
      onScreen = entry.isIntersecting;
      if (onScreen) start();
      else stop();
    });
    intersectionObserver.observe(canvas);

    const handleVisibility = () => (document.hidden ? stop() : start());
    document.addEventListener('visibilitychange', handleVisibility);

    resize();
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={cn('absolute inset-0 h-full w-full', className)}
    />
  );
}

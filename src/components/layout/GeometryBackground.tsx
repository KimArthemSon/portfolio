import { useEffect, useRef } from 'react';

type ShapeKind = 'circle' | 'triangle' | 'square' | 'hexagon' | 'plus' | 'dot';

interface Shape {
  kind: ShapeKind;
  x: number;
  y: number;
  size: number;
  rotation: number;
  spin: number;
  vx: number;
  vy: number;
  /** 0.3 (far) – 1 (near): drives parallax, opacity and line weight. */
  depth: number;
  accent: boolean;
}

const KINDS: ShapeKind[] = ['circle', 'triangle', 'square', 'hexagon', 'plus', 'circle', 'triangle'];
const ACCENT = '74 222 128'; // #4ADE80

const rand = (min: number, max: number) => min + Math.random() * (max - min);

function makeShape(width: number, height: number): Shape {
  const accent = Math.random() < 0.14;
  const depth = rand(0.3, 1);
  return {
    kind: accent ? 'dot' : KINDS[Math.floor(Math.random() * KINDS.length)],
    x: Math.random() * width,
    y: Math.random() * height,
    size: accent ? rand(2, 3.5) : rand(10, 44) * (0.6 + depth * 0.4),
    rotation: Math.random() * Math.PI * 2,
    spin: rand(-0.0025, 0.0025),
    vx: rand(-0.12, 0.12),
    vy: rand(-0.1, 0.06),
    depth,
    accent,
  };
}

function polygon(ctx: CanvasRenderingContext2D, sides: number, r: number) {
  ctx.beginPath();
  for (let i = 0; i < sides; i++) {
    const a = (i / sides) * Math.PI * 2 - Math.PI / 2;
    const px = Math.cos(a) * r;
    const py = Math.sin(a) * r;
    if (i === 0) ctx.moveTo(px, py);
    else ctx.lineTo(px, py);
  }
  ctx.closePath();
  ctx.stroke();
}

function drawShape(ctx: CanvasRenderingContext2D, s: Shape) {
  const r = s.size / 2;
  switch (s.kind) {
    case 'circle':
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.stroke();
      break;
    case 'triangle':
      polygon(ctx, 3, r);
      break;
    case 'square':
      ctx.strokeRect(-r * 0.75, -r * 0.75, r * 1.5, r * 1.5);
      break;
    case 'hexagon':
      polygon(ctx, 6, r);
      break;
    case 'plus':
      ctx.beginPath();
      ctx.moveTo(-r * 0.5, 0);
      ctx.lineTo(r * 0.5, 0);
      ctx.moveTo(0, -r * 0.5);
      ctx.lineTo(0, r * 0.5);
      ctx.stroke();
      break;
    case 'dot':
      ctx.beginPath();
      ctx.arc(0, 0, r, 0, Math.PI * 2);
      ctx.fill();
      break;
  }
}

/**
 * Slowly drifting outlined geometry behind the cards. Theme-aware (reads the
 * --color-ink token), gently parallaxes with the pointer and scroll, pauses when
 * the tab is hidden, and renders a single still frame under prefers-reduced-motion.
 */
export function GeometryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    if (!canvas || !ctx) return;

    const reduceMotion =
      typeof window.matchMedia === 'function' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let width = 0;
    let height = 0;
    let shapes: Shape[] = [];
    let ink = '26 26 26';
    let frame = 0;
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };

    const readInk = () => {
      ink = getComputedStyle(document.documentElement).getPropertyValue('--color-ink').trim() || ink;
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      // Mobile URL bars fire resize on scroll; only re-scatter shapes when the width changes.
      const widthChanged = window.innerWidth !== width;
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      if (widthChanged || shapes.length === 0) {
        const count = Math.max(14, Math.min(42, Math.round((width * height) / 38000)));
        shapes = Array.from({ length: count }, () => makeShape(width, height));
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const scroll = window.scrollY;
      // Ease the pointer for a soft, floaty parallax.
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;

      for (const s of shapes) {
        const margin = s.size + 40;
        // Parallax: nearer shapes move more with pointer and scroll.
        const px = s.x + pointer.x * 18 * s.depth;
        let py = s.y + pointer.y * 18 * s.depth - scroll * 0.06 * s.depth;
        const span = height + margin * 2;
        py = ((((py + margin) % span) + span) % span) - margin;

        ctx.save();
        ctx.translate(px, py);
        ctx.rotate(s.rotation);
        if (s.accent) {
          ctx.fillStyle = `rgb(${ACCENT} / ${0.35 + s.depth * 0.35})`;
        } else {
          ctx.strokeStyle = `rgb(${ink} / ${0.08 + s.depth * 0.12})`;
          ctx.lineWidth = 1 + s.depth * 0.4;
        }
        drawShape(ctx, s);
        ctx.restore();
      }
    };

    const step = () => {
      for (const s of shapes) {
        s.x += s.vx;
        s.y += s.vy;
        s.rotation += s.spin;
        const m = s.size + 40;
        if (s.x < -m) s.x = width + m;
        else if (s.x > width + m) s.x = -m;
        if (s.y < -m) s.y = height + m;
        else if (s.y > height + m) s.y = -m;
      }
      draw();
      frame = window.requestAnimationFrame(step);
    };

    const start = () => {
      window.cancelAnimationFrame(frame);
      if (reduceMotion) draw();
      else frame = window.requestAnimationFrame(step);
    };

    const onPointerMove = (e: PointerEvent) => {
      pointer.tx = (e.clientX / width - 0.5) * 2;
      pointer.ty = (e.clientY / height - 0.5) * 2;
    };
    const onVisibility = () => {
      if (document.hidden) window.cancelAnimationFrame(frame);
      else start();
    };
    const onResize = () => {
      resize();
      if (reduceMotion) draw();
    };
    const onScroll = () => {
      if (reduceMotion) draw();
    };

    // Repaint with the new ink color when the theme class flips.
    const themeObserver = new MutationObserver(() => {
      readInk();
      if (reduceMotion) draw();
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] });

    readInk();
    resize();
    start();
    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      window.cancelAnimationFrame(frame);
      themeObserver.disconnect();
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0 h-screen w-screen"
    />
  );
}

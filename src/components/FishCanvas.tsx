"use client";

import { useEffect, useRef } from "react";

interface Fish {
  x: number;
  y: number;
  angle: number;
  speed: number;
  size: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  lag: number;
  offset: number;
}

function lerp(a: number, b: number, t: number) {
  return a + (b - a) * t;
}

function lerpAngle(a: number, b: number, t: number) {
  let diff = b - a;
  while (diff > Math.PI) diff -= Math.PI * 2;
  while (diff < -Math.PI) diff += Math.PI * 2;
  return a + diff * t;
}

function drawFish(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  angle: number,
  size: number,
  opacity: number,
  wobble: number
) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  const tailWag = Math.sin(wobble) * 0.3;

  ctx.globalAlpha = opacity;

  // Body
  ctx.fillStyle = "#1a2a2a";
  ctx.beginPath();
  ctx.ellipse(0, 0, size, size * 0.42, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tail
  ctx.beginPath();
  ctx.moveTo(-size * 0.85, 0);
  ctx.lineTo(-size * 1.5, -size * 0.45 + tailWag * size);
  ctx.lineTo(-size * 1.5, size * 0.45 + tailWag * size);
  ctx.closePath();
  ctx.fill();

  // Eye
  ctx.globalAlpha = opacity * 1.8;
  ctx.fillStyle = "#4eb3b3";
  ctx.beginPath();
  ctx.arc(size * 0.45, -size * 0.1, size * 0.11, 0, Math.PI * 2);
  ctx.fill();

  // Dorsal fin
  ctx.globalAlpha = opacity * 0.65;
  ctx.fillStyle = "#1a2a2a";
  ctx.beginPath();
  ctx.moveTo(size * 0.1, -size * 0.38);
  ctx.quadraticCurveTo(size * 0.3, -size * 0.72, size * 0.5, -size * 0.4);
  ctx.closePath();
  ctx.fill();

  ctx.restore();
}

export default function FishCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -300, y: -300 });
  const fishRef = useRef<Fish[]>([]);
  const animFrameRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const fishCount = 8;
    fishRef.current = Array.from({ length: fishCount }, (_, i) => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: 0,
      speed: 0.055 + Math.random() * 0.04,
      size: 10 + Math.random() * 14,
      opacity: 0.15 + Math.random() * 0.22,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.04 + Math.random() * 0.03,
      lag: i * 0.07 + 0.04,
      offset: (Math.random() - 0.5) * 55,
    }));

    let frame = 0;

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);
      frame++;

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;

      fishRef.current.forEach((fish, i) => {
        fish.wobble += fish.wobbleSpeed;

        const lagFactor = 1 - fish.lag;
        const spreadAngle = frame * 0.01 + i * ((Math.PI * 2) / fishRef.current.length);

        const targetX = mx + Math.cos(spreadAngle) * 25 + fish.offset;
        const targetY = my + Math.sin(spreadAngle) * 25;

        const dx = targetX - fish.x;
        const dy = targetY - fish.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist > 2) {
          const targetAngle = Math.atan2(dy, dx);
          fish.angle = lerpAngle(fish.angle, targetAngle, fish.speed * (1 + dist / 100));
        }

        fish.x = lerp(fish.x, targetX, fish.speed * lagFactor);
        fish.y = lerp(fish.y, targetY, fish.speed * lagFactor);

        drawFish(ctx!, fish.x, fish.y, fish.angle, fish.size, fish.opacity, fish.wobble);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="fish-canvas" />;
}

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
  // For idle roaming
  roamAngle: number;
  roamTurnSpeed: number;
  roamTurnTimer: number;
  roamTurnInterval: number;
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
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
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
      mouseRef.current = { x: e.clientX, y: e.clientY, active: true };
    };
    const onMouseLeave = () => {
      mouseRef.current = { ...mouseRef.current, active: false };
    };
    window.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseleave", onMouseLeave);

    const fishCount = 12;
    fishRef.current = Array.from({ length: fishCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      speed: 0.9 + Math.random() * 0.8,        // px per frame for roaming
      size: 9 + Math.random() * 13,
      opacity: 0.12 + Math.random() * 0.18,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.04 + Math.random() * 0.03,
      roamAngle: Math.random() * Math.PI * 2,
      roamTurnSpeed: 0.02 + Math.random() * 0.02,
      roamTurnTimer: 0,
      roamTurnInterval: 80 + Math.floor(Math.random() * 120),
    }));

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      fishRef.current.forEach((fish) => {
        fish.wobble += fish.wobbleSpeed;
        fish.roamTurnTimer++;

        // Periodically nudge roam direction
        if (fish.roamTurnTimer >= fish.roamTurnInterval) {
          fish.roamTurnTimer = 0;
          fish.roamTurnInterval = 80 + Math.floor(Math.random() * 120);
          fish.roamAngle += (Math.random() - 0.5) * Math.PI * 0.9;
        }

        // Check distance to cursor
        const dx = mx - fish.x;
        const dy = my - fish.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const attractRadius = 220;

        let targetAngle: number;
        let moveSpeed: number;

        if (mouseActive && dist < attractRadius) {
          // Swim toward cursor — faster as it gets closer
          targetAngle = Math.atan2(dy, dx);
          // Ease off speed as it gets very close (don't pile on top of cursor)
          const closeness = Math.max(0, 1 - dist / attractRadius);
          moveSpeed = fish.speed * (0.5 + closeness * 1.5);
          fish.roamAngle = targetAngle; // sync roam so it doesn't snap away
        } else {
          // Idle roam
          targetAngle = fish.roamAngle;
          moveSpeed = fish.speed * 0.5;
        }

        fish.angle = lerpAngle(fish.angle, targetAngle, 0.05);

        const vx = Math.cos(fish.angle) * moveSpeed;
        const vy = Math.sin(fish.angle) * moveSpeed;

        fish.x += vx;
        fish.y += vy;

        // Wrap around edges
        const w = canvas!.width;
        const h = canvas!.height;
        const margin = fish.size * 2;
        if (fish.x < -margin) fish.x = w + margin;
        if (fish.x > w + margin) fish.x = -margin;
        if (fish.y < -margin) fish.y = h + margin;
        if (fish.y > h + margin) fish.y = -margin;

        drawFish(ctx!, fish.x, fish.y, fish.angle, fish.size, fish.opacity, fish.wobble);
      });

      animFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return <canvas ref={canvasRef} id="fish-canvas" />;
}

"use client";

import { useEffect, useRef } from "react";

interface Fish {
  x: number;
  y: number;
  angle: number;
  size: number;
  opacity: number;
  wobble: number;
  wobbleSpeed: number;
  // Idle roam state
  roamAngle: number;
  roamTurnTimer: number;
  roamTurnInterval: number;
  baseSpeed: number;
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

  const tailWag = Math.sin(wobble) * 0.28;

  ctx.globalAlpha = opacity;

  // Body
  ctx.fillStyle = "#1a2a2a";
  ctx.beginPath();
  ctx.ellipse(0, 0, size, size * 0.4, 0, 0, Math.PI * 2);
  ctx.fill();

  // Tail
  ctx.beginPath();
  ctx.moveTo(-size * 0.85, 0);
  ctx.lineTo(-size * 1.5, -size * 0.42 + tailWag * size);
  ctx.lineTo(-size * 1.5,  size * 0.42 + tailWag * size);
  ctx.closePath();
  ctx.fill();

  // Eye
  ctx.globalAlpha = opacity * 2.0;
  ctx.fillStyle = "#4eb3b3";
  ctx.beginPath();
  ctx.arc(size * 0.45, -size * 0.08, size * 0.1, 0, Math.PI * 2);
  ctx.fill();

  // Dorsal fin
  ctx.globalAlpha = opacity * 0.6;
  ctx.fillStyle = "#1a2a2a";
  ctx.beginPath();
  ctx.moveTo(size * 0.1, -size * 0.36);
  ctx.quadraticCurveTo(size * 0.3, -size * 0.68, size * 0.5, -size * 0.38);
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

    const fishCount = 16;
    fishRef.current = Array.from({ length: fishCount }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      angle: Math.random() * Math.PI * 2,
      size: 9 + Math.random() * 15,
      opacity: 0.18 + Math.random() * 0.22,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.035 + Math.random() * 0.03,
      roamAngle: Math.random() * Math.PI * 2,
      roamTurnTimer: Math.floor(Math.random() * 120),
      roamTurnInterval: 90 + Math.floor(Math.random() * 110),
      baseSpeed: 0.5 + Math.random() * 0.6,
    }));

    function animate() {
      ctx!.clearRect(0, 0, canvas!.width, canvas!.height);

      const mx = mouseRef.current.x;
      const my = mouseRef.current.y;
      const mouseActive = mouseRef.current.active;

      // Screen diagonal for normalizing distance
      const diag = Math.sqrt(canvas!.width ** 2 + canvas!.height ** 2);

      fishRef.current.forEach((fish) => {
        fish.wobble += fish.wobbleSpeed;
        fish.roamTurnTimer++;

        // Periodically nudge idle roam direction
        if (fish.roamTurnTimer >= fish.roamTurnInterval) {
          fish.roamTurnTimer = 0;
          fish.roamTurnInterval = 90 + Math.floor(Math.random() * 110);
          fish.roamAngle += (Math.random() - 0.5) * Math.PI * 0.8;
        }

        const dx = mx - fish.x;
        const dy = my - fish.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        let targetAngle: number;
        let speed: number;

        if (mouseActive) {
          // Soft falloff: all fish orient toward cursor, stronger when closer
          // attractStrength: 1 when right on cursor, ~0.05 at screen edge
          const attractStrength = Math.max(0, 1 - dist / (diag * 0.65));
          const towardCursor = Math.atan2(dy, dx);

          // Blend between roam angle and cursor angle by attractStrength
          // Use lerpAngle so it doesn't snap
          targetAngle = lerpAngle(fish.roamAngle, towardCursor, attractStrength * 0.9);

          // Speed: base + boost when close
          speed = fish.baseSpeed * (1 + attractStrength * 1.4);

          // Keep roamAngle roughly in sync so fish don't jerk when cursor leaves
          if (attractStrength > 0.1) {
            fish.roamAngle = lerpAngle(fish.roamAngle, towardCursor, 0.01);
          }
        } else {
          targetAngle = fish.roamAngle;
          speed = fish.baseSpeed * 0.55;
        }

        // Smooth angle turn (fish can't pivot instantly)
        fish.angle = lerpAngle(fish.angle, targetAngle, 0.04);

        fish.x += Math.cos(fish.angle) * speed;
        fish.y += Math.sin(fish.angle) * speed;

        // Wrap at edges
        const w = canvas!.width;
        const h = canvas!.height;
        const m = fish.size * 2;
        if (fish.x < -m) fish.x = w + m;
        if (fish.x > w + m) fish.x = -m;
        if (fish.y < -m) fish.y = h + m;
        if (fish.y > h + m) fish.y = -m;

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

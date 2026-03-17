"use client";

import { useEffect, useState } from "react";

export default function ParallaxGlow() {
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    function onMove(e: MouseEvent) {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      setOffset({ x, y });
    }

    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        overflow: "hidden"
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 520,
          height: 520,
          borderRadius: "50%",
          top: -140 + offset.y,
          right: -120 + offset.x,
          background: "radial-gradient(circle, rgba(255,255,255,.12), rgba(255,255,255,.02) 45%, transparent 68%)",
          filter: "blur(12px)"
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 340,
          height: 340,
          borderRadius: "50%",
          bottom: -80 - offset.y,
          left: -60 - offset.x,
          background: "radial-gradient(circle, rgba(120,160,255,.10), rgba(120,160,255,.02) 45%, transparent 70%)",
          filter: "blur(10px)"
        }}
      />
    </div>
  );
}

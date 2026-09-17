"use client";

import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { ParticleField } from "./ParticleField";
import { attachScrollSignal } from "./scroll-signal";

function pickParticleCount() {
  const narrow = window.innerWidth < 768;
  const lowCore = (navigator.hardwareConcurrency ?? 8) <= 4;
  if (narrow || lowCore) return 3500;
  return 9000;
}

function hasWebGL() {
  try {
    const c = document.createElement("canvas");
    return !!(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

export default function SceneCanvas() {
  const [config, setConfig] = useState<{ count: number; reducedMotion: boolean } | null>(null);

  useEffect(() => {
    if (!hasWebGL()) return;
    const detach = attachScrollSignal();
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () =>
      setConfig({ count: pickParticleCount(), reducedMotion: motionQuery.matches });
    apply();
    motionQuery.addEventListener("change", apply);
    return () => {
      motionQuery.removeEventListener("change", apply);
      detach();
    };
  }, []);

  if (!config) return null;

  return (
    <Canvas
      className="scene-fade-in"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0, 7], fov: 45, near: 0.1, far: 50 }}
      gl={{ antialias: false, alpha: true, powerPreference: "high-performance", stencil: false }}
      // Canvas is position:fixed, so scroll never changes its size — only debounce resizes.
      resize={{ scroll: false, debounce: { scroll: 0, resize: 150 } }}
      frameloop="always"
      style={{ pointerEvents: "none" }}
    >
      <ParticleField count={config.count} reducedMotion={config.reducedMotion} />
    </Canvas>
  );
}

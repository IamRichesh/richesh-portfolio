"use client";

import dynamic from "next/dynamic";
import { ScrollTelemetry } from "./ScrollTelemetry";

// Three.js is client-only and heavy: keep it out of the server render and the main bundle.
const SceneCanvas = dynamic(() => import("./SceneCanvas"), { ssr: false });

export function BackgroundScene() {
  return (
    <>
      <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0">
        <div className="scene-backdrop absolute inset-0" />
        <div className="absolute inset-0">
          <SceneCanvas />
        </div>
        <div className="scene-vignette absolute inset-0" />
        <div className="scene-grid absolute inset-0" />
      </div>
      <ScrollTelemetry />
    </>
  );
}

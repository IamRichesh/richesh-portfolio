"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, Color, MathUtils, type Group, type ShaderMaterial } from "three";
import { scrollSignal } from "./scroll-signal";
import { fragmentShader, vertexShader } from "./shaders";

const GOLDEN = Math.PI * (3 - Math.sqrt(5));

function buildFormations(count: number) {
  const sphere = new Float32Array(count * 3);
  const ring = new Float32Array(count * 3);
  const plane = new Float32Array(count * 3);
  const seed = new Float32Array(count);
  const side = Math.ceil(Math.sqrt(count));

  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const s = Math.random();
    seed[i] = s;

    // Fibonacci sphere with a thin, noisy shell.
    const y = 1 - (i / (count - 1)) * 2;
    const rad = Math.sqrt(1 - y * y);
    const theta = GOLDEN * i;
    const shell = 2.35 + (Math.random() - 0.5) * 0.35;
    sphere[i3] = Math.cos(theta) * rad * shell;
    sphere[i3 + 1] = y * shell;
    sphere[i3 + 2] = Math.sin(theta) * rad * shell;

    // Two interlocked rings, tilted against each other.
    const a = Math.random() * Math.PI * 2;
    const tube = 0.22 * Math.sqrt(Math.random());
    const ta = Math.random() * Math.PI * 2;
    const R = 2.6 + Math.cos(ta) * tube;
    const rx = Math.cos(a) * R;
    const ry = Math.sin(ta) * tube;
    const rz = Math.sin(a) * R;
    if (i % 2 === 0) {
      ring[i3] = rx;
      ring[i3 + 1] = ry * Math.cos(0.9) - rz * Math.sin(0.9);
      ring[i3 + 2] = ry * Math.sin(0.9) + rz * Math.cos(0.9);
    } else {
      ring[i3] = rx * Math.cos(-0.9) - ry * Math.sin(-0.9);
      ring[i3 + 1] = rx * Math.sin(-0.9) + ry * Math.cos(-0.9);
      ring[i3 + 2] = rz;
    }

    // Wide grid plane below the camera line.
    const gx = (i % side) / side - 0.5;
    const gz = Math.floor(i / side) / side - 0.5;
    plane[i3] = gx * 16 + (Math.random() - 0.5) * 0.04;
    plane[i3 + 1] = -1.6;
    plane[i3 + 2] = gz * 12 - 1.5;
  }

  return { sphere, ring, plane, seed };
}

type Props = { count: number; reducedMotion: boolean };

export function ParticleField({ count, reducedMotion }: Props) {
  const group = useRef<Group>(null);
  const material = useRef<ShaderMaterial>(null);
  const lastY = useRef<number | null>(null);
  const dpr = useThree((s) => s.viewport.dpr);

  const { sphere, ring, plane, seed } = useMemo(() => buildFormations(count), [count]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uVelocity: { value: 0 },
      uSize: { value: 30 },
      uPixelRatio: { value: 1 },
      uPointer: { value: [0, 0] as [number, number] },
      uColor: { value: new Color("#72f3df") },
      uHot: { value: new Color("#f2f7f6") },
    }),
    [],
  );

  useFrame((state, rawDelta) => {
    const m = material.current;
    const g = group.current;
    if (!m || !g) return;
    // Clamp delta so a backgrounded tab doesn't produce a huge velocity spike on return.
    const delta = Math.min(rawDelta, 1 / 20);
    const u = m.uniforms;

    // Velocity in viewports per second, normalised and damped.
    const prev = lastY.current ?? scrollSignal.y;
    lastY.current = scrollSignal.y;
    const raw = rawDelta > 0 ? (scrollSignal.y - prev) / rawDelta / window.innerHeight : 0;
    const target = reducedMotion ? 0 : MathUtils.clamp(raw / 2.5, -1, 1);
    scrollSignal.velocity = MathUtils.damp(scrollSignal.velocity, target, 5, delta);
    scrollSignal.smoothProgress = MathUtils.damp(
      scrollSignal.smoothProgress,
      scrollSignal.progress,
      reducedMotion ? 100 : 4.5,
      delta,
    );

    u.uTime.value += reducedMotion ? 0 : delta;
    u.uProgress.value = scrollSignal.smoothProgress;
    u.uVelocity.value = scrollSignal.velocity;
    u.uPixelRatio.value = dpr;
    const ptr = u.uPointer.value as [number, number];
    ptr[0] = MathUtils.damp(ptr[0], scrollSignal.pointerX, 3, delta);
    ptr[1] = MathUtils.damp(ptr[1], scrollSignal.pointerY, 3, delta);

    if (!reducedMotion) {
      const speed = Math.abs(scrollSignal.velocity);
      g.rotation.y += delta * (0.045 + speed * 0.9) * (scrollSignal.velocity < 0 ? -1 : 1);
      g.rotation.x = MathUtils.damp(
        g.rotation.x,
        ptr[1] * 0.12 + scrollSignal.smoothProgress * 0.35,
        2.5,
        delta,
      );
      g.rotation.z = MathUtils.damp(g.rotation.z, -ptr[0] * 0.06, 2.5, delta);
    }

    // On wide screens the hero formation sits right of the headline, then drifts to centre.
    const aspect = state.size.width / Math.max(state.size.height, 1);
    const heroOffset = aspect > 1.2 ? 2.4 : 0;
    const settle = MathUtils.smoothstep(scrollSignal.smoothProgress, 0, 0.45);
    g.position.x = heroOffset * (1 - settle);
    // Portrait screens see a narrow horizontal slice: shrink so the formations stay legible.
    g.scale.setScalar(aspect < 1 ? Math.max(aspect * 1.05, 0.5) : 1);

    // Dolly slightly toward the plane as the page progresses.
    state.camera.position.z = 7 - scrollSignal.smoothProgress * 1.2;
    state.camera.position.y = scrollSignal.smoothProgress * 0.6;
    state.camera.lookAt(0, -scrollSignal.smoothProgress * 0.4, 0);
  });

  return (
    <group ref={group}>
      <points frustumCulled={false}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[sphere, 3]} />
          <bufferAttribute attach="attributes-aRing" args={[ring, 3]} />
          <bufferAttribute attach="attributes-aPlane" args={[plane, 3]} />
          <bufferAttribute attach="attributes-aSeed" args={[seed, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

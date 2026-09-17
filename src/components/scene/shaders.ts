/**
 * Point-field shader. Three formations blend on scroll progress:
 *   0.0  constellation sphere  (hero)
 *   0.5  twin signal rings     (mid page)
 *   1.0  undulating data plane (page end)
 * Scroll velocity drives a flow-field warp, a radial ripple and a directional shear.
 */
export const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform float uProgress;
  uniform float uVelocity;
  uniform float uSize;
  uniform float uPixelRatio;
  uniform vec2 uPointer;

  attribute vec3 aRing;
  attribute vec3 aPlane;
  attribute float aSeed;

  varying float vAlpha;
  varying float vHeat;

  void main() {
    float p = uProgress * 2.0;
    float toRing = smoothstep(0.0, 1.0, clamp(p, 0.0, 1.0));
    float toPlane = smoothstep(0.0, 1.0, clamp(p - 1.0, 0.0, 1.0));
    vec3 pos = mix(mix(position, aRing, toRing), aPlane, toPlane);

    float speed = abs(uVelocity);
    float t = uTime * 0.22;
    float phase = aSeed * 6.2831;

    // Ambient flow field; amplitude grows with scroll speed.
    vec3 flow = vec3(
      sin(pos.y * 1.35 + t + phase),
      cos(pos.z * 1.10 - t * 1.3 + phase),
      sin(pos.x * 1.20 + t * 0.8)
    );
    pos += flow * (0.045 + speed * 0.42);

    // Terrain wave, only once the plane has formed.
    pos.y += toPlane * sin(pos.x * 1.1 + uTime * 0.55) * cos(pos.z * 0.85 + uTime * 0.35) * 0.42;

    // Velocity ripple travelling outward from the centre.
    float r = length(pos.xz);
    pos.xyz *= 1.0 + speed * 0.18 * sin(r * 2.4 - uTime * 3.0);

    // Directional shear: particles trail behind the scroll direction.
    pos.y += uVelocity * (0.35 + aSeed * 1.1);

    // Soft pointer repulsion in view space.
    vec4 mv = modelViewMatrix * vec4(pos, 1.0);
    vec2 toPointer = mv.xy - uPointer * vec2(4.0, 2.4);
    float push = exp(-dot(toPointer, toPointer) * 0.9);
    mv.xy += normalize(toPointer + 1e-4) * push * 0.35;

    gl_Position = projectionMatrix * mv;

    float depth = -mv.z;
    gl_PointSize = uSize * uPixelRatio * (0.55 + aSeed * 0.9) * (1.0 + speed * 0.6) / depth;

    vHeat = clamp(speed * 1.4 + push * 0.8 + step(0.985, aSeed), 0.0, 1.0);
    vAlpha = clamp(1.25 - depth * 0.085, 0.12, 1.0);
  }
`;

export const fragmentShader = /* glsl */ `
  uniform vec3 uColor;
  uniform vec3 uHot;

  varying float vAlpha;
  varying float vHeat;

  void main() {
    vec2 c = gl_PointCoord - 0.5;
    float d = length(c);
    if (d > 0.5) discard;
    float core = smoothstep(0.5, 0.0, d);
    float glow = pow(core, 2.2);
    vec3 color = mix(uColor, uHot, vHeat);
    gl_FragColor = vec4(color * (0.45 + glow), glow * vAlpha * 0.75);
  }
`;

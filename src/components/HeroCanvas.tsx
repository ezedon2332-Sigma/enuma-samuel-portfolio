import { Suspense, useMemo, useRef } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'

const vertexShader = /* glsl */ `
  uniform float uTime;
  uniform vec2  uMouse;
  uniform float uPixelRatio;
  attribute float aScale;
  attribute float aSpeed;
  attribute vec3  aTint;
  varying float vAlpha;
  varying vec3  vTint;

  void main() {
    vec3 p = position;

    // slow vertical drift, wrapping through the field
    p.y = mod(p.y + uTime * aSpeed * 0.35 + 8.0, 16.0) - 8.0;

    // gentle swirl so the field never looks static
    float s = sin(uTime * 0.22 + p.y * 0.35);
    float c = cos(uTime * 0.18 + p.x * 0.3);
    p.x += s * 0.28;
    p.z += c * 0.28;

    // parallax toward the pointer, stronger for nearer particles
    float depth = (p.z + 6.0) / 12.0;
    p.x += uMouse.x * (0.55 + depth * 0.9);
    p.y += uMouse.y * (0.35 + depth * 0.6);

    vec4 mv = modelViewMatrix * vec4(p, 1.0);
    gl_Position = projectionMatrix * mv;
    gl_PointSize = aScale * uPixelRatio * (34.0 / -mv.z);

    // fade at the field edges + a breathing twinkle
    float edge = smoothstep(8.0, 3.2, abs(p.y)) * smoothstep(9.0, 4.0, abs(p.x));
    float twinkle = 0.55 + 0.45 * sin(uTime * 1.6 * aSpeed + p.x * 3.0 + p.y * 2.0);
    vAlpha = edge * twinkle;
    vTint = aTint;
  }
`

const fragmentShader = /* glsl */ `
  varying float vAlpha;
  varying vec3  vTint;

  void main() {
    // soft round sprite, no texture needed
    float d = length(gl_PointCoord - vec2(0.5));
    float core = smoothstep(0.5, 0.0, d);
    float halo = smoothstep(0.5, 0.18, d);
    float a = (core * 0.55 + halo * 0.45) * vAlpha * 0.42;
    if (a < 0.01) discard;
    gl_FragColor = vec4(vTint, a);
  }
`

function ParticleField({ count = 620 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null)
  const { viewport } = useThree()
  const pointer = useRef(new THREE.Vector2(0, 0))
  const smoothed = useRef(new THREE.Vector2(0, 0))

  const { geometry, uniforms } = useMemo(() => {
    const positions = new Float32Array(count * 3)
    const scales = new Float32Array(count)
    const speeds = new Float32Array(count)
    const tints = new Float32Array(count * 3)

    // the three blues of the key light, weighted toward the deep electric blue
    const palette = [
      new THREE.Color('#4d86ff'),
      new THREE.Color('#1d5cff'),
      new THREE.Color('#2d5fd0'),
    ]

    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 17
      positions[i * 3 + 1] = (Math.random() - 0.5) * 16
      positions[i * 3 + 2] = (Math.random() - 0.5) * 11

      scales[i] = Math.random() * Math.random() * 3.2 + 0.8
      speeds[i] = 0.35 + Math.random() * 1.1

      const c = palette[Math.random() < 0.62 ? 1 : Math.random() < 0.6 ? 0 : 2]
      tints[i * 3] = c.r
      tints[i * 3 + 1] = c.g
      tints[i * 3 + 2] = c.b
    }

    const g = new THREE.BufferGeometry()
    g.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    g.setAttribute('aScale', new THREE.BufferAttribute(scales, 1))
    g.setAttribute('aSpeed', new THREE.BufferAttribute(speeds, 1))
    g.setAttribute('aTint', new THREE.BufferAttribute(tints, 3))

    return {
      geometry: g,
      uniforms: {
        uTime: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
    }
  }, [count])

  useFrame((state, delta) => {
    uniforms.uTime.value += delta

    // normalised pointer, eased so the parallax glides instead of snapping
    pointer.current.set(
      state.pointer.x * (viewport.width > 0 ? 1 : 0),
      state.pointer.y,
    )
    smoothed.current.lerp(pointer.current, 1 - Math.pow(0.001, delta))
    uniforms.uMouse.value.copy(smoothed.current)

    if (ref.current) {
      ref.current.rotation.y = smoothed.current.x * 0.12
      ref.current.rotation.x = -smoothed.current.y * 0.08
    }
  })

  return (
    <points ref={ref} geometry={geometry}>
      <shaderMaterial
        uniforms={uniforms}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

/** Volumetric-looking core glow sitting behind the figure. */
function CoreGlow() {
  const mat = useRef<THREE.ShaderMaterial>(null)

  const uniforms = useMemo(() => ({ uTime: { value: 0 } }), [])

  useFrame((_, delta) => {
    uniforms.uTime.value += delta
  })

  return (
    <mesh position={[0, 0.2, -3]} scale={9}>
      <planeGeometry args={[1, 1]} />
      <shaderMaterial
        ref={mat}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        vertexShader={/* glsl */ `
          varying vec2 vUv;
          void main() {
            vUv = uv;
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
          }
        `}
        fragmentShader={/* glsl */ `
          uniform float uTime;
          varying vec2 vUv;
          void main() {
            vec2 p = vUv - 0.5;
            float r = length(p);
            float breathe = 0.5 + 0.5 * sin(uTime * 0.5);

            // wide soft bloom
            float bloom = smoothstep(0.5, 0.0, r) * (0.16 + 0.05 * breathe);
            // the bright rim ring of the key light
            float ring  = smoothstep(0.022, 0.0, abs(r - (0.335 + 0.006 * breathe))) * 0.16;

            vec3 col = mix(vec3(0.05, 0.22, 0.85), vec3(0.45, 0.66, 1.0), smoothstep(0.42, 0.0, r));
            gl_FragColor = vec4(col, bloom + ring);
          }
        `}
      />
    </mesh>
  )
}

export default function HeroCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      camera={{ position: [0, 0, 9], fov: 52 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      // pointer events stay with the DOM above it
      style={{ pointerEvents: 'none' }}
    >
      <Suspense fallback={null}>
        <CoreGlow />
        <ParticleField />
      </Suspense>
    </Canvas>
  )
}

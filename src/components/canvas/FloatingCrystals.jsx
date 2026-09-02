import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';

// ─────────────────────────────────────────────────────────────────────────────
// SHAPE MANIFEST
// A hand-tuned, organically dispersed spread of three geometry types across the
// Z corridor the camera flies through (Z: -1 → -14).
// Each entry: type, position, scale, rotation speeds, float params, material tint.
// ─────────────────────────────────────────────────────────────────────────────
const SHAPES = [
  // ── Large foreground octahedron — right side
  {
    geo: 'oct',  pos: [2.6,  0.5,  -2],  scale: 1.1,
    rx: 0.30, ry: 0.50,  color: '#d4af37', emissive: '#b8860b', eI: 0.55,
    fs: 1.5,  fr: 2.0, fi: 2.0,
  },
  // ── Medium dodecahedron — left, slightly back
  {
    geo: 'ico1', pos: [-2.9, -0.7, -4],  scale: 0.82,
    rx:-0.18, ry: 0.28,  color: '#e8c84a', emissive: '#d4af37', eI: 0.50,
    fs: 1.6,  fr: 2.0, fi: 1.8,
  },
  // ── Hexagonal prism — centre-top, flat disc look
  {
    geo: 'hex',  pos: [0.4,  2.1,  -6],  scale: [0.58, 0.85, 0.58],
    rx: 0.35, ry:-0.15,  color: '#f9f1d8', emissive: '#e5c158', eI: 0.70,
    fs: 1.2,  fr: 1.5, fi: 2.0,
  },
  // ── Low-poly icosahedron — left-deep
  {
    geo: 'ico0', pos: [-1.6, -1.7, -8],  scale: 0.92,
    rx: 0.12, ry: 0.40,  color: '#d4af37', emissive: '#bf9b30', eI: 0.48,
    fs: 1.8,  fr: 2.0, fi: 1.6,
  },
  // ── Small octahedron — right, deep
  {
    geo: 'oct',  pos: [3.4, -1.1, -10], scale: 0.58,
    rx:-0.28, ry: 0.18,  color: '#e5c158', emissive: '#d4af37', eI: 0.62,
    fs: 2.0,  fr: 2.0, fi: 2.0,
  },
  // ── Tall hexagonal prism — left far
  {
    geo: 'hex',  pos: [-3.6, 1.2, -12], scale: [0.42, 1.3, 0.42],
    rx: 0.22, ry:-0.32,  color: '#bf9b30', emissive: '#d4af37', eI: 0.50,
    fs: 1.3,  fr: 1.8, fi: 1.5,
  },
  // ── Tiny sharp icosahedron — front low
  {
    geo: 'ico0', pos: [0.9, -2.4,  -5], scale: 0.46,
    rx:-0.40, ry: 0.14,  color: '#f9f1d8', emissive: '#e5c158', eI: 0.80,
    fs: 2.2,  fr: 2.0, fi: 2.0,
  },
  // ── Mid-detail icosahedron — right-mid
  {
    geo: 'ico1', pos: [1.6,  0.9,  -7], scale: 0.68,
    rx: 0.10, ry: 0.55,  color: '#d4af37', emissive: '#b8860b', eI: 0.58,
    fs: 1.5,  fr: 2.0, fi: 1.8,
  },
  // ── Extra hex prism — right far background
  {
    geo: 'hex',  pos: [2.2, -0.3, -13], scale: [0.35, 1.0, 0.35],
    rx: 0.14, ry: 0.28,  color: '#e5c158', emissive: '#d4af37', eI: 0.52,
    fs: 1.4,  fr: 1.6, fi: 1.4,
  },
  // ── Wide octahedron — upper-left background
  {
    geo: 'oct',  pos: [-2.0, 2.5, -11], scale: 0.72,
    rx: 0.20, ry:-0.25,  color: '#d4af37', emissive: '#e5c158', eI: 0.60,
    fs: 1.7,  fr: 2.0, fi: 1.7,
  },
];

// Accent octahedra — tiny, very high emissive to seed bright Bloom sparkle points
const ACCENTS = [
  { pos: [1.9, -0.4,  -3],  scale: 0.26, color: '#f9f1d8', emissive: '#e5c158', eI: 1.2 },
  { pos: [-1.3, 1.4,  -7],  scale: 0.20, color: '#e5c158', emissive: '#d4af37', eI: 1.0 },
  { pos: [3.9,  0.6,  -9],  scale: 0.17, color: '#bf9b30', emissive: '#d4af37', eI: 1.3 },
  { pos: [-2.3,-2.2, -11],  scale: 0.24, color: '#f9f1d8', emissive: '#e5c158', eI: 1.1 },
  { pos: [2.0,  2.6, -13],  scale: 0.19, color: '#e5c158', emissive: '#bf9b30', eI: 1.0 },
  { pos: [-0.9,-1.0,  -4],  scale: 0.14, color: '#d4af37', emissive: '#e5c158', eI: 1.4 },
];

// ─────────────────────────────────────────────────────────────────────────────
// Geometry switcher
// ─────────────────────────────────────────────────────────────────────────────
function Geo({ type }) {
  if (type === 'oct')  return <octahedronGeometry  args={[1, 0]} />;
  if (type === 'ico0') return <icosahedronGeometry  args={[1, 0]} />;
  if (type === 'ico1') return <icosahedronGeometry  args={[1, 1]} />;
  if (type === 'hex')  return <cylinderGeometry     args={[1, 1, 1, 6]} />;
  return <octahedronGeometry args={[1, 0]} />;
}

// ─────────────────────────────────────────────────────────────────────────────
// Individual crystal — Float + meshPhysicalMaterial + pointer-reactive rotation
// ─────────────────────────────────────────────────────────────────────────────
function Crystal({ geo, pos, scale, rx, ry, color, emissive, eI, fs, fr, fi, pointer }) {
  const mesh = useRef();

  useFrame(({ clock }) => {
    if (!mesh.current) return;
    const t = clock.getElapsedTime();
    mesh.current.rotation.x = t * rx + pointer.current.y * 0.12;
    mesh.current.rotation.y = t * ry + pointer.current.x * 0.12;
  });

  return (
    <Float speed={fs} rotationIntensity={fr} floatIntensity={fi}>
      <mesh ref={mesh} position={pos} scale={scale} castShadow>
        <Geo type={geo} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0.1}
          emissive={emissive}
          emissiveIntensity={eI}
          envMapIntensity={3.5}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={1}
        />
      </mesh>
    </Float>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Accent gem — tiny sharp octahedron, maximum emissive for Bloom sparkle
// ─────────────────────────────────────────────────────────────────────────────
function AccentGem({ pos, scale, color, emissive, eI, pointer }) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime();
    ref.current.rotation.x = t * 0.65;
    ref.current.rotation.y = t * 0.90 + pointer.current.x * 0.20;
  });

  return (
    <Float speed={2.6} rotationIntensity={2} floatIntensity={2}>
      <mesh ref={ref} position={pos} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshPhysicalMaterial
          color={color}
          metalness={1}
          roughness={0}
          emissive={emissive}
          emissiveIntensity={eI}
          envMapIntensity={5}
          clearcoat={1}
          clearcoatRoughness={0}
        />
      </mesh>
    </Float>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// Root export — group-level slow rotation keeps scene alive at rest
// ─────────────────────────────────────────────────────────────────────────────
export default function FloatingCrystals({ pointer }) {
  const groupRef = useRef();

  // Slow, gentle world-rotation of the entire crystal field
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.04;   // ~1 full revolution every ~157 s
    groupRef.current.rotation.x = Math.sin(t * 0.08) * 0.06; // subtle tilt oscillation
  });

  return (
    <group ref={groupRef}>
      {SHAPES.map((cfg, i) => (
        <Crystal key={`crystal-${i}`} {...cfg} pointer={pointer} />
      ))}
      {ACCENTS.map((cfg, i) => (
        <AccentGem key={`accent-${i}`} {...cfg} pointer={pointer} />
      ))}
    </group>
  );
}

import React, { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import * as THREE from 'three';

// Config for each crystal — position, scale, rotation speed, distort amount
const CRYSTAL_CONFIG = [
  { pos: [2.5, 0.5, -2],   scale: 1.1,  speedX: 0.3,  speedY: 0.5,  distort: 0.25, detail: 2 },
  { pos: [-2.8, -0.8, -4], scale: 0.75, speedX: -0.2, speedY: 0.3,  distort: 0.3,  detail: 1 },
  { pos: [0.5, 1.8, -6],   scale: 0.6,  speedX: 0.4,  speedY: -0.2, distort: 0.2,  detail: 2 },
  { pos: [-1.5, -1.5, -8], scale: 0.9,  speedX: 0.15, speedY: 0.4,  distort: 0.35, detail: 1 },
  { pos: [3.2, -1.2, -10], scale: 0.55, speedX: -0.3, speedY: 0.2,  distort: 0.2,  detail: 2 },
  { pos: [-3.5, 1.0, -12], scale: 0.7,  speedX: 0.25, speedY: -0.35,distort: 0.28, detail: 1 },
  { pos: [1.0, -2.2, -5],  scale: 0.45, speedX: -0.4, speedY: 0.15, distort: 0.4,  detail: 0 },
];

function Crystal({ position, scale, speedX, speedY, distort, detail, pointer }) {
  const meshRef = useRef();

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();
    meshRef.current.rotation.x = t * speedX + pointer.current.y * 0.15;
    meshRef.current.rotation.y = t * speedY + pointer.current.x * 0.15;
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.6}>
      <mesh ref={meshRef} position={position} scale={scale} castShadow>
        <icosahedronGeometry args={[1, detail]} />
        <MeshDistortMaterial
          color="#d4af37"
          metalness={0.95}
          roughness={0.05}
          distort={distort}
          speed={2}
          envMapIntensity={2.5}
        />
      </mesh>
    </Float>
  );
}

// Secondary small accent gems — octahedra
const ACCENT_CONFIG = [
  { pos: [1.8, -0.5, -3],   scale: 0.3,  color: '#f9f1d8' },
  { pos: [-1.2, 1.2, -7],   scale: 0.25, color: '#e5c158' },
  { pos: [3.8, 0.5, -9],    scale: 0.2,  color: '#bf9b30' },
  { pos: [-2.2, -2.0, -11], scale: 0.28, color: '#f9f1d8' },
];

function AccentGem({ position, scale, color, pointer }) {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.x = clock.getElapsedTime() * 0.6;
    ref.current.rotation.y = clock.getElapsedTime() * 0.8 + pointer.current.x * 0.2;
  });
  return (
    <Float speed={2} floatIntensity={1.2}>
      <mesh ref={ref} position={position} scale={scale}>
        <octahedronGeometry args={[1, 0]} />
        <meshStandardMaterial
          color={color}
          metalness={1}
          roughness={0}
          envMapIntensity={3}
        />
      </mesh>
    </Float>
  );
}

export default function FloatingCrystals({ pointer }) {
  return (
    <group>
      {CRYSTAL_CONFIG.map((cfg, i) => (
        <Crystal key={i} {...cfg} position={cfg.pos} pointer={pointer} />
      ))}
      {ACCENT_CONFIG.map((cfg, i) => (
        <AccentGem key={i} {...cfg} position={cfg.pos} pointer={pointer} />
      ))}
    </group>
  );
}

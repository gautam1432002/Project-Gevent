import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

export default function Lighting() {
  const { ambientIntensity, isDark } = useTheme();
  const dirLightRef = useRef();

  // Slowly rotate the directional light for dynamic sheen on crystals
  useFrame(({ clock }) => {
    if (dirLightRef.current) {
      const t = clock.getElapsedTime() * 0.3;
      dirLightRef.current.position.x = Math.sin(t) * 5;
      dirLightRef.current.position.z = Math.cos(t) * 5;
    }
  });

  return (
    <>
      {/* HDRI environment for realistic metallic reflections */}
      <Environment preset="studio" background={false} />

      {/* Ambient — intensity synced to ThemeContext */}
      <ambientLight
        intensity={ambientIntensity}
        color={isDark ? '#a78bfa' : '#fff8e7'}
      />

      {/* Warm gold directional fill — orbits the scene */}
      <directionalLight
        ref={dirLightRef}
        position={[5, 8, 5]}
        intensity={isDark ? 1.5 : 2.5}
        color="#e5c158"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
      />

      {/* Cool rim light from behind */}
      <directionalLight
        position={[-5, -3, -5]}
        intensity={isDark ? 0.6 : 0.3}
        color={isDark ? '#818cf8' : '#fde8c8'}
      />

      {/* Point light — warm glow at scene centre */}
      <pointLight
        position={[0, 0, 2]}
        intensity={isDark ? 1.2 : 0.8}
        color="#d4af37"
        distance={15}
        decay={2}
      />

      {/* Star field — only visible in dark mode */}
      {isDark && <Stars radius={80} depth={50} count={2000} factor={3} fade />}
    </>
  );
}

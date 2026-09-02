import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useTheme } from '../../context/ThemeContext';
import { Environment, Stars } from '@react-three/drei';
import * as THREE from 'three';

/**
 * Lighting — theme-reactive lights calibrated for meshPhysicalMaterial crystals.
 *
 * Strategy:
 *  - Environment "city" gives urban HDRI reflections: crisp specular hits on each
 *    crystal facet, feeding bright local luminance that trips the Bloom threshold.
 *  - A slowly orbiting warm directional light sweeps the facets continuously so the
 *    bloom glint travels across the shapes even when the user is still.
 *  - Ambient is kept LOW in light mode (0.5) and even lower in dark (0.25) so the
 *    env/directional lights dominate and create contrast — this is what produces the
 *    sharp bright-edge / dark-face look on low-poly crystals.
 *  - Two additional rim/fill lights add chromatic depth (warm gold + cool silver).
 *
 * Light mode is the default (isDark = false). All intensities are tuned for that.
 */
export default function Lighting() {
  const { ambientIntensity, isDark } = useTheme();
  const dirRef  = useRef();
  const rimRef  = useRef();

  // Orbit the key directional light — produces traveling specular gleam on facets
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.25; // slow sweep
    if (dirRef.current) {
      dirRef.current.position.x = Math.sin(t) * 6;
      dirRef.current.position.z = Math.cos(t) * 4;
      dirRef.current.position.y = Math.sin(t * 0.5) * 3 + 5; // gentle vertical bob
    }
    if (rimRef.current) {
      // Counter-orbit the rim for continuous dual-highlight
      rimRef.current.position.x = Math.cos(t + Math.PI) * 5;
      rimRef.current.position.z = Math.sin(t + Math.PI) * 4;
    }
  });

  return (
    <>
      {/*
        HDRI Environment — "city" preset delivers crisp, high-contrast reflections:
        hard specular hits on the crystal facets that exceed the Bloom threshold
        and generate the sharp-edge gleam requested.
        background={false} keeps the canvas transparent for dual-theme HTML overlay.
      */}
      <Environment preset="city" background={false} />

      {/*
        Ambient — deliberately subdued so env/directional lights dominate.
        Low ambient = high face contrast = crystal look.
        ThemeContext supplies ambientIntensity (0.4 dark / 1.2 light), but we
        scale it down further here to preserve crystal facet contrast.
      */}
      <ambientLight
        intensity={isDark ? 0.22 : 0.45}
        color={isDark ? '#c4b5fd' : '#fff8e7'}
      />

      {/*
        Key directional light — warm gold, orbits the scene.
        High intensity to push specular highlights above Bloom threshold.
      */}
      <directionalLight
        ref={dirRef}
        position={[5, 8, 4]}
        intensity={isDark ? 2.2 : 3.5}
        color="#f0c040"
        castShadow
        shadow-mapSize-width={1024}
        shadow-mapSize-height={1024}
        shadow-bias={-0.001}
      />

      {/*
        Rim/back light — counter-orbits, cool silver tone.
        Creates the secondary highlight on opposite facets.
      */}
      <directionalLight
        ref={rimRef}
        position={[-5, -2, -4]}
        intensity={isDark ? 0.8 : 1.2}
        color={isDark ? '#a5b4fc' : '#ffe4a0'}
      />

      {/*
        Centre point light — warm gold halo, tight decay.
        Lifts the emissive glow of nearby crystals without flooding the scene.
      */}
      <pointLight
        position={[0, 0, 2]}
        intensity={isDark ? 1.8 : 2.4}
        color="#d4af37"
        distance={18}
        decay={2}
      />

      {/*
        Fill point light — slightly cooler, from below.
        Adds chromatic separation between upper and lower faces.
      */}
      <pointLight
        position={[0, -4, -3]}
        intensity={isDark ? 0.6 : 0.9}
        color={isDark ? '#818cf8' : '#fde8c8'}
        distance={12}
        decay={2}
      />

      {/* Star field — only in dark mode */}
      {isDark && <Stars radius={80} depth={50} count={2000} factor={3} fade />}
    </>
  );
}

import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette } from '@react-three/postprocessing';
import { AdaptiveDpr, PerformanceMonitor } from '@react-three/drei';

import Lighting from './Lighting';
import FloatingCrystals from './FloatingCrystals';
import ParticleField from './ParticleField';
import CameraRig from './CameraRig';

/**
 * Scene — The root R3F Canvas for Guru Events.
 * Receives:
 *  - scrollProgress (0–1) from useScrollProgress
 *  - pointer ref from usePointerNormalized
 */
export default function Scene({ scrollProgress, pointer }) {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        toneMapping: 4, // ACESFilmicToneMapping
        toneMappingExposure: 1.35, // lifted slightly for brighter crystal specular peaks
      }}
      shadows
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      {/* Performance-adaptive resolution scaling */}
      <PerformanceMonitor
        onDecline={() => console.info('GPU throttle: lowering DPR')}
      />
      <AdaptiveDpr pixelated />

      {/* Scroll + pointer driven camera */}
      <CameraRig scrollProgress={scrollProgress} pointer={pointer} />

      {/* Lighting — synced to ThemeContext */}
      <Suspense fallback={null}>
        <Lighting />
        <FloatingCrystals pointer={pointer} />
        <ParticleField />
      </Suspense>

      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom
          intensity={1.6}
          luminanceThreshold={0.4}   // lower threshold — catches sharp crystal-edge specular hits
          luminanceSmoothing={0.7}   // tighter smooth — crisper gleam, not soft glow
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.3} darkness={0.7} />
      </EffectComposer>
    </Canvas>
  );
}

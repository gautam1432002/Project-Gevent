import { useRef } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/**
 * CameraRig — Drives the R3F camera based on:
 *  1. Scroll progress (0→1) → camera Z-axis fly-through (6 → 1)
 *  2. Pointer position    → subtle X/Y lateral drift
 *
 * Uses lerp for smooth, eased transitions.
 */
export default function CameraRig({ scrollProgress, pointer }) {
  const { camera } = useThree();
  const targetPos = useRef(new THREE.Vector3(0, 0, 6));

  useFrame(() => {
    // Map scroll 0→1 to Z 6→1 (fly forward through crystal field)
    const targetZ = 6 - scrollProgress * 5;
    // Lateral drift from pointer: ±0.5 on X, ±0.25 on Y
    const targetX = pointer.current.x * 0.5;
    const targetY = pointer.current.y * 0.25;

    targetPos.current.set(targetX, targetY, targetZ);

    // Smooth lerp to target
    camera.position.lerp(targetPos.current, 0.04);

    // Slight look-at drift — keep gaze roughly centered
    camera.lookAt(
      pointer.current.x * 0.3,
      pointer.current.y * 0.2,
      0
    );
  });

  return null;
}

import { useEffect, useRef, useState } from 'react';

/**
 * Returns a normalized scroll progress value between 0 and 1.
 * 0 = top of page, 1 = bottom of page.
 * Designed to be consumed by the R3F CameraRig for Z-axis fly-through.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const normalized = docHeight > 0 ? scrollTop / docHeight : 0;
      setProgress(Math.min(Math.max(normalized, 0), 1));
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // initial call
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return progress;
}

/**
 * Returns live normalized pointer position { x, y } in range [-1, 1].
 * Used to add subtle lateral camera drift reacting to mouse movement.
 */
export function usePointerNormalized() {
  const pointer = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => {
      pointer.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };
    window.addEventListener('mousemove', handleMove);
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return pointer;
}

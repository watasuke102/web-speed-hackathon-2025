import { useEffect, useRef, useState } from 'react';

const MIN_WIDTH = 276;
const GAP = 12;

// repeat(auto-fill, minmax(276px, 1fr)) を計算で求める
export function useCarouselItemWidth() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState(MIN_WIDTH);

  useEffect(() => {
    const observer = new ResizeObserver(() => {
      if (!containerRef.current) {
        return;
      }
      const styles = window.getComputedStyle(containerRef.current);
      const innerWidth =
        containerRef.current.clientWidth - parseInt(styles.paddingLeft) - parseInt(styles.paddingRight);
      const itemCount = Math.max(0, Math.floor((innerWidth + GAP) / (MIN_WIDTH + GAP)));
      setWidth(Math.floor((innerWidth + GAP) / itemCount - GAP));
    });
    if (!containerRef.current) {
      return;
    }
    observer.observe(containerRef.current);
    return () => {
      if (containerRef.current) {
        observer.unobserve(containerRef.current);
      }
    };
  }, [containerRef]);

  return { ref: containerRef, width };
}

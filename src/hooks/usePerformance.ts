import { useEffect, useRef, useState } from 'react';

interface PerformanceMetrics {
  renderTime: number;
  isVisible: boolean;
  loadTime: number;
}

interface UsePerformanceOptions {
  trackRender?: boolean;
  trackLoad?: boolean;
  onMetrics?: (metrics: PerformanceMetrics) => void;
}

export const usePerformance = (
  componentName: string,
  options: UsePerformanceOptions = {}
) => {
  const { trackRender = true, trackLoad = true, onMetrics } = options;
  
  const renderStartTime = useRef<number>(performance.now());
  const mountTime = useRef<number>(performance.now());
  const [metrics, setMetrics] = useState<PerformanceMetrics>({
    renderTime: 0,
    isVisible: false,
    loadTime: 0
  });

  const elementRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (trackLoad) {
      const loadTime = performance.now() - mountTime.current;
      const newMetrics = { ...metrics, loadTime };
      setMetrics(newMetrics);
      
      if (onMetrics) {
        onMetrics(newMetrics);
      }
    }
  }, []);

  useEffect(() => {
    if (trackRender) {
      const renderTime = performance.now() - renderStartTime.current;
      const newMetrics = { ...metrics, renderTime };
      setMetrics(newMetrics);
      
      // Log performance in development
      if (process.env.NODE_ENV === 'development') {
        console.log(`${componentName} render time:`, renderTime.toFixed(2), 'ms');
      }
    }
  });

  useEffect(() => {
    if (!elementRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        const newMetrics = { ...metrics, isVisible: entry.isIntersecting };
        setMetrics(newMetrics);
        
        if (onMetrics) {
          onMetrics(newMetrics);
        }
      },
      { threshold: 0.1 }
    );

    observer.observe(elementRef.current);

    return () => observer.disconnect();
  }, []);

  return { metrics, elementRef };
};
import { useEffect, useRef } from 'react';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

interface AnimatedCounterProps {
  end: number;
  suffix?: string;
  prefix?: string;
  duration?: number;
  delay?: number;
  className?: string;
}

const AnimatedCounter = ({ 
  end, 
  suffix = '', 
  prefix = '', 
  duration = 2000,
  delay = 0,
  className = ''
}: AnimatedCounterProps) => {
  const { elementRef, isVisible } = useScrollAnimation({ threshold: 0.3 });
  const { count, startAnimation } = useCountUp({ end, duration, delay });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (isVisible && !hasAnimated.current) {
      startAnimation();
      hasAnimated.current = true;
    }
  }, [isVisible, startAnimation]);

  return (
    <div 
      ref={elementRef}
      className={`${isVisible ? 'animate-counter' : 'opacity-0'} ${className}`}
    >
      {prefix}{count}{suffix}
    </div>
  );
};

export default AnimatedCounter;
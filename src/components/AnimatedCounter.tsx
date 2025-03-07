
import { useEffect, useState, useRef } from 'react';

interface AnimatedCounterProps {
  end: number;
  duration?: number;
  delay?: number;
  prefix?: string;
  suffix?: string;
}

const AnimatedCounter = ({
  end,
  duration = 2000,
  delay = 0,
  prefix = '',
  suffix = ''
}: AnimatedCounterProps) => {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.1 }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTimestamp: number | null = null;
    const step = (timestamp: number) => {
      if (!startTimestamp) {
        startTimestamp = timestamp + delay;
      }

      const elapsed = timestamp - startTimestamp;
      
      if (elapsed < 0) {
        requestAnimationFrame(step);
        return;
      }

      const progress = Math.min(elapsed / duration, 1);
      setCount(Math.floor(progress * end));

      if (progress < 1) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [end, duration, delay, isVisible]);

  return (
    <div ref={counterRef} className={`font-heading text-4xl font-bold transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      {prefix}{count}{suffix}
    </div>
  );
};

export default AnimatedCounter;

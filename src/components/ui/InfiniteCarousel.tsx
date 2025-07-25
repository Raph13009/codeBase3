import React, { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface CarouselItem {
  id: string;
  content: React.ReactNode;
}

interface InfiniteCarouselProps {
  items: CarouselItem[];
  speed?: number;
  direction?: 'left' | 'right';
  className?: string;
}

const InfiniteCarousel: React.FC<InfiniteCarouselProps> = ({
  items,
  speed = 20,
  direction = 'left',
  className = ''
}) => {
  const [duplicatedItems, setDuplicatedItems] = useState<CarouselItem[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Duplicate items many times for truly seamless infinite scroll
    setDuplicatedItems([...items, ...items, ...items, ...items, ...items, ...items]);
  }, [items]);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || duplicatedItems.length === 0) return;

    const containerWidth = container.scrollWidth / 6; // Divide by number of duplicates
    const animationDuration = containerWidth / speed;

    const animate = () => {
      const currentX = x.get();
      const targetX = direction === 'left' ? -containerWidth : containerWidth;
      
      const startTime = performance.now();
      
      const updateAnimation = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / (animationDuration * 1000), 1);
        
        const newX = currentX + (targetX - currentX) * progress;
        x.set(newX);
        
        if (progress < 1) {
          animationRef.current = requestAnimationFrame(updateAnimation);
        } else {
          // Reset position for infinite loop
          x.set(0);
          animate();
        }
      };
      
      animationRef.current = requestAnimationFrame(updateAnimation);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [x, speed, direction, duplicatedItems]);

  return (
    <div 
      ref={containerRef}
      className={`overflow-hidden ${className}`}
    >
      <motion.div
        className="flex gap-4 md:gap-6"
        style={{ x }}
      >
        {duplicatedItems.map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="flex-shrink-0"
          >
            {item.content}
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export default InfiniteCarousel; 
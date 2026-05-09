import { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);

  const springX = useSpring(0, { damping: 25, stiffness: 200 });
  const springY = useSpring(0, { damping: 25, stiffness: 200 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      springX.set(e.clientX);
      springY.set(e.clientY);

      const target = e.target as HTMLElement;
      setIsPointer(
        window.getComputedStyle(target).cursor === 'pointer' ||
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('button') !== null ||
        target.closest('a') !== null
      );
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [springX, springY]);

  return (
    <>
      <div 
        className="fixed top-0 left-0 w-3 h-3 bg-[#C8442A] rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2"
        style={{ left: position.x, top: position.y }}
      />
      <motion.div 
        className="fixed top-0 left-0 w-9 h-9 border border-[#D4A44C] rounded-full pointer-events-none z-[9998] -translate-x-1/2 -translate-y-1/2 opacity-50"
        style={{ 
          left: springX, 
          top: springY,
          scale: isPointer ? 1.5 : 1,
          opacity: isPointer ? 0.8 : 0.5,
        }}
      />
    </>
  );
};

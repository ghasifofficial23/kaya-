import { Reveal, ParallaxReveal } from './Reveal';
import { DISHES } from '../constants';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';
import { useRef, useEffect } from 'react';

export const Dishes = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    const handleWheel = (e: WheelEvent) => {
      // Only hijack vertical scrolls to scroll horizontally
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        const atStart = el.scrollLeft <= 0;
        const atEnd = Math.abs(el.scrollWidth - el.clientWidth - el.scrollLeft) < 1.5;

        if (e.deltaY > 0 && !atEnd) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        } else if (e.deltaY < 0 && !atStart) {
          e.preventDefault();
          el.scrollLeft += e.deltaY;
        }
      }
    };

    el.addEventListener('wheel', handleWheel, { passive: false });
    return () => el.removeEventListener('wheel', handleWheel);
  }, []);
  return (
    <section id="dishes" className="py-24 md:py-36 bg-[#2E2822] overflow-hidden">
      <ParallaxReveal type="opacity" speed={1.5} className="px-6 md:px-12 mb-20 text-center">
        <p className="font-jost text-[10px] tracking-[0.4em] uppercase text-[#D4A44C] mb-4">From the Kitchen</p>
        <h2 className="font-bebas text-5xl md:text-8xl leading-tight tracking-[0.04em] text-[#F5EFE0]">
          SIGNATURE<br />CREATIONS
        </h2>
      </ParallaxReveal>

      <div 
        ref={scrollRef}
        className="flex flex-row gap-0.5 overflow-x-auto overflow-y-hidden group/track [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pl-6 md:pl-0 after:content-[''] after:w-6 md:after:w-0 after:shrink-0"
      >
        {DISHES.map((dish, i) => (
          <motion.div 
            key={dish.id}
            initial={{ opacity: 0, x: 100 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.8 }}
            className={cn(
              "relative h-[480px] md:h-[560px] cursor-none overflow-hidden transition-all duration-700 ease-in-out w-[85vw] sm:w-[60vw] md:w-auto md:basis-[400px] hover:md:basis-[560px] flex-shrink-0",
              "group/card"
            )}
          >
            {dish.image ? (
              <img src={dish.image} alt={dish.name} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-110" />
            ) : (
              <div className={cn("absolute inset-0 bg-gradient-to-br transition-transform duration-700 group-hover/card:scale-110", dish.gradient)} />
            )}
            {dish.image && <div className={cn("absolute inset-0 bg-gradient-to-br opacity-50 mix-blend-multiply pointer-events-none", dish.gradient)} />}
            <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612] via-[#1A1612]/40 to-transparent transition-opacity duration-300" />
            
            <div className="absolute inset-x-0 bottom-0 p-8 space-y-2">
              <div className="text-[10px] tracking-[0.4em] uppercase text-[#D4A44C] transform translate-y-2 opacity-0 group-hover/card:translate-y-0 group-hover/card:opacity-100 transition-all duration-500">
                {dish.category}
              </div>
              <h3 className="font-bebas text-4xl tracking-widest text-[#F5EFE0] leading-none">
                {dish.name}
              </h3>
              <p className="font-serif text-sm italic text-[#F5EFE0]/55 leading-relaxed max-h-0 opacity-0 group-hover/card:max-h-20 group-hover/card:opacity-100 overflow-hidden transition-all duration-500">
                {dish.description}
              </p>
              <div className="font-bebas text-2xl text-[#C8442A] pt-3">
                {dish.price}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

import { Reveal, ParallaxReveal } from './Reveal';
import { DISHES } from '../constants';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { useRef, useEffect, useState } from 'react';
import { Dish } from '../types';
import { X } from 'lucide-react';

export const Dishes = () => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedDish, setSelectedDish] = useState<Dish | null>(null);

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
            onClick={() => setSelectedDish(dish)}
            className={cn(
              "relative h-[480px] md:h-[560px] cursor-none overflow-hidden transition-all duration-700 ease-in-out w-[85vw] sm:w-[60vw] md:w-auto md:basis-[400px] hover:md:basis-[560px] flex-shrink-0",
              "group/card cursor-pointer"
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
      <AnimatePresence>
        {selectedDish && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[100] bg-[#1A1612]/90 flex items-center justify-center p-6"
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 50 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 50 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="bg-[#25201B] border border-[#D4A44C]/30 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-sm flex flex-col md:flex-row relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedDish(null)}
                className="absolute top-4 right-4 z-50 text-[#F5EFE0] p-2 bg-black/40 rounded-full hover:bg-[#C8442A] transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Image Side */}
              <div className="md:w-1/2 relative h-64 md:h-auto overflow-hidden shrink-0">
                {selectedDish.image ? (
                  <img src={selectedDish.image} alt={selectedDish.name} className="absolute inset-0 w-full h-full object-cover" />
                ) : (
                  <div className={cn("absolute inset-0 bg-gradient-to-br", selectedDish.gradient)} />
                )}
                {selectedDish.image && <div className={cn("absolute inset-0 bg-gradient-to-br opacity-60 mix-blend-multiply", selectedDish.gradient)} />}
                <div className="absolute inset-0 bg-gradient-to-t from-[#25201B] md:bg-gradient-to-r md:from-transparent md:to-[#25201B] pointer-events-none" />
              </div>

              {/* Details Side */}
              <div className="md:w-1/2 p-8 md:p-12 flex flex-col justify-center space-y-8 relative z-10">
                <div className="space-y-2">
                  <p className="font-jost text-[10px] tracking-[0.4em] uppercase text-[#D4A44C]">{selectedDish.category}</p>
                  <h3 className="font-bebas text-5xl md:text-6xl text-[#F5EFE0] leading-none tracking-wider">{selectedDish.name}</h3>
                  <div className="font-bebas text-3xl text-[#C8442A]">{selectedDish.price}</div>
                </div>

                <p className="font-serif italic text-lg text-[#F5EFE0]/80 leading-relaxed">
                  {selectedDish.description}
                </p>

                <div className="space-y-6 pt-6 border-t border-[#D4A44C]/10">
                  {selectedDish.ingredients && (
                    <div>
                      <h4 className="font-bebas text-xl text-[#D4A44C] tracking-widest mb-3">Key Ingredients</h4>
                      <ul className="grid grid-cols-2 gap-2 text-sm text-[#8A8278] font-serif">
                        {selectedDish.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1 h-1 bg-[#C8442A] rounded-full" /> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className="grid grid-cols-2 gap-4">
                    {selectedDish.style && (
                      <div>
                        <h4 className="font-bebas text-lg text-[#D4A44C] tracking-widest mb-1">Style</h4>
                        <p className="text-sm text-[#F5EFE0]/60">{selectedDish.style}</p>
                      </div>
                    )}
                    {selectedDish.origin && (
                      <div>
                        <h4 className="font-bebas text-lg text-[#D4A44C] tracking-widest mb-1">Origin</h4>
                        <p className="text-sm text-[#F5EFE0]/60">{selectedDish.origin}</p>
                      </div>
                    )}
                  </div>
                </div>
                
                <button 
                  onClick={() => setSelectedDish(null)}
                  className="mt-4 border border-[#D4A44C]/30 text-[#D4A44C] py-3 hover:bg-[#D4A44C] hover:text-[#1A1612] font-bebas tracking-widest transition-all rounded-sm"
                >
                  Return to Menu
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

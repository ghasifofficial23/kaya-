import { motion, useScroll, useTransform } from 'motion/react';
import { HeroCanvas } from './HeroCanvas';

export const Hero = () => {
  const { scrollY } = useScroll();
  const stemHeight = useTransform(scrollY, [0, 800], [0, 800]);
  return (
    <section id="hero" className="relative w-screen h-screen min-h-[100dvh] overflow-hidden flex items-center justify-center bg-[#1A1612]">
      <HeroCanvas />

      <div className="absolute top-[22%] left-[8%] animate-float pointer-events-none text-[#D4A44C]/50 font-serif italic text-sm">
        Est. 1987
      </div>
      <div className="absolute top-[65%] right-[8%] animate-float pointer-events-none text-[#D4A44C]/50 font-serif italic text-sm delay-1000">
        Michelin ★★★
      </div>
      <div className="absolute top-[78%] left-[12%] animate-float pointer-events-none text-[#D4A44C]/50 font-serif italic text-sm delay-2000">
        New York
      </div>

      <div className="relative z-10 text-center pointer-events-none px-4 max-w-full">
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="font-jost text-[11px] tracking-[0.8em] uppercase text-[#D4A44C] mb-4"
        >
          Fine Dining Experience
        </motion.p>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.9, y: 40 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.9 }}
          className="font-bebas text-[clamp(80px,18vw,240px)] leading-[0.88] tracking-[0.05em] text-[#F5EFE0] drop-shadow-[0_0_120px_rgba(200,68,42,0.25)] relative"
        >
          KA<span className="text-[#C8442A] relative">
              Y
              <motion.div 
                className="absolute left-1/2 bottom-[18%] w-[clamp(6px,1.5vw,18px)] bg-gradient-to-b from-[#C8442A] to-transparent origin-top z-[-1]"
                style={{ height: stemHeight, x: '-50%' }}
              />
            </span>A
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="font-serif text-[clamp(18px,2.5vw,28px)] italic font-light text-[#F5EFE0]/60 mt-4 tracking-wider"
        >
          Where fire meets flavour
        </motion.p>
        
        <motion.div 
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 60 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="w-[1px] h-[60px] bg-gradient-to-b from-[#D4A44C] to-transparent mx-auto mt-8"
        />
        
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="text-[10px] tracking-[0.4em] uppercase text-[#8A8278] mt-3"
        >
          Scroll to explore
        </motion.p>
      </div>

      <div className="absolute left-[6%] bottom-[15%] text-center pointer-events-none hidden sm:block">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="font-bebas text-5xl text-[#C8442A] leading-none">37</div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#8A8278] mt-1">Years of Excellence</div>
        </motion.div>
      </div>

      <div className="absolute right-[6%] bottom-[15%] text-center pointer-events-none hidden sm:block">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.8 }}
        >
          <div className="font-bebas text-5xl text-[#C8442A] leading-none">★★★</div>
          <div className="text-[10px] tracking-[0.3em] uppercase text-[#8A8278] mt-1">Michelin Stars</div>
        </motion.div>
      </div>
    </section>
  );
};

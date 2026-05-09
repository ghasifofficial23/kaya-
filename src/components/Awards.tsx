import { Reveal, ParallaxReveal } from './Reveal';
import { AWARDS } from '../constants';

export const Awards = () => {
  return (
    <section id="awards" className="px-6 py-24 md:px-12 md:py-36 bg-[#1A1612] text-center overflow-hidden">
      <ParallaxReveal type="scale" speed={0.5} className="mb-20">
        <p className="font-jost text-[10px] tracking-[0.6em] uppercase text-[#D4A44C] mb-4">Recognition</p>
        <h2 className="font-bebas text-5xl md:text-8xl leading-none tracking-[0.04em] text-[#F5EFE0]">
          EXCELLENCE &<br />DISTINCTION
        </h2>
      </ParallaxReveal>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-[2px] bg-[#D4A44C]/10 border border-[#D4A44C]/10 max-w-7xl mx-auto">
        {AWARDS.map((award, i) => (
          <Reveal 
            key={i} 
            direction="up" 
            delay={i * 0.1}
            className="bg-[#1A1612] px-10 py-16 hover:bg-[#2E2822] transition-colors duration-500 relative overflow-hidden group"
          >
            <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-[#D4A44C] to-transparent scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
            
            <span className="text-5xl mb-5 block">{award.icon}</span>
            <div className="font-bebas text-7xl text-[#C8442A] leading-none mb-3 tracking-tighter">
              {award.number}
            </div>
            <div className="font-bebas text-2xl tracking-[0.15em] text-[#F5EFE0] mb-3">
              {award.title}
            </div>
            <div className="font-serif italic text-[15px] text-[#8A8278] leading-relaxed max-w-[280px] mx-auto">
              {award.description}
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

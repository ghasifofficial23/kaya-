import { FlowArt, FlowSection } from './StoryScroll';
import { cn } from '../lib/utils';

export const History = () => {
  const milestones = [
    { year: '1987', title: 'The Beginning', desc: 'Chef Mori opens a 28-seat dining room in Chelsea, New York. The wood-fired hearth becomes the soul of the kitchen.', img: '/images/kaya_history.png' },
    { year: '1994', title: 'First Star', desc: 'First Michelin star awarded. Kaya expands to 80 covers and introduces the legendary tasting menu.', img: '/images/ember_steak.png' },
    { year: '2003', title: 'World Renowned', desc: 'Third Michelin star. Named #4 on the World\'s 50 Best Restaurants list.', img: '/images/ember_lobster.png' },
    { year: '2024', title: 'New Vision', desc: 'Chef Mori\'s daughter, Sofia, joins as co-head chef, merging classical technique with bold new vision.', img: '/images/kaya_scallops.png' },
  ];

  return (
    <section id="history" className="bg-[#1A1612]">
      <FlowArt>
        {/* Intro Section */}
        <FlowSection className="bg-[#2E2822]">
          <div className="grid md:grid-cols-2 gap-16 md:gap-24 items-center h-full my-auto">
            <div className="relative h-[400px] md:h-[520px]">
              <div className="absolute top-0 left-0 w-3/4 h-4/5 bg-gradient-to-br from-[#4A443C] to-[#3A342C] rounded-sm overflow-hidden relative group">
                <img src="/images/kaya_history.png" alt="Chef Mori in 1987" className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay transition-transform duration-700 group-hover:scale-105" />
                <div className="absolute inset-0 bg-[#1A1612]/30" />
              </div>
              <div className="absolute bottom-0 right-0 w-[65%] h-[70%] bg-gradient-to-br from-[#2A2218] to-[#4A443C] rounded-sm border border-[#D4A44C]/20 flex items-center justify-center group/fire overflow-hidden cursor-crosshair shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-t from-[#C8442A]/80 via-[#D4A44C]/40 to-transparent opacity-0 group-hover/fire:opacity-100 transition-opacity duration-700 mix-blend-overlay translate-y-full group-hover/fire:translate-y-0" />
                <div className="text-center relative z-10 transition-transform duration-500 group-hover/fire:-translate-y-4">
                  <div className="font-bebas text-5xl text-[#C8442A] leading-tight group-hover/fire:text-[#D4A44C] transition-colors duration-500">SINCE</div>
                  <div className="font-bebas text-5xl text-[#C8442A] leading-tight group-hover/fire:text-transparent group-hover/fire:bg-clip-text group-hover/fire:bg-gradient-to-t group-hover/fire:from-[#C8442A] group-hover/fire:to-[#D4A44C] transition-all duration-500">1987</div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-4 opacity-0 group-hover/fire:opacity-100 transition-all duration-700 w-max">
                    <span className="font-jost text-[10px] tracking-[0.4em] uppercase text-[#F5EFE0] drop-shadow-[0_0_8px_rgba(200,68,42,0.8)]">
                      BORN IN FLAME
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6">
              <p className="font-jost text-[10px] tracking-[0.6em] uppercase text-[#D4A44C]">Our Story</p>
              <h2 className="font-bebas text-5xl md:text-8xl leading-none tracking-tight text-[#F5EFE0]">
                A LEGACY<br />OF FIRE
              </h2>
              <div className="w-[60px] h-[1px] bg-[#D4A44C] my-6" />
              <div className="space-y-6 font-serif text-lg font-light leading-relaxed text-[#F5EFE0]/65">
                <p>
                  Founded by Chef Alessandro Mori in 1987, Kaya began as a single room in Manhattan with a wood-fired hearth and an obsession with the transformative power of flame.
                </p>
                <p>
                  Three decades later, we remain guided by the same philosophy: that the finest ingredients, treated with respect and restraint, produce moments of transcendence.
                </p>
              </div>
            </div>
          </div>
        </FlowSection>

        {/* Milestone Sections */}
        {milestones.map((item, i) => (
          <FlowSection key={item.year} className={i % 2 === 0 ? "bg-[#25201B]" : "bg-[#1F1B16]"}>
            <div className="grid md:grid-cols-2 gap-16 items-center h-full my-auto">
              <div className={cn("space-y-6 relative", i % 2 !== 0 && "md:order-2")}>
                <div className="font-bebas text-[120px] text-[#D4A44C]/5 leading-none absolute -top-16 -left-4 select-none pointer-events-none">{item.year}</div>
                <div className="font-bebas text-6xl text-[#C8442A] relative z-10">{item.year}</div>
                <h3 className="font-bebas text-4xl text-[#F5EFE0] tracking-wider">{item.title}</h3>
                <p className="font-serif text-xl text-[#8A8278] leading-relaxed border-l border-[#D4A44C]/30 pl-6">
                  {item.desc}
                </p>
              </div>
              <div className={cn("relative h-[300px] md:h-[450px] rounded-sm overflow-hidden border border-[#D4A44C]/10", i % 2 !== 0 && "md:order-1")}>
                <img src={item.img} alt={item.title} className="absolute inset-0 w-full h-full object-cover opacity-50 grayscale hover:grayscale-0 transition-all duration-700" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#1A1612]/80 to-transparent pointer-events-none" />
              </div>
            </div>
          </FlowSection>
        ))}
      </FlowArt>
    </section>
  );
};

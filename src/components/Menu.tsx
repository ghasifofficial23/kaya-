import { useState } from 'react';
import { Reveal } from './Reveal';
import { MENU } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export const Menu = () => {
  const [activeTab, setActiveTab] = useState(MENU[0].id);

  return (
    <section id="menu" className="px-6 py-24 md:px-12 md:py-36 bg-[#1A1612] overflow-hidden">
      <Reveal direction="up" className="max-w-7xl mx-auto mb-20">
        <p className="font-jost text-[10px] tracking-[0.6em] uppercase text-[#D4A44C] mb-4">Full Menu</p>
        <h2 className="font-bebas text-5xl md:text-8xl leading-none font-bold tracking-tight text-[#F5EFE0]">
          OUR<br />MENU
        </h2>
      </Reveal>

      <div className="max-w-7xl mx-auto grid md:grid-cols-[240px_1fr] gap-12 md:gap-24">
        <div className="md:sticky md:top-32 h-fit flex md:flex-col gap-2 md:gap-0 overflow-x-auto md:overflow-visible [&::-webkit-scrollbar]:hidden [-ms-overflow-style:'none'] [scrollbar-width:'none'] pb-4 md:pb-0 border-b md:border-b-0 md:border-l border-[#D4A44C]/10 md:pl-6 -mx-6 px-6 md:mx-0 md:px-0">
          {MENU.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveTab(category.id)}
              className={cn(
                "block whitespace-nowrap text-left font-bebas text-2xl tracking-[0.1em] py-3 transition-all duration-300",
                activeTab === category.id 
                  ? "text-[#D4A44C] md:translate-x-3" 
                  : "text-[#8A8278] hover:text-[#F5EFE0]"
              )}
            >
              {category.title}
            </button>
          ))}
        </div>

        <div className="min-h-[500px]">
          <AnimatePresence mode="wait">
            {MENU.map((category) => category.id === activeTab && (
              <motion.div
                key={category.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-12"
              >
                <p className="font-jost text-[10px] tracking-[0.5em] uppercase text-[#D4A44C]/50 border-b border-[#D4A44C]/10 pb-4">
                  {category.title}
                </p>
                <div className="space-y-1">
                  {category.items.map((item, i) => (
                    <div key={i} className="group relative py-8 border-b border-white/5 grid grid-cols-[1fr_auto] gap-6 items-start hover:bg-white/[0.02] px-4 -mx-4 transition-colors overflow-hidden">
                      <div className="absolute left-[-100%] top-0 bottom-0 w-full bg-[#C8442A]/5 group-hover:left-0 transition-all duration-500" />
                      <div className="relative">
                        <div className="font-serif text-xl font-semibold text-[#F5EFE0] mb-2">{item.name}</div>
                        <p className="font-serif italic text-sm text-[#8A8278] leading-relaxed max-w-lg">{item.description}</p>
                        {item.tags && (
                          <div className="flex gap-2 mt-4">
                            {item.tags.map(tag => (
                              <span key={tag} className="text-[9px] tracking-[0.2em] uppercase border border-[#D4A44C]/25 text-[#D4A44C] px-2 py-0.5 rounded-sm bg-black">
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                      <div className="relative font-bebas text-2xl text-[#C8442A] pt-1">
                        {item.price}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

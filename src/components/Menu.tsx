import { useState } from 'react';
import { Reveal } from './Reveal';
import { MENU } from '../constants';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';
import { MenuItem } from '../types';
import { X } from 'lucide-react';

export const Menu = () => {
  const [activeTab, setActiveTab] = useState(MENU[0].id);
  const [selectedMenuItem, setSelectedMenuItem] = useState<MenuItem | null>(null);

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
                    <div 
                      key={i} 
                      onClick={() => setSelectedMenuItem(item)}
                      className="group relative py-8 border-b border-white/5 grid grid-cols-[1fr_auto] gap-6 items-start hover:bg-white/[0.02] px-4 -mx-4 transition-colors overflow-hidden cursor-pointer"
                    >
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
      <AnimatePresence>
        {selectedMenuItem && (
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
              className="bg-[#25201B] border border-[#D4A44C]/30 w-full max-w-3xl overflow-y-auto max-h-[90vh] rounded-sm flex flex-col relative shadow-[0_0_50px_rgba(0,0,0,0.5)]"
            >
              {/* Close Button */}
              <button 
                onClick={() => setSelectedMenuItem(null)}
                className="absolute top-4 right-4 z-50 text-[#F5EFE0] p-2 bg-black/40 rounded-full hover:bg-[#C8442A] transition-colors border border-white/10"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="p-8 md:p-14 relative z-10 flex flex-col items-center text-center space-y-8">
                {/* Background glow */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#C8442A]/10 to-transparent pointer-events-none" />

                <div className="space-y-4 relative z-20">
                  {selectedMenuItem.tags && (
                    <div className="flex flex-wrap gap-2 justify-center mb-6">
                      {selectedMenuItem.tags.map(tag => (
                        <span key={tag} className="text-[10px] tracking-[0.3em] uppercase border border-[#D4A44C]/50 text-[#D4A44C] px-3 py-1 rounded-sm bg-black/50">
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <p className="font-jost text-[10px] tracking-[0.4em] uppercase text-[#D4A44C] mb-2">{MENU.find(c => c.id === activeTab)?.title || 'From the Menu'}</p>
                  <h3 className="font-bebas text-5xl md:text-7xl text-[#F5EFE0] leading-none tracking-wider">{selectedMenuItem.name}</h3>
                  <div className="font-bebas text-4xl text-[#C8442A] pt-2">{selectedMenuItem.price}</div>
                </div>

                <p className="font-serif italic text-xl text-[#F5EFE0]/80 leading-relaxed max-w-xl relative z-20">
                  {selectedMenuItem.description}
                </p>

                <div className="w-full space-y-8 pt-8 border-t border-[#D4A44C]/10 text-left grid grid-cols-1 md:grid-cols-2 gap-8 relative z-20">
                  {selectedMenuItem.ingredients && (
                    <div className="md:col-span-2">
                      <h4 className="font-bebas text-xl text-[#D4A44C] tracking-widest mb-4 text-center">Tasting Notes & Elements</h4>
                      <ul className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm text-[#8A8278] font-serif">
                        {selectedMenuItem.ingredients.map((ing, idx) => (
                          <li key={idx} className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 bg-[#C8442A] rounded-full" /> {ing}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {selectedMenuItem.style && (
                    <div className="text-center">
                      <h4 className="font-bebas text-lg text-[#D4A44C] tracking-widest mb-1">Preparation Style</h4>
                      <p className="text-sm text-[#F5EFE0]/60">{selectedMenuItem.style}</p>
                    </div>
                  )}
                  {selectedMenuItem.origin && (
                    <div className="text-center">
                      <h4 className="font-bebas text-lg text-[#D4A44C] tracking-widest mb-1">Primary Origin</h4>
                      <p className="text-sm text-[#F5EFE0]/60">{selectedMenuItem.origin}</p>
                    </div>
                  )}
                </div>
                
                <button 
                  onClick={() => setSelectedMenuItem(null)}
                  className="mt-8 border border-[#D4A44C]/30 text-[#D4A44C] py-3 px-12 hover:bg-[#D4A44C] hover:text-[#1A1612] font-bebas tracking-widest transition-all rounded-sm relative z-20"
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

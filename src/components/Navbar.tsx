import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { NavLink } from './NavLink';
import { Menu, X } from 'lucide-react';

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <motion.nav 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between transition-all duration-500 md:bg-transparent md:hover:bg-black/80 md:hover:backdrop-blur-xl md:border-b md:border-white/0 md:hover:border-white/10 px-4 py-4 md:px-12 md:py-6 pointer-events-none"
      >
        <div className="w-full flex items-center justify-between pointer-events-auto">
          {/* Mobile Pill Navbar */}
          <div className="md:hidden flex items-center justify-between w-full bg-[#1A1612]/30 backdrop-blur-xl border border-white/15 rounded-full px-6 py-3 shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
            <a href="#" className="font-bebas text-2xl tracking-[0.2em] text-[#D4A44C] no-underline">
              KAYA
            </a>
            <button onClick={() => setIsOpen(true)} className="text-[#F5EFE0] p-1">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Desktop Logo */}
          <a href="#" className="hidden md:block font-bebas text-3xl tracking-[0.2em] text-[#D4A44C] no-underline">
            KAYA
          </a>
          
          {/* Desktop Menu */}
          <ul className="hidden md:flex items-center gap-10 list-none">
            <li><NavLink href="#history">Our Story</NavLink></li>
            <li><NavLink href="#awards">Excellence</NavLink></li>
            <li><NavLink href="#dishes">Signature</NavLink></li>
            <li><NavLink href="#menu">Menu</NavLink></li>
            <li>
              <a 
                href="#booking" 
                className="bg-[#C8442A] text-[#F5EFE0] px-6 py-2.5 rounded-sm font-medium uppercase tracking-[0.1em] text-xs hover:bg-[#D4563E] transition-colors"
              >
                Reserve
              </a>
            </li>
          </ul>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            animate={{ opacity: 1, backdropFilter: 'blur(20px)' }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            className="fixed inset-0 z-[60] bg-[#1A1612]/90 flex flex-col items-center justify-center"
          >
            <button 
              onClick={() => setIsOpen(false)} 
              className="absolute top-6 right-6 text-[#F5EFE0] p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            <ul className="flex flex-col items-center gap-8 list-none">
              <li><a href="#history" onClick={() => setIsOpen(false)} className="font-bebas text-4xl text-[#F5EFE0] hover:text-[#D4A44C] transition-colors tracking-widest">Our Story</a></li>
              <li><a href="#awards" onClick={() => setIsOpen(false)} className="font-bebas text-4xl text-[#F5EFE0] hover:text-[#D4A44C] transition-colors tracking-widest">Excellence</a></li>
              <li><a href="#dishes" onClick={() => setIsOpen(false)} className="font-bebas text-4xl text-[#F5EFE0] hover:text-[#D4A44C] transition-colors tracking-widest">Signature</a></li>
              <li><a href="#menu" onClick={() => setIsOpen(false)} className="font-bebas text-4xl text-[#F5EFE0] hover:text-[#D4A44C] transition-colors tracking-widest">Menu</a></li>
              <li className="pt-6">
                <a 
                  href="#booking" 
                  onClick={() => setIsOpen(false)}
                  className="bg-[#C8442A] text-[#F5EFE0] px-10 py-4 rounded-full font-bebas text-2xl tracking-[0.1em] hover:bg-[#D4563E] transition-colors"
                >
                  Reserve a Table
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

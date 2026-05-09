import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&*";

const DecodingText = ({ text, delay = 0 }: { text: string, delay?: number }) => {
  const [displayText, setDisplayText] = useState("");

  useEffect(() => {
    let iteration = 0;
    let interval: NodeJS.Timeout;
    
    const startTimeout = setTimeout(() => {
      interval = setInterval(() => {
        setDisplayText(
          text.split("")
            .map((char, index) => {
              if (index < iteration) {
                return text[index];
              }
              return char === ' ' ? ' ' : CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        
        if (iteration >= text.length) {
          clearInterval(interval);
        }
        
        iteration += 1 / 3; 
      }, 30);
    }, delay);

    return () => {
      clearTimeout(startTimeout);
      if (interval) clearInterval(interval);
    };
  }, [text, delay]);

  return <span className="font-mono">{displayText || '\u00A0'}</span>;
};

export const Loader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState(0);

  useEffect(() => {
    const p1 = setTimeout(() => setPhase(1), 600);
    const p2 = setTimeout(() => setPhase(2), 1200);
    const p3 = setTimeout(() => setPhase(3), 1800);

    const interval = setInterval(() => {
      setProgress(p => {
        const next = p + Math.random() * 15;
        if (next >= 100) {
          clearInterval(interval);
          setTimeout(onComplete, 1000);
          return 100;
        }
        return next;
      });
    }, 100);

    return () => {
      clearTimeout(p1);
      clearTimeout(p2);
      clearTimeout(p3);
      clearInterval(interval);
    };
  }, [onComplete]);

  return (
    <motion.div 
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[200] bg-[#1A1612] text-[#D4A44C] flex flex-col items-center justify-center font-mono selection:bg-transparent overflow-hidden"
    >
      {/* Background Grid */}
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#D4A44C_1px,transparent_1px),linear-gradient(to_bottom,#D4A44C_1px,transparent_1px)] bg-[size:40px_40px]" />

      <div className="w-full max-w-lg p-8 md:p-12 border border-[#D4A44C]/20 bg-black/40 relative shadow-[0_0_80px_rgba(212,164,76,0.05)] backdrop-blur-md">
        {/* Scanning line effect */}
        <motion.div 
          animate={{ y: ['-10%', '110%'] }}
          transition={{ repeat: Infinity, duration: 2.5, ease: 'linear' }}
          className="absolute left-0 right-0 top-0 h-[2px] bg-[#C8442A] opacity-50 shadow-[0_0_15px_#C8442A] z-10"
        />

        <div className="space-y-6 relative z-20">
          <div className="flex justify-between items-end border-b border-[#D4A44C]/20 pb-4 mb-8">
            <div className="text-sm md:text-base tracking-[0.3em] opacity-70">
              <DecodingText text="SYSTEM.BOOT" delay={0} />
            </div>
            <div className="text-3xl md:text-4xl font-bold font-mono tracking-tighter">
              {Math.floor(progress)}%
            </div>
          </div>

          <div className="space-y-3 text-xs md:text-sm tracking-widest opacity-80 h-32 md:h-36 flex flex-col justify-end">
            <div><DecodingText text="> INITIALIZING KERNEL..." delay={100} /></div>
            {phase >= 1 && <div><DecodingText text="> DECRYPTING ASSETS..." delay={0} /></div>}
            {phase >= 2 && <div className="text-[#C8442A]"><DecodingText text="> BYPASSING FIREWALL..." delay={0} /></div>}
            {phase >= 3 && <div><DecodingText text="> ACCESS GRANTED." delay={0} /></div>}
          </div>

          <div className="pt-10 pb-4 text-center border-t border-[#D4A44C]/20">
            <h1 className="text-7xl md:text-8xl font-bebas tracking-[0.2em] text-[#F5EFE0] drop-shadow-[0_0_20px_rgba(212,164,76,0.3)]">
              <DecodingText text="KAYA" delay={400} />
            </h1>
            <div className="text-[10px] md:text-xs tracking-[0.6em] uppercase text-[#C8442A] mt-4 opacity-80">
              <DecodingText text="Elevated Dining" delay={1000} />
            </div>
          </div>

          {/* Fire Progress bar */}
          <div className="w-full h-2 bg-black mt-8 rounded-full overflow-hidden relative border border-[#C8442A]/20 shadow-[inset_0_0_10px_rgba(0,0,0,1)]">
            <motion.div 
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-[#4A1408] via-[#C8442A] to-[#F5EFE0] shadow-[0_0_20px_#C8442A]"
              style={{ backgroundSize: '300% 100%' }}
              initial={{ width: 0 }}
              animate={{ 
                width: `${progress}%`,
                backgroundPosition: ['100% 0%', '0% 0%']
              }}
              transition={{ 
                width: { ease: 'linear' },
                backgroundPosition: { repeat: Infinity, duration: 0.8, ease: 'linear' }
              }}
            >
              {/* Leading edge fire spark */}
              <motion.div 
                animate={{ 
                  opacity: [0.6, 1, 0.6], 
                  scale: [1, 1.8, 1],
                  filter: ['blur(1px)', 'blur(3px)', 'blur(1px)']
                }}
                transition={{ repeat: Infinity, duration: 0.15, ease: 'easeInOut' }}
                className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-[#F5EFE0] rounded-full shadow-[0_0_15px_#F5EFE0,0_0_30px_#D4A44C]"
              />
            </motion.div>
          </div>
        </div>
      </div>
      
      {/* Decorative corners */}
      <div className="absolute top-8 left-8 w-8 h-8 border-t-2 border-l-2 border-[#D4A44C]/30" />
      <div className="absolute top-8 right-8 w-8 h-8 border-t-2 border-r-2 border-[#D4A44C]/30" />
      <div className="absolute bottom-8 left-8 w-8 h-8 border-b-2 border-l-2 border-[#D4A44C]/30" />
      <div className="absolute bottom-8 right-8 w-8 h-8 border-b-2 border-r-2 border-[#D4A44C]/30" />
      
      <div className="absolute bottom-10 font-mono text-[10px] tracking-widest text-[#D4A44C]/30 uppercase flex gap-12">
        <span>Node 3A.9</span>
        <span>Encrypted Feed</span>
        <span>Sector 7</span>
      </div>
    </motion.div>
  );
};

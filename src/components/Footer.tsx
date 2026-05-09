export const Footer = () => {
  return (
    <footer className="px-6 py-24 md:px-12 md:pb-12 bg-[#1A1612] border-t border-white/10 overflow-hidden">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-16 mb-20">
        <div className="space-y-6">
          <div className="font-bebas text-5xl tracking-[0.2em] text-[#D4A44C]">KAYA</div>
          <p className="font-serif italic text-[15px] text-[#8A8278] leading-relaxed max-w-[280px]">
            Where fire meets flavour — a quarter century of culinary excellence in the heart of New York.
          </p>
        </div>

        <div className="space-y-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4A44C]">Explore</p>
          <ul className="space-y-4 list-none p-0">
            <li><a href="#history" className="text-sm text-[#8A8278] hover:text-[#F5EFE0] transition-colors">Our Story</a></li>
            <li><a href="#awards" className="text-sm text-[#8A8278] hover:text-[#F5EFE0] transition-colors">Awards</a></li>
            <li><a href="#dishes" className="text-sm text-[#8A8278] hover:text-[#F5EFE0] transition-colors">Signature Dishes</a></li>
            <li><a href="#menu" className="text-sm text-[#8A8278] hover:text-[#F5EFE0] transition-colors">Full Menu</a></li>
          </ul>
        </div>

        <div className="space-y-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4A44C]">Visit</p>
          <ul className="space-y-1 list-none p-0">
            <li className="text-sm text-[#8A8278]">147 W 20th Street</li>
            <li className="text-sm text-[#8A8278]">Chelsea, New York</li>
            <li className="text-sm text-[#8A8278]">NY 10011</li>
            <li className="text-sm text-[#8A8278] pt-3">+1 212 555 0192</li>
          </ul>
        </div>

        <div className="space-y-8">
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#D4A44C]">Hours</p>
          <ul className="space-y-4 list-none p-0">
            <li className="text-sm text-[#8A8278]">Tue–Thu: 5:30–10pm</li>
            <li className="text-sm text-[#8A8278]">Fri–Sat: 5:30–11pm</li>
            <li className="text-sm text-[#8A8278]">Sun: 5:30–9:30pm</li>
            <li><a href="#booking" className="text-sm text-[#D4A44C] hover:text-[#F5EFE0] transition-colors font-medium">Reserve a Table</a></li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
        <p className="text-xs text-[#8A8278] tracking-widest uppercase">© 2024 Kaya Restaurant. All rights reserved.</p>
        <p className="text-[11px] text-[#8A8278]/40 font-serif italic">Crafted with fire & precision</p>
      </div>
    </footer>
  );
};

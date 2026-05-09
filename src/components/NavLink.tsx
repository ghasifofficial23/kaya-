import { ReactNode } from 'react';

export const NavLink = ({ href, children }: { href: string; children: ReactNode }) => {
  return (
    <a 
      href={href}
      className="relative font-jost text-[11px] tracking-[0.2em] uppercase text-[#F5EFE0]/60 hover:text-[#F5EFE0] transition-colors duration-300 group"
    >
      {children}
      <span className="absolute -bottom-1 left-0 w-full h-[1px] bg-[#D4A44C] origin-right transition-transform duration-300 scale-x-0 group-hover:scale-x-100 group-hover:origin-left" />
    </a>
  );
};

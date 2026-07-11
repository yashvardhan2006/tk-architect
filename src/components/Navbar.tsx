import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../assets/logos/1.png';
const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
   <nav
  className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
    scrolled
      ? 'bg-zinc-950/95 backdrop-blur-md shadow-lg shadow-black/20'
      : 'bg-transparent '
  }`}
>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 md:h-28 ">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleClick('#home');
            }}
            className="flex items-center gap-3 group"
          >
            {/* <div className="w-10 h-10 border-2 border-amber-400 flex items-center justify-center group-hover:bg-amber-400 transition-colors duration-300">
             <span className="text-amber-400 font-bold text-lg group-hover:text-zinc-950 transition-colors duration-300"> TK</span>
            </div> */}
            <div className="h-14 w-14 md:h-28 md:w-28  ">

               <img src={logo} alt="TK Architects logo" />
            </div>
            <div className="hidden sm:block">
              <span className="text-white font-semibold text-4xl tracking-wide">
                TK Architects
              </span>
            </div>
          </a>

          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleClick(link.href);
                }}
                className="px-4 py-2 text-lg font-medium text-zinc-300 hover:text-amber-400 transition-colors duration-300 tracking-wide uppercase"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden text-zinc-300 hover:text-amber-400 transition-colors p-2"
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-64 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800 px-6 py-4 space-y-1">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => {
                e.preventDefault();
                handleClick(link.href);
              }}
              className="block px-4 py-3 text-sm font-medium text-zinc-300 hover:text-amber-400 hover:bg-zinc-900/50 transition-all duration-200 tracking-wide uppercase rounded"
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

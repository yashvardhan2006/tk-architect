import { ArrowUp } from 'lucide-react';
import logo from '../assets/logos/1.png';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-zinc-950 border-t border-zinc-900">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-3 gap-12">
          <div>
            {/* <div className="flex items-center gap-3 mb-4">
               <div className="h-14 w-14 md:h-20 md:w-20  ">

               <img src={logo} alt="TK Architects logo" />
            </div>
              <span className="text-white font-semibold text-xl tracking-wide">
                TK Architects
              </span>
            </div> */}
            <p className="text-zinc-500 text-sm leading-relaxed max-w-xs">
             
            </p>
          </div>

          <div>
            <h4 className="text-amber-400 font-semibold mb-4 text-sm tracking-wider uppercase">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {['Home', 'About', 'Projects', 'Contact'].map((link) => (
                <li key={link}>
                  <a
                    href={`#${link.toLowerCase()}`}
                    onClick={(e) => {
                      e.preventDefault();
                      document
                        .querySelector(`#${link.toLowerCase()}`)
                        ?.scrollIntoView({ behavior: 'smooth' });
                    }}
                    className="text-white hover:text-amber-400 text-sm transition-colors duration-300"
                  >
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-amber-400 font-semibold mb-4 text-sm tracking-wider uppercase">
              Services
            </h4>
            <ul className="space-y-3">
              {[
                'Architecture',
                'Interiors',
                 'Retrofit',
                 'Project Management',
                // 'Group Housing',
                // 'Commercial Buildings',
                // 'Corporate & IT Offices',
                // 'Industrial Facilities',
                // 'Schools & Educational Institutions',
                // 'Recreational & Hospitality',
                // 'Healthcare & Wellness',
              ].map((service) => (
                <li key={service}>
                  <span className="text-white text-sm">{service}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-900 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-zinc-600 text-sm">
            &copy; {new Date().getFullYear()} TK Architects. All rights
            reserved.
          </p>
          <button
            onClick={scrollToTop}
            className="w-10 h-10 border border-zinc-800 flex items-center justify-center text-zinc-500 hover:text-amber-400 hover:border-amber-400 transition-all duration-300"
          >
            <ArrowUp size={18} />
          </button>
        </div>
      </div>
    </footer>
  );
}

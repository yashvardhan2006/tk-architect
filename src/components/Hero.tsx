import { ChevronDown } from 'lucide-react';

export default function Hero() {
  const scrollToAbout = () => {
    document.querySelector('#about')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="relative h-screen w-full overflow-hidden">
      {/* Video Background */}
      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
        poster="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
      >
        {/* Replace the src below with your own video file */}
        <source
          src="https://videos.pexels.com/video-files/3571264/3571264-uhd_2560_1440_30fps.mp4"
          type="video/mp4"
        />
      </video>

      {/* Gradient Overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/70 via-zinc-950/40 to-zinc-950/90" />
      <div className="absolute inset-0 bg-gradient-to-r from-zinc-950/50 to-transparent" />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-block mb-6">
            <div className="w-16 h-[2px] bg-amber-400 mx-auto mb-6" />
            <span className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase">
              Architecture & Design Studio
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight">
            Designing spaces, 
            <br />
            <span className="text-amber-400">Defining Futures</span> 
            <br />
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-zinc-300 max-w-2xl mx-auto leading-relaxed font-light">
            Transforming visionary ideas into extraordinary built environments
            that stand as timeless testaments to design excellence.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="#projects"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#projects')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 bg-amber-400 text-zinc-950 font-semibold text-sm tracking-wider uppercase hover:bg-amber-300 transition-all duration-300 hover:shadow-lg hover:shadow-amber-400/20"
            >
              View Our Work
            </a>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document
                  .querySelector('#contact')
                  ?.scrollIntoView({ behavior: 'smooth' });
              }}
              className="px-8 py-4 border border-zinc-500 text-zinc-300 font-semibold text-sm tracking-wider uppercase hover:border-amber-400 hover:text-amber-400 transition-all duration-300"
            >
              Get In Touch
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <button
        onClick={scrollToAbout}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-zinc-400 hover:text-amber-400 transition-colors duration-300 animate-bounce"
      >
        <span className="text-xs tracking-[0.2em] uppercase">Scroll</span>
        <ChevronDown size={20} />
      </button>
    </section>
  );
}

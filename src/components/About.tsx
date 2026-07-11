import { Award, Users, Building2, Clock } from 'lucide-react';

const stats = [
  { icon: Building2, value: '50+', label: 'Projects Completed' },
  // { icon: Users, value: '35', label: 'Team Members' },
  // { icon: Award, value: '28', label: 'Design Awards' },
  { icon: Clock, value: '24', label: 'Years Experience' },
];

const values = [
  {
    title: 'Design Excellence',
    description:
      'Every project begins with a commitment to push creative boundaries while honoring the fundamental principles of spatial design.',
  },
  {
    title: 'Sustainable Vision',
    description:
      'We integrate environmental responsibility into every decision, creating buildings that give back more than they take.',
  },
  {
    title: 'Human-Centered',
    description:
      'Architecture serves people. We design spaces that enhance well-being, foster community, and elevate daily life.',
  },
];

export default function About() {
  return (
    <section id="about" className="relative bg-zinc-950 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-20">
          <div className="w-16 h-[2px] bg-amber-400 mb-6" />
          <span className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase">
            About Us
          </span>
          <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
            We bring your vision 
            <br />
             to life with <span className="text-amber-400">purpose and precision.</span>
          </h2>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start"> 
          <div>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6 justify-center"> <span className='text-xl font-bold'>TK Architects</span>, a multidisciplinary design studio based in Noida providing services in field of Architecture, Interiors, Building Engineering & Project management services.The team is equipped with experienced professionals in leadership of Architect Tapan Kumar, who is having more than two decades of experience on various types of building projects. </p>
            <p className="text-zinc-300 text-lg leading-relaxed mb-6">At TK Architects, we create thoughtful architecture and interior spaces that combine aesthetics, functionality, and long-term value with a focus on modern design, practical planning and attention to detail. We are committed to delivering a unique & sustainable design idea by complying with the client’s requirements that reflect the vision and lifestyle of our clients and “aspiring to make your vision a reality”. </p>
           
          
          </div>

          <div className="relative">
            <img
              src="https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              alt="TK Architects studio"
              className="w-full h-80 lg:h-96 object-cover"
            />
            <div className="absolute -bottom-6 -left-6 w-32 h-32 border-2 border-amber-400/30 hidden lg:block" />
            <div className="absolute -top-6 -right-6 w-32 h-32 border-2 border-amber-400/30 hidden lg:block" />
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-24 pt-16 border-t border-zinc-800">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center group">
              <stat.icon className="w-8 h-8 text-amber-400 mx-auto mb-4 group-hover:scale-110 transition-transform duration-300" />
              <div className="text-4xl lg:text-5xl font-bold text-white mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-zinc-400 tracking-wide uppercase">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-3 gap-8 mt-24">
          {values.map((v) => (
            <div
              key={v.title}
              className="p-8 border border-zinc-800 hover:border-amber-400/40 transition-colors duration-500 group"
            >
              <div className="w-12 h-[2px] bg-amber-400 mb-6 group-hover:w-16 transition-all duration-500" />
              <h3 className="text-xl font-semibold text-white mb-3">
                {v.title}
              </h3>
              <p className="text-zinc-400 leading-relaxed text-sm">
                {v.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

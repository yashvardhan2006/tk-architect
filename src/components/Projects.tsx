import { useState, useEffect } from 'react';
import { ArrowUpRight, Filter } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  year: number;
  location: string;
  featured: boolean;
}

const categories = ['All', 'Residential', 'Commercial', 'Healthcare', 'Cultural'];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const { data } = await supabase
      .from('projects')
      .select('*')
      .order('sort_order', { ascending: true });
    if (data) setProjects(data);
  };

  const filtered =
    activeCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="relative bg-zinc-900 py-24 lg:py-32">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-16">
          <div>
            <div className="w-16 h-[2px] bg-amber-400 mb-6" />
            <span className="text-amber-400 text-sm font-semibold tracking-[0.3em] uppercase">
              Our Work
            </span>
            <h2 className="mt-4 text-4xl sm:text-5xl font-bold text-white leading-tight">
              Featured <span className="text-amber-400">Projects</span>
            </h2>
          </div>

          <div className="flex items-center gap-2 flex-wrap">
            <Filter size={16} className="text-zinc-500" />
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 text-xs font-semibold tracking-wider uppercase transition-all duration-300 ${
                  activeCategory === cat
                    ? 'bg-amber-400 text-zinc-950'
                    : 'text-zinc-400 hover:text-white border border-zinc-700 hover:border-zinc-500'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="aspect-[4/5] overflow-hidden">
                <img
                  src={project.image_url}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
              </div>

              {/* Overlay */}
              <div
                className={`absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent transition-opacity duration-500 ${
                  hoveredId === project.id ? 'opacity-100' : 'opacity-80'
                }`}
              />

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-amber-400 text-xs font-semibold tracking-wider uppercase">
                    {project.category}
                  </span>
                  <span className="text-zinc-600">|</span>
                  <span className="text-zinc-500 text-xs">{project.year}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm mb-3">
                  {project.location}
                </p>
                <p
                  className={`text-zinc-300 text-sm leading-relaxed transition-all duration-500 ${
                    hoveredId === project.id
                      ? 'max-h-24 opacity-100'
                      : 'max-h-0 opacity-0 overflow-hidden'
                  }`}
                >
                  {project.description}
                </p>
              </div>

              {/* Arrow */}
              <div
                className={`absolute top-6 right-6 w-10 h-10 bg-amber-400 flex items-center justify-center transition-all duration-500 ${
                  hoveredId === project.id
                    ? 'opacity-100 translate-x-0'
                    : 'opacity-0 translate-x-4'
                }`}
              >
                <ArrowUpRight size={18} className="text-zinc-950" />
              </div>
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-zinc-500">
            No projects found in this category.
          </div>
        )}
      </div>
    </section>
  );
}

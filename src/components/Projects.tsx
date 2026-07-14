import { useEffect, useMemo, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Filter,
  X,
} from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  image_url: string;
  gallery_images?: string[] | null;
  year: number;
  location: string;
  featured: boolean;
}

const categories = ['All', 'Residential', 'Commercial/Offices','Industrial','Educational', 'Cultural'];

export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [showAllProjects, setShowAllProjects] = useState(false);

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

  const visibleProjects = showAllProjects
    ? filtered
    : filtered.slice(0, 6);

  const selectedImages = useMemo(() => {
    if (!selectedProject) {
      return [] as string[];
    }

    const images = [
      selectedProject.image_url,
      ...(selectedProject.gallery_images ?? []),
    ].filter((image): image is string => Boolean(image));

    return Array.from(new Set(images));
  }, [selectedProject]);

  const openProject = (project: Project) => {
    setSelectedProject(project);
    setSelectedImageIndex(0);
  };

  const closeProject = () => {
    setSelectedProject(null);
    setSelectedImageIndex(0);
  };

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
          {visibleProjects.map((project) => (
            <div
              key={project.id}
              className="group relative overflow-hidden cursor-pointer"
              onMouseEnter={() => setHoveredId(project.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => openProject(project)}
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

        {filtered.length > 6 && (
          <div className="mt-10 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAllProjects((current) => !current)}
              className="inline-flex items-center rounded-full border border-amber-400 bg-transparent px-6 py-3 text-sm font-semibold uppercase tracking-[0.2em] text-amber-400 transition hover:bg-amber-400 hover:text-zinc-950"
            >
              {showAllProjects ? 'Show Less' : 'View More'}
            </button>
          </div>
        )}
      </div>

      {selectedProject && selectedImages.length > 0 && (
        <div className="fixed inset-0 z-[60] bg-zinc-950/95 backdrop-blur-sm">
          <div className="absolute inset-0" onClick={closeProject} />

          <div className="relative z-10 mx-auto flex min-h-screen max-w-7xl items-center px-4 py-6 sm:px-6 lg:px-8">
            <div className="grid w-full gap-6 overflow-hidden rounded-3xl border border-zinc-800 bg-zinc-950 shadow-2xl shadow-black/50 lg:grid-cols-[1.4fr_0.9fr]">
              <div className="relative bg-zinc-950">
                <div className="relative aspect-[4/3] w-full overflow-hidden bg-zinc-900">
                  <img
                    src={selectedImages[selectedImageIndex]}
                    alt={selectedProject.title}
                    className="h-full w-full object-cover"
                  />

                  <button
                    type="button"
                    onClick={closeProject}
                    className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center border border-white/10 bg-zinc-950/80 text-white transition-colors hover:bg-amber-400 hover:text-zinc-950"
                    aria-label="Close project gallery"
                  >
                    <X size={18} />
                  </button>

                  {selectedImages.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImageIndex(
                            (current) =>
                              (current - 1 + selectedImages.length) %
                              selectedImages.length,
                          )
                        }
                        className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-zinc-950/80 text-white transition-colors hover:bg-amber-400 hover:text-zinc-950"
                        aria-label="Previous project photo"
                      >
                        <ArrowLeft size={18} />
                      </button>
                      <button
                        type="button"
                        onClick={() =>
                          setSelectedImageIndex(
                            (current) =>
                              (current + 1) % selectedImages.length,
                          )
                        }
                        className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center border border-white/10 bg-zinc-950/80 text-white transition-colors hover:bg-amber-400 hover:text-zinc-950"
                        aria-label="Next project photo"
                      >
                        <ArrowRight size={18} />
                      </button>
                    </>
                  )}
                </div>

                {selectedImages.length > 1 && (
                  <div className="flex gap-3 overflow-x-auto border-t border-zinc-800 bg-zinc-950 p-4">
                    {selectedImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={`h-20 w-28 flex-shrink-0 overflow-hidden border transition-all ${
                          selectedImageIndex === index
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-zinc-800 opacity-70 hover:opacity-100'
                        }`}
                        aria-label={`View photo ${index + 1} for ${selectedProject.title}`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProject.title} thumbnail ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="flex flex-col justify-between gap-8 p-6 sm:p-8 lg:p-10">
                <div>
                  <div className="mb-4 flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.3em] text-amber-400">
                    <span>{selectedProject.category}</span>
                    <span className="text-zinc-600">|</span>
                    <span>{selectedProject.year}</span>
                  </div>
                  <h3 className="text-3xl font-bold text-white sm:text-4xl">
                    {selectedProject.title}
                  </h3>
                  <p className="mt-3 text-sm uppercase tracking-[0.2em] text-zinc-500">
                    {selectedProject.location}
                  </p>
                  <p className="mt-6 text-base leading-7 text-zinc-300">
                    {selectedProject.description}
                  </p>
                </div>

                <div>
                  <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-zinc-500">
                    Photo Gallery
                  </p>
                  <div className="grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-3">
                    {selectedImages.map((image, index) => (
                      <button
                        key={`${image}-${index}`}
                        type="button"
                        onClick={() => setSelectedImageIndex(index)}
                        className={`aspect-[4/3] overflow-hidden border transition-all ${
                          selectedImageIndex === index
                            ? 'border-amber-400 ring-2 ring-amber-400/30'
                            : 'border-zinc-800 opacity-80 hover:opacity-100'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${selectedProject.title} gallery image ${index + 1}`}
                          className="h-full w-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

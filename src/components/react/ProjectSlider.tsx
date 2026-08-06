import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProjectCard from './ProjectCard';

interface Project {
  title: string;
  tags: string[];
  desc: string;
  status?: string;
  statusText?: string;
}

interface SliderProps {
  title: string;
  nextBtnText: string;
  projects: Project[];
}

export default function ProjectSlider({ title, nextBtnText, projects }: SliderProps) {
  const [currentPage, setCurrentPage] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const totalPages = isMobile ? projects.length : Math.ceil(projects.length / 2);

  const nextSlide = () => {
    setCurrentPage((prev) => (prev + 1 >= totalPages ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentPage((prev) => (prev - 1 < 0 ? totalPages - 1 : prev - 1));
  };

  const itemsPerPage = isMobile ? 1 : 2;
  const currentIndex = currentPage * itemsPerPage;
  const currentProjects = projects.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <section id="projects" className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start py-32 border-t-4 border-text-page/10">
      <div className="lg:col-span-4 space-y-12">
        <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none text-text-page">
          {title}
        </h2>
        <button 
          onClick={nextSlide} 
          className="group flex items-center gap-6 px-10 py-6 bg-bg-card text-text-card font-black uppercase tracking-[0.3em] hover:bg-text-page hover:text-bg-page transition-all duration-500 rounded-2xl active:scale-90"
        >
          <span>{nextBtnText}</span>
          <span className="text-2xl transition-transform group-hover:translate-x-2">→</span>
        </button>
        
        <div className="flex gap-2">
          {Array.from({ length: totalPages }).map((_, i) => (
            <div 
              key={i} 
              className={`h-1 transition-all duration-500 ${currentPage === i ? 'w-8 bg-text-page' : 'w-2 bg-text-page/20'}`} 
            />
          ))}
        </div>
      </div>

      <div className="lg:col-span-8 overflow-hidden min-h-125 select-none">
        <div className="flex gap-8">
          <AnimatePresence mode="wait">
            <motion.div 
              key={currentPage}
              className="flex gap-8 w-full cursor-grab active:cursor-grabbing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragEnd={(_, info) => {
                const swipeThreshold = 50;
                if (info.offset.x < -swipeThreshold) {
                  nextSlide();
                } else if (info.offset.x > swipeThreshold) {
                  prevSlide();
                }
              }}
            >
              {currentProjects.map((project, i) => (
                <div key={currentIndex + i} className="w-full md:w-[calc(50%-16px)] shrink-0">
                  <ProjectCard 
                    title={project.title}
                    description={project.desc}
                    tags={project.tags}
                    status={project.status}
                    statusText={project.statusText}
                    indexNumber={currentIndex + i + 1}
                  />
                </div>
              ))}
              
              {!isMobile && currentProjects.length === 1 && <div className="w-[calc(50%-16px)]" />}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, ArrowRight } from "lucide-react";

// Si usas react-router-dom, puedes descomentar la siguiente línea y cambiar <a> por <Link>
// import { Link } from "react-router-dom";

interface Project {
  title: string;
  slug: { current: string };
  description: string;
  imageUrl: string;
  featuredImageUrl?: string;
  category: string;
}

interface FeaturedCarouselProps {
  projects: Project[];
}

const FeaturedCarousel = ({ projects }: FeaturedCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Si no hay proyectos, no renderizamos nada
  if (!projects || projects.length === 0) return null;

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === projects.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? projects.length - 1 : prev - 1));
  };

  // Autoplay solo si hay más de un proyecto
  useEffect(() => {
    if (projects.length <= 1) return; 

    const interval = setInterval(() => {
      nextSlide();
    }, 5000);
    return () => clearInterval(interval);
  }, [currentIndex, projects.length]);

  const currentProject = projects[currentIndex];

  return (
    <div className="w-full h-full relative group overflow-hidden bg-black">
      
      {/* 1. IMAGEN DE FONDO (Usando <img> estándar) */}
      <div className="absolute inset-0 w-full h-full transition-transform duration-700 ease-out">
        {currentProject.imageUrl ? (
            <img
                src={currentProject.featuredImageUrl}
                alt={currentProject.title}
                className="w-full h-full object-cover opacity-60"
            />
        ) : (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center text-white/20">
                Sin Imagen
            </div>
        )}
        {/* Gradiente para mejorar legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#1e1e1e] via-black/40 to-transparent" />
      </div>

      {/* 2. CONTENIDO (TEXTO) */}
      <div className="absolute bottom-0 left-0 w-full p-8 md:p-16 z-20 flex flex-col items-start justify-end h-full pointer-events-none">
        <div className="max-w-3xl pointer-events-auto animate-fadeIn">
          <span className="inline-block py-1 px-3 rounded-full bg-orange-600/90 text-white text-xs font-bold uppercase tracking-wider mb-4">
            {currentProject.category}
          </span>
          <h2 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
            {currentProject.title}
          </h2>
          <p className="text-gray-300 text-lg md:text-xl mb-8 line-clamp-2 max-w-2xl">
            {currentProject.description}
          </p>
          
          {/* Usamos <a> estándar para el enlace. Si usas React Router, cambia esto por <Link to=...> */}
          <a 
            href={`/proyectos/${currentProject.slug.current}`}
            className="inline-flex items-center gap-2 bg-white text-black px-6 py-3 rounded-full font-bold hover:bg-orange-500 hover:text-white transition-colors duration-300"
          >
            Ver Proyecto <ArrowRight size={20} />
          </a>
        </div>
      </div>

      {/* 3. FLECHAS DE NAVEGACIÓN (Solo mostrar si hay más de 1 proyecto) */}
      {projects.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-orange-600 backdrop-blur-sm transition-all z-30 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronLeft size={32} />
          </button>
          
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/30 text-white hover:bg-orange-600 backdrop-blur-sm transition-all z-30 opacity-0 group-hover:opacity-100 cursor-pointer"
          >
            <ChevronRight size={32} />
          </button>

          {/* INDICADORES (PUNTITOS) */}
          <div className="absolute bottom-8 right-8 flex gap-2 z-30">
            {projects.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-3 rounded-full transition-all cursor-pointer ${
                  idx === currentIndex ? "bg-orange-500 w-8" : "bg-white/50 w-3 hover:bg-white"
                }`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default FeaturedCarousel;
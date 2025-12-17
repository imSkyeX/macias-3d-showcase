
import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProjectCard from "./ProjectCard";
import { Button } from "@/components/ui/button";

interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
}

const featuredProjects: Project[] = [
  {
    id: "engine-block",
    title: "Motor V8 - Bloque de Cilindros",
    description: "Diseño completo de bloque de motor V8 con todas las características técnicas y dimensiones precisas.",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop"
  },
  {
    id: "transmission-gear",
    title: "Sistema de Transmisión",
    description: "Modelado 3D de caja de cambios con engranajes sincronizados y mecanismos de control.",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop"
  },
  {
    id: "suspension-arm",
    title: "Brazo de Suspensión",
    description: "Componente de suspensión automotriz con análisis de esfuerzos y optimización de peso.",
    imageUrl: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&h=600&fit=crop"
  }
];

const FeaturedCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % featuredProjects.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + featuredProjects.length) % featuredProjects.length);
  };

  return (
    <section className="hig-section relative">
      <div className="absolute inset-0 bg-gradient-to-r from-background-primary/60 to-system-blue/5"></div>
      <div className="hig-container relative z-10">
        <div className="text-center mb-16">
          <div className="hig-card p-8 inline-block hig-animate-in">
            <h2 className="text-large-title font-bold text-label-primary">
              PROYECTOS DESTACADOS
            </h2>
          </div>
        </div>
        
        <div className="relative">
          <div className="flex items-center justify-center gap-8">
            <Button
              onClick={prevSlide}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full hig-button-secondary hover:shadow-apple-lg z-10"
            >
              <ChevronLeft className="w-6 h-6" />
            </Button>

            <div className="flex items-center gap-8 overflow-hidden w-full max-w-7xl">
              {featuredProjects.map((project, index) => {
                const offset = index - currentIndex;
                const isActive = index === currentIndex;
                
                return (
                  <div
                    key={project.id}
                    className={`transition-all duration-500 ease-out ${
                      isActive 
                        ? 'scale-110 z-20 opacity-100' 
                        : 'scale-90 opacity-60'
                    }`}
                    style={{
                      transform: `translateX(${offset * 300}px) ${isActive ? 'scale(1.1)' : 'scale(0.9)'}`,
                      minWidth: '350px'
                    }}
                  >
                    <ProjectCard
                      id={project.id}
                      title={project.title}
                      description={project.description}
                      imageUrl={project.imageUrl}
                      className={isActive ? 'shadow-apple-lg' : ''}
                    />
                  </div>
                );
              })}
            </div>

            <Button
              onClick={nextSlide}
              variant="outline"
              size="icon"
              className="w-14 h-14 rounded-full hig-button-secondary hover:shadow-apple-lg z-10"
            >
              <ChevronRight className="w-6 h-6" />
            </Button>
          </div>

          <div className="flex justify-center mt-12 gap-3">
            {featuredProjects.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentIndex 
                    ? 'bg-system-blue scale-125 shadow-apple-sm' 
                    : 'bg-system-gray-3 hover:bg-system-blue/60'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCarousel;

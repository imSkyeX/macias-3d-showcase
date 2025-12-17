
import ProjectCard from "./ProjectCard";

const ucaProjects = [
  {
    id: "bearing-housing",
    title: "Carcasa de Rodamiento",
    description: "Práctica de diseño mecánico con tolerancias y ajustes precisos para aplicaciones industriales.",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=600&h=400&fit=crop"
  },
  {
    id: "hydraulic-cylinder",
    title: "Cilindro Hidráulico",
    description: "Modelado completo de sistema hidráulico con análisis de presiones y componentes internos.",
    imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=600&h=400&fit=crop"
  },
  {
    id: "gear-assembly",
    title: "Ensamble de Engranajes",
    description: "Sistema de transmisión con múltiples relaciones y análisis cinemático completo.",
    imageUrl: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=600&h=400&fit=crop"
  },
  {
    id: "valve-mechanism",
    title: "Mecanismo de Válvula",
    description: "Diseño de válvula de control con actuador y sistema de sellado optimizado.",
    imageUrl: "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=600&h=400&fit=crop"
  }
];

const UcaPracticesGrid = () => {
  return (
    <section className="hig-section relative">
      <div className="absolute inset-0 bg-gradient-to-b from-system-blue/5 to-background-primary/80"></div>
      <div className="hig-container relative z-10">
        <div className="text-center mb-16">
          <div className="hig-card p-8 inline-block hig-animate-in">
            <h2 className="text-large-title font-bold text-label-primary">
              PRÁCTICAS UCA
            </h2>
          </div>
        </div>
        
        <div className="hig-grid-4">
          {ucaProjects.map((project, index) => (
            <div 
              key={project.id}
              className="hig-animate-scale"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <ProjectCard
                id={project.id}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UcaPracticesGrid;

import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import UcaPracticesGrid from "@/components/UcaPracticesGrid";
// 1. IMPORTAMOS TU COMPONENTE
import ProjectCard from "@/components/ProjectCard"; 

// Interfaz de datos
interface ProjectData {
  title: string;
  slug: { current: string };
  description: string;
  imageUrl: string;
}

const Index = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        // Pedimos los datos a Sanity (incluida la URL de la imagen)
        const query = `*[_type == "project"]{
          title,
          slug,
          description,
          "imageUrl": mainImage.asset->url
        }`;
        const data = await client.fetch(query);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, []);

  return (
    <div className="min-h-screen bg-background-secondary">
      {/* HEADER */}
      <header className="hig-navigation">
        <div className="hig-container">
          <div className="flex justify-between items-center py-6">
            <div className="hig-animate-in">
              <h1 className="text-large-title font-bold text-label-primary tracking-tight">
                JM MACIAS
              </h1>
              <p className="text-headline text-system-blue font-semibold mt-1">3D Designer & CATIA Specialist</p>
            </div>
            <div className="text-right hig-animate-in" style={{ animationDelay: '0.2s' }}>
              <div className="text-title-2 font-bold text-label-primary">DS CATIA</div>
              <p className="text-footnote text-label-secondary font-medium">Professional 3D Modeling</p>
            </div>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="hig-section relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background-primary/80 to-system-blue/5"></div>
        <div className="hig-container text-center relative z-10">
          <div className="hig-card-elevated p-16 max-w-5xl mx-auto hig-animate-scale">
            <h2 className="text-large-title font-bold text-label-primary mb-8 tracking-tight">
              Diseño 3D Profesional
            </h2>
            <p className="text-title-3 text-label-secondary max-w-4xl mx-auto leading-relaxed font-normal">
              Especialista en modelado 3D con CATIA V5, creando soluciones innovadoras para la industria automotriz 
              y mecánica. Cada proyecto combina precisión técnica con creatividad en el diseño.
            </p>
          </div>
        </div>
      </section>

      {/* --- SECCIÓN DE PROYECTOS (AQUÍ USAMOS TU PROJECTCARD) --- */}
      <section className="hig-section py-12">
        <div className="hig-container">
          <h3 className="text-title-2 font-bold text-label-primary mb-8 hig-animate-in">Proyectos Destacados</h3>
          
          {loading ? (
            <div className="text-center py-20 text-label-secondary">Cargando proyectos...</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                // 2. USAMOS TU COMPONENTE AQUÍ
                <ProjectCard 
                  key={project.slug.current}
                  id={project.slug.current}          // Pasamos el slug como ID
                  title={project.title}
                  description={project.description}
                  imageUrl={project.imageUrl}        // Pasamos la URL de Sanity
                  className="hig-animate-in"         // Mantenemos la animación
                  // style={{ animationDelay: `${index * 0.1}s` }} // (Opcional si ProjectCard acepta style)
                />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* UCA Practices Grid */}
      <UcaPracticesGrid />

      {/* Footer */}
      <footer className="material-thick text-label-primary hig-section mt-20">
        <div className="hig-container text-center">
          <div className="hig-card-elevated p-12 max-w-3xl mx-auto">
            <h3 className="text-title-2 font-bold mb-6 text-label-primary">JM MACIAS</h3>
            <p className="text-headline text-system-blue mb-8 font-semibold">
              3D Designer especializado en CATIA V5 | Diseño Mecánico e Industrial
            </p>
            <div className="border-t border-separator-non-opaque/30 pt-8">
              <p className="text-footnote text-label-secondary">
                © 2024 JM MACIAS. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
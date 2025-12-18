import { useEffect, useState } from "react";
import { client } from "../lib/sanity";
import ProjectCard from "@/components/ProjectCard";
import FeaturedCarousel from "@/components/FeaturedCarousel";
import { Box, Layers, PenTool, LayoutGrid } from "lucide-react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/intro-logo.json"; 

interface ProjectData {
  title: string;
  slug: { current: string };
  description: string;
  imageUrl: string;
  featuredImageUrl?: string;
  category: string;
  isFeatured: boolean;
}

const TABS = [
  { id: "All", label: "Todos", icon: LayoutGrid },
  { id: "Part Design", label: "Part Design", icon: Box },
  { id: "Generative Shape Design", label: "GSD (Shapes)", icon: PenTool },
  { id: "Module Assembly", label: "Assembly", icon: Layers },
];

const Projects = () => {
  const [projects, setProjects] = useState<ProjectData[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("All");

  useEffect(() => {
    const fetchData = async () => {
      // 1. Iniciamos la carga de datos
      const projectsPromise = client.fetch(
        `*[_type == "project"] | order(_createdAt desc) {
          title, 
          slug, 
          description, 
          category,
          isFeatured,
          "imageUrl": mainImage.asset->url,
          "featuredImageUrl": featuredImage.asset->url
        }`
      );

      // 2. Creamos una promesa artificial de 1 segundo (o 1000ms)
      // Esto asegura que el loader se vea AL MENOS este tiempo.
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 900)); 

      try {
        // 3. Esperamos a que AMBAS cosas terminen (la carga y el tiempo mínimo)
        const [data] = await Promise.all([projectsPromise, delayPromise]);
        setProjects(data);
      } catch (error) {
        console.error("Error fetching projects:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const featuredProjects = projects.filter((p) => p.isFeatured);
  const carouselProjects = featuredProjects.length > 0 ? featuredProjects : projects.slice(0, 1);
  
  const filteredProjects = activeTab === "All"
    ? projects
    : projects.filter((p) => p.category === activeTab);

  // --- AQUI ESTA EL CAMBIO DEL LOADER ---
  if (loading) {
    return (
      <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center z-50 fixed inset-0">
        <div className="w-64 h-64 md:w-96 md:h-96"> {/* Controla el tamaño del logo aquí */}
           <Lottie 
             animationData={animationData} 
             loop={true} // Lo ponemos en bucle por si la carga tarda más de la cuenta
             autoplay={true}
           />
        </div>
      </div>
    );
  }
  // --------------------------------------

  return (
    <div className="min-h-screen bg-[#1e1e1e] md:pt-[5.5rem] pb-20"> 
      
      {/* --- SECCIÓN 1: CARRUSEL --- */}
      <div className="w-full h-[60vh] min-h-[500px] relative z-0 mb-12">
        {carouselProjects.length > 0 && (
          <FeaturedCarousel projects={carouselProjects} />
        )}
      </div>

      {/* --- SECCIÓN 2: GRID & FILTROS --- */}
      <div className="container mx-auto px-4">
        
        <div className="flex flex-col md:flex-row justify-between items-end gap-6 mb-12">
          <div>
            <h2 className="text-3xl font-bold text-white mb-2">Galería Técnica</h2>
            <p className="text-white/40">
              Selecciona una disciplina para filtrar los proyectos.
            </p>
          </div>

          {/* BARRA DE NAVEGACIÓN (TABS) */}
          <div className="flex flex-wrap md:flex-nowrap justify-center gap-2 bg-orange-800/50 rounded-xl border border-white/5 p-1 w-full md:w-auto h-fit">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors duration-300
                    ${isActive ? "text-white" : "text-orange-200 hover:text-white hover:bg-white/5"}
                  `}
                  style={{ WebkitTapHighlightColor: "transparent" }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute inset-0 bg-orange-600 rounded-xl shadow-lg shadow-orange-900/20"
                      initial={false}
                      transition={{ type: "spring", stiffness: 300, damping: 30 }}
                    />
                  )}
                  <span className="relative z-10 flex items-center gap-2">
                    <Icon size={16} />
                    {tab.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {filteredProjects.map((project) => (
            <div key={project.slug.current} className="animate-fadeIn">
              <ProjectCard 
                id={project.slug.current}
                title={project.title}
                description={project.description}
                imageUrl={project.imageUrl}
                category={project.category}
                className=""
              />
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-20 border border-white/40 rounded-2xl bg-[#202020] shadow-[inset_0_0_50px_rgba(255,255,255,0.20)]">
            <p className="text-white/40 text-lg">No hay proyectos en esta categoría todavía.</p>
          </div>
        )}

      </div>
    </div>
  );
};

export default Projects;
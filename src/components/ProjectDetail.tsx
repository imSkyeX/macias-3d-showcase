import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Layers, Box, PenTool } from "lucide-react"; 
import { client } from "@/lib/sanity"; 
import ModelViewer from "./ModelViewer";
// 1. IMPORTAMOS LOTTIE Y EL JSON
import Lottie from "lottie-react";
import animationData from "../assets/intro-logo.json"; 

interface ProjectData {
  title: string;
  description: string;
  category?: string;
  tools?: string[];
  challenges?: string;
  specifications?: string[];
  modelUrl?: string;
}

const getCategoryStyles = (category: string = "Default") => {
  switch (category) {
    case "Part Design":
      return {
        text: "text-blue-400",
        bg: "bg-blue-500",
        border: "border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/50",
        icon: <Box className="w-5 h-5" />
      };
    case "Generative Shape Design":
      return {
        text: "text-purple-400",
        bg: "bg-purple-500",
        border: "border-purple-500/30",
        badge: "bg-purple-500/20 text-purple-300 border-purple-500/50",
        icon: <PenTool className="w-5 h-5" />
      };
    case "Module Assembly":
      return {
        text: "text-amber-400",
        bg: "bg-amber-500",
        border: "border-amber-500/30",
        badge: "bg-amber-500/20 text-amber-300 border-amber-500/50",
        icon: <Layers className="w-5 h-5" />
      };
    default:
      return {
        text: "text-gray-400",
        bg: "bg-gray-500",
        border: "border-gray-500/30",
        badge: "bg-gray-500/20 text-gray-300",
        icon: <Box className="w-5 h-5" />
      };
  }
};

const ProjectDetail = () => {
  const { slug } = useParams<{ slug: string }>(); 
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      if (!slug) return;

      // 2. LÓGICA DE CARGA MÍNIMA (Igual que en Projects.tsx)
      const dataPromise = client.fetch(
        `*[_type == "project" && slug.current == $slug][0]{
          title,
          description,
          category,
          tools,
          challenges,
          specifications,
          "modelUrl": model3d.asset->url 
        }`, 
        { slug }
      );
      
      // Forzamos 1 segundo de espera mínima para ver la animación
      const delayPromise = new Promise((resolve) => setTimeout(resolve, 900));

      try {
        const [data] = await Promise.all([dataPromise, delayPromise]);
        setProject(data);
      } catch (error) {
        console.error("Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [slug]);

  const styles = getCategoryStyles(project?.category);

  // 3. RENDERIZADO DEL LOADER ANIMADO
  if (loading) {
    return (
        <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center z-50 fixed inset-0">
          <div className="w-48 h-48 md:w-64 md:h-64">
             <Lottie 
               animationData={animationData} 
               loop={true} 
               autoplay={true}
             />
          </div>
        </div>
    );
  }

  if (!project) return <div className="min-h-screen bg-[#1e1e1e] flex items-center justify-center text-white">Proyecto no encontrado...</div>;

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-slate-200 pt-24 selection:bg-white/20"> 
      
      <div className="container mx-auto px-6 py-12">
        {/* BOTÓN VOLVER (Hover dinámico) */}
        <Link to="/proyectos" className={`inline-flex items-center gap-2 text-slate-400 hover:${styles.text} mb-8 transition-colors group`}>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Volver al portfolio</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          {/* --- COLUMNA IZQUIERDA --- */}
          <div className="space-y-10 animate-fadeIn">
            
            {/* CABECERA CON BADGE */}
            <div>
              {/* Badge de Categoría */}
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 ${styles.badge}`}>
                {styles.icon}
                {project.category}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
              <div className={`h-1 w-20 ${styles.bg} rounded-full mb-6`}></div> {/* Línea decorativa */}
              
              <p className="text-white/40 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {/* HERRAMIENTAS (Pills dinámicas) */}
            {project.tools && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className={styles.text}>///</span> Herramientas
                </h3>
                <div className="flex flex-wrap gap-2">
                  {project.tools.map((tool, index) => (
                    <span 
                      key={index}
                      className={`
                        px-3 py-1.5 rounded bg-white/10 border border-white/40 
                        text-sm font-thin text-white
                        hover:${styles.border} hover:font-medium
                      `}
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* ESPECIFICACIONES (Bullets dinámicos) */}
            {project.specifications && (
              <div className="bg-[#353535] border border-white/70 rounded-xl p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Especificaciones Técnicas</h3>
                <ul className="space-y-3">
                  {project.specifications.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      {/* El punto de la lista usa el color de la categoría */}
                      <div className={`w-1.5 h-1.5 ${styles.bg} rounded-full mt-2.5 flex-shrink-0 shadow-[0_0_8px_currentColor]`}></div>
                      <span className="text-slate-400">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* DESAFÍOS */}
            {project.challenges && (
              <div>
                 <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className={styles.text}>///</span> Desafíos & Soluciones
                </h3>
                <p className="text-white/40 leading-relaxed whitespace-pre-line border-l-2 border-white/40 pl-6">
                  {project.challenges}
                </p>
              </div>
            )}
          </div>

          {/* --- COLUMNA DERECHA (3D) --- */}
          <div className="lg:sticky lg:top-32 h-fit">
            <div className={`bg-[#494949] border ${styles.border} rounded-2xl p-2 shadow-2xl`}>
              
              {project.modelUrl ? (
                 <div className="w-full rounded-xl overflow-hidden relative group">
                    <ModelViewer modelPath={project.modelUrl} />
                    
                    {/* Overlay indicativo */}
                    <div className="absolute bottom-4 left-0 w-full text-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
                        <span className="bg-black/50 text-white text-xs px-3 py-1 rounded-full backdrop-blur-md">
                            Interactivo 3D
                        </span>
                    </div>
                 </div>
              ) : (
                <div className="aspect-square bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 border border-slate-700 border-dashed">
                   <span>Modelo 3D no disponible</span>
                </div>
              )}
              
            </div>
            
            {/* Metadatos extra estilo ingeniería */}
            <div className="mt-4 grid grid-cols-2 gap-4 text-xs font-mono text-slate-500 uppercase">
                <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span>Status</span> <span className="text-emerald-500">Completed</span>
                </div>
                <div className="flex justify-between border-b border-slate-800 pb-1">
                    <span>License</span> <span>Proprietary</span>
                </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
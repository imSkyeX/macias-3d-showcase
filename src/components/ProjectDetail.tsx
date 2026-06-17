import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Layers, Box, PenTool } from "lucide-react"; 
import { client } from "@/lib/sanity"; 
import ModelViewer from "./ModelViewer";
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
  // --- NUEVOS CAMPOS AÑADIDOS ---
  hasExplodedView?: boolean;
  explodedModelUrl?: string;
}

const getCategoryStyles = (category: string = "Default") => {
  switch (category) {
    case "CATIA V5":
      return {
        text: "text-blue-400",
        bg: "bg-blue-500",
        border: "border-blue-500/30",
        badge: "bg-blue-500/20 text-blue-300 border-blue-500/50",
        icon: <Layers className="w-5 h-5" />
      };
    case "SolidWorks":
      return {
        text: "text-red-400",
        bg: "bg-red-500",
        border: "border-red-500/30",
        badge: "bg-red-500/20 text-red-300 border-red-500/50",
        icon: <Box className="w-5 h-5" />
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

      const dataPromise = client.fetch(
        `*[_type == "project" && slug.current == $slug][0]{
          title,
          description,
          category,
          tools,
          challenges,
          specifications,
          "modelUrl": model3d.asset->url,
          hasExplodedView,
          "explodedModelUrl": explodedModel3d.asset->url
        }`, 
        { slug }
      );
      
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
    <div className="min-h-screen bg-[#1e1e1e] text-slate-200 selection:bg-white/20"> 
      
      <div className="container mx-auto px-6 py-6 md:pt-24">
        <Link to="/proyectos" className={`inline-flex items-center gap-2 p-2 rounded-xl text-white bg-slate-400 hover:${styles.text} mb-8 transition-colors group`}>
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="font-medium">Back to Projects</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div className="space-y-10 animate-fadeIn">
            
            <div>
              <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border text-xs font-bold uppercase tracking-wider mb-4 ${styles.badge}`}>
                {styles.icon}
                {project.category}
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
                {project.title}
              </h1>
              <div className={`h-1 w-20 ${styles.bg} rounded-full mb-6`}></div> 
              
              <p className="text-white/40 leading-relaxed text-lg">
                {project.description}
              </p>
            </div>

            {project.tools && (
              <div>
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className={styles.text}>///</span> Tools
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

            {project.specifications && (
              <div className="bg-[#353535] border border-white/70 rounded-xl p-8">
                <h3 className="text-lg font-semibold text-white mb-6">Specifications</h3>
                <ul className="space-y-3">
                  {project.specifications.map((spec, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className={`w-1.5 h-1.5 ${styles.bg} rounded-full mt-2.5 flex-shrink-0 shadow-[0_0_8px_currentColor]`}></div>
                      <span className="text-slate-400">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {project.challenges && (
              <div>
                 <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <span className={styles.text}>///</span> Challenge and Solutions
                </h3>
                <p className="text-white/40 leading-relaxed whitespace-pre-line border-l-2 border-white/40 pl-6">
                  {project.challenges}
                </p>
              </div>
            )}
          </div>

            
          <div className="lg:sticky lg:top-32 h-fit">
            <div className="lg:sticky lg:top-32 h-fit">
            <div className={`bg-[#494949] border ${styles.border} rounded-2xl p-2 shadow-2xl relative`}>
              {project.modelUrl ? (
                 <div className="w-full rounded-xl overflow-hidden relative group">
                    <ModelViewer 
                      modelUrl={project.modelUrl} 
                      explodedModelUrl={project.explodedModelUrl}
                      hasExplodedView={project.hasExplodedView}
                    />
                 </div>
              ) : (
                <div className="aspect-square bg-slate-800 rounded-xl flex items-center justify-center text-slate-500 border border-slate-700 border-dashed">
                   <span>Modelo 3D no disponible</span>
                </div>
              )}
            </div>

            {/* --- LA GUÍA DE CONTROLES CON EL ESPACIADO AQUÍ (mt-6) --- */}
            <div className="bg-[#2a2a2a] border border-white/10 rounded-xl p-6 mt-6">
              <h3 className="text-sm font-semibold text-white mb-4 flex items-center gap-2 uppercase tracking-widest opacity-80">
                <span className={styles.text}>///</span> VIEWER CONTROLS
              </h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-sm text-slate-400">
                {/* Columna Ratón */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded shadow-sm text-white font-mono text-xs">Clic Izq</kbd>
                    <span>Rotate model</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded shadow-sm text-white font-mono text-xs">Clic Der</kbd>
                    <span>Move plane</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <kbd className="px-2 py-1 bg-white/10 border border-white/20 rounded shadow-sm text-white font-mono text-xs">Rueda</kbd>
                    <span>Zoom (+/-)</span>
                  </div>
                </div>

                {/* Columna Teclado / Táctil */}
                <div className="space-y-3 border-l border-white/10 pl-0 sm:pl-6">
                  <div className="flex items-center gap-3">
                    <span className="text-xl">👆</span>
                    <span>1 Finger Rotate</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xl">✌️</span>
                    <span>2 Finger Zoom</span>
                  </div>
                </div>
              </div>
            </div>
            {/* -------------------------------------------------------- */}

          </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
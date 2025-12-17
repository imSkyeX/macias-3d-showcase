import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { client } from "../lib/sanity"; // Asegúrate de que la ruta sea correcta
import ModelViewer from "./ModelViewer";

// 1. Definimos la interfaz de lo que esperamos recibir de Sanity
interface ProjectData {
  title: string;
  description: string;
  tools: string[];
  challenges: string;
  specifications: string[];
  modelUrl: string; // La URL del archivo GLB
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>(); // 'id' aquí actúa como el slug
  
  // 2. Estados para manejar la carga de datos
  const [project, setProject] = useState<ProjectData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Scroll al inicio al cargar la página
    window.scrollTo(0, 0);

    const fetchProject = async () => {
      if (!id) return;

      try {
        // 3. Query GROQ para traer todos los datos necesarios
        const query = `*[_type == "project" && slug.current == $slug][0]{
          title,
          description,
          tools,
          challenges,
          specifications,
          "modelUrl": model3d.asset->url
        }`;

        const data = await client.fetch(query, { slug: id });
        setProject(data);
      } catch (error) {
        console.error("Error cargando proyecto:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProject();
  }, [id]);

  // 4. Renderizado condicional: Carga
  if (loading) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="animate-pulse text-label-secondary font-medium">Cargando experiencia 3D...</div>
      </div>
    );
  }

  // 5. Renderizado condicional: No encontrado
  if (!project) {
    return (
      <div className="min-h-screen bg-background-secondary flex items-center justify-center">
        <div className="hig-card-elevated p-12 text-center max-w-md">
          <h1 className="text-title-2 font-bold text-label-primary mb-6">Proyecto no encontrado</h1>
          <Link to="/">
            <Button className="hig-button-primary px-6 py-3">
              Volver al inicio
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  // 6. Renderizado Principal (Tu UI original con datos dinámicos)
  return (
    <div className="min-h-screen bg-background-secondary">
      <div className="hig-container py-12">
        <Link to="/" className="inline-flex items-center gap-3 hig-button-secondary px-6 py-3 mb-12 transition-all duration-200">
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Volver a proyectos</span>
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="space-y-10">
            {/* Título y Descripción */}
            <div className="hig-card-elevated p-10 hig-animate-in">
              <h1 className="text-large-title font-bold text-label-primary mb-8">{project.title}</h1>
              <p className="text-body text-label-secondary leading-relaxed whitespace-pre-line">
                {project.description}
              </p>
            </div>

            {/* Herramientas (Solo se muestran si existen en Sanity) */}
            {project.tools && project.tools.length > 0 && (
              <div className="hig-card-elevated p-10 hig-animate-in" style={{ animationDelay: '0.1s' }}>
                <h3 className="text-title-3 font-semibold text-label-primary mb-6">Herramientas Utilizadas</h3>
                <div className="flex flex-wrap gap-4">
                  {project.tools.map((tool: string, index: number) => (
                    <span 
                      key={index}
                      className="px-6 py-3 hig-button-secondary rounded-apple-lg text-footnote font-medium"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Especificaciones (Solo si existen) */}
            {project.specifications && project.specifications.length > 0 && (
              <div className="hig-card-elevated p-10 hig-animate-in" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-title-3 font-semibold text-label-primary mb-6">Especificaciones Técnicas</h3>
                <ul className="space-y-4">
                  {project.specifications.map((spec: string, index: number) => (
                    <li key={index} className="flex items-start gap-4">
                      <div className="w-2 h-2 bg-system-blue rounded-full mt-3 flex-shrink-0"></div>
                      <span className="text-body text-label-secondary">{spec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Desafíos (Solo si existe) */}
            {project.challenges && (
              <div className="hig-card-elevated p-10 hig-animate-in" style={{ animationDelay: '0.3s' }}>
                <h3 className="text-title-3 font-semibold text-label-primary mb-6">Desafíos del Proyecto</h3>
                <p className="text-body text-label-secondary leading-relaxed whitespace-pre-line">
                  {project.challenges}
                </p>
              </div>
            )}
          </div>

          {/* VISOR 3D */}
          <div className="lg:sticky lg:top-12">
            <div className="hig-card-elevated p-8 shadow-apple-lg hig-animate-scale">
              <h3 className="text-title-3 font-semibold text-label-primary mb-6">Visor 3D Interactivo</h3>
              <p className="text-body text-label-secondary mb-8">Haz clic y arrastra para rotar. Usa la rueda del mouse para hacer zoom.</p>
              {/* AQUÍ PASAMOS LA URL DINÁMICA */}
              {project.modelUrl ? (
                 <ModelViewer modelPath={project.modelUrl} className="h-96 rounded-apple-xl overflow-hidden" />
              ) : (
                <div className="h-96 bg-gray-100 rounded-apple-xl flex items-center justify-center text-gray-400">
                  Modelo 3D no disponible
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetail;
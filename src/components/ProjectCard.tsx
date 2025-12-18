import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageOff, Box, Layers, PenTool } from "lucide-react"; // Importamos iconos extra

// 1. Configuración de estilos por categoría
const CATEGORY_STYLES: Record<string, { color: string; badge: string; button: string; icon: any }> = {
  "Part Design": {
    color: "text-blue-500",
    badge: "bg-blue-600/90 text-white shadow-blue-500/20",
    button: "bg-blue-600 hover:bg-blue-700 text-white", // Botón azul
    icon: Box
  },
  "Generative Shape Design": {
    color: "text-purple-500",
    badge: "bg-purple-600/90 text-white shadow-purple-500/20",
    button: "bg-purple-600 hover:bg-purple-700 text-white", // Botón violeta
    icon: PenTool
  },
  "Module Assembly": {
    color: "text-amber-500",
    badge: "bg-amber-600/90 text-white shadow-amber-500/20",
    button: "bg-amber-600 hover:bg-amber-700 text-white", // Botón naranja
    icon: Layers
  }
};

// Estilo por defecto (por si falta la categoría)
const DEFAULT_STYLE = {
  color: "text-slate-500",
  badge: "bg-slate-700 text-slate-200",
  button: "bg-slate-800 hover:bg-slate-900 text-white",
  icon: Box
};

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string; // <--- 2. AÑADIMOS ESTA PROP NUEVA
  className?: string;
}

const ProjectCard = ({ id, title, description, imageUrl, category, className }: ProjectCardProps) => {
  
  // 3. Seleccionamos el estilo basado en la prop 'category'
  const theme = category ? CATEGORY_STYLES[category] || DEFAULT_STYLE : DEFAULT_STYLE;
  const Icon = theme.icon;

  return (
    <div className={`hig-card-interactive overflow-hidden flex flex-col h-full group ${className}`}>
      
      {/* Contenedor de la Imagen */}
      <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-t-xl relative">
        
        {/* --- NUEVO: BADGE DE CATEGORÍA --- */}
        {category && (
          <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-lg ${theme.badge}`}>
            <Icon size={12} />
            {category === "Generative Shape Design" ? "GSD" : category} {/* Acortamos GSD si es muy largo */}
          </div>
        )}

        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-500 bg-gray-800">
            <ImageOff className="w-8 h-8 mb-2 opacity-40" />
            <span className="text-xs font-medium opacity-60">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Contenido de texto */}
      <div className="p-6 flex flex-col flex-grow bg-[#1e1e1e] border-x border-b border-white/5 rounded-b-xl">
        <h3 className="text-xl font-bold text-white mb-3 group-hover:text-white/90 transition-colors">
          {title}
        </h3>
        
        <p className="text-gray-400 text-sm mb-6 leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>
        
        <Link to={`/proyectos/${id}`} className="mt-auto">
          {/* 4. APLICAMOS EL COLOR AL BOTÓN */}
          <Button 
            className={`w-full font-semibold transition-all duration-300 border rounded-xl ${theme.button}`}
          >
            VER EN 3D
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
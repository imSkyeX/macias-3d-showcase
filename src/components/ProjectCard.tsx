import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageOff, Box, Layers } from "lucide-react"; 

// 1. Configuración de estilos por Software
const CATEGORY_STYLES: Record<string, { color: string; badge: string; button: string; icon: any }> = {
  "CATIA V5": {
    color: "text-blue-500",
    badge: "bg-blue-600/90 text-white shadow-blue-500/20",
    button: "bg-blue-600 hover:bg-blue-700 text-white border-blue-500/50", 
    icon: Layers
  },
  "SolidWorks": {
    color: "text-red-500",
    badge: "bg-red-600/90 text-white shadow-red-500/20",
    button: "bg-red-600 hover:bg-red-700 text-white border-red-500/50", 
    icon: Box
  }
};

// Estilo por defecto
const DEFAULT_STYLE = {
  color: "text-slate-500",
  badge: "bg-slate-700 text-slate-200",
  button: "bg-slate-800 hover:bg-slate-900 text-white border-slate-700",
  icon: Box
};

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category?: string; 
  className?: string;
}

const ProjectCard = ({ id, title, description, imageUrl, category, className }: ProjectCardProps) => {
  
  const theme = category ? CATEGORY_STYLES[category] || DEFAULT_STYLE : DEFAULT_STYLE;
  const Icon = theme.icon;

  return (
    <div className={`hig-card-interactive overflow-hidden flex flex-col h-full group ${className}`}>
      
      {/* Contenedor de la Imagen */}
      <div className="aspect-video w-full bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden rounded-t-xl relative">
        
        {/* BADGE DE SOFTWARE */}
        {category && (
          <div className={`absolute top-3 right-3 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-sm shadow-lg ${theme.badge}`}>
            <Icon size={12} />
            {category}
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
          <Button 
            className={`w-full font-semibold transition-all duration-300 border rounded-xl ${theme.button}`}
          >
            View 3D
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;
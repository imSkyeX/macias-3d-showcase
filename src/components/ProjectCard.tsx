import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ImageOff } from "lucide-react"; // Icono para cuando no hay imagen

interface ProjectCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  className?: string;
}

const ProjectCard = ({ id, title, description, imageUrl, className }: ProjectCardProps) => {
  return (
    <div className={`hig-card-interactive overflow-hidden flex flex-col h-full ${className}`}>
      
      {/* Contenedor de la Imagen */}
      <div className="aspect-video w-full bg-gradient-to-br from-system-gray-6 to-background-primary overflow-hidden rounded-apple-lg relative">
        {imageUrl ? (
          <img 
            src={imageUrl} 
            alt={title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500 ease-out"
            loading="lazy" // Optimización para que cargue mejor en listas largas
          />
        ) : (
          // Estado cuando NO hay imagen (Fallback)
          <div className="w-full h-full flex flex-col items-center justify-center text-label-tertiary bg-gray-100/50">
            <ImageOff className="w-8 h-8 mb-2 opacity-40" />
            <span className="text-footnote font-medium opacity-60">Sin imagen</span>
          </div>
        )}
      </div>

      {/* Contenido de texto */}
      <div className="p-8 flex flex-col flex-grow">
        <h3 className="text-title-3 font-semibold text-label-primary mb-4">
          {title}
        </h3>
        
        {/* line-clamp-3 limita el texto a 3 líneas para que todas las cards midan lo mismo */}
        <p className="text-body text-label-secondary mb-6 leading-relaxed line-clamp-3 flex-grow">
          {description}
        </p>
        
        <Link to={`/project/${id}`} className="mt-auto">
          <Button 
            className="w-full hig-button-primary text-body font-semibold"
          >
            VIEW IN 3D
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default ProjectCard;

import { useState, useEffect } from "react";
import Spline from '@splinetool/react-spline';

// Importamos el video como módulo para que Vite lo procese correctamente
import videoMovil from '../assets/fondo-movil.mp4';

export default function Fondo3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {isMobile ? (
        /* --- MODO MÓVIL: VÍDEO --- */
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="w-full h-full object-cover pointer-events-none" 
        >
          {/* Usamos la variable importada videoMovil */}
          <source src={videoMovil} type="video/mp4" />
        </video>
      ) : (
        /* --- MODO ESCRITORIO: SPLINE 3D --- */
        <Spline scene="https://prod.spline.design/XpthAcuM6ezUVpXO/scene.splinecode" />
      )}
    </div>
  );
}
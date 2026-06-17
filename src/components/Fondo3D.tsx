import { useState, useEffect } from "react";
import Spline from '@splinetool/react-spline';

export default function Fondo3D() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Consideramos móvil si es menor de 768px (medida estándar de tablets/móviles)
      setIsMobile(window.innerWidth < 768);
    };

    // Comprobar al iniciar
    handleResize();

    // Escuchar cambios de tamaño (por si giran la pantalla)
    window.addEventListener("resize", handleResize);

    // Limpiar evento al desmontar
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="fixed inset-0 w-full h-full z-0">
      {isMobile ? (
        /* --- MODO MÓVIL: VÍDEO --- */
        /* 'object-cover' asegura que el video cubra toda la pantalla sin deformarse */
        <video 
          autoPlay 
          loop 
          muted 
          playsInline // Obligatorio para que funcione autoplay en iPhone
          className="w-full h-full object-cover pointer-events-none" 
        >
          {/* Asegúrate de que este archivo exista en la carpeta public/videos/ */}
          <source src="/src/assets/fondo-movil.mp4" type="video/mp4" />
        </video>
      ) : (
        /* --- MODO ESCRITORIO: SPLINE 3D --- */
        <Spline scene="https://prod.spline.design/XpthAcuM6ezUVpXO/scene.splinecode" />
      )}
    </div>
  );
}
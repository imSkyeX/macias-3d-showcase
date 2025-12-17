import { motion } from "framer-motion";
import Lottie from "lottie-react";
// Asegúrate de que este archivo JSON es la NUEVA versión blanca
import animationData from "../assets/intro-logo.json"; 

interface InitialLoaderProps {
  onComplete: () => void;
}

const InitialLoader = ({ onComplete }: InitialLoaderProps) => {
  return (
    <motion.div
      // CAMBIO AQUÍ: de 'z-50' a 'z-[999]'
      // Esto fuerza al loader a estar SIEMPRE encima de todo (header, modales, alertas...)
      className="fixed inset-0 z-[999] flex items-center justify-center bg-black/70 backdrop-blur-md"
      
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      {/* Contenedor del logo (tamaño ajustado) */}
      <div className="w-4/5 md:w-1/2 lg:w-1/3 max-w-3xl relative">
        <Lottie 
          animationData={animationData}
          loop={false}
          autoplay={true}
          onComplete={onComplete}
          // Como el logo ahora es blanco, resaltará perfectamente sobre el fondo oscuro
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

export default InitialLoader;
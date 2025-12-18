import { motion } from "framer-motion";
import Lottie from "lottie-react";
import animationData from "../assets/intro-logo.json"; 

interface InitialLoaderProps {
  onComplete: () => void;
}

const InitialLoader = ({ onComplete }: InitialLoaderProps) => {
  return (
    <motion.div
      // --- CAMBIOS AQUÍ ---
      // 1. Quitamos 'bg-black/30' (el gris).
      // 2. Aumentamos a 'backdrop-blur-xl' o 'backdrop-blur-2xl' para que se note más el efecto cristal.
      // 3. Opcional: 'bg-white/5' o 'bg-black/5' si quieres un toquecito casi invisible de textura.
      className="fixed inset-0 z-[999] flex items-center justify-center backdrop-blur-xl bg-transparent"
      
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }} 
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className="w-4/5 md:w-1/2 lg:w-1/3 max-w-3xl relative">
        <Lottie 
          animationData={animationData}
          loop={false}
          autoplay={true}
          onComplete={onComplete}
          className="w-full h-auto"
        />
      </div>
    </motion.div>
  );
};

export default InitialLoader;
import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

// === 1. DEFINICIÓN DE INTERFAZ ===
interface IndexProps {
  preloaderActive?: boolean;
}

// === 2. CONFIGURACIÓN DE ANIMACIONES ===
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

const itemVariants: Variants = {
  hidden: { 
    y: 30,
    opacity: 0,
    filter: "blur(10px)",
  },
  visible: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

// === 3. COMPONENTE PRINCIPAL ===
const Index = ({ preloaderActive = false }: IndexProps) => {
  
  return (
    // CAMBIO: pt-32 pb-12 px-5 empuja hacia abajo en móvil y da márgenes laterales. md:pt-0 resetea en PC.
    <div className="min-h-screen flex items-center justify-center pt-32 pb-12 px-5 md:pt-0 relative z-10">
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={preloaderActive ? "hidden" : "visible"}
        
        // CAMBIO: w-full asegura que respeta los márgenes. p-6 para móvil, p-16 para PC.
        className="
          w-full max-w-5xl mx-auto text-center 
          bg-white/5 backdrop-blur-xl border border-white/50 
          rounded-[2.5rem] md:rounded-[3rem] p-6 md:p-16 
          shadow-[inset_0_0_50px_rgba(255,255,255,0.40)]
        "
      >
        
        {/* CAMBIO: text-4xl en móvil para que no se desborde, text-8xl en PC */}
        <motion.h1 
          variants={itemVariants} 
          className="text-4xl md:text-8xl font-bold text-white mb-4 md:mb-6 tracking-tight drop-shadow-lg"
        >
          JM MACIAS
        </motion.h1>

        {/* CAMBIO: Añadido un <br> oculto en PC para dividir la línea limpiamente en móvil */}
        <motion.h2 
          variants={itemVariants}
          className="text-xl md:text-4xl font-light text-gray-100 mb-6 md:mb-8 leading-tight"
        >
          Industrial Design Engineer & <br className="block md:hidden" /> <span className="text-[#ff9500] font-semibold">Advanced 3D</span> Specialist
        </motion.h2>

        {/* CAMBIO: text-sm en móvil para que no sea un bloque tan denso, md:text-xl para PC */}
        <motion.p 
          variants={itemVariants}
          className="text-sm md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-normal mb-10 md:mb-12 drop-shadow-md"
        >
          Where rigorous engineering meets high-end visualization. Specializing in CATIA V5 and complex surface modeling, I transform intricate mechanical challenges into refined, production-ready designs. By bridging the gap between exact technical precision and uncompromising aesthetics, I create innovative solutions that elevate both form and function. Step inside to discover how raw geometry evolves into functional reality.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/proyectos" 
            className="w-[80%] md:w-auto px-8 py-4 bg-[#ff9500] text-white font-bold rounded-full hover:bg-[#ff9500]/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/20"
          >
            View Projects
          </Link>

          <Link 
            to="/contacto" 
            className="w-[80%] md:w-auto px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all hover:scale-105 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
          >
            Contact
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Index;
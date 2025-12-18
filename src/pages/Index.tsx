import { Link } from "react-router-dom";
import { motion, Variants } from "framer-motion";

// === 1. DEFINICIÓN DE INTERFAZ ===
// Definimos que este componente acepta una propiedad llamada 'preloaderActive'
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
      delayChildren: 0.5, // Pequeña espera para que el loader desaparezca suavemente
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
// Recibimos la prop 'preloaderActive' (por defecto false si no se pasa)
const Index = ({ preloaderActive = false }: IndexProps) => {
  
  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      
      <motion.div 
        variants={containerVariants}
        // LA CLAVE ESTÁ AQUÍ:
        // Si el preloader está activo -> estado "hidden"
        // Si el preloader termina (false) -> pasa a "visible"
        initial="hidden"
        animate={preloaderActive ? "hidden" : "visible"}
        
        className="
          max-w-5xl mx-auto text-center 
          bg-white/5 backdrop-blur-xl border border-white/50 
          rounded-[3rem] p-8 md:p-16 
          shadow-[inset_0_0_50px_rgba(255,255,255,0.40)]
        "
      >
        
        <motion.h1 
          variants={itemVariants} 
          className="text-5xl md:text-8xl font-bold text-white mb-6 tracking-tight drop-shadow-lg"
        >
          JM MACIAS
        </motion.h1>

        <motion.h2 
          variants={itemVariants}
          className="text-2xl md:text-4xl font-light text-gray-100 mb-8 leading-tight"
        >
          Diseño 3D Profesional & <span className="text-[#ff9500] font-semibold">CATIA V5</span> Specialist
        </motion.h2>

        <motion.p 
          variants={itemVariants}
          className="text-lg md:text-xl text-gray-200 max-w-3xl mx-auto leading-relaxed font-normal mb-12 drop-shadow-md"
        >
          Creando soluciones innovadoras para la industria automotriz y mecánica. 
          Precisión técnica y creatividad en cada modelado.
        </motion.p>

        <motion.div 
          variants={itemVariants}
          className="flex flex-col md:flex-row gap-4 justify-center items-center"
        >
          <Link 
            to="/proyectos" 
            className="px-8 py-4 bg-[#ff9500] text-white font-bold rounded-full hover:bg-[#ff9500]/90 transition-all transform hover:scale-105 shadow-lg hover:shadow-orange-500/20"
          >
            Ver Proyectos
          </Link>

          <Link 
            to="/contacto" 
            className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/30 text-white font-bold rounded-full hover:bg-white/20 transition-all hover:scale-105 shadow-[inset_0_0_10px_rgba(255,255,255,0.1)]"
          >
            Contactar
          </Link>
        </motion.div>

      </motion.div>
    </div>
  );
};

export default Index;
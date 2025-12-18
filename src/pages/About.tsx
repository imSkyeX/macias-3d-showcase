import { motion } from "framer-motion";

const About = () => {
  // Datos de ejemplo (luego los cambias)
  const skills = ["CATIA V5", "Diseño de Superficies", "Renderizado 3D", "React", "Ingeniería Mecánica", "Gestión de Proyectos"];

  return (
    <div className="min-h-screen  bg-white/5 backdrop-blur-xl text-white pt-32 pb-20">
      <div className="container mx-auto px-4">
        
        {/* TÍTULO */}
        <motion.h1 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl font-bold mb-12 text-center"
        >
          Sobre <span className="text-[#ff9500]">Mí</span>
        </motion.h1>

        <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl mx-auto">
          
          {/* 1. FOTO PRINCIPAL (Izquierda) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              {/* Marco decorativo naranja */}
              <div className="absolute inset-0 border-4 border-[#ff9500] rounded-2xl transform translate-x-4 translate-y-4"></div>
              {/* Imagen real */}
              <img 
                src="src/assets/profile-photo.jpg" // AQUI TENDRÁS QUE PONER TU FOTO EN LA CARPETA PUBLIC/ASSETS
                alt="Jose Manuel Macias" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl bg-[#1e1e1e]"
              />
            </div>
          </motion.div>

          {/* 2. TEXTO Y HABILIDADES (Derecha) */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-1/2 bg-[#1e1e1e] p-8 rounded-2xl shadow-xl border border-[#494949]"
          >
            <h2 className="text-2xl font-bold mb-4 text-[#ff9500]">¿Quién soy?</h2>
            <p className="text-gray-300 leading-relaxed mb-6">
              Soy Jose Manuel, un apasionado del diseño 3D y la ingeniería. 
              Mi trayectoria se centra en la precisión técnica y la creatividad funcional. 
              Me especializo en el uso de herramientas avanzadas como CATIA V5 para dar vida a proyectos complejos, 
              desde la conceptualización hasta el modelado final.
              <br /><br />
              Busco siempre la excelencia en cada pieza y la optimización en cada ensamblaje.
            </p>

            <h3 className="text-xl font-bold mb-4 text-white">Habilidades</h3>
            <div className="flex flex-wrap gap-3">
              {skills.map((skill, index) => (
                <span 
                  key={index} 
                  className="px-4 py-2 bg-[#494949] text-white text-sm rounded-full border border-[#848484] hover:border-[#ff9500] transition-colors cursor-default"
                >
                  {skill}
                </span>
              ))}
            </div>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default About;
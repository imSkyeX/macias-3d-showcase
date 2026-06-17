import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";

// Componentes
import Header from "@/components/Header";
import InitialLoader from "@/components/InitialLoader";
import Fondo3D from "@/components/Fondo3D"; 

// Páginas
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Graphics from "./pages/Graphics"; 
import Contact from "./pages/Contact"; // <-- NUEVO: Importamos la página de contacto
import ProjectDetail from "./components/ProjectDetail";
import GraphicDetail from "./components/GraphicDetail";

const App = () => {
  const [loading, setLoading] = useState(() => {
    const hasVisited = sessionStorage.getItem("introShown");
    return !hasVisited;
  });

  const location = useLocation();
  const navigate = useNavigate(); 

  const handleLoaderComplete = () => {
    setLoading(false);
    sessionStorage.setItem("introShown", "true");
  };
  
  // Lógica existente para gráficos
  const isGraphicDetail = location.pathname.startsWith("/graficos/") && location.pathname !== "/graficos";

  // --- NUEVA LÓGICA AÑADIDA ---
  // Detectamos si estamos en el detalle de un proyecto (ej: /proyectos/mi-app)
  const isProjectDetail = location.pathname.startsWith("/proyectos/") && location.pathname !== "/proyectos";

  const handleManualReset = () => {
    navigate("/"); 
    setLoading(true);
  };

  const show3DBackground = !location.pathname.startsWith('/proyectos');

  return (
    <>
      {show3DBackground && <Fondo3D />}

      <AnimatePresence>
        {loading && <InitialLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      <div className="app-container">
      
      {/* 4. HEADER CON LOGICA DE VISIBILIDAD MÓVIL */}
      
      {!isGraphicDetail && (
         /* Explicación de clases Tailwind:
            - Si isProjectDetail es true:
                 "hidden": Oculta el div en móviles (por defecto).
                 "md:block": Muestra el div en pantallas medianas (tablets/desktop) en adelante.
            - Si es false (resto de la web): 
                 "": No aplica ninguna clase extra (se ve siempre).
         */
         <div className={isProjectDetail ? "hidden md:block" : ""}>
             <Header onRestartAnimation={handleManualReset} />
         </div>
      )}

      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Index preloaderActive={loading} />} />
        <Route path="/sobre-mi" element={<About />} />
        <Route path="/proyectos" element={<Projects />} />
        <Route path="/proyectos/:slug" element={<ProjectDetail />} />
        
        <Route path="/graficos" element={<Graphics />} />
        <Route path="/graficos/:slug" element={<GraphicDetail />} />

        {/* --- NUEVA RUTA DE CONTACTO --- */}
        <Route path="/contacto" element={<Contact />} />
      </Routes>
      
    </div>
    </>
  );
};

export default App;
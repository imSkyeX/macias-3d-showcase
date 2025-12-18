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
import ProjectDetail from "./components/ProjectDetail";

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

  const handleManualReset = () => {
    navigate("/"); 
    setLoading(true);
  };

  // --- LÓGICA DE RENDIMIENTO ---
  // Si la ruta actual empieza por "/proyectos", NO mostramos el 3D.
  // Esto cubre tanto "/proyectos" (lista) como "/proyectos/mi-proyecto" (detalle).
  const show3DBackground = !location.pathname.startsWith('/proyectos');

  return (
    <>
      {/* Renderizado Condicional: 
         El componente <Fondo3D /> se desmonta completamente en la sección proyectos.
      */}
      {show3DBackground && <Fondo3D />}

      <AnimatePresence>
        {loading && <InitialLoader onComplete={handleLoaderComplete} />}
      </AnimatePresence>

      {/* Contenido de la App */}
      {/* Nota: En la página de proyectos, como no hay Fondo3D detrás, 
          asegúrate de que Projects.tsx tenga un color de fondo (bg-slate-900 o similar)
          para que no se vea blanco transparente.
      */}
      <div className="relative z-10 w-full min-h-screen"> 
        
        <Header onRestartAnimation={handleManualReset} />
        
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Index preloaderActive={loading} />} />
          <Route path="/sobre-mi" element={<About />} />
          <Route path="/proyectos" element={<Projects />} />
          <Route path="/proyectos/:slug" element={<ProjectDetail />} /> 
          <Route path="/graficos" element={<Graphics />} />
        </Routes>
        
      </div>
    </>
  );
};

export default App;
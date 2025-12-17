import { useState } from "react"; // <--- 1. Importamos useState
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AnimatePresence } from "framer-motion"; // <--- 2. Importamos AnimatePresence

import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import ProjectDetail from "./components/ProjectDetail";
import ScrollToTop from "./components/ScrollToTop";
import InitialLoader from "./components/InitialLoader"; // <--- 3. Importamos tu Loader

const queryClient = new QueryClient();

const App = () => {
  // 4. Creamos el estado para saber si estamos cargando
  const [isLoading, setIsLoading] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />

        {/* 5. BLOQUE DE ANIMACIÓN DE CARGA */}
        {/* AnimatePresence permite que el componente se anime al desaparecer (exit) */}
        <AnimatePresence mode="wait">
          {isLoading && (
            <InitialLoader onComplete={() => setIsLoading(false)} />
          )}
        </AnimatePresence>

        {/* Tu aplicación carga debajo (oculta por el loader al principio) */}
        <BrowserRouter>
          <ScrollToTop />
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/project/:id" element={<ProjectDetail />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
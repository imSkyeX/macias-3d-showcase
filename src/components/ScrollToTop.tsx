import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    // Cada vez que cambia la ruta (pathname), sube arriba del todo
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

export default ScrollToTop;
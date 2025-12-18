import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom"; 
import { Menu, X } from "lucide-react"; 
import { FaLinkedin, FaInstagram, FaBehance, FaXTwitter } from "react-icons/fa6"; 
import { motion, AnimatePresence, Variants } from "framer-motion"; 

import headerLogo from "../assets/header-logo.svg"; 

interface HeaderProps {
  onRestartAnimation?: () => void;
}

interface NavLinkProps {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}

const NavLink = ({ to, children, onClick }: NavLinkProps) => {
  const location = useLocation();
  const isActive = location.pathname === to;

  const lineBaseClasses = `absolute bg-white/40 transition-transform duration-300 ease-out will-change-transform`;
  const fixedWidth = "w-[calc(100%+20px)] h-px";
  const fixedHeight = "w-px h-[calc(100%+20px)]";
  const scaleXState = isActive ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100";
  const scaleYState = isActive ? "scale-y-100" : "scale-y-0 group-hover:scale-y-100";

  return (
    <Link
      to={to}
      onClick={onClick}
      className={`
        relative group inline-block font-medium tracking-wider transition-colors duration-300
        ${isActive ? "text-[#ff9500]" : "text-white hover:text-[#ff9500]"}
      `}
    >
      <span className={`${lineBaseClasses} ${fixedWidth} top-0 -left-[10px] origin-left ${scaleXState}`} />
      <span className={`${lineBaseClasses} ${fixedHeight} -top-[10px] right-0 origin-top ${scaleYState}`} />
      <span className={`${lineBaseClasses} ${fixedWidth} bottom-0 -right-[10px] origin-right ${scaleXState}`} />
      <span className={`${lineBaseClasses} ${fixedHeight} -bottom-[10px] left-0 origin-bottom ${scaleYState}`} />
      <span className="relative z-10">{children}</span>
    </Link>
  );
};

// VARIANTS: Animación líquida desde la esquina superior derecha
const menuVariants: Variants = {
  initial: {
    clipPath: "circle(0% at 100% 0%)", 
    transition: { duration: 0.5, ease: "easeInOut" }
  },
  animate: {
    clipPath: "circle(150% at 100% 0%)", 
    transition: { 
      duration: 0.6, 
      ease: [0.22, 1, 0.36, 1], 
      staggerChildren: 0.1,    
      delayChildren: 0.2       
    }
  },
  exit: {
    clipPath: "circle(0% at 100% 0%)", 
    transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } 
  }
};

const linkVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.4 } },
  exit: { opacity: 0, y: 10, transition: { duration: 0.3 } }
};

const Header = ({ onRestartAnimation }: HeaderProps) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation(); 

  const handleMobileHomeClick = () => {
    setIsMobileMenuOpen(false);
    if (onRestartAnimation) onRestartAnimation();
  };

  return (
    <>
      {/* 1. EL HEADER (Fijo arriba, fondo oscuro siempre visible) */}
      <header className="fixed top-0 left-0 right-0 z-50 py-4 bg-[#1e1e1e]/50 backdrop-blur-sm border-b border-white/10 transition-colors duration-300">
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          
          {/* LOGO */}
          <Link 
              to="/" 
              onClick={onRestartAnimation} 
              className="flex items-center shrink-0"
          >
            <img src={headerLogo} alt="JM Macias Logo" className="h-10 w-auto md:h-14" />
          </Link>

          {/* MENÚ DE NAVEGACIÓN - ESCRITORIO */}
          <nav className="hidden lg:flex items-center space-x-12">
            <NavLink to="/" onClick={onRestartAnimation}>Inicio</NavLink>
            <NavLink to="/sobre-mi">Sobre Mí</NavLink>
            <NavLink to="/proyectos">Catia V5 Proyectos</NavLink>
            <NavLink to="/graficos">Gráficos</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </nav>

          {/* REDES SOCIALES ESCRITORIO */}
          <div className="hidden lg:flex items-center space-x-6">
             <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff9500] transition-colors"><FaLinkedin size={22} /></a>
             <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff9500] transition-colors"><FaInstagram size={22} /></a>
             <a href="https://behance.net" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff9500] transition-colors"><FaBehance size={24} /></a>
             <a href="https://twitter.com" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff9500] transition-colors"><FaXTwitter size={20} /></a>
          </div>

          {/* BOTÓN HAMBURGUESA / CERRAR (MÓVIL) */}
          {/* IMPORTANTE: z-index muy alto para estar por encima del menú naranja */}
          <button 
            className="lg:hidden text-white p-2 relative z-[60] focus:outline-none" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* 2. EL MENÚ MÓVIL (Fuera del header para evitar el "efecto caja") */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            // z-50 para estar encima de todo, pero debajo del botón de cerrar (z-60)
            className="fixed inset-0 bg-[#ff9500] z-50 flex flex-col items-center justify-center lg:hidden"
          >
            <nav className="flex flex-col space-y-8 items-center text-center">
                
                <motion.div variants={linkVariants}>
                   <Link to="/" onClick={handleMobileHomeClick} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Inicio</Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                   <Link to="/sobre-mi" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Sobre Mí</Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                   <Link to="/proyectos" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Proyectos</Link>
                </motion.div>
                
                <motion.div variants={linkVariants}>
                   <Link to="/graficos" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Gráficos</Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                   <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Contacto</Link>
                </motion.div>

                <motion.div variants={linkVariants} className="w-16 h-1 bg-white/30 rounded-full my-4" />

                <motion.div variants={linkVariants} className="flex space-x-8">
                    <a href="#" className="text-white hover:text-black transition-colors transform hover:scale-110"><FaLinkedin size={28}/></a>
                    <a href="#" className="text-white hover:text-black transition-colors transform hover:scale-110"><FaInstagram size={28}/></a>
                    <a href="#" className="text-white hover:text-black transition-colors transform hover:scale-110"><FaBehance size={30}/></a>
                    <a href="#" className="text-white hover:text-black transition-colors transform hover:scale-110"><FaXTwitter size={26}/></a>
                </motion.div>

            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
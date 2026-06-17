import { useState } from "react";
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

const menuVariants: Variants = {
  initial: { clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.5, ease: "easeInOut" } },
  animate: { clipPath: "circle(150% at 100% 0%)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1], staggerChildren: 0.1, delayChildren: 0.2 } },
  exit: { clipPath: "circle(0% at 100% 0%)", transition: { duration: 0.5, ease: "easeInOut", delay: 0.2 } }
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

  const isProjectDetail = location.pathname.startsWith("/proyectos/") && location.pathname !== "/proyectos";

  const shouldBeTransparent = isProjectDetail || isMobileMenuOpen;

  const headerContainerClasses = shouldBeTransparent
    ? "bg-transparent border-transparent pointer-events-none lg:bg-[#1e1e1e]/50 lg:backdrop-blur-sm lg:border-white/10 lg:pointer-events-auto"
    : "bg-[#1e1e1e]/50 backdrop-blur-sm border-white/10 pointer-events-auto";

  const logoClasses = (isProjectDetail && !isMobileMenuOpen)
    ? "opacity-0 lg:opacity-100 transition-opacity duration-300"
    : "opacity-100";

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-[60] py-4 transition-all duration-300 ${headerContainerClasses}`}>
        <div className="container mx-auto px-4 flex items-center justify-between relative">
          
          {/* LOGO */}
          <Link 
              to="/" 
              onClick={onRestartAnimation} 
              className={`flex items-center shrink-0 pointer-events-auto ${logoClasses}`}
          >
            <img src={headerLogo} alt="JM Macias Logo" className="h-10 w-auto md:h-14" />
          </Link>

          {/* MENÚ ESCRITORIO */}
          <nav className="hidden lg:flex items-center space-x-12 pointer-events-auto">
            <NavLink to="/" onClick={onRestartAnimation}>Home</NavLink>
            <NavLink to="/sobre-mi">About</NavLink>
            <NavLink to="/proyectos">3D Projects</NavLink>
            <NavLink to="/graficos">Graphic Design</NavLink>
            <NavLink to="/contacto">Contact</NavLink>
          </nav>

          {/* REDES SOCIALES ESCRITORIO */}
          <div className="hidden lg:flex items-center space-x-6 pointer-events-auto">
             {/* Reemplaza TU_USUARIO_AQUI con tus datos reales */}
             <a href="https://www.linkedin.com/in/jmanuelmacias/" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff9500] transition-colors"><FaLinkedin size={22} /></a>
             <a href="https://instagram.com/josemacii" target="_blank" rel="noreferrer" className="text-white hover:text-[#ff9500] transition-colors"><FaInstagram size={22} /></a>
          </div>

          {/* BOTÓN HAMBURGUESA / CERRAR */}
          <button 
            className="lg:hidden text-white p-2 relative z-[70] focus:outline-none pointer-events-auto" 
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* MENÚ MÓVIL (Fondo Naranja) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            variants={menuVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 bg-[#ff9500] z-50 flex flex-col items-center justify-center lg:hidden"
          >
             <nav className="flex flex-col space-y-8 items-center text-center">
                <motion.div variants={linkVariants}>
                   <Link to="/" onClick={handleMobileHomeClick} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Home</Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                   <Link to="/sobre-mi" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">About</Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                   <Link to="/proyectos" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">3D Projects</Link>
                </motion.div>
                
                <motion.div variants={linkVariants}>
                   <Link to="/graficos" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Graphic Design</Link>
                </motion.div>

                <motion.div variants={linkVariants}>
                   <Link to="/contacto" onClick={() => setIsMobileMenuOpen(false)} className="text-white text-3xl font-bold tracking-tight hover:text-black transition-colors">Contact</Link>
                </motion.div>

                 <motion.div variants={linkVariants} className="w-16 h-1 bg-white/30 rounded-full my-4" />

                {/* REDES SOCIALES MÓVIL */}
                <motion.div variants={linkVariants} className="flex space-x-8">
                    {/* Añadido target="_blank" y rel="noreferrer" por seguridad */}
                    <a href="https://www.linkedin.com/in/jmanuelmacias/" target="_blank" rel="noreferrer" className="text-white hover:text-black transition-colors transform hover:scale-110"><FaLinkedin size={28}/></a>
                    <a href="https://instagram.com/josemacii" target="_blank" rel="noreferrer" className="text-white hover:text-black transition-colors transform hover:scale-110"><FaInstagram size={28}/></a>
                </motion.div>
             </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Header;
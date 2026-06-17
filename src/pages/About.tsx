import { motion, Variants } from "framer-motion";
import { Download, Cpu, PenTool, Lightbulb } from "lucide-react";

// IMPORTACIONES DE ASSETS (Solución al error 404 en Vercel)
import profilePhoto from '../assets/profile-photo.png';
import catiaIcon from '../assets/icons/dassault-catia.svg';
import solidworksIcon from '../assets/icons/solidworks-logo-1.svg';
import blenderIcon from '../assets/icons/blender.svg';
import illustratorIcon from '../assets/icons/adobeillustrator.svg';
import photoshopIcon from '../assets/icons/adobe-photoshop-logo.svg';
import afterEffectsIcon from '../assets/icons/aftereffects.svg';
import reactIcon from '../assets/icons/react-native-1.svg';

const About = () => {
  const skills = [
    "Industrial Design", 
    "Product Ideation", 
    "Photorealistic Rendering", 
    "Packaging & Branding", 
    "Advanced Surfacing", 
    "Structural Documentation", 
    "Visual Identity"
  ];

  const softwareStack = [
    { name: "CATIA", icon: catiaIcon },
    { name: "SOLIDWORKS", icon: solidworksIcon },
    { name: "Blender", icon: blenderIcon },
    { name: "Illustrator", icon: illustratorIcon },
    { name: "Photoshop", icon: photoshopIcon },
    { name: "After Effects", icon: afterEffectsIcon },
    { name: "React", icon: reactIcon }
  ];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20, scale: 0.8 },
    show: { opacity: 1, y: 0, scale: 1, transition: { type: "spring", stiffness: 200, damping: 15 } }
  };

  return (
    <div className="min-h-screen bg-white/5 backdrop-blur-xl text-white pt-36 md:pt-32 pb-20">
      <div className="container mx-auto px-5 md:px-4">
        
        <div className="flex flex-col md:flex-row items-start gap-12 max-w-6xl mx-auto mb-20">
          
          {/* FOTO PRINCIPAL */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="w-full md:w-1/2 flex justify-center relative md:sticky top-auto md:top-32 z-10"
          >
            <div className="relative w-64 h-64 md:w-96 md:h-96">
              <div className="absolute inset-0 border-4 border-[#ff9500] rounded-2xl transform translate-x-4 translate-y-4"></div>
              <img 
                src={profilePhoto} 
                alt="Jose Manuel Macias" 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl shadow-2xl bg-[#1e1e1e]"
              />
            </div>
          </motion.div>

          {/* TEXTO Y HABILIDADES */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
            className="w-full md:w-1/2 bg-[#1e1e1e] p-6 md:p-8 rounded-2xl shadow-xl border border-[#494949] relative z-20"
          >
            <h2 className="text-3xl font-bold mb-6 text-[#ff9500] tracking-wide">About Me</h2>
            <p className="text-gray-300 leading-relaxed mb-8 text-justify text-sm md:text-base">
              I am Jose Manuel, a dedicated professional at the intersection of 3D design, engineering, and visual communication. My career is driven by a commitment to technical precision and functional creativity. I specialize in leveraging advanced tools like CATIA V5 to bring complex projects to life, managing the entire workflow from initial conceptualization to final, meticulously detailed 3D models.
              <br /><br />
              By integrating graphic design principles with rigorous engineering standards, I ensure that my work is not only structurally optimized but also visually compelling. I consistently strive for excellence in every individual component and seamless integration in every assembly, delivering solutions that are both highly innovative and aesthetically refined.
            </p>

            <h3 className="text-xl font-bold mb-4 text-white">Skills</h3>
            <div className="flex flex-wrap gap-2 md:gap-3 mb-10">
              {skills.map((skill, index) => (
                <span key={index} className="px-3 md:px-4 py-2 bg-[#494949] text-white text-xs md:text-sm rounded-full border border-[#848484] hover:border-[#ff9500] transition-colors cursor-default">
                  {skill}
                </span>
              ))}
            </div>

            <h3 className="text-xl font-bold mb-4 text-white border-b border-[#494949] pb-2">Software Arsenal</h3>
            <motion.div 
              className="grid grid-cols-3 md:grid-cols-4 gap-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {softwareStack.map((software, index) => (
                <motion.div 
                  key={index} 
                  variants={itemVariants}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="flex flex-col items-center justify-center p-3 bg-white/5 border border-white/10 rounded-xl hover:border-[#ff9500] transition-colors group shadow-lg"
                >
                  <img 
                    src={software.icon} 
                    alt={`${software.name} logo`} 
                    className="w-8 h-8 md:w-10 md:h-10 object-contain mb-2 opacity-70 group-hover:opacity-100 transition-opacity brightness-0 invert drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]"
                  />
                  <span className="text-[9px] md:text-[10px] text-gray-400 group-hover:text-white font-medium text-center tracking-wider uppercase">
                    {software.name}
                  </span>
                </motion.div>
              ))}
            </motion.div>

          </motion.div>
        </div>

        {/* SECCIÓN INFERIOR */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-6xl mx-auto border-t border-white/10 pt-16 mt-10"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-[#1e1e1e]/80 p-8 rounded-2xl border border-white/5 hover:border-orange-500/50 transition-colors">
              <Cpu className="text-orange-500 mb-4" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Engineering Foundation</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Applying advanced concepts like computational dynamics and structural analysis to ensure that every 3D model is not only visually stunning but physically viable and mechanically precise.</p>
            </div>
            <div className="bg-[#1e1e1e]/80 p-8 rounded-2xl border border-white/5 hover:border-orange-500/50 transition-colors">
              <PenTool className="text-orange-500 mb-4" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Visual Communication</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Translating complex engineering data into clear, aesthetically refined renders and graphic identities that communicate value to both technical and non-technical audiences.</p>
            </div>
            <div className="bg-[#1e1e1e]/80 p-8 rounded-2xl border border-white/5 hover:border-orange-500/50 transition-colors">
              <Lightbulb className="text-orange-500 mb-4" size={32} />
              <h4 className="text-xl font-bold text-white mb-3">Problem Solving</h4>
              <p className="text-gray-400 text-sm leading-relaxed">Bridging the gap between creative design and industrial manufacturing. Finding the optimal balance between form, function, and production feasibility.</p>
            </div>
          </div>

          <div className="flex justify-center">
            <a 
              href="/CVJOSEMANUEL.pdf" 
              download
              className="flex items-center gap-3 px-8 py-4 bg-transparent border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white font-bold rounded-xl transition-all duration-300 group shadow-[0_0_15px_rgba(249,115,22,0.2)] hover:shadow-[0_0_25px_rgba(249,115,22,0.5)]"
            >
              <Download size={20} className="group-hover:-translate-y-1 transition-transform" />
              <span>Download Resume</span>
            </a>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default About;
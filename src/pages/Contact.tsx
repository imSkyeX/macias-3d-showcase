import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, User, MessageSquare, CheckCircle, XCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  
  // NUEVO: Estados para controlar la interfaz del botón
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Si había un error previo y el usuario vuelve a escribir, reseteamos el botón
    if (status === 'error') setStatus('idle');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');

    try {
      // NUEVO: Llamada invisible a la API de Web3Forms
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          // SUSTITUYE ESTO POR LA CLAVE QUE TE HA LLEGADO AL CORREO:
          access_key: "ba562a3f-ddee-4fd1-9ecf-71d43965539d", 
          name: formData.name,
          email: formData.email,
          message: formData.message,
          subject: "¡Nuevo contacto desde el Portfolio 3D!", // Asunto con el que te llegará a ti
          from_name: "Portfolio JM MACIAS", // Remitente
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
        setFormData({ name: '', email: '', message: '' }); // Vaciamos el formulario
        // Volvemos al estado normal después de 3 segundos
        setTimeout(() => setStatus('idle'), 3000);
      } else {
        setStatus('error');
      }
    } catch (error) {
      console.error("Error enviando el correo:", error);
      setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-black/20 backdrop-blur-lg pt-32 pb-20 px-6 flex items-center justify-center relative overflow-hidden">
      
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-orange-500/10 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px] pointer-events-none"></div>

      <div className="container mx-auto max-w-6xl relative z-10">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-white uppercase tracking-wider mb-4 drop-shadow-lg">
            Let's talk
          </h1>
          <div className="w-24 h-1 bg-orange-500 mx-auto mb-6 shadow-[0_0_10px_rgba(249,115,22,0.5)]"></div>
          <p className="text-white/80 text-lg max-w-2xl mx-auto drop-shadow-md">
            "Have a project in mind, a design proposal, or just want to say hi? Reach out and let's bring ideas to life."
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-12 shadow-2xl">
          
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:col-span-2 space-y-10"
          >
            <h3 className="text-2xl font-semibold text-white mb-6 drop-shadow-md">Direct Information</h3>
            
            <div className="space-y-8">
              <a href="mailto:skyexgfx@gmail.com" className="flex items-start gap-4 group">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-lg">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Email</p>
                  <p className="text-white font-medium group-hover:text-orange-400 transition-colors drop-shadow-md">skyexgfx@gmail.com</p>
                </div>
              </a>

              <a href="tel:+34601113437" className="flex items-start gap-4 group">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-orange-400 group-hover:bg-orange-500 group-hover:text-white transition-all duration-300 shadow-lg">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Phone</p>
                  <p className="text-white font-medium group-hover:text-orange-400 transition-colors drop-shadow-md">+34 601 11 34 37</p>
                </div>
              </a>

              <div className="flex items-start gap-4">
                <div className="p-4 bg-white/5 border border-white/10 rounded-xl text-orange-400 shadow-lg">
                  <MapPin size={24} />
                </div>
                <div>
                  <p className="text-white/60 text-sm uppercase tracking-wider mb-1">Location</p>
                  <p className="text-white font-medium drop-shadow-md">Puerto Real, Cádiz</p>
                  <p className="text-white/60 text-sm">España</p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/60">
                    <User size={18} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    placeholder="Your Name"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:bg-black/40 transition-all shadow-inner disabled:opacity-50"
                  />
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-white/60">
                    <Mail size={18} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    disabled={status === 'sending'}
                    placeholder="Your email"
                    className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:bg-black/40 transition-all shadow-inner disabled:opacity-50"
                  />
                </div>
              </div>

              <div className="relative">
                <div className="absolute top-4 left-0 pl-4 pointer-events-none text-white/60">
                  <MessageSquare size={18} />
                </div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  disabled={status === 'sending'}
                  rows={5}
                  placeholder="Talk me about your idea..."
                  className="w-full bg-black/20 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white placeholder-white/40 focus:outline-none focus:border-orange-500 focus:bg-black/40 transition-all resize-none shadow-inner disabled:opacity-50"
                ></textarea>
              </div>

              {/* BOTÓN REACTIVO */}
              <button
                type="submit"
                disabled={status === 'sending' || status === 'success'}
                className={`w-full sm:w-auto px-8 py-4 font-bold rounded-xl transition-all duration-300 flex items-center justify-center gap-2 group shadow-lg
                  ${status === 'idle' ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-[0_0_15px_rgba(249,115,22,0.4)] hover:shadow-[0_0_25px_rgba(249,115,22,0.6)]' : ''}
                  ${status === 'sending' ? 'bg-orange-500/50 text-white/70 cursor-not-allowed' : ''}
                  ${status === 'success' ? 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.4)]' : ''}
                  ${status === 'error' ? 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]' : ''}
                `}
              >
                {status === 'idle' && (
                  <>
                    <span>Send message</span>
                    <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </>
                )}
                {status === 'sending' && <span>Sending...</span>}
                {status === 'success' && (
                  <>
                    <span>Send it!</span>
                    <CheckCircle size={18} />
                  </>
                )}
                {status === 'error' && (
                  <>
                    <span>Error, try again.</span>
                    <XCircle size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

        </div>
      </div>
    </div>
  );
};

export default Contact;
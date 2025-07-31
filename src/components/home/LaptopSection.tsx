import React, { useRef, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LaptopSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleVideoLoadedData = () => {
        setIsVideoLoaded(true);
        video.play().catch(console.error);
      };

      video.addEventListener('loadeddata', handleVideoLoadedData);
      video.loop = true;
      video.muted = true;
      video.playsInline = true;

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoadedData);
      };
    }
  }, []);

  // Gestion spécifique pour mobile
  useEffect(() => {
    const video = videoRef.current;
    if (video && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      // Forcer le chargement sur mobile
      video.load();
      video.play().catch(() => {
        // Si ça échoue, retenter après un délai
        setTimeout(() => {
          video.play().catch(console.error);
        }, 500);
      });
    }
  }, []);

  return (
    <section className="py-20 bg-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          
          {/* Laptop Mockup - Mobile: top, Desktop: left */}
          <motion.div 
            className="order-1 flex justify-center lg:justify-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative">
              {/* Laptop Mockup with Image */}
              <div className="relative">
                {/* Base Laptop Image */}
                <img 
                  src="/mockup-laptop.png" 
                  alt="Laptop Mockup" 
                  className="w-[500px] h-auto relative z-10"
                />
                
                {/* Video Overlay on Screen */}
                <div className="absolute top-[6%] left-[12%] right-[12%] bottom-[15%] z-20 overflow-hidden">
                  <video
                    ref={videoRef}
                    className="w-full h-full object-cover"
                    playsInline
                    muted
                    loop
                  >
                    <source src="/teaser-mockupLaptop.mp4" type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
              
              {/* Glow Effect */}
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-2xl blur-xl opacity-50 -z-10"></div>
            </div>
          </motion.div>

          {/* Text Content - Mobile: bottom, Desktop: right */}
          <motion.div 
            className="order-2 space-y-8"
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            
            {/* Title */}
            <div className="space-y-4">
              <h3 className="text-2xl lg:text-3xl font-bold text-white leading-tight">
                Ça vous parle ? Vous pourriez avoir besoin de nous si vous :
              </h3>
            </div>

            {/* First Block */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  <strong className="text-white">Avez du mal à obtenir un site web qui sert vraiment votre activité</strong> – vous avez besoin d'un site rapide, sécurisé, optimisé pour le SEO et conçu pour attirer vos premiers clients.
                </p>
              </div>
            </div>

            {/* Second Block */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-purple-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  <strong className="text-white">Avez une super idée mais ne savez pas comment la concrétiser</strong> – vous cherchez un partenaire pour passer de l'idée au MVP, développer votre plateforme et mettre en place tout ce qu'il faut pour un lancement réussi.
                </p>
              </div>
            </div>

            {/* Third Block */}
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-orange-500 rounded-full mt-3 flex-shrink-0"></div>
                <p className="text-lg text-slate-300 leading-relaxed">
                  <strong className="text-white">Perdez du temps dans des tâches répétitives qui freinent votre croissance</strong> – vous voulez automatiser vos processus, connecter vos outils et simplifier vos opérations pour que tout fonctionne sans friction.
                </p>
              </div>
            </div>

          </motion.div>

        </div>

        {/* Bottom CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-slate-300 mb-6 text-lg">
            Besoin d'un devis pour votre projet web ? Audit gratuit de votre site existant ?
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
          >
            Demander un devis agence web
          </Link>
        </motion.div>

      </div>
    </section>
  );
};

export default LaptopSection; 
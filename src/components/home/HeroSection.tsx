import React, { useRef, useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import TextType from '../ui/TextType';
import { useNavigate } from 'react-router-dom';

const HeroSection: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const mobileVideoRef = useRef<HTMLVideoElement>(null);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;

    if (video) {
      const handleVideoLoadedData = () => {
        setIsVideoLoaded(true);
        video.play().catch(console.error);
      };

      const handleVideoTimeUpdate = () => {
        if (video.currentTime < 0.1) {
          video.pause();
          setTimeout(() => {
            video.play().catch(console.error);
          }, 1000);
        }
      };

      video.addEventListener('loadeddata', handleVideoLoadedData);
      video.addEventListener('timeupdate', handleVideoTimeUpdate);

      return () => {
        video.removeEventListener('loadeddata', handleVideoLoadedData);
        video.removeEventListener('timeupdate', handleVideoTimeUpdate);
      };
    }
  }, []);

  // Méthode propre pour mobile seulement
  useEffect(() => {
    const mobileVideo = mobileVideoRef.current;
    
    if (mobileVideo) {
      const handleMobileTimeUpdate = () => {
        if (mobileVideo.currentTime < 0.1) {
          mobileVideo.pause();
          setTimeout(() => {
            mobileVideo.play().catch(console.error);
          }, 1000);
        }
      };

      mobileVideo.addEventListener('timeupdate', handleMobileTimeUpdate);

      return () => {
        mobileVideo.removeEventListener('timeupdate', handleMobileTimeUpdate);
      };
    }
  }, []);

  return (
    <section className="relative min-h-screen sm:min-h-screen lg:min-h-[35vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.05&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Mobile Layout */}
        <div className="block sm:block lg:hidden">
          <div className="flex flex-col justify-end min-h-screen pt-32">
            {/* Title and CTA - Bottom of screen */}
            <div className="flex justify-center mb-16">
              <div className="w-64 px-2 text-left">
                <motion.div 
                  className="hero-title text-3xl sm:text-4xl font-bold mb-24 leading-tight h-32"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                >
                  <div className="text-white h-full" style={{ color: '#EAF4FF' }}>
        <TextType
                    as="h1"
                    text={["Votre agence web sur-mesure : code rapide & solutions innovantes."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
                    className="block"
                  />
                  </div>
                </motion.div>

                {/* SEO Subtitle - Invisible for users, visible for Google */}
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                  className="mb-6"
                >
                  <p className="text-xs text-transparent absolute -left-[9999px]">
                    Agence digitale spécialisée dans le développement web sur-mesure. Création de sites internet, refonte et audit SEO pour faire grandir votre business.
                  </p>
                </motion.div>

                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
                  className="text-center"
                >
                  <div className="w-60">
                    <Button 
                      size="lg" 
                      className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-4 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 group"
                      onClick={() => navigate('/contact')}
                    >
                      Demander un devis gratuit
                    </Button>
                  </div>
                </motion.div>
              </div>
            </div>

            {/* Mobile Mockup - Small and centered */}
            <motion.div 
              className="flex justify-center mb-16"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
            >
              <div className="relative w-64 h-[500px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[2.5rem] p-2 shadow-2xl border border-gray-700">
                {/* Notch - Realistic */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-24 h-6 bg-black rounded-b-2xl z-10 flex items-center justify-center">
                  <div className="w-12 h-0.5 bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Screen - Video Container */}
                <div className="w-full h-full bg-black rounded-[2rem] overflow-hidden relative">
                  <video
                    ref={mobileVideoRef}
                    className="w-full h-full object-cover"
                    muted
                    playsInline
                    loop
                    autoPlay
                  >
                    <source src="/mobile-video.mov" type="video/quicktime" />
                    <source src="/mobile-video.mov" type="video/mp4" />
                    Votre navigateur ne supporte pas la vidéo.
                  </video>
                </div>
                
                {/* Home Indicator - Realistic */}
                <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-white rounded-full opacity-80"></div>
                
                {/* Side Button - Volume */}
                <div className="absolute top-16 -left-0.5 w-0.5 h-6 bg-gray-700 rounded-l-full"></div>
                <div className="absolute top-24 -left-0.5 w-0.5 h-6 bg-gray-700 rounded-l-full"></div>
                
                {/* Side Button - Power */}
                <div className="absolute top-12 -right-0.5 w-0.5 h-8 bg-gray-700 rounded-r-full"></div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-12 items-center min-h-[35vh] py-6">
          {/* Left Side - Title and CTA */}
          <motion.div 
            className="text-left relative"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            {/* Main Title */}
                        <motion.div 
              className="hero-title text-6xl xl:text-7xl font-bold mb-24 leading-none h-48"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="text-white h-full" style={{ color: '#EAF4FF' }}>
                <TextType
                  as="h1"
                  text={["Votre agence web sur-mesure : code rapide & solutions innovantes."]}
                  typingSpeed={75}
                  pauseDuration={1500}
                  showCursor={true}
                  cursorCharacter="|"
                  className="block"
                />
      </div>
            </motion.div>

            {/* SEO Subtitle */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="mb-6"
            >
              <p className="text-xs text-transparent absolute -left-[9999px]">
                Agence digitale spécialisée dans le développement web sur-mesure. Création de sites internet, refonte et audit SEO pour faire grandir votre business.
              </p>
            </motion.div>


          </motion.div>

          {/* Right Side - iPhone Mockup */}
          <motion.div 
            className="flex justify-end relative"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          >
            <div className="relative -translate-x-4 translate-y-32">
              {/* iPhone Mockup - CSS Realistic */}
              <div className="relative w-[420px] h-[900px] bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 rounded-[3.5rem] p-4 shadow-2xl border border-gray-700">
                {/* Notch - Realistic */}
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-8 bg-black rounded-b-3xl z-10 flex items-center justify-center">
                  <div className="w-16 h-1 bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Screen - Video Container */}
                <div className="w-full h-full bg-black rounded-[3rem] overflow-hidden relative">
                  {/* Video Container */}
                  <div className="w-full h-full relative">
                    {!isVideoLoaded && (
                      <div className="absolute inset-0 bg-slate-900 flex items-center justify-center">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
                      </div>
                    )}
                    <video
                      ref={videoRef}
                      className="w-full h-full object-cover"
                      muted
                      playsInline
                      loop
                    >
                      <source src="/mobile-video.mov" type="video/quicktime" />
                      <source src="/mobile-video.mov" type="video/mp4" />
                      Votre navigateur ne supporte pas la vidéo.
                    </video>
                  </div>
                </div>
                
                {/* Home Indicator - Realistic */}
                <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-white rounded-full opacity-80"></div>
                
                {/* Side Button - Volume */}
                <div className="absolute top-20 -left-1 w-1 h-8 bg-gray-700 rounded-l-full"></div>
                <div className="absolute top-32 -left-1 w-1 h-8 bg-gray-700 rounded-l-full"></div>
                
                {/* Side Button - Power */}
                <div className="absolute top-16 -right-1 w-1 h-12 bg-gray-700 rounded-r-full"></div>
              </div>
            </div>
          </motion.div>
      </div>
    </div>
  </section>
);
};

export default HeroSection;
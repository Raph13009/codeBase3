import React, { useRef, useState, useEffect, useCallback, memo } from 'react';
import { useInView } from 'react-intersection-observer';
import { useNavigate } from 'react-router-dom';
import { Rocket, Settings, Play, Pause, RotateCcw, Volume2, VolumeX, Check, ArrowRight } from 'lucide-react';
import CustomToolAnimation from './CustomToolAnimation';

const WhatWeOffer = memo(() => {
  const navigate = useNavigate();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const updateTime = () => setCurrentTime(video.currentTime);
    const updateDuration = () => setDuration(video.duration);
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    video.addEventListener('timeupdate', updateTime);
    video.addEventListener('loadedmetadata', updateDuration);
    video.addEventListener('play', handlePlay);
    video.addEventListener('pause', handlePause);
    video.addEventListener('ended', handleEnded);

    return () => {
      video.removeEventListener('timeupdate', updateTime);
      video.removeEventListener('loadedmetadata', updateDuration);
      video.removeEventListener('play', handlePlay);
      video.removeEventListener('pause', handlePause);
      video.removeEventListener('ended', handleEnded);
    };
  }, []);

  // Check if mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Auto-hide controls on mobile when playing
  useEffect(() => {
    if (isMobile && isPlaying) {
      const timer = setTimeout(() => {
        setShowControls(false);
      }, 1000);
      
      return () => clearTimeout(timer);
    }
  }, [isMobile, isPlaying]);



  const togglePlay = useCallback(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
    }
    
    // On mobile, show controls for 2 seconds when clicking
    if (isMobile) {
      setShowControls(true);
      setTimeout(() => {
        if (isPlaying) {
          setShowControls(false);
        }
      }, 2000);
    }
  }, [isPlaying, isMobile]);

  const toggleMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  }, [isMuted]);

  const handleSeek = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const time = parseFloat(e.target.value);
    if (videoRef.current) {
      videoRef.current.currentTime = time;
    }
  }, []);

  const restart = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  }, []);

  const formatTime = useCallback((time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  }, []);

  return (
    <section ref={ref} className="py-24 relative z-10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6 text-white">
            Build faster, scale smarter
          </h2>
          <p className="text-xl text-gray-300 leading-relaxed">
            Two proven approaches to get your digital solution live and generating value
          </p>
        </div>

        <div className="max-w-6xl mx-auto space-y-20">
          {/* MVP Builder Card */}
          <div className={`
            rounded-2xl overflow-hidden transform transition-all duration-500 
            shadow-[0_20px_50px_-10px_rgba(0,212,255,0.1)] hover:shadow-[0_30px_60px_-12px_rgba(0,212,255,0.2)] 
            border border-gray-700 bg-gray-900/50 backdrop-blur-sm
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `}>
            <div className="p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-xl bg-cyan-500/20 text-cyan-400 shadow-sm">
                  <Rocket className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white">MVP Builder</h3>
                  <p className="text-cyan-400 text-lg font-medium">Launch your idea in 1-2 weeks</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-10 text-lg">
                Perfect for founders, startups, and teams who need to validate ideas quickly. We build your core features with a focus on user value and market testing. Includes a professional foundation that scales with your growth, plus 30 days of support to ensure smooth launch.
              </p>

              <div className="relative rounded-xl overflow-hidden bg-gray-800/50 border border-gray-700">
                <video 
                  ref={videoRef}
                  className="w-full h-64 md:h-[600px] object-cover cursor-pointer"
                  loop
                  muted={isMuted}
                  playsInline
                  onClick={togglePlay}
                  onMouseEnter={() => !isMobile && setShowControls(true)}
                  onMouseLeave={() => !isMobile && setShowControls(false)}
                >
                  <source src="/ads.MP4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                
                {/* Play button overlay when video is paused */}
                {!isPlaying && (
                  <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/30 cursor-pointer"
                    onClick={togglePlay}
                  >
                    <div className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-colors">
                      <Play className="w-12 h-12 text-white" />
                    </div>
                  </div>
                )}
                
                {/* Custom Video Controls - Auto-hide */}
                <div 
                  className={`absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent p-6 transition-opacity duration-300 ${showControls ? 'opacity-100' : 'opacity-0'}`}
                  onMouseEnter={() => setShowControls(true)}
                  onMouseLeave={() => setShowControls(false)}
                >
                  {/* Progress Bar */}
                  <div className="mb-4">
                    <input
                      type="range"
                      min="0"
                      max={duration || 0}
                      value={currentTime}
                      onChange={handleSeek}
                      step="0.1"
                      className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
                      style={{
                        background: `linear-gradient(to right, #00d4ff 0%, #00d4ff ${(currentTime / (duration || 1)) * 100}%, #4b5563 ${(currentTime / (duration || 1)) * 100}%, #4b5563 100%)`
                      }}
                    />
                  </div>
                  
                  {/* Controls */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button
                        onClick={togglePlay}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {isPlaying ? <Pause className="w-6 h-6 text-white" /> : <Play className="w-6 h-6 text-white" />}
                      </button>
                      
                      <button
                        onClick={restart}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        <RotateCcw className="w-6 h-6 text-white" />
                      </button>
                      
                      <button
                        onClick={toggleMute}
                        className="p-3 rounded-full bg-white/20 hover:bg-white/30 transition-colors"
                      >
                        {isMuted ? <VolumeX className="w-6 h-6 text-white" /> : <Volume2 className="w-6 h-6 text-white" />}
                      </button>
                    </div>
                    
                    <div className="text-white text-sm font-medium">
                      {formatTime(currentTime)} / {formatTime(duration)}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Custom Tool Card */}
          <div className={`
            rounded-2xl overflow-hidden transform transition-all duration-500 
            shadow-[0_20px_50px_-10px_rgba(0,212,255,0.1)] hover:shadow-[0_30px_60px_-12px_rgba(0,212,255,0.2)] 
            border border-gray-700 bg-gray-900/50 backdrop-blur-sm
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `} style={{ transitionDelay: '200ms' }}>
            <div className="p-10">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-4 rounded-xl bg-purple-500/20 text-purple-400 shadow-sm">
                  <Settings className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-3xl font-display font-bold text-white">Custom Tool</h3>
                  <p className="text-purple-400 text-lg font-medium">Tailored solutions for your workflow</p>
                </div>
              </div>
              
              <p className="text-gray-300 leading-relaxed mb-10 text-lg">
                Designed for established businesses and teams who need specific tools to streamline operations. We build custom solutions that integrate with your existing systems and workflows. Includes comprehensive testing, deployment, and 90 days of support with ongoing maintenance options.
              </p>

              <CustomToolAnimation />
            </div>
          </div>

          {/* Comparison Table */}
          <div className={`
            transform transition-all duration-500 
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `} style={{ transitionDelay: '400ms' }}>
            <div className="text-center mb-12">
              <h3 className="text-3xl font-display font-bold text-white mb-4">
                👉 Which solution fits your needs best?
              </h3>
              <p className="text-gray-300 text-lg">
                Compare the key differences to make the right choice
              </p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-gray-700">
                    <th className="text-left p-4 text-gray-400 font-medium">Feature</th>
                    <th className="text-center p-4 text-cyan-400 font-semibold">MVP Builder</th>
                    <th className="text-center p-4 text-purple-400 font-semibold">Custom Tool</th>
                  </tr>
                </thead>
                <tbody className="text-gray-300">
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Best for</td>
                    <td className="p-4 text-center">Startups & idea validation</td>
                    <td className="p-4 text-center">Established businesses</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Delivery time</td>
                    <td className="p-4 text-center">1-2 weeks</td>
                    <td className="p-4 text-center">2-4 weeks</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Focus</td>
                    <td className="p-4 text-center">Core features & speed</td>
                    <td className="p-4 text-center">Custom integration</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Ownership</td>
                    <td className="p-4 text-center">Full code ownership</td>
                    <td className="p-4 text-center">Full code ownership</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Support</td>
                    <td className="p-4 text-center">30 days included</td>
                    <td className="p-4 text-center">90 days included</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Scalability</td>
                    <td className="p-4 text-center">Foundation ready</td>
                    <td className="p-4 text-center">Production ready</td>
                  </tr>
                  <tr className="border-b border-gray-800">
                    <td className="p-4 font-medium">Example use case</td>
                    <td className="p-4 text-center">Landing page + core features</td>
                    <td className="p-4 text-center">Internal dashboard + automation</td>
                  </tr>
                  <tr>
                    <td className="p-4 font-medium">Price range</td>
                    <td className="p-4 text-center text-cyan-400 font-semibold">From €800 (equity possible)</td>
                    <td className="p-4 text-center text-purple-400 font-semibold">From €600</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* CTA */}
          <div className={`
            text-center transform transition-all duration-500 
            ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
          `} style={{ transitionDelay: '600ms' }}>
            <p className="text-xl text-gray-300 mb-6">
              Not sure? Let's talk — we'll help you choose the right fit.
            </p>
            <button 
              onClick={() => navigate('/contact')}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 font-semibold text-lg shadow-lg transform hover:scale-105"
            >
              Start a conversation <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{
        __html: `
          .slider::-webkit-slider-thumb {
            appearance: none;
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #00d4ff;
            cursor: pointer;
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
          }
          
          .slider::-moz-range-thumb {
            height: 20px;
            width: 20px;
            border-radius: 50%;
            background: #00d4ff;
            cursor: pointer;
            border: none;
            box-shadow: 0 0 15px rgba(0, 212, 255, 0.6);
          }
        `
      }} />
    </section>
  );
});

WhatWeOffer.displayName = 'WhatWeOffer';

export default WhatWeOffer; 
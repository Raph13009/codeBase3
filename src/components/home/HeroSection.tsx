import React from 'react';
import { Link } from 'react-router-dom';
import RotatingText from '../ui/RotatingText';
import TextType from '../ui/TextType';

const HeroSection: React.FC = () => (
  <section className="min-h-screen flex items-center justify-center relative z-10 px-4">
    <style>{`
      .animated-gradient-text {
        background: linear-gradient(270deg, #00d4ff, #0099cc, #00ffff, #00d4ff);
        background-size: 200% 200%;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        background-clip: text;
        text-fill-color: transparent;
        animation: gradientMove 5s ease-in-out infinite;
        padding-bottom: 0.5rem;
        display: inline-block;
      }
      @keyframes gradientMove {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
      
      .glow-effect {
        box-shadow: 0 0 20px rgba(0, 212, 255, 0.3);
      }
      
      .glow-effect:hover {
        box-shadow: 0 0 30px rgba(0, 212, 255, 0.5);
      }
    `}</style>
    <div className="max-w-4xl mx-auto text-center">
      <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-loose pb-8">
        <TextType
          as="span"
          text={["We build fast, smart & beautiful digital products."]}
          typingSpeed={75}
          pauseDuration={1500}
          showCursor={true}
          cursorCharacter="|"
          className="animated-gradient-text"
        />
      </h1>
      
      <div className="mb-12 flex items-center justify-center">
        <div className="flex items-center space-x-3">
          <span className="text-white text-xl md:text-2xl font-medium">
            Our Stack
          </span>
          <div className="relative">
            <RotatingText
              texts={[
                'Cursor', 'n8n', 'Figma', 'Supabase', 'React', 'TypeScript', 
                'Tailwind CSS', 'Vite', 'Node.js', 'PostgreSQL', 'GitHub', 'Vercel',
                'OpenAI', 'Anthropic', 'Zapier', 'Airtable', 'Notion', 'Slack'
              ]}
              mainClassName="px-4 py-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-xl shadow-xl overflow-hidden border border-purple-400/30"
              staggerFrom="last"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-120%", opacity: 0 }}
              staggerDuration={0.03}
              splitLevelClassName="overflow-hidden"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2500}
            />
          </div>
        </div>
      </div>
      <div className="mt-16">
        <Link
          to="/contact"
          className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-2xl text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 transform hover:scale-105 shadow-lg border border-cyan-400/20 backdrop-blur-sm"
        >
          Let's talk
        </Link>
      </div>
    </div>
  </section>
);

export default HeroSection;
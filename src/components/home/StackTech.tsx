import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent } from '@/components/ui/card';

const StackTech: React.FC = () => {
  const techStack = [
    {
      category: "Design & Prototyping",
      tools: [
        { name: "Figma", logo: "🎨" },
        { name: "Notion", logo: "📝" },
        { name: "Miro", logo: "🧠" }
      ]
    },
    {
      category: "Développement",
      tools: [
        { name: "React", logo: "⚛️" },
        { name: "TypeScript", logo: "📘" },
        { name: "Node.js", logo: "🟢" },
        { name: "Supabase", logo: "🔵" }
      ]
    },
    {
      category: "Automatisation",
      tools: [
        { name: "n8n", logo: "⚡" },
        { name: "Zapier", logo: "🔗" },
        { name: "Airtable", logo: "📊" }
      ]
    },
    {
      category: "IA & Intelligence",
      tools: [
        { name: "OpenAI", logo: "🤖" },
        { name: "Anthropic", logo: "🧠" },
        { name: "ChatGPT", logo: "💬" }
      ]
    }
  ];

  const allTools = [
    "Figma", "Notion", "React", "TypeScript", "Node.js", "Supabase", 
    "n8n", "Zapier", "OpenAI", "Anthropic", "ChatGPT", "Airtable"
  ];

  return (
    <section className="py-20 bg-slate-800 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.02&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Notre stack technique
          </h2>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            On mixe IA, nocode et code pour obtenir le meilleur des deux mondes
          </p>
        </motion.div>

        {/* Tech Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {techStack.map((category, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="bg-slate-700/50 border-slate-600 hover:border-slate-500 transition-all duration-300 hover:shadow-xl">
                <CardContent className="p-6">
                  <h3 className="text-lg font-bold text-white mb-4 text-center">
                    {category.category}
                  </h3>
                  <div className="space-y-3">
                    {category.tools.map((tool, toolIndex) => (
                      <div key={toolIndex} className="flex items-center gap-3 p-3 bg-slate-600/30 rounded-lg hover:bg-slate-600/50 transition-colors duration-200">
                        <span className="text-2xl">{tool.logo}</span>
                        <span className="text-slate-300 font-medium">{tool.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Animated Tech Logos */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="bg-slate-700/50 rounded-2xl p-8 border border-slate-600">
            <h3 className="text-2xl font-bold text-white text-center mb-8">
              Technologies que nous maîtrisons
            </h3>
            
            <div className="flex flex-wrap justify-center gap-6">
              {allTools.map((tool, index) => (
                <motion.div
                  key={index}
                  className="bg-slate-600/50 rounded-xl px-6 py-4 border border-slate-500 hover:border-slate-400 transition-all duration-300 hover:shadow-lg hover:scale-105"
                  whileHover={{ y: -5 }}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className="text-slate-300 font-semibold text-lg">{tool}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Philosophy Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="bg-gradient-to-r from-slate-700 to-slate-800 rounded-2xl p-8 border border-slate-600">
            <h3 className="text-2xl font-bold text-white mb-4">
              Notre approche technique
            </h3>
            <p className="text-slate-300 mb-6 max-w-3xl mx-auto text-lg leading-relaxed">
              Nous choisissons toujours la technologie la plus adaptée à votre projet. 
              Parfois c'est du code pur, parfois du nocode, souvent un mix des deux. 
              L'important c'est que ça marche, vite et bien.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">⚡</div>
                <h4 className="text-white font-semibold mb-2">Rapidité</h4>
                <p className="text-slate-300 text-sm">Livraison en jours, pas en mois</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🔧</div>
                <h4 className="text-white font-semibold mb-2">Flexibilité</h4>
                <p className="text-slate-300 text-sm">Adaptation à vos besoins spécifiques</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🚀</div>
                <h4 className="text-white font-semibold mb-2">Performance</h4>
                <p className="text-slate-300 text-sm">Solutions optimisées et scalables</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default StackTech; 
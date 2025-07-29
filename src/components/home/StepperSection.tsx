import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Stepper, { Step } from '@/components/ui/Stepper';
import { saveLeadToSupabase } from '@/lib/supabase';

const StepperSection: React.FC = () => {
  const [name, setName] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  return (
    <section className="py-20 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=&quot;60&quot; height=&quot;60&quot; viewBox=&quot;0 0 60 60&quot; xmlns=&quot;http://www.w3.org/2000/svg&quot;%3E%3Cg fill=&quot;none&quot; fill-rule=&quot;evenodd&quot;%3E%3Cg fill=&quot;%239C92AC&quot; fill-opacity=&quot;0.03&quot;%3E%3Ccircle cx=&quot;30&quot; cy=&quot;30&quot; r=&quot;2&quot;/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-30"></div>
      
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6">
            Imaginez votre projet prendre vie
          </h2>
        </motion.div>

        <motion.div 
          className="flex justify-center"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: true }}
        >
          <Stepper
            initialStep={1}
            onStepChange={(step) => {
              console.log(step);
            }}
            onFinalStepCompleted={async () => {
              if (!isSubmitted && !isSubmitting) {
                setIsSubmitting(true);
                try {
                  await saveLeadToSupabase(name);
                  setIsSubmitted(true);
                  console.log("Lead saved successfully!");
                } catch (error) {
                  console.error("Error saving lead:", error);
                } finally {
                  setIsSubmitting(false);
                }
              }
            }}
            backButtonText="Précédent"
            nextButtonText={isSubmitting ? "Enregistrement..." : "Suivant"}
          >
            <Step>
              <h2 className="text-2xl font-bold text-white mb-4">Bienvenue chez BoostAI !</h2>
              <p className="text-slate-300">Plus qu'un projet, c'est votre idée unique que nous voulons comprendre.</p>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold text-white mb-4">Pourquoi c'est important ?</h2>
              <p className="text-slate-300">Chaque projet mérite des conseils sur-mesure.</p>
            </Step>
            <Step>
              <h2 className="text-2xl font-bold text-white mb-4">Votre email</h2>
              <input 
                type="email"
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                placeholder="votre@email.com" 
                className="w-full p-4 bg-slate-700 border border-slate-600 text-white rounded-xl focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20 transition-all"
              />
            </Step>
            <Step>
              <h2 className="text-2xl font-bold text-white mb-4">
                {isSubmitted ? "Parfait !" : "C'est parti !"}
              </h2>
              <p className="text-slate-300">
                {isSubmitted 
                  ? "Votre email a été enregistré avec succès. Nous vous contacterons bientôt !"
                  : "Vous êtes prêt à transformer votre idée en réalité digitale."
                }
              </p>
            </Step>
          </Stepper>
        </motion.div>
      </div>
    </section>
  );
};

export default StepperSection; 
import React, { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { SendIcon, Sparkles, User, Mail, Phone, MessageSquare, Calendar } from 'lucide-react';
import emailjs from '@emailjs/browser';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  const form = useRef<HTMLFormElement>(null);
  
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    telephone: '',
    service: '',
    message: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.current) return;
    
    setIsSubmitting(true);
    
    // Send email using EmailJS
    emailjs
      .sendForm(
        "service_ldkq8zi",           // Service ID (Gmail)
        "template_ukvmu8l",          // Template ID
        form.current,
        "9Teyr_oI9V0zmkzL6"          // Public key
      )
      .then(() => {
        // Success message
        toast({
          title: t('contactSuccess'),
          variant: 'default',
        });
        
        // Reset form
        setFormData({
          nom: '',
          email: '',
          telephone: '',
          service: '',
          message: '',
        });
      })
      .catch((error) => {
        console.error('Error submitting form:', error);
        
        // Error message
        toast({
          title: t('contactError'),
          variant: 'destructive',
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };
  
  return (
    <form ref={form} onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700 group-hover:text-primary transition-colors duration-300">
            <User className="w-4 h-4" />
            {t('nameLabel')} *
          </label>
          <input
            type="text"
            id="name"
            name="nom"
            value={formData.nom}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/50 transition-colors duration-300"
            placeholder="John Doe"
          />
        </div>
        
        <div className="group">
          <label htmlFor="email" className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700 group-hover:text-primary transition-colors duration-300">
            <Mail className="w-4 h-4" />
            {t('emailLabel')} *
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/50 transition-colors duration-300"
            placeholder="john@example.com"
          />
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <label htmlFor="phone" className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700 group-hover:text-primary transition-colors duration-300">
            <Phone className="w-4 h-4" />
            {t('phoneLabel')}
          </label>
          <input
            type="tel"
            id="phone"
            name="telephone"
            value={formData.telephone}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/50 transition-colors duration-300"
            placeholder="+33 6 12 34 56 78"
          />
        </div>
        
        <div className="group">
          <label htmlFor="service" className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700 group-hover:text-primary transition-colors duration-300">
            <Sparkles className="w-4 h-4" />
            {t('serviceLabel')} *
          </label>
          <select
            id="service"
            name="service"
            value={formData.service}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/50 transition-colors duration-300"
          >
            <option value="" disabled>{t('selectService')}</option>
            <option value="Chatbot IA">{t('chatbotSolution')}</option>
            <option value="SEO IA">{t('seoSolution')}</option>
            <option value="Création de Contenu">{t('contentSolution')}</option>
            <option value="Développement Web IA">{t('webSolution')}</option>
            <option value="Audit">{t('auditService')}</option>
            <option value="Stratégie IA">{t('strategyService')}</option>
            <option value="Autre">{t('otherService')}</option>
          </select>
        </div>
      </div>
      
      <div className="group">
        <label htmlFor="message" className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700 group-hover:text-primary transition-colors duration-300">
          <MessageSquare className="w-4 h-4" />
          {t('messageLabel')} *
        </label>
        <textarea
          id="message"
          name="message"
          value={formData.message}
          onChange={handleChange}
          required
          rows={6}
          className="w-full px-4 py-3 rounded-lg border border-slate-300 bg-white focus:outline-none focus:ring-2 focus:ring-primary/40 hover:border-primary/50 transition-colors duration-300 resize-none"
          placeholder={t('messagePlaceholder')}
        ></textarea>
      </div>
      
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <button 
          type="submit" 
          className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-6 py-4 rounded-lg font-medium shadow-md hover:bg-primary/90 hover:scale-[1.02] transition-all duration-300"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {t('submitting')}
            </>
          ) : (
            <>
              <SendIcon className="w-4 h-4" />
              {t('getStartedButton')}
            </>
          )}
        </button>
        
        <button 
          type="button"
          onClick={() => window.open('https://calendly.com/raphaellevy027/30min', '_blank')}
          className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-6 py-4 rounded-lg font-medium shadow-sm hover:bg-primary/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Calendar className="w-4 h-4" />
          {t('callUsButton')}
        </button>
      </div>
      
      <p className="text-xs text-slate-500 text-center">
        {t('responseTimeMessage')}
      </p>
    </form>
  );
};

export default ContactForm;

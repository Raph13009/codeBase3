
import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useToast } from '@/hooks/use-toast';
import { SendIcon, Sparkles, User, Mail, Phone, MessageSquare } from 'lucide-react';

const ContactForm: React.FC = () => {
  const { t } = useTranslation();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
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
    setIsSubmitting(true);
    
    // Simulate API call
    try {
      // In a real app, you would call your API here
      // const response = await supabase.from('leads').insert([
      //   { name: formData.name, email: formData.email, message: formData.message, source: 'contact_form' },
      // ]);
      
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Success
      toast({
        title: t('contactSuccess'),
        variant: 'default',
      });
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: '',
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      
      // Error
      toast({
        title: t('contactError'),
        variant: 'destructive',
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="group">
          <label htmlFor="name" className="flex items-center gap-2 text-sm font-medium mb-2 text-slate-700 group-hover:text-primary transition-colors duration-300">
            <User className="w-4 h-4" />
            {t('nameLabel')} *
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
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
            name="phone"
            value={formData.phone}
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
            <option value="chatbot">{t('chatbotSolution')}</option>
            <option value="seo">{t('seoSolution')}</option>
            <option value="content">{t('contentSolution')}</option>
            <option value="web">{t('webSolution')}</option>
            <option value="other">{t('otherService')}</option>
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
          onClick={() => window.location.href = 'tel:+33123456789'}
          className="flex items-center justify-center gap-2 bg-primary/10 text-primary px-6 py-4 rounded-lg font-medium shadow-sm hover:bg-primary/20 hover:scale-[1.02] transition-all duration-300"
        >
          <Phone className="w-4 h-4" />
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

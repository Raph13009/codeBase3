import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import ContactForm from '@/components/contact/ContactForm';
import Map from '@/components/contact/Map';
import MetaTags from '@/components/seo/MetaTags';
import { Phone, Mail, Globe, Calendar, Clock, Map as MapIcon } from 'lucide-react';
import { motion } from 'framer-motion';

const Contact: React.FC = () => {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    // Set document language to English
    document.documentElement.lang = 'en';
    
    // Scroll to top on page load
    window.scrollTo(0, 0);
  }, []);
  
  const contactInfo = [
    {
      icon: <Phone className="w-5 h-5" />,
      title: t('phoneTitle'),
      details: ['+33 6 02 61 73 29'],
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: t('emailTitle'),
      details: ['raphaellevy027@gmail.com'],
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: t('ourPresence'),
      details: [
        'Paris, France',
        'Marseille, France',
        'London, UK',
      ],
    },
  ];

  const teamMembers = [
    {
      name: "Raphaël",
      role: t('aiConsultant'),
      photo: "/assets/raph-pp.jpg"
    },
    {
      name: "Sébastien",
      role: t('developer'),
      photo: "/assets/seb-pp.png"
    }
  ];
  
  return (
          <>
        <MetaTags
          title="Contact Us | BoostAI Consulting"
          description="Get in touch with our AI experts. Let's discuss your needs and see how our AI expertise can help transform your business."
          keywords="contact, AI consulting, business transformation, chatbots, SEO optimization, content creation, web development"
        />
        <div className="flex flex-col min-h-screen bg-slate-50">
          <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                {t('contactTitle')}
              </h1>
              <p className="text-muted-foreground text-lg md:text-xl animate-fade-in" style={{ animationDelay: '200ms' }}>
                {t('contactSubtitle')}
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
              <motion.div 
                className="bg-white rounded-2xl border border-slate-200 shadow-lg p-10"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <h2 className="text-2xl font-display font-bold mb-4 flex items-center gap-2">
                  <Mail className="w-5 h-5 text-primary" />
                  {t('getInTouchTitle')}
                </h2>
                <p className="text-slate-600 mb-8">{t('getInTouchSubtitle')}</p>
                
                <ContactForm />
              </motion.div>
              
              <motion.div 
                className="space-y-8"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                    <Phone className="w-5 h-5 text-primary" />
                    {t('contactInfoTitle')}
                  </h2>
                  
                  <div className="space-y-8">
                    {contactInfo.map((info, index) => (
                      <div key={index} className="flex group">
                        <div className="flex-shrink-0 h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                          {info.icon}
                        </div>
                        <div>
                          <h3 className="font-medium text-lg mb-2">{info.title}</h3>
                          <div className="space-y-1">
                            {info.details.map((detail, i) => (
                              <p key={i} className="text-slate-600">{detail}</p>
                            ))}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 pt-6 border-t border-slate-200">
                    <h3 className="font-medium mb-4 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" />
                      {t('scheduleTitle')}
                    </h3>
                    
                    <div className="flex gap-4 flex-wrap">
                      <div className="flex gap-2 items-center bg-primary/10 text-primary px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                        <Calendar className="w-4 h-4" />
                        <span className="text-sm">Mon-Fri: 9AM-6PM</span>
                      </div>
                      <div className="flex gap-2 items-center bg-primary/10 text-primary px-3 py-2 rounded-lg hover:bg-primary/20 transition-colors duration-300">
                        <Clock className="w-4 h-4" />
                        <span className="text-sm">{t('responseTime')}: 24h</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                    <MapIcon className="w-5 h-5 text-primary" />
                    {t('ourPresence')}
                  </h2>
                  <div className="relative z-0">
                    <Map />
                  </div>
                </div>
                
                <div className="bg-white rounded-2xl border border-slate-200 shadow-lg p-8 hover:shadow-xl transition-all duration-300">
                  <h2 className="text-2xl font-display font-bold mb-6 flex items-center gap-2">
                    <Globe className="w-5 h-5 text-primary" />
                    {t('meetTeamTitle')}
                  </h2>
                  
                  <div className="grid grid-cols-2 gap-6">
                    {teamMembers.map((member, index) => (
                      <div key={index} className="flex flex-col items-center group">
                        <div className="w-24 h-24 rounded-full overflow-hidden mb-4 border-2 border-primary group-hover:border-primary/80 transition-all duration-300 shadow-md">
                          <img 
                            src={member.photo}
                            alt={member.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <h3 className="font-medium text-center text-lg">{member.name}</h3>
                        <p className="text-sm text-slate-600 text-center">{member.role}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;

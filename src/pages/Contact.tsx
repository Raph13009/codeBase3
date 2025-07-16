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
      title: "Phone",
      details: ['+33 6 02 61 73 29'],
    },
    {
      icon: <Mail className="w-5 h-5" />,
      title: "Email",
      details: ['contact@boostaiconsulting.com'],
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "Our Presence",
      details: ['Paris, France'],
    },
  ];

  const teamMembers = [
    {
      name: 'Raphaël Levy',
      role: "AI Consultant",
      image: '/assets/raph-pp.jpg',
    },
    {
      name: 'Sébastien',
      role: "Full-stack Developer",
      image: '/assets/seb-pp.png',
    },
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
                <motion.h1 
                  className="font-display text-4xl md:text-5xl font-bold mb-4"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  Contact Us
                </motion.h1>
                <motion.p 
                  className="text-slate-600 text-lg md:text-xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.1 }}
                >
                  Let's discuss your needs and see how our AI expertise can help you
                </motion.p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                {/* Contact Form */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  <h2 className="text-2xl font-bold mb-2">Get in Touch</h2>
                  <p className="text-slate-600 mb-8">Fill out the form below and get a free quote for your project. Our team will get back to you within 24 hours.</p>
                  <ContactForm />
                </motion.div>

                {/* Contact Information */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                  className="space-y-8"
                >
                  <div>
                    <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                    <div className="space-y-6">
                      {contactInfo.map((info, index) => (
                        <div key={index} className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center text-primary">
                            {info.icon}
                          </div>
                          <div>
                            <h3 className="font-medium mb-1">{info.title}</h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-slate-600">{detail}</p>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="bg-white p-6 rounded-xl border border-slate-200">
                    <div className="flex items-center gap-3 mb-4">
                      <Calendar className="w-5 h-5 text-primary" />
                      <h3 className="font-medium">Available Hours</h3>
                    </div>
                    <div className="space-y-2 text-sm text-slate-600">
                      <div className="flex justify-between">
                        <span>Monday - Friday</span>
                        <span>9:00 AM - 6:00 PM CET</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Saturday</span>
                        <span>10:00 AM - 2:00 PM CET</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Sunday</span>
                        <span>Closed</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-slate-200">
                      <span className="text-sm">Response time: 24h</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <MapIcon className="w-5 h-5 text-primary" />
                      <h3 className="font-medium">Our Presence</h3>
                    </div>
                    <Map />
                  </div>
                </motion.div>
              </div>

              {/* Team Section */}
              <motion.div
                className="mt-20"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <h2 className="text-2xl font-bold text-center mb-12">Meet Our Team</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-2xl mx-auto">
                  {teamMembers.map((member, index) => (
                    <div key={index} className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden border-4 border-primary/20">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-lg">{member.name}</h3>
                      <p className="text-slate-600">{member.role}</p>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>
        </main>
        
        <Footer />
      </div>
    </>
  );
};

export default Contact;

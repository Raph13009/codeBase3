
import React from 'react';
import { useTranslation } from 'react-i18next';
import { useInView } from 'react-intersection-observer';

interface Stat {
  id: string;
  value: string;
  label: string;
  prefix?: string;
  suffix?: string;
}

const StatSection: React.FC = () => {
  const { t } = useTranslation();
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const stats: Stat[] = [
    {
      id: 'clients',
      value: '200',
      label: t('clientsServed'),
      suffix: '+',
    },
    {
      id: 'projects',
      value: '500',
      label: t('projectsCompleted'),
      suffix: '+',
    },
    {
      id: 'satisfaction',
      value: '98',
      label: t('satisfactionRate'),
      suffix: '%',
    },
  ];

  return (
    <section ref={ref} className="py-16 bg-card border-y border-border/50">
      <div className="container mx-auto px-4 md:px-6">
        <h2 className="text-2xl font-display font-bold text-center mb-12">
          {t('keyStats')}
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div 
              key={stat.id} 
              className={`text-center space-y-2 transition-all duration-500 transform ${
                inView 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8'
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              <div className="font-display text-5xl md:text-6xl font-bold text-primary">
                {stat.prefix && <span>{stat.prefix}</span>}
                <span>{stat.value}</span>
                {stat.suffix && <span>{stat.suffix}</span>}
              </div>
              <p className="text-muted-foreground text-lg">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatSection;

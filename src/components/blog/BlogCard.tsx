import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, PinIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProperties {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  readTime: string;
  category: string;
  index: number;
  isPinned?: boolean;
}

const BlogCard: React.FC<BlogCardProperties> = ({
  id,
  slug,
  title,
  excerpt,
  image,
  date,
  readTime,
  category,
  index,
  isPinned = false,
}) => {
  const { t } = useTranslation();
  
  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        delay: index * 0.1
      } 
    }
  };
  
  return (
    <motion.article 
      className={`bg-white rounded-xl border ${isPinned ? 'border-primary/30' : 'border-slate-200'} overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 h-full flex flex-col`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      layout
    >
      <Link to={`/blog/${slug}`} className="block h-full">
        <div className="relative h-48 overflow-hidden">
          <img 
            src={image} 
            alt={title} 
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          <div className="absolute top-3 left-3 flex gap-2">
            <span className="px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full">
              {category}
            </span>
            {isPinned && (
              <span className="px-2 py-1 bg-amber-100 text-amber-800 text-xs font-medium rounded-full flex items-center gap-1">
                <PinIcon className="w-3 h-3" />
                À la une
              </span>
            )}
          </div>
        </div>
        
        <div className="p-6 flex-1 flex flex-col">
          <div className="flex items-center text-xs text-slate-500 mb-3 gap-4">
            <div className="flex items-center gap-1">
              <Calendar className="w-3 h-3" />
              <span>{date}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>{readTime}</span>
            </div>
          </div>
          
          <h3 className="text-xl font-display font-bold mb-3 line-clamp-2 text-slate-800">{title}</h3>
          
          <p className="text-slate-600 text-sm mb-6 line-clamp-3 flex-1">
            {excerpt}
          </p>
          
          <span 
            className="inline-flex items-center gap-1 text-primary font-medium transition-all hover:gap-2 mt-auto"
          >
            {t('readMore')} <ArrowRight className="w-4 h-4" />
          </span>
        </div>
      </Link>
    </motion.article>
  );
};

export default BlogCard;

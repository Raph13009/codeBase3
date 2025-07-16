import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { Calendar, Clock, ArrowRight, PinIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface BlogCardProps {
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

const BlogCard: React.FC<BlogCardProps> = ({
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
    <Link to={`/blog/${slug}`} className="block h-full group">
      <div className="relative h-48 overflow-hidden rounded-t-2xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        <div className="absolute top-3 left-3 flex gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-cyan-500 to-blue-600 text-white text-xs font-medium rounded-full backdrop-blur-sm">
            {category}
          </span>
          {isPinned && (
            <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-600 text-white text-xs font-medium rounded-full flex items-center gap-1 backdrop-blur-sm">
              <PinIcon className="w-3 h-3" />
              Featured
            </span>
          )}
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center text-xs text-gray-400 mb-3 gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{date}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{readTime}</span>
          </div>
        </div>
        
        <h3 className="text-xl font-bold mb-3 line-clamp-2 text-white group-hover:text-cyan-400 transition-colors duration-300">{title}</h3>
        
        <p className="text-gray-300 text-sm mb-6 line-clamp-3 flex-1 leading-relaxed">
          {excerpt}
        </p>
        
        <span className="inline-flex items-center gap-2 text-cyan-400 font-medium transition-all duration-300 group-hover:gap-3 mt-auto">
          Read More <ArrowRight className="w-4 h-4" />
        </span>
      </div>
    </Link>
  );
};

export default BlogCard;

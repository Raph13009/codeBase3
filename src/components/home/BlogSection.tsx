import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { getBlogs, type Blog } from '@/lib/supabase';
import { formatDistanceToNow } from 'date-fns';
import { fr, enUS } from 'date-fns/locale';
import { ArrowRight } from 'lucide-react';

const BlogSection: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs from Supabase...');
        const data = await getBlogs();
        console.log('Received blogs:', data);
        
        if (!data || data.length === 0) {
          console.log('No blogs found or empty data received');
          setError('No blogs found');
        } else {
          setBlogs(data);
          console.log('Blogs set successfully:', data.length, 'blogs loaded');
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Error loading blogs');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  const getLocale = () => {
    return i18n.language === 'fr' ? fr : enUS;
  };

  const formatDate = (date: string) => {
    try {
      return formatDistanceToNow(new Date(date), {
        addSuffix: true,
        locale: getLocale(),
      });
    } catch (error) {
      console.error('Error formatting date:', error);
      return '';
    }
  };

  if (loading) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-64 bg-secondary/20 rounded-2xl"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="text-center py-12">
            <p className="text-muted-foreground">{error}</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl md:text-4xl font-bold mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            {t('blogTitle')}
          </motion.h2>
          <motion.p 
            className="text-muted-foreground max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            {t('blogSubtitle')}
          </motion.p>
        </div>

        {blogs.length > 0 ? (
          <>
            {/* Mobile - afficher un seul article */}
            <div className="lg:hidden">
              <motion.article 
                key={blogs[0].id}
                className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <Link to={`/blog/${blogs[0].slug}`} className="block">
                  {/* Thumbnail */}
                  <div className="aspect-video relative overflow-hidden">
                    <img 
                      src={blogs[0].thumbnail} 
                      alt={blogs[0].title}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full">
                        {blogs[0].category}
                      </span>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                      {blogs[0].title}
                    </h3>
                    <p className="text-muted-foreground line-clamp-2 mb-4">
                      {blogs[0].excerpt}
                    </p>
                    
                    {/* Meta */}
                    <div className="flex items-center justify-between text-sm text-muted-foreground">
                      <span>{formatDate(blogs[0].createdAt)}</span>
                      <span>{blogs[0].readingtime} min {t('readingTime')}</span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            </div>

            {/* Desktop - afficher trois articles */}
            <div className="hidden lg:grid lg:grid-cols-3 gap-8">
              {blogs.slice(0, 3).map((blog, index) => (
                <motion.article 
                  key={blog.id}
                  className="group relative bg-card rounded-2xl overflow-hidden border border-border/40 shadow-lg hover:shadow-xl transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Link to={`/blog/${blog.slug}`} className="block">
                    {/* Thumbnail */}
                    <div className="aspect-video relative overflow-hidden">
                      <img 
                        src={blog.thumbnail} 
                        alt={blog.title}
                        className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 bg-primary/90 text-primary-foreground text-sm font-medium rounded-full">
                          {blog.category}
                        </span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {blog.title}
                      </h3>
                      <p className="text-muted-foreground line-clamp-2 mb-4">
                        {blog.excerpt}
                      </p>
                      
                      {/* Meta */}
                      <div className="flex items-center justify-between text-sm text-muted-foreground">
                        <span>{formatDate(blog.createdAt)}</span>
                        <span>{blog.readingtime} min {t('readingTime')}</span>
                      </div>
                    </div>
                  </Link>
                </motion.article>
              ))}
            </div>

            {/* Ajouter un lien "Voir tous nos articles" */}
            <div className="mt-10 text-center">
              <Link 
                to="/blog" 
                className="inline-flex items-center gap-2 text-primary font-medium hover:underline"
              >
                {t('viewAllBlogs')} <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground">{t('noArticlesFound')}</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection; 
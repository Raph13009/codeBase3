import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogBySlug, getBlogs, type Blog } from '@/lib/supabase';
import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  
  console.log('BlogPost - slug param:', slug);
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fonction sécurisée pour formater la date
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'dd MMMM yyyy', { locale: fr });
      }
      return 'Date inconnue';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date inconnue';
    }
  };

  useEffect(() => {
    const fetchBlogAndRelated = async () => {
      try {
        setIsLoading(true);
        
        if (!slug) {
          console.error('Slug parameter is missing');
          setError(t('articleNotFound'));
          return;
        }
        
        console.log('Fetching blog with slug:', slug);
        
        // Récupérer l'article principal
        const data = await getBlogBySlug(slug);
        
        console.log('Blog data received:', data);
        
        if (!data) {
          console.log('No blog found with slug:', slug);
          setError(t('articleNotFound'));
          return;
        }

        setBlog(data);
        console.log('Blog set in state:', data);

        // Récupérer les articles similaires
        const allBlogs = await getBlogs();
        console.log('All blogs fetched for related posts:', allBlogs.length);
        
        // Filtrer les articles similaires par catégorie
        const related = allBlogs
          .filter(b => 
            b.id !== data.id && 
            b.category === data.category
          )
          .slice(0, 3);

        console.log('Related posts found:', related.length);
        setRelatedPosts(related);
      } catch (error) {
        console.error('Error fetching blog details:', error);
        setError(t('loadingError'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogAndRelated();
  }, [slug, t]);

  if (isLoading) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto animate-pulse">
              <div className="h-8 bg-slate-200 rounded w-1/4 mb-4"></div>
              <div className="h-12 bg-slate-200 rounded w-3/4 mb-8"></div>
              <div className="h-96 bg-slate-200 rounded mb-8"></div>
              <div className="space-y-4">
                <div className="h-4 bg-slate-200 rounded w-full"></div>
                <div className="h-4 bg-slate-200 rounded w-5/6"></div>
                <div className="h-4 bg-slate-200 rounded w-4/6"></div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !blog) {
    return (
      <div className="flex flex-col min-h-screen bg-slate-50">
        <Header />
        <main className="flex-grow pt-24 pb-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-2xl font-bold mb-4">{error || t('articleNotFound')}</h1>
              <Link to="/blog" className="text-primary hover:underline">
                {t('backToBlog')}
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  // Préparer le schéma JSON-LD
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: blog.metatitle || blog.title,
    description: blog.metadescription || blog.excerpt || '',
    image: blog.thumbnail || '',
    datePublished: blog.createdAt || '',
    author: {
      '@type': 'Person',
      name: 'AI Agency'
    },
    publisher: {
      '@type': 'Organization',
      name: 'AI Agency',
      logo: {
        '@type': 'ImageObject',
        url: '/logo.png'
      }
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Helmet>
        <title>{blog.metatitle || blog.title}</title>
        <meta name="description" content={blog.metadescription || blog.excerpt || ''} />
        <meta property="og:title" content={blog.metatitle || blog.title} />
        <meta property="og:description" content={blog.metadescription || blog.excerpt || ''} />
        <meta property="og:image" content={blog.thumbnail || ''} />
        <meta property="og:type" content="article" />
        <meta property="article:published_time" content={blog.createdAt || ''} />
        <link rel="canonical" href={`https://votredomaine.com/blog/${blog.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
      </Helmet>

      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <article className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-primary mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToBlog')}
            </Link>

            <motion.header 
              className="mb-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blog.createdAt || '')}
                </span>
                {blog.readingtime && (
                  <span className="flex items-center gap-1">
                    <Clock className="w-4 h-4" />
                    {blog.readingtime} {t('readingTime')}
                  </span>
                )}
              </div>

              {blog.category && (
                <div className="flex items-center gap-2 mb-4">
                  <Tag className="w-4 h-4 text-primary" />
                  <span className="text-sm font-medium text-primary">{blog.category}</span>
                </div>
              )}

              <h1 className="text-4xl md:text-5xl font-bold mb-6">{blog.title}</h1>
            </motion.header>

            {blog.thumbnail && (
              <motion.div 
                className="relative mb-12"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <img
                  src={blog.thumbnail}
                  alt={blog.title}
                  className="w-full h-[400px] object-cover rounded-xl"
                  loading="lazy"
                />
              </motion.div>
            )}

            <motion.div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: blog.content }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />

            {relatedPosts.length > 0 && (
              <motion.div 
                className="mt-16 pt-8 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-6">Articles similaires</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedBlog) => (
                    <Link 
                      key={relatedBlog.id}
                      to={`/blog/${relatedBlog.slug}`}
                      className="group"
                    >
                      <div className="relative overflow-hidden rounded-xl mb-4">
                        <img
                          src={relatedBlog.thumbnail || ''}
                          alt={relatedBlog.title}
                          className="w-full h-48 object-cover transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                      </div>
                      <h3 className="text-lg font-semibold mb-2 group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                      <p className="text-slate-600 line-clamp-2">
                        {relatedBlog.excerpt || ''}
                      </p>
                    </Link>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </article>
      </main>
      
      <Footer />
    </div>
  );
};

export default BlogPost; 
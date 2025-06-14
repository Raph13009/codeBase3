import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Helmet } from 'react-helmet-async';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { getBlogBySlug, getBlogs, type Blog } from '@/lib/supabase';
import { format, parseISO, isValid } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { ArrowLeft, Calendar, Clock, Tag, BookOpen, ArrowRight, MessageSquare, Share2 } from 'lucide-react';
import { motion } from 'framer-motion';

const BlogPost: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t, i18n } = useTranslation();
  
  const [blog, setBlog] = useState<Blog | null>(null);
  const [relatedPosts, setRelatedPosts] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formattedContent, setFormattedContent] = useState<string>('');

  // Fonction sécurisée pour formater la date
  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (isValid(date)) {
        return format(date, 'MMMM dd, yyyy', { locale: enUS });
      }
      return 'Date inconnue';
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Date inconnue';
    }
  };

  // Fonction pour formatter le contenu HTML
  const formatContent = (content: string) => {
    if (!content) return '';
    
    let formatted = content;
    
    // Améliorer les titres h2
    formatted = formatted.replace(
      /<h2>(.*?)<\/h2>/g, 
      '<h2 class="text-3xl font-bold mt-12 mb-6 text-slate-800 border-b border-slate-200 pb-2">$1</h2>'
    );
    
    // Améliorer les titres h3
    formatted = formatted.replace(
      /<h3>(.*?)<\/h3>/g, 
      '<h3 class="text-2xl font-bold mt-8 mb-4 text-slate-800">$1</h3>'
    );
    
    // Améliorer les paragraphes
    formatted = formatted.replace(
      /<p>(.*?)<\/p>/g,
      '<p class="mb-6 text-slate-700 leading-relaxed">$1</p>'
    );
    
    // Styliser les listes à puces
    formatted = formatted.replace(
      /<ul>([\s\S]*?)<\/ul>/g,
      '<ul class="my-6 space-y-3 list-none pl-6">$1</ul>'
    );
    
    formatted = formatted.replace(
      /<li>(.*?)<\/li>/g,
      '<li class="flex items-start"><span class="inline-block mr-2 mt-1">🔹</span><span>$1</span></li>'
    );
    
    // Remplacer les emojis spécifiques dans les listes
    formatted = formatted.replace(/🔹 ✅/g, '✅');
    formatted = formatted.replace(/🔹 📌/g, '📌');
    formatted = formatted.replace(/🔹 🚀/g, '🚀');
    
    // Styliser les citations (blockquote)
    formatted = formatted.replace(
      /<blockquote>([\s\S]*?)<\/blockquote>/g,
      '<blockquote class="my-6 pl-6 py-4 border-l-4 border-primary bg-primary/5 text-slate-700 italic rounded-r-lg">$1</blockquote>'
    );
    
    // Améliorer les liens
    formatted = formatted.replace(
      /<a\s+href="(.*?)">(.*?)<\/a>/g,
      '<a href="$1" class="text-primary hover:underline font-medium">$2</a>'
    );
    
    // Ajouter classes pour les images
    formatted = formatted.replace(
      /<img\s+src="(.*?)"(.*?)>/g,
      '<img src="$1" $2 class="rounded-lg shadow-md my-8 max-w-full h-auto">'
    );
    
    return formatted;
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
        
        // Récupérer l'article principal
        const data = await getBlogBySlug(slug);
        
        if (!data) {
          setError(t('articleNotFound'));
          return;
        }

        setBlog(data);
        
        // Formater le contenu 
        if (data.content) {
          setFormattedContent(formatContent(data.content));
        }

        // Récupérer les articles similaires
        const allBlogs = await getBlogs();
        
        // D'abord chercher dans relatedposts si disponible
        const relatedPostsData = data.relatedposts && data.relatedposts.length 
          ? allBlogs.filter(b => data.relatedposts.includes(b.id))
          : allBlogs.filter(b => b.id !== data.id && b.category === data.category);
            
        setRelatedPosts(relatedPostsData.slice(0, 3));
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
      name: 'BoostAI Consulting'
    },
    publisher: {
      '@type': 'Organization',
      name: 'BoostAI Consulting',
      logo: {
        '@type': 'ImageObject',
        url: '/favicon.png'
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://votre-domaine.com/blog/${blog.slug}`
    },
    articleSection: blog.category,
    keywords: blog.tags ? blog.tags.join(', ') : ''
  };

  // Schema supplémentaire si fourni
  const additionalSchema = blog.seoschema ? JSON.parse(blog.seoschema) : null;

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
        <meta property="article:section" content={blog.category || ''} />
        {blog.tags && blog.tags.map((tag, index) => (
          <meta key={index} property="article:tag" content={tag} />
        ))}
        <link rel="canonical" href={`https://votre-domaine.com/blog/${blog.slug}`} />
        <script type="application/ld+json">
          {JSON.stringify(jsonLd)}
        </script>
        {additionalSchema && (
          <script type="application/ld+json">
            {JSON.stringify(additionalSchema)}
          </script>
        )}
      </Helmet>

      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <article className="container mx-auto px-4">
          {/* Navigation retour */}
          <div className="max-w-5xl mx-auto">
            <Link 
              to="/blog" 
              className="inline-flex items-center gap-2 text-slate-600 hover:text-primary mb-8 text-sm font-medium"
            >
              <ArrowLeft className="w-4 h-4" />
              {t('backToBlog')}
            </Link>
          </div>
          
          {/* Image principale */}
          {blog.thumbnail && (
            <motion.div 
              className="relative w-full max-w-5xl mx-auto mb-12 rounded-2xl overflow-hidden shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <img
                src={blog.thumbnail}
                alt={blog.title}
                className="w-full h-[500px] object-cover"
                loading="lazy"
              />
            </motion.div>
          )}
          
          <div className="max-w-4xl mx-auto">
            <motion.header 
              className="mb-10"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {/* Meta information */}
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-500 mb-4">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDate(blog.createdAt || '')}
                </span>
                
                {blog.readingtime && (
                  <span className="flex items-center gap-1 bg-slate-100 px-2 py-1 rounded-full">
                    <Clock className="w-4 h-4" />
                    {blog.readingtime} {t('readingTime')}
                  </span>
                )}
                
                {blog.category && (
                  <span className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-full">
                    <Tag className="w-4 h-4" />
                    {blog.category}
                  </span>
                )}
              </div>

              {/* Titre principal h1 */}
              <h1 className="text-4xl md:text-5xl font-bold mb-6 text-slate-900 leading-tight">
                {blog.title}
              </h1>
              
              {/* Extrait en introduction */}
              {blog.excerpt && (
                <div className="text-xl text-slate-600 border-l-4 border-primary pl-4 py-2 italic mb-8">
                  {blog.excerpt}
                </div>
              )}

              {/* Tags */}
              {blog.tags && blog.tags.length > 0 && (
                <div className="flex flex-wrap gap-2 mb-8">
                  {blog.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="text-xs bg-slate-100 text-slate-700 px-3 py-1 rounded-full"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.header>

            {/* Contenu de l'article */}
            <motion.div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: formattedContent }}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            />

            {/* CTA */}
            <motion.div
              className="my-16 p-8 bg-primary/10 rounded-xl border border-primary/20 shadow-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
            >
              <h3 className="text-2xl font-bold mb-4 text-slate-900">
                👉 Need AI solutions for your business?
              </h3>
              <p className="text-lg mb-6 text-slate-700">
                Découvrez comment nos solutions d'intelligence artificielle peuvent transformer votre entreprise et accélérer votre croissance digitale.
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 rounded-lg hover:bg-primary/90 transition-colors shadow-md"
              >
                Contact us <ArrowRight className="w-5 h-5" />
              </Link>
            </motion.div>
            
            {/* Partage */}
            <div className="border-t border-slate-200 pt-8 mb-16">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-slate-800">Partager cet article</h4>
                <div className="flex gap-4">
                  <button 
                    onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(blog.title)}`, '_blank')}
                    className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Partager sur Twitter"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(window.location.href)}&title=${encodeURIComponent(blog.title)}`, '_blank')}
                    className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Partager sur LinkedIn"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path fillRule="evenodd" d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" clipRule="evenodd"></path>
                    </svg>
                  </button>
                  <button 
                    onClick={() => window.open(`mailto:?subject=${encodeURIComponent(blog.title)}&body=${encodeURIComponent(window.location.href)}`, '_blank')}
                    className="p-2 rounded-full bg-slate-100 text-slate-600 hover:bg-primary/10 hover:text-primary transition-colors"
                    aria-label="Partager par email"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            {/* Articles similaires */}
            {relatedPosts.length > 0 && (
              <motion.div 
                className="mt-16 pt-8 border-t border-slate-200"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <h2 className="text-2xl font-bold mb-8 flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-primary" />
                  Articles similaires
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {relatedPosts.map((relatedBlog) => (
                    <Link 
                      key={relatedBlog.id}
                      to={`/blog/${relatedBlog.slug}`}
                      className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 border border-slate-200"
                    >
                      <div className="relative overflow-hidden aspect-video">
                        <img
                          src={relatedBlog.thumbnail || ''}
                          alt={relatedBlog.title}
                          className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
                          loading="lazy"
                        />
                        {relatedBlog.category && (
                          <div className="absolute top-3 left-3">
                            <span className="px-2 py-1 bg-primary/80 text-white text-xs font-medium rounded-full">
                              {relatedBlog.category}
                            </span>
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <h3 className="text-lg font-semibold mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                        {relatedBlog.title}
                      </h3>
                        <p className="text-slate-600 text-sm line-clamp-2 mb-3">
                        {relatedBlog.excerpt || ''}
                      </p>
                        <div className="flex items-center justify-between text-xs text-slate-500">
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {formatDate(relatedBlog.createdAt || '')}
                          </span>
                          {relatedBlog.readingtime && (
                            <span className="flex items-center gap-1">
                              <Clock className="w-3 h-3" />
                              {relatedBlog.readingtime} min
                            </span>
                          )}
                        </div>
                      </div>
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
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, PinIcon } from 'lucide-react';
import { getBlogs, type Blog } from '@/lib/supabase';
import { format, parseISO, isValid } from 'date-fns';
import { fr } from 'date-fns/locale';
import QualityPledge from '@/components/blog/QualityPledge';

const Blog: React.FC = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
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
    // Update document metadata for SEO
    document.title = t('blog') + ' | AI Agency';
    
    // Set document language
    document.documentElement.lang = i18n.language;
    
    // Fetch blogs from Supabase
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
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, [t, i18n.language]);
  
  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];
  
  // Filter and search posts
  const filteredPosts = blogs
    .filter(blog => filter === 'all' || blog.category === filter)
    .filter(blog => 
      searchQuery === '' || 
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Separate pinned and regular posts
  const pinnedPosts = filteredPosts.filter(blog => blog.pinned);
  const regularPosts = filteredPosts.filter(blog => !blog.pinned);
  
  return (
    <div className="flex flex-col min-h-screen bg-slate-50">
      <Header />
      
      <main className="flex-grow pt-24 pb-20">
        <div className="w-full text-center py-2 bg-slate-50">
          <a 
            href="#quality-pledge" 
            className="text-xs text-slate-500 hover:text-blue-600 transition-colors"
          >
            {t('blog.viewQualityPledge', 'Voir notre engagement de qualité')} →
          </a>
        </div>
        <section className="py-12 md:py-20">
          <div className="container mx-auto px-4 md:px-6">
            <div className="max-w-3xl mx-auto text-center mb-16">
              <div className="mb-4">
                <span className="inline-block bg-primary/10 text-primary px-3 py-1 rounded-full text-sm font-medium">
                  {t('blogInsights')}
                </span>
              </div>
              <h1 className="font-display text-4xl md:text-5xl font-bold mb-4">
                {t('blogTitle')}
              </h1>
              <p className="text-slate-600 text-lg md:text-xl">
                {t('blogSubtitle')}
              </p>
            </div>
            
            <div className="max-w-5xl mx-auto mb-12">
              <div className="flex flex-wrap gap-4 justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200">
                <div className="relative flex-1 min-w-[280px]">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-slate-400" />
                  </div>
                  <input
                    type="text"
                    className="block w-full pl-10 pr-3 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/40"
                    placeholder={t('searchArticles')}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                
                <div className="flex items-center gap-2">
                  <Filter className="h-5 w-5 text-slate-500" />
                  <div className="flex gap-2 flex-wrap">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setFilter(category)}
                        className={`px-3 py-1 rounded-full text-sm transition-colors ${
                          filter === category
                            ? 'bg-primary text-white'
                            : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                        }`}
                      >
                        {category === 'all' ? t('allCategories') : category}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[...Array(6)].map((_, index) => (
                  <div key={index} className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm animate-pulse">
                    <div className="h-48 bg-slate-200"></div>
                    <div className="p-6">
                      <div className="h-4 bg-slate-200 rounded w-1/4 mb-3"></div>
                      <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                      <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/2 mb-6"></div>
                      <div className="h-4 bg-slate-200 rounded w-1/4"></div>
                    </div>
                  </div>
                ))}
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium mb-2">{error}</h3>
                <p className="text-slate-500">{t('tryAnotherSearch')}</p>
              </div>
            ) : (
              <>
                {pinnedPosts.length > 0 && (
                  <div className="mb-12">
                    <div className="flex items-center gap-2 mb-6">
                      <PinIcon className="w-5 h-5 text-primary" />
                      <h2 className="text-xl font-semibold">Articles à la une</h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      {pinnedPosts.map((blog, index) => (
                        <motion.div
                          key={blog.id}
                          initial={{ opacity: 0, y: 50 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          className="bg-white rounded-xl border-2 border-primary/20 overflow-hidden shadow-md hover:shadow-lg transition-all"
                        >
                          <BlogCard 
                            id={blog.id}
                            slug={blog.slug}
                            title={blog.title}
                            excerpt={blog.excerpt}
                            image={blog.thumbnail}
                            date={formatDate(blog.createdAt)}
                            readTime={`${blog.readingtime} ${t('readingTime')}`}
                            category={blog.category}
                            index={index}
                            isPinned={true}
                          />
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {regularPosts.length > 0 && (
                  <motion.div 
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    {regularPosts.map((blog, index) => (
                      <BlogCard 
                        key={blog.id}
                        id={blog.id}
                        slug={blog.slug}
                        title={blog.title}
                        excerpt={blog.excerpt}
                        image={blog.thumbnail}
                        date={formatDate(blog.createdAt)}
                        readTime={`${blog.readingtime} ${t('readingTime')}`}
                        category={blog.category}
                        index={index}
                      />
                    ))}
                  </motion.div>
                )}

                {filteredPosts.length === 0 && (
                  <div className="text-center py-12">
                    <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2">{t('noArticlesFound')}</h3>
                    <p className="text-slate-500">{t('tryAnotherSearch')}</p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      
      <QualityPledge />
      <Footer />
    </div>
  );
};

export default Blog;

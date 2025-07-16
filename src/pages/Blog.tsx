import React, { useEffect, useState } from 'react';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import BlogCard from '@/components/blog/BlogCard';
import QualityPledge from '@/components/blog/QualityPledge';
import MetaTags from '@/components/seo/MetaTags';
import AnimatedBackground from '@/components/ui/AnimatedBackground';
import { motion } from 'framer-motion';
import { Search, Filter, BookOpen, PinIcon, Sparkles } from 'lucide-react';
import { getBlogs, type Blog } from '@/lib/supabase';
import { format, parseISO, isValid } from 'date-fns';
import { enUS } from 'date-fns/locale';

const Blog: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [error, setError] = useState<string | null>(null);

  const formatDate = (dateString: string | Date): string => {
    try {
      let date: Date;
      
      if (typeof dateString === 'string') {
        date = parseISO(dateString);
      } else {
        date = dateString;
      }
      
      if (!isValid(date)) {
        throw new Error('Invalid date');
      }
      
      return format(date, 'MMMM dd, yyyy', { locale: enUS });
    } catch (error) {
      console.error('Error formatting date:', error);
      return 'Unknown date';
    }
  };

  useEffect(() => {
    // Set document language to English
    document.documentElement.lang = 'en';
    
    // Fetch blogs using the proper function
    const fetchBlogs = async () => {
      try {
        console.log('Fetching blogs...');
        const data = await getBlogs();
        console.log('Blogs fetched successfully:', data);
        setBlogs(data || []);
      } catch (error) {
        console.error('Error fetching blogs:', error);
        setError('Unable to load articles. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  // Filter blogs based on search query and category
  const filteredPosts = blogs.filter(blog => {
    const matchesSearch = blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         blog.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filter === 'all' || blog.category === filter;
    return matchesSearch && matchesCategory;
  });

  // Separate pinned and regular posts
  const pinnedPosts = filteredPosts.filter(blog => blog.pinned);
  const regularPosts = filteredPosts.filter(blog => !blog.pinned);

  // Get unique categories
  const categories = ['all', ...new Set(blogs.map(blog => blog.category))];

  return (
    <>
      <MetaTags 
        title="AI & Innovation Blog | BoostAI Consulting"
        description="Discover our latest insights on AI, SEO, and digital trends. Expert articles and analysis to help transform your business with cutting-edge technology."
        keywords="AI blog, artificial intelligence insights, SEO trends, digital transformation, technology articles, business innovation"
      />
      
      <div className="min-h-screen relative overflow-x-hidden bg-[#0B0D14]">
        <AnimatedBackground />
        <Header />
        
        <main className="relative z-10 pt-32 pb-20">
          {/* Hero Section */}
          <section className="px-4 md:px-6 mb-20 py-8 pb-16">
            <div className="max-w-6xl mx-auto text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
              >
                <div className="inline-flex items-center gap-2 bg-cyan-900/30 backdrop-blur-sm px-4 py-2 rounded-full border border-cyan-500/30 mb-8">
                  <Sparkles className="w-4 h-4 text-cyan-400" />
                  <span className="text-cyan-300 text-sm font-medium">AI INSIGHTS</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-bold mb-12 bg-gradient-to-r from-white via-cyan-200 to-white bg-clip-text text-transparent leading-[1.1] md:leading-[1.05]">
                  Latest AI & Innovation
                  <span className="block bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent mt-2 pb-4">
                    Insights
                  </span>
                </h1>
                
                <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Discover expert insights on AI, automation, and digital transformation. Stay ahead with our comprehensive guides and industry analysis.
                </p>
              </motion.div>
            </div>
          </section>

          {/* Search and Filter Section */}
          <section className="px-4 md:px-6 mb-12">
            <div className="max-w-4xl mx-auto">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-700/50"
              >
                <div className="flex flex-col lg:flex-row gap-4 items-center">
                  {/* Search Bar */}
                  <div className="relative flex-1 w-full">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <Search className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      className="block w-full pl-12 pr-4 py-3 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 focus:border-cyan-500 transition-all duration-300"
                      placeholder="Search articles..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  
                  {/* Category Filter */}
                  <div className="flex items-center gap-3 flex-wrap">
                    <Filter className="h-5 w-5 text-gray-400" />
                    <div className="flex gap-2 flex-wrap">
                      {categories.map((category) => (
                        <button
                          key={category}
                          onClick={() => setFilter(category)}
                          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 ${
                            filter === category
                              ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg'
                              : 'bg-gray-800/50 text-gray-300 hover:bg-gray-700/50 hover:text-white border border-gray-600 hover:border-gray-500'
                          }`}
                        >
                          {category === 'all' ? 'All Categories' : category}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* Articles Section */}
          <section className="px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              {isLoading ? (
                <motion.div 
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  {[...Array(6)].map((_, index) => (
                    <div key={index} className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden animate-pulse">
                      <div className="h-48 bg-gray-800/50"></div>
                      <div className="p-6">
                        <div className="h-4 bg-gray-800/50 rounded w-1/4 mb-3"></div>
                        <div className="h-6 bg-gray-800/50 rounded w-3/4 mb-3"></div>
                        <div className="h-4 bg-gray-800/50 rounded w-full mb-2"></div>
                        <div className="h-4 bg-gray-800/50 rounded w-2/3 mb-2"></div>
                        <div className="h-4 bg-gray-800/50 rounded w-1/2 mb-6"></div>
                        <div className="h-4 bg-gray-800/50 rounded w-1/4"></div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              ) : error ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-red-900/20 backdrop-blur-sm rounded-2xl p-8 border border-red-500/30 max-w-md mx-auto">
                    <BookOpen className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2 text-white">{error}</h3>
                    <p className="text-gray-400">Please check your connection and try again</p>
                  </div>
                </motion.div>
              ) : filteredPosts.length === 0 ? (
                <motion.div 
                  className="text-center py-16"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="bg-gray-900/40 backdrop-blur-sm rounded-2xl p-8 border border-gray-700/50 max-w-md mx-auto">
                    <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-xl font-medium mb-2 text-white">No articles found</h3>
                    <p className="text-gray-400">Try adjusting your search or category filter</p>
                  </div>
                </motion.div>
              ) : (
                <>
                  {/* Pinned Posts */}
                  {pinnedPosts.length > 0 && (
                    <motion.div 
                      className="mb-16"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: 0.3 }}
                    >
                      <div className="flex items-center gap-3 mb-8">
                        <div className="bg-gradient-to-r from-yellow-500 to-orange-600 p-2 rounded-lg">
                          <PinIcon className="w-5 h-5 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-white">Featured Articles</h2>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {pinnedPosts.map((blog, index) => (
                          <motion.div
                            key={blog.id}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.4 + (index * 0.1) }}
                            className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border-2 border-yellow-500/30 overflow-hidden hover:border-yellow-500/50 transition-all duration-300 group"
                          >
                            <BlogCard 
                              id={blog.id}
                              slug={blog.slug}
                              title={blog.title}
                              excerpt={blog.excerpt}
                              image={blog.thumbnail}
                              date={formatDate(blog.createdAt)}
                              readTime={`${blog.readingtime} min read`}
                              category={blog.category}
                              index={index}
                              isPinned={true}
                            />
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Regular Posts */}
                  {regularPosts.length > 0 && (
                    <motion.div 
                      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, delay: 0.5 }}
                    >
                      {regularPosts.map((blog, index) => (
                        <motion.div
                          key={blog.id}
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: 0.6 + (index * 0.1) }}
                          className="bg-gray-900/40 backdrop-blur-sm rounded-2xl border border-gray-700/50 overflow-hidden hover:border-cyan-500/50 transition-all duration-300 group"
                        >
                          <BlogCard 
                            id={blog.id}
                            slug={blog.slug}
                            title={blog.title}
                            excerpt={blog.excerpt}
                            image={blog.thumbnail}
                            date={formatDate(blog.createdAt)}
                            readTime={`${blog.readingtime} min read`}
                            category={blog.category}
                            index={index}
                          />
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </>
              )}
            </div>
          </section>
        </main>
        
        <QualityPledge />
        <Footer />
      </div>
    </>
  );
};

export default Blog;

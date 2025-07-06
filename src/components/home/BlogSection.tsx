import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs, type Blog } from '@/lib/supabase';
import { format, parseISO, isValid } from 'date-fns';
import { enUS } from 'date-fns/locale';
import { Calendar, Clock } from 'lucide-react';

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        // Prendre les 3 premiers articles
        setBlogs(data.slice(0, 3));
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (isLoading) {
    return (
      <section className="py-20 relative z-10">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-white">Latest Articles</h2>
          <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
            Discover our insights and tips
          </p>
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden animate-pulse border border-gray-700">
                <div className="h-48 bg-gray-800"></div>
                <div className="p-6">
                  <div className="h-6 bg-gray-800 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
                  <div className="h-4 bg-gray-800 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 relative z-10">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-4 text-white">Latest Articles</h2>
        <p className="text-xl text-gray-300 text-center mb-16 max-w-3xl mx-auto">
          Discover our insights and tips
        </p>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-gray-900/50 backdrop-blur-sm rounded-2xl overflow-hidden hover:bg-gray-800/50 transition-all duration-300 border border-gray-700 hover:border-cyan-500 group">
              <div className="relative overflow-hidden">
                <img 
                  src={blog.thumbnail} 
                  alt={blog.title} 
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(blog.createdAt)}
                  </span>
                  {blog.readingtime && (
                    <span className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      {blog.readingtime} min
                    </span>
                  )}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white group-hover:text-cyan-400 transition-colors">{blog.title}</h3>
                <p className="text-gray-300 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link to={`/blog/${blog.slug}`} className="text-cyan-400 hover:text-cyan-300 font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all duration-300">
                  Read more 
                  <span className="text-lg">→</span>
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/blog" 
            className="inline-block bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:from-cyan-400 hover:to-blue-500 transition-all duration-300 shadow-lg hover:shadow-cyan-500/25 transform hover:scale-105"
          >
            See our articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 
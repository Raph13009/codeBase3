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
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden animate-pulse">
                <div className="h-48 bg-slate-200"></div>
                <div className="p-6">
                  <div className="h-6 bg-slate-200 rounded w-3/4 mb-3"></div>
                  <div className="h-4 bg-slate-200 rounded w-full mb-2"></div>
                  <div className="h-4 bg-slate-200 rounded w-2/3"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <article key={blog.id} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <img 
                src={blog.thumbnail} 
                alt={blog.title} 
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="flex items-center gap-4 text-sm text-slate-500 mb-3">
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
                <h3 className="text-xl font-semibold mb-3">{blog.title}</h3>
                <p className="text-gray-600 mb-4 line-clamp-2">
                  {blog.excerpt}
                </p>
                <Link to={`/blog/${blog.slug}`} className="text-blue-600 hover:text-blue-700 font-medium">
                  Lire la suite →
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link 
            to="/blog" 
            className="inline-block bg-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-blue-700 transition-colors shadow-lg hover:shadow-xl"
          >
            See our articles
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 
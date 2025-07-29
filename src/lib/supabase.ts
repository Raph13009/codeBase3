import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rvgmvtjcbbrzuoripqwa.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJ2Z212dGpjYmJyenVvcmlwcXdhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDI0ODI0NDEsImV4cCI6MjA1ODA1ODQ0MX0.XBWTN9os9Z09AkHGMItqOMVVFAk9QejzpSZsawRazOU';

export const supabase = createClient(supabaseUrl, supabaseKey);

// Test the connection
supabase.auth.getSession().then(({ data, error }) => {
  if (error) {
    console.error('Error connecting to Supabase:', error);
  } else {
    console.log('Successfully connected to Supabase');
  }
});

export interface Blog {
  id: string;
  title: string;
  slug: string;
  content: string;
  excerpt: string;
  thumbnail: string;
  category: string;
  createdAt: string;
  status: 'published' | 'unpublished';
  pinned: boolean;
  readingtime: number;
  tags: string[];
  metatitle: string | null;
  metadescription: string | null;
  seoschema: string | null;
  relatedposts: string[];
}

export async function getBlogs() {
  try {
    console.log('Fetching blogs from Supabase...');
    
    // First, check if the table exists by trying to get its structure
    const { data: tableInfo, error: tableError } = await supabase
      .from('blogs')
      .select('id')
      .limit(1);
      
    if (tableError) {
      console.error('Error checking blogs table:', tableError);
      throw new Error('Unable to access blogs table');
    }
    
    // Now fetch the actual blogs
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching blogs:', error);
      throw error;
    }

    if (!data || data.length === 0) {
      console.log('No blogs found in the database');
      return [];
    }

    console.log(`Successfully fetched ${data.length} blogs`);
    return data as Blog[];
  } catch (error) {
    console.error('Error in getBlogs:', error);
    throw error;
  }
}

export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  try {
    console.log('Fetching blog with slug:', slug);
    
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('slug', slug)
      .eq('status', 'published')
      .single();

    if (error) {
      console.error('Error fetching blog:', error);
      throw error;
    }

    if (!data) {
      console.log('No blog found with slug:', slug);
      return null;
    }

    console.log('Blog found:', data);
    return data;
  } catch (error) {
    console.error('Error in getBlogBySlug:', error);
    throw error;
  }
}

export async function getBlogsByCategory(category: string) {
  try {
    const { data, error } = await supabase
      .from('blogs')
      .select('*')
      .eq('status', 'published')
      .eq('category', category)
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Error fetching blogs by category:', error);
      throw error;
    }

    return data as Blog[];
  } catch (error) {
    console.error('Error in getBlogsByCategory:', error);
    throw error;
  }
}

export async function saveLeadToSupabase(email: string) {
  try {
    const { data, error } = await supabase.from('leads').insert([
      {
        name: '',
        email: email,
        message: '',
        source: 'stepper',
      },
    ]);

    if (error) {
      console.error('Error saving lead:', error);
      throw error;
    } else {
      console.log('Lead saved successfully:', data);
      return data;
    }
  } catch (error) {
    console.error('Error in saveLeadToSupabase:', error);
    throw error;
  }
} 
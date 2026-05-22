export interface KintoItem {
  id: string;
  [key: string]: any;
}

export interface Page extends KintoItem {
  title: string;
  slug: string;
  content?: string;
  seo?: {
    title?: string;
    description?: string;
  };
}

export interface Post extends KintoItem {
  title: string;
  slug: string;
  excerpt?: string;
  content?: string;
  date: string;
  author?: string;
  category?: string;
  tags?: string[];
}

export interface Testimonial extends KintoItem {
  author: string;
  quote: string;
  rating?: number;
  company?: string;
  image?: string;
  published?: boolean;
  date?: string;
}

export interface CollectionConfig {
  fields: string[];
  required: string[];
}

export interface KintoConfig {
  collections: Record<string, CollectionConfig>;
  site: {
    name: string;
    url: string;
  };
}

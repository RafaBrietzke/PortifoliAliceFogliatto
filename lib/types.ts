import type { Image, PortableTextBlock } from 'sanity';

export type Project = {
  _id: string;
  title: string;
  slug: string;
  category: string;
  summary: string;
  coverImage?: Image;
  gallery?: Image[];
  // imagens locais em /public, usadas enquanto o projeto não está no Sanity
  coverUrl?: string;
  galleryUrls?: string[];
  client?: string;
  year?: string;
  role?: string;
  tools?: string;
  description?: PortableTextBlock[] | string[];
  resultLabel?: string;
  resultValue?: string;
};

export type Testimonial = {
  _id: string;
  quote: string;
  name: string;
  role?: string;
  avatar?: Image;
};

export type Service = {
  _id: string;
  title: string;
  description: string;
  icon: 'target' | 'screen' | 'document' | 'star';
};

export type Highlight = {
  value: string;
  label: string;
};

export type SocialLink = {
  label: string;
  url: string;
};

export type SiteSettings = {
  name: string;
  role?: string;
  heroTitle: string;
  heroAccentWord?: string;
  heroSubtitle?: string;
  aboutLead?: string;
  highlights?: Highlight[];
  skills?: string[];
  email: string;
  socialLinks?: SocialLink[];
  footerNote?: string;
};

import { client, isSanityConfigured } from '../sanity/lib/client';
import {
  projectBySlugQuery,
  projectSlugsQuery,
  projectsQuery,
  servicesQuery,
  siteSettingsQuery,
  testimonialsQuery,
} from './queries';
import {
  mockProjects,
  mockServices,
  mockSiteSettings,
  mockTestimonials,
} from './mockData';
import type { Project, Service, SiteSettings, Testimonial } from './types';

// Cada função abaixo tenta buscar do Sanity (o CMS). Se o projeto ainda não
// foi conectado (sem variáveis de ambiente) ou não há conteúdo publicado
// ainda, ela cai automaticamente para os dados de exemplo em mockData.ts —
// assim o site nunca fica "quebrado" ou em branco.

export async function getSiteSettings(): Promise<SiteSettings> {
  if (!isSanityConfigured) return mockSiteSettings;
  try {
    const data = await client.fetch<SiteSettings | null>(siteSettingsQuery);
    return data ?? mockSiteSettings;
  } catch {
    return mockSiteSettings;
  }
}

export async function getProjects(): Promise<Project[]> {
  if (!isSanityConfigured) return mockProjects;
  try {
    const data = await client.fetch<Project[]>(projectsQuery);
    return data && data.length > 0 ? data : mockProjects;
  } catch {
    return mockProjects;
  }
}

export async function getProjectBySlug(slug: string): Promise<Project | undefined> {
  if (!isSanityConfigured) {
    return mockProjects.find((p) => p.slug === slug);
  }
  try {
    const data = await client.fetch<Project | null>(projectBySlugQuery, { slug });
    return data ?? mockProjects.find((p) => p.slug === slug);
  } catch {
    return mockProjects.find((p) => p.slug === slug);
  }
}

export async function getProjectSlugs(): Promise<string[]> {
  if (!isSanityConfigured) return mockProjects.map((p) => p.slug);
  try {
    const data = await client.fetch<{ slug: string }[]>(projectSlugsQuery);
    return data.length > 0 ? data.map((d) => d.slug) : mockProjects.map((p) => p.slug);
  } catch {
    return mockProjects.map((p) => p.slug);
  }
}

export async function getServices(): Promise<Service[]> {
  if (!isSanityConfigured) return mockServices;
  try {
    const data = await client.fetch<Service[]>(servicesQuery);
    return data && data.length > 0 ? data : mockServices;
  } catch {
    return mockServices;
  }
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSanityConfigured) return mockTestimonials;
  try {
    const data = await client.fetch<Testimonial[]>(testimonialsQuery);
    return data && data.length > 0 ? data : mockTestimonials;
  } catch {
    return mockTestimonials;
  }
}

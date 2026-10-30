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
import { ptProjects, ptServices, ptSiteSettings, ptTestimonials } from './mockData.pt';
import type { Locale } from './i18n';
import type { Project, Service, SiteSettings, Testimonial } from './types';

// Cada função abaixo tenta buscar do Sanity (o CMS). Se o projeto ainda não
// foi conectado (sem variáveis de ambiente) ou não há conteúdo publicado
// ainda, ela cai automaticamente para os dados de exemplo em mockData.ts —
// assim o site nunca fica "quebrado" ou em branco.
//
// O `lang` escolhe o idioma: em português, os dados de exemplo recebem as
// traduções de mockData.pt.ts. O conteúdo do Sanity ainda é de um idioma só
// e volta como está.

function translate<T extends { _id: string }>(items: T[], lang: Locale, pt: Record<string, Partial<T>>): T[] {
  if (lang !== 'pt') return items;
  return items.map((item) => ({ ...item, ...pt[item._id] }));
}

const localSettings = (lang: Locale): SiteSettings =>
  lang === 'pt' ? { ...mockSiteSettings, ...ptSiteSettings } : mockSiteSettings;
const localProjects = (lang: Locale) => translate(mockProjects, lang, ptProjects);
const localServices = (lang: Locale) => translate(mockServices, lang, ptServices);
const localTestimonials = (lang: Locale) => translate(mockTestimonials, lang, ptTestimonials);

export async function getSiteSettings(lang: Locale): Promise<SiteSettings> {
  if (!isSanityConfigured) return localSettings(lang);
  try {
    const data = await client.fetch<SiteSettings | null>(siteSettingsQuery);
    return data ?? localSettings(lang);
  } catch {
    return localSettings(lang);
  }
}

export async function getProjects(lang: Locale): Promise<Project[]> {
  if (!isSanityConfigured) return localProjects(lang);
  try {
    const data = await client.fetch<Project[]>(projectsQuery);
    return data && data.length > 0 ? data : localProjects(lang);
  } catch {
    return localProjects(lang);
  }
}

export async function getProjectBySlug(slug: string, lang: Locale): Promise<Project | undefined> {
  if (!isSanityConfigured) {
    return localProjects(lang).find((p) => p.slug === slug);
  }
  try {
    const data = await client.fetch<Project | null>(projectBySlugQuery, { slug });
    return data ?? localProjects(lang).find((p) => p.slug === slug);
  } catch {
    return localProjects(lang).find((p) => p.slug === slug);
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

export async function getServices(lang: Locale): Promise<Service[]> {
  if (!isSanityConfigured) return localServices(lang);
  try {
    const data = await client.fetch<Service[]>(servicesQuery);
    return data && data.length > 0 ? data : localServices(lang);
  } catch {
    return localServices(lang);
  }
}

export async function getTestimonials(lang: Locale): Promise<Testimonial[]> {
  if (!isSanityConfigured) return localTestimonials(lang);
  try {
    const data = await client.fetch<Testimonial[]>(testimonialsQuery);
    return data && data.length > 0 ? data : localTestimonials(lang);
  } catch {
    return localTestimonials(lang);
  }
}

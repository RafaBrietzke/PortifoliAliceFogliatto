import type { MetadataRoute } from 'next';
import { getProjectSlugs } from '../lib/getContent';
import { localePath, locales } from '../lib/i18n';
import { alternatesFor, siteUrl } from '../lib/site';

// Uma entrada por página e idioma, cada uma apontando para as versões nas
// outras línguas (hreflang).
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getProjectSlugs();
  const paths = ['/', ...slugs.map((slug) => `/projetos/${slug}`)];

  return paths.flatMap((path) =>
    locales.map((lang) => {
      const { languages } = alternatesFor(lang, path);
      return {
        url: siteUrl + localePath(lang, path),
        alternates: {
          languages: Object.fromEntries(Object.entries(languages).map(([k, v]) => [k, siteUrl + v])),
        },
      };
    }),
  );
}

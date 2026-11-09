import { defaultLocale, localePath, locales, type Locale } from './i18n';

// Endereço público do site, usado em URLs absolutas (Open Graph, sitemap,
// canonical). A Netlify injeta URL no build com o domínio principal do
// projeto — quando o domínio próprio for ligado, passa a valer sozinho.
export const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.URL ||
  'https://alicefogliatto.netlify.app'
).replace(/\/$/, '');

const hreflang: Record<Locale, string> = { en: 'en', pt: 'pt-BR' };

// canonical + hreflang de uma página. `path` segue a convenção de localePath
// (caminho "em inglês", ex: '/', '/projetos/disney-tour').
export function alternatesFor(lang: Locale, path: string) {
  const languages: Record<string, string> = { 'x-default': localePath(defaultLocale, path) };
  for (const l of locales) languages[hreflang[l]] = localePath(l, path);
  return { canonical: localePath(lang, path), languages };
}

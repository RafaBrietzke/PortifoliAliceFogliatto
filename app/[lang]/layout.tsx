import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale, locales, type Locale } from '../../lib/i18n';
import { siteUrl } from '../../lib/site';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getDictionary(params.lang);
  // canonical/hreflang ficam em cada página, pois dependem do caminho
  return {
    metadataBase: new URL(siteUrl),
    title: t.meta.title,
    description: t.meta.description,
    openGraph: {
      type: 'website',
      siteName: 'Alice Fogliatto',
      locale: params.lang === 'pt' ? 'pt_BR' : 'en_US',
      title: t.meta.title,
      description: t.meta.description,
    },
    twitter: { card: 'summary_large_image' },
  };
}

export default function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { lang: string };
}) {
  if (!isLocale(params.lang)) notFound();

  return (
    <html lang={params.lang === 'pt' ? 'pt-BR' : 'en'}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans:wght@500;600;700&family=IBM+Plex+Serif:ital@1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}

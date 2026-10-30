import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import '../globals.css';
import { getDictionary, isLocale, locales, type Locale } from '../../lib/i18n';

export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export function generateMetadata({ params }: { params: { lang: Locale } }): Metadata {
  const t = getDictionary(params.lang);
  return {
    title: t.meta.title,
    description: t.meta.description,
    alternates: { languages: { en: '/', 'pt-BR': '/pt' } },
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

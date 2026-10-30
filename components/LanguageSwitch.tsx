import Link from 'next/link';
import { localePath, type Locale } from '../lib/i18n';

// Bandeiras desenhadas à mão em SVG (emoji de bandeira não aparece no Windows).
function Flag({ lang }: { lang: Locale }) {
  if (lang === 'pt') {
    return (
      <svg viewBox="0 0 20 20" aria-hidden="true">
        <rect width="20" height="20" fill="#009c3b" />
        <path d="M10 3.2 18 10l-8 6.8L2 10z" fill="#ffdf00" />
        <circle cx="10" cy="10" r="3.6" fill="#002776" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      <rect width="20" height="20" fill="#fff" />
      {[0, 2, 4, 6, 8, 10, 12].map((i) => (
        <rect key={i} y={(i * 20) / 13} width="20" height={20 / 13} fill="#b22234" />
      ))}
      <rect width="10" height={(7 * 20) / 13} fill="#3c3b6e" />
    </svg>
  );
}

const labels: Record<Locale, string> = { en: 'English', pt: 'Português' };

// `path` é o caminho da página atual sem o prefixo de idioma, para o link
// levar à mesma página na outra língua.
export default function LanguageSwitch({ lang, path, label }: { lang: Locale; path: string; label: string }) {
  return (
    <nav className="lang-switch" aria-label={label}>
      {(Object.keys(labels) as Locale[]).map((option) => (
        <Link
          key={option}
          href={localePath(option, path)}
          hrefLang={option === 'pt' ? 'pt-BR' : 'en'}
          lang={option === 'pt' ? 'pt-BR' : 'en'}
          className={option === lang ? 'is-active' : undefined}
          aria-current={option === lang ? 'page' : undefined}
          title={labels[option]}
        >
          <span className="lang-flag">
            <Flag lang={option} />
          </span>
          <span className="lang-code">{option.toUpperCase()}</span>
        </Link>
      ))}
    </nav>
  );
}

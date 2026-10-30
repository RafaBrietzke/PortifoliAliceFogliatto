import Link from 'next/link';
import LanguageSwitch from './LanguageSwitch';
import { getDictionary, localePath, type Locale } from '../lib/i18n';

export default function Header({ name, lang, path }: { name: string; lang: Locale; path: string }) {
  const t = getDictionary(lang);
  const href = (p: string) => localePath(lang, p);

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href={href('/')} className="logo">
          {name}
        </Link>
        <nav className="main-nav">
          <ul>
            <li><Link href={href('/#sobre')}>{t.nav.about}</Link></li>
            <li><Link href={href('/#projetos')}>{t.nav.projects}</Link></li>
            <li><Link href={href('/#servicos')}>{t.nav.services}</Link></li>
            <li><Link href={href('/#depoimentos')}>{t.nav.testimonials}</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <LanguageSwitch lang={lang} path={path} label={t.nav.language} />
          <Link href={href('/#contato')} className="btn btn-primary">
            <span className="cta-full">{t.nav.cta}</span>
            <span className="cta-short">{t.nav.ctaShort}</span>
          </Link>
        </div>
      </div>
    </header>
  );
}

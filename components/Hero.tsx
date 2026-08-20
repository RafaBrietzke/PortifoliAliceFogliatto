import Link from 'next/link';
import type { SiteSettings } from '../lib/types';

function renderTitle(title: string, accentWord?: string) {
  if (!accentWord || !title.includes(accentWord)) {
    return <>{title}</>;
  }
  const [before, after] = title.split(accentWord);
  return (
    <>
      {before}
      <span className="accent-text">{accentWord}</span>
      {after}
    </>
  );
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="hero wrap">
      <div className="hero-inner">
        <div>
          {settings.role && <span className="eyebrow">{settings.role}</span>}
          <h1>{renderTitle(settings.heroTitle, settings.heroAccentWord)}</h1>
          {settings.heroSubtitle && <p className="hero-sub">{settings.heroSubtitle}</p>}
          <div className="hero-cta-row">
            <Link href="/#projetos" className="btn btn-accent">Ver projetos</Link>
            <Link href="/#contato" className="btn btn-outline">Fale comigo →</Link>
          </div>
        </div>
        <div className="hero-visual">
          <div className="blob blob-fill" />
          <div className="ring ring-1" />
          <div className="ring ring-2" />
          <svg className="spark" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
          </svg>
        </div>
      </div>
    </section>
  );
}

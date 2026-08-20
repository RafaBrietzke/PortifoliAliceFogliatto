import type { SiteSettings } from '../lib/types';

function renderTitle(title: string, accentWord?: string) {
  if (!accentWord || !title.includes(accentWord)) {
    return <>{title}</>;
  }
  const [before, after] = title.split(accentWord);
  return (
    <>
      <span className="hero-title-lead">{before.trimEnd()}</span>
      <br />
      <span className="accent-text">{accentWord}</span>
      {after}
    </>
  );
}

export default function Hero({ settings }: { settings: SiteSettings }) {
  return (
    <section className="hero wrap">
      <div className="hero-visual">
        <svg className="hero-shape shape-blob" viewBox="0 0 100 100" fill="currentColor">
          <circle cx="50" cy="50" r="48" />
        </svg>
        <svg className="hero-shape shape-star-indigo" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,2 L56.13,35.22 L83.94,16.06 L64.78,43.88 L98,50 L64.78,56.12 L83.94,83.94 L56.12,64.78 L50,98 L43.88,64.78 L16.06,83.94 L35.22,56.12 L2,50 L35.22,43.88 L16.06,16.06 L43.88,35.22 Z" />
        </svg>
        <svg className="hero-shape shape-star-lime" viewBox="0 0 100 100" fill="currentColor">
          <path d="M50,2 L56.13,35.22 L83.94,16.06 L64.78,43.88 L98,50 L64.78,56.12 L83.94,83.94 L56.12,64.78 L50,98 L43.88,64.78 L16.06,83.94 L35.22,56.12 L2,50 L35.22,43.88 L16.06,16.06 L43.88,35.22 Z" />
        </svg>
        <svg className="hero-shape shape-sparkle-a" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
        </svg>
        <svg className="hero-shape shape-sparkle-b" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round">
          <path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z" />
        </svg>
        <svg className="hero-shape shape-squiggle" viewBox="0 0 140 60" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round">
          <path d="M4 40C22 8 40 8 58 30S94 52 112 22 130 6 136 14" />
        </svg>
        <svg className="hero-shape shape-spiral" viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="2.4">
          <ellipse cx="50" cy="14" rx="46" ry="12" />
          <ellipse cx="50" cy="34" rx="46" ry="12" />
          <ellipse cx="50" cy="54" rx="46" ry="12" />
        </svg>
        <div className="hero-shape shape-dot shape-dot-1" />
        <div className="hero-shape shape-dot shape-dot-2" />
        <div className="hero-shape shape-dot shape-dot-3" />
        <div className="hero-shape shape-dot shape-dot-4" />
      </div>
      <div className="hero-inner">
        <h1>{renderTitle(settings.heroTitle, settings.heroAccentWord)}</h1>
        {settings.heroSubtitle && <p className="hero-sub">{settings.heroSubtitle}</p>}
      </div>
    </section>
  );
}

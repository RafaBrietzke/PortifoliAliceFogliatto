import { Fragment } from 'react';
import Reveal from './Reveal';
import CategoryShape from './CategoryShape';
import Sparkle from './Sparkle';
import { localizeCategories } from '../lib/categories';
import { getDictionary, type Locale } from '../lib/i18n';
import type { SiteSettings } from '../lib/types';

export default function About({ settings, lang }: { settings: SiteSettings; lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <section className="about" id="sobre">
      <div className="wrap">
        {settings.aboutLead && (
          <Reveal>
            <p className="about-lead">{settings.aboutLead}</p>
          </Reveal>
        )}

        <div className="pill-row">
          {settings.highlights && settings.highlights.length > 0 && (
            <Reveal className="pill-card">
              <div className="stat-row">
                {settings.highlights.map((h, i) => (
                  <Fragment key={i}>
                    {i > 0 && <Sparkle className="stat-star" />}
                    <div className="stat">
                      <div className="stat-num">{h.value}</div>
                      <div className="stat-label">{h.label}</div>
                    </div>
                  </Fragment>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="whatido-row">
          <h2 className="whatido-label">
            <span className="hero-title-lead">{t.about.lead}</span> <span className="accent-text">{t.about.accent}</span>
          </h2>
          <div className="whatido-cards">
            {localizeCategories(lang).map((group, i) => (
              <div className="whatido-card" key={group.id}>
                <span className="whatido-num">{String(i + 1).padStart(2, '0')}</span>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
                <CategoryShape shape={group.shape} className="whatido-shape" />
              </div>
            ))}
          </div>
        </Reveal>
      </div>
      <svg className="about-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z" />
      </svg>
    </section>
  );
}

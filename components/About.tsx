import Reveal from './Reveal';
import type { SiteSettings } from '../lib/types';

export default function About({ settings }: { settings: SiteSettings }) {
  return (
    <section className="about wrap" id="sobre">
      {settings.aboutLead && (
        <Reveal>
          <p className="about-lead">{settings.aboutLead}</p>
        </Reveal>
      )}

      <div className="pill-row">
        {settings.highlights && settings.highlights.length > 0 && (
          <Reveal className="pill-card">
            <span className="pill-label">Destaques</span>
            <div className="stat-row">
              {settings.highlights.map((h, i) => (
                <div key={i}>
                  <div className="stat-num">{h.value}</div>
                  <div className="stat-label">{h.label}</div>
                </div>
              ))}
            </div>
          </Reveal>
        )}

        {settings.skills && settings.skills.length > 0 && (
          <Reveal className="pill-card">
            <span className="pill-label">O que eu faço</span>
            <div className="tag-cloud">
              {settings.skills.map((s) => (
                <span className="tag" key={s}>{s}</span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

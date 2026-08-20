import Reveal from './Reveal';
import type { SiteSettings } from '../lib/types';

const whatIDo = [
  {
    title: 'TOYS',
    items: ['Playsets & Dolls', 'Role Play & Preschool', 'Plush & Collectibles'],
  },
  {
    title: 'Lifestyle & Accessories',
    items: ['Bags & Backpacks', 'Fashion & Footwear', 'Home & Lifestyle'],
  },
];

export default function About({ settings }: { settings: SiteSettings }) {
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
                  <div key={i}>
                    <div className="stat-num">{h.value}</div>
                    <div className="stat-label">{h.label}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="whatido-row">
          <span className="whatido-label">What I do</span>
          <div className="whatido-cards">
            {whatIDo.map((group) => (
              <div className="whatido-card" key={group.title}>
                <h3>{group.title}</h3>
                <ul>
                  {group.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
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

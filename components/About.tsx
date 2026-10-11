import { Fragment } from 'react';
import Reveal from './Reveal';
import type { SiteSettings } from '../lib/types';

const whatIDo = [
  {
    title: 'TOYS',
    items: ['Playsets & Dolls', 'Role Play & Preschool', 'Plush & Collectibles'],
    shape: 'burst',
  },
  {
    title: 'ACCESSORIES & WEARABLES',
    items: ['Bags & Backpacks', 'Kids Accessories', 'Keychains & Small Accessories'],
    shape: 'flower',
  },
  {
    title: 'HOME & LIFESTYLE',
    items: ['Home Décor', 'Homeware & Everyday Objects', 'Lifestyle Products'],
    shape: 'spiral',
  }
];

function Sparkle({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 0C12.9 7.5 16.5 11.1 24 12C16.5 12.9 12.9 16.5 12 24C11.1 16.5 7.5 12.9 0 12C7.5 11.1 11.1 7.5 12 0Z" />
    </svg>
  );
}

function CardShape({ shape }: { shape: string }) {
  switch (shape) {
    case 'flower':
      return (
        <svg className="whatido-shape" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <circle cx="50" cy="26" r="20" />
          <circle cx="72.8" cy="42.6" r="20" />
          <circle cx="64.1" cy="69.4" r="20" />
          <circle cx="35.9" cy="69.4" r="20" />
          <circle cx="27.2" cy="42.6" r="20" />
          <circle cx="50" cy="50" r="20" />
        </svg>
      );
    case 'spiral':
      return (
        <svg className="whatido-shape" viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="5" aria-hidden="true">
          <ellipse cx="50" cy="14" rx="44" ry="11" />
          <ellipse cx="50" cy="35" rx="44" ry="11" />
          <ellipse cx="50" cy="56" rx="44" ry="11" />
        </svg>
      );
    case 'burst':
    default:
      return (
        <svg className="whatido-shape" viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <path d="M50,2 L56.13,35.22 L83.94,16.06 L64.78,43.88 L98,50 L64.78,56.12 L83.94,83.94 L56.12,64.78 L50,98 L43.88,64.78 L16.06,83.94 L35.22,56.12 L2,50 L35.22,43.88 L16.06,16.06 L43.88,35.22 Z" />
        </svg>
      );
  }
}

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
                <CardShape shape={group.shape} />
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

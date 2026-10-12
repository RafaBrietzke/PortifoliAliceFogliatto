import Reveal from './Reveal';
import CategoryShape from './CategoryShape';
import Sparkle from './Sparkle';
import type { SiteSettings } from '../lib/types';

export default function CtaFooter({ settings }: { settings: SiteSettings }) {
  return (
    <section className="cta" id="contato">
      <div className="cta-visual" aria-hidden="true">
        <CategoryShape shape="burst" className="hero-shape cta-burst" />
        <CategoryShape shape="flower" className="hero-shape cta-flower" />
        <CategoryShape shape="spiral" className="hero-shape cta-spiral" />
        <Sparkle className="hero-shape cta-sparkle-a" />
        <Sparkle className="hero-shape cta-sparkle-b" />
      </div>
      <Reveal className="cta-inner wrap">
        <h2>
          <span className="hero-title-lead">Let&apos;s create</span>
          <br />
          <span className="accent-text">something together</span>
        </h2>
        <p className="cta-sub">Open to new projects, partnerships and creative collaborations.</p>
        <a href={`mailto:${settings.email}`} className="cta-email">
          <span>{settings.email}</span>
          <span className="cta-email-arrow">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </span>
        </a>
        {settings.socialLinks && settings.socialLinks.length > 0 && (
          <ul className="cta-social">
            {settings.socialLinks.map((link) => (
              <li key={link.label}>
                <a href={link.url} target="_blank" rel="noreferrer">{link.label}</a>
              </li>
            ))}
          </ul>
        )}
      </Reveal>
    </section>
  );
}

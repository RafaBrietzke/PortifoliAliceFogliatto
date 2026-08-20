import Reveal from './Reveal';
import type { SiteSettings } from '../lib/types';

export default function CtaFooter({ settings }: { settings: SiteSettings }) {
  return (
    <section className="section" id="contato" style={{ paddingTop: 20 }}>
      <Reveal className="cta-footer wrap" style={{ maxWidth: 'none' }}>
        <div className="cta-inner">
          <div>
            <span className="eyebrow" style={{ color: '#FFB6C4' }}>Vamos conversar</span>
            <h2>Vamos criar algo juntos?</h2>
            <p className="hero-sub">Aberta(o) a novos projetos, parcerias e colaborações criativas.</p>
            <a href={`mailto:${settings.email}`} className="cta-email">{settings.email} ↗</a>
          </div>
          {settings.socialLinks && settings.socialLinks.length > 0 && (
            <div className="cta-cols">
              <div>
                <h4>Redes sociais</h4>
                <ul>
                  {settings.socialLinks.map((link) => (
                    <li key={link.label}><a href={link.url} target="_blank" rel="noreferrer">{link.label}</a></li>
                  ))}
                </ul>
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}

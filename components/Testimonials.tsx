import Image from 'next/image';
import Reveal from './Reveal';
import CategoryShape from './CategoryShape';
import Sparkle from './Sparkle';
import { urlForImage } from '../sanity/lib/image';
import type { Testimonial } from '../lib/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="testimonials" id="depoimentos">
      <div className="testi-visual" aria-hidden="true">
        <CategoryShape shape="burst" className="hero-shape testi-burst" />
        <CategoryShape shape="spiral" className="hero-shape testi-spiral" />
        <Sparkle className="hero-shape testi-sparkle" />
      </div>
      <div className="wrap">
        <Reveal className="testi-head">
          <h2>
            <span className="hero-title-lead">Kind</span> <span className="accent-text">words</span>
          </h2>
          <p>What partners and clients say about working together.</p>
        </Reveal>
        <Reveal className="testi-grid">
          {testimonials.map((t) => {
            const avatarUrl = urlForImage(t.avatar)?.width(96).height(96).url();
            return (
              <figure className="testi-card" key={t._id}>
                <span className="testi-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="testi-quote">{t.quote}</blockquote>
                <figcaption className="testi-person">
                  <div className="avatar">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
                    ) : (
                      t.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <strong>{t.name}</strong>
                    {t.role && <span>{t.role}</span>}
                  </div>
                </figcaption>
              </figure>
            );
          })}
        </Reveal>
      </div>
    </section>
  );
}

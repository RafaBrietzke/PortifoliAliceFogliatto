import Image from 'next/image';
import Reveal from './Reveal';
import CategoryShape from './CategoryShape';
import Sparkle from './Sparkle';
import { urlForImage } from '../sanity/lib/image';
import { getDictionary, type Locale } from '../lib/i18n';
import type { Testimonial } from '../lib/types';

export default function Testimonials({ testimonials, lang }: { testimonials: Testimonial[]; lang: Locale }) {
  const t = getDictionary(lang);

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
            <span className="hero-title-lead">{t.testimonials.lead}</span> <span className="accent-text">{t.testimonials.accent}</span>
          </h2>
          <p>{t.testimonials.intro}</p>
        </Reveal>
        <Reveal className="testi-grid">
          {testimonials.map((item) => {
            const avatarUrl = urlForImage(item.avatar)?.width(96).height(96).url();
            return (
              <figure className="testi-card" key={item._id}>
                <span className="testi-mark" aria-hidden="true">&ldquo;</span>
                <blockquote className="testi-quote">{item.quote}</blockquote>
                <figcaption className="testi-person">
                  <div className="avatar">
                    {avatarUrl ? (
                      <Image src={avatarUrl} alt="" fill sizes="48px" style={{ objectFit: 'cover' }} />
                    ) : (
                      item.name.charAt(0)
                    )}
                  </div>
                  <div>
                    <strong>{item.name}</strong>
                    {item.role && <span>{item.role}</span>}
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

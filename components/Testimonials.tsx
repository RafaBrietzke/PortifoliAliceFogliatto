import Image from 'next/image';
import Reveal from './Reveal';
import { urlForImage } from '../sanity/lib/image';
import { gradients } from '../lib/mockData';
import type { Testimonial } from '../lib/types';

export default function Testimonials({ testimonials }: { testimonials: Testimonial[] }) {
  return (
    <section className="section wrap" id="depoimentos" style={{ paddingTop: 0 }}>
      <Reveal className="section-head">
        <div>
          <span className="eyebrow">Depoimentos</span>
          <h2>O que dizem sobre o trabalho</h2>
        </div>
      </Reveal>
      <div className="testi-grid">
        {testimonials.map((t, i) => {
          const avatarUrl = urlForImage(t.avatar)?.width(80).height(80).url();
          return (
            <Reveal className="testi-card" key={t._id}>
              <p className="testi-quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testi-person">
                <div className="avatar" style={{ background: gradients[i % gradients.length] }}>
                  {avatarUrl && <Image src={avatarUrl} alt={t.name} fill style={{ objectFit: 'cover' }} />}
                </div>
                <div>
                  <strong>{t.name}</strong>
                  {t.role && <span>{t.role}</span>}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}

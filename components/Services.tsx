import Reveal from './Reveal';
import CategoryShape from './CategoryShape';
import type { CategoryShapeName } from '../lib/categories';
import { getDictionary, type Locale } from '../lib/i18n';
import type { Service } from '../lib/types';

const shapes: CategoryShapeName[] = ['burst', 'flower', 'spiral'];

export default function Services({ services, lang }: { services: Service[]; lang: Locale }) {
  const t = getDictionary(lang);

  return (
    <section className="services" id="servicos">
      <div className="services-inner wrap">
        <Reveal className="services-head">
          <h2>
            <span className="hero-title-lead">{t.services.lead}</span> <span className="accent-text">{t.services.accent}</span>
          </h2>
          <p>{t.services.intro}</p>
          <CategoryShape shape="flower" className="services-shape" />
        </Reveal>
        <ol className="services-list">
          {services.map((service, i) => (
            <li key={service._id}>
              <Reveal className="service-row">
                <span className="service-num">{String(i + 1).padStart(2, '0')}</span>
                <div className="service-text">
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <span className="service-badge">
                  <CategoryShape shape={shapes[i % shapes.length]} />
                </span>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}

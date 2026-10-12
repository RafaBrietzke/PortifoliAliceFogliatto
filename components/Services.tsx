import Reveal from './Reveal';
import CategoryShape from './CategoryShape';
import type { CategoryShapeName } from '../lib/categories';
import type { Service } from '../lib/types';

const shapes: CategoryShapeName[] = ['burst', 'flower', 'spiral'];

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="services" id="servicos">
      <div className="services-inner wrap">
        <Reveal className="services-head">
          <h2>
            <span className="hero-title-lead">How I</span> <span className="accent-text">can help</span>
          </h2>
          <p>Tailored services for brands and products that want to communicate with clarity and personality.</p>
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

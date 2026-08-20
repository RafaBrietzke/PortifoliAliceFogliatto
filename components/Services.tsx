import Reveal from './Reveal';
import { ServiceIcon, iconBackground } from './icons';
import type { Service } from '../lib/types';

export default function Services({ services }: { services: Service[] }) {
  return (
    <section className="section wrap" id="servicos" style={{ paddingTop: 0 }}>
      <Reveal className="section-head">
        <div>
          <span className="eyebrow">Especialidades</span>
          <h2>Como posso ajudar</h2>
        </div>
        <p>Serviços sob medida para marcas e produtos que querem se comunicar com clareza e personalidade.</p>
      </Reveal>
      <div className="services-grid">
        {services.map((service) => (
          <Reveal className="service-card" key={service._id}>
            <div className="service-icon" style={{ background: iconBackground(service.icon) }}>
              <ServiceIcon icon={service.icon} />
            </div>
            <h3>{service.title}</h3>
            <p>{service.description}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

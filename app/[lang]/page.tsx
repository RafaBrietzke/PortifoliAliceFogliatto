import Header from '../../components/Header';
import Hero from '../../components/Hero';
import About from '../../components/About';
import ProjectsGrid from '../../components/ProjectsGrid';
import Marquee from '../../components/Marquee';
import Services from '../../components/Services';
import Testimonials from '../../components/Testimonials';
import CtaFooter from '../../components/CtaFooter';
import Footer from '../../components/Footer';
import { getProjects, getServices, getSiteSettings, getTestimonials } from '../../lib/getContent';
import type { Locale } from '../../lib/i18n';

export const revalidate = 60;

export default async function HomePage({ params: { lang } }: { params: { lang: Locale } }) {
  const [settings, projects, services, testimonials] = await Promise.all([
    getSiteSettings(lang),
    getProjects(lang),
    getServices(lang),
    getTestimonials(lang),
  ]);

  return (
    <>
      <Header name={settings.name} lang={lang} path="/" />
      <main>
        <Hero settings={settings} />
        <About settings={settings} lang={lang} />
        <ProjectsGrid projects={projects} lang={lang} />
        <Marquee lang={lang} />
        <Services services={services} lang={lang} />
        <Testimonials testimonials={testimonials} lang={lang} />
        <CtaFooter settings={settings} lang={lang} />
      </main>
      <Footer name={settings.name} note={settings.footerNote} lang={lang} />
    </>
  );
}

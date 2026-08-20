import Header from '../components/Header';
import Hero from '../components/Hero';
import About from '../components/About';
import ProjectsGrid from '../components/ProjectsGrid';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CtaFooter from '../components/CtaFooter';
import Footer from '../components/Footer';
import { getProjects, getServices, getSiteSettings, getTestimonials } from '../lib/getContent';

export const revalidate = 60;

export default async function HomePage() {
  const [settings, projects, services, testimonials] = await Promise.all([
    getSiteSettings(),
    getProjects(),
    getServices(),
    getTestimonials(),
  ]);

  return (
    <>
      <Header name={settings.name} />
      <main>
        <Hero settings={settings} />
        <About settings={settings} />
        <ProjectsGrid projects={projects} />
        <Services services={services} />
        <Testimonials testimonials={testimonials} />
        <CtaFooter settings={settings} />
      </main>
      <Footer note={settings.footerNote} />
    </>
  );
}

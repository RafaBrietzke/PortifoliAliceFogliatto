import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import CtaFooter from '../../../components/CtaFooter';
import Reveal from '../../../components/Reveal';
import CategoryShape from '../../../components/CategoryShape';
import Sparkle from '../../../components/Sparkle';
import ProjectThumb from '../../../components/ProjectThumb';
import ProjectGallery from '../../../components/ProjectGallery';
import ProjectDescription from '../../../components/ProjectDescription';
import { urlForImage } from '../../../sanity/lib/image';
import { categories } from '../../../lib/categories';
import {
  getProjectBySlug,
  getProjects,
  getProjectSlugs,
  getSiteSettings,
} from '../../../lib/getContent';

export const revalidate = 60;

export async function generateStaticParams() {
  const slugs = await getProjectSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ProjectPage({ params }: { params: { slug: string } }) {
  const [project, allProjects, settings] = await Promise.all([
    getProjectBySlug(params.slug),
    getProjects(),
    getSiteSettings(),
  ]);

  if (!project) notFound();

  const category = categories.find((c) => c.id === project.category);
  const shape = category?.shape ?? 'burst';
  const coverUrl = urlForImage(project.coverImage)?.width(1200).height(940).url() ?? project.coverUrl;
  // na galeria só limitamos a largura, para a foto manter a proporção original
  const galleryImages = (project.gallery || [])
    .map((img) => urlForImage(img)?.width(1600).url())
    .filter(Boolean) as string[];
  if (galleryImages.length === 0 && project.galleryUrls) galleryImages.push(...project.galleryUrls);

  // próximo projeto: o seguinte da mesma categoria (voltando ao primeiro no fim);
  // se for o único da categoria, o seguinte da lista toda
  const sameCategory = allProjects.filter((p) => p.category === project.category);
  const pool = sameCategory.length > 1 ? sameCategory : allProjects;
  const next = pool.length > 1 ? pool[(pool.findIndex((p) => p.slug === project.slug) + 1) % pool.length] : undefined;

  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Company', value: project.company },
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
    { label: 'Tools', value: project.tools },
  ].filter((item) => item.value);

  return (
    <>
      <Header name={settings.name} />
      <main className={`project-page cat-${project.category}`}>
        <section className="pd-top">
          <div className="wrap">
            <Link href="/#projetos" className="back-link">
              <span className="back-link-arrow">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5M11 6l-6 6 6 6" />
                </svg>
              </span>
              Back to projects
            </Link>

            <div className="pd-intro">
              <div>
                <div className="pd-cat">
                  <span className="row-badge">
                    <CategoryShape shape={shape} />
                  </span>
                  {category?.title ?? project.category}
                </div>
                <h1>{project.title}</h1>
                <p className="pd-summary">{project.summary}</p>
                {meta.length > 0 && (
                  <dl className="pd-meta">
                    {meta.map((item) => (
                      <div key={item.label}>
                        <dt>{item.label}</dt>
                        <dd>{item.value}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </div>
              <div className="pd-cover-wrap">
                <CategoryShape shape="burst" className="hero-shape pd-cover-burst" />
                <div className="pd-cover">
                  <div className="pd-cover-img">
                    {coverUrl ? (
                      <Image src={coverUrl} alt={project.title} fill priority sizes="(max-width: 900px) 100vw, 560px" style={{ objectFit: 'cover' }} />
                    ) : (
                      <CategoryShape shape={shape} className="pd-cover-shape" />
                    )}
                  </div>
                </div>
                <Sparkle className="hero-shape pd-cover-sparkle" />
              </div>
            </div>
          </div>
        </section>

        {project.description && project.description.length > 0 && (
          <section className="pd-story">
            <div className="pd-story-inner wrap">
              <Reveal>
                <h2>
                  <span className="hero-title-lead">About the</span> <span className="accent-text">project</span>
                </h2>
              </Reveal>
              <Reveal className="pd-story-text">
                <ProjectDescription description={project.description} />
                {project.resultValue && (
                  <div className="pd-result">
                    <div className="stat-num">{project.resultValue}</div>
                    <div className="stat-label">{project.resultLabel}</div>
                  </div>
                )}
              </Reveal>
            </div>
            <svg className="about-wave" viewBox="0 0 1440 100" preserveAspectRatio="none" aria-hidden="true">
              <path d="M0,40 C240,90 480,0 720,30 C960,60 1200,10 1440,50 L1440,100 L0,100 Z" />
            </svg>
          </section>
        )}

        {galleryImages.length > 0 && (
          <section className="pd-shots">
            <div className="wrap">
              <Reveal className="pd-shots-head">
                <h2>
                  <span className="hero-title-lead">A closer</span> <span className="accent-text">look</span>
                </h2>
                <p>Click any image to see it full size.</p>
              </Reveal>
              <ProjectGallery images={galleryImages} title={project.title} />
            </div>
          </section>
        )}

        <section className="pd-next">
          <div className="wrap">
            <Reveal>
              <Link href={next ? `/projetos/${next.slug}` : '/#projetos'} className="pd-next-link">
                {next && (
                  <div className="pd-next-frame">
                    <ProjectThumb project={next} index={allProjects.indexOf(next)} className="pd-next-thumb" sizes="380px" />
                  </div>
                )}
                <div>
                  <span className="pd-next-label">
                    <Sparkle />
                    {next ? 'Next project' : 'Keep exploring'}
                  </span>
                  <h2>{next ? next.title : 'All projects'}</h2>
                  {next && <p>{next.summary}</p>}
                </div>
                <span className="pd-next-arrow">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14M13 6l6 6-6 6" />
                  </svg>
                </span>
              </Link>
            </Reveal>
          </div>
        </section>

        <CtaFooter settings={settings} />
      </main>
      <Footer note={settings.footerNote} />
    </>
  );
}

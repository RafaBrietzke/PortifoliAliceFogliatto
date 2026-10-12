import { notFound } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../../../components/Header';
import Footer from '../../../components/Footer';
import ProjectDescription from '../../../components/ProjectDescription';
import { urlForImage } from '../../../sanity/lib/image';
import { gradients } from '../../../lib/mockData';
import { categoryTitle } from '../../../lib/categories';
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

  const index = Math.max(0, allProjects.findIndex((p) => p.slug === project.slug));
  const gradient = gradients[index % gradients.length];
  const heroImageUrl = urlForImage(project.coverImage)?.width(1400).height(700).url() ?? project.coverUrl;
  const galleryImages = (project.gallery || [])
    .map((img) => urlForImage(img)?.width(700).height(500).url())
    .filter(Boolean) as string[];
  if (galleryImages.length === 0 && project.galleryUrls) galleryImages.push(...project.galleryUrls);

  return (
    <>
      <Header name={settings.name} />
      <main>
        <div className="project-detail wrap">
          <Link href="/#projetos" className="back-link">← Voltar para projetos</Link>

          <div className="pd-hero" style={{ background: gradient }}>
            {heroImageUrl && (
              <Image src={heroImageUrl} alt={project.title} fill sizes="100vw" style={{ objectFit: 'cover' }} />
            )}
          </div>

          <div className="pd-head">
            <div>
              <span className="eyebrow">{categoryTitle(project.category)}</span>
              <h2>{project.title}</h2>
            </div>
            <div className="pd-meta">
              {project.client && (
                <div><span>Cliente</span><strong>{project.client}</strong></div>
              )}
              {project.year && (
                <div><span>Ano</span><strong>{project.year}</strong></div>
              )}
              {project.role && (
                <div><span>Papel</span><strong>{project.role}</strong></div>
              )}
              {project.tools && (
                <div><span>Ferramentas</span><strong>{project.tools}</strong></div>
              )}
            </div>
          </div>

          <div className="pd-body">
            <div>
              <ProjectDescription description={project.description} />
            </div>
            <div>
              <div className="pd-gallery">
                {galleryImages.length > 0 ? (
                  galleryImages.map((url, i) => (
                    <div className="g-block" key={i}>
                      <Image src={url} alt={`${project.title} — imagem ${i + 1}`} fill sizes="400px" style={{ objectFit: 'cover' }} />
                    </div>
                  ))
                ) : (
                  <>
                    <div className="g-block" style={{ background: gradients[(index + 1) % gradients.length] }} />
                    <div className="g-block" style={{ background: gradients[(index + 2) % gradients.length] }} />
                  </>
                )}
              </div>
              {project.resultValue && (
                <div className="pd-result">
                  <div className="stat-num">{project.resultValue}</div>
                  <div className="stat-label">{project.resultLabel}</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer note={settings.footerNote} />
    </>
  );
}

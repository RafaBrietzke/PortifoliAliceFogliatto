import Link from 'next/link';
import Reveal from './Reveal';
import ProjectThumb from './ProjectThumb';
import ProjectCarousel from './ProjectCarousel';
import CategoryShape from './CategoryShape';
import { categories } from '../lib/categories';
import type { Project } from '../lib/types';

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  const rows = categories
    .map((category) => ({
      category,
      // guarda o índice original para o gradiente bater com o da página do projeto
      items: projects.map((project, index) => ({ project, index })).filter(({ project }) => project.category === category.id),
    }))
    .filter((row) => row.items.length > 0);

  return (
    <section className="projects" id="projetos">
      <Reveal className="projects-head wrap">
        <h2>
          <span className="hero-title-lead">Projects</span> <span className="accent-text">I designed</span>
        </h2>
        <p>Browse by category and slide sideways to see more projects from the same world.</p>
      </Reveal>

      {rows.map(({ category, items }) => (
        <Reveal className={`project-row cat-${category.id}`} key={category.id}>
          <ProjectCarousel
            label={category.title}
            heading={
              <div className="row-title">
                <span className="row-badge">
                  <CategoryShape shape={category.shape} />
                </span>
                <h3>{category.title}</h3>
                <span className="row-count">{String(items.length).padStart(2, '0')}</span>
              </div>
            }
          >
            {items.map(({ project, index }) => (
              <Link href={`/projetos/${project.slug}`} className="pcard" key={project._id}>
                <div className="pcard-body">
                  <div className="pcard-top">
                    {project.year && <span className="pcard-pill">{project.year}</span>}
                    {project.client && <span className="pcard-pill">{project.client}</span>}
                    <CategoryShape shape={category.shape} className="pcard-shape" />
                  </div>
                  <h4>{project.title}</h4>
                  <p>{project.summary}</p>
                </div>
                <ProjectThumb project={project} index={index} className="pcard-thumb" sizes="(max-width: 760px) 80vw, 340px">
                  {!project.coverImage && !project.coverUrl && <CategoryShape shape={category.shape} className="pcard-thumb-shape" />}
                  <span className="pcard-cta">
                    <span className="pcard-cta-label">View project</span>
                    <span className="pcard-cta-arrow">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <path d="M5 12h14M13 6l6 6-6 6" />
                      </svg>
                    </span>
                  </span>
                </ProjectThumb>
              </Link>
            ))}
          </ProjectCarousel>
        </Reveal>
      ))}
    </section>
  );
}

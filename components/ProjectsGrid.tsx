import Link from 'next/link';
import Reveal from './Reveal';
import ProjectThumb from './ProjectThumb';
import type { Project } from '../lib/types';

export default function ProjectsGrid({ projects }: { projects: Project[] }) {
  return (
    <section className="section wrap" id="projetos">
      <Reveal className="section-head">
        <div>
          <span className="eyebrow">Portfólio</span>
          <h2>Projetos recentes</h2>
        </div>
        <p>
          Uma seleção de trabalhos recentes envolvendo branding, produto digital e direção de
          arte. Clique em um projeto para ver o estudo de caso completo.
        </p>
      </Reveal>

      <div className="work-grid">
        {projects.map((project, i) => (
          <Reveal key={project._id}>
            <Link href={`/projetos/${project.slug}`} className="project-card">
              <ProjectThumb project={project} index={i} className="thumb" sizes="(max-width: 800px) 100vw, 560px">
                <span className="thumb-tag">{project.category}</span>
              </ProjectThumb>
              <div className="project-body">
                <h3>{project.title}</h3>
                <p>{project.summary}</p>
                <span className="project-link">Ver estudo de caso →</span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

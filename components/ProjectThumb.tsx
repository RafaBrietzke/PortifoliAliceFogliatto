import Image from 'next/image';
import type { ReactNode } from 'react';
import { urlForImage } from '../sanity/lib/image';
import { gradients } from '../lib/mockData';
import type { Project } from '../lib/types';

export default function ProjectThumb({
  project,
  index,
  className,
  sizes,
  children,
}: {
  project: Project;
  index: number;
  className: string;
  sizes?: string;
  children?: ReactNode;
}) {
  const imageUrl = urlForImage(project.coverImage)?.width(900).height(700).url();
  const gradient = gradients[index % gradients.length];

  return (
    <div className={className} style={{ background: gradient }}>
      {imageUrl && (
        <Image src={imageUrl} alt={project.title} fill sizes={sizes || '400px'} style={{ objectFit: 'cover' }} />
      )}
      {children}
    </div>
  );
}

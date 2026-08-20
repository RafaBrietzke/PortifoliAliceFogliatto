import { PortableText, type PortableTextComponents } from '@portabletext/react';

const components: PortableTextComponents = {
  block: {
    normal: ({ children }) => <p>{children}</p>,
  },
};

export default function ProjectDescription({ description }: { description: unknown }) {
  if (!description) return null;

  // Conteúdo vindo do Sanity (Portable Text — array de blocos)
  if (Array.isArray(description) && description.length > 0 && typeof description[0] === 'object') {
    return <PortableText value={description as any} components={components} />;
  }

  // Conteúdo de exemplo (array de strings simples)
  if (Array.isArray(description)) {
    return (
      <>
        {(description as string[]).map((paragraph, i) => (
          <p key={i}>{paragraph}</p>
        ))}
      </>
    );
  }

  return null;
}

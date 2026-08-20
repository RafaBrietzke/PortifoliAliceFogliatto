import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'siteSettings',
  title: 'Configurações do site',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome (aparece no cabeçalho e rodapé)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / especialidade (eyebrow do hero)',
      type: 'string',
    }),
    defineField({
      name: 'heroTitle',
      title: 'Título do hero',
      type: 'string',
      description: 'Ex: "Design que conta histórias."',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroAccentWord',
      title: 'Palavra em destaque no título',
      type: 'string',
      description: 'Precisa ser uma palavra/trecho que apareça dentro do título acima, para ganhar a cor de destaque.',
    }),
    defineField({
      name: 'heroSubtitle',
      title: 'Subtítulo do hero',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'aboutLead',
      title: 'Texto de abertura da seção Sobre',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'highlights',
      title: 'Destaques (estatísticas)',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'value', title: 'Número', type: 'string' },
            { name: 'label', title: 'Descrição', type: 'string' },
          ],
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
    defineField({
      name: 'skills',
      title: '"O que eu faço" (tags)',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'email',
      title: 'E-mail de contato',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Redes sociais',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'label', title: 'Nome da rede', type: 'string' },
            { name: 'url', title: 'Link', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'footerNote',
      title: 'Texto do rodapé',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'name' },
  },
});

import { defineField, defineType } from 'sanity';
import { categories } from '../../lib/categories';

export default defineType({
  name: 'project',
  title: 'Projeto',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do projeto',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug (parte da URL)',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Categoria',
      type: 'string',
      description: 'Define em qual fileira da seção de projetos o card aparece.',
      options: {
        list: categories.map((c) => ({ title: c.title, value: c.id })),
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Resumo curto',
      type: 'text',
      rows: 2,
      description: 'Aparece no card da seção de projetos.',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'coverImage',
      title: 'Imagem de capa',
      type: 'image',
      options: { hotspot: true },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria (imagens do case)',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'client',
      title: 'Cliente',
      type: 'string',
    }),
    defineField({
      name: 'year',
      title: 'Ano',
      type: 'string',
    }),
    defineField({
      name: 'role',
      title: 'Papel / função no projeto',
      type: 'string',
    }),
    defineField({
      name: 'tools',
      title: 'Ferramentas usadas',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição do case',
      type: 'array',
      of: [{ type: 'block' }],
      description: 'Texto completo do estudo de caso, com parágrafos.',
    }),
    defineField({
      name: 'resultLabel',
      title: 'Rótulo do resultado (opcional)',
      type: 'string',
      description: 'Ex: "Aumento em retenção", "Peças produzidas"…',
    }),
    defineField({
      name: 'resultValue',
      title: 'Valor do resultado (opcional)',
      type: 'string',
      description: 'Ex: "+22%", "24"…',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
      description: 'Números menores aparecem primeiro na grade.',
    }),
    defineField({
      name: 'featured',
      title: 'Destacar na home',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'category', media: 'coverImage' },
  },
  orderings: [
    {
      title: 'Ordem de exibição',
      name: 'orderAsc',
      by: [{ field: 'order', direction: 'asc' }],
    },
  ],
});

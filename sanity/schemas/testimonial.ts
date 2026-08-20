import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'testimonial',
  title: 'Depoimento',
  type: 'document',
  fields: [
    defineField({
      name: 'quote',
      title: 'Depoimento (texto)',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'name',
      title: 'Nome da pessoa',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Cargo / empresa',
      type: 'string',
    }),
    defineField({
      name: 'avatar',
      title: 'Foto (opcional)',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'name', subtitle: 'role' },
  },
});

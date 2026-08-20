import { defineField, defineType } from 'sanity';

export default defineType({
  name: 'service',
  title: 'Serviço',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título do serviço',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Descrição curta',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(140),
    }),
    defineField({
      name: 'icon',
      title: 'Ícone',
      type: 'string',
      description: 'Escolha um estilo de ícone para o card.',
      options: {
        list: [
          { title: 'Alvo', value: 'target' },
          { title: 'Tela / UI', value: 'screen' },
          { title: 'Documento', value: 'document' },
          { title: 'Estrela', value: 'star' },
        ],
      },
      initialValue: 'target',
    }),
    defineField({
      name: 'order',
      title: 'Ordem de exibição',
      type: 'number',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'description' },
  },
});

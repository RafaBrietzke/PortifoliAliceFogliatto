'use client';

import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { apiVersion, dataset, projectId } from './sanity/env';
import { schemaTypes } from './sanity/schemas';

export default defineConfig({
  basePath: '/studio',
  name: 'portfolio-studio',
  title: 'Portfólio — Editor de conteúdo',
  projectId: projectId || 'placeholder',
  dataset: dataset || 'production',
  schema: { types: schemaTypes },
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('Conteúdo do site')
          .items([
            S.listItem()
              .title('Configurações do site')
              .child(
                S.document().schemaType('siteSettings').documentId('siteSettings')
              ),
            S.divider(),
            S.documentTypeListItem('project').title('Projetos'),
            S.documentTypeListItem('service').title('Serviços'),
            S.documentTypeListItem('testimonial').title('Depoimentos'),
          ]),
    }),
    visionTool({ defaultApiVersion: apiVersion }),
  ],
});

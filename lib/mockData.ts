// Conteúdo de exemplo usado enquanto o Sanity (CMS) ainda não está
// configurado, ou como fallback se alguma consulta falhar.
// Assim que NEXT_PUBLIC_SANITY_PROJECT_ID estiver definido e houver
// conteúdo publicado no Studio, os dados reais substituem estes.

import type { Project, Service, SiteSettings, Testimonial } from './types';

export const mockSiteSettings: SiteSettings = {
  name: 'Alice Fogliatto',
  role: 'Product & Brand Designer',
  heroTitle: 'From idea to play experience',
  heroAccentWord: 'play experience',
  heroSubtitle:
    'Toy & Product Designer creating thoughtful experiences through storytelling, strategy and play.',
  aboutLead:
    'Unindo pesquisa, identidade visual e estratégia de marca para criar projetos que conectam pessoas e histórias reais — sempre com atenção aos detalhes que fazem a diferença.',
  highlights: [
    { value: '6+', label: 'anos criando identidades visuais' },
    { value: '40+', label: 'projetos entregues' },
    { value: '15+', label: 'marcas atendidas' },
  ],
  skills: ['Branding', 'UI/UX Design', 'Direção de Arte', 'Ilustração', 'Social Media', 'Embalagens'],
  email: 'ola@nomesobrenome.com',
  socialLinks: [
    { label: 'Instagram', url: '#' },
    { label: 'Behance', url: '#' },
    { label: 'LinkedIn', url: '#' },
    { label: 'Pinterest', url: '#' },
  ],
  footerNote: 'Nome Sobrenome — conteúdo de exemplo, conecte o CMS para personalizar.',
};

export const mockProjects: Project[] = [
  {
    _id: 'mock-1',
    title: 'Estúdio Lumen',
    slug: 'estudio-lumen',
    category: 'Branding',
    summary: 'Identidade visual completa para um estúdio de arquitetura de interiores.',
    client: 'Estúdio Lumen',
    year: '2025',
    role: 'Direção de Arte, Branding',
    tools: 'Illustrator, Figma',
    resultLabel: 'Reconhecimento de marca',
    resultValue: '+38%',
    description: [
      'Projeto de exemplo — substitua pelo resumo real do case: contexto do cliente, desafio de negócio e objetivo da marca.',
      'Descreva o processo criativo, principais decisões de design e como a solução final resolveu o problema do cliente.',
    ],
  },
  {
    _id: 'mock-2',
    title: 'App Näo',
    slug: 'app-nao',
    category: 'UI/UX Design',
    summary: 'Design de interface para aplicativo de bem-estar e organização pessoal.',
    client: 'Näo App',
    year: '2025',
    role: 'UI/UX Design, Design System',
    tools: 'Figma, Principle',
    resultLabel: 'Aumento em retenção',
    resultValue: '+22%',
    description: [
      'Projeto de exemplo — troque por uma descrição real do produto, público-alvo e principais telas desenhadas.',
      'Inclua aprendizados de pesquisa com usuários e como o design system acelerou o desenvolvimento.',
    ],
  },
  {
    _id: 'mock-3',
    title: 'Editora Vero',
    slug: 'editora-vero',
    category: 'Editorial',
    summary: 'Direção de arte para série de capas e materiais editoriais.',
    client: 'Editora Vero',
    year: '2024',
    role: 'Direção de Arte, Ilustração',
    tools: 'Photoshop, InDesign',
    resultLabel: 'Peças produzidas',
    resultValue: '24',
    description: [
      'Projeto de exemplo — conte a história por trás do conceito visual escolhido para a série editorial.',
      'Mostre variações de capas, paleta de cores e tipografia utilizadas no projeto.',
    ],
  },
  {
    _id: 'mock-4',
    title: 'Casa Verde',
    slug: 'casa-verde',
    category: 'Embalagens',
    summary: 'Design de embalagens sustentáveis para marca de produtos naturais.',
    client: 'Casa Verde',
    year: '2024',
    role: 'Design de Embalagem, Branding',
    tools: 'Illustrator, Dimension',
    resultLabel: 'Linha de produtos',
    resultValue: '12',
    description: [
      'Projeto de exemplo — explique o racional de sustentabilidade e materiais escolhidos para a embalagem.',
      'Destaque como a identidade visual se conecta aos valores da marca.',
    ],
  },
];

export const mockServices: Service[] = [
  { _id: 'svc-1', title: 'Identidade Visual', description: 'Criação de marcas completas, do conceito ao manual de identidade.', icon: 'target' },
  { _id: 'svc-2', title: 'UI/UX Design', description: 'Interfaces digitais pensadas para experiência, clareza e conversão.', icon: 'screen' },
  { _id: 'svc-3', title: 'Direção de Arte', description: 'Curadoria visual para campanhas, editorial e conteúdo de marca.', icon: 'document' },
  { _id: 'svc-4', title: 'Consultoria Criativa', description: 'Apoio estratégico para projetos que precisam de um novo olhar visual.', icon: 'star' },
];

export const mockTestimonials: Testimonial[] = [
  { _id: 't-1', quote: 'Trabalhar juntos foi transformador para a nossa marca. Cada detalhe foi pensado com muito cuidado e estratégia.', name: 'Cliente Exemplo', role: 'Fundador(a), Empresa A' },
  { _id: 't-2', quote: 'Entregou muito além do esperado — a identidade visual capturou exatamente a essência que queríamos comunicar.', name: 'Cliente Exemplo', role: 'Head de Marketing, Empresa B' },
  { _id: 't-3', quote: 'Processo colaborativo do início ao fim, com uma sensibilidade visual rara. Recomendo de olhos fechados.', name: 'Cliente Exemplo', role: 'CEO, Empresa C' },
];

export const gradients = [
  'linear-gradient(135deg,#FF4D6D,#6C4CF1)',
  'linear-gradient(135deg,#6C4CF1,#2FD5C4)',
  'linear-gradient(135deg,#FFB648,#FF4D6D)',
  'linear-gradient(135deg,#2FD5C4,#6C4CF1 60%,#FFB648)',
];

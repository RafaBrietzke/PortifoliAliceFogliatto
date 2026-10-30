// Idiomas do site. O inglês é o padrão e fica sem prefixo na URL (/, /projetos/…);
// o português mora em /pt (/pt, /pt/projetos/…). O middleware.ts faz a ponte
// entre as URLs sem prefixo e as rotas em app/[lang].

export const locales = ['en', 'pt'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Monta o link de uma página no idioma pedido. `path` é sempre o caminho
// "em inglês", começando com / (ex: '/', '/#sobre', '/projetos/disney-tour').
export function localePath(lang: Locale, path: string) {
  if (lang === defaultLocale) return path;
  if (path === '/') return `/${lang}`;
  if (path.startsWith('/#')) return `/${lang}${path.slice(1)}`;
  return `/${lang}${path}`;
}

const en = {
  meta: {
    title: 'Alice Fogliatto — Portfolio',
    description: 'Toy & Product Designer creating thoughtful experiences through storytelling, strategy and play.',
  },
  nav: {
    about: 'About',
    projects: 'Projects',
    services: 'Services',
    testimonials: 'Testimonials',
    cta: "Let's Work Together",
    ctaShort: 'Contact',
    language: 'Language',
  },
  about: { lead: 'What I', accent: 'do' },
  projects: {
    lead: 'Projects',
    accent: 'I designed',
    intro: 'Browse by category and slide sideways to see more projects from the same world.',
    viewProject: 'View project',
    previous: (category: string) => `Previous ${category} project`,
    next: (category: string) => `Next ${category} project`,
  },
  services: {
    lead: 'How I',
    accent: 'can help',
    intro: 'Tailored services for brands and products that want to communicate with clarity and personality.',
  },
  testimonials: {
    lead: 'Kind',
    accent: 'words',
    intro: 'What partners and clients say about working together.',
  },
  cta: {
    lead: "Let's create",
    accent: 'something together',
    sub: 'Open to new projects, partnerships and creative collaborations.',
  },
  footer: { rights: 'All rights reserved.', credit: 'Website by' },
  project: {
    back: 'Back to projects',
    meta: { client: 'Client', company: 'Company', year: 'Year', role: 'Role', tools: 'Tools' },
    storyLead: 'About the',
    storyAccent: 'project',
    shotsLead: 'A closer',
    shotsAccent: 'look',
    shotsHint: 'Click any image to see it full size.',
    nextProject: 'Next project',
    keepExploring: 'Keep exploring',
    allProjects: 'All projects',
  },
  gallery: {
    open: (n: number, total: number) => `Open image ${n} of ${total}`,
    image: (title: string, n: number) => `${title} — image ${n}`,
    images: (title: string) => `${title} — images`,
    close: 'Close',
    previous: 'Previous image',
    next: 'Next image',
  },
};

export type Dictionary = typeof en;

const pt: Dictionary = {
  meta: {
    title: 'Alice Fogliatto — Portfólio',
    description: 'Toy & Product Designer criando experiências pensadas com storytelling, estratégia e brincadeira.',
  },
  nav: {
    about: 'Sobre',
    projects: 'Projetos',
    services: 'Serviços',
    testimonials: 'Depoimentos',
    cta: 'Vamos trabalhar juntos',
    ctaShort: 'Contato',
    language: 'Idioma',
  },
  about: { lead: 'O que eu', accent: 'faço' },
  projects: {
    lead: 'Projetos',
    accent: 'que desenhei',
    intro: 'Navegue por categoria e deslize para o lado para ver mais projetos do mesmo universo.',
    viewProject: 'Ver projeto',
    previous: (category) => `Projeto anterior de ${category}`,
    next: (category) => `Próximo projeto de ${category}`,
  },
  services: {
    lead: 'Como posso',
    accent: 'ajudar',
    intro: 'Serviços sob medida para marcas e produtos que querem se comunicar com clareza e personalidade.',
  },
  testimonials: {
    lead: 'Palavras',
    accent: 'gentis',
    intro: 'O que parceiros e clientes dizem sobre trabalhar juntos.',
  },
  cta: {
    lead: 'Vamos criar',
    accent: 'algo juntos',
    sub: 'Aberta a novos projetos, parcerias e colaborações criativas.',
  },
  footer: { rights: 'Todos os direitos reservados.', credit: 'Site desenvolvido por' },
  project: {
    back: 'Voltar aos projetos',
    meta: { client: 'Cliente', company: 'Empresa', year: 'Ano', role: 'Função', tools: 'Ferramentas' },
    storyLead: 'Sobre o',
    storyAccent: 'projeto',
    shotsLead: 'Um olhar',
    shotsAccent: 'de perto',
    shotsHint: 'Clique em qualquer imagem para vê-la em tamanho real.',
    nextProject: 'Próximo projeto',
    keepExploring: 'Continue explorando',
    allProjects: 'Todos os projetos',
  },
  gallery: {
    open: (n, total) => `Abrir imagem ${n} de ${total}`,
    image: (title, n) => `${title} — imagem ${n}`,
    images: (title) => `${title} — imagens`,
    close: 'Fechar',
    previous: 'Imagem anterior',
    next: 'Próxima imagem',
  },
};

const dictionaries: Record<Locale, Dictionary> = { en, pt };

export function getDictionary(lang: Locale): Dictionary {
  return dictionaries[lang];
}

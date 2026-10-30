// Versão em português do conteúdo de exemplo (lib/mockData.ts). Só entram os
// campos que mudam de idioma — o resto (fotos, cliente, ano…) vem do arquivo
// em inglês. Projetos, serviços e depoimentos são casados pelo `_id`.

import type { Project, Service, SiteSettings, Testimonial } from './types';

export const ptSiteSettings: Partial<SiteSettings> = {
  heroTitle: 'Da ideia à experiência de brincar',
  heroAccentWord: 'experiência de brincar',
  heroSubtitle:
    'Toy & Product Designer criando experiências pensadas com storytelling, estratégia e brincadeira.',
  aboutLead:
    'Toy & Product Designer especializada no desenvolvimento de produtos licenciados e experiências de brincar envolventes, com mais de 8 anos levando ideias do conceito ao mercado.',
  highlights: [
    { value: '8+', label: 'anos de experiência' },
    { value: '55+', label: 'produtos lançados' },
    { value: '3M+', label: 'unidades vendidas no mundo' },
  ],
};

const sameTeam =
  'Atuei como product designer em colaboração com uma equipe multidisciplinar, contribuindo para unir identidade de marca, funcionalidade e apelo lúdico no resultado final.';

const wholeProcess = (license: string) =>
  `Como Product Designer, participei de todo o processo de desenvolvimento, da pesquisa de mercado e geração de conceitos ao acompanhamento da produção e à aprovação final da amostra. Trabalhando lado a lado com equipes multidisciplinares, licenciadores, fornecedores e modeladores 3D, ajudei a traduzir a identidade da ${license} em uma experiência de brincar funcional, viável para produção e envolvente.`;

export const ptProjects: Record<string, Partial<Project>> = {
  'behance-disney-tour': {
    summary: 'Ônibus de brinquedo pré-escolar inspirado no Mickey Mouse, desenvolvido sob licença Disney.',
    description: [
      'Disney Tour é um ônibus de brinquedo voltado ao público pré-escolar, inspirado no Mickey Mouse e desenvolvido sob licença Disney dentro da divisão de Gestão de Design da Grendene.',
      'Como Product Designer, participei de todo o processo de desenvolvimento, da pesquisa de mercado e benchmarking à aprovação final de produção. Minhas responsabilidades incluíram geração e refinamento de conceitos, desenvolvimento de especificações técnicas, definição de requisitos de fabricação e colaboração próxima com modeladores 3D, fornecedores e equipes multifuncionais nas etapas de ferramental, prototipagem e validação.',
    ],
  },
  'behance-barbie-ice-cream-shop': {
    summary: 'Embalagem de calçado que vira um playset de sorveteria, sob licença Barbie.',
    description: [
      'Desenvolvimento de um playset (estojo de calçado) sob licença Barbie (Mattel), realizado dentro da divisão de Gestão de Design da Grendene.',
      wholeProcess('Barbie'),
    ],
  },
  'behance-stitch-pet-shop': {
    summary: 'Embalagem de calçado transformada em um playset de pet shop do Stitch, sob licença Disney.',
    description: [
      'Projeto de desenvolvimento de playset (embalagem de calçado) sob licença Disney, realizado dentro da divisão de Gestão de Design da Grendene.',
      sameTeam,
    ],
  },
  'behance-disney-baby-car': {
    summary: 'Carrinho de brinquedo pré-escolar que também é embalagem de calçado, sob licença Disney.',
    description: [
      'Projeto de desenvolvimento de brinquedo pré-escolar (embalagem de calçado) sob licença Disney, realizado dentro da divisão de Gestão de Design da Grendene.',
      sameTeam,
    ],
  },
  'behance-mundo-bita-phone': {
    summary: 'Telefone de brinquedo pré-escolar com sons e músicas, sob licença Mundo Bita.',
    description: [
      'Projeto de desenvolvimento de brinquedo pré-escolar com sons e músicas sob licença Mundo Bita, realizado dentro da divisão de Gestão de Design da Grendene.',
      sameTeam,
    ],
  },
  'behance-barbie-road-trip': {
    summary: 'Embalagem de calçado que vira um playset de motorhome de brinquedo, sob licença Barbie.',
    description: [
      'Projeto de desenvolvimento de playset (embalagem de calçado) sob licença Barbie (Mattel), realizado dentro da divisão de Gestão de Design da Grendene.',
      sameTeam,
    ],
  },
  'behance-barbie-airplane': {
    summary: 'Embalagem de calçado que vira um avião de brinquedo, sob licença Barbie.',
    description: [
      'Desenvolvimento de um brinquedo (estojo de calçado) sob licença Barbie (Mattel), realizado dentro da divisão de Gestão de Design da Grendene.',
      wholeProcess('Barbie'),
    ],
  },
  'havaianas-crossbody-bag': {
    summary: 'Bolsa transversal infantil com a textura de arroz da sola Havaianas e um chaveiro de ursinho com glitter.',
    description: [
      'Projeto de desenvolvimento de bolsa transversal infantil para a Havaianas. O corpo traz a textura de arroz e o logo em relevo das solas dos chinelos da marca, com fechamento em zíper, aviamentos em rose gold e um chaveiro de ursinho com glitter.',
      sameTeam,
    ],
  },
  'havaianas-wristlet-bag': {
    summary: 'Bolsa de mão adulta com a textura de arroz da sola Havaianas e alça de pulso tom sobre tom.',
    description: [
      'Projeto de desenvolvimento de bolsa de mão adulta em parceria com a Havaianas. O corpo traz a textura de arroz e o logo em relevo das solas dos chinelos da marca, com fechamento em zíper, puxador com logo e alça de pulso tom sobre tom presa por um mosquetão.',
      'Atuei como product designer em colaboração com uma equipe multidisciplinar, contribuindo para unir identidade de marca, funcionalidade e um apelo limpo e cotidiano no resultado final.',
    ],
  },
  'behance-stitch-time-watch': {
    summary: 'Relógio infantil desenvolvido sob licença Disney.',
    description: [
      'Projeto de desenvolvimento de acessório infantil sob licença Disney, realizado dentro da divisão de Gestão de Design da Grendene.',
      sameTeam,
    ],
  },
  'color-backpack': {
    summary: 'Mochila infantil com bolsinhas frontais coloridas que podem ser usadas como pochete, sob licença Barbie.',
    description: [
      'Projeto de desenvolvimento de mochila infantil sob licença Barbie (Mattel), realizado dentro da divisão de Gestão de Design da Grendene. As bolsinhas frontais vêm em cores contrastantes e acabamentos com glitter, e podem ser usadas sozinhas como pochete.',
      sameTeam,
    ],
  },
  'justice-league-backpack': {
    summary: 'Mochila infantil nas versões Batman, Superman e Mulher-Maravilha, sob licença Liga da Justiça.',
    description: [
      'Projeto de desenvolvimento de mochila infantil sob licença Liga da Justiça (DC), realizado dentro da divisão de Gestão de Design da Grendene. Cada versão veste o traje do seu herói, com uma textura de história em quadrinhos moldada no corpo e alças ajustáveis.',
      sameTeam,
    ],
  },
  'barbie-flower-bag': {
    summary: 'Bolsa transversal infantil com flores em relevo e laço de fita, sob licença Barbie.',
    description: [
      'Projeto de desenvolvimento de bolsa infantil sob licença Barbie (Mattel), realizado dentro da divisão de Gestão de Design da Grendene. A bolsa transversal tem flores em relevo no corpo e um laço de fita, e acompanha as sandálias combinando.',
      sameTeam,
    ],
  },
  'disney-lunch-time': {
    summary: 'Tigela de personagem com tampa, colher e garfo que transforma a hora da refeição em brincadeira, sob licença Disney.',
    description: [
      'Projeto de desenvolvimento de kit de refeição infantil sob licença Disney, realizado dentro da divisão de Gestão de Design da Grendene. Cada personagem se abre em uma tigela com ventosas na base e acompanha colher e garfo combinando, nas versões Stitch, Mickey e Minnie.',
      sameTeam,
    ],
  },
  'disney-christmas-ornaments': {
    summary: 'Bolas de Natal colecionáveis com figuras de Mickey & Amigos, sob licença Disney.',
    description: [
      'Projeto de desenvolvimento de bolas de Natal colecionáveis sob licença Disney, com Mickey & Amigos. O projeto foi desenvolvido para o cliente Ri Happy enquanto eu atuava como designer na Global Products.',
      'Cada bola transparente guarda uma figura de personagem sobre uma base colorida, nas versões Mickey, Minnie, Pato Donald e Pluto.',
    ],
  },
};

export const ptServices: Record<string, Partial<Service>> = {
  'svc-1': { title: 'Design de Produto', description: 'Desenvolvimento de ponta a ponta, do conceito inicial ao produto final.' },
  'svc-2': { title: 'Modelagem & Visualização 3D', description: 'Modelos e visualizações 3D para dar vida às ideias de produto.' },
  'svc-3': { title: 'Pesquisa de Mercado & Produto', description: 'Pesquisa, benchmarking e insights para identificar oportunidades.' },
  'svc-4': { title: 'Desenvolvimento Técnico', description: 'Especificações e desenvolvimento de design pensando na viabilidade de fabricação.' },
  'svc-5': { title: 'Consultoria em Desenvolvimento de Produto', description: 'Orientação estratégica para transformar ideias em produtos viáveis.' },
};

export const ptTestimonials: Record<string, Partial<Testimonial>> = {
  't-1': { name: 'Cliente Exemplo', quote: 'Trabalhar juntos foi transformador para a nossa marca. Cada detalhe foi pensado com muito cuidado e estratégia.', role: 'Fundador(a), Empresa A' },
  't-2': { name: 'Cliente Exemplo', quote: 'Entregou muito além do esperado — a identidade visual capturou exatamente a essência que queríamos comunicar.', role: 'Head de Marketing, Empresa B' },
  't-3': { name: 'Cliente Exemplo', quote: 'Processo colaborativo do início ao fim, com uma sensibilidade visual rara. Recomendo de olhos fechados.', role: 'CEO, Empresa C' },
};

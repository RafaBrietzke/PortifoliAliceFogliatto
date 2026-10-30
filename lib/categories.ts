// As 3 categorias do portfólio. Usadas nos cards "What I do" (Sobre),
// nas fileiras da seção de projetos e nas opções do campo "Categoria"
// no Studio — o `id` é o valor salvo em cada projeto. `title` e `items` são
// em inglês; `pt` traz a versão em português (use localizeCategories).

import type { Locale } from './i18n';

export type CategoryShapeName = 'burst' | 'flower' | 'spiral';

export type Category = {
  id: string;
  title: string;
  items: string[];
  shape: CategoryShapeName;
  pt: { title: string; items: string[] };
};

export const categories: Category[] = [
  {
    id: 'toys',
    title: 'Toys',
    items: ['Playsets & Dolls', 'Role Play & Preschool', 'Plush & Collectibles'],
    shape: 'burst',
    pt: { title: 'Brinquedos', items: ['Playsets & Bonecas', 'Faz de Conta & Pré-escolar', 'Pelúcias & Colecionáveis'] },
  },
  {
    id: 'accessories',
    title: 'Accessories & Wearables',
    items: ['Bags & Backpacks', 'Kids Accessories', 'Keychains & Small Accessories'],
    shape: 'flower',
    pt: { title: 'Acessórios & Wearables', items: ['Bolsas & Mochilas', 'Acessórios Infantis', 'Chaveiros & Pequenos Acessórios'] },
  },
  {
    id: 'home',
    title: 'Home & Lifestyle',
    items: ['Home Décor', 'Homeware & Everyday Objects', 'Lifestyle Products'],
    shape: 'spiral',
    pt: { title: 'Casa & Lifestyle', items: ['Decoração', 'Utilidades & Objetos do Dia a Dia', 'Produtos de Lifestyle'] },
  },
];

export function localizeCategories(lang: Locale): Category[] {
  if (lang === 'en') return categories;
  return categories.map((c) => ({ ...c, title: c[lang].title, items: c[lang].items }));
}

export function categoryTitle(id: string) {
  return categories.find((c) => c.id === id)?.title ?? id;
}

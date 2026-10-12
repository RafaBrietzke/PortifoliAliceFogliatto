// As 3 categorias do portfólio. Usadas nos cards "What I do" (Sobre),
// nas fileiras da seção de projetos e nas opções do campo "Categoria"
// no Studio — o `id` é o valor salvo em cada projeto.

export type CategoryShapeName = 'burst' | 'flower' | 'spiral';

export type Category = {
  id: string;
  title: string;
  items: string[];
  shape: CategoryShapeName;
};

export const categories: Category[] = [
  {
    id: 'toys',
    title: 'Toys',
    items: ['Playsets & Dolls', 'Role Play & Preschool', 'Plush & Collectibles'],
    shape: 'burst',
  },
  {
    id: 'accessories',
    title: 'Accessories & Wearables',
    items: ['Bags & Backpacks', 'Kids Accessories', 'Keychains & Small Accessories'],
    shape: 'flower',
  },
  {
    id: 'home',
    title: 'Home & Lifestyle',
    items: ['Home Décor', 'Homeware & Everyday Objects', 'Lifestyle Products'],
    shape: 'spiral',
  },
];

export function categoryTitle(id: string) {
  return categories.find((c) => c.id === id)?.title ?? id;
}

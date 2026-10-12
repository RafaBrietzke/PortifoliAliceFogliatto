import type { CategoryShapeName } from '../lib/categories';

export default function CategoryShape({ shape, className }: { shape: CategoryShapeName; className?: string }) {
  switch (shape) {
    case 'flower':
      return (
        <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <circle cx="50" cy="26" r="20" />
          <circle cx="72.8" cy="42.6" r="20" />
          <circle cx="64.1" cy="69.4" r="20" />
          <circle cx="35.9" cy="69.4" r="20" />
          <circle cx="27.2" cy="42.6" r="20" />
          <circle cx="50" cy="50" r="20" />
        </svg>
      );
    case 'spiral':
      return (
        <svg className={className} viewBox="0 0 100 70" fill="none" stroke="currentColor" strokeWidth="5" aria-hidden="true">
          <ellipse cx="50" cy="14" rx="44" ry="11" />
          <ellipse cx="50" cy="35" rx="44" ry="11" />
          <ellipse cx="50" cy="56" rx="44" ry="11" />
        </svg>
      );
    case 'burst':
    default:
      return (
        <svg className={className} viewBox="0 0 100 100" fill="currentColor" aria-hidden="true">
          <path d="M50,2 L56.13,35.22 L83.94,16.06 L64.78,43.88 L98,50 L64.78,56.12 L83.94,83.94 L56.12,64.78 L50,98 L43.88,64.78 L16.06,83.94 L35.22,56.12 L2,50 L35.22,43.88 L16.06,16.06 L43.88,35.22 Z" />
        </svg>
      );
  }
}

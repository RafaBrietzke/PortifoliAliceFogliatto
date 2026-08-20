'use client';

import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react';

// Anima o elemento com um fade + slide sutil quando ele entra na tela.
// Tem uma rede de segurança: se por algum motivo o elemento nunca cruzar
// o viewport (ex: ferramentas de captura de tela automáticas), ele aparece
// de qualquer forma depois de 1s — nunca fica invisível permanentemente.
export default function Reveal({
  children,
  className = '',
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            el.classList.add('in-view');
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.12 }
    );
    observer.observe(el);

    const fallback = setTimeout(() => el.classList.add('in-view'), 1000);

    return () => {
      observer.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <div ref={ref} className={`reveal ${className}`.trim()} style={style}>
      {children}
    </div>
  );
}

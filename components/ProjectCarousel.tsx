'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';

// Fileira de cards com rolagem horizontal centralizada. A rolagem em si é
// nativa (arrastar no touch/trackpad, com scroll-snap no centro); aqui só
// marcamos qual card está no meio (.is-active, que o CSS deixa maior) e as
// setas levam o card anterior/próximo para o centro.
export default function ProjectCarousel({
  heading,
  previousLabel,
  nextLabel,
  children,
}: {
  heading: ReactNode;
  previousLabel: string;
  nextLabel: string;
  children: ReactNode;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [count, setCount] = useState(0);

  const centerOn = (index: number, behavior: ScrollBehavior) => {
    const track = trackRef.current;
    const card = track?.children[index] as HTMLElement | undefined;
    if (!track || !card) return;
    track.scrollTo({ left: card.offsetLeft + card.offsetWidth / 2 - track.clientWidth / 2, behavior });
  };

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    setCount(cards.length);

    const update = () => {
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let best = Infinity;
      cards.forEach((card, i) => {
        const distance = Math.abs(card.offsetLeft + card.offsetWidth / 2 - center);
        if (distance < best) {
          best = distance;
          closest = i;
        }
      });
      cards.forEach((card, i) => card.classList.toggle('is-active', i === closest));
      setActive(closest);
    };

    // começa no card do meio da fileira, para dar para rolar para os dois lados
    centerOn(Math.floor((cards.length - 1) / 2), 'auto');
    update();

    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    track.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      cancelAnimationFrame(frame);
      track.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  return (
    <>
      <div className="row-head wrap">
        {heading}
        <div className="row-nav" hidden={count === 1}>
          <button type="button" onClick={() => centerOn(active - 1, 'smooth')} disabled={active === 0} aria-label={previousLabel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M15 6l-6 6 6 6" />
            </svg>
          </button>
          <button type="button" onClick={() => centerOn(active + 1, 'smooth')} disabled={count > 0 && active === count - 1} aria-label={nextLabel}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M9 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
      <div className="row-track" ref={trackRef}>
        {children}
      </div>
    </>
  );
}

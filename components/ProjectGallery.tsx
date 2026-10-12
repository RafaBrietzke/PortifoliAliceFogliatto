'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Reveal from './Reveal';

const pad = (n: number) => String(n).padStart(2, '0');

// Galeria do projeto: as fotos aparecem inteiras, na proporção original
// (o width/height abaixo é só um palpite para reservar espaço — com
// height:auto o navegador usa a proporção real assim que a imagem carrega).
// Fotos panorâmicas ocupam a largura toda, e clicar em qualquer uma abre a
// versão ampliada num <dialog>, com setas e teclado.
export default function ProjectGallery({ images, title }: { images: string[]; title: string }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [current, setCurrent] = useState<number | null>(null);
  const [wide, setWide] = useState<number[]>([]);
  const total = images.length;

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (current !== null && !dialog.open) dialog.showModal();
    if (current === null && dialog.open) dialog.close();
  }, [current]);

  useEffect(() => {
    if (current === null) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight') setCurrent((c) => (c === null ? c : (c + 1) % total));
      if (event.key === 'ArrowLeft') setCurrent((c) => (c === null ? c : (c - 1 + total) % total));
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [current, total]);

  const step = (delta: number) => setCurrent((c) => (c === null ? c : (c + delta + total) % total));

  return (
    <>
      <ul className="pd-gallery">
        {images.map((src, i) => (
          <li key={src} className={wide.includes(i) ? 'is-wide' : undefined}>
            <Reveal>
              <button type="button" className="pd-shot" onClick={() => setCurrent(i)} aria-label={`Open image ${i + 1} of ${total}`}>
                <Image
                  src={src}
                  alt={`${title} — image ${i + 1}`}
                  width={1080}
                  height={1350}
                  sizes="(max-width: 760px) 100vw, (max-width: 1240px) 50vw, 1120px"
                  onLoad={(event) => {
                    const img = event.currentTarget;
                    if (img.naturalWidth / img.naturalHeight > 1.6) setWide((w) => (w.includes(i) ? w : [...w, i]));
                  }}
                />
                <span className="pd-shot-num">{pad(i + 1)}</span>
              </button>
            </Reveal>
          </li>
        ))}
      </ul>

      <dialog ref={dialogRef} className="lightbox" onClose={() => setCurrent(null)} aria-label={`${title} — images`}>
        {current !== null && (
          <div className="lightbox-stage" onClick={(event) => event.target === event.currentTarget && setCurrent(null)}>
            <Image
              key={images[current]}
              src={images[current]}
              alt={`${title} — image ${current + 1}`}
              width={1080}
              height={1350}
              sizes="100vw"
              className="lightbox-img"
            />
            <button type="button" className="lightbox-btn lightbox-close" onClick={() => setCurrent(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
            {total > 1 && (
              <div className="lightbox-nav">
                <button type="button" className="lightbox-btn" onClick={() => step(-1)} aria-label="Previous image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M15 6l-6 6 6 6" />
                  </svg>
                </button>
                <span className="lightbox-count">{pad(current + 1)} / {pad(total)}</span>
                <button type="button" className="lightbox-btn" onClick={() => step(1)} aria-label="Next image">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M9 6l6 6-6 6" />
                  </svg>
                </button>
              </div>
            )}
          </div>
        )}
      </dialog>
    </>
  );
}

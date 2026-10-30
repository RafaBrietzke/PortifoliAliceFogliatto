import { Fragment } from 'react';
import Sparkle from './Sparkle';
import { localizeCategories } from '../lib/categories';
import type { Locale } from '../lib/i18n';

// Faixa que corre na horizontal com tudo o que aparece nos cards "What I do".
// A lista é renderizada duas vezes para o loop não ter emenda; a segunda
// cópia fica escondida de leitores de tela.
export default function Marquee({ lang }: { lang: Locale }) {
  const items = localizeCategories(lang).flatMap((category) => category.items);

  return (
    <div className="marquee">
      <div className="marquee-band">
        {[0, 1].map((copy) => (
          <div className="marquee-track" key={copy} aria-hidden={copy === 1}>
            {items.map((item) => (
              <Fragment key={item}>
                <span>{item}</span>
                <Sparkle className="marquee-star" />
              </Fragment>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

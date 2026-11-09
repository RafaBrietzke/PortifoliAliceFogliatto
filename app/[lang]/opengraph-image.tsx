import { ImageResponse } from 'next/og';
import { getDictionary, locales, type Locale } from '../../lib/i18n';

// Prévia exibida quando o link do site é compartilhado (WhatsApp, LinkedIn…).
// As páginas de projeto sobrescrevem com a foto de capa do projeto.
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';
export const alt = 'Alice Fogliatto — Portfolio';

export function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export default function OpengraphImage({ params }: { params: { lang: Locale } }) {
  const t = getDictionary(params.lang);

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '0 96px',
          background: '#FBF7F1',
          color: '#1E1A2B',
          position: 'relative',
        }}
      >
        <div style={{ position: 'absolute', top: -120, right: -80, width: 420, height: 420, borderRadius: 9999, background: '#7774FF' }} />
        <div style={{ position: 'absolute', top: 210, right: 230, width: 120, height: 120, borderRadius: 9999, background: '#e2f164' }} />
        <div style={{ position: 'absolute', bottom: -90, right: 120, width: 220, height: 220, borderRadius: 9999, background: '#EAC5F8' }} />
        <div style={{ fontSize: 30, fontWeight: 600, color: '#FF4D6D', letterSpacing: 2, textTransform: 'uppercase' }}>
          {params.lang === 'pt' ? 'Portfólio' : 'Portfolio'}
        </div>
        <div style={{ fontSize: 104, fontWeight: 700, lineHeight: 1.05, marginTop: 16 }}>Alice Fogliatto</div>
        <div style={{ fontSize: 34, lineHeight: 1.4, color: '#726C82', marginTop: 28, maxWidth: 720 }}>
          {t.meta.description}
        </div>
      </div>
    ),
    size,
  );
}

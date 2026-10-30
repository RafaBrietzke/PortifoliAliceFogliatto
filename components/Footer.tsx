import { getDictionary, type Locale } from '../lib/i18n';

export default function Footer({ name, note, lang }: { name: string; note?: string; lang: Locale }) {
  const t = getDictionary(lang).footer;

  return (
    <footer className="site-footer">
      <p>© {new Date().getFullYear()} {note || `${name}. ${t.rights}`}</p>
      <p className="site-credit">
        {t.credit} <strong>Rafaela Brietzke</strong>
      </p>
    </footer>
  );
}

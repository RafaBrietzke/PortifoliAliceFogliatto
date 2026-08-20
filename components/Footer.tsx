export default function Footer({ note }: { note?: string }) {
  return (
    <footer className="site-footer">
      © {new Date().getFullYear()} {note || 'Todos os direitos reservados.'}
    </footer>
  );
}

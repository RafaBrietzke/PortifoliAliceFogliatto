import Link from 'next/link';

export default function Header({ name }: { name: string }) {
  return (
    <header className="site-header">
      <div className="header-inner">
        <Link href="/" className="logo">
          {name}
        </Link>
        <nav className="main-nav">
          <ul>
            <li><Link href="/#sobre">Sobre</Link></li>
            <li><Link href="/#projetos">Projetos</Link></li>
            <li><Link href="/#servicos">Serviços</Link></li>
            <li><Link href="/#depoimentos">Depoimentos</Link></li>
          </ul>
        </nav>
        <div className="header-actions">
          <Link href="/#contato" className="btn btn-primary">
            Let's Work Together
          </Link>
        </div>
      </div>
    </header>
  );
}

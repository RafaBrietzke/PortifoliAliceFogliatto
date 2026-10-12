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
            <li><Link href="/#sobre">About</Link></li>
            <li><Link href="/#projetos">Projects</Link></li>
            <li><Link href="/#servicos">Services</Link></li>
            <li><Link href="/#depoimentos">Testimonials</Link></li>
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

import { NextResponse, type NextRequest } from 'next/server';
import { defaultLocale, locales } from './lib/i18n';

// As páginas moram em app/[lang]. URLs com /pt passam direto; as sem prefixo
// são servidas como inglês (reescrita interna, a URL no navegador não muda);
// e /en/… redireciona para a versão sem prefixo, para não haver duas URLs
// para a mesma página.
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const [, first] = pathname.split('/');

  if (first === defaultLocale) {
    const url = request.nextUrl.clone();
    url.pathname = pathname.slice(defaultLocale.length + 1) || '/';
    return NextResponse.redirect(url);
  }

  if ((locales as readonly string[]).includes(first)) return NextResponse.next();

  const url = request.nextUrl.clone();
  url.pathname = `/${defaultLocale}${pathname === '/' ? '' : pathname}`;
  return NextResponse.rewrite(url);
}

export const config = {
  // tudo menos o Studio, rotas internas do Next e arquivos estáticos (com extensão)
  matcher: ['/((?!studio|api|_next|.*\\..*).*)'],
};

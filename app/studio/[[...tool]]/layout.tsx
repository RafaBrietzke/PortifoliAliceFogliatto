// O site tem o layout raiz em app/[lang]; o Studio fica fora dos idiomas e
// precisa do próprio <html>.
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body style={{ margin: 0 }}>{children}</body>
    </html>
  );
}

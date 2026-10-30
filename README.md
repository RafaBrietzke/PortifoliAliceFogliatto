# Portfólio — Next.js + Sanity

Projeto do site de portfólio, com o design já implementado a partir do
protótipo aprovado. O conteúdo (projetos, depoimentos, serviços, textos do
site) é editado através de um painel próprio em `/studio` — sem precisar
mexer em código.

## Arquitetura

- **Next.js 14** (App Router, TypeScript) — gera as páginas do site.
- **Sanity** — CMS headless gratuito. É onde ela vai editar o conteúdo,
  numa tela parecida com um formulário, sem código.
- O site funciona **mesmo antes de configurar o Sanity**: enquanto não
  houver conexão com o CMS, ele mostra conteúdo de exemplo (arquivo
  `lib/mockData.ts`), então dá pra rodar e ver o site funcionando desde já.
- **Dois idiomas**: inglês em `/` e português em `/pt`, com as bandeiras no
  cabeçalho para trocar. Os textos fixos da interface estão em `lib/i18n.ts`
  e a tradução do conteúdo de exemplo em `lib/mockData.pt.ts`.

```
app/[lang]/             → páginas (rotas) do site, uma versão por idioma
  page.tsx                → home
  projetos/[slug]/page.tsx→ página de cada estudo de caso
middleware.ts           → serve o inglês sem prefixo e o português em /pt
  studio/[[...tool]]/     → painel de edição de conteúdo (/studio)
components/             → componentes visuais (Header, Hero, cards, etc.)
sanity/schemas/         → definição dos "formulários" de conteúdo do CMS
lib/                    → busca de dados (com fallback pro conteúdo de exemplo)
```

## 1. Rodar localmente

Pré-requisito: [Node.js](https://nodejs.org) 18 ou mais recente instalado.

```bash
npm install
npm run dev
```

Abra http://localhost:3000 — o site já deve aparecer com o conteúdo de
exemplo (nomes, textos e projetos placeholder).

## 2. Conectar o Sanity (pra ela editar sem código)

1. Crie uma conta gratuita em https://www.sanity.io/ (dá pra entrar com
   Google/GitHub).
2. Crie um novo projeto (qualquer nome). Anote o **Project ID** que
   aparece no painel (https://sanity.io/manage).
3. Copie o arquivo `.env.local.example` para `.env.local` e preencha:

   ```
   NEXT_PUBLIC_SANITY_PROJECT_ID=o_id_do_seu_projeto
   NEXT_PUBLIC_SANITY_DATASET=production
   ```

4. Rode `npm run dev` de novo e acesse http://localhost:3000/studio —
   é ali que o conteúdo é editado (Configurações do site, Projetos,
   Serviços, Depoimentos). O site na home passa a puxar automaticamente o
   que for publicado lá, no lugar do conteúdo de exemplo.

Depois que o site estiver publicado (passo 3 abaixo), o `/studio` também
fica acessível pelo domínio publicado — ex: `seusite.com/studio` — então
ela pode editar direto de lá, sem precisar do VSCode nem de rodar nada
localmente.

## 3. Publicar (deploy)

Recomendado: [Vercel](https://vercel.com) (gratuito para esse tipo de
projeto).

1. Suba este projeto para um repositório no GitHub.
2. Em vercel.com, clique em "New Project" e importe o repositório.
3. Nas configurações do projeto, adicione as mesmas variáveis de ambiente
   do `.env.local` (`NEXT_PUBLIC_SANITY_PROJECT_ID` e
   `NEXT_PUBLIC_SANITY_DATASET`).
4. Deploy. A cada alteração enviada ao GitHub, o site atualiza sozinho.

Alternativa: Netlify funciona de forma bem parecida (importar o
repositório + configurar as mesmas variáveis de ambiente).

## 4. Domínio próprio

Tanto Vercel quanto Netlify permitem conectar um domínio próprio (ex:
`nomedadesigner.com.br`) de graça — só o registro do domínio em si tem
custo (geralmente pago em algum registrador como Registro.br).

## Nota sobre segurança de dependências

O `npm install` reporta algumas vulnerabilidades vindas de ferramentas
internas de CLI do Sanity (`@sanity/cli`), usadas apenas para tarefas de
linha de comando — não fazem parte do código que roda no site publicado.
Não é necessário rodar `npm audit fix --force`, pois isso rebaixaria o
Sanity para uma versão instável. Se quiser, pode revisar com `npm audit`
periodicamente conforme novas versões forem lançadas.

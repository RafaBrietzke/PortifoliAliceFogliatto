// Gera o PDF do portfólio (A4 paisagem) a partir do conteúdo do site:
// textos de lib/mockData.ts + lib/categories.ts e fotos de public/projects.
// O que é diferente do site (seleção e ordem dos projetos, página de processo,
// nota de direitos) fica definido aqui e não altera o site.
// Uso: npm run pdf   →   portfolio-alice-fogliatto.pdf na raiz do projeto.

import { execFileSync } from 'node:child_process';
import { existsSync, mkdtempSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { mockProjects, mockSiteSettings } from '../lib/mockData.ts';
import { categories } from '../lib/categories.ts';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const output = join(root, 'portfolio-alice-fogliatto.pdf');

const chromeCandidates = [
  process.env.CHROME_PATH,
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
].filter(Boolean);
const chrome = chromeCandidates.find((path) => existsSync(path));
if (!chrome) {
  console.error('Chrome não encontrado. Defina CHROME_PATH com o caminho do navegador.');
  process.exit(1);
}

// Ajustes que valem só para o PDF — o site continua lendo lib/mockData.ts como está.
const pdfTitle = (text) => text?.replace('Toy & Product Designer', 'Senior Product Designer');
const settings = {
  ...mockSiteSettings,
  heroSubtitle: pdfTitle(mockSiteSettings.heroSubtitle),
  aboutLead: pdfTitle(mockSiteSettings.aboutLead),
};

// Projetos que entram no PDF, na ordem em que aparecem
const PROJECT_ORDER = [
  'havaianas-crossbody-bag',
  'havaianas-wristlet-bag',
  'disney-christmas-ornaments',
  'barbie-ice-cream-shop',
  'color-backpack',
  'stitch-pet-shop',
  'disney-tour',
  'justice-league-backpack',
  'barbie-road-trip',
  'disney-lunch-time',
  'disney-baby-car',
];
const projects = PROJECT_ORDER.map((slug) => {
  const project = mockProjects.find((p) => p.slug === slug);
  if (!project) throw new Error(`Projeto "${slug}" não encontrado em lib/mockData.ts`);
  return project;
});

const PROCESS_STEPS = [
  'Market & User Research',
  'Sketches & Initial Concepts',
  'Technical Specifications & Drawings',
  '3D Collaboration & Review',
  'Production Follow-up',
  'Sample Evaluation & Approval',
];
// Empresa onde o projeto foi desenvolvido, para a nota de direitos de cada página
const developedAt = (project) => project.company ?? (project.client === 'Grendene Kids' ? 'Grendene' : project.client);
const rightsNote = (project) =>
  `Developed at ${developedAt(project)} in collaboration with cross-functional teams. Licensed intellectual property belongs to its respective owners. All other project rights are subject to applicable agreements.`;
const MAX_PHOTOS = 4;
// Nos projetos dessas empresas o 3D também foi desenvolvido pela Alice — frase só do PDF
const OWN_3D_COMPANIES = ['Havaianas', 'Global Products'];
const OWN_3D_SENTENCE = 'I was also responsible for the 3D development of the product.';
// Projetos em que a primeira foto fica em destaque, com as outras duas empilhadas ao lado
const HERO_FIRST_PHOTO = ['disney-christmas-ornaments'];

const esc = (text = '') =>
  String(text).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const asset = (publicPath) => pathToFileURL(join(root, 'public', publicPath)).href;
const pad = (n) => String(n).padStart(2, '0');

// Mesmas formas do site (CategoryShape.tsx, Sparkle.tsx e Hero.tsx)
const BURST_PATH =
  'M50,2 L56.13,35.22 L83.94,16.06 L64.78,43.88 L98,50 L64.78,56.12 L83.94,83.94 L56.12,64.78 L50,98 L43.88,64.78 L16.06,83.94 L35.22,56.12 L2,50 L35.22,43.88 L16.06,16.06 L43.88,35.22 Z';
const shapes = {
  burst: (cls = '') => `<svg class="${cls}" viewBox="0 0 100 100" fill="currentColor"><path d="${BURST_PATH}"/></svg>`,
  flower: (cls = '') =>
    `<svg class="${cls}" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="26" r="20"/><circle cx="72.8" cy="42.6" r="20"/><circle cx="64.1" cy="69.4" r="20"/><circle cx="35.9" cy="69.4" r="20"/><circle cx="27.2" cy="42.6" r="20"/><circle cx="50" cy="50" r="20"/></svg>`,
  spiral: (cls = '') =>
    `<svg class="${cls}" viewBox="0 0 100 70" fill="none" stroke="currentColor" stroke-width="5"><ellipse cx="50" cy="14" rx="44" ry="11"/><ellipse cx="50" cy="35" rx="44" ry="11"/><ellipse cx="50" cy="56" rx="44" ry="11"/></svg>`,
};
const sparkle = (cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C12.9 7.5 16.5 11.1 24 12C16.5 12.9 12.9 16.5 12 24C11.1 16.5 7.5 12.9 0 12C7.5 11.1 11.1 7.5 12 0Z"/></svg>`;
const sparkleOutline = (cls = '') =>
  `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"><path d="M12 0l2.2 8.8L23 12l-8.8 2.2L12 23l-2.2-8.8L1 12l8.8-2.2z"/></svg>`;

const pages = [];
const addPage = (className, body, { footer = true } = {}) => {
  const number = pages.length + 1;
  pages.push(
    `<section class="page ${className}">${body}${
      footer ? `<footer class="pf"><span>${esc(settings.name)} — Portfolio</span><span>${pad(number)}</span></footer>` : ''
    }</section>`,
  );
};

// 1. Capa
const [titleLead, titleRest = ''] = settings.heroAccentWord
  ? settings.heroTitle.split(settings.heroAccentWord)
  : [settings.heroTitle];
addPage(
  'cover',
  `
  <div class="cover-top"><span class="logo">${esc(settings.name)}</span><span>Portfolio ${new Date().getFullYear()}</span></div>
  <svg class="shape shape-blob" viewBox="0 0 100 100" fill="currentColor"><circle cx="50" cy="50" r="48"/></svg>
  ${shapes.burst('shape shape-star-indigo')}
  ${shapes.burst('shape shape-star-lime')}
  ${sparkleOutline('shape shape-sparkle-a')}
  ${sparkleOutline('shape shape-sparkle-b')}
  <svg class="shape shape-squiggle" viewBox="0 0 140 60" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round"><path d="M4 40C22 8 40 8 58 30S94 52 112 22 130 6 136 14"/></svg>
  <svg class="shape shape-spiral" viewBox="0 0 100 70" fill="none" stroke="currentColor" stroke-width="2.4"><ellipse cx="50" cy="14" rx="46" ry="12"/><ellipse cx="50" cy="34" rx="46" ry="12"/><ellipse cx="50" cy="54" rx="46" ry="12"/></svg>
  <div class="shape shape-dot shape-dot-1"></div><div class="shape shape-dot shape-dot-2"></div>
  <div class="shape shape-dot shape-dot-3"></div><div class="shape shape-dot shape-dot-4"></div>
  <div class="cover-inner">
    <h1>${
      settings.heroAccentWord
        ? `<span class="lead">${esc(titleLead.trimEnd())}</span><br><span class="accent-text">${esc(settings.heroAccentWord)}</span>${esc(titleRest)}`
        : esc(settings.heroTitle)
    }</h1>
    ${settings.heroSubtitle ? `<p class="cover-sub">${esc(settings.heroSubtitle)}</p>` : ''}
  </div>`,
  { footer: false },
);

// 2. Sobre
addPage(
  'about',
  `
  ${settings.aboutLead ? `<p class="about-lead">${esc(settings.aboutLead)}</p>` : ''}
  <div class="stat-row">${(settings.highlights || [])
    .map(
      (h, i) =>
        `${i > 0 ? sparkle('stat-star') : ''}<div class="stat"><div class="stat-num">${esc(h.value)}</div><div class="stat-label">${esc(h.label)}</div></div>`,
    )
    .join('')}</div>
  <div class="whatido-row">
    <span class="whatido-label">What I do</span>
    <div class="whatido-cards">${categories
      .map(
        (group) =>
          `<div class="whatido-card"><h3>${esc(group.title)}</h3><ul>${group.items
            .map((item) => `<li>${esc(item)}</li>`)
            .join('')}</ul>${shapes[group.shape]('whatido-shape')}</div>`,
      )
      .join('')}</div>
  </div>`,
);

// 3. Processo de design
const processShapes = ['burst', 'flower', 'spiral'];
addPage(
  'process',
  `
  <div class="side-head">
    <h2><span class="lead">My design</span><br><span class="accent-text">process</span></h2>
    ${shapes.flower('services-shape')}
  </div>
  <ol class="services-list">${PROCESS_STEPS.map(
    (step, i) =>
      `<li><span class="service-num">${pad(i + 1)}</span><div class="service-text"><h3>${esc(step)}</h3></div><span class="service-badge">${shapes[processShapes[i % processShapes.length]]()}</span></li>`,
  ).join('')}</ol>`,
);

// 4+. Projetos — uma página cada: texto na metade esquerda, fotos na direita
projects.forEach((project) => {
  const category = categories.find((c) => c.id === project.category);
  const shape = category?.shape ?? 'burst';
  const meta = [
    { label: 'Client', value: project.client },
    { label: 'Company', value: project.company },
    { label: 'Year', value: project.year },
    { label: 'Role', value: project.role },
    { label: 'Tools', value: project.tools },
  ].filter((item) => item.value);
  const description = (project.description || []).filter((block) => typeof block === 'string');
  if (OWN_3D_COMPANIES.includes(developedAt(project))) description.push(OWN_3D_SENTENCE);
  const photos = (project.galleryUrls?.length ? project.galleryUrls : [project.coverUrl]).filter(Boolean).slice(0, MAX_PHOTOS);

  addPage(
    `project cat-${project.category}`,
    `
    <div class="pd-text">
      <div class="pd-main">
        <div class="pd-cat"><span class="row-badge">${shapes[shape]()}</span>${esc(category?.title ?? project.category)}</div>
        <h1>${esc(project.title)}</h1>
        ${
          meta.length
            ? `<dl class="pd-meta">${meta.map((item) => `<div><dt>${item.label}</dt><dd>${esc(item.value)}</dd></div>`).join('')}</dl>`
            : ''
        }
        <div class="pd-description">${description.map((paragraph) => `<p>${esc(paragraph)}</p>`).join('')}</div>
      </div>
      <p class="pd-note">${esc(rightsNote(project))}</p>
    </div>
    <div class="gallery"${HERO_FIRST_PHOTO.includes(project.slug) ? ' data-layout="hero"' : ''}>${photos.map((url) => `<img src="${asset(url)}" alt="">`).join('')}</div>`,
  );
});

// Contato — só mostra redes que já têm um link de verdade
const socialLinks = (settings.socialLinks || []).filter((link) => link.url && link.url !== '#');
addPage(
  'cta',
  `
  ${shapes.burst('shape cta-burst')}${shapes.flower('shape cta-flower')}${shapes.spiral('shape cta-spiral')}
  ${sparkle('shape cta-sparkle-a')}${sparkle('shape cta-sparkle-b')}
  <div class="cta-inner">
    <h2><span class="lead">Let's create</span><br><span class="accent-text">something together</span></h2>
    <p class="cta-sub">Open to new projects, partnerships and creative collaborations.</p>
    <a class="cta-email" href="mailto:${esc(settings.email)}"><span>${esc(settings.email)}</span><span class="cta-email-arrow"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M8 7h9v9"/></svg></span></a>
    ${
      socialLinks.length
        ? `<ul class="cta-social">${socialLinks.map((link) => `<li><a href="${esc(link.url)}">${esc(link.label)}</a></li>`).join('')}</ul>`
        : ''
    }
  </div>`,
  { footer: false },
);

const css = `
@page{ size:297mm 210mm; margin:0; }
:root{
  --bg:#FBF7F1; --surface:#FFFFFF; --ink:#1E1A2B; --ink-soft:#726C82; --line:#EAE3D8;
  --shape-indigo:#7774FF; --shape-lime:#e2f164; --shape-lavender:#EAC5F8;
  --radius-lg:28px;
}
*{ box-sizing:border-box; -webkit-print-color-adjust:exact; print-color-adjust:exact; }
html,body{ margin:0; padding:0; }
body{ background:var(--bg); color:var(--ink); font-family:'Inter',-apple-system,sans-serif; line-height:1.5; -webkit-font-smoothing:antialiased; }
h1,h2,h3{ font-family:'Space Grotesk','Inter',sans-serif; font-weight:700; line-height:1.08; margin:0; letter-spacing:-0.01em; }
p,ul,ol,dl,dd{ margin:0; padding:0; } ul,ol{ list-style:none; } a{ color:inherit; text-decoration:none; } img{ display:block; }
.accent-text{ color:var(--shape-indigo); font-family:'IBM Plex Serif',serif; font-style:italic; font-weight:600; display:inline-block; font-size:1.3em; letter-spacing:.05em; }
.lead{ font-family:'Noto Sans','Inter',sans-serif; font-weight:400; }

.page{ position:relative; width:297mm; height:210mm; overflow:hidden; break-after:page; background:var(--bg); padding:56px 64px 64px; }
.page:last-child{ break-after:auto; }
.pf{ position:absolute; left:64px; right:64px; bottom:24px; display:flex; justify-content:space-between; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:11px; letter-spacing:.04em; color:var(--ink-soft); }
.shape{ position:absolute; }
.cat-toys{ --cat:var(--shape-lavender); --cat-shape:var(--shape-lime); }
.cat-accessories{ --cat:var(--shape-lime); --cat-shape:var(--shape-indigo); }
.cat-home{ --cat:var(--shape-indigo); --cat-shape:var(--shape-lime); }
.row-badge{ width:42px; height:42px; border-radius:50%; flex-shrink:0; display:flex; align-items:center; justify-content:center; background:var(--cat); color:var(--cat-shape); }
.row-badge svg{ width:22px; }

/* Capa */
.cover{ display:flex; align-items:center; justify-content:center; }
.cover-top{ position:absolute; top:40px; left:64px; right:64px; display:flex; justify-content:space-between; align-items:center; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:14px; color:var(--ink-soft); z-index:1; }
.cover-top .logo{ font-weight:700; font-size:19px; color:var(--ink); }
.cover-inner{ position:relative; z-index:1; text-align:center; max-width:860px; }
.cover h1{ font-size:84px; }
.cover-sub{ margin:44px auto 0; font-size:18px; color:var(--ink-soft); max-width:480px; }
.shape-blob{ width:180px; top:92px; left:4%; color:var(--shape-lavender); opacity:.9; }
.shape-star-indigo{ width:200px; top:13%; right:7%; color:var(--shape-indigo); opacity:.95; transform:rotate(6deg); }
.shape-star-lime{ width:52px; bottom:18%; left:9%; color:var(--shape-lime); transform:rotate(-10deg); }
.shape-sparkle-a{ width:26px; top:27%; left:27%; color:var(--ink); opacity:.5; }
.shape-sparkle-b{ width:20px; bottom:24%; right:15%; color:var(--ink); opacity:.45; }
.shape-squiggle{ width:340px; bottom:5%; right:1%; color:var(--shape-lime); opacity:.9; transform:rotate(-6deg); }
.shape-spiral{ width:170px; bottom:17%; left:11%; color:var(--shape-indigo); opacity:.4; }
.shape-dot{ border-radius:50%; }
.shape-dot-1{ width:12px; height:12px; top:19%; left:21%; background:var(--shape-indigo); }
.shape-dot-2{ width:9px; height:9px; top:14%; right:26%; background:var(--shape-lime); }
.shape-dot-3{ width:14px; height:14px; bottom:31%; right:8%; background:var(--shape-lavender); }
.shape-dot-4{ width:8px; height:8px; bottom:9%; left:27%; background:var(--shape-indigo); }

/* Sobre */
.about{ background:var(--shape-indigo); padding-top:72px; }
.about .pf{ color:rgba(255,255,255,.7); }
.about-lead{ max-width:860px; font-size:20px; color:rgba(255,255,255,.9); text-align:center; margin:0 auto; }
.stat-row{ margin-top:44px; display:flex; gap:44px; align-items:center; justify-content:center; }
.stat{ display:flex; flex-direction:column; align-items:center; text-align:center; }
.stat-star{ width:30px; height:30px; flex-shrink:0; color:var(--shape-lime); }
.stat-num{ font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:60px; line-height:1; color:#fff; }
.stat-label{ font-size:15px; color:rgba(255,255,255,.78); margin-top:2px; max-width:140px; }
.whatido-row{ margin-top:60px; display:flex; gap:44px; align-items:stretch; }
.whatido-label{ writing-mode:vertical-rl; transform:rotate(180deg); display:flex; align-items:center; justify-content:center; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:46px; line-height:1; letter-spacing:.02em; text-transform:uppercase; color:#fff; white-space:nowrap; flex-shrink:0; }
.whatido-cards{ flex:1; display:grid; grid-template-columns:repeat(3,1fr); gap:20px; align-items:start; }
.whatido-card{ border-radius:var(--radius-lg); padding:24px 26px; min-height:250px; display:flex; flex-direction:column; }
.whatido-card:nth-child(3n+1){ background:var(--shape-lavender); margin-top:28px; --shape-color:var(--shape-lime); }
.whatido-card:nth-child(3n+2){ background:var(--shape-lime); --shape-color:var(--shape-indigo); }
.whatido-card:nth-child(3n){ background:var(--bg); margin-top:48px; --shape-color:var(--shape-indigo); }
.whatido-card h3{ font-size:23px; text-transform:uppercase; letter-spacing:.02em; margin-bottom:12px; }
.whatido-card ul{ display:flex; flex-direction:column; gap:6px; margin-bottom:16px; }
.whatido-card li{ font-size:15px; color:rgba(30,26,43,.78); }
.whatido-shape{ width:68px; margin-top:auto; color:var(--shape-color); }

/* Processo — título fixo à esquerda, lista à direita */
.process{ display:grid; grid-template-columns:.72fr 1.5fr; gap:60px; align-items:center; }
.side-head h2{ font-size:54px; }
.services-shape{ width:120px; margin-top:44px; color:var(--shape-lavender); }
.services-list{ border-bottom:1.5px solid var(--ink); }
.services-list li{ border-top:1.5px solid var(--ink); display:grid; grid-template-columns:44px 1fr 52px; align-items:center; gap:20px; padding:19px 8px; }
.services-list li:nth-child(3n+1){ --row:var(--shape-lavender); --row-shape:var(--shape-indigo); }
.services-list li:nth-child(3n+2){ --row:var(--shape-lime); --row-shape:var(--shape-indigo); }
.services-list li:nth-child(3n){ --row:var(--shape-indigo); --row-shape:var(--shape-lime); }
.service-num{ font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:14px; color:var(--ink-soft); }
.service-text h3{ font-size:25px; text-transform:uppercase; letter-spacing:.02em; }
.service-badge{ width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:var(--row); color:var(--row-shape); }
.service-badge svg{ width:26px; }

/* Projeto — texto até o meio da página, fotos do outro lado (dimensionadas pelo script no fim do HTML) */
.project{ display:grid; grid-template-columns:400px 1fr; grid-template-rows:100%; gap:56px; }
.pd-text{ display:flex; flex-direction:column; min-height:0; }
.pd-main{ margin:auto 0; }
.pd-cat{ display:flex; align-items:center; gap:12px; font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:14px; text-transform:uppercase; letter-spacing:.04em; }
.project h1{ font-size:46px; line-height:1.02; margin-top:22px; }
.pd-meta{ margin-top:22px; display:flex; flex-wrap:wrap; gap:8px 22px; }
.pd-meta div{ border-top:1px solid var(--ink); padding:6px 0 0; }
.pd-meta dt{ font-size:9px; text-transform:uppercase; letter-spacing:.06em; color:var(--ink-soft); }
.pd-meta dd{ margin-top:1px; font-family:'Space Grotesk',sans-serif; font-weight:600; font-size:12px; }
.pd-description{ margin-top:22px; }
.pd-description p{ font-size:13px; line-height:1.6; margin-bottom:9px; }
.pd-description p:last-child{ margin-bottom:0; }
.pd-note{ flex-shrink:0; margin-top:20px; padding-top:12px; border-top:1px solid var(--line); font-size:10.5px; line-height:1.5; color:var(--ink-soft); }
.gallery{ min-width:0; min-height:0; display:flex; flex-direction:column; align-items:center; justify-content:center; gap:12px; }
.gallery-row{ display:flex; gap:12px; }
.gallery-col{ display:flex; flex-direction:column; gap:12px; }
.gallery img{ border-radius:18px; background:var(--line); object-fit:cover; }

/* Contato */
.cta{ background:var(--ink); color:#fff; display:flex; align-items:center; justify-content:center; }
.cta-burst{ width:170px; top:90px; left:6%; color:var(--shape-indigo); transform:rotate(-8deg); }
.cta-flower{ width:130px; bottom:90px; right:8%; color:var(--shape-lavender); transform:rotate(10deg); }
.cta-spiral{ width:150px; bottom:70px; left:12%; color:var(--shape-lime); opacity:.5; transform:rotate(-12deg); }
.cta-sparkle-a{ width:28px; top:130px; right:20%; color:var(--shape-lime); }
.cta-sparkle-b{ width:18px; top:50%; left:19%; color:#fff; opacity:.6; }
.cta-inner{ position:relative; display:flex; flex-direction:column; align-items:center; text-align:center; }
.cta h2{ font-size:72px; color:#fff; }
.cta .accent-text{ color:var(--shape-lime); }
.cta-sub{ margin-top:32px; font-size:18px; color:rgba(255,255,255,.72); max-width:420px; }
.cta-email{ margin-top:40px; display:inline-flex; align-items:center; gap:16px; padding:8px 8px 8px 30px; border-radius:999px; background:var(--shape-lime); color:var(--ink); font-family:'Space Grotesk',sans-serif; font-weight:700; font-size:24px; }
.cta-email-arrow{ width:52px; height:52px; border-radius:50%; display:flex; align-items:center; justify-content:center; background:var(--ink); color:var(--shape-lime); }
.cta-email-arrow svg{ width:22px; height:22px; }
.cta-social{ margin-top:40px; display:flex; flex-wrap:wrap; justify-content:center; gap:10px; }
.cta-social a{ display:block; padding:10px 22px; border-radius:999px; border:1.5px solid rgba(255,255,255,.3); font-size:15px; font-weight:600; }
`;

// Encaixa as fotos de cada projeto num bloco sem cortar nenhuma. Testa fileiras
// de mesma largura e, com 3 fotos, uma grande ao lado de duas empilhadas;
// fica com o arranjo que ocupa a maior área (ou só com o da foto grande,
// quando a galeria pede data-layout="hero").
const galleryScript = `
window.addEventListener('load', () => {
  const GAP = 12;
  const sum = (list) => list.reduce((a, b) => a + b, 0);
  const el = (className, children) => {
    const node = document.createElement('div');
    node.className = className;
    node.append(...children);
    return node;
  };
  const size = (img, width, height) => {
    img.style.width = width + 'px';
    img.style.height = height + 'px';
    return img;
  };
  document.querySelectorAll('.gallery').forEach((gallery) => {
    const imgs = [...gallery.querySelectorAll('img')];
    if (!imgs.length) return;
    const W = gallery.clientWidth, H = gallery.clientHeight;
    const r = imgs.map((img) => img.naturalWidth / img.naturalHeight || 1);
    const options = [];

    const heroOnly = gallery.dataset.layout === 'hero' && imgs.length === 3;
    for (let k = 1; k <= imgs.length && !heroOnly; k++) {
      const rows = [[0, k], [k, imgs.length]].filter(([from, to]) => to > from);
      const rowHeight = (width, [from, to]) => (width - GAP * (to - from - 1)) / sum(r.slice(from, to));
      const heightAt = (width) => sum(rows.map((row) => rowHeight(width, row))) + GAP * (rows.length - 1);
      const slope = sum(rows.map(([from, to]) => 1 / sum(r.slice(from, to))));
      const width = heightAt(W) > H ? (H - heightAt(0)) / slope : W;
      options.push({
        area: width * heightAt(width),
        build: () => rows.map((row) => {
          const height = rowHeight(width, row);
          return el('gallery-row', imgs.slice(...row).map((img, i) => size(img, height * r[row[0] + i], height)));
        }),
      });
    }

    if (imgs.length === 3) {
      const stack = 1 / r[1] + 1 / r[2];
      let side = (W - GAP - GAP * r[0]) / (1 + r[0] * stack);
      let height = side * stack + GAP;
      if (height > H) { height = H; side = (H - GAP) / stack; }
      options.push({
        area: (height * r[0] + GAP + side) * height,
        build: () => [el('gallery-row', [
          size(imgs[0], height * r[0], height),
          el('gallery-col', imgs.slice(1).map((img, i) => size(img, side, side / r[i + 1]))),
        ])],
      });
    }

    const best = options.reduce((a, b) => (b.area > a.area ? b : a));
    gallery.replaceChildren(...best.build());
  });
});
`;

const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${esc(settings.name)} — Portfolio</title>
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@500;600;700&family=Inter:wght@400;500;600&family=Noto+Sans:wght@400;500;600;700&family=IBM+Plex+Serif:ital,wght@1,600&display=swap" rel="stylesheet">
<style>${css}</style>
</head>
<body>
${pages.join('\n')}
<script>${galleryScript}</script>
</body>
</html>`;

const htmlPath = join(mkdtempSync(join(tmpdir(), 'portfolio-pdf-')), 'portfolio.html');
writeFileSync(htmlPath, html);

execFileSync(
  chrome,
  [
    '--headless=new',
    '--disable-gpu',
    '--no-pdf-header-footer',
    '--virtual-time-budget=15000',
    `--print-to-pdf=${output}`,
    pathToFileURL(htmlPath).href,
  ],
  { stdio: ['ignore', 'ignore', 'inherit'] },
);

console.log(`${pages.length} páginas → ${output}`);
console.log(`HTML intermediário: ${htmlPath}`);

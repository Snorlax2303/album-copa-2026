/**
 * data-novo.js — Dataset EXPANDIDO do Álbum Copa do Mundo 2026
 *
 * Compatível 100% com a API original do data.js:
 *   window.AlbumCopa.data = { figurinhas, grupos, posicoes, raridades, estados, total, categorias }
 *
 * Composição:
 *   - 573 figurinhas de jogadores/técnicos (48 seleções × ~11)
 *   - 103 figurinhas especiais (mascotes, estádios, cidades, bola, troféu, lendas, bandeiras)
 *   - Total: 676 figurinhas
 *
 * Novidades vs. data.js:
 *   - 48 seleções com 10–12 figurinhas cada
 *   - 7 novas categorias: 'mascote', 'estadio', 'cidade', 'selecao', 'bola', 'trofeu', 'legenda'
 *   - 20 lendas históricas lendárias
 *   - gerarImagem() com layout holográfico diferenciado para cards especiais
 */

(function (global) {
  'use strict';

  // ============================================================
  // BANDEIRAS — 48 seleções da Copa 2026
  // ============================================================
  const BANDEIRAS = {
    'Brasil': { cores: ["#009C3B","#FFDF00","#002776"], tipo: 'faixas-h' },
    'Argentina': { cores: ["#74ACDF","#FFFFFF","#74ACDF"], tipo: 'faixas-h' },
    'Uruguai': { cores: ["#FFFFFF","#0038A8","#FFFFFF"], tipo: 'faixas-h' },
    'Colômbia': { cores: ["#FCD116","#003893","#CE1126"], tipo: 'faixas-h' },
    'Equador': { cores: ["#FFD100","#0033A0","#EF3340"], tipo: 'faixas-h' },
    'Paraguai': { cores: ["#D52B1E","#FFFFFF","#0038A8"], tipo: 'faixas-h' },
    'Chile': { cores: ["#FFFFFF","#D52B1E","#0033A0"], tipo: 'faixas-h' },
    'Peru': { cores: ["#D91023","#FFFFFF","#D91023"], tipo: 'faixas-v' },
    'França': { cores: ["#0055A4","#FFFFFF","#EF4135"], tipo: 'faixas-v' },
    'Inglaterra': { cores: ["#FFFFFF","#C8102E","#FFFFFF"], tipo: 'cruz' },
    'Espanha': { cores: ["#AA151B","#F1BF00","#AA151B"], tipo: 'faixas-h' },
    'Alemanha': { cores: ["#000000","#DD0000","#FFCE00"], tipo: 'faixas-h' },
    'Portugal': { cores: ["#006600","#FF0000","#FFFF00"], tipo: 'faixas-v' },
    'Holanda': { cores: ["#AE1C28","#FFFFFF","#21468B"], tipo: 'faixas-h' },
    'Bélgica': { cores: ["#000000","#FAE042","#ED2939"], tipo: 'faixas-v' },
    'Croácia': { cores: ["#FF0000","#FFFFFF","#171796"], tipo: 'faixas-h' },
    'Dinamarca': { cores: ["#C8102E","#FFFFFF","#C8102E"], tipo: 'cruz' },
    'Suíça': { cores: ["#FF0000","#FFFFFF","#FF0000"], tipo: 'cruz' },
    'Polônia': { cores: ["#FFFFFF","#FFFFFF","#DC143C"], tipo: 'faixas-h' },
    'Ucrânia': { cores: ["#0057B7","#0057B7","#FFD700"], tipo: 'faixas-h' },
    'Turquia': { cores: ["#E30A17","#FFFFFF","#E30A17"], tipo: 'circulo' },
    'Áustria': { cores: ["#ED2939","#FFFFFF","#ED2939"], tipo: 'faixas-h' },
    'Tchéquia': { cores: ["#FFFFFF","#D7141A","#11457E"], tipo: 'triangulo' },
    'Sérvia': { cores: ["#C7363D","#0C4076","#FFFFFF"], tipo: 'faixas-h' },
    'Eslováquia': { cores: ["#FFFFFF","#0B4EA2","#EE1C25"], tipo: 'faixas-h' },
    'Noruega': { cores: ["#EF2B2D","#FFFFFF","#002868"], tipo: 'cruz' },
    'Escócia': { cores: ["#0065BD","#FFFFFF","#0065BD"], tipo: 'diagonal' },
    'País de Gales': { cores: ["#FFFFFF","#D30731","#FFFFFF"], tipo: 'cruz' },
    'Irlanda': { cores: ["#169B62","#FFFFFF","#FF883E"], tipo: 'faixas-v' },
    'Grécia': { cores: ["#0D5EAF","#FFFFFF","#0D5EAF"], tipo: 'faixas-h' },
    'Israel': { cores: ["#FFFFFF","#0038B8","#FFFFFF"], tipo: 'faixas-h' },
    'Marrocos': { cores: ["#C1272D","#C1272D","#C1272D"], tipo: 'circulo' },
    'Senegal': { cores: ["#00853F","#FDEF42","#E31B23"], tipo: 'faixas-v' },
    'Gana': { cores: ["#CE1126","#FCD116","#006B3F"], tipo: 'faixas-h' },
    'Tunísia': { cores: ["#E70013","#FFFFFF","#E70013"], tipo: 'circulo' },
    'Camarões': { cores: ["#007A5E","#CE1126","#FCD116"], tipo: 'faixas-v' },
    'Egito': { cores: ["#CE1126","#FFFFFF","#000000"], tipo: 'faixas-h' },
    'Nigéria': { cores: ["#008751","#FFFFFF","#008751"], tipo: 'faixas-v' },
    'Japão': { cores: ["#FFFFFF","#BC002D","#FFFFFF"], tipo: 'circulo' },
    'Irã': { cores: ["#239F40","#FFFFFF","#DA0000"], tipo: 'faixas-h' },
    'Arábia Saudita': { cores: ["#006C35","#006C35","#006C35"], tipo: 'faixas-h' },
    'Catar': { cores: ["#8A1538","#FFFFFF","#8A1538"], tipo: 'diagonal' },
    'Jordânia': { cores: ["#000000","#FFFFFF","#007A3D"], tipo: 'faixas-h' },
    'Iraque': { cores: ["#CE1126","#FFFFFF","#000000"], tipo: 'faixas-h' },
    'Uzbequistão': { cores: ["#1EB53A","#FFFFFF","#0099B5"], tipo: 'faixas-h' },
    'Coreia do Sul': { cores: ["#FFFFFF","#CD2E3A","#0047A0"], tipo: 'circulo' },
    'Austrália': { cores: ["#012169","#FFFFFF","#E4002B"], tipo: 'crux' },
    'Canadá': { cores: ["#FF0000","#FFFFFF","#FF0000"], tipo: 'faixas-v' },
    'EUA': { cores: ["#B22234","#FFFFFF","#3C3B6E"], tipo: 'listras' },
    'México': { cores: ["#006847","#FFFFFF","#CE1126"], tipo: 'faixas-v' },
    'Nova Zelândia': { cores: ["#012169","#FFFFFF","#C8102E"], tipo: 'crux' },
    'Costa Rica': { cores: ["#002B7F","#FFFFFF","#CE1126"], tipo: 'faixas-h' },
    'Panamá': { cores: ["#FFFFFF","#FFFFFF","#DA121A"], tipo: 'faixas-h' },
    'Honduras': { cores: ["#0073CF","#0073CF","#0073CF"], tipo: 'faixas-h' },
    'Jamaica': { cores: ["#009B3A","#000000","#FED100"], tipo: 'diagonal' },
    'Itália': { cores: ["#009246","#FFFFFF","#CE2B37"], tipo: 'faixas-v' }
  };

  const CORES_PADRAO = ['#2E7D32', '#FFB300', '#1565C0'];

  // ============================================================
  // Mapeamento categoria -> ícone temático
  // ============================================================
  const ICONES_CATEGORIA = {
    bola:    '⚽',
    trofeu:  '🏆',
    estadio: '🏟️',
    cidade:  '📍',
    mascote: '👕',
    legenda: '👑',
    selecao: '🚩'
  };

  // Labels legíveis por categoria
  const LABELS_CATEGORIA = {
    jogador: 'JOGADOR',
    tecnico: 'TÉCNICO',
    mascote: 'MASCOTE',
    estadio: 'ESTÁDIO',
    cidade:  'CIDADE-SEDE',
    selecao: 'SELEÇÃO',
    bola:    'BOLA OFICIAL',
    trofeu:  'TROFÉU',
    legenda: 'LENDA'
  };

  // ============================================================
  // Geração de SVG inline (data URI) — jogador/técnico
  // ============================================================
  function gerarBandeiraSvg(cores, tipo) {
    if (tipo === 'faixas-h') {
      const h = 100 / 3;
      return [
        `<rect x="0" y="0" width="100" height="${h}" fill="${cores[0]}"/>`,
        `<rect x="0" y="${h}" width="100" height="${h}" fill="${cores[1]}"/>`,
        `<rect x="0" y="${2 * h}" width="100" height="${h}" fill="${cores[2]}"/>`
      ].join('');
    }
    if (tipo === 'faixas-v') {
      const w = 100 / 3;
      return [
        `<rect x="0" y="0" width="${w}" height="100" fill="${cores[0]}"/>`,
        `<rect x="${w}" y="0" width="${w}" height="100" fill="${cores[1]}"/>`,
        `<rect x="${2 * w}" y="0" width="${w}" height="100" fill="${cores[2]}"/>`
      ].join('');
    }
    if (tipo === 'listras') {
      let s = '';
      for (let i = 0; i < 7; i++) {
        s += `<rect x="0" y="${i * 100 / 7}" width="100" height="${100 / 7}" fill="${i % 2 === 0 ? cores[0] : cores[1]}"/>`;
      }
      return s;
    }
    if (tipo === 'cruz') {
      return [
        `<rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>`,
        `<rect x="40" y="0" width="20" height="100" fill="${cores[1]}"/>`,
        `<rect x="0" y="40" width="100" height="20" fill="${cores[1]}"/>`
      ].join('');
    }
    if (tipo === 'circulo') {
      return [
        `<rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>`,
        `<circle cx="50" cy="50" r="28" fill="${cores[1]}"/>`
      ].join('');
    }
    if (tipo === 'diagonal') {
      return [
        `<rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>`,
        `<polygon points="0,0 100,0 100,100" fill="${cores[1]}"/>`
      ].join('');
    }
    if (tipo === 'triangulo') {
      return [
        `<rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>`,
        `<polygon points="0,0 50,50 0,100" fill="${cores[1]}"/>`,
        `<polygon points="0,50 50,50 25,75" fill="${cores[2]}"/>`
      ].join('');
    }
    if (tipo === 'crux') {
      return [
        `<rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>`,
        `<rect x="0" y="40" width="100" height="6" fill="${cores[1]}"/>`,
        `<rect x="47" y="0" width="6" height="100" fill="${cores[1]}"/>`,
        `<polygon points="0,0 18,0 0,18" fill="${cores[1]}"/>`,
        `<polygon points="100,0 82,0 100,18" fill="${cores[1]}"/>`,
        `<polygon points="0,100 18,100 0,82" fill="${cores[1]}"/>`,
        `<polygon points="100,100 82,100 100,82" fill="${cores[1]}"/>`
      ].join('');
    }
    // fallback
    const h = 100 / 3;
    return [
      `<rect x="0" y="0" width="100" height="${h}" fill="${cores[0]}"/>`,
      `<rect x="0" y="${h}" width="100" height="${h}" fill="${cores[1]}"/>`,
      `<rect x="0" y="${2 * h}" width="100" height="${h}" fill="${cores[2]}"/>`
    ].join('');
  }

  function gerarBandeiraFig(cores, tipo) {
    const inner = gerarBandeiraSvg(cores, tipo);
    return [
      `<rect x="0" y="0" width="160" height="100" fill="#FFFFFF" stroke="#000" stroke-width="0.5"/>`,
      `<g transform="translate(30, 0) scale(1, 1)">${inner}</g>`
    ].join('');
  }

  // ============================================================
  // Geração de SVG inline (data URI) — CARDS ESPECIAIS
  // ============================================================
  function gerarImagemEspecial(fig) {
    const isLendaria = fig.raridade === 'lendaria';
    const icone = ICONES_CATEGORIA[fig.categoria] || '⭐';
    const label = LABELS_CATEGORIA[fig.categoria] || fig.categoria.toUpperCase();
    const corDestaque = isLendaria ? '#FFD700' : '#C0C0C0';

    // Moldura holográfica para lendária, prata metálica para rara
    const molduraGrad = isLendaria
      ? `<linearGradient id="holo-${fig.id}" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%"  stop-color="#ff0080"/>
           <stop offset="20%" stop-color="#ff8c00"/>
           <stop offset="40%" stop-color="#ffd700"/>
           <stop offset="60%" stop-color="#00ff7f"/>
           <stop offset="80%" stop-color="#00bfff"/>
           <stop offset="100%" stop-color="#8a2be2"/>
         </linearGradient>`
      : `<linearGradient id="holo-${fig.id}" x1="0" y1="0" x2="1" y2="1">
           <stop offset="0%"  stop-color="#e8e8e8"/>
           <stop offset="50%" stop-color="#ffffff"/>
           <stop offset="100%" stop-color="#a8a8a8"/>
         </linearGradient>`;

    const fundoGrad = isLendaria
      ? `<radialGradient id="bg-${fig.id}" cx="0.5" cy="0.5" r="0.8">
           <stop offset="0%"  stop-color="#1a0033"/>
           <stop offset="100%" stop-color="#000000"/>
         </radialGradient>`
      : `<radialGradient id="bg-${fig.id}" cx="0.5" cy="0.5" r="0.8">
           <stop offset="0%"  stop-color="#1c1c2e"/>
           <stop offset="100%" stop-color="#0a0a14"/>
         </radialGradient>`;

    // Para 'selecao' (bandeira), desenhamos a bandeira
    let corpoEspecial = '';
    if (fig.categoria === 'selecao') {
      const b = BANDEIRAS[fig.selecao];
      const cores = b ? b.cores : CORES_PADRAO;
      const tipo = b ? b.tipo : 'faixas-h';
      corpoEspecial = [
        `<g transform="translate(40, 100)">`,
        gerarBandeiraFig(cores, tipo),
        `</g>`
      ].join('');
    } else {
      // Ícone grande central
      corpoEspecial = [
        `<text x="100" y="155" font-size="80" text-anchor="middle" fill="${isLendaria ? '#FFD700' : '#FFFFFF'}" filter="url(#shadow-${fig.id})">${icone}</text>`
      ].join('');
    }

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    ${fundoGrad}
    ${molduraGrad}
    <filter id="shadow-${fig.id}" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="2"/>
      <feOffset dx="0" dy="2" result="offsetblur"/>
      <feFlood flood-color="#000" flood-opacity="0.6"/>
      <feComposite in2="offsetblur" operator="in"/>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>

  <!-- fundo escuro -->
  <rect x="0" y="0" width="200" height="280" fill="url(#bg-${fig.id})"/>

  <!-- moldura holográfica -->
  <rect x="6" y="6" width="188" height="268" fill="none" stroke="url(#holo-${fig.id})" stroke-width="3" rx="6"/>

  <!-- número no canto superior -->
  <rect x="10" y="10" width="50" height="28" rx="4" fill="#000" stroke="${corDestaque}" stroke-width="1"/>
  <text x="35" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold"
        fill="${corDestaque}" text-anchor="middle">${fig.numero}</text>

  <!-- selo de raridade -->
  ${isLendaria
    ? `<circle cx="180" cy="24" r="10" fill="#FFD700" stroke="#000" stroke-width="1"/>
       <text x="180" y="28" font-family="Arial" font-size="10" text-anchor="middle" fill="#000" font-weight="bold">★</text>`
    : `<circle cx="180" cy="24" r="10" fill="#C0C0C0" stroke="#000" stroke-width="1"/>
       <text x="180" y="28" font-family="Arial" font-size="10" text-anchor="middle" fill="#000" font-weight="bold">◆</text>`}

  <!-- faixa de categoria -->
  <rect x="20" y="48" width="160" height="22" rx="4" fill="#000" stroke="${corDestaque}" stroke-width="1"/>
  <text x="100" y="63" font-family="Arial, sans-serif" font-size="11" font-weight="bold"
        fill="${corDestaque}" text-anchor="middle">${escapeXml(label)}</text>

  <!-- corpo especial (bandeira ou ícone) -->
  ${corpoEspecial}

  <!-- nome em destaque -->
  <text x="100" y="225" font-family="Arial, sans-serif" font-size="14" font-weight="bold"
        fill="#FFFFFF" text-anchor="middle" filter="url(#shadow-${fig.id})">${escapeXml(truncar(fig.nome, 22))}</text>

  <!-- sub-rodapé -->
  <text x="100" y="252" font-family="Arial, sans-serif" font-size="9"
        fill="${corDestaque}" text-anchor="middle" opacity="0.85">${fig.categoria === 'selecao' ? escapeXml(fig.selecao) : 'FIFA WORLD CUP 2026'}</text>
</svg>`.trim();

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // ============================================================
  // Geração de ESCUDO (bandeira estilizada em formato de escudo)
  // viewBox 100x120, path clássico: topo redondo, base em V
  // ============================================================
  function gerarEscudo(cores, tipo) {
    // Path do escudo (clássico heráldico)
    const pathEscudo = 'M 8 12 Q 8 8 12 8 L 88 8 Q 92 8 92 12 L 92 68 Q 92 92 50 112 Q 8 92 8 68 Z';
    const clipId = 'escudo-clip-' + Math.random().toString(36).slice(2, 9);

    // Borda dourada dupla (efeito brasão)
    const borda = `
      <path d="${pathEscudo}" fill="none" stroke="#1a1a1a" stroke-width="2"/>
      <path d="${pathEscudo}" fill="none" stroke="#d4af37" stroke-width="0.5"/>
    `;

    // Banner embaixo
    const banner = `
      <g transform="translate(50, 102)">
        <path d="M -24 0 L 24 0 L 20 8 L -20 8 Z" fill="#1a1a1a" stroke="#d4af37" stroke-width="0.5"/>
        <circle cx="-24" cy="4" r="1.8" fill="#d4af37"/>
        <circle cx="24" cy="4" r="1.8" fill="#d4af37"/>
      </g>
    `;

    return `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 120" width="100" height="120">
  <defs>
    <clipPath id="${clipId}">
      <path d="${pathEscudo}"/>
    </clipPath>
    <filter id="escudo-shadow-${clipId}" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="1.5" stdDeviation="1.2" flood-opacity="0.4"/>
    </filter>
  </defs>
  <g filter="url(#escudo-shadow-${clipId})">
    <g clip-path="url(#${clipId})">
      <rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>
      <g transform="translate(0, 0)">${gerarBandeiraSvg(cores, tipo)}</g>
    </g>
    ${borda}
    ${banner}
  </g>
</svg>`.trim();
  }

  // ============================================================
  // Geração de SVG inline (data URI) — JOGADOR / TÉCNICO
  // ============================================================
  function gerarImagemJogador(fig) {
    const bandeira = BANDEIRAS[fig.selecao];
    const cores = bandeira ? bandeira.cores : CORES_PADRAO;
    const tipo = bandeira ? bandeira.tipo : 'faixas-h';
    const inner = gerarEscudo(cores, tipo);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <defs>
    <linearGradient id="bg-${fig.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1b5e20"/>
      <stop offset="100%" stop-color="#062b0a"/>
    </linearGradient>
  </defs>

  <!-- Fundo escuro com gradiente -->
  <rect x="0" y="0" width="200" height="280" fill="url(#bg-${fig.id})"/>

  <!-- Moldura fina -->
  <rect x="3" y="3" width="194" height="274" fill="none" stroke="#2a2a2f" stroke-width="1"/>

  <!-- Número grande estilo Panini -->
  <rect x="10" y="10" width="180" height="36" rx="2" fill="#0a3d0a" stroke="#FFDF00" stroke-width="1"/>
  <text x="100" y="35" font-family="Inter, sans-serif" font-size="20" font-weight="800"
        fill="#FFDF00" text-anchor="middle" letter-spacing="2">${fig.numero}</text>

  <!-- Banner da bandeira (escudo) central -->
  <g transform="translate(50, 65) scale(1, 1)">${inner}</g>

  <!-- Nome do jogador embaixo -->
  <text x="100" y="220" font-family="Inter, sans-serif" font-size="14" font-weight="700"
        fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.3">${escapeXml(truncar(fig.nome, 20))}</text>

  <!-- Seleção -->
  <text x="100" y="242" font-family="Inter, sans-serif" font-size="9" font-weight="500"
        fill="#9A9A9F" text-anchor="middle" letter-spacing="1" text-transform="uppercase">${escapeXml(fig.selecao || '')}</text>

  <!-- Posição -->
  ${fig.posicao && fig.posicao !== 'ESP' ? `<text x="100" y="260" font-family="Inter, sans-serif" font-size="8" font-weight="600" fill="#5A5A60" text-anchor="middle" letter-spacing="2">${fig.posicao}</text>` : ''}

  <!-- Raridade -- selo simples -->
  ${fig.raridade === 'lendaria'
    ? `<circle cx="180" cy="18" r="8" fill="#FFDF00" stroke="#000" stroke-width="1"/>
       <text x="180" y="22" font-family="Inter, sans-serif" font-size="10" text-anchor="middle" fill="#000" font-weight="900">★</text>`
    : fig.raridade === 'rara'
    ? `<circle cx="180" cy="18" r="8" fill="#C0C0C0" stroke="#000" stroke-width="1"/>
       <text x="180" y="22" font-family="Inter, sans-serif" font-size="9" text-anchor="middle" fill="#000" font-weight="700">◆</text>`
    : ''}
</svg>`.trim();

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
  }

  // Dispatcher principal
  function gerarImagem(fig) {
    if (fig.categoria === 'jogador' || fig.categoria === 'tecnico') {
      return gerarImagemJogador(fig);
    }
    return gerarImagemEspecial(fig);
  }

  function truncar(str, max) {
    return str.length > max ? str.slice(0, max - 1) + '…' : str;
  }

  function escapeXml(str) {
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }

  // ============================================================
  // DATASET PRINCIPAL
  // ============================================================
      const FIGURINHAS_BASE = [
    {"id":"fig-001","numero":1,"nome":"Panini Logo","selecao":"Panini","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-002","numero":2,"nome":"Official Emblem1","selecao":"Copa 2026","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-003","numero":3,"nome":"Official Emblem2","selecao":"Copa 2026","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-004","numero":4,"nome":"Official Mascots","selecao":"Copa 2026","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-005","numero":5,"nome":"Official Slogan","selecao":"Copa 2026","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-006","numero":6,"nome":"Official Ball","selecao":"Copa 2026","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-007","numero":7,"nome":"Canada","selecao":"Cidades-Sede","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-008","numero":8,"nome":"Mexico","selecao":"Cidades-Sede","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-009","numero":9,"nome":"USA","selecao":"Cidades-Sede","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-010","numero":10,"nome":"Emblem","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-011","numero":11,"nome":"Luis Malagón","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-012","numero":12,"nome":"Johan Vasquez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-013","numero":13,"nome":"Jorge Sánchez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-014","numero":14,"nome":"Cesar Montes","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-015","numero":15,"nome":"Jesus Gallardo","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-016","numero":16,"nome":"Israel Reyes","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-017","numero":17,"nome":"Diego Lainez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-018","numero":18,"nome":"Carlos Rodriguez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-019","numero":19,"nome":"Edson Alvarez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-020","numero":20,"nome":"Orbelin Pineda","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-021","numero":21,"nome":"Marcel Ruiz","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-022","numero":22,"nome":"Team Photo","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-023","numero":23,"nome":"Érick Sánchez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-024","numero":24,"nome":"Hirving Lozano","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-025","numero":25,"nome":"Santiago Giménez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-026","numero":26,"nome":"Raúl Jiménez","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-027","numero":27,"nome":"Alexis Vega","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-028","numero":28,"nome":"Roberto Alvarado","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-029","numero":29,"nome":"Cesar Huerta","selecao":"México","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-030","numero":30,"nome":"Emblem","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-031","numero":31,"nome":"Ronwen Williams","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-032","numero":32,"nome":"Sipho Chaine","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-033","numero":33,"nome":"Aubrey Modiba","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-034","numero":34,"nome":"Samukele Kabini","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-035","numero":35,"nome":"Mbekezeli Mbokazi","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-036","numero":36,"nome":"Khulumani Ndamane","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-037","numero":37,"nome":"Siyabonga Ngezana","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-038","numero":38,"nome":"Khuliso Mudau","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-039","numero":39,"nome":"Nkosinathi Sibisi","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-040","numero":40,"nome":"Teboho Mokoena","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-041","numero":41,"nome":"Thalente Mbatha","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-042","numero":42,"nome":"Team Photo","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-043","numero":43,"nome":"Bathusi Aubaas","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-044","numero":44,"nome":"Yaya Sithole","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-045","numero":45,"nome":"Sipho Mbule","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-046","numero":46,"nome":"Lyle Foster","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-047","numero":47,"nome":"Iqraam Rayners","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-048","numero":48,"nome":"Mohau Nkota","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-049","numero":49,"nome":"Oswin Appollis","selecao":"África do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-050","numero":50,"nome":"Emblem","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-051","numero":51,"nome":"Hyeon-woo Jo","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-052","numero":52,"nome":"Seung-Gyu Kim","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-053","numero":53,"nome":"Min-jae Kim","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-054","numero":54,"nome":"Yu-min Cho","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-055","numero":55,"nome":"Young-woo Seol","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-056","numero":56,"nome":"Han-beom Lee","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-057","numero":57,"nome":"Tae-seok Lee","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-058","numero":58,"nome":"Myung-jae Lee","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-059","numero":59,"nome":"Jae-sung Lee","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-060","numero":60,"nome":"In-beom Hwang","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-061","numero":61,"nome":"Kang-in Lee","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-062","numero":62,"nome":"Team Photo","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-063","numero":63,"nome":"Seung-ho Paik","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-064","numero":64,"nome":"Jens Castrop","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-065","numero":65,"nome":"Dongg-yeong Lee","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-066","numero":66,"nome":"Gue-sung Cho","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-067","numero":67,"nome":"Heung-min Son","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-068","numero":68,"nome":"Hee-chan Hwang","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-069","numero":69,"nome":"Hyeon-Gyu Oh","selecao":"Coreia do Sul","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-070","numero":70,"nome":"Emblem","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-071","numero":71,"nome":"Matej Kovar","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-072","numero":72,"nome":"Jindrich Stanek","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-073","numero":73,"nome":"Ladislav Krejci","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-074","numero":74,"nome":"Vladimir Coufal","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-075","numero":75,"nome":"Jaroslav Zeleny","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-076","numero":76,"nome":"Tomas Holes","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-077","numero":77,"nome":"David Zima","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-078","numero":78,"nome":"Michal Sadilek","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-079","numero":79,"nome":"Lukas Provod","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-080","numero":80,"nome":"Lukas Cerv","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-081","numero":81,"nome":"Tomas Soucek","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-082","numero":82,"nome":"Team Photo","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-083","numero":83,"nome":"Pavel Sulc","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-084","numero":84,"nome":"Matej Vydra","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-085","numero":85,"nome":"Vasil Kusej","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-086","numero":86,"nome":"Tomas Chory","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-087","numero":87,"nome":"Vaclav Cerny","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-088","numero":88,"nome":"Adam Hlozek","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-089","numero":89,"nome":"Patrik Schick","selecao":"Tchéquia","posicao":"ESP","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-090","numero":90,"nome":"Emblem","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-091","numero":91,"nome":"Dayne St.Clair","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-092","numero":92,"nome":"Alphonso Davies","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-093","numero":93,"nome":"Alistair Johnston","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-094","numero":94,"nome":"Samuel Adekugbe","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-095","numero":95,"nome":"Richie Laryea","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-096","numero":96,"nome":"Derek Cornelius","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-097","numero":97,"nome":"Moïse Bombito","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-098","numero":98,"nome":"Kamal Miller","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-099","numero":99,"nome":"Stephen Eustáquio","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-100","numero":100,"nome":"Ismaël Koné","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-101","numero":101,"nome":"Jonathan Osorio","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-102","numero":102,"nome":"Team Photo","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-103","numero":103,"nome":"Jacob Shaffelburg","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-104","numero":104,"nome":"Mathieu Choinière","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-105","numero":105,"nome":"Niko Sigur","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-106","numero":106,"nome":"Tajon Buchanan","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-107","numero":107,"nome":"Liam Millar","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-108","numero":108,"nome":"Cyle Larin","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-109","numero":109,"nome":"Jonathan David","selecao":"Canadá","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-110","numero":110,"nome":"Emblem","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-111","numero":111,"nome":"Nikola Vasilj","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-112","numero":112,"nome":"Amer Dedic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-113","numero":113,"nome":"Sead Kolasinac","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-114","numero":114,"nome":"Tarik Muharemovic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-115","numero":115,"nome":"Nihad Mujakic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-116","numero":116,"nome":"Nikola Katic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-117","numero":117,"nome":"Amir Hadziahmetovic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-118","numero":118,"nome":"Benjamin Tahirovic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-119","numero":119,"nome":"Armin Gigovic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-120","numero":120,"nome":"Ivan Sunjic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-121","numero":121,"nome":"Ivan Basic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-122","numero":122,"nome":"Team Photo","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-123","numero":123,"nome":"Dzenis Burnic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-124","numero":124,"nome":"Esmir Bajraktarevic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-125","numero":125,"nome":"Amar Memic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-126","numero":126,"nome":"Ermedin Demirovic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-127","numero":127,"nome":"Edin Dzeko","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-128","numero":128,"nome":"Samed Bazdar","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-129","numero":129,"nome":"Haris Tabakovic","selecao":"Bósnia","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-130","numero":130,"nome":"Emblem","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-131","numero":131,"nome":"Meshaal Barsham","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-132","numero":132,"nome":"Sultan Albrake","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-133","numero":133,"nome":"Lucas Mendes","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-134","numero":134,"nome":"Homam Ahmed","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-135","numero":135,"nome":"Boualem Khoukhi","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-136","numero":136,"nome":"Pedro Miguel","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-137","numero":137,"nome":"Tarek Salman","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-138","numero":138,"nome":"Mohamed Al-Mannai","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-139","numero":139,"nome":"Karim Boudiaf","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-140","numero":140,"nome":"Assim Madibo","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-141","numero":141,"nome":"Ahmed Fatehi","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-142","numero":142,"nome":"Team Photo","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-143","numero":143,"nome":"Mohammed Waad","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-144","numero":144,"nome":"Abdulaziz Hatem","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-145","numero":145,"nome":"Hassan Al-Haydos","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-146","numero":146,"nome":"Edmilson Junior","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-147","numero":147,"nome":"Akram Hassan Afif","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-148","numero":148,"nome":"Ahmed Al Ganehi","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-149","numero":149,"nome":"Almoez Ali","selecao":"Catar","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-150","numero":150,"nome":"Emblem","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-151","numero":151,"nome":"Gregor Kobel","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-152","numero":152,"nome":"Yvon Mvogo","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-153","numero":153,"nome":"Manuel Akanji","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-154","numero":154,"nome":"Ricardo Rodriguez","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-155","numero":155,"nome":"Nico Elvedi","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-156","numero":156,"nome":"Aurèle Amenda","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-157","numero":157,"nome":"Silvan Widmer","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-158","numero":158,"nome":"Granit Xhaka","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-159","numero":159,"nome":"Denis Zakaria","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-160","numero":160,"nome":"Remo Freuler","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-161","numero":161,"nome":"Fabian Rieder","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-162","numero":162,"nome":"Team Photo","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-163","numero":163,"nome":"Ardon Jashari","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-164","numero":164,"nome":"Johan Manzambi","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-165","numero":165,"nome":"Michel Aebischer","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-166","numero":166,"nome":"Breel Embolo","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-167","numero":167,"nome":"Ruben Vargas","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-168","numero":168,"nome":"Dan Ndoye","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-169","numero":169,"nome":"Zeki Amdouni","selecao":"Suíça","posicao":"ESP","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-170","numero":170,"nome":"Emblem","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-171","numero":171,"nome":"Alisson","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-172","numero":172,"nome":"Bento","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-173","numero":173,"nome":"Marquinhos","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-174","numero":174,"nome":"Éder Militão","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-175","numero":175,"nome":"Gabriel Magalhães","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-176","numero":176,"nome":"Danilo","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-177","numero":177,"nome":"Wesley","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-178","numero":178,"nome":"Lucas Paquetá","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-179","numero":179,"nome":"Casemiro","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-180","numero":180,"nome":"Bruno Guimarães","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-181","numero":181,"nome":"Luiz Henrique","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-182","numero":182,"nome":"Team Photo","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-183","numero":183,"nome":"Vinicius Júnior","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-184","numero":184,"nome":"Rodrygo","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-185","numero":185,"nome":"João Pedro","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-186","numero":186,"nome":"Matheus Cunha","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-187","numero":187,"nome":"Gabriel Martinelli","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-188","numero":188,"nome":"Raphinha","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-189","numero":189,"nome":"Estévão","selecao":"Brasil","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-190","numero":190,"nome":"Emblem","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-191","numero":191,"nome":"Yassine Bounou","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-192","numero":192,"nome":"Munir El Kajoui","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-193","numero":193,"nome":"Achraf Hakimi","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-194","numero":194,"nome":"Noussair Mazraoui","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-195","numero":195,"nome":"Nayef Aguerd","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-196","numero":196,"nome":"Romain Saïss","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-197","numero":197,"nome":"Jawad El Yamiq","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-198","numero":198,"nome":"Adam Masina","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-199","numero":199,"nome":"Sofyan Amrabat","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-200","numero":200,"nome":"Azzedine Ounahi","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-201","numero":201,"nome":"Eliesse Ben Seghir","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-202","numero":202,"nome":"Team Photo","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-203","numero":203,"nome":"Bilal El Khannouss","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-204","numero":204,"nome":"Ismael Saibari","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-205","numero":205,"nome":"Youssef En-Nesyri","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-206","numero":206,"nome":"Abde Ezzalzouli","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-207","numero":207,"nome":"Soufiane Rahimi","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-208","numero":208,"nome":"Brahim Diaz","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-209","numero":209,"nome":"Ayoub El Kaabi","selecao":"Marrocos","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-210","numero":210,"nome":"Emblem","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-211","numero":211,"nome":"Johny Placide","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-212","numero":212,"nome":"Carlens Arcus","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-213","numero":213,"nome":"Martin Expérience","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-214","numero":214,"nome":"Jean-Kevin Duverne","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-215","numero":215,"nome":"Ricardo Adé","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-216","numero":216,"nome":"Duke Lacroix","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-217","numero":217,"nome":"Garven Metusala","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-218","numero":218,"nome":"Hannes Delcroix","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-219","numero":219,"nome":"Leverton Pierre","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-220","numero":220,"nome":"Danley Jean Jacques","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-221","numero":221,"nome":"Jean-Ricner Bellegarde","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-222","numero":222,"nome":"Team Photo","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-223","numero":223,"nome":"Christopher Attys","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-224","numero":224,"nome":"Derrick Etienne Jr","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-225","numero":225,"nome":"Josue Casimir","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-226","numero":226,"nome":"Ruben Providence","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-227","numero":227,"nome":"Duckens Nazon","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-228","numero":228,"nome":"Louicius Deedson","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-229","numero":229,"nome":"Frantzdy Pierrot","selecao":"Haiti","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-230","numero":230,"nome":"Emblem","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-231","numero":231,"nome":"Angus Gunn","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-232","numero":232,"nome":"Jack Hendry","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-233","numero":233,"nome":"Kieran Tierney","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-234","numero":234,"nome":"Aaron Hickey","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-235","numero":235,"nome":"Andrew Robertson","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-236","numero":236,"nome":"Scott McKenna","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-237","numero":237,"nome":"John Souttar","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-238","numero":238,"nome":"Anthony Ralston","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-239","numero":239,"nome":"Grant Hanley","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-240","numero":240,"nome":"Scott McTominay","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-241","numero":241,"nome":"Billy Gilmour","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-242","numero":242,"nome":"Team Photo","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-243","numero":243,"nome":"Lewis Ferguson","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-244","numero":244,"nome":"Ryan Christie","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-245","numero":245,"nome":"Kenny McLean","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-246","numero":246,"nome":"John McGinn","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-247","numero":247,"nome":"Lyndon Dykes","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-248","numero":248,"nome":"Che Adams","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-249","numero":249,"nome":"Ben Gannon-Doak","selecao":"Escócia","posicao":"ESP","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-250","numero":250,"nome":"Emblem","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-251","numero":251,"nome":"Matt Freese","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-252","numero":252,"nome":"Chris Richards","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-253","numero":253,"nome":"Tim Ream","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-254","numero":254,"nome":"Mark McKenzie","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-255","numero":255,"nome":"Alex Freeman","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-256","numero":256,"nome":"Antonee Robinson","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-257","numero":257,"nome":"Tyler Adams","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-258","numero":258,"nome":"Tanner Tessmann","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-259","numero":259,"nome":"Weston McKenny","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-260","numero":260,"nome":"Christian Roldan","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-261","numero":261,"nome":"Timothy Weah","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-262","numero":262,"nome":"Team Photo","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-263","numero":263,"nome":"Diego Luna","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-264","numero":264,"nome":"Malik Tillman","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-265","numero":265,"nome":"Christian Pulisic","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-266","numero":266,"nome":"Brenden Aaronson","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-267","numero":267,"nome":"Ricardo Pepi","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-268","numero":268,"nome":"Haji Wright","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-269","numero":269,"nome":"Folarin Balogun","selecao":"EUA","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-270","numero":270,"nome":"Emblem","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-271","numero":271,"nome":"Roberto Fernandez","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-272","numero":272,"nome":"Orlando Gill","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-273","numero":273,"nome":"Gustavo Gomez","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-274","numero":274,"nome":"Fabián Balbuena","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-275","numero":275,"nome":"Juan José Cáceres","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-276","numero":276,"nome":"Omar Alderete","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-277","numero":277,"nome":"Junior Alonso","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-278","numero":278,"nome":"Mathías Villasanti","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-279","numero":279,"nome":"Diego Gomez","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-280","numero":280,"nome":"Damián Bobadilla","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-281","numero":281,"nome":"Andres Cubas","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-282","numero":282,"nome":"Team Photo","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-283","numero":283,"nome":"Matias Galarza Fonda","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-284","numero":284,"nome":"Julio Enciso","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-285","numero":285,"nome":"Alejandro Romero Gamarra","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-286","numero":286,"nome":"Miguel Almirón","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-287","numero":287,"nome":"Ramon Sosa","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-288","numero":288,"nome":"Angel Romero","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-289","numero":289,"nome":"Antonio Sanabria","selecao":"Paraguai","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-290","numero":290,"nome":"Emblem","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-291","numero":291,"nome":"Mathew Ryan","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-292","numero":292,"nome":"Joe Gauci","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-293","numero":293,"nome":"Harry Souttar","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-294","numero":294,"nome":"Alessandro Circati","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-295","numero":295,"nome":"Jordan Bos","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-296","numero":296,"nome":"Aziz Behich","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-297","numero":297,"nome":"Cameron Burgess","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-298","numero":298,"nome":"Lewis Miller","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-299","numero":299,"nome":"Milos Degenek","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-300","numero":300,"nome":"Jackson Irvine","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-301","numero":301,"nome":"Riley McGree","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-302","numero":302,"nome":"Team Photo","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-303","numero":303,"nome":"Aiden O'Neill","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-304","numero":304,"nome":"Connor Metcalfe","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-305","numero":305,"nome":"Patrick Yazbek","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-306","numero":306,"nome":"Craig Goodwin","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-307","numero":307,"nome":"Kusini Yengi","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-308","numero":308,"nome":"Nestory Irankunda","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-309","numero":309,"nome":"Mohamed Touré","selecao":"Austrália","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-310","numero":310,"nome":"Emblem","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-311","numero":311,"nome":"Ugurcan Cakir","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-312","numero":312,"nome":"Mert Muldur","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-313","numero":313,"nome":"Zeki Celik","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-314","numero":314,"nome":"Abdulkerim Bardakci","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-315","numero":315,"nome":"Caglar Soyuncu","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-316","numero":316,"nome":"Merih Demiral","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-317","numero":317,"nome":"Ferdi Kadioglu","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-318","numero":318,"nome":"Kaan Ayhan","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-319","numero":319,"nome":"Ismail Yuksek","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-320","numero":320,"nome":"Hakan Calhanoglu","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-321","numero":321,"nome":"Orkun Kokcu","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-322","numero":322,"nome":"Team Photo","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-323","numero":323,"nome":"Arda Guler","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-324","numero":324,"nome":"Irfan Can Kahveci","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-325","numero":325,"nome":"Yunus Akgun","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-326","numero":326,"nome":"Can Uzun","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-327","numero":327,"nome":"Baris Alper Yilmaz","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-328","numero":328,"nome":"Kerem Akturkoglu","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-329","numero":329,"nome":"Kenan Yildiz","selecao":"Turquia","posicao":"ESP","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-330","numero":330,"nome":"Emblem","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-331","numero":331,"nome":"Marc-André ter Stegen","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-332","numero":332,"nome":"Jonathan Tah","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-333","numero":333,"nome":"David Raum","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-334","numero":334,"nome":"Nico Schlotterbeck","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-335","numero":335,"nome":"Antonio Rüdiger","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-336","numero":336,"nome":"Waldemar Anton","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-337","numero":337,"nome":"Ridle Baku","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-338","numero":338,"nome":"Maximilian Mittelstadt","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-339","numero":339,"nome":"Joshua Kimmich","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-340","numero":340,"nome":"Florian Wirtz","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-341","numero":341,"nome":"Felix Nmecha","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-342","numero":342,"nome":"Team Photo","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-343","numero":343,"nome":"Leon Goretzka","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-344","numero":344,"nome":"Jamal Musiala","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-345","numero":345,"nome":"Serge Gnabry","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-346","numero":346,"nome":"Kai Havertz","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-347","numero":347,"nome":"Leroy Sane","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-348","numero":348,"nome":"Karim Adeyemi","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-349","numero":349,"nome":"Nick Woltemade","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-350","numero":350,"nome":"Marc-André ter Stegen","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-351","numero":351,"nome":"Jonathan Tah","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-352","numero":352,"nome":"David Raum","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-353","numero":353,"nome":"Nico Schlotterbeck","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-354","numero":354,"nome":"Antonio Rüdiger","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-355","numero":355,"nome":"Waldemar Anton","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-356","numero":356,"nome":"Ridle Baku","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-357","numero":357,"nome":"Maximilian Mittelstadt","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-358","numero":358,"nome":"Joshua Kimmich","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-359","numero":359,"nome":"Florian Wirtz","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-360","numero":360,"nome":"Felix Nmecha","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-361","numero":361,"nome":"Leon Goretzka","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-362","numero":362,"nome":"Jamal Musiala","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-363","numero":363,"nome":"Serge Gnabry","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-364","numero":364,"nome":"Kai Havertz","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-365","numero":365,"nome":"Leroy Sane","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-366","numero":366,"nome":"Karim Adeyemi","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-367","numero":367,"nome":"Nick Woltemade","selecao":"Alemanha","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-368","numero":368,"nome":"Emblem","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-369","numero":369,"nome":"Eloy Room","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-370","numero":370,"nome":"Armando Obispo","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-371","numero":371,"nome":"Sherel Floranus","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-372","numero":372,"nome":"Jurien Gaari","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-373","numero":373,"nome":"Joshua Brenet","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-374","numero":374,"nome":"Roshon Van Eijma","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-375","numero":375,"nome":"Shurandy Sambo","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-376","numero":376,"nome":"Livano Comenencia","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-377","numero":377,"nome":"Godfried Roemeratoe","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-378","numero":378,"nome":"Juninho Bacuna","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-379","numero":379,"nome":"Leandro Bacuna","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-380","numero":380,"nome":"Team Photo","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-381","numero":381,"nome":"Tahith Chong","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-382","numero":382,"nome":"Kenji Gorre","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-383","numero":383,"nome":"Jearl Margaritha","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-384","numero":384,"nome":"Jurgen Locadia","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-385","numero":385,"nome":"Jeremy Antonisse","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-386","numero":386,"nome":"Gervane Kastaneer","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-387","numero":387,"nome":"Sontje Hansen","selecao":"Curaçao","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-388","numero":388,"nome":"Emblem","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-389","numero":389,"nome":"Yahia Fofana","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-390","numero":390,"nome":"Ghislain Konan","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-391","numero":391,"nome":"Wilfried Singo","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-392","numero":392,"nome":"Odilon Kossounou","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-393","numero":393,"nome":"Evan Ndicka","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-394","numero":394,"nome":"Willy Boly","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-395","numero":395,"nome":"Emmanuel Agbadou","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-396","numero":396,"nome":"Ousmane Diomande","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-397","numero":397,"nome":"Franck Kessie","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-398","numero":398,"nome":"Seko Fofana","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-399","numero":399,"nome":"Ibrahim Sangare","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-400","numero":400,"nome":"Team Photo","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-401","numero":401,"nome":"Jean-Philippe Gbamin","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-402","numero":402,"nome":"Amad Diallo","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-403","numero":403,"nome":"Sébastien Haller","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-404","numero":404,"nome":"Simon Adingra","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-405","numero":405,"nome":"Yan Diomande","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-406","numero":406,"nome":"Evann Guessand","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-407","numero":407,"nome":"Oumar Diakite","selecao":"Costa do Marfim","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-408","numero":408,"nome":"Emblem","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-409","numero":409,"nome":"Hernán Galíndez","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-410","numero":410,"nome":"Gonzalo Valle","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-411","numero":411,"nome":"Piero Hincapié","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-412","numero":412,"nome":"Pervis Estupiñán","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-413","numero":413,"nome":"Willian Pacho","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-414","numero":414,"nome":"Ángelo Preciado","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-415","numero":415,"nome":"Joel Ordóñez","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-416","numero":416,"nome":"Moises Caicedo","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-417","numero":417,"nome":"Alan Franco","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-418","numero":418,"nome":"Kendry Paez","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-419","numero":419,"nome":"Pedro Vite","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-420","numero":420,"nome":"Team Photo","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-421","numero":421,"nome":"John Yeboah","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-422","numero":422,"nome":"Leonardo Campana","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-423","numero":423,"nome":"Gonzalo Plata","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-424","numero":424,"nome":"Nilson Angulo","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-425","numero":425,"nome":"Alan Minda","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-426","numero":426,"nome":"Kevin Rodriguez","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-427","numero":427,"nome":"Enner Valencia","selecao":"Equador","posicao":"ESP","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-428","numero":428,"nome":"Emblem","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-429","numero":429,"nome":"Bart Verbruggen","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-430","numero":430,"nome":"Virgil van Dijk","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-431","numero":431,"nome":"Micky van de Ven","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-432","numero":432,"nome":"Jurrien Timber","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-433","numero":433,"nome":"Denzel Dumfries","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-434","numero":434,"nome":"Nathan Aké","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-435","numero":435,"nome":"Jeremie Frimpong","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-436","numero":436,"nome":"Jan Paul van Hecke","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-437","numero":437,"nome":"Tijjani Reijnders","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-438","numero":438,"nome":"Ryan Gravenberch","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-439","numero":439,"nome":"Teun Koopmeiners","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-440","numero":440,"nome":"Team Photo","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-441","numero":441,"nome":"Frenkie de Jong","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-442","numero":442,"nome":"Xavi Simons","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-443","numero":443,"nome":"Justin Kluivert","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-444","numero":444,"nome":"Memphis Depay","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-445","numero":445,"nome":"Donyell Malen","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-446","numero":446,"nome":"Wout Weghorst","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-447","numero":447,"nome":"Cody Gakpo","selecao":"Holanda","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-448","numero":448,"nome":"Emblem","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-449","numero":449,"nome":"Zion Suzuki","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-450","numero":450,"nome":"Henry Heroki Mochizuki","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-451","numero":451,"nome":"Ayumu Seko","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-452","numero":452,"nome":"Junnosuke Suzuki","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-453","numero":453,"nome":"Shogo Taniguchi","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-454","numero":454,"nome":"Tsuyoshi Watanabe","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-455","numero":455,"nome":"Kaishu Sano","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-456","numero":456,"nome":"Yuki Soma","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-457","numero":457,"nome":"Ao Tanaka","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-458","numero":458,"nome":"Daichi Kamada","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-459","numero":459,"nome":"Takefusa Kubo","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-460","numero":460,"nome":"Team Photo","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-461","numero":461,"nome":"Ritsu Doan","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-462","numero":462,"nome":"Keito Nakamura","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-463","numero":463,"nome":"Takumi Minamino","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-464","numero":464,"nome":"Shuto Machino","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-465","numero":465,"nome":"Junya Ito","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-466","numero":466,"nome":"Koki Ogawa","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-467","numero":467,"nome":"Ayase Ueda","selecao":"Japão","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-468","numero":468,"nome":"Emblem","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-469","numero":469,"nome":"Victor Johansson","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-470","numero":470,"nome":"Isak Hien","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-471","numero":471,"nome":"Gabriel Gudmundsson","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-472","numero":472,"nome":"Emil Holm","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-473","numero":473,"nome":"Victor Nilsson Lindelöf","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-474","numero":474,"nome":"Gustaf Lagerbielke","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-475","numero":475,"nome":"Lucas Bergvall","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-476","numero":476,"nome":"Hugo Larsson","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-477","numero":477,"nome":"Jesper Karlström","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-478","numero":478,"nome":"Yasin Ayari","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-479","numero":479,"nome":"Mattias Svanberg","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-480","numero":480,"nome":"Team Photo","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-481","numero":481,"nome":"Daniel Svensson","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-482","numero":482,"nome":"Ken Sema","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-483","numero":483,"nome":"Roony Bardghji","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-484","numero":484,"nome":"Dejan Kulusevski","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-485","numero":485,"nome":"Anthony Elanga","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-486","numero":486,"nome":"Alexander Isak","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-487","numero":487,"nome":"Viktor Gyökeres","selecao":"Suécia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-488","numero":488,"nome":"Emblem","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-489","numero":489,"nome":"Bechir Ben Said","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-490","numero":490,"nome":"Aymen Dahmen","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-491","numero":491,"nome":"Yan Valery","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-492","numero":492,"nome":"Montassar Talbi","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-493","numero":493,"nome":"Yassine Meriah","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-494","numero":494,"nome":"Ali Abdi","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-495","numero":495,"nome":"Dylan Bronn","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-496","numero":496,"nome":"Ellyes Skhiri","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-497","numero":497,"nome":"Aissa Laidouni","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-498","numero":498,"nome":"Ferjani Sassi","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-499","numero":499,"nome":"Mohamed Ali Ben Romdhane","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-500","numero":500,"nome":"Team Photo","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-501","numero":501,"nome":"Hannibal Mejbri","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-502","numero":502,"nome":"Elias Achouri","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-503","numero":503,"nome":"Elias Saad","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-504","numero":504,"nome":"Hazem Mastouri","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-505","numero":505,"nome":"Ismael Gharbi","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-506","numero":506,"nome":"Sayfallah Ltaief","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-507","numero":507,"nome":"Naim Sliti","selecao":"Tunísia","posicao":"ESP","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-508","numero":508,"nome":"Emblem","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-509","numero":509,"nome":"Thibaut Courtois","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-510","numero":510,"nome":"Arthur Theate","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-511","numero":511,"nome":"Timothy Castagne","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-512","numero":512,"nome":"Zeno Debast","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-513","numero":513,"nome":"Brandon Mechele","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-514","numero":514,"nome":"Maxim De Cuyper","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-515","numero":515,"nome":"Thomas Meunier","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-516","numero":516,"nome":"Youri Tielemans","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-517","numero":517,"nome":"Amadou Onana","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-518","numero":518,"nome":"Nicolas Raskin","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-519","numero":519,"nome":"Alexis Saelemaekers","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-520","numero":520,"nome":"Team Photo","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-521","numero":521,"nome":"Hans Vanaken","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-522","numero":522,"nome":"Kevin De Bruyne","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-523","numero":523,"nome":"Jérémy Doku","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-524","numero":524,"nome":"Charles De Ketelaere","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-525","numero":525,"nome":"Leandro Trossard","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-526","numero":526,"nome":"Loïs Openda","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-527","numero":527,"nome":"Romelu Lukaku","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-528","numero":528,"nome":"Thibaut Courtois","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-529","numero":529,"nome":"Arthur Theate","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-530","numero":530,"nome":"Timothy Castagne","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-531","numero":531,"nome":"Zeno Debast","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-532","numero":532,"nome":"Brandon Mechele","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-533","numero":533,"nome":"Maxim De Cuyper","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-534","numero":534,"nome":"Thomas Meunier","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-535","numero":535,"nome":"Youri Tielemans","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-536","numero":536,"nome":"Amadou Onana","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-537","numero":537,"nome":"Nicolas Raskin","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-538","numero":538,"nome":"Alexis Saelemaekers","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-539","numero":539,"nome":"Hans Vanaken","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-540","numero":540,"nome":"Kevin De Bruyne","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-541","numero":541,"nome":"Jérémy Doku","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-542","numero":542,"nome":"Charles De Ketelaere","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-543","numero":543,"nome":"Leandro Trossard","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-544","numero":544,"nome":"Loïs Openda","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-545","numero":545,"nome":"Romelu Lukaku","selecao":"Bélgica","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-546","numero":546,"nome":"Emblem","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-547","numero":547,"nome":"Mohamed El Shenawy","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-548","numero":548,"nome":"Mohamed Hany","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-549","numero":549,"nome":"Mohamed Hamdy","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-550","numero":550,"nome":"Yasser Ibrahim","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-551","numero":551,"nome":"Khaled Sobhi","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-552","numero":552,"nome":"Ramy Rabia","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-553","numero":553,"nome":"Hossam Abdelmaguid","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-554","numero":554,"nome":"Ahmed Fatouh","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-555","numero":555,"nome":"Marwan Attia","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-556","numero":556,"nome":"Zizo","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-557","numero":557,"nome":"Hamdy Fathy","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-558","numero":558,"nome":"Team Photo","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-559","numero":559,"nome":"Mohamed Lasheen","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-560","numero":560,"nome":"Emam Ashour","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-561","numero":561,"nome":"Osama Faisal","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-562","numero":562,"nome":"Mohamed Salah","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-563","numero":563,"nome":"Mostafa Mohamed","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-564","numero":564,"nome":"Trezeguet","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-565","numero":565,"nome":"Omar Marmoush","selecao":"Egito","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-566","numero":566,"nome":"Emblem","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-567","numero":567,"nome":"Alireza Beiranvand","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-568","numero":568,"nome":"Morteza Pouraliganji","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-569","numero":569,"nome":"Ehsan Hajsafi","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-570","numero":570,"nome":"Milad Mohammadi","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-571","numero":571,"nome":"Shojae Khalilzadeh","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-572","numero":572,"nome":"Ramin Rezaeian","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-573","numero":573,"nome":"Hossein Kanaani","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-574","numero":574,"nome":"Sadegh Moharrami","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-575","numero":575,"nome":"Saleh Hardani","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-576","numero":576,"nome":"Saeed Ezatolahi","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-577","numero":577,"nome":"Saman Ghoddos","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-578","numero":578,"nome":"Team Photo","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-579","numero":579,"nome":"Omid Noorafkan","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-580","numero":580,"nome":"Roozbeh Cheshmi","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-581","numero":581,"nome":"Mohammad Mohebi","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-582","numero":582,"nome":"Sardar Azmoun","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-583","numero":583,"nome":"Mehdi Taremi","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-584","numero":584,"nome":"Alireza Jahanbakhsh","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-585","numero":585,"nome":"Ali Gholizadeh","selecao":"Irã","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-586","numero":586,"nome":"Emblem","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-587","numero":587,"nome":"Max Crocombe","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-588","numero":588,"nome":"Alex Paulsen","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-589","numero":589,"nome":"Michael Boxall","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-590","numero":590,"nome":"Liberato Cacace","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-591","numero":591,"nome":"Tim Payne","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-592","numero":592,"nome":"Tyler Bindon","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-593","numero":593,"nome":"Francis de Vries","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-594","numero":594,"nome":"Finn Surman","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-595","numero":595,"nome":"Joe Bell","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-596","numero":596,"nome":"Sarpreet Singh","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-597","numero":597,"nome":"Ryan Thomas","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-598","numero":598,"nome":"Team Photo","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-599","numero":599,"nome":"Matthew Garbett","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-600","numero":600,"nome":"Marko Stamenić","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-601","numero":601,"nome":"Ben Old","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-602","numero":602,"nome":"Chris Wood","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-603","numero":603,"nome":"Elijah Just","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-604","numero":604,"nome":"Callum McCowatt","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-605","numero":605,"nome":"Kosta Barbarouses","selecao":"Nova Zelândia","posicao":"ESP","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-606","numero":606,"nome":"Emblem","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-607","numero":607,"nome":"Unai Simon","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-608","numero":608,"nome":"Robin Le Normand","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-609","numero":609,"nome":"Aymeric Laporte","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-610","numero":610,"nome":"Dean Huijsen","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-611","numero":611,"nome":"Pedro Porro","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-612","numero":612,"nome":"Dani Carvajal","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-613","numero":613,"nome":"Marc Cucurella","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-614","numero":614,"nome":"Martín Zubimendi","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-615","numero":615,"nome":"Rodri","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-616","numero":616,"nome":"Pedri","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-617","numero":617,"nome":"Fabian Ruiz","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-618","numero":618,"nome":"Team Photo","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-619","numero":619,"nome":"Mikel Merino","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-620","numero":620,"nome":"Lamine Yamal","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-621","numero":621,"nome":"Dani Olmo","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-622","numero":622,"nome":"Nico Williams","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-623","numero":623,"nome":"Ferran Torres","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-624","numero":624,"nome":"Álvaro Morata","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-625","numero":625,"nome":"Mikel Oyarzabal","selecao":"Espanha","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-626","numero":626,"nome":"Emblem","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-627","numero":627,"nome":"Vozinha","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-628","numero":628,"nome":"Logan Costa","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-629","numero":629,"nome":"Pico","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-630","numero":630,"nome":"Diney","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-631","numero":631,"nome":"Steven Moreira","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-632","numero":632,"nome":"Wagner Pina","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-633","numero":633,"nome":"Joao Paulo","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-634","numero":634,"nome":"Yannick Semedo","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-635","numero":635,"nome":"Kevin Pina","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-636","numero":636,"nome":"Patrick Andrade","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-637","numero":637,"nome":"Jamiro Monteiro","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-638","numero":638,"nome":"Team Photo","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-639","numero":639,"nome":"Deroy Duarte","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-640","numero":640,"nome":"Garry Rodrigues","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-641","numero":641,"nome":"Jovane Cabral","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-642","numero":642,"nome":"Ryan Mendes","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-643","numero":643,"nome":"Dailon Livramento","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-644","numero":644,"nome":"Willy Semedo","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-645","numero":645,"nome":"Bebe","selecao":"Cabo Verde","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-646","numero":646,"nome":"Emblem","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-647","numero":647,"nome":"Nawaf Alaqidi","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-648","numero":648,"nome":"Abdulrahman Al-Sanbi","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-649","numero":649,"nome":"Saud Abdulhamid","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-650","numero":650,"nome":"Nawaf Bouwashl","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-651","numero":651,"nome":"Jihad Thakri","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-652","numero":652,"nome":"Moteb Al-Harbi","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-653","numero":653,"nome":"Hassan Altambakti","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-654","numero":654,"nome":"Musab Aljuwayr","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-655","numero":655,"nome":"Ziyad Aljohani","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-656","numero":656,"nome":"Abdullah Alkhaibari","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-657","numero":657,"nome":"Nasser Aldawsari","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-658","numero":658,"nome":"Team Photo","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-659","numero":659,"nome":"Saleh Abu Alshamat","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-660","numero":660,"nome":"Marwan Alsahafi","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-661","numero":661,"nome":"Salem Aldawsari","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-662","numero":662,"nome":"Abdulrahman Al-Aboud","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-663","numero":663,"nome":"Feras Akbrikan","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-664","numero":664,"nome":"Saleh Alshehri","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-665","numero":665,"nome":"Abdullah Al-Hamdan","selecao":"Arábia Saudita","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-666","numero":666,"nome":"Emblem","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-667","numero":667,"nome":"Sergio Rochet","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-668","numero":668,"nome":"Santiago Mele","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-669","numero":669,"nome":"Ronald Araujo","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-670","numero":670,"nome":"José María Giménez","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-671","numero":671,"nome":"Sebastian Caceres","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-672","numero":672,"nome":"Mathias Olivera","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-673","numero":673,"nome":"Guillermo Varela","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-674","numero":674,"nome":"Nahitan Nandez","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-675","numero":675,"nome":"Federico Valverde","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-676","numero":676,"nome":"Giorgian De Arrascaeta","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-677","numero":677,"nome":"Rodrigo Bentancur","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-678","numero":678,"nome":"Team Photo","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-679","numero":679,"nome":"Manuel Ugarte","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-680","numero":680,"nome":"Nicolás de la Cruz","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-681","numero":681,"nome":"Maxi Araujo","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-682","numero":682,"nome":"Darwin Núñez","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-683","numero":683,"nome":"Federico Viñas","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-684","numero":684,"nome":"Rodrigo Aguirre","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-685","numero":685,"nome":"Facundo Pellistri","selecao":"Uruguai","posicao":"ESP","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-686","numero":686,"nome":"Emblem","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-687","numero":687,"nome":"Mike Maignan","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-688","numero":688,"nome":"Theo Hernandez","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-689","numero":689,"nome":"William Saliba","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-690","numero":690,"nome":"Jules Kounde","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-691","numero":691,"nome":"Ibrahima Konate","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-692","numero":692,"nome":"Dayot Upamecano","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-693","numero":693,"nome":"Lucas Digne","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-694","numero":694,"nome":"Aurélien Tchouaméni","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-695","numero":695,"nome":"Eduardo Camavinga","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-696","numero":696,"nome":"Manu Kone","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-697","numero":697,"nome":"Adrien Rabiot","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-698","numero":698,"nome":"Team Photo","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-699","numero":699,"nome":"Michael Olise","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-700","numero":700,"nome":"Ousmane Dembele","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-701","numero":701,"nome":"Bradley Barcola","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-702","numero":702,"nome":"Désiré Doué","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-703","numero":703,"nome":"Kingsley Coman","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-704","numero":704,"nome":"Hugo Ekitike","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-705","numero":705,"nome":"Mike Maignan","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-706","numero":706,"nome":"Theo Hernandez","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-707","numero":707,"nome":"William Saliba","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-708","numero":708,"nome":"Jules Kounde","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-709","numero":709,"nome":"Ibrahima Konate","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-710","numero":710,"nome":"Dayot Upamecano","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-711","numero":711,"nome":"Lucas Digne","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-712","numero":712,"nome":"Aurélien Tchouaméni","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-713","numero":713,"nome":"Eduardo Camavinga","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-714","numero":714,"nome":"Manu Kone","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-715","numero":715,"nome":"Adrien Rabiot","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-716","numero":716,"nome":"Michael Olise","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-717","numero":717,"nome":"Ousmane Dembele","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-718","numero":718,"nome":"Bradley Barcola","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-719","numero":719,"nome":"Désiré Doué","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-720","numero":720,"nome":"Kingsley Coman","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-721","numero":721,"nome":"Hugo Ekitike","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-722","numero":722,"nome":"Kylian Mbappe","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-723","numero":723,"nome":"Kylian Mbappe","selecao":"França","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-724","numero":724,"nome":"Emblem","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-725","numero":725,"nome":"Édouard Mendy","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-726","numero":726,"nome":"Yehvann Diouf","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-727","numero":727,"nome":"Moussa Niakhaté","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-728","numero":728,"nome":"Abdoulaye Seck","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-729","numero":729,"nome":"Ismail Jakobs","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-730","numero":730,"nome":"El Hadji Malick Diouf","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-731","numero":731,"nome":"Kalidou Koulibaly","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-732","numero":732,"nome":"Idrissa Gana Gueye","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-733","numero":733,"nome":"Pape Matar Sarr","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-734","numero":734,"nome":"Pape Gueye","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-735","numero":735,"nome":"Habib Diarra","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-736","numero":736,"nome":"Team Photo","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-737","numero":737,"nome":"Lamine Camara","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-738","numero":738,"nome":"Sadio Mane","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-739","numero":739,"nome":"Ismaïla Sarr","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-740","numero":740,"nome":"Boulaye Dia","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-741","numero":741,"nome":"Iliman Ndiaye","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-742","numero":742,"nome":"Nicolas Jackson","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-743","numero":743,"nome":"Krepin Diatta","selecao":"Senegal","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-744","numero":744,"nome":"Emblem","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-745","numero":745,"nome":"Jalal Hassan","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-746","numero":746,"nome":"Rebin Sulaka","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-747","numero":747,"nome":"Hussein Ali","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-748","numero":748,"nome":"Akam Hashem","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-749","numero":749,"nome":"Merchas Doski","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-750","numero":750,"nome":"Zaid Tahseen","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-751","numero":751,"nome":"Manaf Younis","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-752","numero":752,"nome":"Zidane Iqbal","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-753","numero":753,"nome":"Amir Al-Ammari","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-754","numero":754,"nome":"Ibrahim Bavesh","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-755","numero":755,"nome":"Ali Jasim","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-756","numero":756,"nome":"Team Photo","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-757","numero":757,"nome":"Youssef Amyn","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-758","numero":758,"nome":"Aimar Sher","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-759","numero":759,"nome":"Marko Farji","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-760","numero":760,"nome":"Osama Rashid","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-761","numero":761,"nome":"Ali Al-Hamadi","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-762","numero":762,"nome":"Aymen Hussein","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-763","numero":763,"nome":"Mohanad Ali","selecao":"Iraque","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-764","numero":764,"nome":"Emblem","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-765","numero":765,"nome":"Orjan Nyland","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-766","numero":766,"nome":"Julian Ryerson","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-767","numero":767,"nome":"Leo Ostigård","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-768","numero":768,"nome":"Kristoffer Vassbakk Ajer","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-769","numero":769,"nome":"Marcus Holmgren Pedersen","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-770","numero":770,"nome":"David Møller Wolfe","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-771","numero":771,"nome":"Torbjørn Heggem","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-772","numero":772,"nome":"Morten Thorsby","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-773","numero":773,"nome":"Martin Ødegaard","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-774","numero":774,"nome":"Sander Berge","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-775","numero":775,"nome":"Andreas Schjelderup","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-776","numero":776,"nome":"Team Photo","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-777","numero":777,"nome":"Patrick Berg","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-778","numero":778,"nome":"Erling Haaland","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-779","numero":779,"nome":"Alexander Sørloth","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-780","numero":780,"nome":"Aron Dønnum","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-781","numero":781,"nome":"Jorgen Strand Larsen","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-782","numero":782,"nome":"Antonio Nusa","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-783","numero":783,"nome":"Oscar Bobb","selecao":"Noruega","posicao":"ESP","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-784","numero":784,"nome":"Emblem","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-785","numero":785,"nome":"Emiliano Martinez","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-786","numero":786,"nome":"Nahuel Molina","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-787","numero":787,"nome":"Cristian Romero","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-788","numero":788,"nome":"Nicolas Otamendi","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-789","numero":789,"nome":"Nicolas Tagliafico","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-790","numero":790,"nome":"Leonardo Balerdi","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-791","numero":791,"nome":"Enzo Fernandez","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-792","numero":792,"nome":"Alexis Mac Allister","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-793","numero":793,"nome":"Rodrigo De Paul","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-794","numero":794,"nome":"Exequiel Palacios","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-795","numero":795,"nome":"Leandro Paredes","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-796","numero":796,"nome":"Team Photo","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-797","numero":797,"nome":"Nico Paz","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-798","numero":798,"nome":"Franco Mastantuono","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-799","numero":799,"nome":"Nico Gonzalez","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-800","numero":800,"nome":"Lionel Messi","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-801","numero":801,"nome":"Lautaro Martinez","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-802","numero":802,"nome":"Julian Alvarez","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-803","numero":803,"nome":"Giuliano Simeone","selecao":"Argentina","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-804","numero":804,"nome":"Emblem","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-805","numero":805,"nome":"Alexis Guendouz","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-806","numero":806,"nome":"Ramy Bensebaini","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-807","numero":807,"nome":"Youcef Atal","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-808","numero":808,"nome":"Rayan Aït-Nouri","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-809","numero":809,"nome":"Mohamed Amine Tougai","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-810","numero":810,"nome":"Aïssa Mandi","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-811","numero":811,"nome":"Ismael Bennacer","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-812","numero":812,"nome":"Houssem Aouar","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-813","numero":813,"nome":"Hicham Boudaoui","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-814","numero":814,"nome":"Ramiz Zerrouki","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-815","numero":815,"nome":"Nabil Bentaleb","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-816","numero":816,"nome":"Team Photo","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-817","numero":817,"nome":"Farés Chaibi","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-818","numero":818,"nome":"Riyad Mahrez","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-819","numero":819,"nome":"Said Benrahma","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-820","numero":820,"nome":"Anis Hadj Moussa","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-821","numero":821,"nome":"Amine Gouiri","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-822","numero":822,"nome":"Baghdad Bounedjah","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-823","numero":823,"nome":"Mohammed Amoura","selecao":"Argélia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-824","numero":824,"nome":"Emblem","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-825","numero":825,"nome":"Alexander Schlager","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-826","numero":826,"nome":"Patrick Pentz","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-827","numero":827,"nome":"David Alaba","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-828","numero":828,"nome":"Kevin Danso","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-829","numero":829,"nome":"Philipp Lienhart","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-830","numero":830,"nome":"Stefan Posch","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-831","numero":831,"nome":"Phillipp Mwene","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-832","numero":832,"nome":"Alexander Prass","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-833","numero":833,"nome":"Xaver Schlager","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-834","numero":834,"nome":"Marcel Sabitzer","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-835","numero":835,"nome":"Konrad Laimer","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-836","numero":836,"nome":"Team Photo","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-837","numero":837,"nome":"Florian Grillitsch","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-838","numero":838,"nome":"Nicolas Seiwald","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-839","numero":839,"nome":"Romano Schmid","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-840","numero":840,"nome":"Patrick Wimmer","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-841","numero":841,"nome":"Christoph Baumgartner","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-842","numero":842,"nome":"Michael Gregoritsch","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-843","numero":843,"nome":"Marko Arnautović","selecao":"Áustria","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-844","numero":844,"nome":"Emblem","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-845","numero":845,"nome":"Yazeed Abulaila","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-846","numero":846,"nome":"Ihsan Haddad","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-847","numero":847,"nome":"Mohammad Abu Hashish","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-848","numero":848,"nome":"Yazan Al-Arab","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-849","numero":849,"nome":"Abdallah Nasib","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-850","numero":850,"nome":"Saleem Obaid","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-851","numero":851,"nome":"Mohammad Abualnadi","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-852","numero":852,"nome":"Ibrahim Saadeh","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-853","numero":853,"nome":"Nizar Al-Rashdan","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-854","numero":854,"nome":"Noor Al-Rawabdeh","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-855","numero":855,"nome":"Mohannad Abu Taha","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-856","numero":856,"nome":"Team Photo","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-857","numero":857,"nome":"Amer Jamous","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-858","numero":858,"nome":"Musa Al-Taamari","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-859","numero":859,"nome":"Yazan Al-Naimat","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-860","numero":860,"nome":"Mahmoud Al-Mardi","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-861","numero":861,"nome":"Ali Olwan","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-862","numero":862,"nome":"Mohammad Abu Zrayq","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-863","numero":863,"nome":"Ibrahim Sabra","selecao":"Jordânia","posicao":"ESP","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-864","numero":864,"nome":"Emblem","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-865","numero":865,"nome":"Diogo Costa","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-866","numero":866,"nome":"José Sá","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-867","numero":867,"nome":"Ruben Dias","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-868","numero":868,"nome":"João Cancelo","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-869","numero":869,"nome":"Diogo Dalot","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-870","numero":870,"nome":"Nuno Mendes","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-871","numero":871,"nome":"Gonçalo Inácio","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-872","numero":872,"nome":"Bernardo Silva","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-873","numero":873,"nome":"Bruno Fernandes","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-874","numero":874,"nome":"Ruben Neves","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-875","numero":875,"nome":"Vitinha","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-876","numero":876,"nome":"Team Photo","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-877","numero":877,"nome":"João Neves","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-878","numero":878,"nome":"Cristiano Ronaldo","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-879","numero":879,"nome":"Francisco Trincao","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-880","numero":880,"nome":"João Felix","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-881","numero":881,"nome":"Gonçalo Ramos","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-882","numero":882,"nome":"Pedro Neto","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-883","numero":883,"nome":"Rafael Leão","selecao":"Portugal","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-884","numero":884,"nome":"Emblem","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-885","numero":885,"nome":"Lionel Mpasi-Nzau","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-886","numero":886,"nome":"Aaron Wan-Bissaka","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-887","numero":887,"nome":"Axel Tuanzebe","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-888","numero":888,"nome":"Arthur Masuaku","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-889","numero":889,"nome":"Chancel Mbemba","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-890","numero":890,"nome":"Joris Kayembe","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-891","numero":891,"nome":"Charles Pickel","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-892","numero":892,"nome":"Ngal'ayel Mukau","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-893","numero":893,"nome":"Edo Kayembe","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-894","numero":894,"nome":"Samuel Moutoussamy","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-895","numero":895,"nome":"Noah Sadiki","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-896","numero":896,"nome":"Team Photo","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-897","numero":897,"nome":"Théo Bongonda","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-898","numero":898,"nome":"Meschak Elia","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-899","numero":899,"nome":"Yoane Wissa","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-900","numero":900,"nome":"Brian Cipenga","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-901","numero":901,"nome":"Fiston Mayele","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-902","numero":902,"nome":"Cédric Bakambu","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-903","numero":903,"nome":"Nathanaël Mbuku","selecao":"Congo","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-904","numero":904,"nome":"Emblem","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-905","numero":905,"nome":"Utkir Yusupov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-906","numero":906,"nome":"Farrukh Savfiev","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-907","numero":907,"nome":"Sherzod Nasrullaev","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-908","numero":908,"nome":"Umar Eshmurodov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-909","numero":909,"nome":"Husniddin Aliqulov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-910","numero":910,"nome":"Rustamjon Ashurmatov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-911","numero":911,"nome":"Khojiakbar Alijonov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-912","numero":912,"nome":"Abdukodir Khusanov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-913","numero":913,"nome":"Odiljon Hamrobekov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-914","numero":914,"nome":"Otabek Shukurov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-915","numero":915,"nome":"Jamshid Iskanderov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-916","numero":916,"nome":"Team Photo","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-917","numero":917,"nome":"Azizbek Turgunboev","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-918","numero":918,"nome":"Khojimat Erkinov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-919","numero":919,"nome":"Eldor Shomurodov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-920","numero":920,"nome":"Oston Urunov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-921","numero":921,"nome":"Jaloliddin Masharipov","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-922","numero":922,"nome":"Igor Sergeev","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-923","numero":923,"nome":"Abbosbek Fayzullaev","selecao":"Uzbequistão","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-924","numero":924,"nome":"Emblem","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-925","numero":925,"nome":"Camilo Vargas","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-926","numero":926,"nome":"David Ospina","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-927","numero":927,"nome":"Dávinson Sánchez","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-928","numero":928,"nome":"Yerry Mina","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-929","numero":929,"nome":"Daniel Munoz","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-930","numero":930,"nome":"Johan Mojica","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-931","numero":931,"nome":"Jhon Lucumí","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-932","numero":932,"nome":"Santiago Arias","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-933","numero":933,"nome":"Jefferson Lerma","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-934","numero":934,"nome":"Kevin Castaño","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-935","numero":935,"nome":"Richard Rios","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-936","numero":936,"nome":"Team Photo","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-937","numero":937,"nome":"James Rodriguez","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-938","numero":938,"nome":"Juan Fernando Quintero","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-939","numero":939,"nome":"Jorge Carrascal","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-940","numero":940,"nome":"Jhon Arias","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-941","numero":941,"nome":"Jhon Cordova","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-942","numero":942,"nome":"Luis Suarez","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-943","numero":943,"nome":"Luis Diaz","selecao":"Colômbia","posicao":"ESP","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-944","numero":944,"nome":"Emblem","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-945","numero":945,"nome":"Jordan Pickford","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-946","numero":946,"nome":"John Stones","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-947","numero":947,"nome":"Marc Guéhi","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-948","numero":948,"nome":"Ezri Konsa","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-949","numero":949,"nome":"Trent Alexander-Arnold","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-950","numero":950,"nome":"Reece James","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-951","numero":951,"nome":"Dan Burn","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-952","numero":952,"nome":"Jordan Henderson","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-953","numero":953,"nome":"Declan Rice","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-954","numero":954,"nome":"Jude Bellingham","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-955","numero":955,"nome":"Cole Palmer","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-956","numero":956,"nome":"Team Photo","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-957","numero":957,"nome":"Morgan Rogers","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-958","numero":958,"nome":"Anthony Gordon","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-959","numero":959,"nome":"Phil Foden","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-960","numero":960,"nome":"Bukayo Saka","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-961","numero":961,"nome":"Harry Kane","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-962","numero":962,"nome":"Marcus Rashford","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-963","numero":963,"nome":"Ollie Watkins","selecao":"Inglaterra","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-964","numero":964,"nome":"Emblem","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-965","numero":965,"nome":"Dominik Livaković","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-966","numero":966,"nome":"Duje Caleta-Car","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-967","numero":967,"nome":"Josko Gvardiol","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-968","numero":968,"nome":"Josip Stanišić","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-969","numero":969,"nome":"Luka Vušković","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-970","numero":970,"nome":"Josip Sutalo","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-971","numero":971,"nome":"Kristijan Jakic","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-972","numero":972,"nome":"Luka Modrić","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-973","numero":973,"nome":"Mateo Kovacic","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-974","numero":974,"nome":"Martin Baturina","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-975","numero":975,"nome":"Lovro Majer","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-976","numero":976,"nome":"Team Photo","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-977","numero":977,"nome":"Mario Pasalic","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-978","numero":978,"nome":"Petar Sucic","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-979","numero":979,"nome":"Ivan Perišić","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-980","numero":980,"nome":"Marco Pasalic","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-981","numero":981,"nome":"Ante Budimir","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-982","numero":982,"nome":"Andrej Kramarić","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-983","numero":983,"nome":"Franjo Ivanovic","selecao":"Croácia","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-984","numero":984,"nome":"Emblem","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-985","numero":985,"nome":"Lawrence Ati Zigi","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-986","numero":986,"nome":"Tariq Lamptey","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-987","numero":987,"nome":"Mohammed Salisu","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-988","numero":988,"nome":"Alidu Seidu","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-989","numero":989,"nome":"Alexander Djiku","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-990","numero":990,"nome":"Gideon Mensah","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-991","numero":991,"nome":"Caleb Yirenkyi","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-992","numero":992,"nome":"Abdul Issahaku Fatawu","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-993","numero":993,"nome":"Thomas Partey","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-994","numero":994,"nome":"Salis Abdul Samed","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-995","numero":995,"nome":"Kamaldeen Sulemana","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-996","numero":996,"nome":"Team Photo","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-997","numero":997,"nome":"Mohammed Kudus","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-998","numero":998,"nome":"Inaki Williams","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-999","numero":999,"nome":"Jordan Ayew","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1000","numero":1000,"nome":"André Ayew","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1001","numero":1001,"nome":"Joseph Paintsil","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1002","numero":1002,"nome":"Osman Bukari","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1003","numero":1003,"nome":"Antoine Semenyo","selecao":"Gana","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1004","numero":1004,"nome":"Emblem","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1005","numero":1005,"nome":"Orlando Mosquera","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1006","numero":1006,"nome":"Luis Mejia","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1007","numero":1007,"nome":"Fidel Escobar","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1008","numero":1008,"nome":"Andres Andrade","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1009","numero":1009,"nome":"Michael Amir Murillo","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1010","numero":1010,"nome":"Eric Davis","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1011","numero":1011,"nome":"Jose Cordoba","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1012","numero":1012,"nome":"Cesar Blackman","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1013","numero":1013,"nome":"Cristian Martinez","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1014","numero":1014,"nome":"Aníbal Godoy","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1015","numero":1015,"nome":"Adalberto Carrasquilla","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1016","numero":1016,"nome":"Team Photo","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1017","numero":1017,"nome":"Édgar Bárcenas","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1018","numero":1018,"nome":"Carlos Harvey","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1019","numero":1019,"nome":"Ismael Díaz","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1020","numero":1020,"nome":"Jose Fajardo","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1021","numero":1021,"nome":"Cecilio Waterman","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1022","numero":1022,"nome":"Jose Luiz Rodriguez","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1023","numero":1023,"nome":"Alberto Quintero","selecao":"Panamá","posicao":"ESP","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-1024","numero":1024,"nome":"Italy 1934","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1025","numero":1025,"nome":"Uruguay 1950","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1026","numero":1026,"nome":"West Germany 1954","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1027","numero":1027,"nome":"Brazil 1962","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1028","numero":1028,"nome":"West Germany 1974","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1029","numero":1029,"nome":"Argentina 1986","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1030","numero":1030,"nome":"Brazil 1994","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1031","numero":1031,"nome":"Brazil 2002","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1032","numero":1032,"nome":"Italy 2006","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1033","numero":1033,"nome":"Germany 2014","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""},
    {"id":"fig-1034","numero":1034,"nome":"Argentina 2022","selecao":"História","posicao":"ESP","grupo":"ESP","raridade":"comum","categoria":"especial","urlImagem":""}
  ];

  // Gera id e urlImagem para cada figurinha
  const FIGURINHAS = FIGURINHAS_BASE.map((f) => {
    const id = 'fig-' + String(f.numero).padStart(3, '0');
    const figCompleta = Object.assign({}, f, { id });
    return Object.assign({}, figCompleta, { urlImagem: '' });
  });

  // Constantes auxiliares
  const GRUPOS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'ESP'];
  const POSICOES = ['GOL', 'ZAG', 'LAT', 'VOL', 'MEI', 'ATA', 'TEC', 'ESP'];
  const RARIDADES = ['comum', 'rara', 'lendaria'];
  const ESTADOS = ['todas', 'tenho', 'falta', 'repetida'];
  const CATEGORIAS = ['jogador', 'especial', 'tecnico'];

  // Expõe no escopo global
  global.AlbumCopa = global.AlbumCopa || {};
  global.AlbumCopa.BANDEIRAS = BANDEIRAS;
  global.AlbumCopa.data = {
    figurinhas: FIGURINHAS,
    grupos: GRUPOS,
    posicoes: POSICOES,
    raridades: RARIDADES,
    estados: ESTADOS,
    categorias: CATEGORIAS,
    total: FIGURINHAS.length
  };
})(typeof window !== 'undefined' ? window : globalThis);

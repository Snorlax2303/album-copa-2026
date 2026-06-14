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

    return `
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
    {"id":"fig-001","numero":1,"nome":"Alisson","selecao":"Brasil","posicao":"GOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-002","numero":2,"nome":"Marquinhos","selecao":"Brasil","posicao":"ZAG","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-003","numero":3,"nome":"Gabriel Magalhães","selecao":"Brasil","posicao":"ZAG","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-004","numero":4,"nome":"Danilo","selecao":"Brasil","posicao":"LAT","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-005","numero":5,"nome":"Alex Sandro","selecao":"Brasil","posicao":"LAT","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-006","numero":6,"nome":"Casemiro","selecao":"Brasil","posicao":"VOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-007","numero":7,"nome":"Bruno Guimarães","selecao":"Brasil","posicao":"VOL","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-008","numero":8,"nome":"Rodrygo","selecao":"Brasil","posicao":"ATA","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-009","numero":9,"nome":"Vinícius Jr.","selecao":"Brasil","posicao":"ATA","grupo":"A","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-010","numero":10,"nome":"Raphinha","selecao":"Brasil","posicao":"ATA","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-011","numero":11,"nome":"Endrick","selecao":"Brasil","posicao":"ATA","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-012","numero":12,"nome":"Dorival Júnior","selecao":"Brasil","posicao":"TEC","grupo":"A","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-013","numero":13,"nome":"Bono","selecao":"Marrocos","posicao":"GOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-014","numero":14,"nome":"Achraf Hakimi","selecao":"Marrocos","posicao":"LAT","grupo":"A","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-015","numero":15,"nome":"Romain Saïss","selecao":"Marrocos","posicao":"ZAG","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-016","numero":16,"nome":"Nayef Aguerd","selecao":"Marrocos","posicao":"ZAG","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-017","numero":17,"nome":"Noussair Mazraoui","selecao":"Marrocos","posicao":"LAT","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-018","numero":18,"nome":"Sofyan Amrabat","selecao":"Marrocos","posicao":"VOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-019","numero":19,"nome":"Azzedine Ounahi","selecao":"Marrocos","posicao":"MEI","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-020","numero":20,"nome":"Hakim Ziyech","selecao":"Marrocos","posicao":"MEI","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-021","numero":21,"nome":"Sofiane Boufal","selecao":"Marrocos","posicao":"ATA","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-022","numero":22,"nome":"Youssef En-Nesyri","selecao":"Marrocos","posicao":"ATA","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-023","numero":23,"nome":"Walid Regragui","selecao":"Marrocos","posicao":"TEC","grupo":"A","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-024","numero":24,"nome":"Dominik Livaković","selecao":"Croácia","posicao":"GOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-025","numero":25,"nome":"Josko Gvardiol","selecao":"Croácia","posicao":"ZAG","grupo":"A","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-026","numero":26,"nome":"Dejan Lovren","selecao":"Croácia","posicao":"ZAG","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-027","numero":27,"nome":"Ivan Perišić","selecao":"Croácia","posicao":"LAT","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-028","numero":28,"nome":"Borna Barišić","selecao":"Croácia","posicao":"LAT","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-029","numero":29,"nome":"Luka Modrić","selecao":"Croácia","posicao":"VOL","grupo":"A","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-030","numero":30,"nome":"Mateo Kovačić","selecao":"Croácia","posicao":"VOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-031","numero":31,"nome":"Marcelo Brozović","selecao":"Croácia","posicao":"VOL","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-032","numero":32,"nome":"Ivan Rakitić","selecao":"Croácia","posicao":"MEI","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-033","numero":33,"nome":"Andrej Kramarić","selecao":"Croácia","posicao":"ATA","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-034","numero":34,"nome":"Bruno Petković","selecao":"Croácia","posicao":"ATA","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-035","numero":35,"nome":"Zlatko Dalić","selecao":"Croácia","posicao":"TEC","grupo":"A","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-036","numero":36,"nome":"Angus Gunn","selecao":"Escócia","posicao":"GOL","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-037","numero":37,"nome":"Kieran Tierney","selecao":"Escócia","posicao":"ZAG","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-038","numero":38,"nome":"Grant Hanley","selecao":"Escócia","posicao":"ZAG","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-039","numero":39,"nome":"Andrew Robertson","selecao":"Escócia","posicao":"LAT","grupo":"A","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-040","numero":40,"nome":"Aaron Hickey","selecao":"Escócia","posicao":"LAT","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-041","numero":41,"nome":"John McGinn","selecao":"Escócia","posicao":"VOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-042","numero":42,"nome":"Scott McTominay","selecao":"Escócia","posicao":"VOL","grupo":"A","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-043","numero":43,"nome":"Billy Gilmour","selecao":"Escócia","posicao":"MEI","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-044","numero":44,"nome":"Lyndon Dykes","selecao":"Escócia","posicao":"ATA","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-045","numero":45,"nome":"Che Adams","selecao":"Escócia","posicao":"ATA","grupo":"A","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-046","numero":46,"nome":"Steve Clarke","selecao":"Escócia","posicao":"TEC","grupo":"A","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-047","numero":47,"nome":"Dibu Martínez","selecao":"Argentina","posicao":"GOL","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-048","numero":48,"nome":"Otamendi","selecao":"Argentina","posicao":"ZAG","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-049","numero":49,"nome":"Cristian Romero","selecao":"Argentina","posicao":"ZAG","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-050","numero":50,"nome":"Nahuel Molina","selecao":"Argentina","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-051","numero":51,"nome":"Marcos Acuña","selecao":"Argentina","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-052","numero":52,"nome":"Rodrigo De Paul","selecao":"Argentina","posicao":"VOL","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-053","numero":53,"nome":"Enzo Fernández","selecao":"Argentina","posicao":"VOL","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-054","numero":54,"nome":"Giovani Lo Celso","selecao":"Argentina","posicao":"MEI","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-055","numero":55,"nome":"Lionel Messi","selecao":"Argentina","posicao":"ATA","grupo":"B","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-056","numero":56,"nome":"Julián Álvarez","selecao":"Argentina","posicao":"ATA","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-057","numero":57,"nome":"Lautaro Martínez","selecao":"Argentina","posicao":"ATA","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-058","numero":58,"nome":"Scaloni","selecao":"Argentina","posicao":"TEC","grupo":"B","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-059","numero":59,"nome":"Diogo Costa","selecao":"Portugal","posicao":"GOL","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-060","numero":60,"nome":"Rúben Dias","selecao":"Portugal","posicao":"ZAG","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-061","numero":61,"nome":"Pepe","selecao":"Portugal","posicao":"ZAG","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-062","numero":62,"nome":"João Cancelo","selecao":"Portugal","posicao":"LAT","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-063","numero":63,"nome":"Nuno Mendes","selecao":"Portugal","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-064","numero":64,"nome":"Bruno Fernandes","selecao":"Portugal","posicao":"MEI","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-065","numero":65,"nome":"Bernardo Silva","selecao":"Portugal","posicao":"MEI","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-066","numero":66,"nome":"Vitinha","selecao":"Portugal","posicao":"VOL","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-067","numero":67,"nome":"Cristiano Ronaldo","selecao":"Portugal","posicao":"ATA","grupo":"B","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-068","numero":68,"nome":"Rafael Leão","selecao":"Portugal","posicao":"ATA","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-069","numero":69,"nome":"Gonçalo Ramos","selecao":"Portugal","posicao":"ATA","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-070","numero":70,"nome":"Roberto Martínez","selecao":"Portugal","posicao":"TEC","grupo":"B","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-071","numero":71,"nome":"Kim Seung-gyu","selecao":"Coreia do Sul","posicao":"GOL","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-072","numero":72,"nome":"Kim Min-jae","selecao":"Coreia do Sul","posicao":"ZAG","grupo":"B","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-073","numero":73,"nome":"Kwon Kyung-won","selecao":"Coreia do Sul","posicao":"ZAG","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-074","numero":74,"nome":"Kim Jin-su","selecao":"Coreia do Sul","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-075","numero":75,"nome":"Lee Ki-je","selecao":"Coreia do Sul","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-076","numero":76,"nome":"Son Heung-min","selecao":"Coreia do Sul","posicao":"ATA","grupo":"B","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-077","numero":77,"nome":"Hwang Hee-chan","selecao":"Coreia do Sul","posicao":"ATA","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-078","numero":78,"nome":"Lee Jae-sung","selecao":"Coreia do Sul","posicao":"MEI","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-079","numero":79,"nome":"Jung Woo-young","selecao":"Coreia do Sul","posicao":"VOL","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-080","numero":80,"nome":"Hwang In-beom","selecao":"Coreia do Sul","posicao":"VOL","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-081","numero":81,"nome":"Paik Seung-ho","selecao":"Coreia do Sul","posicao":"MEI","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-082","numero":82,"nome":"Jurgen Klinsmann","selecao":"Coreia do Sul","posicao":"TEC","grupo":"B","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-083","numero":83,"nome":"Yazeed Abulaila","selecao":"Jordânia","posicao":"GOL","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-084","numero":84,"nome":"Yazan Al-Arab","selecao":"Jordânia","posicao":"ZAG","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-085","numero":85,"nome":"Salem Al-Ajalin","selecao":"Jordânia","posicao":"ZAG","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-086","numero":86,"nome":"Mousa Al-Tamari","selecao":"Jordânia","posicao":"ATA","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-087","numero":87,"nome":"Hussein Al-Zoubi","selecao":"Jordânia","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-088","numero":88,"nome":"Nizar Al-Rashdan","selecao":"Jordânia","posicao":"LAT","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-089","numero":89,"nome":"Yahya Al-Khatib","selecao":"Jordânia","posicao":"MEI","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-090","numero":90,"nome":"Mohanad Abu Issa","selecao":"Jordânia","posicao":"ATA","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-091","numero":91,"nome":"Hamza Al-Dardour","selecao":"Jordânia","posicao":"ATA","grupo":"B","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-092","numero":92,"nome":"Baha Faisal","selecao":"Jordânia","posicao":"VOL","grupo":"B","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-093","numero":93,"nome":"Hussein Ammouta","selecao":"Jordânia","posicao":"TEC","grupo":"B","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-094","numero":94,"nome":"Matt Turner","selecao":"EUA","posicao":"GOL","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-095","numero":95,"nome":"Chris Richards","selecao":"EUA","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-096","numero":96,"nome":"Tim Ream","selecao":"EUA","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-097","numero":97,"nome":"Antonee Robinson","selecao":"EUA","posicao":"LAT","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-098","numero":98,"nome":"Sergino Dest","selecao":"EUA","posicao":"LAT","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-099","numero":99,"nome":"Tyler Adams","selecao":"EUA","posicao":"VOL","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-100","numero":100,"nome":"Weston McKennie","selecao":"EUA","posicao":"VOL","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-101","numero":101,"nome":"Yunus Musah","selecao":"EUA","posicao":"MEI","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-102","numero":102,"nome":"Christian Pulisic","selecao":"EUA","posicao":"ATA","grupo":"C","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-103","numero":103,"nome":"Folarin Balogun","selecao":"EUA","posicao":"ATA","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-104","numero":104,"nome":"Tim Weah","selecao":"EUA","posicao":"ATA","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-105","numero":105,"nome":"Mauricio Pochettino","selecao":"EUA","posicao":"TEC","grupo":"C","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-106","numero":106,"nome":"Manuel Neuer","selecao":"Alemanha","posicao":"GOL","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-107","numero":107,"nome":"Antonio Rüdiger","selecao":"Alemanha","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-108","numero":108,"nome":"Jonathan Tah","selecao":"Alemanha","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-109","numero":109,"nome":"Joshua Kimmich","selecao":"Alemanha","posicao":"LAT","grupo":"C","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-110","numero":110,"nome":"David Raum","selecao":"Alemanha","posicao":"LAT","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-111","numero":111,"nome":"Toni Kroos","selecao":"Alemanha","posicao":"MEI","grupo":"C","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-112","numero":112,"nome":"Jamal Musiala","selecao":"Alemanha","posicao":"MEI","grupo":"C","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-113","numero":113,"nome":"İlkay Gündoğan","selecao":"Alemanha","posicao":"VOL","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-114","numero":114,"nome":"Kai Havertz","selecao":"Alemanha","posicao":"ATA","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-115","numero":115,"nome":"Niclas Füllkrug","selecao":"Alemanha","posicao":"ATA","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-116","numero":116,"nome":"Florian Wirtz","selecao":"Alemanha","posicao":"MEI","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-117","numero":117,"nome":"Julian Nagelsmann","selecao":"Alemanha","posicao":"TEC","grupo":"C","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-118","numero":118,"nome":"Édouard Mendy","selecao":"Senegal","posicao":"GOL","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-119","numero":119,"nome":"Kalidou Koulibaly","selecao":"Senegal","posicao":"ZAG","grupo":"C","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-120","numero":120,"nome":"Abdou Diallo","selecao":"Senegal","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-121","numero":121,"nome":"Fodé Ballo-Touré","selecao":"Senegal","posicao":"LAT","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-122","numero":122,"nome":"Ismail Jakobs","selecao":"Senegal","posicao":"LAT","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-123","numero":123,"nome":"Idrissa Gueye","selecao":"Senegal","posicao":"VOL","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-124","numero":124,"nome":"Krépin Diatta","selecao":"Senegal","posicao":"MEI","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-125","numero":125,"nome":"Sadio Mané","selecao":"Senegal","posicao":"ATA","grupo":"C","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-126","numero":126,"nome":"Nicolas Jackson","selecao":"Senegal","posicao":"ATA","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-127","numero":127,"nome":"Boulaye Dia","selecao":"Senegal","posicao":"ATA","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-128","numero":128,"nome":"Pape Matar Sarr","selecao":"Senegal","posicao":"VOL","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-129","numero":129,"nome":"Aliou Cissé","selecao":"Senegal","posicao":"TEC","grupo":"C","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-130","numero":130,"nome":"Mathew Ryan","selecao":"Austrália","posicao":"GOL","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-131","numero":131,"nome":"Harry Souttar","selecao":"Austrália","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-132","numero":132,"nome":"Kye Rowles","selecao":"Austrália","posicao":"ZAG","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-133","numero":133,"nome":"Aziz Behich","selecao":"Austrália","posicao":"LAT","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-134","numero":134,"nome":"Fran Karacic","selecao":"Austrália","posicao":"LAT","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-135","numero":135,"nome":"Aaron Mooy","selecao":"Austrália","posicao":"MEI","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-136","numero":136,"nome":"Jackson Irvine","selecao":"Austrália","posicao":"VOL","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-137","numero":137,"nome":"Mathew Leckie","selecao":"Austrália","posicao":"ATA","grupo":"C","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-138","numero":138,"nome":"Awer Mabil","selecao":"Austrália","posicao":"ATA","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-139","numero":139,"nome":"Jamie Maclaren","selecao":"Austrália","posicao":"ATA","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-140","numero":140,"nome":"Riley McGree","selecao":"Austrália","posicao":"MEI","grupo":"C","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-141","numero":141,"nome":"Tony Popovic","selecao":"Austrália","posicao":"TEC","grupo":"C","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-142","numero":142,"nome":"Guillermo Ochoa","selecao":"México","posicao":"GOL","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-143","numero":143,"nome":"César Montes","selecao":"México","posicao":"ZAG","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-144","numero":144,"nome":"Johan Vásquez","selecao":"México","posicao":"ZAG","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-145","numero":145,"nome":"Jesús Gallardo","selecao":"México","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-146","numero":146,"nome":"Jorge Sánchez","selecao":"México","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-147","numero":147,"nome":"Edson Álvarez","selecao":"México","posicao":"VOL","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-148","numero":148,"nome":"Luis Chávez","selecao":"México","posicao":"MEI","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-149","numero":149,"nome":"Hirving Lozano","selecao":"México","posicao":"ATA","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-150","numero":150,"nome":"Santiago Giménez","selecao":"México","posicao":"ATA","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-151","numero":151,"nome":"Henry Martín","selecao":"México","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-152","numero":152,"nome":"Orbelín Pineda","selecao":"México","posicao":"MEI","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-153","numero":153,"nome":"Javier Aguirre","selecao":"México","posicao":"TEC","grupo":"D","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-154","numero":154,"nome":"Yann Sommer","selecao":"Suíça","posicao":"GOL","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-155","numero":155,"nome":"Manuel Akanji","selecao":"Suíça","posicao":"ZAG","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-156","numero":156,"nome":"Nico Elvedi","selecao":"Suíça","posicao":"ZAG","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-157","numero":157,"nome":"Ricardo Rodríguez","selecao":"Suíça","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-158","numero":158,"nome":"Silvan Widmer","selecao":"Suíça","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-159","numero":159,"nome":"Granit Xhaka","selecao":"Suíça","posicao":"VOL","grupo":"D","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-160","numero":160,"nome":"Remo Freuler","selecao":"Suíça","posicao":"VOL","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-161","numero":161,"nome":"Xherdan Shaqiri","selecao":"Suíça","posicao":"MEI","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-162","numero":162,"nome":"Denis Zakaria","selecao":"Suíça","posicao":"VOL","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-163","numero":163,"nome":"Breel Embolo","selecao":"Suíça","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-164","numero":164,"nome":"Noah Okafor","selecao":"Suíça","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-165","numero":165,"nome":"Murat Yakin","selecao":"Suíça","posicao":"TEC","grupo":"D","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-166","numero":166,"nome":"Lawrence Ati-Zigi","selecao":"Gana","posicao":"GOL","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-167","numero":167,"nome":"Mohammed Salisu","selecao":"Gana","posicao":"ZAG","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-168","numero":168,"nome":"Alexander Djiku","selecao":"Gana","posicao":"ZAG","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-169","numero":169,"nome":"Gideon Mensah","selecao":"Gana","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-170","numero":170,"nome":"Denis Odoi","selecao":"Gana","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-171","numero":171,"nome":"Thomas Partey","selecao":"Gana","posicao":"VOL","grupo":"D","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-172","numero":172,"nome":"Mohammed Kudus","selecao":"Gana","posicao":"MEI","grupo":"D","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-173","numero":173,"nome":"André Ayew","selecao":"Gana","posicao":"ATA","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-174","numero":174,"nome":"Jordan Ayew","selecao":"Gana","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-175","numero":175,"nome":"Iñaki Williams","selecao":"Gana","posicao":"ATA","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-176","numero":176,"nome":"Ernest Nuamah","selecao":"Gana","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-177","numero":177,"nome":"Otto Addo","selecao":"Gana","posicao":"TEC","grupo":"D","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-178","numero":178,"nome":"Tomáš Vaclík","selecao":"Tchéquia","posicao":"GOL","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-179","numero":179,"nome":"Vladimír Coufal","selecao":"Tchéquia","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-180","numero":180,"nome":"David Zima","selecao":"Tchéquia","posicao":"ZAG","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-181","numero":181,"nome":"Jakub Brabec","selecao":"Tchéquia","posicao":"ZAG","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-182","numero":182,"nome":"Adam Hlozek","selecao":"Tchéquia","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-183","numero":183,"nome":"Patrik Schick","selecao":"Tchéquia","posicao":"ATA","grupo":"D","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-184","numero":184,"nome":"Tomáš Souček","selecao":"Tchéquia","posicao":"VOL","grupo":"D","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-185","numero":185,"nome":"Lukáš Provod","selecao":"Tchéquia","posicao":"MEI","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-186","numero":186,"nome":"Vladimír Darida","selecao":"Tchéquia","posicao":"VOL","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-187","numero":187,"nome":"Jaroslav Zelený","selecao":"Tchéquia","posicao":"LAT","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-188","numero":188,"nome":"Mojmír Chytil","selecao":"Tchéquia","posicao":"ATA","grupo":"D","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-189","numero":189,"nome":"Ivan Hašek","selecao":"Tchéquia","posicao":"TEC","grupo":"D","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-190","numero":190,"nome":"Milan Borjan","selecao":"Canadá","posicao":"GOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-191","numero":191,"nome":"Alphonso Davies","selecao":"Canadá","posicao":"LAT","grupo":"E","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-192","numero":192,"nome":"Stephen Eustáquio","selecao":"Canadá","posicao":"MEI","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-193","numero":193,"nome":"Jonathan David","selecao":"Canadá","posicao":"ATA","grupo":"E","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-194","numero":194,"nome":"Cyle Larin","selecao":"Canadá","posicao":"ATA","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-195","numero":195,"nome":"Tajon Buchanan","selecao":"Canadá","posicao":"ATA","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-196","numero":196,"nome":"Atiba Hutchinson","selecao":"Canadá","posicao":"VOL","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-197","numero":197,"nome":"Richie Laryea","selecao":"Canadá","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-198","numero":198,"nome":"Kamal Miller","selecao":"Canadá","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-199","numero":199,"nome":"Derek Cornelius","selecao":"Canadá","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-200","numero":200,"nome":"Luca Koleosho","selecao":"Canadá","posicao":"ATA","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-201","numero":201,"nome":"Jesse Marsch","selecao":"Canadá","posicao":"TEC","grupo":"E","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-202","numero":202,"nome":"Unai Simón","selecao":"Espanha","posicao":"GOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-203","numero":203,"nome":"Dani Carvajal","selecao":"Espanha","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-204","numero":204,"nome":"Aymeric Laporte","selecao":"Espanha","posicao":"ZAG","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-205","numero":205,"nome":"Robin Le Normand","selecao":"Espanha","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-206","numero":206,"nome":"Jordi Alba","selecao":"Espanha","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-207","numero":207,"nome":"Pedri","selecao":"Espanha","posicao":"MEI","grupo":"E","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-208","numero":208,"nome":"Rodri","selecao":"Espanha","posicao":"VOL","grupo":"E","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-209","numero":209,"nome":"Gavi","selecao":"Espanha","posicao":"MEI","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-210","numero":210,"nome":"Lamine Yamal","selecao":"Espanha","posicao":"ATA","grupo":"E","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-211","numero":211,"nome":"Álvaro Morata","selecao":"Espanha","posicao":"ATA","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-212","numero":212,"nome":"Nico Williams","selecao":"Espanha","posicao":"ATA","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-213","numero":213,"nome":"Luis de la Fuente","selecao":"Espanha","posicao":"TEC","grupo":"E","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-214","numero":214,"nome":"Meshaal Barsham","selecao":"Catar","posicao":"GOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-215","numero":215,"nome":"Boualem Khoukhi","selecao":"Catar","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-216","numero":216,"nome":"Pedro Correia","selecao":"Catar","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-217","numero":217,"nome":"Abdelkarim Hassan","selecao":"Catar","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-218","numero":218,"nome":"Homam Ahmed","selecao":"Catar","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-219","numero":219,"nome":"Hassan Al-Haydos","selecao":"Catar","posicao":"MEI","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-220","numero":220,"nome":"Karim Boudiaf","selecao":"Catar","posicao":"VOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-221","numero":221,"nome":"Akram Afif","selecao":"Catar","posicao":"ATA","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-222","numero":222,"nome":"Almoez Ali","selecao":"Catar","posicao":"ATA","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-223","numero":223,"nome":"Ismail Mohammad","selecao":"Catar","posicao":"ATA","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-224","numero":224,"nome":"Asim Madibo","selecao":"Catar","posicao":"VOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-225","numero":225,"nome":"Tintin Márquez","selecao":"Catar","posicao":"TEC","grupo":"E","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-226","numero":226,"nome":"Stefan Marinovic","selecao":"Nova Zelândia","posicao":"GOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-227","numero":227,"nome":"Winston Reid","selecao":"Nova Zelândia","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-228","numero":228,"nome":"Bill Tuiloma","selecao":"Nova Zelândia","posicao":"ZAG","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-229","numero":229,"nome":"Liberato Cacace","selecao":"Nova Zelândia","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-230","numero":230,"nome":"Tim Payne","selecao":"Nova Zelândia","posicao":"LAT","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-231","numero":231,"nome":"Joe Bell","selecao":"Nova Zelândia","posicao":"VOL","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-232","numero":232,"nome":"Sarpreet Singh","selecao":"Nova Zelândia","posicao":"MEI","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-233","numero":233,"nome":"Marco Rojas","selecao":"Nova Zelândia","posicao":"ATA","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-234","numero":234,"nome":"Chris Wood","selecao":"Nova Zelândia","posicao":"ATA","grupo":"E","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-235","numero":235,"nome":"Elijah Just","selecao":"Nova Zelândia","posicao":"ATA","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-236","numero":236,"nome":"Alex Rufer","selecao":"Nova Zelândia","posicao":"MEI","grupo":"E","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-237","numero":237,"nome":"Darren Bazeley","selecao":"Nova Zelândia","posicao":"TEC","grupo":"E","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-238","numero":238,"nome":"Mike Maignan","selecao":"França","posicao":"GOL","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-239","numero":239,"nome":"Jules Koundé","selecao":"França","posicao":"ZAG","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-240","numero":240,"nome":"Dayot Upamecano","selecao":"França","posicao":"ZAG","grupo":"F","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-241","numero":241,"nome":"Theo Hernández","selecao":"França","posicao":"LAT","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-242","numero":242,"nome":"Benjamin Pavard","selecao":"França","posicao":"LAT","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-243","numero":243,"nome":"Aurélien Tchouaméni","selecao":"França","posicao":"VOL","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-244","numero":244,"nome":"Eduardo Camavinga","selecao":"França","posicao":"VOL","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-245","numero":245,"nome":"Adrien Rabiot","selecao":"França","posicao":"MEI","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-246","numero":246,"nome":"Kylian Mbappé","selecao":"França","posicao":"ATA","grupo":"F","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-247","numero":247,"nome":"Antoine Griezmann","selecao":"França","posicao":"ATA","grupo":"F","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-248","numero":248,"nome":"Marcus Thuram","selecao":"França","posicao":"ATA","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-249","numero":249,"nome":"Didier Deschamps","selecao":"França","posicao":"TEC","grupo":"F","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-250","numero":250,"nome":"Kasper Schmeichel","selecao":"Dinamarca","posicao":"GOL","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-251","numero":251,"nome":"Simon Kjær","selecao":"Dinamarca","posicao":"ZAG","grupo":"F","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-252","numero":252,"nome":"Andreas Christensen","selecao":"Dinamarca","posicao":"ZAG","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-253","numero":253,"nome":"Joakim Maehle","selecao":"Dinamarca","posicao":"LAT","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-254","numero":254,"nome":"Rasmus Kristensen","selecao":"Dinamarca","posicao":"LAT","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-255","numero":255,"nome":"Christian Eriksen","selecao":"Dinamarca","posicao":"MEI","grupo":"F","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-256","numero":256,"nome":"Pierre-Emile Højbjerg","selecao":"Dinamarca","posicao":"VOL","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-257","numero":257,"nome":"Thomas Delaney","selecao":"Dinamarca","posicao":"VOL","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-258","numero":258,"nome":"Martin Braithwaite","selecao":"Dinamarca","posicao":"ATA","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-259","numero":259,"nome":"Rasmus Højlund","selecao":"Dinamarca","posicao":"ATA","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-260","numero":260,"nome":"Mikkel Damsgaard","selecao":"Dinamarca","posicao":"MEI","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-261","numero":261,"nome":"Kasper Hjulmand","selecao":"Dinamarca","posicao":"TEC","grupo":"F","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-262","numero":262,"nome":"Pedro Gallese","selecao":"Peru","posicao":"GOL","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-263","numero":263,"nome":"Luis Advíncula","selecao":"Peru","posicao":"LAT","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-264","numero":264,"nome":"Carlos Zambrano","selecao":"Peru","posicao":"ZAG","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-265","numero":265,"nome":"Alexander Callens","selecao":"Peru","posicao":"ZAG","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-266","numero":266,"nome":"Miguel Trauco","selecao":"Peru","posicao":"LAT","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-267","numero":267,"nome":"Renato Tapia","selecao":"Peru","posicao":"VOL","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-268","numero":268,"nome":"Yoshimar Yotún","selecao":"Peru","posicao":"MEI","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-269","numero":269,"nome":"Christian Cueva","selecao":"Peru","posicao":"MEI","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-270","numero":270,"nome":"André Carrillo","selecao":"Peru","posicao":"ATA","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-271","numero":271,"nome":"Gianluca Lapadula","selecao":"Peru","posicao":"ATA","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-272","numero":272,"nome":"Paolo Guerrero","selecao":"Peru","posicao":"ATA","grupo":"F","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-273","numero":273,"nome":"Jorge Fossati","selecao":"Peru","posicao":"TEC","grupo":"F","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-274","numero":274,"nome":"Utkir Yusupov","selecao":"Uzbequistão","posicao":"GOL","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-275","numero":275,"nome":"Islom Tukhtakhodjaev","selecao":"Uzbequistão","posicao":"ZAG","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-276","numero":276,"nome":"Husniddin Alikulov","selecao":"Uzbequistão","posicao":"ZAG","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-277","numero":277,"nome":"Rustam Ashurmatov","selecao":"Uzbequistão","posicao":"LAT","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-278","numero":278,"nome":"Farrukh Sayfiev","selecao":"Uzbequistão","posicao":"LAT","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-279","numero":279,"nome":"Jaloliddin Masharipov","selecao":"Uzbequistão","posicao":"MEI","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-280","numero":280,"nome":"Otabek Shukurov","selecao":"Uzbequistão","posicao":"VOL","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-281","numero":281,"nome":"Eldor Shomurodov","selecao":"Uzbequistão","posicao":"ATA","grupo":"F","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-282","numero":282,"nome":"Igor Sergeev","selecao":"Uzbequistão","posicao":"ATA","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-283","numero":283,"nome":"Jasurbek Jaloliddinov","selecao":"Uzbequistão","posicao":"MEI","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-284","numero":284,"nome":"Aziz Turgunboev","selecao":"Uzbequistão","posicao":"ATA","grupo":"F","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-285","numero":285,"nome":"Srecko Katanec","selecao":"Uzbequistão","posicao":"TEC","grupo":"F","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-286","numero":286,"nome":"Jordan Pickford","selecao":"Inglaterra","posicao":"GOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-287","numero":287,"nome":"John Stones","selecao":"Inglaterra","posicao":"ZAG","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-288","numero":288,"nome":"Harry Maguire","selecao":"Inglaterra","posicao":"ZAG","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-289","numero":289,"nome":"Luke Shaw","selecao":"Inglaterra","posicao":"LAT","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-290","numero":290,"nome":"Trent Alexander-Arnold","selecao":"Inglaterra","posicao":"LAT","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-291","numero":291,"nome":"Declan Rice","selecao":"Inglaterra","posicao":"VOL","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-292","numero":292,"nome":"Jude Bellingham","selecao":"Inglaterra","posicao":"MEI","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-293","numero":293,"nome":"Phil Foden","selecao":"Inglaterra","posicao":"MEI","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-294","numero":294,"nome":"Bukayo Saka","selecao":"Inglaterra","posicao":"ATA","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-295","numero":295,"nome":"Harry Kane","selecao":"Inglaterra","posicao":"ATA","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-296","numero":296,"nome":"Marcus Rashford","selecao":"Inglaterra","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-297","numero":297,"nome":"Thomas Tuchel","selecao":"Inglaterra","posicao":"TEC","grupo":"G","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-298","numero":298,"nome":"Bart Verbruggen","selecao":"Holanda","posicao":"GOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-299","numero":299,"nome":"Virgil van Dijk","selecao":"Holanda","posicao":"ZAG","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-300","numero":300,"nome":"Matthijs de Ligt","selecao":"Holanda","posicao":"ZAG","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-301","numero":301,"nome":"Nathan Aké","selecao":"Holanda","posicao":"ZAG","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-302","numero":302,"nome":"Denzel Dumfries","selecao":"Holanda","posicao":"LAT","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-303","numero":303,"nome":"Daley Blind","selecao":"Holanda","posicao":"LAT","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-304","numero":304,"nome":"Frenkie de Jong","selecao":"Holanda","posicao":"MEI","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-305","numero":305,"nome":"Tijjani Reijnders","selecao":"Holanda","posicao":"VOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-306","numero":306,"nome":"Cody Gakpo","selecao":"Holanda","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-307","numero":307,"nome":"Memphis Depay","selecao":"Holanda","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-308","numero":308,"nome":"Xavi Simons","selecao":"Holanda","posicao":"MEI","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-309","numero":309,"nome":"Ronald Koeman","selecao":"Holanda","posicao":"TEC","grupo":"G","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-310","numero":310,"nome":"Hernán Galíndez","selecao":"Equador","posicao":"GOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-311","numero":311,"nome":"Piero Hincapié","selecao":"Equador","posicao":"ZAG","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-312","numero":312,"nome":"Félix Torres","selecao":"Equador","posicao":"ZAG","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-313","numero":313,"nome":"Pervis Estupiñán","selecao":"Equador","posicao":"LAT","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-314","numero":314,"nome":"Ángelo Preciado","selecao":"Equador","posicao":"LAT","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-315","numero":315,"nome":"Moisés Caicedo","selecao":"Equador","posicao":"VOL","grupo":"G","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-316","numero":316,"nome":"Jhegson Méndez","selecao":"Equador","posicao":"VOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-317","numero":317,"nome":"Alan Franco","selecao":"Equador","posicao":"MEI","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-318","numero":318,"nome":"Enner Valencia","selecao":"Equador","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-319","numero":319,"nome":"Michael Estrada","selecao":"Equador","posicao":"ATA","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-320","numero":320,"nome":"Gonzalo Plata","selecao":"Equador","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-321","numero":321,"nome":"Sebastián Beccacece","selecao":"Equador","posicao":"TEC","grupo":"G","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-322","numero":322,"nome":"Jalal Hassan","selecao":"Iraque","posicao":"GOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-323","numero":323,"nome":"Ahmad Ibrahim","selecao":"Iraque","posicao":"ZAG","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-324","numero":324,"nome":"Saad Natiq","selecao":"Iraque","posicao":"ZAG","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-325","numero":325,"nome":"Ali Adnan","selecao":"Iraque","posicao":"LAT","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-326","numero":326,"nome":"Merchas Doski","selecao":"Iraque","posicao":"LAT","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-327","numero":327,"nome":"Safaa Hadi","selecao":"Iraque","posicao":"VOL","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-328","numero":328,"nome":"Amjad Attwan","selecao":"Iraque","posicao":"MEI","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-329","numero":329,"nome":"Hussein Ali","selecao":"Iraque","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-330","numero":330,"nome":"Aymen Hussein","selecao":"Iraque","posicao":"ATA","grupo":"G","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-331","numero":331,"nome":"Mohanad Ali","selecao":"Iraque","posicao":"ATA","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-332","numero":332,"nome":"Bashar Resan","selecao":"Iraque","posicao":"MEI","grupo":"G","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-333","numero":333,"nome":"Jesús Casas","selecao":"Iraque","posicao":"TEC","grupo":"G","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-334","numero":334,"nome":"Koen Casteels","selecao":"Bélgica","posicao":"GOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-335","numero":335,"nome":"Toby Alderweireld","selecao":"Bélgica","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-336","numero":336,"nome":"Wout Faes","selecao":"Bélgica","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-337","numero":337,"nome":"Jan Vertonghen","selecao":"Bélgica","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-338","numero":338,"nome":"Timothy Castagne","selecao":"Bélgica","posicao":"LAT","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-339","numero":339,"nome":"Kevin De Bruyne","selecao":"Bélgica","posicao":"MEI","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-340","numero":340,"nome":"Axel Witsel","selecao":"Bélgica","posicao":"VOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-341","numero":341,"nome":"Youri Tielemans","selecao":"Bélgica","posicao":"VOL","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-342","numero":342,"nome":"Romelu Lukaku","selecao":"Bélgica","posicao":"ATA","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-343","numero":343,"nome":"Jérémy Doku","selecao":"Bélgica","posicao":"ATA","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-344","numero":344,"nome":"Leandro Trossard","selecao":"Bélgica","posicao":"ATA","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-345","numero":345,"nome":"Domenico Tedesco","selecao":"Bélgica","posicao":"TEC","grupo":"H","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-346","numero":346,"nome":"Sergio Rochet","selecao":"Uruguai","posicao":"GOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-347","numero":347,"nome":"José Giménez","selecao":"Uruguai","posicao":"ZAG","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-348","numero":348,"nome":"Ronald Araújo","selecao":"Uruguai","posicao":"ZAG","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-349","numero":349,"nome":"Mathías Olivera","selecao":"Uruguai","posicao":"LAT","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-350","numero":350,"nome":"Nahitan Nández","selecao":"Uruguai","posicao":"VOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-351","numero":351,"nome":"Federico Valverde","selecao":"Uruguai","posicao":"VOL","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-352","numero":352,"nome":"Manuel Ugarte","selecao":"Uruguai","posicao":"VOL","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-353","numero":353,"nome":"Lucas Torreira","selecao":"Uruguai","posicao":"MEI","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-354","numero":354,"nome":"Darwin Núñez","selecao":"Uruguai","posicao":"ATA","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-355","numero":355,"nome":"Luis Suárez","selecao":"Uruguai","posicao":"ATA","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-356","numero":356,"nome":"Federico Viñas","selecao":"Uruguai","posicao":"ATA","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-357","numero":357,"nome":"Marcelo Bielsa","selecao":"Uruguai","posicao":"TEC","grupo":"H","raridade":"rara","categoria":"tecnico","urlImagem":""},
    {"id":"fig-358","numero":358,"nome":"Alireza Beiranvand","selecao":"Irã","posicao":"GOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-359","numero":359,"nome":"Shojae Khalilzadeh","selecao":"Irã","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-360","numero":360,"nome":"Majid Hosseini","selecao":"Irã","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-361","numero":361,"nome":"Sadegh Moharrami","selecao":"Irã","posicao":"LAT","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-362","numero":362,"nome":"Ehsan Hajsafi","selecao":"Irã","posicao":"LAT","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-363","numero":363,"nome":"Saeid Ezatolahi","selecao":"Irã","posicao":"VOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-364","numero":364,"nome":"Alireza Jahanbakhsh","selecao":"Irã","posicao":"MEI","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-365","numero":365,"nome":"Mehdi Taremi","selecao":"Irã","posicao":"ATA","grupo":"H","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-366","numero":366,"nome":"Sardar Azmoun","selecao":"Irã","posicao":"ATA","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-367","numero":367,"nome":"Karim Ansarifard","selecao":"Irã","posicao":"ATA","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-368","numero":368,"nome":"Vahid Amiri","selecao":"Irã","posicao":"MEI","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-369","numero":369,"nome":"Amir Ghalenoei","selecao":"Irã","posicao":"TEC","grupo":"H","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-370","numero":370,"nome":"Carlos Coronel","selecao":"Paraguai","posicao":"GOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-371","numero":371,"nome":"Gustavo Gómez","selecao":"Paraguai","posicao":"ZAG","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-372","numero":372,"nome":"Fabián Balbuena","selecao":"Paraguai","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-373","numero":373,"nome":"Júnior Alonso","selecao":"Paraguai","posicao":"ZAG","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-374","numero":374,"nome":"Santiago Arzamendia","selecao":"Paraguai","posicao":"LAT","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-375","numero":375,"nome":"Andrés Cubas","selecao":"Paraguai","posicao":"VOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-376","numero":376,"nome":"Mathías Villasanti","selecao":"Paraguai","posicao":"VOL","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-377","numero":377,"nome":"Miguel Almirón","selecao":"Paraguai","posicao":"MEI","grupo":"H","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-378","numero":378,"nome":"Ángel Romero","selecao":"Paraguai","posicao":"ATA","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-379","numero":379,"nome":"Antonio Sanabria","selecao":"Paraguai","posicao":"ATA","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-380","numero":380,"nome":"Adam Bareiro","selecao":"Paraguai","posicao":"ATA","grupo":"H","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-381","numero":381,"nome":"Alfaro","selecao":"Paraguai","posicao":"TEC","grupo":"H","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-382","numero":382,"nome":"Gianluigi Donnarumma","selecao":"Itália","posicao":"GOL","grupo":"I","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-383","numero":383,"nome":"Alessandro Bastoni","selecao":"Itália","posicao":"ZAG","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-384","numero":384,"nome":"Giorgio Scalvini","selecao":"Itália","posicao":"ZAG","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-385","numero":385,"nome":"Federico Dimarco","selecao":"Itália","posicao":"LAT","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-386","numero":386,"nome":"Andrea Cambiaso","selecao":"Itália","posicao":"LAT","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-387","numero":387,"nome":"Nicolò Barella","selecao":"Itália","posicao":"VOL","grupo":"I","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-388","numero":388,"nome":"Jorginho","selecao":"Itália","posicao":"VOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-389","numero":389,"nome":"Sandro Tonali","selecao":"Itália","posicao":"VOL","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-390","numero":390,"nome":"Federico Chiesa","selecao":"Itália","posicao":"ATA","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-391","numero":391,"nome":"Gianluca Scamacca","selecao":"Itália","posicao":"ATA","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-392","numero":392,"nome":"Mateo Retegui","selecao":"Itália","posicao":"ATA","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-393","numero":393,"nome":"Luciano Spalletti","selecao":"Itália","posicao":"TEC","grupo":"I","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-394","numero":394,"nome":"Camilo Vargas","selecao":"Colômbia","posicao":"GOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-395","numero":395,"nome":"Yerry Mina","selecao":"Colômbia","posicao":"ZAG","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-396","numero":396,"nome":"Davinson Sánchez","selecao":"Colômbia","posicao":"ZAG","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-397","numero":397,"nome":"Daniel Muñoz","selecao":"Colômbia","posicao":"LAT","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-398","numero":398,"nome":"Johan Mojica","selecao":"Colômbia","posicao":"LAT","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-399","numero":399,"nome":"Wilmar Barrios","selecao":"Colômbia","posicao":"VOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-400","numero":400,"nome":"Jefferson Lerma","selecao":"Colômbia","posicao":"VOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-401","numero":401,"nome":"James Rodríguez","selecao":"Colômbia","posicao":"MEI","grupo":"I","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-402","numero":402,"nome":"Luis Díaz","selecao":"Colômbia","posicao":"ATA","grupo":"I","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-403","numero":403,"nome":"Rafael Santos Borré","selecao":"Colômbia","posicao":"ATA","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-404","numero":404,"nome":"Jhon Durán","selecao":"Colômbia","posicao":"ATA","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-405","numero":405,"nome":"Néstor Lorenzo","selecao":"Colômbia","posicao":"TEC","grupo":"I","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-406","numero":406,"nome":"André Onana","selecao":"Camarões","posicao":"GOL","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-407","numero":407,"nome":"Jean-Charles Castelletto","selecao":"Camarões","posicao":"ZAG","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-408","numero":408,"nome":"Harold Moukoudi","selecao":"Camarões","posicao":"ZAG","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-409","numero":409,"nome":"Nouhou Tolo","selecao":"Camarões","posicao":"LAT","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-410","numero":410,"nome":"Olivier Mbaizo","selecao":"Camarões","posicao":"LAT","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-411","numero":411,"nome":"André-Frank Zambo Anguissa","selecao":"Camarões","posicao":"VOL","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-412","numero":412,"nome":"Martin Hongla","selecao":"Camarões","posicao":"VOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-413","numero":413,"nome":"Samuel Oum Gouet","selecao":"Camarões","posicao":"MEI","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-414","numero":414,"nome":"Vincent Aboubakar","selecao":"Camarões","posicao":"ATA","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-415","numero":415,"nome":"Karl Toko Ekambi","selecao":"Camarões","posicao":"ATA","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-416","numero":416,"nome":"Bryan Mbeumo","selecao":"Camarões","posicao":"ATA","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-417","numero":417,"nome":"Marc Brys","selecao":"Camarões","posicao":"TEC","grupo":"I","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-418","numero":418,"nome":"Luis López","selecao":"Honduras","posicao":"GOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-419","numero":419,"nome":"Maynor Figueroa","selecao":"Honduras","posicao":"ZAG","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-420","numero":420,"nome":"Getsel Montes","selecao":"Honduras","posicao":"ZAG","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-421","numero":421,"nome":"Marcelo Pereira","selecao":"Honduras","posicao":"LAT","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-422","numero":422,"nome":"Kevin Álvarez","selecao":"Honduras","posicao":"LAT","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-423","numero":423,"nome":"Edwin Rodríguez","selecao":"Honduras","posicao":"VOL","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-424","numero":424,"nome":"Brayan Acosta","selecao":"Honduras","posicao":"MEI","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-425","numero":425,"nome":"Alex López","selecao":"Honduras","posicao":"MEI","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-426","numero":426,"nome":"Alberth Elis","selecao":"Honduras","posicao":"ATA","grupo":"I","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-427","numero":427,"nome":"Romell Quioto","selecao":"Honduras","posicao":"ATA","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-428","numero":428,"nome":"Anthony Lozano","selecao":"Honduras","posicao":"ATA","grupo":"I","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-429","numero":429,"nome":"Reinaldo Rueda","selecao":"Honduras","posicao":"TEC","grupo":"I","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-430","numero":430,"nome":"Altay Bayındır","selecao":"Turquia","posicao":"GOL","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-431","numero":431,"nome":"Çaglar Söyüncü","selecao":"Turquia","posicao":"ZAG","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-432","numero":432,"nome":"Merih Demiral","selecao":"Turquia","posicao":"ZAG","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-433","numero":433,"nome":"Kaan Ayhan","selecao":"Turquia","posicao":"ZAG","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-434","numero":434,"nome":"Zeki Çelik","selecao":"Turquia","posicao":"LAT","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-435","numero":435,"nome":"Ferdi Kadıoğlu","selecao":"Turquia","posicao":"LAT","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-436","numero":436,"nome":"Hakan Çalhanoğlu","selecao":"Turquia","posicao":"MEI","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-437","numero":437,"nome":"Arda Güler","selecao":"Turquia","posicao":"MEI","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-438","numero":438,"nome":"Salih Özcan","selecao":"Turquia","posicao":"VOL","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-439","numero":439,"nome":"Kenan Yıldız","selecao":"Turquia","posicao":"ATA","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-440","numero":440,"nome":"Cenk Tosun","selecao":"Turquia","posicao":"ATA","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-441","numero":441,"nome":"Vincenzo Montella","selecao":"Turquia","posicao":"TEC","grupo":"J","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-442","numero":442,"nome":"Predrag Rajković","selecao":"Sérvia","posicao":"GOL","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-443","numero":443,"nome":"Nikola Milenković","selecao":"Sérvia","posicao":"ZAG","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-444","numero":444,"nome":"Miloš Veljković","selecao":"Sérvia","posicao":"ZAG","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-445","numero":445,"nome":"Aleksandar Kolarov","selecao":"Sérvia","posicao":"LAT","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-446","numero":446,"nome":"Filip Kostić","selecao":"Sérvia","posicao":"LAT","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-447","numero":447,"nome":"Sergej Milinković-Savić","selecao":"Sérvia","posicao":"VOL","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-448","numero":448,"nome":"Nemanja Gudelj","selecao":"Sérvia","posicao":"VOL","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-449","numero":449,"nome":"Dušan Tadić","selecao":"Sérvia","posicao":"MEI","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-450","numero":450,"nome":"Luka Jović","selecao":"Sérvia","posicao":"ATA","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-451","numero":451,"nome":"Aleksandar Mitrović","selecao":"Sérvia","posicao":"ATA","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-452","numero":452,"nome":"Dušan Vlahović","selecao":"Sérvia","posicao":"ATA","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-453","numero":453,"nome":"Dragan Stojković","selecao":"Sérvia","posicao":"TEC","grupo":"J","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-454","numero":454,"nome":"Claudio Bravo","selecao":"Chile","posicao":"GOL","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-455","numero":455,"nome":"Gary Medel","selecao":"Chile","posicao":"ZAG","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-456","numero":456,"nome":"Guillermo Maripán","selecao":"Chile","posicao":"ZAG","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-457","numero":457,"nome":"Mauricio Isla","selecao":"Chile","posicao":"LAT","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-458","numero":458,"nome":"Eugenio Mena","selecao":"Chile","posicao":"LAT","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-459","numero":459,"nome":"Arturo Vidal","selecao":"Chile","posicao":"VOL","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-460","numero":460,"nome":"Charles Aránguiz","selecao":"Chile","posicao":"VOL","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-461","numero":461,"nome":"Erick Pulgar","selecao":"Chile","posicao":"MEI","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-462","numero":462,"nome":"Alexis Sánchez","selecao":"Chile","posicao":"ATA","grupo":"J","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-463","numero":463,"nome":"Eduardo Vargas","selecao":"Chile","posicao":"ATA","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-464","numero":464,"nome":"Ben Brereton","selecao":"Chile","posicao":"ATA","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-465","numero":465,"nome":"Ricardo Gareca","selecao":"Chile","posicao":"TEC","grupo":"J","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-466","numero":466,"nome":"Andre Blake","selecao":"Jamaica","posicao":"GOL","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-467","numero":467,"nome":"Damion Lowe","selecao":"Jamaica","posicao":"ZAG","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-468","numero":468,"nome":"Ethan Pinnock","selecao":"Jamaica","posicao":"ZAG","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-469","numero":469,"nome":"Amari Bell","selecao":"Jamaica","posicao":"LAT","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-470","numero":470,"nome":"Kemar Lawrence","selecao":"Jamaica","posicao":"LAT","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-471","numero":471,"nome":"Bobby Reid","selecao":"Jamaica","posicao":"MEI","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-472","numero":472,"nome":"Leon Bailey","selecao":"Jamaica","posicao":"ATA","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-473","numero":473,"nome":"Michail Antonio","selecao":"Jamaica","posicao":"ATA","grupo":"J","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-474","numero":474,"nome":"Demarai Gray","selecao":"Jamaica","posicao":"ATA","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-475","numero":475,"nome":"Ravel Morrison","selecao":"Jamaica","posicao":"MEI","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-476","numero":476,"nome":"Jonathan Russell","selecao":"Jamaica","posicao":"VOL","grupo":"J","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-477","numero":477,"nome":"Heimir Hallgrímsson","selecao":"Jamaica","posicao":"TEC","grupo":"J","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-478","numero":478,"nome":"Wojciech Szczęsny","selecao":"Polônia","posicao":"GOL","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-479","numero":479,"nome":"Matty Cash","selecao":"Polônia","posicao":"LAT","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-480","numero":480,"nome":"Jan Bednarek","selecao":"Polônia","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-481","numero":481,"nome":"Jakub Kiwior","selecao":"Polônia","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-482","numero":482,"nome":"Bartosz Bereszyński","selecao":"Polônia","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-483","numero":483,"nome":"Piotr Zieliński","selecao":"Polônia","posicao":"MEI","grupo":"K","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-484","numero":484,"nome":"Grzegorz Krychowiak","selecao":"Polônia","posicao":"VOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-485","numero":485,"nome":"Jakub Moder","selecao":"Polônia","posicao":"VOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-486","numero":486,"nome":"Robert Lewandowski","selecao":"Polônia","posicao":"ATA","grupo":"K","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-487","numero":487,"nome":"Arkadiusz Milik","selecao":"Polônia","posicao":"ATA","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-488","numero":488,"nome":"Karol Świderski","selecao":"Polônia","posicao":"ATA","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-489","numero":489,"nome":"Michał Probierz","selecao":"Polônia","posicao":"TEC","grupo":"K","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-490","numero":490,"nome":"Danny Ward","selecao":"País de Gales","posicao":"GOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-491","numero":491,"nome":"Ben Davies","selecao":"País de Gales","posicao":"ZAG","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-492","numero":492,"nome":"Joe Rodon","selecao":"País de Gales","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-493","numero":493,"nome":"Neco Williams","selecao":"País de Gales","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-494","numero":494,"nome":"Connor Roberts","selecao":"País de Gales","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-495","numero":495,"nome":"Aaron Ramsey","selecao":"País de Gales","posicao":"MEI","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-496","numero":496,"nome":"Ethan Ampadu","selecao":"País de Gales","posicao":"VOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-497","numero":497,"nome":"Harry Wilson","selecao":"País de Gales","posicao":"MEI","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-498","numero":498,"nome":"Daniel James","selecao":"País de Gales","posicao":"ATA","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-499","numero":499,"nome":"Brennan Johnson","selecao":"País de Gales","posicao":"ATA","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-500","numero":500,"nome":"Kieffer Moore","selecao":"País de Gales","posicao":"ATA","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-501","numero":501,"nome":"Rob Page","selecao":"País de Gales","posicao":"TEC","grupo":"K","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-502","numero":502,"nome":"Aymen Mathlouthi","selecao":"Tunísia","posicao":"GOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-503","numero":503,"nome":"Dylan Bronn","selecao":"Tunísia","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-504","numero":504,"nome":"Montassar Talbi","selecao":"Tunísia","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-505","numero":505,"nome":"Ali Abdi","selecao":"Tunísia","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-506","numero":506,"nome":"Hamza Mathlouthi","selecao":"Tunísia","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-507","numero":507,"nome":"Aïssa Laïdouni","selecao":"Tunísia","posicao":"VOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-508","numero":508,"nome":"Ellyes Skhiri","selecao":"Tunísia","posicao":"MEI","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-509","numero":509,"nome":"Hannibal Mejbri","selecao":"Tunísia","posicao":"MEI","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-510","numero":510,"nome":"Wahbi Khazri","selecao":"Tunísia","posicao":"ATA","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-511","numero":511,"nome":"Youssef Msakni","selecao":"Tunísia","posicao":"ATA","grupo":"K","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-512","numero":512,"nome":"Seifeddine Jaziri","selecao":"Tunísia","posicao":"ATA","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-513","numero":513,"nome":"Jalel Kadri","selecao":"Tunísia","posicao":"TEC","grupo":"K","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-514","numero":514,"nome":"Keylor Navas","selecao":"Costa Rica","posicao":"GOL","grupo":"K","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-515","numero":515,"nome":"Francisco Calvo","selecao":"Costa Rica","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-516","numero":516,"nome":"Óscar Duarte","selecao":"Costa Rica","posicao":"ZAG","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-517","numero":517,"nome":"Bryan Oviedo","selecao":"Costa Rica","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-518","numero":518,"nome":"Ronald Matarrita","selecao":"Costa Rica","posicao":"LAT","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-519","numero":519,"nome":"Celso Borges","selecao":"Costa Rica","posicao":"VOL","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-520","numero":520,"nome":"Yeltsin Tejeda","selecao":"Costa Rica","posicao":"VOL","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-521","numero":521,"nome":"Bryan Ruiz","selecao":"Costa Rica","posicao":"MEI","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-522","numero":522,"nome":"Joel Campbell","selecao":"Costa Rica","posicao":"ATA","grupo":"K","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-523","numero":523,"nome":"Manfred Ugalde","selecao":"Costa Rica","posicao":"ATA","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-524","numero":524,"nome":"Anthony Contreras","selecao":"Costa Rica","posicao":"ATA","grupo":"K","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-525","numero":525,"nome":"Gustavo Alfaro","selecao":"Costa Rica","posicao":"TEC","grupo":"K","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-526","numero":526,"nome":"Heinz Lindner","selecao":"Áustria","posicao":"GOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-527","numero":527,"nome":"David Alaba","selecao":"Áustria","posicao":"ZAG","grupo":"L","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-528","numero":528,"nome":"Kevin Danso","selecao":"Áustria","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-529","numero":529,"nome":"Philipp Mwene","selecao":"Áustria","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-530","numero":530,"nome":"Stefan Lainer","selecao":"Áustria","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-531","numero":531,"nome":"Marcel Sabitzer","selecao":"Áustria","posicao":"MEI","grupo":"L","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-532","numero":532,"nome":"Konrad Laimer","selecao":"Áustria","posicao":"VOL","grupo":"L","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-533","numero":533,"nome":"Nicolas Seiwald","selecao":"Áustria","posicao":"VOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-534","numero":534,"nome":"Marko Arnautović","selecao":"Áustria","posicao":"ATA","grupo":"L","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-535","numero":535,"nome":"Patrick Wimmer","selecao":"Áustria","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-536","numero":536,"nome":"Michael Gregoritsch","selecao":"Áustria","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-537","numero":537,"nome":"Ralf Rangnick","selecao":"Áustria","posicao":"TEC","grupo":"L","raridade":"rara","categoria":"tecnico","urlImagem":""},
    {"id":"fig-538","numero":538,"nome":"Ørjan Nyland","selecao":"Noruega","posicao":"GOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-539","numero":539,"nome":"Kristoffer Ajer","selecao":"Noruega","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-540","numero":540,"nome":"Leo Skiri Østigård","selecao":"Noruega","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-541","numero":541,"nome":"Marcus Holmgren Pedersen","selecao":"Noruega","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-542","numero":542,"nome":"Omar Elabdellaoui","selecao":"Noruega","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-543","numero":543,"nome":"Martin Ødegaard","selecao":"Noruega","posicao":"MEI","grupo":"L","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-544","numero":544,"nome":"Sander Berge","selecao":"Noruega","posicao":"VOL","grupo":"L","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-545","numero":545,"nome":"Patrick Berg","selecao":"Noruega","posicao":"VOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-546","numero":546,"nome":"Erling Haaland","selecao":"Noruega","posicao":"ATA","grupo":"L","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-547","numero":547,"nome":"Alexander Sørloth","selecao":"Noruega","posicao":"ATA","grupo":"L","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-548","numero":548,"nome":"Jens Petter Hauge","selecao":"Noruega","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-549","numero":549,"nome":"Ståle Solbakkene","selecao":"Noruega","posicao":"TEC","grupo":"L","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-550","numero":550,"nome":"Mohamed El-Shenawy","selecao":"Egito","posicao":"GOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-551","numero":551,"nome":"Mohamed Abdelmonem","selecao":"Egito","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-552","numero":552,"nome":"Ali Gabr","selecao":"Egito","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-553","numero":553,"nome":"Ahmed Hany","selecao":"Egito","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-554","numero":554,"nome":"Mohamed Hamdy","selecao":"Egito","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-555","numero":555,"nome":"Mohamed Elneny","selecao":"Egito","posicao":"VOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-556","numero":556,"nome":"Trezeguet","selecao":"Egito","posicao":"MEI","grupo":"L","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-557","numero":557,"nome":"Abdallah El-Said","selecao":"Egito","posicao":"MEI","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-558","numero":558,"nome":"Mohamed Salah","selecao":"Egito","posicao":"ATA","grupo":"L","raridade":"lendaria","categoria":"jogador","urlImagem":""},
    {"id":"fig-559","numero":559,"nome":"Omar Marmoush","selecao":"Egito","posicao":"ATA","grupo":"L","raridade":"rara","categoria":"jogador","urlImagem":""},
    {"id":"fig-560","numero":560,"nome":"Mostafa Mohamed","selecao":"Egito","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-561","numero":561,"nome":"Hossam Hassan","selecao":"Egito","posicao":"TEC","grupo":"L","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-562","numero":562,"nome":"Luis Mejía","selecao":"Panamá","posicao":"GOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-563","numero":563,"nome":"Fidel Escobar","selecao":"Panamá","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-564","numero":564,"nome":"Andrés Andrade","selecao":"Panamá","posicao":"ZAG","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-565","numero":565,"nome":"Eric Davis","selecao":"Panamá","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-566","numero":566,"nome":"Michael Murillo","selecao":"Panamá","posicao":"LAT","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-567","numero":567,"nome":"Aníbal Godoy","selecao":"Panamá","posicao":"VOL","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-568","numero":568,"nome":"Édgar Bárcenas","selecao":"Panamá","posicao":"MEI","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-569","numero":569,"nome":"Armando Cooper","selecao":"Panamá","posicao":"MEI","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-570","numero":570,"nome":"Gabriel Gómez","selecao":"Panamá","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-571","numero":571,"nome":"Ismael Díaz","selecao":"Panamá","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-572","numero":572,"nome":"Rolando Blackburn","selecao":"Panamá","posicao":"ATA","grupo":"L","raridade":"comum","categoria":"jogador","urlImagem":""},
    {"id":"fig-573","numero":573,"nome":"Thomas Christiansen","selecao":"Panamá","posicao":"TEC","grupo":"L","raridade":"comum","categoria":"tecnico","urlImagem":""},
    {"id":"fig-574","numero":574,"nome":"Maple the Moose","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"mascote","urlImagem":""},
    {"id":"fig-575","numero":575,"nome":"Zayu the Jaguar","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"mascote","urlImagem":""},
    {"id":"fig-576","numero":576,"nome":"Clutch the Bald Eagle","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"mascote","urlImagem":""},
    {"id":"fig-577","numero":577,"nome":"MetLife Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-578","numero":578,"nome":"SoFi Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-579","numero":579,"nome":"AT&T Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-580","numero":580,"nome":"Hard Rock Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-581","numero":581,"nome":"NRG Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-582","numero":582,"nome":"Levi's Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-583","numero":583,"nome":"Mercedes-Benz Stadium","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-584","numero":584,"nome":"GEHA Field at Arrowhead","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-585","numero":585,"nome":"Lumen Field","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-586","numero":586,"nome":"BMO Field","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-587","numero":587,"nome":"BC Place","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-588","numero":588,"nome":"Estádio Azteca","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-589","numero":589,"nome":"Estádio BBVA","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-590","numero":590,"nome":"Estádio Akron","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-591","numero":591,"nome":"Estádio TSM Corona","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-592","numero":592,"nome":"Estádio Nou Camp","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"estadio","urlImagem":""},
    {"id":"fig-593","numero":593,"nome":"Nova York / New Jersey","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-594","numero":594,"nome":"Los Angeles","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-595","numero":595,"nome":"Dallas","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-596","numero":596,"nome":"Miami","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-597","numero":597,"nome":"Houston","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-598","numero":598,"nome":"San Francisco / Bay Area","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-599","numero":599,"nome":"Atlanta","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-600","numero":600,"nome":"Kansas City","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-601","numero":601,"nome":"Seattle","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-602","numero":602,"nome":"Toronto","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-603","numero":603,"nome":"Vancouver","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-604","numero":604,"nome":"Cidade do México","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-605","numero":605,"nome":"Guadalajara","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-606","numero":606,"nome":"Monterrey","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"cidade","urlImagem":""},
    {"id":"fig-607","numero":607,"nome":"Trionda","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"bola","urlImagem":""},
    {"id":"fig-608","numero":608,"nome":"FIFA World Cup Trophy","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"trofeu","urlImagem":""},
    {"id":"fig-609","numero":609,"nome":"Pelé","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-610","numero":610,"nome":"Diego Maradona","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-611","numero":611,"nome":"Ronaldo Fenômeno","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-612","numero":612,"nome":"Zinedine Zidane","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-613","numero":613,"nome":"Franz Beckenbauer","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-614","numero":614,"nome":"Johan Cruyff","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-615","numero":615,"nome":"Ferenc Puskás","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-616","numero":616,"nome":"Garrincha","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-617","numero":617,"nome":"Romário","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-618","numero":618,"nome":"Ronaldinho Gaúcho","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-619","numero":619,"nome":"Lionel Messi","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-620","numero":620,"nome":"Cristiano Ronaldo","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-621","numero":621,"nome":"Kylian Mbappé","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-622","numero":622,"nome":"Neymar Jr.","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-623","numero":623,"nome":"Erling Haaland","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-624","numero":624,"nome":"Jude Bellingham","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-625","numero":625,"nome":"Lamine Yamal","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-626","numero":626,"nome":"Endrick","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-627","numero":627,"nome":"Vinícius Jr.","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-628","numero":628,"nome":"Gavi","selecao":"","posicao":"ESP","grupo":"ESP","raridade":"lendaria","categoria":"legenda","urlImagem":""},
    {"id":"fig-629","numero":629,"nome":"Bandeira de Brasil","selecao":"Brasil","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-630","numero":630,"nome":"Bandeira de Marrocos","selecao":"Marrocos","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-631","numero":631,"nome":"Bandeira de Croácia","selecao":"Croácia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-632","numero":632,"nome":"Bandeira de Escócia","selecao":"Escócia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-633","numero":633,"nome":"Bandeira de Argentina","selecao":"Argentina","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-634","numero":634,"nome":"Bandeira de Portugal","selecao":"Portugal","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-635","numero":635,"nome":"Bandeira de Coreia do Sul","selecao":"Coreia do Sul","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-636","numero":636,"nome":"Bandeira de Jordânia","selecao":"Jordânia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-637","numero":637,"nome":"Bandeira de EUA","selecao":"EUA","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-638","numero":638,"nome":"Bandeira de Alemanha","selecao":"Alemanha","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-639","numero":639,"nome":"Bandeira de Senegal","selecao":"Senegal","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-640","numero":640,"nome":"Bandeira de Austrália","selecao":"Austrália","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-641","numero":641,"nome":"Bandeira de México","selecao":"México","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-642","numero":642,"nome":"Bandeira de Suíça","selecao":"Suíça","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-643","numero":643,"nome":"Bandeira de Gana","selecao":"Gana","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-644","numero":644,"nome":"Bandeira de Tchéquia","selecao":"Tchéquia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-645","numero":645,"nome":"Bandeira de Canadá","selecao":"Canadá","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-646","numero":646,"nome":"Bandeira de Espanha","selecao":"Espanha","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-647","numero":647,"nome":"Bandeira de Catar","selecao":"Catar","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-648","numero":648,"nome":"Bandeira de Nova Zelândia","selecao":"Nova Zelândia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-649","numero":649,"nome":"Bandeira de França","selecao":"França","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-650","numero":650,"nome":"Bandeira de Dinamarca","selecao":"Dinamarca","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-651","numero":651,"nome":"Bandeira de Peru","selecao":"Peru","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-652","numero":652,"nome":"Bandeira de Uzbequistão","selecao":"Uzbequistão","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-653","numero":653,"nome":"Bandeira de Inglaterra","selecao":"Inglaterra","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-654","numero":654,"nome":"Bandeira de Holanda","selecao":"Holanda","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-655","numero":655,"nome":"Bandeira de Equador","selecao":"Equador","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-656","numero":656,"nome":"Bandeira de Iraque","selecao":"Iraque","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-657","numero":657,"nome":"Bandeira de Bélgica","selecao":"Bélgica","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-658","numero":658,"nome":"Bandeira de Uruguai","selecao":"Uruguai","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-659","numero":659,"nome":"Bandeira de Irã","selecao":"Irã","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-660","numero":660,"nome":"Bandeira de Paraguai","selecao":"Paraguai","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-661","numero":661,"nome":"Bandeira de Itália","selecao":"Itália","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-662","numero":662,"nome":"Bandeira de Colômbia","selecao":"Colômbia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-663","numero":663,"nome":"Bandeira de Camarões","selecao":"Camarões","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-664","numero":664,"nome":"Bandeira de Honduras","selecao":"Honduras","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-665","numero":665,"nome":"Bandeira de Turquia","selecao":"Turquia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-666","numero":666,"nome":"Bandeira de Sérvia","selecao":"Sérvia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-667","numero":667,"nome":"Bandeira de Chile","selecao":"Chile","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-668","numero":668,"nome":"Bandeira de Jamaica","selecao":"Jamaica","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-669","numero":669,"nome":"Bandeira de Polônia","selecao":"Polônia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-670","numero":670,"nome":"Bandeira de País de Gales","selecao":"País de Gales","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-671","numero":671,"nome":"Bandeira de Tunísia","selecao":"Tunísia","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-672","numero":672,"nome":"Bandeira de Costa Rica","selecao":"Costa Rica","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-673","numero":673,"nome":"Bandeira de Áustria","selecao":"Áustria","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-674","numero":674,"nome":"Bandeira de Noruega","selecao":"Noruega","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-675","numero":675,"nome":"Bandeira de Egito","selecao":"Egito","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""},
    {"id":"fig-676","numero":676,"nome":"Bandeira de Panamá","selecao":"Panamá","posicao":"ESP","grupo":"ESP","raridade":"rara","categoria":"selecao","urlImagem":""}
  ];

  // Gera id e urlImagem para cada figurinha
  const FIGURINHAS = FIGURINHAS_BASE.map((f) => {
    const id = 'fig-' + String(f.numero).padStart(3, '0');
    const figCompleta = Object.assign({}, f, { id });
    return Object.assign({}, figCompleta, { urlImagem: gerarImagem(figCompleta) });
  });

  // Constantes auxiliares (para popular dropdowns de filtro)
  const GRUPOS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'ESP'];
  const POSICOES = ['GOL', 'ZAG', 'LAT', 'VOL', 'MEI', 'ATA', 'TEC', 'ESP'];
  const RARIDADES = ['comum', 'rara', 'lendaria'];
  const ESTADOS = ['todas', 'tenho', 'falta', 'repetida'];
  const CATEGORIAS = ['jogador', 'tecnico', 'mascote', 'estadio', 'cidade', 'selecao', 'bola', 'trofeu', 'legenda'];

  // Expõe no escopo global
  global.AlbumCopa = global.AlbumCopa || {};
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

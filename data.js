/**
 * data.js — Dataset de figurinhas do Álbum Copa do Mundo 2026
 *
 * Estratégia de imagem:
 *   Como não temos acesso a imagens licenciadas dos jogadores, cada figurinha
 *   gera um SVG inline (data URI) com a bandeira estilizada do país, número
 *   e nome. Tudo determinístico — a mesma figurinha gera sempre o mesmo SVG.
 *
 * Estrutura do objeto figurinha:
 *   id         {string}  identificador único (ex: "fig-001")
 *   numero     {number}  número da figurinha no álbum
 *   nome       {string}  nome do jogador / entidade
 *   selecao    {string}  seleção / país
 *   posicao    {string}  GOL | ZAG | LAT | VOL | MEI | ATA | TEC
 *   grupo      {string}  A até L
 *   raridade   {string}  comum | rara | lendaria
 *   urlImagem  {string}  (gerado em runtime) data URI do SVG
 *
 * Seleções participantes: 12 seleções (sede EUA/MEX/CAN + principais convidadas)
 * Distribuídas em 4 grupos A–L, com 5+ figurinhas por grupo.
 */

(function (global) {
  'use strict';

  /**
   * Cores e gradientes das bandeiras (3 faixas principais).
   * Usado para gerar o SVG placeholder com a identidade visual de cada país.
   */
  const BANDEIRAS = {
    'Brasil':        { cores: ['#009C3B', '#FFDF00', '#002776'], tipo: 'faixas-h' },
    'Argentina':     { cores: ['#74ACDF', '#FFFFFF', '#74ACDF'], tipo: 'faixas-h' },
    'EUA':           { cores: ['#B22234', '#FFFFFF', '#3C3B6E'], tipo: 'listras' },
    'México':        { cores: ['#006847', '#FFFFFF', '#CE1126'], tipo: 'faixas-v' },
    'Canadá':        { cores: ['#FF0000', '#FFFFFF', '#FF0000'], tipo: 'faixas-v' },
    'França':        { cores: ['#0055A4', '#FFFFFF', '#EF4135'], tipo: 'faixas-v' },
    'Inglaterra':    { cores: ['#FFFFFF', '#C8102E', '#FFFFFF'], tipo: 'cruz' },
    'Espanha':       { cores: ['#AA151B', '#F1BF00', '#AA151B'], tipo: 'faixas-h' },
    'Alemanha':      { cores: ['#000000', '#DD0000', '#FFCE00'], tipo: 'faixas-h' },
    'Portugal':      { cores: ['#006600', '#FF0000', '#FFFF00'], tipo: 'faixas-h' },
    'Holanda':       { cores: ['#AE1C28', '#FFFFFF', '#21468B'], tipo: 'faixas-h' },
    'Japão':         { cores: ['#FFFFFF', '#BC002D', '#FFFFFF'], tipo: 'circulo' }
  };

  // Cor padrão caso a seleção não esteja no mapa de bandeiras
  const CORES_PADRAO = ['#2E7D32', '#FFB300', '#1565C0'];

  /**
   * Gera um SVG inline como data URI representando a figurinha.
   * Inclui o número, nome, posição e a bandeira estilizada do país.
   */
  function gerarImagem(fig) {
    const bandeira = BANDEIRAS[fig.selecao];
    const cores = bandeira ? bandeira.cores : CORES_PADRAO;
    const tipo = bandeira ? bandeira.tipo : 'faixas-h';

    // Composição da bandeira (3 faixas coloridas)
    let bandeiraSvg = '';
    if (tipo === 'faixas-h') {
      const h = 100 / 3;
      bandeiraSvg = `
        <rect x="0" y="0" width="100" height="${h}" fill="${cores[0]}"/>
        <rect x="0" y="${h}" width="100" height="${h}" fill="${cores[1]}"/>
        <rect x="0" y="${2 * h}" width="100" height="${h}" fill="${cores[2]}"/>
      `;
    } else if (tipo === 'faixas-v') {
      const w = 100 / 3;
      bandeiraSvg = `
        <rect x="0" y="0" width="${w}" height="100" fill="${cores[0]}"/>
        <rect x="${w}" y="0" width="${w}" height="100" fill="${cores[1]}"/>
        <rect x="${2 * w}" y="0" width="${w}" height="100" fill="${cores[2]}"/>
      `;
    } else if (tipo === 'listras') {
      let listras = '';
      for (let i = 0; i < 7; i++) {
        listras += `<rect x="0" y="${i * 100 / 7}" width="100" height="${100 / 7}" fill="${i % 2 === 0 ? cores[0] : cores[1]}"/>`;
      }
      bandeiraSvg = listras;
    } else if (tipo === 'cruz') {
      // bandeira da Inglaterra: cruz vermelha sobre fundo branco
      bandeiraSvg = `
        <rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>
        <rect x="40" y="0" width="20" height="100" fill="${cores[1]}"/>
        <rect x="0" y="40" width="100" height="20" fill="${cores[1]}"/>
      `;
    } else if (tipo === 'circulo') {
      // bandeira do Japão: círculo vermelho sobre fundo branco
      bandeiraSvg = `
        <rect x="0" y="0" width="100" height="100" fill="${cores[0]}"/>
        <circle cx="50" cy="50" r="28" fill="${cores[1]}"/>
      `;
    }

    const corFundoEscuro = '#0a3d0a';

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 280" width="200" height="280">
  <!-- fundo principal (grama) -->
  <defs>
    <linearGradient id="bg-${fig.id}" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#1b5e20"/>
      <stop offset="100%" stop-color="#062b0a"/>
    </linearGradient>
  </defs>
  <rect x="0" y="0" width="200" height="280" fill="url(#bg-${fig.id})"/>

  <!-- moldura dourada -->
  <rect x="6" y="6" width="188" height="268" fill="none" stroke="#FFDF00" stroke-width="2" rx="6"/>

  <!-- número no canto superior -->
  <rect x="10" y="10" width="50" height="28" rx="4" fill="${corFundoEscuro}" stroke="#FFDF00" stroke-width="1"/>
  <text x="35" y="30" font-family="Arial, sans-serif" font-size="16" font-weight="bold"
        fill="#FFDF00" text-anchor="middle">${fig.numero}</text>

  <!-- raridade (selo no canto) -->
  ${
    fig.raridade === 'lendaria'
      ? '<circle cx="180" cy="24" r="10" fill="#FFDF00" stroke="#000" stroke-width="1"/>' +
        '<text x="180" y="28" font-family="Arial" font-size="10" text-anchor="middle" fill="#000" font-weight="bold">★</text>'
      : fig.raridade === 'rara'
      ? '<circle cx="180" cy="24" r="10" fill="#C0C0C0" stroke="#000" stroke-width="1"/>' +
        '<text x="180" y="28" font-family="Arial" font-size="10" text-anchor="middle" fill="#000" font-weight="bold">◆</text>'
      : ''
  }

  <!-- bandeira -->
  <g transform="translate(20,50)">
    <rect x="0" y="0" width="160" height="100" fill="#FFFFFF" stroke="#000" stroke-width="0.5"/>
    <g transform="translate(60, 0)">
      ${bandeiraSvg.replace(/x="0" y="0" width="100" height="100"/, 'x="0" y="0" width="100" height="100"')}
    </g>
  </g>

  <!-- seleção -->
  <text x="100" y="175" font-family="Arial, sans-serif" font-size="14" font-weight="bold"
        fill="#FFFFFF" text-anchor="middle">${escapeXml(fig.selecao)}</text>

  <!-- nome do jogador -->
  <text x="100" y="205" font-family="Arial, sans-serif" font-size="16" font-weight="bold"
        fill="#FFDF00" text-anchor="middle">${escapeXml(truncar(fig.nome, 18))}</text>

  <!-- posição -->
  <rect x="60" y="220" width="80" height="22" rx="4" fill="#000" stroke="#FFDF00" stroke-width="1"/>
  <text x="100" y="236" font-family="Arial, sans-serif" font-size="12" font-weight="bold"
        fill="#FFDF00" text-anchor="middle">${fig.posicao}</text>

  <!-- grupo -->
  <text x="100" y="262" font-family="Arial, sans-serif" font-size="11"
        fill="#FFFFFF" text-anchor="middle">Grupo ${fig.grupo}</text>
</svg>`.trim();

    return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
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

  /**
   * Dataset principal — 72 figurinhas distribuídas em 12 grupos (A–L)
   * Cada seleção contribui com jogadores + comissão técnica.
   * Raridade:
   *   - comum (~60%): jogadores de elenco
   *   - rara  (~30%): craques / destaques
   *   - lendária (~10%): estrelas / técnicos campeões
   */
  const FIGURINHAS_BASE = [
    // ============== GRUPO A ==============
    { numero: 1,  nome: 'Alisson',          selecao: 'Brasil',   posicao: 'GOL', grupo: 'A', raridade: 'rara' },
    { numero: 2,  nome: 'Marquinhos',       selecao: 'Brasil',   posicao: 'ZAG', grupo: 'A', raridade: 'comum' },
    { numero: 3,  nome: 'Vinícius Jr.',     selecao: 'Brasil',   posicao: 'ATA', grupo: 'A', raridade: 'lendaria' },
    { numero: 4,  nome: 'Casemiro',         selecao: 'Brasil',   posicao: 'VOL', grupo: 'A', raridade: 'rara' },
    { numero: 5,  nome: 'Bruno Guimarães',  selecao: 'Brasil',   posicao: 'VOL', grupo: 'A', raridade: 'comum' },
    { numero: 6,  nome: 'Dorival Júnior',   selecao: 'Brasil',   posicao: 'TEC', grupo: 'A', raridade: 'comum' },

    // ============== GRUPO B ==============
    { numero: 7,  nome: 'Dibu Martínez',    selecao: 'Argentina', posicao: 'GOL', grupo: 'B', raridade: 'rara' },
    { numero: 8,  nome: 'Otamendi',         selecao: 'Argentina', posicao: 'ZAG', grupo: 'B', raridade: 'comum' },
    { numero: 9,  nome: 'Messi',            selecao: 'Argentina', posicao: 'ATA', grupo: 'B', raridade: 'lendaria' },
    { numero: 10, nome: 'De Paul',          selecao: 'Argentina', posicao: 'VOL', grupo: 'B', raridade: 'rara' },
    { numero: 11, nome: 'Julián Álvarez',   selecao: 'Argentina', posicao: 'ATA', grupo: 'B', raridade: 'rara' },
    { numero: 12, nome: 'Scaloni',          selecao: 'Argentina', posicao: 'TEC', grupo: 'B', raridade: 'comum' },

    // ============== GRUPO C ==============
    { numero: 13, nome: 'Matt Turner',      selecao: 'EUA',      posicao: 'GOL', grupo: 'C', raridade: 'comum' },
    { numero: 14, nome: 'Pulisic',          selecao: 'EUA',      posicao: 'MEI', grupo: 'C', raridade: 'rara' },
    { numero: 15, nome: 'Christian',        selecao: 'EUA',      posicao: 'ATA', grupo: 'C', raridade: 'comum' },
    { numero: 16, nome: 'McKennie',         selecao: 'EUA',      posicao: 'VOL', grupo: 'C', raridade: 'comum' },
    { numero: 17, nome: 'Adams',            selecao: 'EUA',      posicao: 'VOL', grupo: 'C', raridade: 'rara' },
    { numero: 18, nome: 'Berhalter',        selecao: 'EUA',      posicao: 'TEC', grupo: 'C', raridade: 'comum' },

    // ============== GRUPO D ==============
    { numero: 19, nome: 'Ochoa',            selecao: 'México',   posicao: 'GOL', grupo: 'D', raridade: 'rara' },
    { numero: 20, nome: 'H. Lozano',        selecao: 'México',   posicao: 'ATA', grupo: 'D', raridade: 'rara' },
    { numero: 21, nome: 'Edson Álvarez',    selecao: 'México',   posicao: 'VOL', grupo: 'D', raridade: 'comum' },
    { numero: 22, nome: 'César Montes',     selecao: 'México',   posicao: 'ZAG', grupo: 'D', raridade: 'comum' },
    { numero: 23, nome: 'Chicharito',       selecao: 'México',   posicao: 'ATA', grupo: 'D', raridade: 'comum' },
    { numero: 24, nome: 'Lozano (Téc)',     selecao: 'México',   posicao: 'TEC', grupo: 'D', raridade: 'comum' },

    // ============== GRUPO E ==============
    { numero: 25, nome: 'Borjan',           selecao: 'Canadá',   posicao: 'GOL', grupo: 'E', raridade: 'comum' },
    { numero: 26, nome: 'Alphonso Davies',  selecao: 'Canadá',   posicao: 'LAT', grupo: 'E', raridade: 'lendaria' },
    { numero: 27, nome: 'Jonathan David',   selecao: 'Canadá',   posicao: 'ATA', grupo: 'E', raridade: 'rara' },
    { numero: 28, nome: 'Eustáquio',        selecao: 'Canadá',   posicao: 'MEI', grupo: 'E', raridade: 'comum' },
    { numero: 29, nome: 'Larin',            selecao: 'Canadá',   posicao: 'ATA', grupo: 'E', raridade: 'comum' },
    { numero: 30, nome: 'Marsch',           selecao: 'Canadá',   posicao: 'TEC', grupo: 'E', raridade: 'comum' },

    // ============== GRUPO F ==============
    { numero: 31, nome: 'Maignan',          selecao: 'França',   posicao: 'GOL', grupo: 'F', raridade: 'rara' },
    { numero: 32, nome: 'Koundé',           selecao: 'França',   posicao: 'ZAG', grupo: 'F', raridade: 'comum' },
    { numero: 33, nome: 'Mbappé',           selecao: 'França',   posicao: 'ATA', grupo: 'F', raridade: 'lendaria' },
    { numero: 34, nome: 'Camavinga',        selecao: 'França',   posicao: 'VOL', grupo: 'F', raridade: 'rara' },
    { numero: 35, nome: 'Griezmann',        selecao: 'França',   posicao: 'ATA', grupo: 'F', raridade: 'rara' },
    { numero: 36, nome: 'Thuram',           selecao: 'França',   posicao: 'ATA', grupo: 'F', raridade: 'comum' },

    // ============== GRUPO G ==============
    { numero: 37, nome: 'Pickford',         selecao: 'Inglaterra', posicao: 'GOL', grupo: 'G', raridade: 'comum' },
    { numero: 38, nome: 'Stones',           selecao: 'Inglaterra', posicao: 'ZAG', grupo: 'G', raridade: 'comum' },
    { numero: 39, nome: 'Bellingham',       selecao: 'Inglaterra', posicao: 'MEI', grupo: 'G', raridade: 'lendaria' },
    { numero: 40, nome: 'Saka',             selecao: 'Inglaterra', posicao: 'ATA', grupo: 'G', raridade: 'rara' },
    { numero: 41, nome: 'Kane',             selecao: 'Inglaterra', posicao: 'ATA', grupo: 'G', raridade: 'lendaria' },
    { numero: 42, nome: 'Foden',            selecao: 'Inglaterra', posicao: 'MEI', grupo: 'G', raridade: 'rara' },

    // ============== GRUPO H ==============
    { numero: 43, nome: 'Unai Simón',       selecao: 'Espanha',  posicao: 'GOL', grupo: 'H', raridade: 'comum' },
    { numero: 44, nome: 'Carvajal',         selecao: 'Espanha',  posicao: 'LAT', grupo: 'H', raridade: 'comum' },
    { numero: 45, nome: 'Pedri',            selecao: 'Espanha',  posicao: 'MEI', grupo: 'H', raridade: 'rara' },
    { numero: 46, nome: 'Yamal',            selecao: 'Espanha',  posicao: 'ATA', grupo: 'H', raridade: 'lendaria' },
    { numero: 47, nome: 'Morata',           selecao: 'Espanha',  posicao: 'ATA', grupo: 'H', raridade: 'rara' },
    { numero: 48, nome: 'De la Fuente',     selecao: 'Espanha',  posicao: 'TEC', grupo: 'H', raridade: 'comum' },

    // ============== GRUPO I ==============
    { numero: 49, nome: 'Neuer',            selecao: 'Alemanha', posicao: 'GOL', grupo: 'I', raridade: 'rara' },
    { numero: 50, nome: 'Rüdiger',          selecao: 'Alemanha', posicao: 'ZAG', grupo: 'I', raridade: 'comum' },
    { numero: 51, nome: 'Kroos',            selecao: 'Alemanha', posicao: 'MEI', grupo: 'I', raridade: 'lendaria' },
    { numero: 52, nome: 'Musiala',          selecao: 'Alemanha', posicao: 'MEI', grupo: 'I', raridade: 'lendaria' },
    { numero: 53, nome: 'Havertz',          selecao: 'Alemanha', posicao: 'ATA', grupo: 'I', raridade: 'rara' },
    { numero: 54, nome: 'Füllkrug',         selecao: 'Alemanha', posicao: 'ATA', grupo: 'I', raridade: 'comum' },

    // ============== GRUPO J ==============
    { numero: 55, nome: 'Diogo Costa',      selecao: 'Portugal', posicao: 'GOL', grupo: 'J', raridade: 'rara' },
    { numero: 56, nome: 'Rúben Dias',       selecao: 'Portugal', posicao: 'ZAG', grupo: 'J', raridade: 'rara' },
    { numero: 57, nome: 'Bruno Fernandes',  selecao: 'Portugal', posicao: 'MEI', grupo: 'J', raridade: 'rara' },
    { numero: 58, nome: 'Bernardo Silva',   selecao: 'Portugal', posicao: 'MEI', grupo: 'J', raridade: 'rara' },
    { numero: 59, nome: 'Ronaldo',          selecao: 'Portugal', posicao: 'ATA', grupo: 'J', raridade: 'lendaria' },
    { numero: 60, nome: 'Rafael Leão',      selecao: 'Portugal', posicao: 'ATA', grupo: 'J', raridade: 'comum' },

    // ============== GRUPO K ==============
    { numero: 61, nome: 'Verbruggen',       selecao: 'Holanda',  posicao: 'GOL', grupo: 'K', raridade: 'comum' },
    { numero: 62, nome: 'Van Dijk',         selecao: 'Holanda',  posicao: 'ZAG', grupo: 'K', raridade: 'lendaria' },
    { numero: 63, nome: 'Frenkie de Jong',  selecao: 'Holanda',  posicao: 'MEI', grupo: 'K', raridade: 'rara' },
    { numero: 64, nome: 'Gakpo',            selecao: 'Holanda',  posicao: 'ATA', grupo: 'K', raridade: 'rara' },
    { numero: 65, nome: 'Depay',            selecao: 'Holanda',  posicao: 'ATA', grupo: 'K', raridade: 'comum' },
    { numero: 66, nome: 'Koeman',           selecao: 'Holanda',  posicao: 'TEC', grupo: 'K', raridade: 'comum' },

    // ============== GRUPO L ==============
    { numero: 67, nome: 'Gonda',            selecao: 'Japão',    posicao: 'GOL', grupo: 'L', raridade: 'comum' },
    { numero: 68, nome: 'Tomiyasu',         selecao: 'Japão',    posicao: 'ZAG', grupo: 'L', raridade: 'comum' },
    { numero: 69, nome: 'Endo',             selecao: 'Japão',    posicao: 'VOL', grupo: 'L', raridade: 'rara' },
    { numero: 70, nome: 'Mitoma',           selecao: 'Japão',    posicao: 'ATA', grupo: 'L', raridade: 'rara' },
    { numero: 71, nome: 'Kubo',             selecao: 'Japão',    posicao: 'MEI', grupo: 'L', raridade: 'rara' },
    { numero: 72, nome: 'Doan',             selecao: 'Japão',    posicao: 'ATA', grupo: 'L', raridade: 'comum' }
  ];

  // Gera id e urlImagem para cada figurinha
  const FIGURINHAS = FIGURINHAS_BASE.map((f, idx) => {
    const id = 'fig-' + String(idx + 1).padStart(3, '0');
    return Object.assign({}, f, { id, urlImagem: gerarImagem(Object.assign({ id }, f)) });
  });

  // Constantes auxiliares (para popular dropdowns de filtro)
  const GRUPOS = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L'];
  const POSICOES = ['GOL', 'ZAG', 'LAT', 'VOL', 'MEI', 'ATA', 'TEC'];
  const RARIDADES = ['comum', 'rara', 'lendaria'];
  const ESTADOS = ['todas', 'tenho', 'falta', 'repetida'];

  // Expõe no escopo global (uso em app.js sem bundler)
  global.AlbumCopa = global.AlbumCopa || {};
  global.AlbumCopa.data = {
    figurinhas: FIGURINHAS,
    grupos: GRUPOS,
    posicoes: POSICOES,
    raridades: RARIDADES,
    estados: ESTADOS,
    total: FIGURINHAS.length
  };
})(window);

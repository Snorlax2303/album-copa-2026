# 📦 Entrega — Álbum Copa 2026 (V1)

## ✅ Status: pronto para uso

Plataforma web completa de controle de figurinhas da Copa do Mundo 2026, em **português brasileiro**, sem dependências de build, sem backend, sem rastreio.

## 📁 Arquivos criados

| Path | Função |
|---|---|
| `/workspace/album-copa/index.html` | Estrutura semântica da página (header, dashboard, gráfico, filtros, grid, footer) |
| `/workspace/album-copa/styles.css` | Visual responsivo com tema Copa (verde/amarelo/azul), cards, grid, animações |
| `/workspace/album-copa/app.js` | Lógica completa: CRUD de estados, filtros, busca, estatísticas, localStorage |
| `/workspace/album-copa/data.js` | Dataset embutido: 72 figurinhas, 12 seleções, 12 grupos A–L |
| `/workspace/album-copa/README.md` | Guia de uso e informações técnicas |
| `/workspace/album-copa/deliverable.md` | Este arquivo |

## 🎯 Funcionalidades entregues (V1)

- ✅ **Catálogo de 72 figurinhas** com id, número, nome, seleção, posição (GOL/ZAG/LAT/VOL/MEI/ATA/TEC), grupo (A–L), raridade (comum/rara/lendária) e imagem SVG inline.
- ✅ **3 estados por figurinha**: Tenho / Falta / Repetida, com botões de ação rápida.
- ✅ **Persistência no localStorage** (chave `album-copa-2026-v1`) — sobrevive a refresh, fechar o navegador, etc.
- ✅ **Busca textual** por nome do jogador OU seleção.
- ✅ **6 filtros combináveis** em tempo real: estado, grupo, seleção, posição, raridade, busca.
- ✅ **Contador** "Mostrando X de Y figurinhas".
- ✅ **Dashboard** com 5 cards: total, tenho, falta, repetidas, % de conclusão.
- ✅ **Barra de progresso visual**.
- ✅ **Gráfico de progresso por seleção** (barras CSS).
- ✅ **Layout responsivo** (mobile-first, testado em 375px e 1280px).
- ✅ **Tema visual de Copa** com cores verde/amarelo/azul.
- ✅ **Botão "Limpar tudo"** para resetar o álbum.

## 🎨 Estratégia de imagem

Como não temos acesso a imagens licenciadas de jogadores, cada figurinha gera um **SVG inline (data URI)** determinístico que mostra:
- fundo com a bandeira estilizada do país (3 faixas coloridas)
- número da figurinha em destaque
- nome do jogador

Isso garante que **tudo funcione offline, sem CDN, sem 404**, e a mesma figurinha sempre gera a mesma imagem.

## 🚀 Como usar

```bash
# Abra o arquivo no navegador
open /workspace/album-copa/index.html        # macOS
xdg-open /workspace/album-copa/index.html    # Linux
start /workspace/album-copa/index.html       # Windows
```

Ou simplesmente arraste o `index.html` para o navegador.

## 🔧 Como testar localmente

```bash
cd /workspace/album-copa
node --check app.js     # valida sintaxe JS
node --check data.js    # valida sintaxe JS
```

Para inspecionar o dataset:
```bash
node -e "global.window={};require('fs').readFileSync('data.js','utf8');eval(require('fs').readFileSync('data.js','utf8'));console.log(window.AlbumCopa.data)"
```

## ⚠️ Limitações conhecidas

- **Imagens são SVG placeholders estilizados**, não fotos reais dos jogadores (restrição de licenciamento).
- **Sem sistema de trocas** entre usuários (escopo V2, conforme combinado).
- **Sem backend/sincronização** — os dados ficam só no seu navegador. Limpar cache do navegador apaga tudo.
- O gráfico de progresso por seleção é via CSS bars, não Chart.js (escolha de simplicidade).

## 💡 Sugestões para V2

- 📦 **Sistema de trocas** entre amigos (matching "tenho X e quero Y")
- ☁️ **Banco compartilhado** (backend leve com Firebase/Supabase) para sincronizar entre dispositivos
- 📷 **Imagens reais** via API oficial da Panini / Wikipedia
- 📥 **Importar/Exportar** o álbum (JSON) para backup
- 🏆 **Conquistas/gamificação** (figurinhas raras, 100% do álbum, etc.)
- 📱 PWA (instalar como app no celular)
- 🔔 **Notificações** quando amigos adicionam figurinhas que você precisa

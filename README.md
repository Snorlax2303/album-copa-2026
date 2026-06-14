# Álbum Copa 2026 — Plataforma de Controle de Figurinhas

Plataforma web pessoal para controlar as figurinhas da Copa do Mundo 2026
(EUA / México / Canadá). Permite marcar quais figurinhas você **tem**,
quais **faltam** e quais estão **repetidas** (disponíveis para troca futura).

> **V1**: controle individual (CRUD pessoal) com persistência em
> `localStorage`. **Sem sistema de trocas** e **sem banco compartilhado**
> nesta versão — veja "Sugestões para V2" no final.

---

## ✨ Funcionalidades

- 📚 **Catálogo** com 72 figurinhas reais (12 seleções × 6 cards, grupos A–L).
- 🏷️ **3 estados por figurinha**: Tenho / Falta / Repetida.
- 💾 **Persistência local** via `localStorage` — sobrevive a refresh.
- 🔍 **Busca textual** por nome do jogador OU seleção.
- 🎛️ **Filtros combináveis**: estado, grupo (A–L), seleção, posição (GOL/ZAG/...), raridade.
- 📊 **Dashboard**: cards de estatística + barra de progresso.
- 📈 **Gráfico de progresso por seleção** (barras CSS).
- 📱 **Responsivo** (testado em 375px e 1280px).
- 🇧🇷 **100% em português brasileiro**.

---

## 🚀 Como usar

### Abrir localmente

Não há build, não há dependência de servidor. É só abrir o arquivo:

```bash
# No Linux/macOS
xdg-open index.html      # ou
open index.html          # macOS
```

No Windows, basta dar duplo clique em `index.html` — ou:

```bash
start index.html
```

O navegador vai abrir a aplicação em `file://` e tudo funciona offline.

### Alternativa: servir via servidor local (opcional)

Se preferir rodar via HTTP (alguns navegadores restringem `localStorage`
em `file://`), use qualquer servidor estático. Por exemplo:

```bash
# Python 3
python3 -m http.server 8000

# Node (se tiver npx)
npx serve .
```

Depois acesse `http://localhost:8000/`.

---

## 📁 Estrutura de arquivos

```
album-copa/
├── index.html        # marcação + scripts carregados
├── styles.css        # tema visual Copa (verde/amarelo/azul)
├── app.js            # toda a lógica: CRUD, filtros, dashboard
├── data.js           # dataset das 72 figurinhas + gerador de SVG
└── README.md         # este arquivo
```

---

## 🖼️ Estratégia de imagens

Como **não temos acesso a imagens licenciadas** dos jogadores, cada figurinha
é renderizada como um **SVG inline (data URI)** gerado em `data.js`. O SVG
contém:

- Número da figurinha (canto superior)
- Selo de raridade (★ lendária / ◆ rara / sem selo para comum)
- Bandeira estilizada do país (faixas coloridas, círculo, cruz etc.)
- Nome do jogador
- Posição (GOL / ZAG / LAT / VOL / MEI / ATA / TEC)
- Grupo (A até L)

As bandeiras seguem uma versão esquemática (faixas horizontais, verticais,
listras, cruz ou círculo) por país — são **representações**, não reproduções
oficiais dos pavilhões nacionais. Trocar por imagens reais no futuro é
simples: basta substituir o campo `urlImagem` em `data.js` por um link
válido.

A geração do SVG é 100% determinística — a mesma figurinha gera sempre o
mesmo SVG, e o `localStorage` mantém as marcações entre sessões.

---

## 🎮 Guia rápido de uso

1. **Marcar figurinhas**: clique em "Tenho", "Repetida" ou "Falta" em cada card.
   - *Atalho*: clique na imagem do card para alternar ciclicamente
     (Tenho → Repetida → Falta → sem marcação).
2. **Buscar**: digite o nome do jogador ou da seleção no campo de busca.
3. **Filtrar**: combine os filtros para ver só as figurinhas que interessam
   (ex: "Falta" + "Grupo A" + "Brasil").
4. **Acompanhar**: o dashboard e o gráfico por seleção atualizam em tempo
   real conforme você marca.
5. **Resetar**: botão "Limpar tudo" no header apaga todas as marcações
   (pede confirmação).

---

## 🛠️ Stack técnica

- **HTML5 + CSS3 + JavaScript ES2017+ puro** (vanilla, sem framework).
- **Sem build, sem npm, sem webpack, sem Vite.**
- **Sem dependências externas em runtime** (nenhuma CDN) — tudo carrega via
  `file://`.
- Persistência: `localStorage` (chave `album-copa-2026-v1`).
- Acessibilidade: `aria-label`, `role`, `prefers-reduced-motion`,
  `:focus-visible`, semântica HTML5.

---

## 🧪 Testado em

- Chrome / Chromium (Desktop e Mobile)
- Firefox
- Safari (iOS)
- Larguras: **375px** (iPhone SE) e **1280px** (desktop padrão).

---

## 📋 Limitações conhecidas

1. **Sem sistema de trocas** — proposital, fora do escopo da V1.
2. **Sem sincronização entre dispositivos** — o estado fica só no navegador
   do usuário. Para usar em outro dispositivo, exporte/importe manualmente
   (ver sugestões V2).
3. **Imagens são SVG esquemáticos**, não fotos reais.
4. **Sem contas/usuários** — o "álbum" é local.
5. **Dataset fixo** — as 72 figurinhas vêm embutidas. Para o álbum real
   (com 600+ figurinhas oficiais), seria preciso carregar o dataset
   externamente ou via JSON.

---

## 🚧 Sugestões para V2

| Funcionalidade | Descrição |
|---|---|
| **Sistema de trocas (P2P)** | Backend leve (Cloudflare Workers / Supabase) para conectar colecionadores próximos e propor trocas. |
| **Banco compartilhado** | Lista agregada e anônima de figurinhas mais raras (crowdsourcing). |
| **Importar/Exportar** | Botão para baixar o álbum como JSON e restaurar de backup (resolve o problema de mudar de dispositivo). |
| **Códigos únicos** | Cada figurinha oficial tem código alfanumérico — adicionar scanner via câmera (quagga.js / ZXing). |
| **Álbum visual** | Modo "página" com as figurinhas posicionadas em folha estilo álbum impresso. |
| **Notificações** | Avisar quando amigos postam figurinhas que te interessam. |
| **PWA** | Transformar em Progressive Web App (instalar no celular, funcionar offline com Service Worker). |
| **Dataset expandido** | Carregar as ~600 figurinhas oficiais (seleções, mascotes, estádios, troféu, etc.). |
| **Multi-idioma** | pt-BR / en-US / es-MX. |
| **Estatísticas avançadas** | Tempo médio para completar, figurinha mais "valiosa", etc. |

---

## 📜 Licença

Uso pessoal. Os nomes de seleções e jogadores são referenciais
educacionais; este projeto **não é afiliado à FIFA, CBF ou quaisquer
entidades oficiais da Copa 2026**.

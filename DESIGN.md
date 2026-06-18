# 📐 Design System — Patas & Pelos

Este documento detalha o **Design System** da Landing Page **Patas & Pelos**. O projeto utiliza variáveis CSS nativas (*Design Tokens*) estruturadas para suportar Light/Dark mode de forma consistente, com foco em uma experiência estética premium, acessível e de alta performance de renderização.

---

## 🎨 1. Paleta de Cores (Color Tokens)

As cores foram selecionadas para criar uma atmosfera acolhedora, moderna e profissional. A interface possui um tema padrão claro e suporte completo para modo escuro reativo.

### ☀️ Tema Claro (Light Mode)

| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--bg-primary` | `#FAF8F5` | Fundo principal da página (creme suave) |
| `--bg-secondary` | `#FFFFFF` | Fundo de cartões, formulários e elementos flutuantes |
| `--bg-dark` | `#1E1C31` | Fundo de seções escuras (como a calculadora e o rodapé) |
| `--bg-card-dark` | `#2A2744` | Fundo dos cards na calculadora |
| `--text-primary` | `#2C2A29` | Títulos e textos de alta legibilidade (quase preto) |
| `--text-secondary`| `#6B6661` | Subtítulos e parágrafos auxiliares (cinza neutro) |
| `--text-light` | `#F4F0EB` | Textos sobrepostos a fundos escuros |
| `--border-color` | `#EAE3DA` | Divisórias e bordas secundárias de inputs |

### 🌙 Tema Escuro (Dark Mode)

Ativado via atributo `data-theme="dark"` no elemento `<html>`.

| Token | Valor Hex | Uso Principal |
| :--- | :--- | :--- |
| `--bg-primary` | `#0F0D1A` | Fundo geral da página (violeta escuro profundo) |
| `--bg-secondary` | `#161426` | Fundo de cartões e blocos internos |
| `--bg-dark` | `#08070F` | Fundo de seções ainda mais escuras (inputs/rodapé) |
| `--bg-card-dark` | `#1E1B33` | Fundo dos cartões internos do simulador |
| `--text-primary` | `#FFFFFF` | Títulos e textos principais (branco puro) |
| `--text-secondary`| `#A09BB9` | Subtítulos e parágrafos secundários (lavanda acinzentado) |
| `--text-light` | `#FAF8F5` | Textos gerais |
| `--border-color` | `#262438` | Bordas e divisórias escuras |

### 🏷️ Cores de Destaque (Accent & Semantic Colors)

| Token | Tema Claro | Tema Escuro | Semântica |
| :--- | :--- | :--- | :--- |
| `--primary` | `#6366F1` (Indigo) | `#818CF8` (Light Indigo) | Cor de marca primária, links ativos, botões CTA |
| `--primary-hover`| `#4F46E5` | `#6366F1` | Estado de foco/hover do botão primário |
| `--primary-light`| `#EEF2FF` | `rgba(129,140,248,0.15)`| Fundos de badges e destaques sutis |
| `--secondary` | `#EC4899` (Rose) | `#F472B6` (Pink) | Destaques secundários e marcação CCTV ativa |
| `--secondary-hover`| `#DB2777` | `#EC4899` | Estado hover de elementos secundários |
| `--accent` | `#F59E0B` (Amber) | `#F59E0B` (Amber) | Destaque de preços, cupons de desconto e alertas |
| `--accent-light` | `#FEF3C7` | `rgba(245,158,11,0.15)` | Fundo de badges promocionais |
| `--success` | `#10B981` (Emerald) | `#10B981` (Emerald) | Notificações e indicadores de status bem-sucedidos |
| `--success-light`| `#D1FAE5` | `rgba(16, 185, 129, 0.15)`| Fundo de toasts de sucesso e cupons aplicados |

---

## 🔠 2. Tipografia (Typography)

| Propriedade | Token / Valor | Descrição / Uso |
| :--- | :--- | :--- |
| **Família de Títulos** | `'Outfit', sans-serif` | Utilizada em headings (`h1`, `h2`, `h3`, `h4`, logotipos e botões). Transmite modernidade e elegância geométrica. |
| **Família do Corpo** | `'Plus Jakarta Sans', sans-serif` | Utilizada para parágrafos, inputs, FAQs e descrições gerais. Otimizada para alta legibilidade em blocos de texto pequenos. |
| **Tamanho H1 (Hero)** | `3.5rem` (mobile: `2.2rem`) | Título principal de impacto visual. |
| **Tamanho H2** | `2.5rem` (mobile: `2.0rem`) | Títulos de seções da página. |
| **Tamanho H3** | `1.35rem` a `1.45rem` | Títulos internos de cards e benefícios. |
| **Tamanho Corpo** | `16px` | Tamanho base de leitura. |

---

## 📐 3. Bordas, Espaçamentos e Sombras

O sistema visual utiliza cantos arredondados orgânicos (*organic rounded corners*) e elevações sutis por meio de sombras projetadas com transparência controlada, criando uma hierarquia de profundidade (eixo Z).

### 🔲 Bordas Arredondadas (Border Radii)
- `--radius-lg` (`24px`): Utilizado em cards grandes, contêineres de seções e modais (FAQ, CCTV, Contato).
- `--radius-md` (`16px`): Utilizado em inputs de formulário, botões interativos da calculadora, caixas de frequência e botões maiores.
- `--radius-sm` (`8px`): Utilizado em elementos utilitários menores como toasts e ícones.

### 👥 Sombras (Box Shadows)
- `--shadow-sm` (`0 4px 16px rgba(44, 42, 41, 0.10)`): Sombras suaves para cabeçalhos e separadores secundários.
- `--shadow-md` (`0 12px 30px rgba(99, 102, 241, 0.12)`): Sombras médias aplicadas em elementos ativos e focados.
- `--shadow-lg` (`0 24px 50px rgba(44, 42, 41, 0.16)`): Sombras profundas para modais, toasts de notificação e o wrapper da imagem Hero.

---

## ⚡ 4. Animações e Transições (Transitions & Animations)

As animações são divididas entre **micro-interações instantâneas** (desencadeadas pelo usuário) e **animações baseadas em rolagem** (reveal dinâmico).

### 🕒 Transição Padrão
- `--transition-smooth`: `all 0.3s cubic-bezier(0.4, 0, 0.2, 1)`. Fornece uma curva de aceleração elástica natural a todas as propriedades de hover.

### 🎭 Keyframes de Animação
1. **`morphingPet` (15s):** Altera continuamente o `border-radius` da imagem principal do Hero entre formas orgânicas fluidas, evitando bordas retas estáticas.
2. **`floatCard` (4s):** Animação de levitação vertical sutil aplicada aos cards flutuantes decorativos do Hero.
3. **`cctvPan1` / `cctvPan2` / `cctvPan3` (20s):** Simulação de movimento contínuo da lente da câmera no modal CCTV, aplicando efeito lento de zoom e pan lateral.
4. **`pulse` (1.5s):** Batimento de opacidade gradual (0.4 a 1.0) para os leds de câmeras ativas e gravação.
5. **`bounceMarker` (2s):** Efeito de flutuação vertical no marcador do mapa na seção de contato.
6. **`shadowPulse` (2s):** Expansão e fade-out de um círculo cinza simulando o pulso de sombra sob o marcador do mapa.
7. **`toastIn` (0.3s):** Entrada acelerada pelo lado direito da tela para notificações do sistema.
8. **`toastProgress` (4s):** Redução contínua da barra de progresso do toast em direção a 0%.

---

## 🔍 5. Reveal Dinâmico ao Scroll (Scroll Reveal Observer)

Implementado através de um `IntersectionObserver` no script [reveal.js](file:///home/james/Landing-Page---Pet-Shop-Patas-Pelos/src/js/modules/reveal.js).

### 🚀 Fluxo de Interação de Rolagem Reativa
A animação reage de forma contínua tanto quando o usuário desce a página quanto quando ele sobe a página (*scroll up and down*), mantendo a página interativa e viva.

- Ao entrar na área visível da tela (+10% de intersecção), o script adiciona a classe `.reveal-active`.
- Ao sair da área visível da tela, o script remove a classe `.reveal-active`.
- O observer nunca para de monitorar o elemento (sem chamadas a `unobserve`), permitindo o re-disparo contínuo das transições.

### 💫 Classes de Transição
*   **`.reveal`:** Aparecimento suave com elevação (`translateY(30px) -> translateY(0)` e opacidade).
*   **`.reveal-left`:** Deslocamento da esquerda para a direita (`translateX(-36px) -> 0`).
*   **`.reveal-right`:** Deslocamento da direita para a esquerda (`translateX(36px) -> 0`).
*   **`.reveal-zoom`:** Zoom in progressivo (`scale(0.94) -> scale(1)`).

---

## 🛠️ 6. Especificações de Micro-Interações de UX

### 🎛️ Elementos do Simulador de Preço
Os blocos de seleção (`.radio-tile`, `.size-box`, `.freq-box`) respondem instantaneamente ao ponteiro do mouse:
- **Estado Inicial:** Borda cinza suave (`--border-color`) e fundo translúcido.
- **Hover:** Elevação vertical de `-3px`, transição da borda para a cor da marca com opacidade, e projeção de uma sombra de brilho sutil.
- **Checked (Ativo):** Fundo colorido sutil (`--primary-light`) e borda ativa sólida (`--primary`).

### 🔘 Botões
- **Primários:** Gradiente linear vibrante com uma sombra projetada na cor do botão. Ao passar o mouse, sofrem elevação (`-2px`) e a sombra se expande, gerando sensação física de clique.
- **Secundários:** Fundo branco com borda fina. Ao sofrer hover, o fundo clareia para a tonalidade primária suave e a borda/texto assumem a cor ativa.

### 🌐 Links de Navegação (GPU Composition)
Para garantir suavidade em celulares e computadores com monitores de alta taxa de atualização, a linha ativa da barra de navegação (`.nav-link::after`) é animada via `transform: scaleX()` ao invés de `width`. Isso evita o recálculo da árvore de renderização do navegador, mantendo a transição a estáveis **60 quadros por segundo (60 FPS)**.

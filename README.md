# 🐾 Patas & Pelos — Pet Shop & Estética Premium

[![GitHub](https://img.shields.io/badge/github-BrThiagoN/Landing--Page---Pet--Shop--Patas--Pelos-6366F1?style=flat-square&logo=github)](https://github.com/BrThiagoN/Landing-Page---Pet-Shop-Patas-Pelos)
[![Website](https://img.shields.io/badge/demo-live-success?style=flat-square&logo=browser)](https://landing-page-pet-shop-patas-pelos.vercel.app/)
[![License](https://img.shields.io/badge/license-MIT-10B981?style=flat-square)](LICENSE)

Landing page moderna, responsiva e interativa para o pet shop premium **Patas & Pelos**. Construída com HTML5, CSS3 modular e JavaScript ES6+ purificado — sem dependências externas complexas, mas estruturada para alta performance e escalabilidade.

🔗 **Link do Site Oficial:** [https://landing-page-pet-shop-patas-pelos.vercel.app/](https://landing-page-pet-shop-patas-pelos.vercel.app/)

---

## 📋 Tabela de Conteúdo

- [Funcionalidades](#-funcionalidades)
- [Tecnologias](#-tecnologias)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Como Usar](#-como-usar)
- [Galeria](#-galeria)
- [Roadmap](#-roadmap)
- [Licença](#-licença)

---

## ✨ Funcionalidades

### 🧮 Simulador de Preços Interativo
Calculadora em tempo real que ajusta o valor conforme:
- **Tipo do pet**: Cão ou Gato
- **Porte**: Pequeno, Médio ou Grande
- **Serviços**: Banho, Tosa, Hidratação, Corte de Unhas, Consulta
- **Frequência**: Único, Semanal (10% OFF) ou Quinzenal (5% OFF)
- **Cupom de desconto**: `PRIMEIRO10` (10%) e `PETLOVE15` (15%)
- Exibe **detalhamento completo** com subtotal, descontos e valor final com animação de contagem

### 🌙 Modo Claro / Escuro
Alternância com persistência em `localStorage` e detecção de preferência do sistema (`prefers-color-scheme`).

### 📱 Menu Responsivo
- Menu hambúrguer animado no mobile
- Header com efeito **sticky** e **glassmorphism** ao scroll
- Scrollspy ativo — destaca automaticamente a seção visível

### 📊 Contadores Animados (IntersectionObserver)
Os números de estatísticas (anos, banhos, avaliação) disparam ao entrar na viewport — animação suave em ~60fps.

### 🎥 Modal de Câmeras ao Vivo (CCTV)
Simulação de monitoramento com:
- Feed com efeito **scanline**, borda CRT e overlay de CCTV
- Relógio em tempo real
- Alternância entre câmeras (Recreação, Estética, Hotel)
- Efeito **pan** animado no background

### ❓ FAQ com Accordion
Perguntas frequentes expansíveis com animação suave de altura.

### 🎉 Modal de Sucesso
Ao enviar o agendamento, exibe um modal com resumo dos dados preenchidos.

### 📬 Sistema de Toast Notifications
Notificações temporárias com barra de progresso para feedback de ações.

### 🎞️ Scroll Reveal
Elementos aparecem com animação ao entrar na viewport (fade, slide lateral e zoom).

---

## 🛠️ Tecnologias

| Tecnologia | Uso |
|---|---|
| **HTML5** | Estrutura semântica, SVG inline, meta tags |
| **CSS3 (Modular)** | Design System em CSS Variables, Grid, Flexbox, Keyframes, Glassmorphism, organizados por componentes |
| **JavaScript (ES6 Modules)** | DOM API, modularização nativa por arquivos de negócio, IntersectionObserver, localStorage |
| **Google Fonts** | Outfit (títulos) + Plus Jakarta Sans (corpo) |
| **Unsplash** | Imagens de alta qualidade |

Zero dependências pesadas de frameworks — mantendo a essência estática e performance ideal do Vanilla Frontend.

---

## 📂 Estrutura do Projeto

O projeto foi reestruturado seguindo as melhores práticas de Engenharia de Software Frontend para garantir modularidade, separação de preocupações e manutenibilidade para equipes maiores.

```
Landing-Page---Pet-Shop-Patas-Pelos/
├── index.html              # Ponto de entrada HTML5 principal
├── src/                    # Código-fonte do projeto
│   ├── css/                # Arquitetura modular de estilos CSS
│   │   ├── main.css        # Agregador que importa todos os sub-arquivos CSS
│   │   ├── variables.css   # Variáveis globais do Design System (Design Tokens)
│   │   ├── base.css        # Resets globais e regras básicas de tags HTML
│   │   ├── components.css  # Folha de componentes isolados (botões, modals, FAQ, toasts)
│   │   ├── sections.css    # Estilização de seções específicas da página (hero, contact, etc.)
│   │   └── animations.css  # Keyframes de animação e observers de reveal
│   └── js/                 # Lógica da aplicação utilizando ES6 Modules nativos
│       ├── main.js         # Script principal (entry point) que carrega e roda os módulos
│       └── modules/        # Módulos especializados por funcionalidade
│           ├── toast.js        # Alertas pop-up de feedback temporários
│           ├── theme.js        # Controle de light/dark theme e localStorage
│           ├── navigation.js   # Sticky navbar, hamburguer mobile e scrollspy active link
│           ├── calculator.js   # Calculadora de precificação e validação de cupons
│           ├── stats.js        # Contador numérico animado por viewport
│           ├── booking.js      # Gerenciamento de submits de formulário de agendamento
│           ├── live-camera.js  # Modal CCTV, alternação de feeds e relógio dinâmico
│           ├── contact.js      # Interceptador do formulário de contato rápido
│           ├── faq.js          # Accordion dinâmico de perguntas e respostas
│           └── reveal.js       # Efeito scroll reveal nas seções
└── README.md
```

### 🧠 Filosofia de Design da Nova Estrutura
- **Separation of Concerns:** Código espaguete foi banido. Cada recurso possui seu próprio arquivo JS e CSS delimitado.
- **Dry & Modular:** A folha antiga com 2200+ linhas foi particionada em módulos pequenos que não poluem o escopo global.
- **Nativo e Leve:** Aproveitamos os recursos de importação nativos (`@import` no CSS e `import`/`export` no JS) eliminando a necessidade de build tools pesadas (como Webpack ou Vite) para manter a leveza do carregamento.

---

## 🚀 Como Usar e Visualizar Localmente

Devido ao uso de **módulos nativos JavaScript (ES6 Modules)**, os navegadores modernos bloqueiam requisições de arquivos locais por razões de segurança (CORS) caso a página seja aberta clicando diretamente no arquivo `index.html` (protocolo `file://`).

Para rodar localmente com 100% das funções interativas funcionando, inicialize um servidor estático simples na pasta raiz do projeto:

### Opção 1: Usando Python (Geralmente pré-instalado em Linux/Mac)
```bash
python3 -m http.server 8000
```
Em seguida, abra o navegador em: `http://localhost:8000`

### Opção 2: Usando VS Code (Extensão Live Server)
1. Instale a extensão **Live Server**.
2. Abra a pasta do projeto no VS Code.
3. Clique em **"Go Live"** na barra de status inferior.

### Opção 3: Usando Node/npm (Se instalado no sistema)
```bash
npx live-server
```

---

## 🖼️ Galeria

| Hero | Calculadora | CCTV |
|---|---|---|
| Header com glassmorphism, imagem morphed e cards flutuantes | Simulador com radio tiles, checkboxes e preço em tempo real | Modal de monitoramento com scanlines e relógio |

<p align="center">
  <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80" alt="Preview" width="600">
</p>

---

## 🧭 Roadmap

- [x] Calculadora de preços interativa
- [x] Modo escuro com persistência
- [x] Menu responsivo com scrollspy
- [x] Modal de câmeras ao vivo
- [x] FAQ accordion
- [x] Animações scroll reveal
- [x] Arquitetura modular Frontend de Alta Manutenibilidade (Senior Refactor)
- [ ] Integração com formulário real (email/API)
- [ ] Páginas internas (blog, equipe)
- [ ] Testes automatizados

---

## 📄 Licença

Distribuído sob a licença **MIT**. Consulte o arquivo `LICENSE` para mais informações.

---

<p align="center">
  Feito por <a href="https://github.com/BrThiagoN">BrThiagoN</a>
</p>

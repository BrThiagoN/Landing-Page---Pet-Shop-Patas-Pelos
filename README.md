# 🐾 Patas & Pelos — Pet Shop & Estética Premium

[![GitHub](https://img.shields.io/badge/github-BrThiagoN/Landing--Page---Pet--Shop--Patas--Pelos-6366F1?style=flat-square&logo=github)](https://github.com/BrThiagoN/Landing-Page---Pet-Shop-Patas-Pelos)
[![License](https://img.shields.io/badge/license-MIT-10B981?style=flat-square)](LICENSE)
[![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)](index.html)
[![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)](styles.css)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)](script.js)

Landing page moderna, responsiva e interativa para o pet shop premium **Patas & Pelos**. Construída com HTML5, CSS3 e JavaScript puro — sem dependências externas, sem frameworks. Basta abrir no navegador.

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
| **CSS3** | Variáveis, Grid, Flexbox, animações keyframe, glassmorphism, media queries |
| **JavaScript (ES6+)** | DOM API, IntersectionObserver, localStorage, manipulação de eventos |
| **Google Fonts** | Outfit (títulos) + Plus Jakarta Sans (corpo) |
| **Unsplash** | Imagens de alta qualidade |

Zero dependências — sem jQuery, sem React, sem build tools.

---

## 📂 Estrutura do Projeto

```
Landing-Page---Pet-Shop-Patas-Pelos/
├── index.html              # Estrutura HTML5 principal
├── styles.css              # Sistema de design e estilos (2200+ linhas)
├── script.js               # Lógica interativa (540 linhas)
├── css/
│   └── animations.css      # Animações keyframe modulares
└── README.md
```

---

## 🚀 Como Usar

```bash
git clone https://github.com/BrThiagoN/Landing-Page---Pet-Shop-Patas-Pelos.git
cd Landing-Page---Pet-Shop-Patas-Pelos
start index.html
```

Ou simplesmente arraste o `index.html` para o navegador.

> Nenhum servidor, build ou instalação necessária — o projeto é 100% estático.

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

<div align="center">

  # 🐾 Patas & Pelos — Pet Shop & Estética Premium

  ### 🌐 <a href="https://landing-page-pet-shop-patas-pelos.vercel.app/" target="_blank">CLIQUE AQUI PARA ACESSAR A APLICAÇÃO AO VIVO</a>

  <a href="https://landing-page-pet-shop-patas-pelos.vercel.app/" target="_blank"><img src="https://img.shields.io/badge/Acesse%20o%20Site-CLIQUE%20AQUI-success?style=for-the-badge&logo=vercel&logoColor=white&color=6366F1" alt="Website"></a>
  <a href="https://github.com/BrThiagoN/Landing-Page---Pet-Shop-Patas-Pelos" target="_blank"><img src="https://img.shields.io/badge/github-repo-6366F1?style=flat-square&logo=github" alt="GitHub"></a>
  <a href="LICENSE" target="_blank"><img src="https://img.shields.io/badge/license-MIT-10B981?style=flat-square" alt="License"></a>

</div>

---

Landing page premium, moderna, 100% responsiva e altamente interativa desenvolvida para o pet shop e estética canina/felina de alto padrão **Patas & Pelos**.

O projeto foi reestruturado de ponta a ponta seguindo padrões avançados de Engenharia de Software Frontend. A base de código espaguete foi dividida em módulos JavaScript e folhas de estilo CSS desacopladas e escaláveis, sem necessitar de compiladores pesados ou frameworks intrusivos, preservando a essência ultra-rápida e estática do desenvolvimento Vanilla.

---

## 📋 Tabela de Conteúdo

1. [✨ Funcionalidades em Destaque](#-funcionalidades-em-destaque)
2. [📐 Design System & Tokens (DESIGN.md)](#-design-system--tokens-designmd)
3. [📂 Arquitetura do Projeto & Modularidade](#-arquitetura-do-projeto--modularidade)
4. [🛠️ Stack de Tecnologias](#%EF%B8%8F-stack-de-tecnologias)
5. [🧮 Regras de Negócio e Validação de Cupons](#-regras-de-negócio-e-validação-de-cupons)
6. [🧪 Suíte de Testes de Integração](#-suíte-de-testes-de-integração)
7. [🚀 Como Executar e Visualizar Localmente (CORS)](#-como-executar-e-visualizar-localmente-cors)
8. [🖼️ Galeria Visual](#-galeria-visual)
9. [🧭 Roadmap de Desenvolvimento](#-roadmap-de-desenvolvimento)
10. [📄 Licença](#-licença)

---

## ✨ Funcionalidades em Destaque

### 🧮 Simulador de Preços Inteligente
Uma calculadora interativa que calcula orçamentos em tempo real combinando:
*   **Espécie do Pet:** Cão ou Gato.
*   **Porte do Animal:** Pequeno, Médio ou Grande (ajusta proporcionalmente o preço base dos serviços).
*   **Serviços Customizados:** Seleção flexível de Banho, Tosa, Hidratação, Corte de Unhas e Consulta Veterinária.
*   **Frequência de Assinatura:** Opções para serviço Único (preço cheio), Semanal (10% de desconto) ou Quinzenal (5% de desconto).
*   **Cupons de Desconto Dinâmicos:** Suporta cupons promocionais com validação e invalidação automática e reativa na tela.

### 📋 Timeline de UX e Indicadores de Confiança
*   **Passo a Passo Visual:** Barra de progresso interativa exibindo as 3 etapas de agendamento.
*   **Painel de Cupons Promocionais:** Mostruário informativo com requisitos necessários para ativação de cada cupom.
*   **Selos de Qualidade:** Cards informativos com micro-interações hover detalhando suporte via WhatsApp, garantia de satisfação e transporte seguro.

### 🌙 Light & Dark Mode Nativo
*   Chaveamento de temas reativo com transições de cores suaves.
*   Detecção inteligente de preferências de sistema operacional (`prefers-color-scheme`) e persistência persistente de estado via `localStorage`.

### 🎥 Monitor de Câmeras ao Vivo (CCTV Sandbox)
*   Modal retro com interface simulada de monitoramento por câmeras reais (Hotel, Recreação e Estética).
*   Exibe efeitos visuais de scanlines, overlay estático e relógio digital sincronizado em tempo real.
*   Transição lenta de lentes (Pan/Zoom) com aceleração gráfica ativa.

### ❓ FAQ Accordion
*   Perguntas e respostas frequentes inteligentes. Ao clicar em uma pergunta para expandi-la, todas as outras perguntas abertas se fecham de forma coordenada, otimizando o espaço da tela.

### 📬 Sistema de Toast Notifications
*   Balões de aviso temporários que surgem à direita com barra de progresso regressiva física (4 segundos) para feedbacks imediatos de sucesso ou erros.

### 🎞️ Scroll Reveal Bidirecional
*   Animações suaves utilizando `IntersectionObserver` que monitoram dinamicamente a viewport. Os elementos entram e saem de cena em ambas as direções, garantindo que a página permaneça viva e dinâmica tanto no scroll descendente (down) quanto no ascendente (up).

---

## 📐 Design System & Tokens (`DESIGN.md`)

O projeto está totalmente respaldado por um guia técnico de interface documentado no arquivo [DESIGN.md](file:///home/james/Landing-Page---Pet-Shop-Patas-Pelos/DESIGN.md). Este arquivo detalha:
*   **Design Tokens:** Variáveis de cores hexadecimais para temas claros e escuros de alto contraste.
*   **Tipografia Semântica:** Utilização de fontes modernas (*Outfit* para títulos e *Plus Jakarta Sans* para leitura do corpo) carregadas do Google Fonts.
*   **Sistema de Profundidade:** Declarações de bordas arredondadas e sombras de profundidade (eixo Z).
*   **Performance (GPU Rendering):** Detalhamento de micro-interações projetadas com `transform` e `opacity` para assegurar renderização estável a **60 quadros por segundo (60 FPS)**.

---

## 📂 Arquitetura do Projeto & Modularidade

A base de arquivos foi fatorada de forma limpa, seguindo a separação de responsabilidades (*Separation of Concerns*):

```
Landing-Page---Pet-Shop-Patas-Pelos/
├── DESIGN.md               # Especificações completas do Design System
├── index.html              # Interface estática principal (HTML5 semântico)
├── src/                    # Código-fonte principal da aplicação
│   ├── css/                # Arquitetura modular de estilização CSS
│   │   ├── main.css        # Agregador que importa todos os sub-arquivos CSS
│   │   ├── variables.css   # Variáveis globais do Design System (Design Tokens)
│   │   ├── base.css        # Estilos globais de resets e tags fundamentais
│   │   ├── components.css  # Componentes reutilizáveis (botões, modal, accordion, toast)
│   │   ├── sections.css    # Estilos focados em seções de layout (Hero, Calculadora, Contato)
│   │   └── animations.css  # Keyframes de animação e regras do observer
│   └── js/                 # Lógica da aplicação orientada a módulos ES6
│       ├── main.js         # Entry point do JS que inicializa todos os módulos
│       └── modules/        # Arquivos JS desacoplados com escopo isolado
│           ├── toast.js        # Motor de notificações flutuantes
│           ├── theme.js        # Gerenciador de tema claro/escuro e localStorage
│           ├── navigation.js   # Controle de navbar sticky, hambúrguer e scrollspy
│           ├── calculator.js   # Motor de cálculo de preços e regras de cupons
│           ├── stats.js        # Contadores numéricos incrementais na viewport
│           ├── booking.js      # Validador e coletor do formulário de agendamento
│           ├── live-camera.js  # Controle de feeds do modal CCTV e relógio
│           ├── contact.js      # Interceptador do formulário de contato rápido
│           ├── faq.js          # Lógica do accordion colapsável
│           └── reveal.js       # Registro do IntersectionObserver de scroll reveal
├── tests/                  # Pasta dedicada para garantia de qualidade (QA)
│   ├── index.html          # Interface visual de execução de testes (Mocha Runner)
│   └── integration.test.js # Cenários de asserção de testes de integração
└── README.md               # Documentação geral do repositório
```

---

## 🛠️ Stack de Tecnologias

*   **HTML5 Semântico:** Estrutura legível para SEO e acessibilidade por leitores de tela.
*   **CSS3 Avançado:** Uso de flexbox, css grid, variáveis de layout, @import e transições com aceleração de hardware.
*   **Vanilla JS (ES6 Modules):** Integrações modernas utilizando `import`/`export` nativos de navegadores.
*   **Mocha & Chai:** Bibliotecas estruturantes de asserções de testes.
*   **Google Fonts:** Tipografias premium importadas diretamente.

O projeto não utiliza nenhum build step ou bundler (Webpack, Vite ou Babel) para preservar a simplicidade e a portabilidade imediata dos arquivos.

---

## 🧮 Regras de Negócio e Validação de Cupons

O simulador de preços possui validações rígidas de descontos cumulativos descritas a seguir:

1.  **Desconto de Recorrência (Frequência):**
    *   **Único:** Sem desconto.
    *   **Semanal:** 10% de desconto aplicado diretamente sobre a soma dos serviços básicos selecionados.
    *   **Quinzenal:** 5% de desconto aplicado sobre a soma.
2.  **Cupom `PRIMEIRO10`:**
    *   Fornece **10% de desconto adicional**.
    *   **Condição:** É obrigatório ter selecionado pelo menos o serviço de **Banho** ou de **Tosa** na calculadora. Caso contrário, o cupom é rejeitado ou desativado.
3.  **Cupom `PETLOVE15`:**
    *   Fornece **15% de desconto adicional**.
    *   **Condição:** O subtotal líquido da calculadora (já subtraindo o desconto da frequência escolhida) deve ser igual ou maior que **R$ 150,00**. Caso contrário, o cupom é invalidado.

*Nota:* O motor recalcula todas as condições a cada clique de checkbox ou mudança de pet na tela. Caso alguma ação do usuário viole uma regra com cupom ativo, o cupom é desfeito de imediato, exibindo uma mensagem de aviso em formato Toast e na barra de feedback do cupom.

---

## 🧪 Suíte de Testes de Integração

A aplicação possui uma suíte de testes de integração robusta automatizada rodando no próprio navegador usando um **Sandbox Iframe** da página principal `index.html`. Isso garante que o DOM real seja manipulado e inspecionado durante as asserções.

Os testes de integração cobrem:
*   **🧮 Simulador de Preços:** Validação de totais corretos a partir do pet-type (gato/cão), pet-size (pequeno, médio, grande), serviços individuais e descontos de frequência de agendamentos.
*   **🏷️ Validação de Cupons:** Garante que o cupom `PRIMEIRO10` seja aplicado com sucesso se houver banho/tosa e que `PETLOVE15` respeite o mínimo de R$ 150,00, além de validar os casos de erro e rejeição.
*   **🌙 Chaveamento de Tema:** Testa se clicar no botão de alternância inverte o atributo `data-theme` da tag `<html>`.
*   **🎥 Painel CCTV:** Valida se a seleção de câmeras no painel ativa o background correto no monitor de live feed.
*   **❓ FAQ Accordion:** Garante que abrir uma aba de pergunta colapsa imediatamente quaisquer outras abas abertas da seção FAQ.
*   **📬 Toast Notifications:** Assegura a injeção correta de blocos de notificação na árvore DOM e exibição de mensagens de sucesso/erro.
*   **📋 Fluxo de Agendamento:** Valida a simulação de escrita nos campos de texto (Nome do tutor, Nome do pet, Telefone, Data), disparo de envio e exibição dinâmica do modal de sucesso com dados correspondentes e opções de fechamento/reset.

### Como rodar os testes:
1.  Inicie um servidor estático local na pasta raiz (instruções na seção abaixo).
2.  Acesse o runner no navegador: `http://localhost:8000/tests/index.html`
3.  A suíte executará as asserções instantaneamente no Iframe sandbox da tela.

---

## 🚀 Como Executar e Visualizar Localmente (CORS)

Navegadores modernos impedem o carregamento de JavaScript modular (`type="module"`) diretamente do sistema de arquivos local (`file:///...`) por restrições de segurança de origem (CORS).

Para visualizar o site localmente e rodar a suíte de testes com toda a lógica funcionando, é preciso servir os arquivos por meio de um servidor local simples:

### Opção A: Servidor Rápido Python
Abra o terminal na pasta raiz do projeto e digite:
```bash
python3 -m http.server 8000
```
Em seguida, abra o navegador no endereço: `http://localhost:8000`

### Opção B: Extensão VS Code Live Server
1.  Abra a pasta do projeto no VS Code.
2.  Instale a extensão **Live Server** desenvolvida por Ritwick Dey.
3.  Clique no botão **"Go Live"** na barra azul na base inferior do editor.

### Opção C: Usando Node.js / NPM
Caso você possua Node instalado em sua máquina, pode rodar o utilitário leve de servir:
```bash
npx live-server
```

---

## 🖼️ Galeria Visual

Abaixo, encontre a representação conceitual de navegação e as seções chave da aplicação:

| Seção de Entrada (Hero) | Calculadora & Timeline | Central CCTV de Monitoramento |
| :---: | :---: | :---: |
| Cabeçalho com vidro translúcido, foto de pet em constante morphing fluido e flutuadores dinâmicos. | Painel interativo para seleção de serviços, visualização de cupons, timeline de 3 passos e cálculo ao vivo. | Janela retro com botões interativos simulando monitoramento real dos pets em tratamento. |

<p align="center">
  <img src="https://images.unsplash.com/photo-1543466835-00a7907e9de1?auto=format&fit=crop&w=600&q=80" alt="Preview da marca Patas e Pelos" width="600" style="border-radius: 16px;">
</p>

---

## 🧭 Roadmap de Desenvolvimento

*   [x] Reestruturação da arquitetura para formato DRY e modular.
*   [x] Acoplamento de IntersectionObservers bidirecionais para animações reativas no scroll.
*   [x] Interface do formulário de agendamento integrada com cálculo de desconto e cupons inteligentes.
*   [x] Suíte de testes automatizados executando via Sandbox Iframe (Mocha & Chai).
*   [x] Criação do guia do design system centralizado (`DESIGN.md`).
*   [x] Correção de regras de validações rígidas de cupons e recálculo ativo.
*   [ ] Integração com sistema de envio de e-mails para confirmação de agendamentos.
*   [ ] Desenvolvimento de painel administrativo simplificado para consulta de agendamentos do dia.

---

## 📄 Licença

Este projeto é desenvolvido sob a licença **MIT**. Leia o arquivo `LICENSE` para mais informações.

---

<p align="center">
  Desenvolvido por <a href="https://github.com/BrThiagoN" target="_blank">BrThiagoN</a>
</p>

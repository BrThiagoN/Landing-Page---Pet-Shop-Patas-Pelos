# 🐾 Landing Page - Pet Shop "Patas & Pelos"

Esta é uma landing page moderna, responsiva e de alta performance criada para o pet shop premium **Patas & Pelos**. Ela foi projetada com foco em estética visual sofisticada, micro-animações suaves e elementos altamente interativos.

## 📂 Estrutura de Arquivos

O projeto é 100% autossuficiente e roda diretamente no navegador sem necessidade de servidores locais (basta dar um clique duplo em `index.html`).

- **`index.html`**: Contém a estrutura semântica HTML5 da página, SVGs integrados e referências externas de alta qualidade para imagens do Unsplash e fontes do Google.
- **`styles.css`**: Define o sistema de design visual (variáveis de cores, tipografia, espaçamento, sombras, responsividade e animações dinâmicas).
- **`script.js`**: Implementa a inteligência interativa (calculador de preços dinâmico por tipo e porte do pet, menu móvel responsivo, contadores de estatísticas em tempo real com Intersection Observer e interceptação de formulários com modal de sucesso).

## ✨ Principais Funcionalidades

1. **Simulador Online & Calculadora de Preços**:
   - Atualiza o valor estimado instantaneamente conforme o usuário altera o tipo de animal (🐶 Cão ou 🐱 Gato), o porte (Pequeno, Médio, Grande) e adiciona os serviços.
   - Faz a transição dos valores com animações de contagem no JS.
2. **Contadores de Estatísticas Animados**:
   - Os números da barra de estatísticas começam a contar apenas quando a seção entra na tela do usuário (*IntersectionObserver*).
3. **Menu de Navegação Inteligente**:
   - Menu hambúrguer animado no mobile.
   - Efeito sticky com desfoque de fundo (glassmorphism) ao rolar a página.
   - Destaque ativo dinâmico na navegação conforme o usuário rola pelas seções (*Scrollspy*).
4. **Modal de Sucesso Integrado**:
   - Ao enviar o agendamento simulado, exibe um modal amigável com os dados preenchidos e a instrução dos próximos passos.

## 🎨 Sistema de Design & Cores

* **Tipografia**: *Outfit* para títulos (moderno e amigável) e *Plus Jakarta Sans* para o corpo de texto (legível e limpo).
* **Paleta de Cores**:
  * Fundo Warm Cream: `#FAF8F5` (Sensação aconchegante e limpa)
  * Destaque Indigo/Roxo: `#6366F1` (Tranquilidade e sofisticação)
  * Destaque Rosa: `#EC4899` (Amor e cuidado)
  * Tons de Destaque Âmbar/Dourado: `#F59E0B` (Calor, sol e energia)

## 🚀 Como Visualizar a Landing Page

1. Navegue até a pasta `Documents/petshop` no seu computador.
2. Dê um clique duplo no arquivo `index.html`.
3. A página abrirá no seu navegador padrão carregando todas as imagens e estilos automaticamente!

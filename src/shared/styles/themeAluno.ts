// Colocar aqui toda a parte Visual com tons de estilos verde para o Aluno
// src/shared/styles/themeAluno.ts

export const themeAluno = {
  // Cores principais - Verde
  primary: '#2ecc71',        // Verde principal (botões, headers)
  primaryDark: '#27ae60',    // Verde escuro (para hover/pressionado)
  primaryLight: '#d5f5e3',   // Verde claro (fundos, cards)
  secondary: '#1abc9c',      // Verde azulado (detalhes)
  accent: '#0e6655',         // Verde mais escuro (destaques)

  // Cores de status
  success: '#2ecc71',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',

  // Cores neutras (base)
  background: '#f0faf5',     // Fundo com leve tom verde
  card: '#ffffff',           // Fundo de cards
  text: '#1a2e1a',           // Texto principal (verde escuro)
  textSecondary: '#5a7a5a',  // Texto secundário
  textLight: '#a0c0a0',      // Texto claro
  white: '#ffffff',
  black: '#000000',

  // Bordas e sombras
  border: '#b8d9c0',
  shadow: 'rgba(46, 204, 113, 0.15)',

  // Gradientes (se for usar)
  gradient: ['#2ecc71', '#27ae60'] as const,
};
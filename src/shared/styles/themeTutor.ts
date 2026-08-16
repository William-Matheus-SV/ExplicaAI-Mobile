// Colocar aqui toda a parte Visual com tons de estilos roxo para o Tutor
// src/shared/styles/themeTutor.ts

export const themeTutor = {
  // Cores principais - Roxo
  primary: '#764ba2',        // Roxo principal (Gabriel)
  primaryDark: '#5b3a7a',    // Roxo escuro (para hover/pressionado)
  primaryLight: '#e8d5f5',   // Roxo claro (fundos, cards)
  secondary: '#667eea',      // Roxo azulado (Gabriel)
  accent: '#b57aef',         // Roxo destaque (Gabriel)

  // Cores de status
  success: '#2ecc71',
  warning: '#f39c12',
  error: '#e74c3c',
  info: '#3498db',

  // Cores neutras (base)
  background: '#f7f3fc',     // Fundo com leve tom roxo
  card: '#ffffff',           // Fundo de cards
  text: '#2a1a3a',           // Texto principal (roxo escuro)
  textSecondary: '#7a5a8a',  // Texto secundário
  textLight: '#b8a0c0',      // Texto claro
  white: '#ffffff',
  black: '#000000',

  // Bordas e sombras
  border: '#d5c0e0',
  shadow: 'rgba(118, 75, 162, 0.15)',

  // Gradientes (se for usar)
  gradient: ['#764ba2', '#667eea'] as const,
};
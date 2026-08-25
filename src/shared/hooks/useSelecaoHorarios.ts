import { useState } from 'react';

export type Dia = 'SEG' | 'TER' | 'QUA' | 'QUI' | 'SEX';
export type Duracao = 1 | 2;

export interface SlotHorario {
  dia: Dia;
  horario: string;
  duracao: Duracao;
}

export const DIAS: Dia[] = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];

export const HORARIOS_1H = [
  "08:00 - 09:00",
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
  "16:00 - 17:00",
];

export const HORARIOS_2H = [
  "08:00 - 10:00",
  "09:00 - 11:00",
  "10:00 - 12:00",
  "13:00 - 15:00",
  "14:00 - 16:00",
  "15:00 - 17:00",
];

export function useSelecaoHorarios(horariosIniciais: SlotHorario[] = []) {
  const [horariosSelecionados, setHorariosSelecionados] = useState<SlotHorario[]>(horariosIniciais);
  const [duracaoAtiva, setDuracaoAtiva] = useState<Duracao>(1);

  const horariosGrade = duracaoAtiva === 1 ? HORARIOS_1H : HORARIOS_2H;

  function estaSelecionado(dia: Dia, horario: string) {
    return horariosSelecionados.some(
      (slot) => slot.dia === dia && slot.horario === horario && slot.duracao === duracaoAtiva
    );
  }

  function toggleHorario(dia: Dia, horario: string) {
    const existente = horariosSelecionados.find(
      (slot) => slot.dia === dia && slot.horario === horario && slot.duracao === duracaoAtiva
    );

    if (existente) {
      setHorariosSelecionados(horariosSelecionados.filter((slot) => slot !== existente));
      return;
    }

    setHorariosSelecionados([...horariosSelecionados, { dia, horario, duracao: duracaoAtiva }]);
  }

  return {
    horariosSelecionados,
    setHorariosSelecionados,
    duracaoAtiva,
    setDuracaoAtiva,
    horariosGrade,
    estaSelecionado,
    toggleHorario,
  };
}
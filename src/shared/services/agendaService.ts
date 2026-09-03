import { API_BASE_URL } from "../../config/api";
import { HORARIOS_1H, HORARIOS_2H, Dia, SlotHorario } from "../hooks/useSelecaoHorarios";

export interface SlotAgendaReal {
  _id: string;
  tutorId: string;
  dataHorarioInicio: string;
  duracao: number;
  status: string;
}

export async function listarSlotsDoTutor(tutorId: string): Promise<SlotAgendaReal[]> {
  const resposta = await fetch(`${API_BASE_URL}/api/agenda/tutor/${tutorId}`);
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Erro ao buscar horários do tutor");
  }

  return dados.slots;
}
// Diferente de listarSlotsDoTutor (pública, usa tutorId na URL), essa é a versão
// autenticada: o backend descobre de qual tutor são os slots através do token,
// não de um parâmetro — por isso não recebe tutorId, só o token
export async function listarMeusSlots(token: string): Promise<SlotAgendaReal[]> {
  const resposta = await fetch(`${API_BASE_URL}/api/agenda/minha`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Erro ao buscar sua agenda");
  }

  return dados.slots;
}

// Converte um slot real do backend (data completa) de volta pro formato da grade
// (dia da semana + faixa de horário) — o inverso da função proximaData()
const DIAS_LABEL: Record<number, Dia | null> = {
  0: null, 1: "SEG", 2: "TER", 3: "QUA", 4: "QUI", 5: "SEX", 6: null,
};

export function slotRealParaGrade(slot: SlotAgendaReal): SlotHorario | null {
  const data = new Date(slot.dataHorarioInicio);
  const dia = DIAS_LABEL[data.getDay()];
  if (!dia) return null;

  const horaInicio = data.toTimeString().slice(0, 5); // "08:00"
  const lista = slot.duracao === 1 ? HORARIOS_1H : HORARIOS_2H;
  const horario = lista.find((h) => h.startsWith(horaInicio));
  if (!horario) return null;

  return { dia, horario, duracao: slot.duracao as 1 | 2 };
}

export async function criarSlot(
  dataHorarioInicio: string,
  duracao: number,
  token: string
): Promise<SlotAgendaReal> {
  const resposta = await fetch(`${API_BASE_URL}/api/agenda`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ dataHorarioInicio, duracao }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Erro ao criar horário");
  }

  return dados.slot;
}

// A grade da UI trabalha com "dia da semana" (SEG, TER...), mas o backend
// espera uma data completa (Agenda não tem recorrência — decisão de vocês
// de que a agenda reseta toda semana). Essa função traduz um dos dois pro outro:
// pega o próximo dia real em que aquele "SEG 14:00" vai acontecer.
const DIA_PARA_NUMERO: Record<Dia, number> = {
  SEG: 1,
  TER: 2,
  QUA: 3,
  QUI: 4,
  SEX: 5,
};

export function proximaData(dia: Dia, horaInicio: string): Date {
  const hoje = new Date();
  const diaAlvo = DIA_PARA_NUMERO[dia];
  const [hora, minuto] = horaInicio.split(":").map(Number);

  const resultado = new Date(hoje);
  resultado.setHours(hora, minuto, 0, 0);

  let diferencaDias = diaAlvo - hoje.getDay();
  // Se o dia já passou nessa semana, ou é hoje mas o horário já passou,
  // pula pra próxima semana (soma 7 dias)
  if (diferencaDias < 0 || (diferencaDias === 0 && resultado <= hoje)) {
    diferencaDias += 7;
  }

  resultado.setDate(hoje.getDate() + diferencaDias);
  return resultado;
}
import { API_BASE_URL } from "../../config/api";

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
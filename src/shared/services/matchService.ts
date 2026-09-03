import { API_BASE_URL } from "../../config/api";

export interface MatchCriado {
  id: string;
  alunoId: string;
  tutorId: string;
  agendaSlotId: string;
  dataHoraAgendada: string;
  status: string;
}

export async function criarMatch(
  tutorId: string,
  agendaSlotId: string,
  token: string
): Promise<MatchCriado> {
  const resposta = await fetch(`${API_BASE_URL}/api/matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tutorId, agendaSlotId }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Erro ao agendar a tutoria");
  }

  return dados.match;
}
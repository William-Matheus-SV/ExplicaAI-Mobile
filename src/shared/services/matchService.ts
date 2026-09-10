import { API_BASE_URL } from "../../config/api";

export interface MatchSemana {
  _id: string;
  alunoId: string;
  tutorId: { _id: string; nome: string };
  agendaSlotId: { _id: string; duracao: number };
  materia: string;
  dataHoraAgendada: string;
  status: "confirmado" | "realizado" | "cancelado";
}

export async function listarSemanaDoAluno(token: string): Promise<MatchSemana[]> {
  const resposta = await fetch(`${API_BASE_URL}/api/matches/meus/semana`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.error || dados.message || "Erro ao buscar sua agenda");
  }

  return dados.matches;
}

export interface MatchCriado {
  id: string;
  alunoId: string;
  tutorId: string;
  agendaSlotId: string;
  materia: string;
  dataHoraAgendada: string;
  status: string;
}

export async function criarMatch(
  tutorId: string,
  agendaSlotId: string,
  materia: string,
  token: string
): Promise<MatchCriado> {
  const resposta = await fetch(`${API_BASE_URL}/api/matches`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ tutorId, agendaSlotId, materia }),
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Erro ao agendar a tutoria");
  }

  return dados.match;
}
export async function buscarProximasAulas(token: string) {
  const resposta = await fetch(`${API_BASE_URL}/api/matches/meus/proximos`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || dados.mensagem || "Erro ao buscar próximas aulas");
  }

  return dados;
}
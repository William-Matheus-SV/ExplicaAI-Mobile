import { API_BASE_URL } from "../../config/api";

interface RespostaLoginAluno {
  message: string;
  token: string;
  usuario: { id: string; nome: string };
}

interface RespostaLoginTutor {
  message: string;
  token: string;
  tutor: { id: string; nome: string };
}

export async function loginAluno(matricula: string, senha: string) {
  const resposta = await fetch(`${API_BASE_URL}/api/auth/login/aluno`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matricula, senha }),
  });

  const dados: RespostaLoginAluno = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Matrícula ou senha inválidos");
  }

  return {
    token: dados.token,
    usuario: {
      tipo: 'aluno' as const,
      nome: dados.usuario.nome,
      matricula, // usa o que a pessoa digitou, já que a API não devolve
      idade: "",
      bio: "",
      materiasDificuldade: [],
    },
  };
}

export async function loginTutor(matricula: string, senha: string) {
  const resposta = await fetch(`${API_BASE_URL}/api/auth/login/tutor`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ matricula, senha }),
  });

  const dados: RespostaLoginTutor = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.message || "Matrícula ou senha inválidos");
  }

  return {
    token: dados.token,
    usuario: {
      tipo: 'tutor' as const,
      nome: dados.tutor.nome,
      matricula,
      idade: "",
      bio: "",
      materiasLecionadas: [],
      horariosDisponiveis: [],
    },
  };
}
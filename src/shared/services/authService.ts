import { API_BASE_URL } from "../../config/api";

interface RespostaLoginAluno {
  message: string;
  token: string;
  usuario: { 
    id: string; 
    nome: string;
    matricula: string;
    idade: number;
    bio: string;
    materias: string[];
  };
}

interface RespostaLoginTutor {
  message: string;
  token: string;
  tutor: { 
    id: string; 
    nome: string;
    matricula: string;
    idade: number;
    bio: string;
    materiasLecionadas: string[];
    agendaDisponivel: any[];
  };
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
      id: dados.usuario.id,
      nome: dados.usuario.nome,
      matricula: dados.usuario.matricula,
      idade: dados.usuario.idade,
      bio: dados.usuario.bio,
      materias: dados.usuario.materias || [],
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
      id: dados.tutor.id,
      nome: dados.tutor.nome,
      matricula: dados.tutor.matricula,
      idade: dados.tutor.idade,
      bio: dados.tutor.bio,
      materiasLecionadas: dados.tutor.materiasLecionadas || [],
      agendaDisponivel: dados.tutor.agendaDisponivel || [],
    },
  };
}
import { API_BASE_URL } from "../../config/api";

interface DadosCadastroAluno {
  nome: string;
  matricula: string;
  idade: string;
  bio: string;
  materias: string[];
  senha: string;
}

interface DadosCadastroTutor {
  nome: string;
  matricula: string;
  idade: string;
  bio: string;
  materiasLecionadas: string[];
  agendaDisponivel: any[];
  senha: string;
}

export async function cadastrarAluno(dados: DadosCadastroAluno) {
  const resposta = await fetch(`${API_BASE_URL}/api/usuarios`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...dados,
      idade: parseInt(dados.idade) || null,
      materias: dados.materias || [],
      bio: dados.bio || ""
    }),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(resultado.erro || resultado.mensagem || "Erro ao cadastrar aluno");
  }

  return resultado;
}

export async function cadastrarTutor(dados: DadosCadastroTutor) {
  const resposta = await fetch(`${API_BASE_URL}/api/tutores/cadastro`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...dados,
      idade: parseInt(dados.idade) || null,
      materiasLecionadas: dados.materiasLecionadas || [],
      agendaDisponivel: dados.agendaDisponivel || []
    }),
  });

  const resultado = await resposta.json();

  if (!resposta.ok) {
    throw new Error(resultado.erro || resultado.mensagem || "Erro ao cadastrar tutor");
  }

  return resultado;
}
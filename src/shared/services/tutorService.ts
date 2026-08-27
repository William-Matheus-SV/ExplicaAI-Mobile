import { API_BASE_URL } from "../../config/api";

export async function buscarTutorPorMatricula(matricula: string) {
  const resposta = await fetch(`${API_BASE_URL}/api/tutores/${matricula}`);
  const dados = await resposta.json();

  if (!resposta.ok) {
    throw new Error(dados.mensagem || "Erro ao buscar dados do tutor");
  }

  return dados;
}
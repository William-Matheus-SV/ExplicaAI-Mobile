import { API_BASE_URL } from "../../config/api"

console.log("AVALIACAO SERVICE CARREGADO")

export async function buscarMinhasAvaliacoes(token: string) {
    const resposta = await fetch(`${API_BASE_URL}/api/avaliacoes/minhas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(dados.mensagem || "Erro ao buscar avaliações")
    }

    return dados
}
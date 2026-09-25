import { API_BASE_URL } from "../../config/api"

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
<<<<<<< HEAD
=======
}

export async function buscarAvaliacoesPendentes(token: string) {
    const resposta = await fetch(`${API_BASE_URL}/api/avaliacoes/pendentes`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Erro ao buscar avaliações pendentes")
    }

    return dados
}

export async function buscarAvaliacoesEnviadas(token: string) {
    const resposta = await fetch(`${API_BASE_URL}/api/avaliacoes/enviadas`, {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    })
    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Erro ao buscar avaliações enviadas")
    }

    return dados
}

export async function enviarAvaliacao(token: string, matchId: string, nota: number, comentario: string) {
    const resposta = await fetch(`${API_BASE_URL}/api/avaliacoes`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ matchId, nota, comentario }),
    })
    const dados = await resposta.json()

    if (!resposta.ok) {
        throw new Error(dados.mensagem || dados.message || "Erro ao enviar avaliação")
    }

    return dados
>>>>>>> d535f3287a52031a54be87c202037e04aa027ae0
}
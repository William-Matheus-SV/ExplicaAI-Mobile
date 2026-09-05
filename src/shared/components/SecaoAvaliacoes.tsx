import { useState } from "react"
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native"

interface SecaoAvaliacoesProps {
    theme: any
}

export default function SecaoAvaliacoes({ theme }: SecaoAvaliacoesProps) {
    const [abaAtiva, setAbaAtiva] = useState<"pendentes" | "avaliadas">("pendentes")

    // TODO: substituir por dados reais da API quando as rotas forem definidas
    const pendentes: { id: string; nome: string; materia: string; data: string; hora: string; fotoUrl: string }[] = []

    const avaliadas: { id: string; nome: string; materia: string; nota: number; dataAvaliacao: string; fotoUrl: string }[] = []

    const [itemParaAvaliar, setItemParaAvaliar] = useState<typeof pendentes[0] | null>(null)
    const [notaEscolhida, setNotaEscolhida] = useState(0)
    const [observacao, setObservacao] = useState("")

    return (
        <View style={styles.card}>
            <View style={styles.abasContainer}>
                <Pressable
                    style={[styles.aba, abaAtiva === "pendentes" && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
                    onPress={() => setAbaAtiva("pendentes")}
                >
                    <Text style={styles.abaIcone}>📋</Text>
                    <Text style={[styles.abaTexto, abaAtiva === "pendentes" && { color: theme.primary, fontWeight: "bold" }]}>
                        Pendentes
                    </Text>
                    {pendentes.length > 0 && (
                        <View style={styles.badgeContagem}>
                            <Text style={styles.badgeContagemTexto}>{pendentes.length}</Text>
                        </View>
                    )}
                </Pressable>

                <Pressable
                    style={[styles.aba, abaAtiva === "avaliadas" && { borderBottomColor: theme.primary, borderBottomWidth: 2 }]}
                    onPress={() => setAbaAtiva("avaliadas")}
                >
                    <Text style={styles.abaIcone}>⭐</Text>
                    <Text style={[styles.abaTexto, abaAtiva === "avaliadas" && { color: theme.primary, fontWeight: "bold" }]}>
                        Minhas Avaliações
                    </Text>
                </Pressable>
            </View>

            {abaAtiva === "pendentes" ? (
                <View style={styles.lista}>
                    {pendentes.length === 0 ? (
                        <View style={styles.vazioContainer}>
                            <Text style={styles.vazioIcone}>📋</Text>
                            <Text style={styles.vazioTexto}>Não há avaliações pendentes</Text>
                        </View>
                    ) : (
                        pendentes.map((item) => (
                            <View key={item.id} style={styles.itemPendente}>
                                <Image source={{ uri: item.fotoUrl }} style={styles.foto} />
                                <View style={styles.infoItem}>
                                    <Text style={styles.nomeItem}>{item.nome}</Text>
                                    <Text style={styles.materiaItem}>{item.materia}</Text>
                                    <Text style={styles.dataItem}>🗓️ Aula em {item.data} às {item.hora}</Text>
                                </View>
                                <Pressable
                                    style={[styles.botaoAvaliar, { backgroundColor: theme.primary }]}
                                    onPress={() => {
                                        setItemParaAvaliar(item)
                                        setNotaEscolhida(0)
                                        setObservacao("")
                                    }}
                                >
                                    <Text style={styles.botaoAvaliarTexto}>Avaliar agora</Text>
                                </Pressable>
                            </View>
                        ))
                    )}
                </View>
            ) : (
                <View style={styles.lista}>
                    {avaliadas.length === 0 ? (
                        <View style={styles.vazioContainer}>
                            <Text style={styles.vazioIcone}>⭐</Text>
                            <Text style={styles.vazioTexto}>Você ainda não avaliou nenhum tutor</Text>
                        </View>
                    ) : (
                        avaliadas.map((item) => (
                            <View key={item.id} style={styles.itemAvaliado}>
                                <Image source={{ uri: item.fotoUrl }} style={styles.foto} />
                                <View style={styles.infoItem}>
                                    <Text style={styles.nomeItem}>{item.nome}</Text>
                                    <Text style={styles.materiaItem}>{item.materia}</Text>
                                    <Text style={styles.notaItem}>
                                        {"⭐".repeat(item.nota)} {item.nota.toFixed(1)}
                                    </Text>
                                    <Text style={styles.dataItem}>Avaliado em {item.dataAvaliacao}</Text>
                                </View>
                            </View>
                        ))
                    )}
                </View>
            )}

            <Modal
                visible={itemParaAvaliar !== null}
                transparent
                animationType="fade"
                onRequestClose={() => setItemParaAvaliar(null)}
            >
                <Pressable style={styles.modalFundo} onPress={() => setItemParaAvaliar(null)}>
                    <Pressable style={styles.modalConteudo} onPress={(e) => e.stopPropagation()}>
                        {itemParaAvaliar && (
                            <>
                                <Image source={{ uri: itemParaAvaliar.fotoUrl }} style={styles.modalFoto} />
                                <Text style={styles.modalNome}>{itemParaAvaliar.nome}</Text>
                                <Text style={styles.modalMateria}>{itemParaAvaliar.materia}</Text>

                                <Text style={styles.modalPergunta}>Como foi sua experiência?</Text>

                                <View style={styles.estrelasContainer}>
                                    {[1, 2, 3, 4, 5].map((numero) => (
                                        <Pressable key={numero} onPress={() => setNotaEscolhida(numero)}>
                                            <Text style={styles.estrela}>
                                                {numero <= notaEscolhida ? "⭐" : "☆"}
                                            </Text>
                                        </Pressable>
                                    ))}
                                </View>

                                <TextInput
                                    style={styles.campoObservacao}
                                    placeholder="Deixe uma observação (opcional)"
                                    value={observacao}
                                    onChangeText={setObservacao}
                                    multiline
                                    numberOfLines={3}
                                    textAlignVertical="top"
                                />

                                <Pressable
                                    style={[
                                        styles.botaoEnviar,
                                        { backgroundColor: notaEscolhida > 0 ? theme.primary : "#CCC" },
                                    ]}
                                    disabled={notaEscolhida === 0}
                                    onPress={() => {
                                        console.log("Avaliação enviada:", itemParaAvaliar.nome, notaEscolhida, observacao)
                                        setItemParaAvaliar(null)
                                    }}
                                >
                                    <Text style={styles.botaoEnviarTexto}>Enviar avaliação</Text>
                                </Pressable>
                            </>
                        )}
                    </Pressable>
                </Pressable>
            </Modal>
        </View>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 16,
        overflow: "hidden",
    },
    abasContainer: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    aba: {
        flex: 1,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        gap: 6,
        paddingVertical: 14,
    },
    abaIcone: {
        fontSize: 14,
    },
    abaTexto: {
        fontSize: 13,
        color: "#666",
    },
    badgeContagem: {
        backgroundColor: "#E53935",
        borderRadius: 10,
        width: 18,
        height: 18,
        justifyContent: "center",
        alignItems: "center",
        marginLeft: 2,
    },
    badgeContagemTexto: {
        color: "white",
        fontSize: 10,
        fontWeight: "bold",
    },
    lista: {
        padding: 16,
        gap: 12,
    },
    vazioContainer: {
        alignItems: "center",
        paddingVertical: 24,
        gap: 8,
    },
    vazioIcone: {
        fontSize: 32,
        opacity: 0.4,
    },
    vazioTexto: {
        fontSize: 13,
        color: "#999",
        textAlign: "center",
    },
    itemPendente: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
        flexWrap: "wrap",
    },
    itemAvaliado: {
        flexDirection: "row",
        gap: 10,
    },
    foto: {
        width: 44,
        height: 44,
        borderRadius: 22,
    },
    infoItem: {
        flex: 1,
        gap: 2,
        minWidth: 140,
    },
    nomeItem: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    materiaItem: {
        fontSize: 12,
        color: "#666",
    },
    dataItem: {
        fontSize: 11,
        color: "#999",
    },
    notaItem: {
        fontSize: 12,
        color: "#F5A623",
    },
    botaoAvaliar: {
        borderRadius: 8,
        paddingVertical: 8,
        paddingHorizontal: 14,
    },
    botaoAvaliarTexto: {
        color: "white",
        fontWeight: "bold",
        fontSize: 12,
    },
    modalFundo: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalConteudo: {
        width: "85%",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 24,
        alignItems: "center",
    },
    modalFoto: {
        width: 64,
        height: 64,
        borderRadius: 32,
        marginBottom: 8,
    },
    modalNome: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    modalMateria: {
        fontSize: 13,
        color: "#666",
        marginBottom: 16,
    },
    modalPergunta: {
        fontSize: 14,
        fontWeight: "600",
        color: "#1A1A1A",
        marginBottom: 12,
    },
    estrelasContainer: {
        flexDirection: "row",
        gap: 6,
        marginBottom: 16,
    },
    estrela: {
        fontSize: 32,
    },
    campoObservacao: {
        width: "100%",
        borderWidth: 1,
        borderColor: "#DDD",
        borderRadius: 10,
        padding: 12,
        fontSize: 13,
        minHeight: 70,
        marginBottom: 16,
    },
    botaoEnviar: {
        width: "100%",
        borderRadius: 10,
        paddingVertical: 12,
        alignItems: "center",
    },
    botaoEnviarTexto: {
        color: "white",
        fontWeight: "bold",
        fontSize: 14,
    },
})
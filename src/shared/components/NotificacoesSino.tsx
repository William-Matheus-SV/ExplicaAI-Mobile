import { useEffect, useState } from "react"
import { Ionicons } from "@expo/vector-icons"
import { Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native"
import { useUsuario } from "../contexts/UsuarioContext"
import { buscarProximasAulas } from "../services/matchService"

interface NotificacoesSinoProps {
    theme: any
}

export default function NotificacoesSino({ theme }: NotificacoesSinoProps) {
    const { token } = useUsuario()
    const [modalAberto, setModalAberto] = useState(false)
    const [aulas, setAulas] = useState<any[]>([])

    useEffect(() => {
        if (!token) return

        buscarProximasAulas(token)
            .then((dados) => setAulas(dados.matches ?? []))
            .catch((erro) => console.log("Erro ao buscar notificações:", erro.message))
    }, [token])

    return (
        <>
            <Pressable style={styles.sinoContainer} onPress={() => setModalAberto(true)}>
                <Ionicons name="notifications-outline" size={22} color="white" />
                {aulas.length > 0 && (
                    <View style={styles.badge}>
                        <Text style={styles.badgeTexto}>{aulas.length}</Text>
                    </View>
                )}
            </Pressable>

            <Modal
                visible={modalAberto}
                transparent
                animationType="fade"
                onRequestClose={() => setModalAberto(false)}
            >
                <Pressable style={styles.modalFundo} onPress={() => setModalAberto(false)}>
                    <Pressable style={styles.modalConteudo} onPress={(e) => e.stopPropagation()}>
                        <Text style={styles.modalTitulo}>Próximas Aulas</Text>

                        <ScrollView style={{ maxHeight: 300 }}>
                            {aulas.length === 0 ? (
                                <Text style={styles.vazioTexto}>Nenhuma aula agendada.</Text>
                            ) : (
                                aulas.map((aula, index) => {
                                    const dataHora = new Date(aula.dataHoraAgendada)
                                    const dataFormatada = dataHora.toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })
                                    const horaFormatada = dataHora.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })

                                    return (
                                        <View key={aula._id ?? index} style={styles.itemAula}>
                                            <Text style={styles.itemMateria}>{aula.materia ?? "Matéria"}</Text>
                                            <Text style={styles.itemPessoa}>com {aula.tutorId?.nome ?? "Tutor"}</Text>
                                            <Text style={styles.itemData}>{dataFormatada} às {horaFormatada}</Text>
                                        </View>
                                    )
                                })
                            )}
                        </ScrollView>

                        <Pressable
                            style={[styles.botaoFechar, { backgroundColor: theme.primary }]}
                            onPress={() => setModalAberto(false)}
                        >
                            <Text style={styles.botaoFecharTexto}>Fechar</Text>
                        </Pressable>
                    </Pressable>
                </Pressable>
            </Modal>
        </>
    )
}

const styles = StyleSheet.create({
    sinoContainer: {
        position: "relative",
    },
    badge: {
        position: "absolute",
        top: -4,
        right: -4,
        backgroundColor: "#E53935",
        borderRadius: 8,
        minWidth: 16,
        height: 16,
        justifyContent: "center",
        alignItems: "center",
        paddingHorizontal: 3,
    },
    badgeTexto: {
        color: "white",
        fontSize: 9,
        fontWeight: "bold",
    },
    modalFundo: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalConteudo: {
        width: "85%",
        maxHeight: "70%",
        backgroundColor: "white",
        borderRadius: 16,
        padding: 20,
    },
    modalTitulo: {
        fontSize: 16,
        fontWeight: "bold",
        color: "#1A1A1A",
        marginBottom: 12,
    },
    vazioTexto: {
        fontSize: 13,
        color: "#999",
        textAlign: "center",
        paddingVertical: 16,
    },
    itemAula: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: "#EEE",
    },
    itemMateria: {
        fontSize: 14,
        fontWeight: "bold",
        color: "#1A1A1A",
    },
    itemPessoa: {
        fontSize: 12,
        color: "#666",
    },
    itemData: {
        fontSize: 12,
        color: "#999",
        marginTop: 2,
    },
    botaoFechar: {
        marginTop: 16,
        borderRadius: 10,
        paddingVertical: 10,
        alignItems: "center",
    },
    botaoFecharTexto: {
        color: "white",
        fontWeight: "bold",
    },
})
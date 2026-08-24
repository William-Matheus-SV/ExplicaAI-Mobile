import { useState } from "react"
import { Image, Pressable, StyleSheet, Text, View } from "react-native"

interface SecaoAvaliacoesProps {
    theme: any
}

export default function SecaoAvaliacoes({ theme }: SecaoAvaliacoesProps) {
    const [abaAtiva, setAbaAtiva] = useState<"pendentes" | "avaliadas">("pendentes")

    const pendentes = [
        { id: "1", nome: "João Silva", materia: "Matemática", data: "20/05/2024", hora: "14:00", fotoUrl: "https://i.pravatar.cc/150?img=12" },
        { id: "2", nome: "Maria Oliveira", materia: "Física", data: "18/05/2024", hora: "10:00", fotoUrl: "https://i.pravatar.cc/150?img=5" },
    ]

    const avaliadas = [
        { id: "3", nome: "Lucas Santos", materia: "Química", nota: 5, dataAvaliacao: "15/05/2024", fotoUrl: "https://i.pravatar.cc/150?img=13" },
        { id: "4", nome: "Ana Costa", materia: "Português", nota: 4, dataAvaliacao: "10/05/2024", fotoUrl: "https://i.pravatar.cc/150?img=20" },
        { id: "5", nome: "Rafael Lima", materia: "Programação", nota: 5, dataAvaliacao: "05/05/2024", fotoUrl: "https://i.pravatar.cc/150?img=15" },
    ]

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
                    {pendentes.map((item) => (
                        <View key={item.id} style={styles.itemPendente}>
                            <Image source={{ uri: item.fotoUrl }} style={styles.foto} />
                            <View style={styles.infoItem}>
                                <Text style={styles.nomeItem}>{item.nome}</Text>
                                <Text style={styles.materiaItem}>{item.materia}</Text>
                                <Text style={styles.dataItem}>🗓️ Aula em {item.data} às {item.hora}</Text>
                            </View>
                            <Pressable style={[styles.botaoAvaliar, { backgroundColor: theme.primary }]}>
                                <Text style={styles.botaoAvaliarTexto}>Avaliar agora</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            ) : (
                <View style={styles.lista}>
                    {avaliadas.map((item) => (
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
                    ))}
                </View>
            )}
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
})
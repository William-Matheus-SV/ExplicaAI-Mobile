import { router, usePathname } from "expo-router"
import { Pressable, StyleSheet, Text, View } from "react-native"

interface BottomNavBarProps {
    theme: any
    perfil: "aluno" | "tutor"
}

export default function BottomNavBar({ theme, perfil }: BottomNavBarProps) {
    const pathname = usePathname()

    const itens = [
        { label: "Buscar", icone: "🔍", rota: `/busca-${perfil}` },
        { label: "Agenda", icone: "📅", rota: `/agenda-${perfil}` },
        { label: "Perfil", icone: "👤", rota: `/perfil-${perfil}` },
    ]

    return (
        <View style={styles.container}>
            {itens.map((item) => {
                const ativo = pathname === item.rota

                return (
                    <Pressable
                        key={item.label}
                        style={styles.item}
                        onPress={() => router.push(item.rota as any)}
                    >
                        <Text style={styles.icone}>{item.icone}</Text>
                        <Text style={[styles.label, ativo && { color: theme.primary, fontWeight: "bold" }]}>
                            {item.label}
                        </Text>
                    </Pressable>
                )
            })}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        backgroundColor: "white",
        borderTopWidth: 1,
        borderTopColor: "#EEE",
        paddingVertical: 8,
        paddingBottom: 20,
    },
    item: {
        flex: 1,
        alignItems: "center",
        gap: 2,
    },
    icone: {
        fontSize: 20,
    },
    label: {
        fontSize: 12,
        color: "#999",
    },
})
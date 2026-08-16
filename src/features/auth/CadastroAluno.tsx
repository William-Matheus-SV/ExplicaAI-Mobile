import { LinearGradient } from "expo-linear-gradient"
import { router } from "expo-router"
import { useState } from "react"
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native"
import { Input } from "../../shared/components/Input"
import { colors } from "../../shared/styles/colors"

export default function CadastroAluno() {
    const [nome, setNome] = useState("")
    const [idade, setIdade] = useState("")
    const [matricula, setMatricula] = useState("")
    const [bio, setBio] = useState("")
    const [senha, setSenha] = useState("")
    const [confirmarSenha, setConfirmarSenha] = useState("")
    const [erroSenha, setErroSenha] = useState("")

    const materias = [
        "Matemática", "Português", "História", "Geografia",
        "Ciências", "Física", "Química", "Biologia",
        "Inglês", "Educação Física", "Artes", "Filosofia",
    ]
    const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>([])

    function toggleMateria(materia: string) {
        if (materiasSelecionadas.includes(materia)) {
            setMateriasSelecionadas(materiasSelecionadas.filter((item) => item !== materia))
        } else {
            setMateriasSelecionadas([...materiasSelecionadas, materia])
        }
    }

    function handleCadastro() {
        setErroSenha("")

        if (!nome.trim() || !idade.trim() || !matricula.trim()) {
            Alert.alert("Atenção", "Preencha todos os campos obrigatórios.")
            return
        }

        if (senha !== confirmarSenha) {
            setErroSenha("As senhas não coincidem")
            return
        }

        if (senha.length < 6) {
            setErroSenha("A senha deve ter no mínimo 6 caracteres")
            return
        }

        console.log("Cadastro válido:", { nome, idade, matricula, senha, bio, materiasSelecionadas })
    }

    function handleLimpar() {
        setNome("")
        setIdade("")
        setMatricula("")
        setSenha("")
        setConfirmarSenha("")
        setBio("")
        setMateriasSelecionadas([])
        setErroSenha("")
    }

    return (
        <View style={styles.tela}>
            <LinearGradient
                colors={["#7C6FE0", "#5B4BC4"]}
                style={styles.cabecalho}
            >
                <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
                    <Text style={styles.iconeVoltar}>←</Text>
                </Pressable>

                <Image
                    source={require("../../../assets/logo.png")}
                    style={styles.logoCabecalho}
                />
                <Text style={styles.tituloCabecalho}>Cadastro de Aluno</Text>
                <Text style={styles.subtituloCabecalho}>
                    Preencha os dados abaixo para registrar um novo aluno
                </Text>
            </LinearGradient>

            <ScrollView contentContainerStyle={styles.conteudo}>
                <View style={styles.card}>
                    <View style={styles.cabecalhoCard}>
                        <View style={styles.iconeSecao}>
                            <Text>👤</Text>
                        </View>
                        <Text style={styles.tituloSecao}>Informações Pessoais</Text>
                    </View>

                    <View style={styles.campo}>
                        <Text style={styles.label}>Nome Completo *</Text>
                        <Input
                            placeholder="Digite o nome completo do aluno"
                            value={nome}
                            onChangeText={setNome}
                            style={styles.inputEstilizado}
                        />
                    </View>

                    <View style={styles.linha}>
                        <View style={styles.metade}>
                            <Text style={styles.label}>Idade *</Text>
                            <Input
                                placeholder="Digite a idade"
                                value={idade}
                                onChangeText={setIdade}
                                keyboardType="numeric"
                                style={styles.inputEstilizado}
                            />
                        </View>

                        <View style={styles.metade}>
                            <Text style={styles.label}>Matrícula *</Text>
                            <Input
                                placeholder="Ex: aluno_demo"
                                value={matricula}
                                onChangeText={setMatricula}
                                style={styles.inputEstilizado}
                            />
                        </View>
                    </View>

                    <View style={styles.linha}>
                        <View style={styles.metade}>
                            <Text style={styles.label}>Senha *</Text>
                            <Input
                                placeholder="Digite a senha"
                                value={senha}
                                onChangeText={setSenha}
                                secureTextEntry
                                style={styles.inputEstilizado}
                            />
                        </View>

                        <View style={styles.metade}>
                            <Text style={styles.label}>Confirmar Senha *</Text>
                            <Input
                                placeholder="Confirme sua senha"
                                value={confirmarSenha}
                                onChangeText={setConfirmarSenha}
                                secureTextEntry
                                style={styles.inputEstilizado}
                            />
                        </View>
                    </View>
                    {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
                </View>

                <View style={styles.card}>
                    <View style={styles.cabecalhoCard}>
                        <View style={styles.iconeSecao}>
                            <Text>✏️</Text>
                        </View>
                        <Text style={styles.tituloSecao}>Bio / Descrição</Text>
                    </View>

                    <TextInput
                        style={styles.textArea}
                        placeholder="Fale um pouco sobre você..."
                        value={bio}
                        onChangeText={setBio}
                        multiline
                        numberOfLines={4}
                        textAlignVertical="top"
                    />
                </View>

                <View style={styles.card}>
                    <View style={styles.cabecalhoCard}>
                        <View style={styles.iconeSecao}>
                            <Text>📖</Text>
                        </View>
                        <Text style={styles.tituloSecao}>Matérias com Dificuldade</Text>
                    </View>
                    <Text style={styles.subLabel}>Selecione as matérias em que o aluno possui dificuldade</Text>

                    <View style={styles.gradeCheckbox}>
                        {materias.map((materia) => {
                            const selecionada = materiasSelecionadas.includes(materia)
                            return (
                                <Pressable
                                    key={materia}
                                    style={styles.checkboxItem}
                                    onPress={() => toggleMateria(materia)}
                                >
                                    <View style={[styles.checkbox, selecionada && styles.checkboxMarcado]} />
                                    <Text style={styles.checkboxLabel}>{materia}</Text>
                                </Pressable>
                            )
                        })}
                    </View>
                </View>

                <View style={styles.linhaBotoes}>
                    <Pressable style={styles.botaoSecundario} onPress={handleLimpar}>
                        <Text style={styles.textoBotaoSecundario}>Limpar</Text>
                    </Pressable>

                    <Pressable style={styles.botaoPrimario} onPress={handleCadastro}>
                        <Text style={styles.textoBotaoPrimario}>Cadastrar Aluno</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    tela: {
        flex: 1,
        backgroundColor: colors.background,
    },
    cabecalho: {
        paddingTop: 48,
        paddingBottom: 32,
        paddingHorizontal: 24,
        alignItems: "center",
        borderBottomLeftRadius: 24,
        borderBottomRightRadius: 24,
    },
    botaoVoltar: {
        position: "absolute",
        top: 48,
        left: 24,
        width: 36,
        height: 36,
        borderRadius: 18,
        backgroundColor: "rgba(255,255,255,0.25)",
        justifyContent: "center",
        alignItems: "center",
    },
    iconeVoltar: {
        color: colors.white,
        fontSize: 18,
    },
    logoCabecalho: {
        width: 48,
        height: 48,
        resizeMode: "contain",
        marginBottom: 8,
    },
    tituloCabecalho: {
        color: colors.white,
        fontSize: 22,
        fontWeight: "bold",
    },
    subtituloCabecalho: {
        color: "rgba(255,255,255,0.85)",
        fontSize: 13,
        textAlign: "center",
        marginTop: 4,
    },
    conteudo: {
        padding: 16,
        gap: 16,
        paddingBottom: 32,
    },
    card: {
        backgroundColor: colors.white,
        borderRadius: 16,
        padding: 16,
        gap: 12,
    },
    cabecalhoCard: {
        flexDirection: "row",
        alignItems: "center",
        gap: 10,
    },
    iconeSecao: {
        width: 32,
        height: 32,
        borderRadius: 8,
        backgroundColor: colors.primary,
        justifyContent: "center",
        alignItems: "center",
    },
    tituloSecao: {
        fontSize: 16,
        fontWeight: "bold",
        color: colors.text,
    },
    campo: {
        gap: 4,
    },
    label: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.text,
    },
    inputEstilizado: {
        borderColor: "#E0DCF0",
        backgroundColor: colors.white,
    },
    linha: {
        flexDirection: "row",
        gap: 12,
    },
    metade: {
        flex: 1,
        gap: 4,
    },
    erro: {
        color: colors.error,
        fontSize: 12,
        marginTop: -4,
    },
    textArea: {
        borderWidth: 1,
        borderColor: "#E0DCF0",
        borderRadius: 8,
        padding: 12,
        fontSize: 16,
        minHeight: 100,
    },
    subLabel: {
        fontSize: 12,
        color: colors.textSecondary,
        marginTop: -4,
    },
    gradeCheckbox: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 12,
    },
    checkboxItem: {
        flexDirection: "row",
        alignItems: "center",
        width: "45%",
        gap: 8,
    },
    checkbox: {
        width: 18,
        height: 18,
        borderWidth: 1,
        borderColor: "#999",
        borderRadius: 4,
    },
    checkboxMarcado: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    checkboxLabel: {
        fontSize: 14,
    },
    linhaBotoes: {
        flexDirection: "row",
        gap: 12,
    },
    botaoSecundario: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    textoBotaoSecundario: {
        color: colors.text,
        fontWeight: "600",
    },
    botaoPrimario: {
        flex: 2,
        backgroundColor: colors.primary,
        borderRadius: 8,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    textoBotaoPrimario: {
        color: colors.white,
        fontWeight: "bold",
    },
})
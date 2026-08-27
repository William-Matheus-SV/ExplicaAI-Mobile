import { router } from "expo-router";
import { useState } from "react";
import { ActivityIndicator, Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../shared/styles/colors";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import { loginAluno, loginTutor } from "../../shared/services/authService";
import { buscarTutorPorMatricula } from "../../shared/services/tutorService";
import { buscarUsuarioPorMatricula } from "../../shared/services/usuarioService";

export default function Login() {
    const { salvarUsuario } = useUsuario();

    const [tipoSelecionado, setTipoSelecionado] = useState<'aluno' | 'tutor'>('aluno');
    const [matricula, setMatricula] = useState("");
    const [senha, setSenha] = useState("");
    const [erroMatricula, setErroMatricula] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [erroGeral, setErroGeral] = useState("");
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);

    async function handleLogin() {
        setErroMatricula("");
        setErroSenha("");
        setErroGeral("");

        let temErro = false;

        if (!matricula.trim()) {
            setErroMatricula("Matrícula é obrigatória");
            temErro = true;
        }

        if (!senha) {
            setErroSenha("Senha é obrigatória");
            temErro = true;
        }

        if (temErro) return;

        setCarregando(true);

        try {
            const resposta = tipoSelecionado === 'aluno'
                ? await loginAluno(matricula, senha)
                : await loginTutor(matricula, senha);

            if (tipoSelecionado === 'tutor') {
                const tutorCompleto = await buscarTutorPorMatricula(matricula);
                salvarUsuario({
                    tipo: 'tutor',
                    nome: tutorCompleto.nome,
                    idade: String(tutorCompleto.idade),
                    matricula: tutorCompleto.matricula,
                    bio: tutorCompleto.bio || "",
                    materiasLecionadas: tutorCompleto.materiasLecionadas || [],
                    agendaDisponivel: tutorCompleto.agendaDisponivel || [],
                }, resposta.token);
            } else {
                const usuarioCompleto = await buscarUsuarioPorMatricula(matricula);
                salvarUsuario({
                    tipo: 'aluno',
                    nome: usuarioCompleto.nome,
                    idade: String(usuarioCompleto.idade),
                    matricula: usuarioCompleto.matricula,
                    bio: usuarioCompleto.bio || "",
                    materias: usuarioCompleto.materias || [],
                }, resposta.token);
            }

            router.replace(tipoSelecionado === 'aluno' ? "/perfil-aluno" : "/perfil-tutor");
        } catch (erro: any) {
            setErroGeral(erro.message || "Matrícula ou senha inválidos. Tente novamente.");
        } finally {
            setCarregando(false);
        }
    }

    return (
        <ImageBackground
            source={require("../../../assets/Biblioteca.jpg")}
            style={styles.fundo}
            imageStyle={styles.imagemFundo}
            resizeMode="cover"
        >
            <View style={styles.overlay} />

            <View style={styles.card}>
                <Image source={require("../../../assets/logo.png")} style={styles.logo} />
                <Text style={styles.subtitulo}>Ensine. Aprenda. Conecte-se.</Text>
                <Text style={styles.instrucao}>Para continuar faça seu login abaixo</Text>

                <View style={styles.toggleContainer}>
                    <Pressable
                        style={[styles.toggleBotao, tipoSelecionado === 'aluno' && styles.toggleBotaoAtivo]}
                        onPress={() => setTipoSelecionado('aluno')}
                    >
                        <Text style={[styles.toggleTexto, tipoSelecionado === 'aluno' && styles.toggleTextoAtivo]}>
                            Sou Aluno
                        </Text>
                    </Pressable>
                    <Pressable
                        style={[styles.toggleBotao, tipoSelecionado === 'tutor' && styles.toggleBotaoAtivo]}
                        onPress={() => setTipoSelecionado('tutor')}
                    >
                        <Text style={[styles.toggleTexto, tipoSelecionado === 'tutor' && styles.toggleTextoAtivo]}>
                            Sou Tutor
                        </Text>
                    </Pressable>
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Matrícula</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua matrícula"
                        value={matricula}
                        onChangeText={setMatricula}
                        autoCapitalize="none"
                        keyboardType="numeric"
                    />
                    {erroMatricula ? <Text style={styles.erro}>{erroMatricula}</Text> : null}
                </View>

                <View style={styles.campo}>
                    <Text style={styles.label}>Senha</Text>
                    <View style={styles.wrapperSenha}>
                        <TextInput
                            style={[styles.input, styles.inputComIcone]}
                            placeholder="Digite sua senha"
                            value={senha}
                            onChangeText={setSenha}
                            secureTextEntry={!mostrarSenha}
                        />
                        <Pressable style={styles.iconeOlho} onPress={() => setMostrarSenha(!mostrarSenha)}>
                            <Text style={styles.textoIcone}>{mostrarSenha ? "👁️" : "👁️‍🗨️"}</Text>
                        </Pressable>
                    </View>
                    {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
                </View>

                {erroGeral ? <Text style={styles.erro}>{erroGeral}</Text> : null}

                <Pressable style={styles.botao} onPress={handleLogin} disabled={carregando}>
                    {carregando ? (
                        <ActivityIndicator color={colors.white} />
                    ) : (
                        <Text style={styles.textoBotao}>Entrar</Text>
                    )}
                </Pressable>

                <View style={styles.divisorContainer}>
                    <View style={styles.linha} />
                    <Text style={styles.divisor}>ou</Text>
                    <View style={styles.linha} />
                </View>

                <Pressable onPress={() => router.push("/escolha-cadastro")} style={styles.linkContainer}>
                    <Text style={styles.linkCadastro}>Não possui um cadastro?</Text>
                    <Text style={styles.linkCadastroDestaque}> Cadastre-se!</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fundo: { flex: 1, justifyContent: "center", alignItems: "center" },
    overlay: { ...StyleSheet.absoluteFillObject, backgroundColor: "rgba(30, 20, 60, 0.55)" },
    imagemFundo: { width: "100%", height: "100%" },
    card: { width: "88%", backgroundColor: colors.white, borderRadius: 24, padding: 24, alignItems: "center", gap: 12 },
    logo: { width: 140, height: 70, resizeMode: "contain" },
    subtitulo: { fontSize: 12, color: colors.textSecondary, marginBottom: 4 },
    instrucao: { fontSize: 13, fontWeight: "600", color: colors.primary, marginBottom: 8 },
    toggleContainer: {
        flexDirection: "row",
        width: "100%",
        backgroundColor: "#F0EBFA",
        borderRadius: 10,
        padding: 4,
        marginBottom: 4,
    },
    toggleBotao: { flex: 1, paddingVertical: 10, borderRadius: 8, alignItems: "center" },
    toggleBotaoAtivo: { backgroundColor: colors.primary },
    toggleTexto: { fontSize: 13, fontWeight: "600", color: colors.primary },
    toggleTextoAtivo: { color: colors.white },
    campo: { width: "100%", gap: 4 },
    label: { fontSize: 12, fontWeight: "600", color: colors.text, marginBottom: 4 },
    input: {
        width: "100%", height: 48, borderWidth: 1, borderColor: "#C1B8E3",
        borderRadius: 8, fontSize: 16, paddingHorizontal: 12, backgroundColor: colors.white,
    },
    inputComIcone: { paddingRight: 44 },
    wrapperSenha: { position: "relative", justifyContent: "center", width: "100%" },
    iconeOlho: { position: "absolute", right: 12, top: 12 },
    textoIcone: { fontSize: 18 },
    erro: { color: colors.error, fontSize: 12, marginTop: 4 },
    botao: {
        width: "100%", backgroundColor: colors.primary, borderRadius: 8,
        height: 48, justifyContent: "center", alignItems: "center", marginTop: 8,
    },
    textoBotao: { color: colors.white, fontWeight: "bold", fontSize: 16 },
    divisorContainer: { flexDirection: "row", alignItems: "center", width: "100%", marginVertical: 8, gap: 12 },
    linha: { flex: 1, height: 1, backgroundColor: "#E0DCF0" },
    divisor: { color: colors.textSecondary, fontSize: 12, fontWeight: "500" },
    linkContainer: { flexDirection: "row", marginTop: 4 },
    linkCadastro: { color: colors.text, fontSize: 13 },
    linkCadastroDestaque: { color: colors.primary, fontWeight: "bold", fontSize: 13 },
});
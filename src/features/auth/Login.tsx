import { router } from "expo-router";
import { useState } from "react";
import { Image, ImageBackground, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { colors } from "../../shared/styles/colors";

export default function Login() {
    const [email, setEmail] = useState("");
    const [senha, setSenha] = useState("");
    const [erroEmail, setErroEmail] = useState("");
    const [erroSenha, setErroSenha] = useState("");
    const [mostrarSenha, setMostrarSenha] = useState(false);
    
    function handleLogin() {
        setErroEmail("");
        setErroSenha("");

        let temErro = false;

        if (!email.trim()) {
            setErroEmail("Email é obrigatório");
            temErro = true;
        }

        if (!senha) {
            setErroSenha("Senha é obrigatória");
            temErro = true;
        }

        if (temErro) return;

        console.log("Login válido, chamar API com:", email, senha);
        // Redirecionar para o perfil do aluno (mock)
        router.push("/perfil-aluno");
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
                <Image
                    source={require("../../../assets/logo.png")}
                    style={styles.logo}
                />
                <Text style={styles.subtitulo}>Ensine. Aprenda. Conecte-se.</Text>
                <Text style={styles.instrucao}>Para continuar faça seu login abaixo</Text>

                <View style={styles.campo}>
                    <Text style={styles.label}>E-mail / Matrícula</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Digite sua matrícula"
                        value={email}
                        onChangeText={setEmail}
                        autoCapitalize="none"
                    />
                    {erroEmail ? <Text style={styles.erro}>{erroEmail}</Text> : null}
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
                        <Pressable
                            style={styles.iconeOlho}
                            onPress={() => setMostrarSenha(!mostrarSenha)}
                        >
                            <Text style={styles.textoIcone}>
                                {mostrarSenha ? "👁️" : "👁️‍🗨️"}
                            </Text>
                        </Pressable>
                    </View>
                    {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
                </View>

                <Pressable style={styles.botao} onPress={handleLogin}>
                    <Text style={styles.textoBotao}>Entrar</Text>
                </Pressable>

                <View style={styles.divisorContainer}>
                    <View style={styles.linha} />
                    <Text style={styles.divisor}>ou</Text>
                    <View style={styles.linha} />
                </View>

                <Pressable onPress={() => router.push("/cadastro-aluno")} style={styles.linkContainer}>
                    <Text style={styles.linkCadastro}>Não possui um cadastro?</Text>
                    <Text style={styles.linkCadastroDestaque}> Cadastre-se!</Text>
                </Pressable>
            </View>
        </ImageBackground>
    );
}

const styles = StyleSheet.create({
    fundo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: "rgba(30, 20, 60, 0.55)",
    },
    imagemFundo: {
        width: "100%",
        height: "100%",
    },
    card: {
        width: "88%",
        backgroundColor: colors.white,
        borderRadius: 24,
        padding: 24,
        alignItems: "center",
        gap: 12,
    },
    logo: {
        width: 140,
        height: 70,
        resizeMode: "contain",
    },
    subtitulo: {
        fontSize: 12,
        color: colors.textSecondary,
        marginBottom: 4,
    },
    instrucao: {
        fontSize: 13,
        fontWeight: "600",
        color: colors.primary,
        marginBottom: 8,
    },
    campo: {
        width: "100%",
        gap: 4,
    },
    label: {
        fontSize: 12,
        fontWeight: "600",
        color: colors.text,
        marginBottom: 4,
    },
    input: {
        width: "100%",
        height: 48,
        borderWidth: 1,
        borderColor: "#C1B8E3",
        borderRadius: 8,
        fontSize: 16,
        paddingHorizontal: 12,
        backgroundColor: colors.white,
    },
    inputComIcone: {
        paddingRight: 44,
    },
    wrapperSenha: {
        position: "relative",
        justifyContent: "center",
        width: "100%",
    },
    iconeOlho: {
        position: "absolute",
        right: 12,
        top: 12,
    },
    textoIcone: {
        fontSize: 18,
    },
    erro: {
        color: colors.error,
        fontSize: 12,
        marginTop: 4,
    },
    botao: {
        width: "100%",
        backgroundColor: colors.primary,
        borderRadius: 8,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 8,
    },
    textoBotao: {
        color: colors.white,
        fontWeight: "bold",
        fontSize: 16,
    },
    divisorContainer: {
        flexDirection: "row",
        alignItems: "center",
        width: "100%",
        marginVertical: 8,
        gap: 12,
    },
    linha: {
        flex: 1,
        height: 1,
        backgroundColor: "#E0DCF0",
    },
    divisor: {
        color: colors.textSecondary,
        fontSize: 12,
        fontWeight: "500",
    },
    linkContainer: {
        flexDirection: "row",
        marginTop: 4,
    },
    linkCadastro: {
        color: colors.text,
        fontSize: 13,
    },
    linkCadastroDestaque: {
        color: colors.primary,
        fontWeight: "bold",
        fontSize: 13,
    },
    botaoDev: {
        marginTop: 12,
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        backgroundColor: "#EEE",
        alignItems: "center",
    },
    textoBotaoDev: {
        fontSize: 12,
        color: "#666",
    },
});

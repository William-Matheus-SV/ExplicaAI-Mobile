import { ActivityIndicator } from "react-native"; // adiciona ao import existente de react-native
import { cadastrarAluno } from "../../shared/services/cadastroService";
import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Alert, Image, Pressable, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { Input } from "../../shared/components/Input";
import CardMaterias from "../../shared/components/CardMaterias";
import { themeAluno } from "../../shared/styles/themeAluno";

export default function CadastroAluno() {
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [matricula, setMatricula] = useState("");
  const [erroMatricula, setErroMatricula] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [bio, setBio] = useState("");
  
  const itinerarios = [
    {
      nome: "Linguagens e suas tecnologias",
      materias: ["Português", "Inglês", "Espanhol"],
    },
    {
      nome: "Matemática e suas tecnologias",
      materias: ["Matemática", "Estatística", "Geometria"],
    },
    {
      nome: "Ciências da natureza e suas tecnologias",
      materias: ["Física", "Química", "Biologia"],
    },
    {
      nome: "Ciências humanas e sociais aplicadas",
      materias: ["História", "Geografia", "Filosofia", "Sociologia"],
    },
    {
      nome: "Formação técnica e profissional",
      materias: ["Lógica de Programação", "HTML, CSS e JS", "Banco de Dados"],
    },
  ];
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>(
    [],
  );
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(null);

  function toggleMateria(materia: string) {
    if (materiasSelecionadas.includes(materia)) {
      setMateriasSelecionadas(
        materiasSelecionadas.filter((item) => item !== materia),
      );
    } else {
      setMateriasSelecionadas([...materiasSelecionadas, materia]);
    }
  }

  function toggleItinerario(nomeItinerario: string) {
    if (itinerarioAberto === nomeItinerario) {
      setItinerarioAberto(null);
    } else {
      setItinerarioAberto(nomeItinerario);
    }
  }

  async function handleCadastro() {
    setErroSenha("");
    setErroMatricula("");

    if (!nome.trim() || !idade.trim() || !matricula.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (!/^\d{6}$/.test(matricula)) {
      setErroMatricula("A matrícula deve conter exatamente 6 dígitos numéricos");
      return;
    }

    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem");
      return;
    }

    if (!/^\d{6}$/.test(senha)) {
      setErroSenha("A senha deve ser um PIN de exatamente 6 dígitos numéricos");
      return;
    }

    setCarregando(true);

    try {
      await cadastrarAluno({
        nome,
        matricula,
        idade,
        bio,
        materias: materiasSelecionadas,
        senha,
      });

      Alert.alert("Sucesso", "Cadastro realizado! Faça login para continuar.");
      router.replace("/login");
    } catch (erro: any) {
      Alert.alert("Erro", erro.message || "Não foi possível concluir o cadastro.");
    } finally {
      setCarregando(false);
    }
  }

  function handleLimpar() {
    setNome("");
    setIdade("");
    setMatricula("");
    setSenha("");
    setConfirmarSenha("");
    setBio("");
    setMateriasSelecionadas([]);
    setItinerarioAberto(null);
    setErroSenha("");
  }

  return (
    <View style={styles.tela}>
      <LinearGradient colors={themeAluno.gradient} style={styles.cabecalho}>
        <Pressable style={styles.botaoVoltar} onPress={() => router.back()}>
          <Text style={styles.iconeVoltar}>←</Text>
        </Pressable>

        <Image
          source={require("../../../assets/logo-alunoCadastro.png")}
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
                placeholder="Ex: 123456"
                value={matricula}
                onChangeText={setMatricula}
                keyboardType="numeric"
                style={styles.inputEstilizado}
              />
              {erroMatricula ? <Text style={styles.erro}>{erroMatricula}</Text> : null}
            </View>
          </View>

          <View style={styles.linha}>
            <View style={styles.metade}>
              <Text style={styles.label}>Senha *</Text>
              <Input
                placeholder="PIN de 6 dígitos"
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
                style={styles.inputEstilizado}
              />
            </View>

            <View style={styles.metade}>
              <Text style={styles.label}>Confirmar Senha *</Text>
              <Input
                placeholder="PIN de 6 dígitos"
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
          <Text style={styles.subLabel}>
            Selecione o itinerário e depois as matérias em que o aluno possui
            dificuldade
          </Text>

          <View style={styles.listaItinerarios}>
            {itinerarios.map((itinerario) => {
              const aberto = itinerarioAberto === itinerario.nome;

              return (
                <View key={itinerario.nome} style={styles.itinerarioBloco}>
                  <Pressable
                    style={styles.itinerarioCabecalho}
                    onPress={() => toggleItinerario(itinerario.nome)}
                  >
                    <Text style={styles.itinerarioTexto}>
                      {itinerario.nome}
                    </Text>
                    <Text style={styles.itinerarioSeta}>
                      {aberto ? "▲" : "▼"}
                    </Text>
                  </Pressable>

                  {aberto && (
                    <View style={styles.itinerarioMaterias}>
                      {itinerario.materias.map((materia) => (
                        <CardMaterias
                          key={materia}
                          nome={materia}
                          selecionado={materiasSelecionadas.includes(materia)}
                          onPress={() => toggleMateria(materia)}
                        />
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        <View style={styles.linhaBotoes}>
          <Pressable style={styles.botaoSecundario} onPress={handleLimpar}>
            <Text style={styles.textoBotaoSecundario}>Limpar</Text>
          </Pressable>

          <Pressable style={styles.botaoPrimario} onPress={handleCadastro} disabled={carregando}>
            {carregando ? (
              <ActivityIndicator color ={themeAluno.white} />
            ) : (
            <Text style={styles.textoBotaoPrimario}>Cadastrar Aluno</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: {
    flex: 1,
    backgroundColor: themeAluno.background,
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
    color: themeAluno.white,
    fontSize: 18,
  },
  logoCabecalho: {
    width: 90,
    height: 90,
    resizeMode: "contain",
    marginBottom: 0,
  },
  tituloCabecalho: {
    color: themeAluno.white,
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
    backgroundColor: themeAluno.white,
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
    backgroundColor: themeAluno.primary,
    justifyContent: "center",
    alignItems: "center",
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  campo: {
    gap: 4,
  },
  label: {
    fontSize: 13,
    fontWeight: "600",
    color: themeAluno.text,
  },
  inputEstilizado: {
    borderColor: themeAluno.border,
    backgroundColor: themeAluno.white,
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
    color: themeAluno.error,
    fontSize: 12,
    marginTop: -4,
  },
  textArea: {
    borderWidth: 1,
    borderColor: themeAluno.border,
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
    minHeight: 100,
  },
  subLabel: {
    fontSize: 12,
    color: themeAluno.textSecondary,
    marginTop: -4,
  },
  listaItinerarios: {
    gap: 8,
  },
  itinerarioBloco: {
    borderWidth: 1,
    borderColor: themeAluno.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  itinerarioCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: themeAluno.primaryLight,
  },
  itinerarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: themeAluno.text,
    flex: 1,
  },
  itinerarioSeta: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  itinerarioMaterias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
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
    color: themeAluno.text,
    fontWeight: "600",
  },
  botaoPrimario: {
    flex: 2,
    backgroundColor: themeAluno.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoPrimario: {
    color: themeAluno.white,
    fontWeight: "bold",
  },
});
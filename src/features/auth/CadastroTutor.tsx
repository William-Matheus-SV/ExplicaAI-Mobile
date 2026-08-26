import { ActivityIndicator } from "react-native";
import { cadastrarTutor } from "../../shared/services/cadastroService";
import { View, Text, ScrollView, TextInput, Pressable, StatusBar, StyleSheet, Image, Alert } from 'react-native';
import { useState } from 'react';
import { router } from 'expo-router';
import { colors } from "../../shared/styles/colors";
import { Ionicons } from '@expo/vector-icons';
import InputLabel from '../../shared/components/InputLabel';
import SectionTitle from '../../shared/components/SectionTitle';
import CardMaterias from '../../shared/components/CardMaterias';
import { themeTutor } from '../../shared/styles/themeTutor';
import { useSelecaoHorarios, DIAS } from '../../shared/hooks/useSelecaoHorarios';
 
// calculo para ter uma margem no header dos usuarios
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;



export default function CadastroTutor() {
  // hook dos inputs para guardar valores
  const [carregando, setCarregando] = useState(false);
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [matricula, setMatricula] = useState("");
  const [erroMatricula, setErroMatricula] = useState("");
  const [bio, setBio] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  // parte do dropDown
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

  // hook para guardar os valores de Itinerarios
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>([]);
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(null);

  function toggleMateria(materia: string) {
    if (materiasSelecionadas.includes(materia)) {
      setMateriasSelecionadas(materiasSelecionadas.filter((item) => item !== materia));
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

  const {
  horariosSelecionados,
  setHorariosSelecionados,
  duracaoAtiva,
  setDuracaoAtiva,
  horariosGrade,
  estaSelecionado,
  toggleHorario,
  } = useSelecaoHorarios();
  

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
      await cadastrarTutor({
        nome,
        matricula,
        idade,
        bio,
        materiasLecionadas: materiasSelecionadas,
        agendaDisponivel: horariosSelecionados,
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
  //
  function handleVoltar() {
  if (router.canGoBack()) {
    router.back();
  } else {
    router.replace("/escolha-cadastro");
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
    setHorariosSelecionados([]);
  }

  return (
    <View style={styles.container}>
      {/* organiza views dentro do header */}
      <View style={styles.header}>
        <Pressable style={styles.botaoVoltar} onPress={ handleVoltar}>
          <Ionicons name={'arrow-back'} size={22} color={colors.primaryLight} />
        </Pressable>

        {/* organiza itens dentro da view */}
        <View style={styles.headerContent}>
          <Image
            source={require("../../../assets/logo.png")}
            style={styles.logoCabecalho}
          />
          <Text style={styles.tituloHeader}>Cadastro de Tutor</Text>
          <Text style={styles.subtituloHeader}>Preencha os dados abaixo para registrar um novo Tutor</Text>
        </View>
      </View>
      {/* termina o header */}

      {/* __-----____---___-- INFORMAÇOES PESSOAIS __-----____---___-- */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <SectionTitle icon="person-sharp" size={20} color={colors.primary} title="Informações Pessoais" />

          <InputLabel
            Label="Nome Completo"
            placeholder="Digite seu Nome"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.campos}>
            <InputLabel
              Label="Idade"
              placeholder="Digite sua idade"
              keyboardType="numeric"
              value={idade}
              onChangeText={setIdade}
            />
            <InputLabel
              Label="Matrícula"
              placeholder="Digite sua Matrícula"
              keyboardType="numeric"
              value={matricula}
              onChangeText={setMatricula}
            />
          </View>
          {erroMatricula ? <Text style={styles.erro}>{erroMatricula}</Text> : null}
          <View style={styles.campos}>
            <InputLabel
              Label="Senha"
              placeholder="PIN de 6 dígitos"
              secureTextEntry
              value={senha}
              onChangeText={setSenha}
            />
            <InputLabel
              Label="Confirmar Senha"
              placeholder="Confirme sua Senha"
              secureTextEntry
              value={confirmarSenha}
              onChangeText={setConfirmarSenha}
            />  
          </View>
          {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null}
        </View>

        {/*__-----____---___-- BIO DESCRIÇAO __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="person-circle-outline" size={20} color={colors.primary} title="Bio/Descrição" />
          <TextInput
            style={styles.bio}
            placeholder="Fale um pouco sobre você"
            multiline
            value={bio}
            onChangeText={setBio}
          />
        </View>

        {/*__-----____---___-- MATERIAS __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="school-sharp" size={20} color={colors.primary} title="Matérias Lecionadas" />

          <Text style={styles.subLabel}>
            Selecione o itinerário e depois as matérias que o tutor está apto a lecionar.
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
                    <Text style={styles.itinerarioTexto}>{itinerario.nome}</Text>
                    <Text style={styles.itinerarioSeta}>{aberto ? "▲" : "▼"}</Text>
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

        {/*__-----____---___-- horarios __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="calendar" size={20} color={colors.primary} title="Minha Agenda" />

          <Text style={styles.subLabel}>
            Escolha a duração da sessão e toque nos horários em que você está disponível.
          </Text>

          {/* seletor de duração — agora troca a grade inteira (8 opções de 1h ou 6 de 2h) */}
          <View style={styles.abasDuracao}>
            <Pressable
              style={[styles.abaDuracao, duracaoAtiva === 1 && styles.abaDuracaoAtiva]}
              onPress={() => setDuracaoAtiva(1)}
            >
              <Text style={[styles.textoAbaDuracao, duracaoAtiva === 1 && styles.textoAbaDuracaoAtiva]}>
                1 Hora
              </Text>
            </Pressable>
            <Pressable
              style={[styles.abaDuracao, duracaoAtiva === 2 && styles.abaDuracaoAtiva]}
              onPress={() => setDuracaoAtiva(2)}
            >
              <Text style={[styles.textoAbaDuracao, duracaoAtiva === 2 && styles.textoAbaDuracaoAtiva]}>
                2 Horas
              </Text>
            </Pressable>
          </View>

          <View style={styles.grade}>
            {/* linha de cabeçalho com os dias */}
            <View style={styles.linhaGrade}>
              <View style={styles.celulaRotulo} />
              {DIAS.map((dia) => (
                <View key={dia} style={styles.celulaCabecalho}>
                  <Text style={styles.textoCabecalho}>{dia}</Text>
                </View>
              ))}
            </View>

            {/* uma linha por horário da grade ativa (1h ou 2h) */}
            {horariosGrade.map((horario) => (
              <View key={horario} style={styles.linhaGrade}>
                <View style={styles.celulaRotulo}>
                  <Text style={styles.textoRotulo}>{horario}</Text>
                </View>
                {DIAS.map((dia) => (
                  <Pressable
                    key={`${dia}-${horario}`}
                    style={[styles.celulaSlot, estaSelecionado(dia, horario) && styles.celulaSlotSelecionada]}
                    onPress={() => toggleHorario(dia, horario)}
                  />
                ))}
              </View>
            ))}
          </View>
        </View>

        {/* View de botoes */}
        <View style={styles.linhaBotoes}>
          <Pressable style={styles.botaoSecundario} onPress={handleLimpar}>
            <Text style={styles.textoBotaoSecundario}>Limpar</Text>
          </Pressable>

          <Pressable style={styles.botaoPrimario} onPress={handleCadastro} disabled={carregando}>
            {carregando ? (
              <ActivityIndicator color="white" />
            ): (
            <Text style={styles.textoBotaoPrimario}>Cadastrar Tutor</Text>
            )}
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#764ba2',
    paddingTop: statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoVoltar: {
    height: 36,
    width: 36,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  tituloHeader: {
    color: colors.primaryLight,
    fontSize: 22,
    fontWeight: "bold",
  },
  subtituloHeader: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },
  logoCabecalho: {
    width: 48,
    height: 48,
    resizeMode: "contain",
    marginBottom: 8,
  },
  scrollContainer: {
    padding: 16,
    flex: 1,
  },
  campos: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
  },
  bio: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom: 20,
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
  subLabel: {
    fontSize: 12,
    color: themeTutor.textSecondary,
    marginTop: -20,
  },
  listaItinerarios: {
    gap: 8,
  },
  itinerarioBloco: {
    borderWidth: 1,
    borderColor: themeTutor.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  itinerarioCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: themeTutor.primaryLight,
  },
  itinerarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: themeTutor.text,
    flex: 1,
  },
  itinerarioSeta: {
    fontSize: 12,
    color: themeTutor.textSecondary,
  },
  itinerarioMaterias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  erro: {
    color: '#d32f2f',
    fontSize: 12,
    marginTop: 8,
  },
  abasDuracao: {
    flexDirection: "row",
    gap: 8,
    marginBottom: 12,
  },
  abaDuracao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeTutor.border,
    alignItems: "center",
  },
  abaDuracaoAtiva: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },
  textoAbaDuracao: {
    color: themeTutor.text,
    fontWeight: "600",
  },
  textoAbaDuracaoAtiva: {
    color: colors.white,
  },
  grade: {
    borderWidth: 1,
    borderColor: themeTutor.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  linhaGrade: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderBottomColor: themeTutor.border,
  },
  celulaRotulo: {
    width: 90,
    padding: 6,
    justifyContent: "center",
    backgroundColor: themeTutor.primaryLight,
  },
  textoRotulo: {
    fontSize: 11,
    color: themeTutor.text,
  },
  celulaCabecalho: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: themeTutor.primaryLight,
  },
  textoCabecalho: {
    fontSize: 12,
    fontWeight: "600",
    color: themeTutor.text,
  },
  celulaSlot: {
    flex: 1,
    height: 36,
    borderLeftWidth: 1,
    borderLeftColor: themeTutor.border,
    backgroundColor: colors.white,
  },
  celulaSlotSelecionada: {
    backgroundColor: colors.primary,
  },
});
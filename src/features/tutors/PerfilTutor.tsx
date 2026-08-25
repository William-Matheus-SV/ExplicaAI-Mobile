import { View, Text, ScrollView, Pressable, StyleSheet, StatusBar, TextInput, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themeTutor } from "../../shared/styles/themeTutor";
import { useState } from "react";
import { useRouter } from "expo-router";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import BottomNavBar from "../../shared/components/BottomNavBar";
import SecaoAvaliacoes from "../../shared/components/SecaoAvaliacoes"
interface ItinerarioComMaterias {
  nome: string;
  materias: string[];
}

const ITINERARIOS_CATALOGO: ItinerarioComMaterias[] = [
  { nome: "Linguagens, Códigos e suas Tecnologias", materias: ["Português", "Inglês", "Espanhol"] },
  { nome: "Matemática e suas Tecnologias", materias: ["Matemática", "Estatística", "Geometria"] },
  { nome: "Ciências da Natureza e suas Tecnologias", materias: ["Física", "Química", "Biologia"] },
  { nome: "Ciências Humanas e Sociais Aplicadas", materias: ["História", "Geografia", "Filosofia", "Sociologia"] },
  { nome: "Formação Técnica e Profissional", materias: ["Lógica de Programação", "HTML, CSS e JS", "Banco de Dados"] },
];

// Seguem mockados os dados pois precisa do back-end
const MATCHES = [
  { nome: "Aryelle Oliveira", materia: "Matemática" },
  { nome: "Lucas Henrique", materia: "Física" },
  { nome: "Mariana Costa", materia: "Cálculo" },
];

export default function PerfilTutor() {
  const router = useRouter();
  const { usuario, sair } = useUsuario();

  const tutor = {
    nome: usuario?.tipo === 'tutor' ? usuario.nome : "Tutor",
    matricula: usuario?.tipo === 'tutor' ? usuario.matricula : "-",
    idade: usuario?.tipo === 'tutor' ? usuario.idade : "-",
    bio: usuario?.tipo === 'tutor' ? usuario.bio : "",
  };

  const materiasLecionadas = usuario?.tipo === 'tutor' ? usuario.materiasLecionadas : [];
  const horariosDisponiveis = usuario?.tipo === 'tutor' ? usuario.horariosDisponiveis : [];

  const DIAS_ORDEM = ["SEG", "TER", "QUA", "QUI", "SEX"] as const;
  const agenda = DIAS_ORDEM.map((dia) => ({
    dia,
    horario: horariosDisponiveis
      .filter((slot) => slot.dia === dia)
      .map((slot) => slot.horario),
  })).filter((item) => item.horario.length > 0);

  const [bioTexto, setBioTexto] = useState(tutor.bio || "Toque para adicionar uma bio");
  const [editando, setEditando] = useState(false);

  const [modalMateriasVisivel, setModalMateriasVisivel] = useState(false);
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(null);
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>(materiasLecionadas);

  function toggleMateria(materia: string) {
    if (materiasSelecionadas.includes(materia)) {
      setMateriasSelecionadas(materiasSelecionadas.filter((item) => item !== materia));
    } else {
      setMateriasSelecionadas([...materiasSelecionadas, materia]);
    }
  }

  function toggleItinerario(nome: string) {
    setItinerarioAberto(itinerarioAberto === nome ? null : nome);
  }

  function handleVoltarLogin() {
  sair(); 
  router.replace("/login");
  }

  function handleSair() {
    sair();
    router.replace("/login");
  }

  const materiasAgrupadas = ITINERARIOS_CATALOGO.map((itinerario) => ({
    nome: itinerario.nome,
    materias: itinerario.materias.filter((m) => materiasSelecionadas.includes(m)),
  })).filter((itinerario) => itinerario.materias.length > 0);

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.Header}>
          <View style={styles.HeaderContent}>
            <Pressable style={styles.BotaoVoltar} onPress={handleVoltarLogin}>
              <Ionicons name="arrow-back" size={22} color="white" />
            </Pressable>
            <Text style={styles.HeaderTitulo}>Perfil Tutor</Text>
            <View style={styles.AcoesHeader}>
              <Ionicons name="notifications-outline" size={22} color="white" />
            </View>
          </View>
        </View>

        <View style={styles.AvatarWrapper}>
          <View style={styles.Avatar}>
            <Ionicons name="person" size={70} color="#d9d9e8" />
            <View style={styles.CameraBadge}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </View>
        </View>

        <View style={styles.Conteudo}>
          <Text style={styles.Nome}>{tutor.nome}</Text>
          <View style={styles.SobreMim}>
            <Ionicons name="person-circle-outline" size={22} color={themeTutor.primary} />
            <Text>Sobre mim:</Text>
          </View>

          <View style={styles.Bio}>
            {editando ? (
              <TextInput
                value={bioTexto}
                onChangeText={setBioTexto}
                onBlur={() => setEditando(false)}
                autoFocus
              />
            ) : (
              <Pressable onPress={() => setEditando(true)}>
                <Text>{bioTexto}</Text>
              </Pressable>
            )}
          </View>

          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="person-outline" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Informações pessoais</Text>
              </View>
            </View>

            <View style={styles.InfoBox}>
              <View style={styles.InfoItem}>
                <Ionicons name="card-outline" size={20} color={themeTutor.primary} />
                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>Matrícula</Text>
                  <Text style={styles.InfoValor}>{tutor.matricula}</Text>
                </View>
              </View>

              <View style={styles.InfoItem}>
                <Ionicons name="calendar-outline" size={20} color={themeTutor.primary} />
                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>Idade</Text>
                  <Text style={styles.InfoValor}>{tutor.idade} anos</Text>
                </View>
              </View>
            </View>
          </View>

          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="book-outline" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Matérias que leciona</Text>
              </View>
              <Pressable onPress={() => setModalMateriasVisivel(true)}>
                <Ionicons name="add-circle-outline" size={24} color={themeTutor.primary} />
              </Pressable>
            </View>

            {materiasAgrupadas.map((itinerario) => (
              <View key={itinerario.nome} style={styles.ItinerarioSecao}>
                <Text style={styles.ItinerarioNome}>{itinerario.nome}</Text>
                <View style={styles.Materias}>
                  {itinerario.materias.map((materia) => (
                    <View key={materia} style={styles.MateriaChip}>
                      <Text style={styles.MateriaTexto}>{materia}</Text>
                    </View>
                  ))}
                </View>
              </View>
            ))}
          </View>

          <Modal visible={modalMateriasVisivel} animationType="slide" transparent>
            <View style={styles.ModalFundo}>
              <View style={styles.ModalConteudo}>
                <Text style={styles.CardTitulo}>Editar matérias</Text>

                <ScrollView style={{ maxHeight: 400, marginTop: 12 }}>
                  {ITINERARIOS_CATALOGO.map((itinerario) => {
                    const aberto = itinerarioAberto === itinerario.nome;
                    return (
                      <View key={itinerario.nome} style={styles.itinerarioBloco}>
                        <Pressable
                          style={styles.itinerarioCabecalho}
                          onPress={() => toggleItinerario(itinerario.nome)}
                        >
                          <Text style={styles.itinerarioTexto}>{itinerario.nome}</Text>
                          <Text>{aberto ? "▲" : "▼"}</Text>
                        </Pressable>

                        {aberto && (
                          <View style={styles.itinerarioMaterias}>
                            {itinerario.materias.map((materia) => {
                              const selecionada = materiasSelecionadas.includes(materia);
                              return (
                                <Pressable
                                  key={materia}
                                  style={[
                                    styles.MateriaChip,
                                    selecionada && { backgroundColor: themeTutor.primary },
                                  ]}
                                  onPress={() => toggleMateria(materia)}
                                >
                                  <Text
                                    style={[
                                      styles.MateriaTexto,
                                      selecionada && { color: "#fff" },
                                    ]}
                                  >
                                    {materia}
                                  </Text>
                                </Pressable>
                              );
                            })}
                          </View>
                        )}
                      </View>
                    );
                  })}
                </ScrollView>

                <View style={styles.linhaBotoesModal}>
                  <Pressable
                    style={styles.botaoSecundario}
                    onPress={() => setModalMateriasVisivel(false)}
                  >
                    <Text style={styles.textoBotaoSecundario}>Cancelar</Text>
                  </Pressable>
                  <Pressable
                    style={styles.botaoPrimario}
                    onPress={() => setModalMateriasVisivel(false)}
                  >
                    <Text style={styles.textoBotaoPrimario}>Salvar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="school-sharp" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Matches</Text>
              </View>
              <Pressable style={{ flexDirection: "row", alignItems: "center", gap: 2 }}>
                <Text style={styles.CardLink}>Ver todos</Text>
                <Ionicons name="chevron-forward" size={14} color={themeTutor.primary} />
              </Pressable>
            </View>

            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.MatchesLista}>
              {MATCHES.map((match) => (
                <View key={match.nome} style={styles.MatchCard}>
                  <Text style={styles.MatchNome}>{match.nome}</Text>
                  <Text style={styles.MatchMateria}>{match.materia}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="calendar-outline" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Minha agenda</Text>
              </View>
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                onPress={() => router.push("/agenda")}
              >
                <Text style={styles.CardLink}>Ver agenda completa</Text>
                <Ionicons name="chevron-forward" size={14} color={themeTutor.primary} />
              </Pressable>
            </View>

            {agenda.length === 0 ? (
              <Text style={{ color: "#7a7a7a", fontSize: 13 }}>
                Nenhum horário cadastrado ainda.
              </Text>
            ) : (
              <ScrollView horizontal style={styles.Agenda}>
                {agenda.map((item) => {
                  const horariosVisiveis = item.horario.slice(0, 3);
                  const temMais = item.horario.length > 3;

                  return (
                    <View key={item.dia} style={styles.DiaCard}>
                      <Text style={styles.DiaSemana}>{item.dia}</Text>
                      {horariosVisiveis.map((hora, index) => (
                        <Text key={index} style={styles.DiaHora}>{hora}</Text>
                      ))}
                      {temMais && <Text style={styles.DiaHora}>...</Text>}
                    </View>
                  );
                })}
              </ScrollView>
            )}
          </View>
          <SecaoAvaliacoes theme={themeTutor} />
        </View>
      </ScrollView>
      <BottomNavBar theme={themeTutor} perfil="tutor" />
    </View>
  );
}

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f2fa",
  },

  Header: {
    backgroundColor: "#764ba2",
    paddingTop: statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },

  HeaderContent: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  AcoesHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },

  BotaoVoltar: {
    backgroundColor: "rgba(255,255,255,0.2)",
    width: 44,
    height: 44,
    borderRadius: 44,
    justifyContent: "center",
    alignItems: "center",
  },

  HeaderTitulo: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },

  // o avatar agora fica FORA do Header, sobrepondo ele
  AvatarWrapper: {
    alignItems: "center",
    marginTop: -65, // metade da altura do Avatar, pra "cortar" a curva do header
    zIndex: 2,
  },

  Avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  CameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: "#764ba2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },

  Nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b2b2b",
    marginTop: 12,
    marginBottom: 5,
    textAlign: "center",
  },

  SobreMim: {
    justifyContent: "center",
    alignItems: "center",
    gap: 5,
    width: "100%",
    marginBottom: 5,
    flexDirection: "row",
  },

  Bio: {
    borderWidth: 1,
    borderColor: themeTutor.primaryDark,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // ou so padding:10
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 16,
  },

  Conteudo: {
    paddingHorizontal: 16,
    paddingBottom: 90, // espaço pro botão fixo não cobrir o último card
  },

  /* fim de bio */

  /* CARDS */
  Card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  CardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  CardHeaderEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  CardTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2b2b2b",
  },

  CardLink: {
    color: "#764ba2",
    fontSize: 13,
    fontWeight: "500",
  },

  /* Informaçoes pessoais */
  InfoBox: {
    flexDirection: "row",
    backgroundColor: "#f3eefc",
    borderRadius: 12,
    padding: 14,
  },

  InfoItem: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  InfoTextos: {
    gap: 2,
  },

  InfoLabel: {
    fontSize: 12,
    color: "#7a7a7a",
  },

  InfoValor: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2b2b2b",
  },

  /* materias */
  Materias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  MateriaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f3eefc",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  MateriaTexto: {
    color: "#764ba2",
    fontWeight: "500",
  },

  ItinerarioSecao: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: themeTutor.secondary,
  },

  ItinerarioNome: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9A96A3",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

  /* modal de edição de matérias */
  ModalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },

  ModalConteudo: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: "80%",
  },

  itinerarioBloco: {
    borderWidth: 1,
    borderColor: themeTutor.border,
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
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

  itinerarioMaterias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },

  linhaBotoesModal: {
    flexDirection: "row",
    gap: 12,
    marginTop: 16,
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
    color: "#2b2b2b",
    fontWeight: "600",
  },

  botaoPrimario: {
    flex: 1,
    backgroundColor: themeTutor.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoPrimario: {
    color: "white",
    fontWeight: "bold",
  },

  /* ------- */
  /* MATCHES */

  MatchesLista: {
    flexDirection: "row",
    gap: 10,
  },

  MatchCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee0fa",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },

  MatchNome: {
    fontWeight: "600",
    fontSize: 13,
    color: "#2b2b2b",
    marginTop: 4,
    textAlign: "center",
  },

  MatchMateria: {
    fontSize: 12,
    color: "#7a7a7a",
    marginBottom: 4,
  },

  MatchNota: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  MatchNotaTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2b2b2b",
  },

  /* AGENDAAA */
  Agenda: {
    flexDirection: "row",
    gap: 10,
  },

  DiaCard: {
    flex: 1,
    backgroundColor: "#f3eefc",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    width: 90,
    marginRight: 5,
  },

  DiaSemana: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeTutor.primary,
  },

  DiaHora: {
    fontSize: 12,
    color: "#2b2b2b",
    marginTop: 4,
  },
});

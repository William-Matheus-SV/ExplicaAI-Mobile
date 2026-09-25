import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
} from "react-native";

import { Ionicons } from "@expo/vector-icons";
import { useCallback, useState } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { router } from "expo-router";

import { themeAluno } from "../../shared/styles/themeAluno";
import BottomNavBar from "../../shared/components/BottomNavBar";
import FotoPerfil from "../../shared/components/FotoPerfil";
import SecaoAvaliacoes from "../../shared/components/SecaoAvaliacoes";

import { useUsuario } from "../../shared/contexts/UsuarioContext";

import { buscarMinhasAvaliacoes } from "../../shared/services/avaliacaoService";
import {
  buscarProximasAulas,
  buscarEstatisticas,
} from "../../shared/services/matchService";

interface ItinerarioComMaterias {
  nome: string;
  materias: string[];
}

const ITINERARIOS_CATALOGO: ItinerarioComMaterias[] = [
  {
    nome: "Linguagens, Códigos e suas Tecnologias",
    materias: ["Português", "Inglês", "Espanhol"],
  },
  {
    nome: "Matemática e suas Tecnologias",
    materias: ["Matemática", "Estatística", "Geometria"],
  },
  {
    nome: "Ciências da Natureza e suas Tecnologias",
    materias: ["Física", "Química", "Biologia"],
  },
  {
    nome: "Ciências Humanas e Sociais Aplicadas",
    materias: ["História", "Geografia", "Filosofia", "Sociologia"],
  },
  {
    nome: "Formação Técnica e Profissional",
    materias: ["Lógica de Programação", "HTML, CSS e JS", "Banco de Dados"],
  },
];

const estatisticas = [
  {
    icone: "⭐",
    numero: "0.0",
    label: "Avaliação Média",
    destaque: "Você ainda não foi avaliado",
  },
  {
    icone: "🎓",
    numero: "0",
    label: "Aulas Concluídas",
    destaque: "Comece a aprender!",
  },
  {
    icone: "📅",
    numero: "0",
    label: "Aulas Agendadas",
    destaque: "Próximas aulas",
  },
];

export default function PerfilAluno() {
  const { usuario, token, sair } = useUsuario();

  const [avaliacaoMedia, setAvaliacaoMedia] = useState<number | null>(null);
  const [totalAvaliacoes, setTotalAvaliacoes] = useState(0);

  const [aulasConcluidas, setAulasConcluidas] = useState(0);
  const [aulasAgendadas, setAulasAgendadas] = useState(0);

  const [proximasAulas, setProximasAulas] = useState<any[]>([]);

  const [bioTexto, setBioTexto] = useState(
    usuario?.tipo === "aluno" && usuario.bio
      ? usuario.bio
      : "Toque para adicionar uma bio"
  );

  const [editandoBio, setEditandoBio] = useState(false);
  const [modalMateriasVisivel, setModalMateriasVisivel] = useState(false);
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(
    null
  );

  const materiasDoAluno =
    usuario?.tipo === "aluno" ? usuario.materias ?? [] : [];

  const [materiasSelecionadas, setMateriasSelecionadas] =
    useState<string[]>(materiasDoAluno);

  /*
   * ============================================================
   * CARREGAR DADOS DO BACKEND
   * ============================================================
   */

  useFocusEffect(
  useCallback(() => {
    if (!token) {
      return;
    }

    // Depois dessa verificação, tokenAtual é garantidamente string
    const tokenAtual = token;

    async function carregarDados() {
      try {
        const [avaliacoes, stats, proximas] = await Promise.all([
          buscarMinhasAvaliacoes(tokenAtual),
          buscarEstatisticas(tokenAtual),
          buscarProximasAulas(tokenAtual),
        ]);

        console.log("Avaliações recebidas:", avaliacoes);
        console.log("Estatísticas recebidas:", stats);
        console.log("Próximas aulas recebidas:", proximas);

        // Avaliações
        setAvaliacaoMedia(
          typeof avaliacoes?.media === "number"
            ? avaliacoes.media
            : null
        );

        setTotalAvaliacoes(
          typeof avaliacoes?.total === "number"
            ? avaliacoes.total
            : 0
        );

        // Estatísticas
        setAulasConcluidas(
          typeof stats?.aulasConcluidas === "number"
            ? stats.aulasConcluidas
            : 0
        );

        setAulasAgendadas(
          typeof stats?.aulasAgendadas === "number"
            ? stats.aulasAgendadas
            : 0
        );

        // Próximas aulas
        if (Array.isArray(proximas?.matches)) {
          setProximasAulas(proximas.matches);
        } else if (Array.isArray(proximas)) {
          setProximasAulas(proximas);
        } else {
          console.log(
            "Formato inesperado de próximas aulas:",
            proximas
          );

          setProximasAulas([]);
        }
      } catch (erro: any) {
        console.log(
          "Erro ao carregar dados do perfil:",
          erro?.message || erro
        );

        setAvaliacaoMedia(null);
        setTotalAvaliacoes(0);
        setAulasConcluidas(0);
        setAulasAgendadas(0);
        setProximasAulas([]);
      }
    }

    carregarDados();
  }, [token])
);

  /*
   * ============================================================
   * FUNÇÕES
   * ============================================================
   */

  function handleVoltarLogin() {
    sair();
    router.replace("/login");
  }

  function toggleMateria(materia: string) {
    if (materiasSelecionadas.includes(materia)) {
      setMateriasSelecionadas(
        materiasSelecionadas.filter((item) => item !== materia)
      );
    } else {
      setMateriasSelecionadas([
        ...materiasSelecionadas,
        materia,
      ]);
    }
  }

  function toggleItinerario(nome: string) {
    setItinerarioAberto(
      itinerarioAberto === nome ? null : nome
    );
  }

  /*
   * ============================================================
   * DADOS DO ALUNO
   * ============================================================
   */

  const aluno = {
    nome:
      usuario?.tipo === "aluno"
        ? usuario.nome
        : "Aluno",

    matricula:
      usuario?.tipo === "aluno"
        ? usuario.matricula
        : "-",

    idade:
      usuario?.tipo === "aluno"
        ? usuario.idade
        : "-",

    bio:
      usuario?.tipo === "aluno"
        ? usuario.bio
        : "",
  };

  /*
   * ============================================================
   * MATÉRIAS AGRUPADAS
   * ============================================================
   */

  const materiasAgrupadas = ITINERARIOS_CATALOGO
    .map((itinerario) => ({
      nome: itinerario.nome,

      materias: itinerario.materias.filter((materia) =>
        materiasSelecionadas.includes(materia)
      ),
    }))
    .filter(
      (itinerario) => itinerario.materias.length > 0
    );

  /*
   * ============================================================
   * ESTATÍSTICAS EXIBIDAS
   * ============================================================
   */

  const estatisticasExibidas = estatisticas.map((item) => {
    if (item.label === "Avaliação Média") {
      return {
        ...item,

        numero:
          avaliacaoMedia !== null
            ? avaliacaoMedia.toFixed(1)
            : "0.0",

        destaque:
          totalAvaliacoes > 0
            ? `${totalAvaliacoes} avaliação${
                totalAvaliacoes !== 1 ? "ões" : ""
              }`
            : "Você ainda não foi avaliado",
      };
    }

    if (item.label === "Aulas Concluídas") {
      return {
        ...item,

        numero: String(aulasConcluidas),

        destaque:
          aulasConcluidas > 0
            ? "Continue assim!"
            : "Comece a aprender!",
      };
    }

    if (item.label === "Aulas Agendadas") {
      return {
        ...item,

        numero: String(aulasAgendadas),

        destaque:
          aulasAgendadas > 0
            ? "Próximas aulas"
            : "Nenhuma agendada",
      };
    }

    return item;
  });

  /*
   * ============================================================
   * TELA
   * ============================================================
   */

  return (
    <View style={styles.container}>
      <ScrollView>
        {/* HEADER */}
        <View style={styles.Header}>
          <View style={styles.HeaderContent}>
            <Pressable
              style={styles.BotaoVoltar}
              onPress={handleVoltarLogin}
            >
              <Ionicons
                name="arrow-back"
                size={22}
                color="white"
              />
            </Pressable>

            <Text style={styles.HeaderTitulo}>
              Perfil Aluno
            </Text>

            <Ionicons
              name="notifications-outline"
              size={22}
              color="white"
            />
          </View>
        </View>

        {/* FOTO */}
        <View style={styles.AvatarWrapper}>
          <FotoPerfil
            theme={themeAluno}
            tipo="aluno"
          />
        </View>

        <View style={styles.Conteudo}>
          {/* NOME */}
          <Text style={styles.Nome}>
            {aluno.nome}
          </Text>

          {/* SOBRE MIM */}
          <View style={styles.SobreMim}>
            <Ionicons
              name="person-circle-outline"
              size={22}
              color={themeAluno.primary}
            />

            <Text>Sobre mim:</Text>
          </View>

          {/* BIO */}
          <View style={styles.Bio}>
            {editandoBio ? (
              <TextInput
                value={bioTexto}
                onChangeText={setBioTexto}
                onBlur={() => setEditandoBio(false)}
                autoFocus
              />
            ) : (
              <Pressable
                onPress={() => setEditandoBio(true)}
              >
                <Text>{bioTexto}</Text>
              </Pressable>
            )}
          </View>

          {/* INFORMAÇÕES PESSOAIS */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons
                  name="person-outline"
                  size={20}
                  color={themeAluno.primary}
                />

                <Text style={styles.CardTitulo}>
                  Informações pessoais
                </Text>
              </View>
            </View>

            <View style={styles.InfoBox}>
              {/* MATRÍCULA */}
              <View style={styles.InfoItem}>
                <Ionicons
                  name="card-outline"
                  size={20}
                  color={themeAluno.primary}
                />

                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>
                    Matrícula
                  </Text>

                  <Text style={styles.InfoValor}>
                    {aluno.matricula}
                  </Text>
                </View>
              </View>

              {/* IDADE */}
              <View style={styles.InfoItem}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={themeAluno.primary}
                />

                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>
                    Idade
                  </Text>

                  <Text style={styles.InfoValor}>
                    {aluno.idade} anos
                  </Text>
                </View>
              </View>
            </View>
          </View>

          {/* ESTATÍSTICAS */}
          <View style={styles.linhaEstatisticas}>
            {estatisticasExibidas.map((item) => (
              <View
                key={item.label}
                style={styles.cardEstatistica}
              >
                <Text style={styles.iconeEstatistica}>
                  {item.icone}
                </Text>

                <Text style={styles.numeroEstatistica}>
                  {item.numero}
                </Text>

                <Text style={styles.labelEstatistica}>
                  {item.label}
                </Text>

                <Text style={styles.destaqueEstatistica}>
                  {item.destaque}
                </Text>
              </View>
            ))}
          </View>

          {/* MATÉRIAS */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons
                  name="book-outline"
                  size={20}
                  color={themeAluno.primary}
                />

                <Text style={styles.CardTitulo}>
                  Matérias com dificuldade
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  setModalMateriasVisivel(true)
                }
              >
                <Ionicons
                  name="add-circle-outline"
                  size={24}
                  color={themeAluno.primary}
                />
              </Pressable>
            </View>

            {materiasAgrupadas.length === 0 ? (
              <Text style={styles.semInfo}>
                Nenhuma matéria selecionada ainda.
              </Text>
            ) : (
              materiasAgrupadas.map((itinerario) => (
                <View
                  key={itinerario.nome}
                  style={styles.ItinerarioSecao}
                >
                  <Text style={styles.ItinerarioNome}>
                    {itinerario.nome}
                  </Text>

                  <View style={styles.Materias}>
                    {itinerario.materias.map((materia) => (
                      <View
                        key={materia}
                        style={styles.MateriaChip}
                      >
                        <Text style={styles.MateriaTexto}>
                          {materia}
                        </Text>
                      </View>
                    ))}
                  </View>
                </View>
              ))
            )}
          </View>

          {/* MODAL DE MATÉRIAS */}
          <Modal
            visible={modalMateriasVisivel}
            animationType="slide"
            transparent
          >
            <View style={styles.ModalFundo}>
              <View style={styles.ModalConteudo}>
                <Text style={styles.CardTitulo}>
                  Editar matérias
                </Text>

                <ScrollView
                  style={{
                    maxHeight: 400,
                    marginTop: 12,
                  }}
                >
                  {ITINERARIOS_CATALOGO.map(
                    (itinerario) => {
                      const aberto =
                        itinerarioAberto ===
                        itinerario.nome;

                      return (
                        <View
                          key={itinerario.nome}
                          style={styles.itinerarioBloco}
                        >
                          <Pressable
                            style={
                              styles.itinerarioCabecalho
                            }
                            onPress={() =>
                              toggleItinerario(
                                itinerario.nome
                              )
                            }
                          >
                            <Text
                              style={
                                styles.itinerarioTexto
                              }
                            >
                              {itinerario.nome}
                            </Text>

                            <Text>
                              {aberto ? "▲" : "▼"}
                            </Text>
                          </Pressable>

                          {aberto && (
                            <View
                              style={
                                styles.itinerarioMaterias
                              }
                            >
                              {itinerario.materias.map(
                                (materia) => {
                                  const selecionada =
                                    materiasSelecionadas.includes(
                                      materia
                                    );

                                  return (
                                    <Pressable
                                      key={materia}
                                      style={[
                                        styles.MateriaChip,
                                        selecionada && {
                                          backgroundColor:
                                            themeAluno.primary,
                                        },
                                      ]}
                                      onPress={() =>
                                        toggleMateria(
                                          materia
                                        )
                                      }
                                    >
                                      <Text
                                        style={[
                                          styles.MateriaTexto,
                                          selecionada && {
                                            color: "#fff",
                                          },
                                        ]}
                                      >
                                        {materia}
                                      </Text>
                                    </Pressable>
                                  );
                                }
                              )}
                            </View>
                          )}
                        </View>
                      );
                    }
                  )}
                </ScrollView>

                <View style={styles.linhaBotoesModal}>
                  <Pressable
                    style={styles.botaoSecundario}
                    onPress={() =>
                      setModalMateriasVisivel(false)
                    }
                  >
                    <Text
                      style={
                        styles.textoBotaoSecundario
                      }
                    >
                      Cancelar
                    </Text>
                  </Pressable>

                  <Pressable
                    style={styles.botaoPrimario}
                    onPress={() =>
                      setModalMateriasVisivel(false)
                    }
                  >
                    <Text
                      style={styles.textoBotaoPrimario}
                    >
                      Salvar
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* PRÓXIMAS AULAS */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons
                  name="calendar-outline"
                  size={20}
                  color={themeAluno.primary}
                />

                <Text style={styles.CardTitulo}>
                  Próximas Aulas
                </Text>
              </View>

              <Pressable
                onPress={() =>
                  router.push("/agenda-aluno")
                }
              >
                <Text style={styles.CardLink}>
                  Ver agenda →
                </Text>
              </Pressable>
            </View>

            {proximasAulas.length === 0 ? (
              <Text style={styles.semInfo}>
                Nenhuma aula agendada ainda.
              </Text>
            ) : (
              proximasAulas.map((aula, index) => {
                const dataHora = new Date(
                  aula.dataHoraAgendada
                );

                const dataFormatada =
                  dataHora.toLocaleDateString(
                    "pt-BR",
                    {
                      day: "2-digit",
                      month: "short",
                    }
                  );

                const horaFormatada =
                  dataHora.toLocaleTimeString(
                    "pt-BR",
                    {
                      hour: "2-digit",
                      minute: "2-digit",
                    }
                  );

                return (
                  <View
                    key={aula._id ?? index}
                    style={styles.linhaAula}
                  >
                    <View style={styles.infoAula}>
                      <Text
                        style={styles.nomeAula}
                      >
                        {aula.materia ??
                          aula.tutorId
                            ?.materiasLecionadas?.[0] ??
                          "Matéria"}
                      </Text>

                      <Text
                        style={styles.nomeTutor}
                      >
                        com{" "}
                        {aula.tutorId?.nome ??
                          "Tutor"}
                      </Text>
                    </View>

                    <View style={styles.dataAula}>
                      <Text
                        style={styles.textoData}
                      >
                        {dataFormatada}
                      </Text>

                      <Text
                        style={styles.textoHora}
                      >
                        {horaFormatada}
                      </Text>
                    </View>
                  </View>
                );
              })
            )}
          </View>

          {/* AVALIAÇÕES */}
          <SecaoAvaliacoes theme={themeAluno} />
        </View>
      </ScrollView>

      {/* MENU INFERIOR */}
      <BottomNavBar
        theme={themeAluno}
        perfil="aluno"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eef7f0",
  },

  Header: {
    backgroundColor: themeAluno.primary,
    paddingTop: 48,
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

  AvatarWrapper: {
    alignItems: "center",
    marginTop: -65,
    zIndex: 2,
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
    borderColor: themeAluno.primary,
    borderRadius: 10,
    padding: 10,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 16,
  },

  Conteudo: {
    paddingHorizontal: 16,
    paddingBottom: 90,
  },

  Card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
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
    color: themeAluno.primary,
    fontSize: 13,
    fontWeight: "500",
  },

  InfoBox: {
    flexDirection: "row",
    backgroundColor: themeAluno.primaryLight,
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

  linhaEstatisticas: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 16,
  },

  cardEstatistica: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    gap: 4,
    backgroundColor: "white",
  },

  iconeEstatistica: {
    fontSize: 20,
  },

  numeroEstatistica: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#2b2b2b",
  },

  labelEstatistica: {
    fontSize: 12,
    color: "#2b2b2b",
  },

  destaqueEstatistica: {
    fontSize: 11,
    color: themeAluno.primary,
    fontWeight: "600",
  },

  semInfo: {
    color: "#7a7a7a",
    fontSize: 13,
  },

  Materias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  MateriaChip: {
    backgroundColor: themeAluno.primaryLight,
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  MateriaTexto: {
    color: themeAluno.primary,
    fontWeight: "500",
  },

  ItinerarioSecao: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  ItinerarioNome: {
    fontSize: 12,
    fontWeight: "700",
    color: "#9A96A3",
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 0.4,
  },

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
    borderColor: "#eee",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
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
    color: "#2b2b2b",
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
    backgroundColor: themeAluno.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },

  textoBotaoPrimario: {
    color: "white",
    fontWeight: "bold",
  },

  linhaAula: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 8,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },

  infoAula: {
    flex: 1,
  },

  nomeAula: {
    fontSize: 13,
    fontWeight: "600",
    color: "#2b2b2b",
  },

  nomeTutor: {
    fontSize: 12,
    color: "#7a7a7a",
  },

  dataAula: {
    alignItems: "flex-end",
  },

  textoData: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2b2b2b",
  },

  textoHora: {
    fontSize: 11,
    color: "#7a7a7a",
  },
});
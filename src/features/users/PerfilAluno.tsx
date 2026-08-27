import { Pressable, ScrollView, StyleSheet, Text, View, Modal, TextInput } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { themeAluno } from "../../shared/styles/themeAluno";
import { router } from "expo-router";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import SecaoAvaliacoes from "../../shared/components/SecaoAvaliacoes";

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
const estatisticas = [
  { icone: "🎓", numero: "0", label: "Aulas Concluídas", destaque: "Comece a aprender!" },
  { icone: "⭐", numero: "0.0", label: "Avaliação Média", destaque: "Você ainda não foi avaliado" },
  { icone: "📅", numero: "0", label: "Aulas Agendadas", destaque: "Próximas aulas" },
];

const proximasAulas = [
  { id: "1", materia: "Matemática", tutor: "Thailanny Cristina", data: "27 Ago", hora: "15:00 - 17:00" },
  { id: "2", materia: "Física", tutor: "Ricardo Sanchez", data: "28 Ago", hora: "10:00 - 12:00" },
  { id: "3", materia: "Inglês", tutor: "Júlia Oliveira", data: "28 Ago", hora: "15:00 - 16:00" },
];

export default function PerfilAluno() {
  const { usuario, sair } = useUsuario();

  function handleVoltarLogin() {
    sair();
    router.replace("/login");
  }

  const aluno = {
    nome: usuario?.tipo === 'aluno' ? usuario.nome : "Aluno",
    matricula: usuario?.tipo === 'aluno' ? usuario.matricula : "-",
    idade: usuario?.tipo === 'aluno' ? usuario.idade : "-",
    bio: usuario?.tipo === 'aluno' ? usuario.bio : "",
  };

  const materiasDoAluno = usuario?.tipo === 'aluno' ? usuario.materias : [];

  const [bioTexto, setBioTexto] = useState(aluno.bio || "Toque para adicionar uma bio");
  const [editandoBio, setEditandoBio] = useState(false);

  const [modalMateriasVisivel, setModalMateriasVisivel] = useState(false);
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(null);
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>(materiasDoAluno);

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
            <Text style={styles.HeaderTitulo}>Perfil Aluno</Text>
            <Ionicons name="notifications-outline" size={22} color="white" />
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
          <Text style={styles.Nome}>{aluno.nome}</Text>
          <View style={styles.SobreMim}>
            <Ionicons name="person-circle-outline" size={22} color={themeAluno.primary} />
            <Text>Sobre mim:</Text>
          </View>

          <View style={styles.Bio}>
            {editandoBio ? (
              <TextInput
                value={bioTexto}
                onChangeText={setBioTexto}
                onBlur={() => setEditandoBio(false)}
                autoFocus
              />
            ) : (
              <Pressable onPress={() => setEditandoBio(true)}>
                <Text>{bioTexto}</Text>
              </Pressable>
            )}
          </View>

          {/* Informações pessoais */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="person-outline" size={20} color={themeAluno.primary} />
                <Text style={styles.CardTitulo}>Informações pessoais</Text>
              </View>
            </View>

            <View style={styles.InfoBox}>
              <View style={styles.InfoItem}>
                <Ionicons name="card-outline" size={20} color={themeAluno.primary} />
                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>Matrícula</Text>
                  <Text style={styles.InfoValor}>{aluno.matricula}</Text>
                </View>
              </View>

              <View style={styles.InfoItem}>
                <Ionicons name="calendar-outline" size={20} color={themeAluno.primary} />
                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>Idade</Text>
                  <Text style={styles.InfoValor}>{aluno.idade} anos</Text>
                </View>
              </View>
            </View>
          </View>

          {/* Estatísticas */}
          <View style={styles.linhaEstatisticas}>
            {estatisticas.map((item) => (
              <View key={item.label} style={styles.cardEstatistica}>
                <Text style={styles.iconeEstatistica}>{item.icone}</Text>
                <Text style={styles.numeroEstatistica}>{item.numero}</Text>
                <Text style={styles.labelEstatistica}>{item.label}</Text>
                <Text style={styles.destaqueEstatistica}>{item.destaque}</Text>
              </View>
            ))}
          </View>

          {/* Matérias com dificuldade */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="book-outline" size={20} color={themeAluno.primary} />
                <Text style={styles.CardTitulo}>Matérias com dificuldade</Text>
              </View>
              <Pressable onPress={() => setModalMateriasVisivel(true)}>
                <Ionicons name="add-circle-outline" size={24} color={themeAluno.primary} />
              </Pressable>
            </View>

            {materiasAgrupadas.length === 0 ? (
              <Text style={styles.semInfo}>Nenhuma matéria selecionada ainda.</Text>
            ) : (
              materiasAgrupadas.map((itinerario) => (
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
              ))
            )}
          </View>

          {/* Modal de edição de matérias */}
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
                                  style={[styles.MateriaChip, selecionada && { backgroundColor: themeAluno.primary }]}
                                  onPress={() => toggleMateria(materia)}
                                >
                                  <Text style={[styles.MateriaTexto, selecionada && { color: "#fff" }]}>
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
                  <Pressable style={styles.botaoSecundario} onPress={() => setModalMateriasVisivel(false)}>
                    <Text style={styles.textoBotaoSecundario}>Cancelar</Text>
                  </Pressable>
                  <Pressable style={styles.botaoPrimario} onPress={() => setModalMateriasVisivel(false)}>
                    <Text style={styles.textoBotaoPrimario}>Salvar</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>

          {/* Próximas Aulas */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="calendar-outline" size={20} color={themeAluno.primary} />
                <Text style={styles.CardTitulo}>Próximas Aulas</Text>
              </View>
              <Pressable onPress={() => router.push("/agenda-aluno")}>
                <Text style={styles.CardLink}>Ver agenda →</Text>
              </Pressable>
            </View>

            {proximasAulas.map((aula) => (
              <View key={aula.id} style={styles.linhaAula}>
                <View style={styles.infoAula}>
                  <Text style={styles.nomeAula}>{aula.materia}</Text>
                  <Text style={styles.nomeTutor}>com {aula.tutor}</Text>
                </View>
                <View style={styles.dataAula}>
                  <Text style={styles.textoData}>{aula.data}</Text>
                  <Text style={styles.textoHora}>{aula.hora}</Text>
                </View>
              </View>
            ))}
          </View>

          <SecaoAvaliacoes theme={themeAluno} />
        </View>
      </ScrollView>
      <BottomNavBar theme={themeAluno} perfil="aluno" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#eef7f0" },
  Header: {
    backgroundColor: themeAluno.primary,
    paddingTop: 48,
    paddingHorizontal: 16,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
  },
  HeaderContent: { width: "100%", flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  BotaoVoltar: {
    backgroundColor: "rgba(255,255,255,0.2)", width: 44, height: 44, borderRadius: 44,
    justifyContent: "center", alignItems: "center",
  },
  HeaderTitulo: { fontSize: 18, color: "white", fontWeight: "600" },
  AvatarWrapper: { alignItems: "center", marginTop: -65, zIndex: 2 },
  Avatar: {
    width: 130, height: 130, borderRadius: 65, backgroundColor: "white",
    justifyContent: "center", alignItems: "center",
    shadowColor: "#000", shadowOpacity: 0.15, shadowRadius: 8, shadowOffset: { width: 0, height: 3 }, elevation: 5,
  },
  CameraBadge: {
    position: "absolute", right: 0, bottom: 0, width: 36, height: 36, borderRadius: 36,
    backgroundColor: themeAluno.primary, justifyContent: "center", alignItems: "center",
    borderWidth: 3, borderColor: "white",
  },
  Nome: { fontSize: 22, fontWeight: "bold", color: "#2b2b2b", marginTop: 12, marginBottom: 5, textAlign: "center" },
  SobreMim: { justifyContent: "center", alignItems: "center", gap: 5, width: "100%", marginBottom: 5, flexDirection: "row" },
  Bio: {
    borderWidth: 1, borderColor: themeAluno.primary, borderRadius: 10, padding: 10,
    marginLeft: 10, marginRight: 10, marginBottom: 16,
  },
  Conteudo: { paddingHorizontal: 16, paddingBottom: 90 },
  Card: { backgroundColor: "white", borderRadius: 16, padding: 16, marginBottom: 16 },
  CardHeader: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginBottom: 14 },
  CardHeaderEsquerda: { flexDirection: "row", alignItems: "center", gap: 8 },
  CardTitulo: { fontSize: 16, fontWeight: "600", color: "#2b2b2b" },
  CardLink: { color: themeAluno.primary, fontSize: 13, fontWeight: "500" },
  InfoBox: { flexDirection: "row", backgroundColor: themeAluno.primaryLight, borderRadius: 12, padding: 14 },
  InfoItem: { flex: 1, flexDirection: "row", gap: 8, alignItems: "center" },
  InfoTextos: { gap: 2 },
  InfoLabel: { fontSize: 12, color: "#7a7a7a" },
  InfoValor: { fontSize: 15, fontWeight: "600", color: "#2b2b2b" },
  linhaEstatisticas: { flexDirection: "row", gap: 12, marginBottom: 16 },
  cardEstatistica: { flex: 1, borderRadius: 16, padding: 12, gap: 4, backgroundColor: "white" },
  iconeEstatistica: { fontSize: 20 },
  numeroEstatistica: { fontSize: 20, fontWeight: "bold", color: "#2b2b2b" },
  labelEstatistica: { fontSize: 12, color: "#2b2b2b" },
  destaqueEstatistica: { fontSize: 11, color: themeAluno.primary, fontWeight: "600" },
  semInfo: { color: "#7a7a7a", fontSize: 13 },
  Materias: { flexDirection: "row", flexWrap: "wrap", gap: 10 },
  MateriaChip: { backgroundColor: themeAluno.primaryLight, paddingVertical: 8, paddingHorizontal: 14, borderRadius: 20 },
  MateriaTexto: { color: themeAluno.primary, fontWeight: "500" },
  ItinerarioSecao: { marginTop: 16, paddingTop: 12, borderTopWidth: 1, borderTopColor: "#eee" },
  ItinerarioNome: { fontSize: 12, fontWeight: "700", color: "#9A96A3", marginBottom: 10, textTransform: "uppercase", letterSpacing: 0.4 },
  ModalFundo: { flex: 1, backgroundColor: "rgba(0,0,0,0.4)", justifyContent: "flex-end" },
  ModalConteudo: { backgroundColor: "white", borderTopLeftRadius: 24, borderTopRightRadius: 24, padding: 16, maxHeight: "80%" },
  itinerarioBloco: { borderWidth: 1, borderColor: "#eee", borderRadius: 8, overflow: "hidden", marginBottom: 8 },
  itinerarioCabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", padding: 12, backgroundColor: themeAluno.primaryLight },
  itinerarioTexto: { fontSize: 14, fontWeight: "600", color: "#2b2b2b", flex: 1 },
  itinerarioMaterias: { flexDirection: "row", flexWrap: "wrap", gap: 8, padding: 12 },
  linhaBotoesModal: { flexDirection: "row", gap: 12, marginTop: 16 },
  botaoSecundario: { flex: 1, borderWidth: 1, borderColor: "#CCC", borderRadius: 8, height: 48, justifyContent: "center", alignItems: "center" },
  textoBotaoSecundario: { color: "#2b2b2b", fontWeight: "600" },
  botaoPrimario: { flex: 1, backgroundColor: themeAluno.primary, borderRadius: 8, height: 48, justifyContent: "center", alignItems: "center" },
  textoBotaoPrimario: { color: "white", fontWeight: "bold" },
  linhaAula: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: 8, borderTopWidth: 1, borderTopColor: "#eee" },
  infoAula: { flex: 1 },
  nomeAula: { fontSize: 13, fontWeight: "600", color: "#2b2b2b" },
  nomeTutor: { fontSize: 12, color: "#7a7a7a" },
  dataAula: { alignItems: "flex-end" },
  textoData: { fontSize: 12, fontWeight: "600", color: "#2b2b2b" },
  textoHora: { fontSize: 11, color: "#7a7a7a" },
});
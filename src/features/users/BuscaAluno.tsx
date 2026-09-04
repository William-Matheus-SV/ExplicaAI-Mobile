import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState, useCallback } from "react";
import { useFocusEffect } from "expo-router";
import { ActivityIndicator,  Modal,  Pressable,  ScrollView,  StyleSheet,  Text,  View, Alert, } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { themeAluno } from "../../shared/styles/themeAluno";
import { listarTutores } from "../../shared/services/tutorService";
import { listarSlotsDoTutor, SlotAgendaReal } from "../../shared/services/agendaService";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import { criarMatch } from "../../shared/services/matchService";

interface SlotAgenda {
  dia: string;
  horario: string;
  duracao: number;
}

interface Tutor {
  _id: string;
  nome: string;
  matricula: string;
  bio: string;
  materiasLecionadas: string[];
  agendaDisponivel: SlotAgenda[];
  status_aprovacao: string;
  ativo: boolean;
}

const materias = [
  "Matemática", "Física", "Química", "Português", "Lógica de Programação", "HTML, CSS e JavaScript", 
  "Banco de Dados","Biologia", "História", "Geografia", "Inglês", "Espanhol", "Filosofia",
];

export default function BuscaAluno() {
  const [materiaSelecionada, setMateriaSelecionada] = useState<string | null>(null);
  const [dropdownAberto, setDropdownAberto] = useState(false);
  const [tutores, setTutores] = useState<Tutor[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [tutorSelecionado, setTutorSelecionado] = useState<Tutor | null>(null);
  const [slotsDoTutor, setSlotsDoTutor] = useState<SlotAgendaReal[]>([]);
  const [carregandoSlots, setCarregandoSlots] = useState(false);
  const { token } = useUsuario();
  const [agendando, setAgendando] = useState(false);


  async function abrirPerfilTutor(tutor: Tutor) {
    setTutorSelecionado(tutor);
    setCarregandoSlots(true);
    setSlotsDoTutor([]);

    try {
      const slots = await listarSlotsDoTutor(tutor._id);
      setSlotsDoTutor(slots);
    } catch (e) {
      setSlotsDoTutor([]);
    } finally {
      setCarregandoSlots(false);
    }
  }
  
  useFocusEffect(
  useCallback(() => {
    async function carregarTutores() {
      try {
        const dados = await listarTutores();
        const tutoresAprovados = dados.filter(
          (t: Tutor) => t.status_aprovacao === "aprovado" && t.ativo === true
        );
        setTutores(tutoresAprovados);
      } catch (e: any) {
        setErro(e.message || "Não foi possível carregar os tutores.");
      } finally {
        setCarregando(false);
      }
    }

    carregarTutores();
  }, [])
);

  const tutoresFiltrados = materiaSelecionada
    ? tutores.filter((tutor) => tutor.materiasLecionadas?.includes(materiaSelecionada))
    : [];

  async function selecionarHorario(slot: SlotAgendaReal) {
    if (!tutorSelecionado || !token) return;

    setAgendando(true);
    try {
      await criarMatch(tutorSelecionado._id, slot._id, token);

      Alert.alert("Tutoria agendada!", "Seu horário foi reservado com sucesso.");

      // Remove o slot da lista local, já que ele acabou de ser reservado
      setSlotsDoTutor((atuais) => atuais.filter((s) => s._id !== slot._id));
      setTutorSelecionado(null);
    } catch (e: any) {
      Alert.alert("Não foi possível agendar", e.message || "Tente novamente.");
    } finally {
      setAgendando(false);
    }
  }
  return (
    <View style={styles.tela}>
      <LinearGradient colors={themeAluno.gradient} style={styles.cabecalho}>
        <View style={styles.iconeTitulo}>
          <Text style={styles.iconeTituloTexto}>🎓</Text>
        </View>
        <View>
          <Text style={styles.tituloCabecalho}>Buscar Tutor</Text>
          <Text style={styles.subtituloCabecalho}>
            Encontre o tutor ideal para te ajudar!
          </Text>
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.conteudo}>
        <View style={styles.card}>
          <Text style={styles.cardTitulo}>Buscar Tutor por Matéria</Text>
          <Text style={styles.cardDescricao}>
            Selecione a matéria que você precisa e encontre tutores disponíveis.
          </Text>

          <Pressable
            style={styles.dropdown}
            onPress={() => setDropdownAberto(!dropdownAberto)}
          >
            <Text style={styles.dropdownTexto}>
              {materiaSelecionada || "Selecione uma matéria"}
            </Text>
            <Text style={styles.dropdownSeta}>{dropdownAberto ? "▲" : "▼"}</Text>
          </Pressable>

          {dropdownAberto && (
            <View style={styles.listaMaterias}>
              {materias.map((materia) => (
                <Pressable
                  key={materia}
                  style={styles.opcaoMateria}
                  onPress={() => {
                    setMateriaSelecionada(materia);
                    setDropdownAberto(false);
                  }}
                >
                  <Text style={styles.opcaoMateriaTexto}>{materia}</Text>
                </Pressable>
              ))}
            </View>
          )}
        </View>

        <View style={styles.card}>
          <View style={styles.cabecalhoTutores}>
            <Text style={styles.cardTitulo}>Tutores disponíveis</Text>
            {materiaSelecionada && !carregando && (
              <Text style={styles.contagemTutores}>
                {tutoresFiltrados.length} tutores encontrados
              </Text>
            )}
          </View>

          {carregando ? (
            <ActivityIndicator color={themeAluno.primary} style={{ paddingVertical: 16 }} />
          ) : erro ? (
            <Text style={styles.mensagemVazia}>{erro}</Text>
          ) : !materiaSelecionada ? (
            <Text style={styles.mensagemVazia}>
              Selecione uma matéria acima para ver os tutores disponíveis.
            </Text>
          ) : tutoresFiltrados.length === 0 ? (
            <Text style={styles.mensagemVazia}>
              Nenhum tutor encontrado para essa matéria ainda.
            </Text>
          ) : (
            tutoresFiltrados.map((tutor) => (
              <View key={tutor._id} style={styles.cardTutor}>
                <View style={styles.avatarPlaceholder}>
                  <Ionicons name="person" size={32} color="#d9d9e8" />
                </View>

                <View style={styles.infoTutor}>
                  <Text style={styles.nomeTutor}>{tutor.nome}</Text>
                  <Text style={styles.materiaTutor}>
                    {tutor.materiasLecionadas.join(", ")}
                  </Text>

                  <Pressable
                    style={styles.botaoVerPerfil}
                    onPress={() => abrirPerfilTutor(tutor)}
                  >
                    <Text style={styles.botaoVerPerfilTexto}>Ver perfil</Text>
                  </Pressable>
                </View>
              </View>
            ))
          )}
        </View>

        <View style={styles.banner}>
          <View style={styles.bannerIcone}>
            <Text style={styles.bannerIconeTexto}>🛡️</Text>
          </View>
          <View style={styles.bannerTextos}>
            <Text style={styles.bannerTitulo}>Ambiente seguro e confiável</Text>
            <Text style={styles.bannerDescricao}>
              Todos os tutores são verificados e avaliados por alunos reais.
            </Text>
          </View>
        </View>
      </ScrollView>

      <BottomNavBar theme={themeAluno} perfil="aluno" />

      <Modal
        visible={tutorSelecionado !== null}
        transparent
        animationType="fade"
        onRequestClose={() => setTutorSelecionado(null)}
      >
        <Pressable style={styles.modalFundo} onPress={() => setTutorSelecionado(null)}>
          <Pressable style={styles.modalConteudo} onPress={(e) => e.stopPropagation()}>
            {tutorSelecionado && (
              <>
                <Pressable
                  style={styles.modalFechar}
                  onPress={() => setTutorSelecionado(null)}
                >
                  <Text style={styles.modalFecharTexto}>✕</Text>
                </Pressable>

                <View style={styles.modalAvatarPlaceholder}>
                  <Ionicons name="person" size={40} color="#d9d9e8" />
                </View>

                <Text style={styles.modalNome}>{tutorSelecionado.nome}</Text>
                <Text style={styles.modalMateria}>
                  {tutorSelecionado.materiasLecionadas.join(", ")}
                </Text>

                <Text style={styles.modalBio}>
                  {tutorSelecionado.bio || "Este tutor ainda não escreveu uma bio."}
                </Text>

                <Text style={styles.modalSecaoTitulo}>Horários disponíveis</Text>

                <ScrollView style={styles.modalHorariosLista}>
                  {carregandoSlots ? (
                    <ActivityIndicator color={themeAluno.primary} />
                  ) : slotsDoTutor.length === 0 ? (
                    <Text style={{ color: themeAluno.textSecondary, fontSize: 13 }}>
                      Este tutor não possui horários disponíveis no momento.
                    </Text>
                  ) : (
                    slotsDoTutor.map((slot) => {
                      const data = new Date(slot.dataHorarioInicio);
                      const dataFormatada = data.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
                      const horaFormatada = data.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
                      return (
                        <Pressable key={slot._id} style={styles.modalHorarioItem} onPress={() => selecionarHorario(slot)} disabled={agendando}>
                          <Text style={styles.modalHorarioDia}>{dataFormatada}</Text>
                          <Text style={styles.modalHorarioTexto}>
                            {horaFormatada} ({slot.duracao}h)
                          </Text>
                        </Pressable>
                      );
                    })
                  )}
                </ScrollView>
              </>
            )}
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: themeAluno.background },
  cabecalho: {
    paddingTop: 48, paddingBottom: 24, paddingHorizontal: 24,
    flexDirection: "row", alignItems: "center", gap: 14,
  },
  iconeTitulo: {
    width: 56, height: 56, borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)", justifyContent: "center", alignItems: "center",
  },
  iconeTituloTexto: { fontSize: 26 },
  tituloCabecalho: { color: themeAluno.white, fontSize: 24, fontWeight: "bold" },
  subtituloCabecalho: { color: "rgba(255,255,255,0.9)", fontSize: 13, marginTop: 2 },
  conteudo: { padding: 16, gap: 16, paddingBottom: 32 },
  card: { backgroundColor: themeAluno.white, borderRadius: 16, padding: 16, gap: 8 },
  cardTitulo: { fontSize: 18, fontWeight: "bold", color: themeAluno.primary },
  cardDescricao: { fontSize: 13, color: themeAluno.textSecondary, marginBottom: 4 },
  dropdown: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    borderWidth: 1.5, borderColor: themeAluno.primary, borderRadius: 10, padding: 14,
  },
  dropdownTexto: { fontSize: 14, color: themeAluno.text },
  dropdownSeta: { fontSize: 12, color: themeAluno.primary },
  listaMaterias: { borderWidth: 1, borderColor: themeAluno.border, borderRadius: 8, overflow: "hidden" },
  opcaoMateria: { padding: 12, borderBottomWidth: 1, borderBottomColor: "#EEE" },
  opcaoMateriaTexto: { fontSize: 14, color: themeAluno.text },
  cabecalhoTutores: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 4 },
  contagemTutores: { fontSize: 12, color: themeAluno.textSecondary },
  mensagemVazia: { fontSize: 13, color: themeAluno.textSecondary, textAlign: "center", paddingVertical: 16 },
  cardTutor: {
    flexDirection: "row", gap: 12, paddingTop: 12,
    borderTopWidth: 1, borderTopColor: "#EEE",
  },
  avatarPlaceholder: {
    width: 64, height: 64, borderRadius: 32, backgroundColor: "#f0f0f0",
    justifyContent: "center", alignItems: "center",
  },
  infoTutor: { flex: 1, gap: 3 },
  nomeTutor: { fontSize: 16, fontWeight: "bold", color: themeAluno.text },
  materiaTutor: { fontSize: 13, color: themeAluno.textSecondary, marginBottom: 6 },
  botaoVerPerfil: {
    backgroundColor: themeAluno.primary, borderRadius: 8, paddingVertical: 8,
    alignItems: "center", alignSelf: "flex-start", paddingHorizontal: 20,
  },
  botaoVerPerfilTexto: { color: themeAluno.white, fontWeight: "bold", fontSize: 13 },
  banner: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: themeAluno.white, borderRadius: 16, padding: 16,
  },
  bannerIcone: {
    width: 48, height: 48, borderRadius: 24, backgroundColor: themeAluno.primaryLight,
    justifyContent: "center", alignItems: "center",
  },
  bannerIconeTexto: { fontSize: 22 },
  bannerTextos: { flex: 1, gap: 2 },
  bannerTitulo: { fontSize: 14, fontWeight: "bold", color: themeAluno.primary },
  bannerDescricao: { fontSize: 12, color: themeAluno.textSecondary },
  modalFundo: { flex: 1, backgroundColor: "rgba(0,0,0,0.5)", justifyContent: "center", alignItems: "center" },
  modalConteudo: {
    width: "88%", maxHeight: "75%", backgroundColor: themeAluno.white,
    borderRadius: 16, padding: 20, alignItems: "center",
  },
  modalFechar: {
    position: "absolute", top: 12, right: 12, width: 28, height: 28, borderRadius: 14,
    backgroundColor: "#F0F0F0", justifyContent: "center", alignItems: "center", zIndex: 1,
  },
  modalFecharTexto: { fontSize: 14, color: themeAluno.text },
  modalAvatarPlaceholder: {
    width: 88, height: 88, borderRadius: 44, backgroundColor: "#f0f0f0",
    justifyContent: "center", alignItems: "center", marginTop: 8, marginBottom: 8,
  },
  modalNome: { fontSize: 18, fontWeight: "bold", color: themeAluno.text },
  modalMateria: { fontSize: 13, color: themeAluno.textSecondary, marginBottom: 12 },
  modalBio: { fontSize: 13, color: themeAluno.text, textAlign: "center", marginBottom: 16 },
  modalSecaoTitulo: {
    fontSize: 14, fontWeight: "bold", color: themeAluno.text,
    alignSelf: "flex-start", marginBottom: 8,
  },
  modalHorariosLista: { width: "100%", maxHeight: 150 },
  modalHorarioItem: {
    flexDirection: "row", justifyContent: "space-between", alignItems: "center",
    backgroundColor: themeAluno.primaryLight, borderRadius: 8, padding: 12, marginBottom: 8,
  },
  modalHorarioDia: { fontSize: 13, fontWeight: "bold", color: themeAluno.primary },
  modalHorarioTexto: { fontSize: 13, color: themeAluno.text },
});
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
  Modal,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { themeAluno } from "../../shared/styles/themeAluno";

export default function BuscaAluno() {
  const [materiaSelecionada, setMateriaSelecionada] = useState<string | null>(
    null,
  );
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const materias = [
    "Matemática",
    "Física",
    "Química",
    "Português",
    "Programação",
    "Biologia",
    "História",
    "Geografia",
    "Inglês",
    "Filosofia",
  ];

  const tutores = [
    {
      id: "1",
      nome: "João Silva",
      materia: "Matemática",
      nota: 4.8,
      experienciaAnos: 1,
      totalAlunos: 12,
      formacao: "Eng. Matemática - UFPE",
      fotoUrl: "https://i.pravatar.cc/150?img=12",
      bio: "Ajudo alunos a entender matemática de forma simples e prática, focando no ENEM e vestibulares.",
      horariosLivres: [
        { dia: "Segunda", horario: "08:00 - 10:00" },
        { dia: "Terça", horario: "09:00 - 11:00" },
        { dia: "Quarta", horario: "13:00 - 15:00" },
      ],
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      materia: "Matemática",
      nota: 4.7,
      experienciaAnos: 2,
      totalAlunos: 20,
      formacao: "Lic. Matemática - UFRPE",
      fotoUrl: "https://i.pravatar.cc/150?img=5",
      bio: "Professora com foco em ensino fundamental e médio. Gosto de usar exemplos do dia a dia para facilitar o aprendizado.",
      horariosLivres: [
        { dia: "Terça", horario: "09:00 - 11:00" },
        { dia: "Sexta", horario: "15:00 - 17:00" },
        { dia: "Quarta", horario: "08:00 - 10:00" },
      ],
    },
    {
      id: "3",
      nome: "Lucas Santos",
      materia: "Programação",
      nota: 4.7,
      experienciaAnos: 4,
      totalAlunos: 30,
      formacao: "Ciência da Computação - UFPE",
      fotoUrl: "https://i.pravatar.cc/150?img=13",
      bio: "Formado em Ciência da Computação, une matemática e lógica de programação nas aulas.",
      horariosLivres: [
        { dia: "Segunda", horario: "10:00 - 12:00" },
        { dia: "Quinta", horario: "08:00 - 10:00" },
      ],
    },
    {
      id: "4",
      nome: "Beatriz Costa",
      materia: "Física",
      nota: 4.9,
      experienciaAnos: 5,
      totalAlunos: 40,
      formacao: "Física - UFPE",
      fotoUrl: "https://i.pravatar.cc/150?img=9",
      bio: "Mestre em Física, gosto de explicar conceitos abstratos com experimentos práticos e simulações.",
      horariosLivres: [
        { dia: "Terça", horario: "08:00 - 10:00" },
        { dia: "Quinta", horario: "14:00 - 16:00" },
      ],
    },
    {
      id: "5",
      nome: "Rafael Almeida",
      materia: "Química",
      nota: 4.6,
      experienciaAnos: 2,
      totalAlunos: 15,
      formacao: "Química - UFRPE",
      fotoUrl: "https://i.pravatar.cc/150?img=15",
      bio: "Foco em química orgânica e preparação para o ENEM, com resumos visuais e mapas mentais.",
      horariosLivres: [
        { dia: "Segunda", horario: "14:00 - 16:00" },
        { dia: "Sexta", horario: "10:00 - 12:00" },
      ],
    },
    {
      id: "6",
      nome: "Clara Martins",
      materia: "Português",
      nota: 4.8,
      experienciaAnos: 6,
      totalAlunos: 55,
      formacao: "Letras - UFPE",
      fotoUrl: "https://i.pravatar.cc/150?img=20",
      bio: "Especialista em redação e interpretação de texto para o ENEM e vestibulares.",
      horariosLivres: [
        { dia: "Quarta", horario: "08:00 - 10:00" },
        { dia: "Sexta", horario: "14:00 - 16:00" },
      ],
    },
  ];

  const tutoresFiltrados = materiaSelecionada
    ? tutores.filter((tutor) => tutor.materia === materiaSelecionada)
    : tutores;

  const [tutorSelecionado, setTutorSelecionado] = useState<
    (typeof tutores)[0] | null
  >(null);
  const [horarioSelecionado, setHorarioSelecionado] = useState<{
    dia: string;
    horario: string;
  } | null>(null);

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
            <Text style={styles.dropdownSeta}>
              {dropdownAberto ? "▲" : "▼"}
            </Text>
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
            <Text style={styles.contagemTutores}>
              {tutoresFiltrados.length} tutores encontrados
            </Text>
          </View>

          {tutoresFiltrados.map((tutor) => (
            <View key={tutor.id} style={styles.cardTutor}>
              <Image source={{ uri: tutor.fotoUrl }} style={styles.fotoTutor} />

              <View style={styles.infoTutor}>
                <Text style={styles.nomeTutor}>{tutor.nome}</Text>
                <Text style={styles.materiaTutor}>{tutor.materia}</Text>
                <Text style={styles.notaTutor}>⭐ {tutor.nota}</Text>
                <Text style={styles.formacaoTutor}>🎓 {tutor.formacao}</Text>

                <Pressable
                  style={styles.botaoVerPerfil}
                  onPress={() => {
                    setTutorSelecionado(tutor);
                    setHorarioSelecionado(null);
                  }}
                >
                  <Text style={styles.botaoVerPerfilTexto}>Ver perfil</Text>
                </Pressable>
              </View>
            </View>
          ))}
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
        <Pressable
          style={styles.modalFundo}
          onPress={() => setTutorSelecionado(null)}
        >
          <Pressable
            style={styles.modalConteudo}
            onPress={(e) => e.stopPropagation()}
          >
            {tutorSelecionado && (
              <ScrollView
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
              >
                <View style={styles.modalTopo}>
                  <Pressable
                    style={styles.modalFechar}
                    onPress={() => setTutorSelecionado(null)}
                  >
                    <Text style={styles.modalFecharTexto}>✕</Text>
                  </Pressable>

                  <View style={styles.modalCabecalhoLinha}>
                    <Image
                      source={{ uri: tutorSelecionado.fotoUrl }}
                      style={styles.modalFoto}
                    />

                    <View style={styles.modalInfoTexto}>
                      <Text style={styles.modalNome}>
                        {tutorSelecionado.nome}
                      </Text>
                      <Text style={styles.modalMateria}>
                        🎓 {tutorSelecionado.materia}
                      </Text>
                      <Text style={styles.modalBio} numberOfLines={3}>
                        {tutorSelecionado.bio}
                      </Text>
                    </View>
                  </View>

                  <View style={styles.modalStatsLinha}>
                    <View style={styles.modalStatItem}>
                      <Text style={styles.modalStatIcone}>🎓</Text>
                      <Text style={styles.modalStatNumero}>
                        {tutorSelecionado.experienciaAnos}
                      </Text>
                      <Text style={styles.modalStatLabel}>
                        {tutorSelecionado.experienciaAnos === 1
                          ? "ano"
                          : "anos"}
                      </Text>
                    </View>
                    <View style={styles.modalStatItem}>
                      <Text style={styles.modalStatIcone}>⭐</Text>
                      <Text style={styles.modalStatNumero}>
                        {tutorSelecionado.nota}
                      </Text>
                      <Text style={styles.modalStatLabel}>avaliação</Text>
                    </View>
                    <View style={styles.modalStatItem}>
                      <Text style={styles.modalStatIcone}>👤</Text>
                      <Text style={styles.modalStatNumero}>
                        +{tutorSelecionado.totalAlunos}
                      </Text>
                      <Text style={styles.modalStatLabel}>alunos</Text>
                    </View>
                  </View>
                </View>

                <View style={styles.agendaContainer}>
                  <Text style={styles.agendaTituloSimples}>
                    Horários disponíveis
                  </Text>

                  <View style={styles.grade}>
                    <View style={styles.gradeLinha}>
                      <View style={styles.gradeCelulaCanto} />
                      {["SEG", "TER", "QUA", "QUI", "SEX"].map((dia) => (
                        <View key={dia} style={styles.gradeCelulaCabecalho}>
                          <Text style={styles.gradeCabecalhoTexto}>{dia}</Text>
                        </View>
                      ))}
                    </View>

                    {[
                      "08:00 - 10:00",
                      "09:00 - 11:00",
                      "10:00 - 12:00",
                      "13:00 - 15:00",
                      "14:00 - 16:00",
                      "15:00 - 17:00",
                    ].map((horario) => (
                      <View key={horario} style={styles.gradeLinha}>
                        <View style={styles.gradeCelulaHorario}>
                          <Text style={styles.gradeHorarioTexto}>
                            {horario}
                          </Text>
                        </View>

                        {["Segunda", "Terça", "Quarta", "Quinta", "Sexta"].map(
                          (dia) => {
                            const livre = tutorSelecionado.horariosLivres.some(
                              (slot) =>
                                slot.dia === dia && slot.horario === horario,
                            );
                            const selecionado =
                              horarioSelecionado?.dia === dia &&
                              horarioSelecionado?.horario === horario;

                            return (
                              <Pressable
                                key={dia}
                                style={[
                                  styles.gradeCelula,
                                  livre && styles.gradeCelulaLivre,
                                  selecionado && styles.gradeCelulaSelecionada,
                                ]}
                                disabled={!livre}
                                onPress={() =>
                                  setHorarioSelecionado({ dia, horario })
                                }
                              />
                            );
                          },
                        )}
                      </View>
                    ))}
                  </View>

                  {horarioSelecionado && (
                    <View style={styles.resumoAgendamento}>
                      <Text style={styles.resumoTexto}>
                        📅 Aula com {tutorSelecionado.nome}
                      </Text>
                      <Text style={styles.resumoDetalhe}>
                        {horarioSelecionado.dia}-feira •{" "}
                        {horarioSelecionado.horario}
                      </Text>
                    </View>
                  )}
                  <View style={styles.legendaContainer}>
                    <View style={styles.legendaItem}>
                      <View
                        style={[
                          styles.legendaQuadrado,
                          { backgroundColor: themeAluno.primary },
                        ]}
                      />
                      <Text style={styles.legendaTexto}>Livre</Text>
                    </View>
                    <View style={styles.legendaItem}>
                      <View
                        style={[
                          styles.legendaQuadrado,
                          { backgroundColor: themeAluno.accent },
                        ]}
                      />
                      <Text style={styles.legendaTexto}>Selecionado</Text>
                    </View>
                    <View style={styles.legendaItem}>
                      <View
                        style={[
                          styles.legendaQuadrado,
                          styles.legendaQuadradoBranco,
                        ]}
                      />
                      <Text style={styles.legendaTexto}>Indisponível</Text>
                    </View>
                  </View>
                  <Pressable
                    style={[
                      styles.botaoConfirmar,
                      !horarioSelecionado && styles.botaoConfirmarDesabilitado,
                    ]}
                    disabled={!horarioSelecionado}
                    onPress={() => {
                      console.log(
                        "Aula confirmada:",
                        tutorSelecionado.nome,
                        horarioSelecionado,
                      );
                      setTutorSelecionado(null);
                    }}
                  >
                    <Text style={styles.botaoConfirmarTexto}>
                      ✓ Confirmar aula
                    </Text>
                  </Pressable>
                </View>
              </ScrollView>
            )}
          </Pressable>
        </Pressable>
      </Modal>
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
    paddingBottom: 24,
    paddingHorizontal: 24,
    flexDirection: "row",
    alignItems: "center",
    gap: 14,
  },
  iconeTitulo: {
    width: 56,
    height: 56,
    borderRadius: 14,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconeTituloTexto: {
    fontSize: 26,
  },
  tituloCabecalho: {
    color: themeAluno.white,
    fontSize: 24,
    fontWeight: "bold",
  },
  subtituloCabecalho: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
    marginTop: 2,
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
    gap: 8,
  },
  cardTitulo: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeAluno.primary,
  },
  cardDescricao: {
    fontSize: 13,
    color: themeAluno.textSecondary,
    marginBottom: 4,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1.5,
    borderColor: themeAluno.primary,
    borderRadius: 10,
    padding: 14,
  },
  dropdownTexto: {
    fontSize: 14,
    color: themeAluno.text,
  },
  dropdownSeta: {
    fontSize: 12,
    color: themeAluno.primary,
  },
  listaMaterias: {
    borderWidth: 1,
    borderColor: themeAluno.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  opcaoMateria: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  opcaoMateriaTexto: {
    fontSize: 14,
    color: themeAluno.text,
  },
  cabecalhoTutores: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },
  contagemTutores: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  cardTutor: {
    flexDirection: "row",
    gap: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  fotoTutor: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  infoTutor: {
    flex: 1,
    gap: 3,
  },
  nomeTutor: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  materiaTutor: {
    fontSize: 13,
    color: themeAluno.textSecondary,
  },
  notaTutor: {
    fontSize: 13,
    color: themeAluno.text,
  },
  formacaoTutor: {
    fontSize: 12,
    color: themeAluno.textSecondary,
    marginBottom: 6,
  },
  botaoVerPerfil: {
    backgroundColor: themeAluno.primary,
    borderRadius: 8,
    paddingVertical: 8,
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: 20,
  },
  botaoVerPerfilTexto: {
    color: themeAluno.white,
    fontWeight: "bold",
    fontSize: 13,
  },
  banner: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    padding: 16,
  },
  bannerIcone: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: themeAluno.primaryLight,
    justifyContent: "center",
    alignItems: "center",
  },
  bannerIconeTexto: {
    fontSize: 22,
  },
  bannerTextos: {
    flex: 1,
    gap: 2,
  },
  bannerTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeAluno.primary,
  },
  bannerDescricao: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  modalFundo: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalConteudo: {
    width: "90%",
    maxHeight: "85%",
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    padding: 20,
  },
  modalTopo: {
    marginBottom: 4,
  },
  modalCabecalhoLinha: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
  },
  modalFechar: {
    position: "absolute",
    top: -4,
    right: -4,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: "#F0F0F0",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1,
  },
  modalFecharTexto: {
    fontSize: 14,
    color: themeAluno.text,
  },
  modalFoto: {
    width: 64,
    height: 64,
    borderRadius: 32,
  },
  modalInfoTexto: {
    flex: 1,
    justifyContent: "center",
  },
  modalNome: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  modalMateria: {
    fontSize: 12,
    color: themeAluno.textSecondary,
    marginBottom: 4,
  },
  modalBio: {
    fontSize: 11,
    color: themeAluno.text,
  },
  modalStatsLinha: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    backgroundColor: themeAluno.primaryLight,
    borderRadius: 10,
    paddingVertical: 8,
    marginBottom: 8,
  },
  modalStatItem: {
    alignItems: "center",
    gap: 1,
  },
  modalStatIcone: {
    fontSize: 14,
  },
  modalStatNumero: {
    fontSize: 13,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  modalStatLabel: {
    fontSize: 9,
    color: themeAluno.textSecondary,
  },
  agendaContainer: {
    marginTop: 8,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  agendaTituloSimples: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeAluno.text,
    marginBottom: 12,
    textAlign: "center",
  },
  grade: {
    borderWidth: 1,
    borderColor: themeAluno.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  gradeLinha: {
    flexDirection: "row",
  },
  gradeCelulaCanto: {
    width: 46,
    backgroundColor: themeAluno.primaryLight,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: themeAluno.border,
  },
  gradeCelulaCabecalho: {
    flex: 1,
    backgroundColor: themeAluno.primaryLight,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: themeAluno.border,
    paddingVertical: 6,
    alignItems: "center",
  },
  gradeCabecalhoTexto: {
    fontSize: 10,
    fontWeight: "bold",
    color: themeAluno.primary,
  },
  gradeCelulaHorario: {
    width: 46,
    justifyContent: "center",
    alignItems: "center",
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: themeAluno.border,
    paddingVertical: 4,
  },
  gradeHorarioTexto: {
    fontSize: 8,
    color: themeAluno.textSecondary,
    textAlign: "center",
  },
  gradeCelula: {
    flex: 1,
    height: 40,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderColor: themeAluno.border,
    backgroundColor: themeAluno.white,
  },
  gradeCelulaLivre: {
    backgroundColor: themeAluno.primary,
  },
  gradeCelulaSelecionada: {
    backgroundColor: themeAluno.accent,
  },
  resumoAgendamento: {
    backgroundColor: themeAluno.primaryLight,
    borderRadius: 10,
    padding: 12,
    marginTop: 12,
    marginBottom: 8,
  },
  resumoTexto: {
    fontSize: 13,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  resumoDetalhe: {
    fontSize: 12,
    color: themeAluno.textSecondary,
    marginTop: 2,
  },
  botaoConfirmar: {
    backgroundColor: themeAluno.primary,
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    marginTop: 8,
  },
  botaoConfirmarDesabilitado: {
    backgroundColor: "#CCC",
  },
  botaoConfirmarTexto: {
    color: themeAluno.white,
    fontWeight: "bold",
    fontSize: 14,
  },
  legendaContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 12,
  },
  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendaQuadrado: {
    width: 14,
    height: 14,
    borderRadius: 3,
  },
  legendaQuadradoBranco: {
    backgroundColor: themeAluno.white,
    borderWidth: 1,
    borderColor: themeAluno.border,
  },
  legendaTexto: {
    fontSize: 11,
    color: themeAluno.textSecondary,
  },
});

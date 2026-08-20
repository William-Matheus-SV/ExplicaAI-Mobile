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
      nota: 4.9,
      avaliacoes: 128,
      formacao: "Eng. Matemática - UFPE",
      experiencia: "3 anos de experiência",
      fotoUrl: "https://i.pravatar.cc/150?img=12",
      bio: "Apaixonado por ensinar matemática de forma simples e prática. Foco em preparar alunos para o ENEM e vestibulares.",
      horariosLivres: [
        { dia: "Segunda", horario: "08:00 - 10:00" },
        { dia: "Quarta", horario: "14:00 - 16:00" },
      ],
    },
    {
      id: "2",
      nome: "Maria Oliveira",
      materia: "Matemática",
      nota: 4.8,
      avaliacoes: 96,
      formacao: "Lic. Matemática - UFRPE",
      experiencia: "3 anos de experiência",
      fotoUrl: "https://i.pravatar.cc/150?img=5",
      bio: "Professora com foco em ensino fundamental e médio. Gosto de usar exemplos do dia a dia para facilitar o aprendizado.",
      horariosLivres: [
        { dia: "Terça", horario: "09:00 - 11:00" },
        { dia: "Sexta", horario: "15:00 - 17:00" },
      ],
    },
    {
      id: "3",
      nome: "Lucas Santos",
      materia: "Programação",
      nota: 4.7,
      avaliacoes: 72,
      formacao: "Ciência da Computação - UFPE",
      experiencia: "4 anos de experiência",
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
      avaliacoes: 84,
      formacao: "Física - UFPE",
      experiencia: "5 anos de experiência",
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
      avaliacoes: 51,
      formacao: "Química - UFRPE",
      experiencia: "2 anos de experiência",
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
      avaliacoes: 110,
      formacao: "Letras - UFPE",
      experiencia: "6 anos de experiência",
      fotoUrl: "https://i.pravatar.cc/150?img=20",
      bio: "Especialista em redação e interpretação de texto para o ENEM e vestibulares.",
      horariosLivres: [
        { dia: "Quarta", horario: "08:00 - 10:00" },
        { dia: "Sexta", horario: "14:00 - 16:00" },
      ],
    },
  ];
  const [tutorSelecionado, setTutorSelecionado] = useState<
    (typeof tutores)[0] | null
  >(null);
  const tutoresFiltrados = materiaSelecionada
    ? tutores.filter((tutor) => tutor.materia === materiaSelecionada)
    : tutores;

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
                <Text style={styles.notaTutor}>
                  ⭐ {tutor.nota} ({tutor.avaliacoes} avaliações)
                </Text>
                <Text style={styles.formacaoTutor}>🎓 {tutor.formacao}</Text>
                <Text style={styles.experienciaTutor}>
                  🕐 {tutor.experiencia}
                </Text>

                <Pressable
                  style={styles.botaoVerPerfil}
                  onPress={() => setTutorSelecionado(tutor)}
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
              <>
                <Pressable
                  style={styles.modalFechar}
                  onPress={() => setTutorSelecionado(null)}
                >
                  <Text style={styles.modalFecharTexto}>✕</Text>
                </Pressable>

                <Image
                  source={{ uri: tutorSelecionado.fotoUrl }}
                  style={styles.modalFoto}
                />
                <Text style={styles.modalNome}>{tutorSelecionado.nome}</Text>
                <Text style={styles.modalMateria}>
                  {tutorSelecionado.materia}
                </Text>

                <Text style={styles.modalBio}>{tutorSelecionado.bio}</Text>

                <Text style={styles.modalSecaoTitulo}>
                  Horários disponíveis
                </Text>

                <ScrollView style={styles.modalHorariosLista}>
                  {tutorSelecionado.horariosLivres.map((slot, index) => (
                    <Pressable key={index} style={styles.modalHorarioItem}>
                      <Text style={styles.modalHorarioDia}>{slot.dia}</Text>
                      <Text style={styles.modalHorarioTexto}>
                        {slot.horario}
                      </Text>
                    </Pressable>
                  ))}
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
  },
  experienciaTutor: {
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
    width: "88%",
    maxHeight: "75%",
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    padding: 20,
    alignItems: "center",
  },
  modalFechar: {
    position: "absolute",
    top: 12,
    right: 12,
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
    width: 88,
    height: 88,
    borderRadius: 44,
    marginTop: 8,
    marginBottom: 8,
  },
  modalNome: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  modalMateria: {
    fontSize: 13,
    color: themeAluno.textSecondary,
    marginBottom: 12,
  },
  modalBio: {
    fontSize: 13,
    color: themeAluno.text,
    textAlign: "center",
    marginBottom: 16,
  },
  modalSecaoTitulo: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeAluno.text,
    alignSelf: "flex-start",
    marginBottom: 8,
  },
  modalHorariosLista: {
    width: "100%",
    maxHeight: 150,
  },
  modalHorarioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: themeAluno.primaryLight,
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
  },
  modalHorarioDia: {
    fontSize: 13,
    fontWeight: "bold",
    color: themeAluno.primary,
  },
  modalHorarioTexto: {
    fontSize: 13,
    color: themeAluno.text,
  },
});

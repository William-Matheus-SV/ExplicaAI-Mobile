import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Image,
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
    },
    {
      id: "3",
      nome: "Lucas Santos",
      materia: "Matemática",
      nota: 4.7,
      avaliacoes: 72,
      formacao: "Ciência da Computação - UFPE",
      experiencia: "4 anos de experiência",
      fotoUrl: "https://i.pravatar.cc/150?img=13",
    },
  ];

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
              {tutores.length} tutores encontrados
            </Text>
          </View>

          {tutores.map((tutor) => (
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

                <Pressable style={styles.botaoVerPerfil}>
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
});

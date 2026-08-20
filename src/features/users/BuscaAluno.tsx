import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { themeAluno } from "../../shared/styles/themeAluno";

export default function BuscaAluno() {
  const [materiaSelecionada, setMateriaSelecionada] = useState<string | null>(
    null,
  );
  const [dropdownAberto, setDropdownAberto] = useState(false);

  const materias = [
    "Português",
    "Inglês",
    "Artes",
    "Educação Física",
    "Matemática",
    "Física",
    "Química",
    "Biologia",
    "História",
    "Geografia",
    "Filosofia",
    "Sociologia",
    "Lógica de Programação",
    "HTML, CSS e JS",
    "Banco de Dados",
  ];

  return (
    <View style={styles.tela}>
      <LinearGradient colors={themeAluno.gradient} style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>Buscar Tutor</Text>
      </LinearGradient>

      <View style={styles.conteudo}>
        <View style={styles.card}>
          <LinearGradient
            colors={themeAluno.gradient}
            style={styles.cardTitulo}
          >
            <Text style={styles.cardTituloTexto}>Buscar Tutor por Matéria</Text>
          </LinearGradient>

          <Text style={styles.cardDescricao}>
            Encontre tutores disponíveis para te ajudar na matéria que precisa.
          </Text>

          <Pressable
            style={styles.dropdown}
            onPress={() => setDropdownAberto(!dropdownAberto)}
          >
            <Text style={styles.dropdownTexto}>
              {materiaSelecionada || "Selecione uma matéria..."}
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
      </View>

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
    alignItems: "center",
  },
  tituloCabecalho: {
    color: themeAluno.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  conteudo: {
    flex: 1,
    padding: 16,
    gap: 16,
  },
  card: {
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    overflow: "hidden",
    gap: 12,
    paddingBottom: 16,
  },
  cardTitulo: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
  cardTituloTexto: {
    color: themeAluno.white,
    fontSize: 16,
    fontWeight: "bold",
  },
  cardDescricao: {
    fontSize: 13,
    color: themeAluno.textSecondary,
    paddingHorizontal: 16,
  },
  dropdown: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    borderColor: themeAluno.border,
    borderRadius: 8,
    padding: 12,
    marginHorizontal: 16,
  },
  dropdownTexto: {
    fontSize: 14,
    color: themeAluno.text,
  },
  dropdownSeta: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  listaMaterias: {
    marginHorizontal: 16,
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
});

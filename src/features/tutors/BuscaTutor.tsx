import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../../../src/shared/components/BottomNavBar";
import { themeTutor } from "../../../src/shared/styles/themeTutor";

export default function BuscaTutorScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.conteudo}>
        <Ionicons name="construct-outline" size={64} color={themeTutor.primary} />
        <Text style={styles.titulo}>Em breve</Text>
        <Text style={styles.descricao}>
          Estamos preparando essa funcionalidade para tutores.
        </Text>
      </View>
      <BottomNavBar theme={themeTutor} perfil="tutor" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f2fa",
  },
  conteudo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    gap: 12,
    paddingHorizontal: 32,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b2b2b",
  },
  descricao: {
    fontSize: 14,
    color: "#7a7a7a",
    textAlign: "center",
  },
});
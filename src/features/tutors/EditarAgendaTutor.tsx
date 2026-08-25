import { View, Text, ScrollView, Pressable, StyleSheet, StatusBar, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { themeTutor } from "../../shared/styles/themeTutor";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import { useSelecaoHorarios, DIAS } from "../../shared/hooks/useSelecaoHorarios";

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function EditarAgendaTutor() {
  const router = useRouter();
  const { usuario, salvarUsuario } = useUsuario();

  const horariosIniciais = usuario?.tipo === 'tutor' ? usuario.horariosDisponiveis : [];

  const {
    horariosSelecionados,
    duracaoAtiva,
    setDuracaoAtiva,
    horariosGrade,
    estaSelecionado,
    toggleHorario,
  } = useSelecaoHorarios(horariosIniciais);

  function handleVoltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/perfil-tutor");
    }
  }

  function handleSalvar() {
    if (usuario?.tipo !== 'tutor') return;

    salvarUsuario({
      ...usuario,
      horariosDisponiveis: horariosSelecionados,
    });

    Alert.alert("Sucesso", "Sua agenda foi atualizada.");
    router.back();
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <View style={styles.Header}>
          <View style={styles.HeaderContent}>
            <Pressable style={styles.BotaoVoltar} onPress={handleVoltar}>
              <Ionicons name="arrow-back" size={22} color="white" />
            </Pressable>
            <Text style={styles.HeaderTitulo}>Editar Agenda</Text>
            <View style={{ width: 44 }} />
          </View>
        </View>

        <View style={styles.Conteudo}>
          <View style={styles.Card}>
            <Text style={styles.subLabel}>
              Escolha a duração da sessão e toque nos horários em que você está disponível.
            </Text>

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
              <View style={styles.linhaGrade}>
                <View style={styles.celulaRotulo} />
                {DIAS.map((dia) => (
                  <View key={dia} style={styles.celulaCabecalho}>
                    <Text style={styles.textoCabecalho}>{dia}</Text>
                  </View>
                ))}
              </View>

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

          <Pressable style={styles.botaoPrimario} onPress={handleSalvar}>
            <Text style={styles.textoBotaoPrimario}>Salvar Agenda</Text>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f2fa" },
  Header: {
    backgroundColor: "#764ba2",
    paddingTop: statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
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
  HeaderTitulo: { fontSize: 18, color: "white", fontWeight: "600" },
  Conteudo: { padding: 16, gap: 16, paddingBottom: 32 },
  Card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  subLabel: { fontSize: 12, color: themeTutor.textSecondary },
  abasDuracao: { flexDirection: "row", gap: 8 },
  abaDuracao: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeTutor.border,
    alignItems: "center",
  },
  abaDuracaoAtiva: { backgroundColor: themeTutor.primary, borderColor: themeTutor.primary },
  textoAbaDuracao: { color: themeTutor.text, fontWeight: "600" },
  textoAbaDuracaoAtiva: { color: "white" },
  grade: {
    borderWidth: 1,
    borderColor: themeTutor.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  linhaGrade: { flexDirection: "row", borderBottomWidth: 1, borderBottomColor: themeTutor.border },
  celulaRotulo: { width: 90, padding: 6, justifyContent: "center", backgroundColor: themeTutor.primaryLight },
  textoRotulo: { fontSize: 11, color: themeTutor.text },
  celulaCabecalho: { flex: 1, padding: 6, alignItems: "center", backgroundColor: themeTutor.primaryLight },
  textoCabecalho: { fontSize: 12, fontWeight: "600", color: themeTutor.text },
  celulaSlot: { flex: 1, height: 36, borderLeftWidth: 1, borderLeftColor: themeTutor.border, backgroundColor: "white" },
  celulaSlotSelecionada: { backgroundColor: themeTutor.primary },
  botaoPrimario: {
    backgroundColor: themeTutor.primary,
    borderRadius: 8,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
  },
  textoBotaoPrimario: { color: "white", fontWeight: "bold" },
});
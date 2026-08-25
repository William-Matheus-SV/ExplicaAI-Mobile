import { View, Text, ScrollView, StyleSheet } from "react-native";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import { themeTutor } from "../../shared/styles/themeTutor";
import { DIAS, Dia } from "../../shared/hooks/useSelecaoHorarios";
import BottomNavBar from "../../shared/components/BottomNavBar";

const NOMES_DIAS: Record<Dia, string> = {
  SEG: "Segunda",
  TER: "Terça",
  QUA: "Quarta",
  QUI: "Quinta",
  SEX: "Sexta",
};

export default function AgendaTutor() {
  const { usuario } = useUsuario();
  const horariosDisponiveis = usuario?.tipo === 'tutor' ? usuario.horariosDisponiveis : [];

  return (
    <View style={styles.tela}>
      <View style={styles.cabecalho}>
        <View style={styles.cabecalhoTopo}>
          <View style={styles.iconeTitulo}>
            <Text style={styles.iconeTituloTexto}>🗓️</Text>
          </View>
          <View>
            <Text style={styles.tituloCabecalho}>Minha Agenda</Text>
            <Text style={styles.subtituloCabecalho}>
              {horariosDisponiveis.length} horários disponíveis
            </Text>
          </View>
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.conteudo}>
        {DIAS.map((dia) => {
          const horariosDoDia = horariosDisponiveis.filter((slot) => slot.dia === dia);

          if (horariosDoDia.length === 0) return null;

          return (
            <View key={dia} style={styles.periodo}>
              <Text style={styles.periodoTitulo}>{NOMES_DIAS[dia]}</Text>

              <View style={styles.gradeHorarios}>
                {horariosDoDia.map((slot) => (
                  <View key={slot.horario} style={styles.chipHorario}>
                    <Text style={styles.textoChip}>
                      {slot.horario} ({slot.duracao}h)
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          );
        })}

        {horariosDisponiveis.length === 0 && (
          <Text style={styles.mensagemVazia}>
            Você ainda não cadastrou horários disponíveis.
          </Text>
        )}
      </ScrollView>

      <BottomNavBar theme={themeTutor} perfil="tutor" />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: "#f5f2fa" },
  cabecalho: {
    backgroundColor: themeTutor.primary,
    paddingTop: 48,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  cabecalhoTopo: { flexDirection: "row", alignItems: "center", gap: 12 },
  iconeTitulo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconeTituloTexto: { fontSize: 22 },
  tituloCabecalho: { color: "white", fontSize: 22, fontWeight: "bold" },
  subtituloCabecalho: { color: "rgba(255,255,255,0.9)", fontSize: 13 },
  conteudo: { padding: 16, gap: 16, paddingBottom: 32 },
  periodo: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  periodoTitulo: { fontSize: 15, fontWeight: "bold", color: "#2b2b2b" },
  gradeHorarios: { flexDirection: "row", flexWrap: "wrap", gap: 8 },
  chipHorario: {
    backgroundColor: themeTutor.primaryLight,
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 14,
  },
  textoChip: { fontSize: 12, color: themeTutor.primary, fontWeight: "600" },
  mensagemVazia: {
    textAlign: "center",
    color: "#7a7a7a",
    fontSize: 13,
    paddingVertical: 24,
  },
});
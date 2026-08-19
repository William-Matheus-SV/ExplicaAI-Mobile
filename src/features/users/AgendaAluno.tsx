import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { themeAluno } from "../../shared/styles/themeAluno";

export default function AgendaAluno() {
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const [diaSelecionado, setDiaSelecionado] = useState("Segunda");

  const horariosManha = ["08:00 - 10:00", "09:00 - 11:00", "10:00 - 12:00"];
  const horariosTarde = ["14:00 - 16:00", "15:00 - 17:00"];

  return (
    <View style={styles.tela}>
      <LinearGradient colors={themeAluno.gradient} style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>🗓️ Minha Agenda Semanal</Text>
      </LinearGradient>

      <View style={styles.conteudo}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.abasContainer}
          style={styles.abasScroll}
        >
          {dias.map((dia) => {
            const selecionado = dia === diaSelecionado;
            return (
              <View
                key={dia}
                style={[styles.aba, selecionado && styles.abaSelecionada]}
                onTouchEnd={() => setDiaSelecionado(dia)}
              >
                <Text
                  style={[
                    styles.abaTexto,
                    selecionado && styles.abaTextoSelecionado,
                  ]}
                >
                  {dia}-feira
                </Text>
              </View>
            );
          })}
        </ScrollView>

        <ScrollView contentContainerStyle={styles.grade}>
          <View style={styles.periodo}>
            <Text style={styles.periodoTitulo}>☀️ Manhã</Text>

            {horariosManha.map((horario) => (
              <View key={horario} style={styles.linhaHorario}>
                <Text style={styles.horarioTexto}>🕐 {horario}</Text>

                <View style={styles.slots}>
                  <View style={styles.slotVazio}>
                    <Text style={styles.slotTexto}>Sem agendamento</Text>
                  </View>
                  <View style={styles.slotVazio}>
                    <Text style={styles.slotTexto}>Sem agendamento</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.periodo}>
            <Text style={styles.periodoTitulo}>🌙 Tarde</Text>

            {horariosTarde.map((horario) => (
              <View key={horario} style={styles.linhaHorario}>
                <Text style={styles.horarioTexto}>🕐 {horario}</Text>

                <View style={styles.slots}>
                  <View style={styles.slotVazio}>
                    <Text style={styles.slotTexto}>Sem agendamento</Text>
                  </View>
                  <View style={styles.slotVazio}>
                    <Text style={styles.slotTexto}>Sem agendamento</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>

          <View style={styles.legenda}>
            <View style={styles.legendaItem}>
              <View
                style={[styles.legendaCor, { backgroundColor: "#7C6FE0" }]}
              />
              <Text style={styles.legendaTexto}>Matéria do Match</Text>
            </View>
            <View style={styles.legendaItem}>
              <View
                style={[styles.legendaCor, { backgroundColor: "#FFB74D" }]}
              />
              <Text style={styles.legendaTexto}>Pendente</Text>
            </View>
            <View style={styles.legendaItem}>
              <View
                style={[
                  styles.legendaCor,
                  { backgroundColor: themeAluno.primary },
                ]}
              />
              <Text style={styles.legendaTexto}>Confirmado</Text>
            </View>
          </View>
        </ScrollView>
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
  },
  tituloCabecalho: {
    color: themeAluno.white,
    fontSize: 20,
    fontWeight: "bold",
  },
  conteudo: {
    flex: 1,
    padding: 16,
  },
  abasScroll: {
    flexGrow: 0,
    marginBottom: 16,
  },
  abasContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  aba: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeAluno.border,
    backgroundColor: themeAluno.white,
  },
  abaSelecionada: {
    backgroundColor: themeAluno.primary,
    borderColor: themeAluno.primary,
  },
  abaTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: themeAluno.text,
  },
  abaTextoSelecionado: {
    color: themeAluno.white,
  },
  grade: {
    gap: 20,
    paddingBottom: 16,
  },
  periodo: {
    backgroundColor: themeAluno.white,
    borderRadius: 12,
    padding: 12,
    gap: 12,
  },
  periodoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: themeAluno.text,
    textAlign: "center",
  },
  linhaHorario: {
    gap: 8,
  },
  horarioTexto: {
    fontSize: 13,
    fontWeight: "600",
    color: themeAluno.text,
  },
  slots: {
    flexDirection: "row",
    gap: 8,
  },
  slotVazio: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    borderRadius: 8,
    padding: 12,
    alignItems: "center",
  },
  slotTexto: {
    fontSize: 11,
    color: themeAluno.textSecondary,
  },
  legenda: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: themeAluno.white,
    borderRadius: 12,
    padding: 12,
  },
  legendaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },
  legendaCor: {
    width: 12,
    height: 12,
    borderRadius: 3,
  },
  legendaTexto: {
    fontSize: 11,
    color: themeAluno.text,
  },
});

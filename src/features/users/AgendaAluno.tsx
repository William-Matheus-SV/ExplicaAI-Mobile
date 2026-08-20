import { LinearGradient } from "expo-linear-gradient";
import { router } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { themeAluno } from "../../shared/styles/themeAluno";

export default function AgendaAluno() {
  const dias = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];
  const [diaSelecionado, setDiaSelecionado] = useState("Segunda");

  const aulasPorDia: Record<
    string,
    {
      horario: string;
      materia: string;
      professor: string;
      status: "confirmado" | "pendente";
    }[]
  > = {
    Segunda: [
      {
        horario: "08:00 - 10:00",
        materia: "Matemática",
        professor: "Prof. João Silva",
        status: "confirmado",
      },
      {
        horario: "10:00 - 12:00",
        materia: "Física",
        professor: "Prof. Carlos Lima",
        status: "confirmado",
      },
      {
        horario: "14:00 - 16:00",
        materia: "Química",
        professor: "Prof. Ana Paula",
        status: "pendente",
      },
    ],
    Terça: [],
    Quarta: [],
    Quinta: [],
    Sexta: [],
  };

  const aulasDoDia = aulasPorDia[diaSelecionado] || [];
  const totalAulas = aulasDoDia.length;
  const confirmadas = aulasDoDia.filter(
    (a) => a.status === "confirmado",
  ).length;
  const pendentes = aulasDoDia.filter((a) => a.status === "pendente").length;
  const proximaAula = aulasDoDia[0];

  return (
    <View style={styles.tela}>
      <LinearGradient colors={themeAluno.gradient} style={styles.cabecalho}>
        <View style={styles.cabecalhoTopo}>
          <View style={styles.iconeTitulo}>
            <Text style={styles.iconeTituloTexto}>🗓️</Text>
          </View>
          <View>
            <Text style={styles.tituloCabecalho}>Minha Agenda</Text>
            <Text style={styles.subtituloCabecalho}>
              {diaSelecionado}-feira
            </Text>
          </View>
        </View>

        <View style={styles.resumoContainer}>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoIcone}>📖</Text>
            <View>
              <Text style={styles.resumoTitulo}>{totalAulas} aulas hoje</Text>
              <Text style={styles.resumoSubtitulo}>
                {confirmadas} confirmadas • {pendentes} pendente
                {pendentes !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>

          <View style={styles.resumoCard}>
            <Text style={styles.resumoIcone}>🕐</Text>
            <View>
              <Text style={styles.resumoTitulo}>Próxima aula</Text>
              <Text style={styles.resumoSubtitulo}>
                {proximaAula
                  ? `${proximaAula.horario.split(" - ")[0]} • ${proximaAula.materia}`
                  : "Nenhuma aula"}
              </Text>
            </View>
          </View>
        </View>
      </LinearGradient>
      <ScrollView contentContainerStyle={styles.conteudo}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.abasContainer}
          style={styles.abasScroll}
        >
          {dias.map((dia) => {
            const selecionado = dia === diaSelecionado;
            return (
              <Pressable
                key={dia}
                style={[styles.aba, selecionado && styles.abaSelecionada]}
                onPress={() => setDiaSelecionado(dia)}
              >
                <Text
                  style={[
                    styles.abaTexto,
                    selecionado && styles.abaTextoSelecionado,
                  ]}
                >
                  {dia.slice(0, 3).toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>

        <View style={styles.periodo}>
          <View style={styles.periodoCabecalho}>
            <Text style={styles.periodoTitulo}>☀️ Manhã</Text>
            <Text style={styles.periodoContagem}>
              {aulasDoDia.filter((a) => parseInt(a.horario) < 12).length} aulas
            </Text>
          </View>

          {aulasDoDia
            .filter((aula) => parseInt(aula.horario) < 12)
            .map((aula) => (
              <View
                key={aula.horario}
                style={[
                  styles.cardAula,
                  {
                    borderLeftColor:
                      aula.status === "confirmado"
                        ? themeAluno.primary
                        : "#FFB74D",
                  },
                ]}
              >
                <View style={styles.cardAulaHorario}>
                  <Text style={styles.horarioTexto}>
                    {aula.horario.split(" - ")[0]}
                  </Text>
                  <Text style={styles.horarioTexto}>
                    {aula.horario.split(" - ")[1]}
                  </Text>
                </View>
                <View style={styles.cardAulaInfo}>
                  <Text style={styles.materiaTexto}>{aula.materia}</Text>
                  <Text style={styles.professorTexto}>{aula.professor}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        aula.status === "confirmado"
                          ? themeAluno.primaryLight
                          : "#FFF3E0",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusTexto,
                      {
                        color:
                          aula.status === "confirmado"
                            ? themeAluno.primary
                            : "#F57C00",
                      },
                    ]}
                  >
                    {aula.status === "confirmado" ? "Confirmado" : "Pendente"}
                  </Text>
                </View>
              </View>
            ))}

          <Pressable
            style={styles.botaoAgendar}
            onPress={() => router.push("/busca-aluno")}
          >
            <Text style={styles.botaoAgendarTexto}>+ Agendar aula</Text>
          </Pressable>
        </View>

        <View style={styles.periodo}>
          <View style={styles.periodoCabecalho}>
            <Text style={styles.periodoTitulo}>🌙 Tarde</Text>
          </View>

          {aulasDoDia
            .filter((aula) => parseInt(aula.horario) >= 12)
            .map((aula) => (
              <View
                key={aula.horario}
                style={[
                  styles.cardAula,
                  {
                    borderLeftColor:
                      aula.status === "confirmado"
                        ? themeAluno.primary
                        : "#FFB74D",
                  },
                ]}
              >
                <View style={styles.cardAulaHorario}>
                  <Text style={styles.horarioTexto}>
                    {aula.horario.split(" - ")[0]}
                  </Text>
                  <Text style={styles.horarioTexto}>
                    {aula.horario.split(" - ")[1]}
                  </Text>
                </View>
                <View style={styles.cardAulaInfo}>
                  <Text style={styles.materiaTexto}>{aula.materia}</Text>
                  <Text style={styles.professorTexto}>{aula.professor}</Text>
                </View>
                <View
                  style={[
                    styles.statusBadge,
                    {
                      backgroundColor:
                        aula.status === "confirmado"
                          ? themeAluno.primaryLight
                          : "#FFF3E0",
                    },
                  ]}
                >
                  <Text
                    style={[
                      styles.statusTexto,
                      {
                        color:
                          aula.status === "confirmado"
                            ? themeAluno.primary
                            : "#F57C00",
                      },
                    ]}
                  >
                    {aula.status === "confirmado" ? "Confirmado" : "Pendente"}
                  </Text>
                </View>
              </View>
            ))}

          <Pressable
            style={styles.botaoAgendar}
            onPress={() => router.push("/busca-aluno")}
          >
            <Text style={styles.botaoAgendarTexto}>+ Agendar aula</Text>
          </Pressable>
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
    paddingBottom: 20,
    paddingHorizontal: 20,
    gap: 16,
  },
  cabecalhoTopo: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  iconeTitulo: {
    width: 44,
    height: 44,
    borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center",
    alignItems: "center",
  },
  iconeTituloTexto: {
    fontSize: 22,
  },
  tituloCabecalho: {
    color: themeAluno.white,
    fontSize: 22,
    fontWeight: "bold",
  },
  subtituloCabecalho: {
    color: "rgba(255,255,255,0.9)",
    fontSize: 13,
  },
  resumoContainer: {
    flexDirection: "row",
    gap: 12,
  },
  resumoCard: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: 12,
    padding: 12,
  },
  resumoIcone: {
    fontSize: 20,
  },
  resumoTitulo: {
    color: themeAluno.white,
    fontSize: 14,
    fontWeight: "bold",
  },
  resumoSubtitulo: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 11,
  },
  conteudo: {
    padding: 16,
    gap: 16,
    paddingBottom: 32,
  },
  abasScroll: {
    flexGrow: 0,
  },
  abasContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 8,
  },
  aba: {
    width: 64,
    paddingVertical: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: themeAluno.border,
    backgroundColor: themeAluno.white,
    alignItems: "center",
  },
  abaSelecionada: {
    backgroundColor: themeAluno.primary,
    borderColor: themeAluno.primary,
  },
  abaTexto: {
    fontSize: 12,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  abaTextoSelecionado: {
    color: themeAluno.white,
  },
  periodo: {
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    padding: 16,
    gap: 10,
  },
  periodoCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  periodoTitulo: {
    fontSize: 15,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  periodoContagem: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  cardAula: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    backgroundColor: "#F9F9F9",
    borderRadius: 10,
    borderLeftWidth: 4,
    padding: 12,
  },
  cardAulaHorario: {
    width: 50,
  },
  horarioTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: themeAluno.text,
  },
  cardAulaInfo: {
    flex: 1,
  },
  materiaTexto: {
    fontSize: 14,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  professorTexto: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  statusBadge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
  },
  statusTexto: {
    fontSize: 11,
    fontWeight: "600",
  },
  botaoAgendar: {
    borderWidth: 1.5,
    borderColor: themeAluno.primary,
    borderStyle: "dashed",
    borderRadius: 10,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: themeAluno.primaryLight,
  },
  botaoAgendarTexto: {
    color: themeAluno.primary,
    fontWeight: "bold",
    fontSize: 14,
  },
});

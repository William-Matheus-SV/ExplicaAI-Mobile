import { View, Text, ScrollView, Pressable, StyleSheet, StatusBar, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState, useEffect } from "react";
import { themeTutor } from "../../shared/styles/themeTutor";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import { useSelecaoHorarios, DIAS, SlotHorario } from "../../shared/hooks/useSelecaoHorarios";
import { listarMeusSlots, criarSlot, removerSlot, proximaData, slotRealParaGrade, SlotAgendaReal,  } from "../../shared/services/agendaService";


const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

export default function EditarAgendaTutor() {
  const router = useRouter();
  const { usuario, token } = useUsuario();


  const [horariosIniciais, setHorariosIniciais] = useState<SlotHorario[]>([]);
  const [mapaSlotId, setMapaSlotId] = useState<Record<string, string>>({});

  function chaveDoSlot(dia: string, horario: string, duracao: number) {
    return `${dia}|${horario}|${duracao}`;
  }
const {
  horariosSelecionados,
  setHorariosSelecionados,
  duracaoAtiva,
  setDuracaoAtiva,
  horariosGrade,
  estaSelecionado,
  toggleHorario,
} = useSelecaoHorarios([]); // começa vazio, é preenchido depois que a busca terminar

useEffect(() => {
  async function carregarAgendaAtual() {
    if (!token) return;
    try {
      const slots = await listarMeusSlots(token);
      const convertidos: SlotHorario[] = [];
      const mapa: Record<string, string> = {};

      slots.forEach((slot) => {
        const grade = slotRealParaGrade(slot);
        if (grade) {
          convertidos.push(grade);
          mapa[chaveDoSlot(grade.dia, grade.horario, grade.duracao)] = slot._id;
        }
      });

      setHorariosIniciais(convertidos);
      setHorariosSelecionados(convertidos);
      setMapaSlotId(mapa);
    } catch (e) {
      console.error("Erro ao carregar agenda atual:", e);
    }
  }
  carregarAgendaAtual();
}, [token]);
  
  function handleVoltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/perfil-tutor");
    }
  }
  
 async function handleSalvar() {
  if (usuario?.tipo !== 'tutor' || !token) return;

  const novosSlots = horariosSelecionados.filter(
    (slot) =>
      !horariosIniciais.some(
        (inicial) =>
          inicial.dia === slot.dia &&
          inicial.horario === slot.horario &&
          inicial.duracao === slot.duracao
      )
  );

  // Removidos: estavam na seleção inicial, mas não estão mais na seleção atual
  const slotsRemovidos = horariosIniciais.filter(
    (inicial) =>
      !horariosSelecionados.some(
        (slot) =>
          slot.dia === inicial.dia &&
          slot.horario === inicial.horario &&
          slot.duracao === inicial.duracao
      )
  );

  if (novosSlots.length === 0 && slotsRemovidos.length === 0) {
    Alert.alert("Nada para salvar", "Nenhuma alteração foi feita.");
    router.back();
    return;
  }

  const resultadosCriacao = await Promise.allSettled(
    novosSlots.map((slot) => {
      const horaInicio = slot.horario.split(" - ")[0];
      const data = proximaData(slot.dia, horaInicio);
      return criarSlot(data.toISOString(), slot.duracao, token);
    })
  );

  const resultadosRemocao = await Promise.allSettled(
    slotsRemovidos.map((slot) => {
      const id = mapaSlotId[chaveDoSlot(slot.dia, slot.horario, slot.duracao)];
      if (!id) return Promise.reject(new Error("Horário não encontrado para remoção"));
      return removerSlot(id, token);
    })
  );

  const falhasCriacao = resultadosCriacao.filter((r) => r.status === "rejected") as PromiseRejectedResult[];
  const falhasRemocao = resultadosRemocao.filter((r) => r.status === "rejected") as PromiseRejectedResult[];

  falhasCriacao.forEach((f) => console.error("Erro ao criar slot:", f.reason));
  falhasRemocao.forEach((f) => console.error("Erro ao remover slot:", f.reason));

  const totalFalhas = falhasCriacao.length + falhasRemocao.length;

  if (totalFalhas > 0) {
    const primeiraMensagem =
      falhasCriacao[0]?.reason?.message || falhasRemocao[0]?.reason?.message || "Erro desconhecido";
    Alert.alert(
      "Algumas alterações não foram salvas",
      `Criados: ${novosSlots.length - falhasCriacao.length}/${novosSlots.length}. Removidos: ${slotsRemovidos.length - falhasRemocao.length}/${slotsRemovidos.length}.\n\nMotivo: ${primeiraMensagem}`
    );
  } else {
    Alert.alert("Sucesso", "Sua agenda foi atualizada.");
  }

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
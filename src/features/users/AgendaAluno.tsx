import { LinearGradient } from "expo-linear-gradient";
import { router, useFocusEffect } from "expo-router";
import { useCallback, useState } from "react";
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View, Alert } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { themeAluno } from "../../shared/styles/themeAluno";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import { listarSemanaDoAluno, confirmarPresenca, MatchSemana } from "../../shared/services/matchService";


const DIAS = ["Segunda", "Terça", "Quarta", "Quinta", "Sexta"];

// getDay(): 0=domingo, 1=segunda ... 6=sábado
const DIA_LABEL: Record<number, string | null> = {
  0: null, 1: "Segunda", 2: "Terça", 3: "Quarta", 4: "Quinta", 5: "Sexta", 6: null,
};
 
const STATUS_INFO: Record<
  MatchSemana["status"],
  { label: string; corTexto: string; corFundo: string }
> = {
  confirmado: { label: "Confirmado", corTexto: themeAluno.primary, corFundo: themeAluno.primaryLight },
  realizado: { label: "Realizado", corTexto: "#1976D2", corFundo: "#E3F2FD" },
  cancelado: { label: "Cancelado", corTexto: "#F57C00", corFundo: "#FFF3E0" },
};
 
export default function AgendaAluno() {
  const { token } = useUsuario();
  const [diaSelecionado, setDiaSelecionado] = useState("Segunda");
  const [matches, setMatches] = useState<MatchSemana[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");
  const [confirmandoPresenca, setconfirmandoPresenca] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      async function carregarSemana() {
        if (!token) {
          setCarregando(false);
          return;
        }
        try {
          const dados = await listarSemanaDoAluno(token);
          setMatches(dados);
          setErro("");
        } catch (e: any) {
          setErro(e.message || "Não foi possível carregar sua agenda.");
        } finally {
          setCarregando(false);
        }
      }
      carregarSemana();
    }, [token])
  );

  function handleVoltar() {
    if (router.canGoBack()) {
      router.back();
    } else {
      router.replace("/perfil-aluno");
    }
  }
  async function handleConfirmarPresenca(match: MatchSemana) {
  if (!token) return;

  setconfirmandoPresenca(match._id);
  try {
    await confirmarPresenca(match._id, token);
    setMatches((atuais) =>
      atuais.map((m) => (m._id === match._id ? { ...m, status: "realizado" } : m))
    );
    Alert.alert("Presença confirmada!", "Obrigado por confirmar.");
  } catch (e: any) {
    Alert.alert("Não foi possível confirmar", e.message || "Tente novamente.");
  } finally {
    setconfirmandoPresenca(null);
  }
}
  const aulasPorDia: Record<string, MatchSemana[]> = { Segunda: [], Terça: [], Quarta: [], Quinta: [], Sexta: [] };
  matches.forEach((match) => {
    const data = new Date(match.dataHoraAgendada);
    const label = DIA_LABEL[data.getDay()];
    if (label) aulasPorDia[label].push(match);
  });

  const aulasDoDia = aulasPorDia[diaSelecionado] || [];
  const aulasManha = aulasDoDia.filter((m) => new Date(m.dataHoraAgendada).getHours() < 12);
  const aulasTarde = aulasDoDia.filter((m) => new Date(m.dataHoraAgendada).getHours() >= 12);

  const totalAulas = aulasDoDia.length;
  const confirmadas = aulasDoDia.filter((a) => a.status === "confirmado").length;
  const canceladas = aulasDoDia.filter((a) => a.status === "cancelado").length;

  const agora = new Date();
  const proximaAula = matches
    .filter((m) => m.status === "confirmado" && new Date(m.dataHoraAgendada) >= agora)
    .sort((a, b) => new Date(a.dataHoraAgendada).getTime() - new Date(b.dataHoraAgendada).getTime())[0];

  function formatarFaixaHorario(match: MatchSemana) {
    const inicio = new Date(match.dataHoraAgendada);
    const fim = new Date(inicio.getTime() + match.agendaSlotId.duracao * 60 * 60 * 1000);
    const formatar = (d: Date) => d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
    return { inicio: formatar(inicio), fim: formatar(fim) };
  }

  function renderAula(match: MatchSemana) {
    const { inicio, fim } = formatarFaixaHorario(match);
    const status = STATUS_INFO[match.status];


  return (
      <View
        key={match._id}
        style={[styles.cardAula, { borderLeftColor: match.status === "cancelado" ? "#FFB74D" : themeAluno.primary }]}
      >
        <View style={styles.cardAulaHorario}>
          <Text style={styles.horarioTexto}>{inicio}</Text>
          <Text style={styles.horarioTexto}>{fim}</Text>
        </View>
        <View style={styles.cardAulaInfo}>
          <Text style={styles.materiaTexto}>{match.materia}</Text>
          <Text style={styles.professorTexto}>Prof. {match.tutorId.nome}</Text>
        </View>
            {match.status === "confirmado" && new Date(match.dataHoraAgendada) <= new Date() ? (
      <Pressable
        style={styles.botaoConfirmar}
        onPress={() => handleConfirmarPresenca(match)}
        disabled={confirmandoPresenca === match._id}
      >
        <Text style={styles.botaoConfirmarTexto}>
          {confirmandoPresenca === match._id ? "..." : "Confirmar presença"}
        </Text>
      </Pressable>
    ) : (
      <View style={[styles.statusBadge, { backgroundColor: status.corFundo }]}>
        <Text style={[styles.statusTexto, { color: status.corTexto }]}>{status.label}</Text>
      </View>
    )}
      </View>
    );
  }
 
  return (
    <View style={styles.tela}>
      <LinearGradient colors={themeAluno.gradient} style={styles.cabecalho}>
        <View style={styles.cabecalhoTopo}>
          <Pressable style={styles.botaoVoltar} onPress={handleVoltar}>
            <Ionicons name="arrow-back" size={20} color="white" />
          </Pressable>
          <View style={styles.iconeTitulo}>
            <Text style={styles.iconeTituloTexto}>🗓️</Text>
          </View>
          <View>
            <Text style={styles.tituloCabecalho}>Minha Agenda</Text>
            <Text style={styles.subtituloCabecalho}>{diaSelecionado}-feira</Text>
          </View>
        </View>
 
        <View style={styles.resumoContainer}>
          <View style={styles.resumoCard}>
            <Text style={styles.resumoIcone}>📖</Text>
            <View>
              <Text style={styles.resumoTitulo}>{totalAulas} aulas neste dia</Text>
              <Text style={styles.resumoSubtitulo}>
                {confirmadas} confirmada{confirmadas !== 1 ? "s" : ""} • {canceladas} cancelada{canceladas !== 1 ? "s" : ""}
              </Text>
            </View>
          </View>
 
          <View style={styles.resumoCard}>
            <Text style={styles.resumoIcone}>🕐</Text>
            <View>
              <Text style={styles.resumoTitulo}>Próxima aula</Text>
              <Text style={styles.resumoSubtitulo}>
                {proximaAula
                  ? `${formatarFaixaHorario(proximaAula).inicio} • ${proximaAula.materia}`
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
          {DIAS.map((dia) => {
            const selecionado = dia === diaSelecionado;
            return (
              <Pressable
                key={dia}
                style={[styles.aba, selecionado && styles.abaSelecionada]}
                onPress={() => setDiaSelecionado(dia)}
              >
                <Text style={[styles.abaTexto, selecionado && styles.abaTextoSelecionado]}>
                  {dia.slice(0, 3).toUpperCase()}
                </Text>
              </Pressable>
            );
          })}
        </ScrollView>
 
        {carregando ? (
          <ActivityIndicator color={themeAluno.primary} style={{ paddingVertical: 24 }} />
        ) : erro ? (
          <Text style={styles.mensagemVazia}>{erro}</Text>
        ) : (
          <>
            <View style={styles.periodo}>
              <View style={styles.periodoCabecalho}>
                <Text style={styles.periodoTitulo}>☀️ Manhã</Text>
                <Text style={styles.periodoContagem}>{aulasManha.length} aulas</Text>
              </View>
 
              {aulasManha.map(renderAula)}
 
              <Pressable style={styles.botaoAgendar} onPress={() => router.push("/busca-aluno")}>
                <Text style={styles.botaoAgendarTexto}>+ Agendar aula</Text>
              </Pressable>
            </View>
 
            <View style={styles.periodo}>
              <View style={styles.periodoCabecalho}>
                <Text style={styles.periodoTitulo}>🌙 Tarde</Text>
                <Text style={styles.periodoContagem}>{aulasTarde.length} aulas</Text>
              </View>
 
              {aulasTarde.map(renderAula)}
 
              <Pressable style={styles.botaoAgendar} onPress={() => router.push("/busca-aluno")}>
                <Text style={styles.botaoAgendarTexto}>+ Agendar aula</Text>
              </Pressable>
            </View>
          </>
        )}
      </ScrollView>
 
      <BottomNavBar theme={themeAluno} perfil="aluno" />
    </View>
  );
}

const styles = StyleSheet.create({
  tela: { flex: 1, backgroundColor: themeAluno.background },
  cabecalho: { paddingTop: 48, paddingBottom: 20, paddingHorizontal: 20, gap: 16 },
  cabecalhoTopo: { flexDirection: "row", alignItems: "center", gap: 12 },
  botaoVoltar: {
    width: 40, height: 40, borderRadius: 20,
    backgroundColor: "rgba(255,255,255,0.2)",
    justifyContent: "center", alignItems: "center",
  },
  iconeTitulo: {
    width: 44, height: 44, borderRadius: 12,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: "center", alignItems: "center",
  },
  iconeTituloTexto: { fontSize: 22 },
  tituloCabecalho: { color: themeAluno.white, fontSize: 22, fontWeight: "bold" },
  subtituloCabecalho: { color: "rgba(255,255,255,0.9)", fontSize: 13 },
  resumoContainer: { flexDirection: "row", gap: 12 },
  resumoCard: {
    flex: 1, flexDirection: "row", alignItems: "center", gap: 10,
    backgroundColor: "rgba(255,255,255,0.2)", borderRadius: 12, padding: 12,
  },
  resumoIcone: { fontSize: 20 },
  resumoTitulo: { color: themeAluno.white, fontSize: 14, fontWeight: "bold" },
  resumoSubtitulo: { color: "rgba(255,255,255,0.85)", fontSize: 11 },
  conteudo: { padding: 16, gap: 16, paddingBottom: 32 },
  abasScroll: { flexGrow: 0 },
  abasContainer: { flexDirection: "row", alignItems: "flex-start", gap: 8 },
  aba: {
    width: 64, paddingVertical: 10, borderRadius: 8,
    borderWidth: 1, borderColor: themeAluno.border, backgroundColor: themeAluno.white,
    alignItems: "center",
  },
  abaSelecionada: { backgroundColor: themeAluno.primary, borderColor: themeAluno.primary },
  abaTexto: { fontSize: 12, fontWeight: "bold", color: themeAluno.text },
  abaTextoSelecionado: { color: themeAluno.white },
  periodo: { backgroundColor: themeAluno.white, borderRadius: 16, padding: 16, gap: 10 },
  periodoCabecalho: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  periodoTitulo: { fontSize: 15, fontWeight: "bold", color: themeAluno.text },
  periodoContagem: { fontSize: 12, color: themeAluno.textSecondary },
  cardAula: {
    flexDirection: "row", alignItems: "center", gap: 12,
    backgroundColor: "#F9F9F9", borderRadius: 10, borderLeftWidth: 4, padding: 12,
  },
  cardAulaHorario: { width: 50 },
  horarioTexto: { fontSize: 12, fontWeight: "600", color: themeAluno.text },
  cardAulaInfo: { flex: 1 },
  materiaTexto: { fontSize: 14, fontWeight: "bold", color: themeAluno.text },
  professorTexto: { fontSize: 12, color: themeAluno.textSecondary },
  statusBadge: { paddingHorizontal: 10, paddingVertical: 4, borderRadius: 12 },
  statusTexto: { fontSize: 11, fontWeight: "600" },
  botaoAgendar: {
    borderWidth: 1.5, borderColor: themeAluno.primary, borderStyle: "dashed", borderRadius: 10,
    paddingVertical: 12, alignItems: "center", backgroundColor: themeAluno.primaryLight,
  },
  botaoAgendarTexto: { color: themeAluno.primary, fontWeight: "bold", fontSize: 14 },
  mensagemVazia: { fontSize: 13, color: themeAluno.textSecondary, textAlign: "center", paddingVertical: 24 
  },
  botaoConfirmar: {  backgroundColor: themeAluno.primary,  borderRadius: 8,  paddingVertical: 6,  paddingHorizontal: 12,},
  botaoConfirmarTexto: {color: "white",  fontSize: 11,  fontWeight: "600",},
});
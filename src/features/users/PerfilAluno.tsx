import { LinearGradient } from "expo-linear-gradient";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { themeAluno } from "../../shared/styles/themeAluno";
import { router } from "expo-router";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { useUsuario } from "../../shared/contexts/UsuarioContext";

const estatisticas = [
  {
    icone: "🎓",
    numero: "8",
    label: "Aulas Concluídas",
    destaque: "Continue assim!",
    cor: "#EDE7F6",
  },
  {
    icone: "⭐",
    numero: "4.8",
    label: "Avaliação Média",
    destaque: "Excelente!",
    cor: "#FFF3E0",
  },
  {
    icone: "📅",
    numero: "5",
    label: "Aulas Agendadas",
    destaque: "Próximas aulas",
    cor: "#E3F2FD",
  },
];

const proximasAulas = [
  {
    id: "1",
    materia: "Matemática - Funções",
    tutor: "Ana Silva",
    fotoTutor: "https://i.pravatar.cc/150?img=5",
    data: "18 Mai",
    hora: "14:00",
  },
  {
    id: "2",
    materia: "Física - Leis de Newton",
    tutor: "João Pedro",
    fotoTutor: "https://i.pravatar.cc/150?img=8",
    data: "19 Mai",
    hora: "16:30",
  },
  {
    id: "3",
    materia: "Inglês - Conversação",
    tutor: "Clara Martins",
    fotoTutor: "https://i.pravatar.cc/150?img=9",
    data: "21 Mai",
    hora: "15:00",
  },
];

export default function PerfilAluno() {
  const { usuario } = useUsuario();

  const aluno = {
    nome: usuario?.tipo === 'aluno' ? usuario.nome : "Aluno",
    matricula: usuario?.tipo === 'aluno' ? usuario.matricula : "-",
    bio: usuario?.tipo === 'aluno' ? usuario.bio : "",
    fotoUrl: "https://i.pravatar.cc/150?img=12",
  };

  return (
    <View style={styles.tela}>
      <LinearGradient colors={["#d5f5e3", "#b7e4ca"]} style={styles.cabecalho}>
        <Text style={styles.tituloCabecalho}>Perfil</Text>
        <Text style={styles.iconeSino}>🔔</Text>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardPerfil}>
          <Image source={{ uri: aluno.fotoUrl }} style={styles.foto} />

          <View style={styles.infoPerfil}>
            <Text style={styles.nome}>{aluno.nome}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>Aluno</Text>
            </View>
            <Text style={styles.matricula}>Matrícula: {aluno.matricula}</Text>
            <Text style={styles.bio}>{aluno.bio}</Text>
          </View>
        </View>

        <View style={styles.linhaEstatisticas}>
          {estatisticas.map((item) => (
            <View
              key={item.label}
              style={[styles.cardEstatistica, { backgroundColor: item.cor }]}
            >
              <Text style={styles.iconeEstatistica}>{item.icone}</Text>
              <Text style={styles.numeroEstatistica}>{item.numero}</Text>
              <Text style={styles.labelEstatistica}>{item.label}</Text>
              <Text style={styles.destaqueEstatistica}>{item.destaque}</Text>
            </View>
          ))}
        </View>

        <View style={styles.secaoCard}>
          <View style={styles.cabecalhoSecao}>
            <Text style={styles.tituloSecao}>Próximas Aulas</Text>
            <Pressable onPress={() => router.push("/agenda-aluno")}>
              <Text style={styles.verTodas}>Ver agenda →</Text>
            </Pressable>
          </View>

          {proximasAulas.map((aula) => (
            <View key={aula.id} style={styles.linhaAula}>
              <Image
                source={{ uri: aula.fotoTutor }}
                style={styles.fotoTutor}
              />

              <View style={styles.infoAula}>
                <Text style={styles.nomeAula}>{aula.materia}</Text>
                <Text style={styles.nomeTutor}>com {aula.tutor}</Text>
              </View>

              <View style={styles.dataAula}>
                <Text style={styles.textoData}>{aula.data}</Text>
                <Text style={styles.textoHora}>{aula.hora}</Text>
              </View>

              <Pressable style={styles.botaoEntrar}>
                <Text style={styles.textoBotaoEntrar}>Entrar</Text>
              </Pressable>
            </View>
          ))}
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
    paddingBottom: 40,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderBottomLeftRadius: 24,
    borderBottomRightRadius: 24,
  },
  tituloCabecalho: {
    color: themeAluno.black,
    fontSize: 24,
    fontWeight: "bold",
  },
  iconeSino: {
    fontSize: 22,
  },
  container: {
    padding: 16,
    gap: 16,
    marginTop: -24,
    paddingBottom: 32,
  },
  cardPerfil: {
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    padding: 16,
    flexDirection: "row",
    gap: 16,
  },
  foto: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  infoPerfil: {
    flex: 1,
    gap: 4,
  },
  nome: {
    fontSize: 18,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  badge: {
    backgroundColor: themeAluno.primaryLight,
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 2,
    alignSelf: "flex-start",
  },
  badgeTexto: {
    color: themeAluno.primary,
    fontSize: 12,
    fontWeight: "600",
  },
  matricula: {
    fontSize: 13,
    color: themeAluno.text,
    fontWeight: "600",
  },
  bio: {
    fontSize: 13,
    color: themeAluno.textSecondary,
  },
  linhaEstatisticas: {
    flexDirection: "row",
    gap: 12,
  },
  cardEstatistica: {
    flex: 1,
    borderRadius: 16,
    padding: 12,
    gap: 4,
  },
  iconeEstatistica: {
    fontSize: 20,
  },
  numeroEstatistica: {
    fontSize: 20,
    fontWeight: "bold",
  },
  labelEstatistica: {
    fontSize: 12,
    color: themeAluno.text,
  },
  destaqueEstatistica: {
    fontSize: 11,
    color: themeAluno.primary,
    fontWeight: "600",
  },
  secaoCard: {
    backgroundColor: themeAluno.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
  },
  cabecalhoSecao: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  tituloSecao: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeAluno.text,
  },
  verTodas: {
    fontSize: 13,
    color: themeAluno.primary,
    fontWeight: "600",
  },
  linhaAula: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  fotoTutor: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  infoAula: {
    flex: 1,
  },
  nomeAula: {
    fontSize: 13,
    fontWeight: "600",
    color: themeAluno.text,
  },
  nomeTutor: {
    fontSize: 12,
    color: themeAluno.textSecondary,
  },
  dataAula: {
    alignItems: "flex-end",
  },
  textoData: {
    fontSize: 12,
    fontWeight: "600",
    color: themeAluno.text,
  },
  textoHora: {
    fontSize: 11,
    color: themeAluno.textSecondary,
  },
  botaoEntrar: {
    borderWidth: 1,
    borderColor: themeAluno.primary,
    borderRadius: 20,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  textoBotaoEntrar: {
    fontSize: 12,
    color: themeAluno.primary,
    fontWeight: "600",
  },
});
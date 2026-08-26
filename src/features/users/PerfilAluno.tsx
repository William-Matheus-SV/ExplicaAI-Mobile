import { LinearGradient } from "expo-linear-gradient";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, Modal } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { themeAluno } from "../../shared/styles/themeAluno";
import { router } from "expo-router";
import BottomNavBar from "../../shared/components/BottomNavBar";
import { useUsuario } from "../../shared/contexts/UsuarioContext";
import SecaoAvaliacoes from "../../shared/components/SecaoAvaliacoes"


interface ItinerarioComMaterias {
  nome: string;
  materias: string[];
}

const ITINERARIOS_CATALOGO: ItinerarioComMaterias[] = [
  { nome: "Linguagens, Códigos e suas Tecnologias", materias: ["Português", "Inglês", "Espanhol"] },
  { nome: "Matemática e suas Tecnologias", materias: ["Matemática", "Estatística", "Geometria"] },
  { nome: "Ciências da Natureza e suas Tecnologias", materias: ["Física", "Química", "Biologia"] },
  { nome: "Ciências Humanas e Sociais Aplicadas", materias: ["História", "Geografia", "Filosofia", "Sociologia"] },
  { nome: "Formação Técnica e Profissional", materias: ["Lógica de Programação", "HTML, CSS e JS", "Banco de Dados"] },
];

// Seguem mockados os dados pois precisa do back-end
const estatisticas = [
  {
    icone: "🎓",
    numero: "0",
    label: "Aulas Concluídas",
    destaque: "Comece a aprender!",
    cor: "#EDE7F6",
  },
  {
    icone: "⭐",
    numero: "0.0",
    label: "Avaliação Média",
    destaque: "Você ainda não foi avaliado",
    cor: "#FFF3E0",
  },
  {
    icone: "📅",
    numero: "0",
    label: "Aulas Agendadas",
    destaque: "Próximas aulas",
    cor: "#E3F2FD",
  },
];
// Seguem mockados os dados pois precisa do back-end
const proximasAulas = [
  {
    id: "1",
    materia: " Matemática ",
    tutor: "Thailanny Cristina",
    fotoTutor: "https://i.pravatar.cc/150?img=5",
    data: "27 Ago",
    hora: "15:00 - 17:00",
  },
  {
    id: "2",
    materia: " Física ",
    tutor: "Ricardo Sanchez",
    fotoTutor: "https://i.pravatar.cc/150?img=8",
    data: "28 Ago",
    hora: "10:00 - 12:00",
  },
  {
    id: "3",
    materia: " Inglês ",
    tutor: "Júlia Oliveira",
    fotoTutor: "https://i.pravatar.cc/150?img=9",
    data: "28 Ago",
    hora: "15:00 - 16:00",
  },
];

export default function PerfilAluno() {
  const { usuario, sair } = useUsuario();
  
  function handleSair() {
    sair();
    router.replace("/login");
  }

  function handleVoltarLogin() {
  sair();
  router.replace("/login");
}

  const aluno = {
    nome: usuario?.tipo === 'aluno' ? usuario.nome : "Aluno",
    matricula: usuario?.tipo === 'aluno' ? usuario.matricula : "-",
    bio: usuario?.tipo === 'aluno' ? usuario.bio : ""
  };

  const materiasDificuldade = usuario?.tipo === 'aluno' ? usuario.materias : [];

  const [modalMateriasVisivel, setModalMateriasVisivel] = useState(false);
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(null);
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>(materiasDificuldade);

  function toggleMateria(materia: string) {
    if (materiasSelecionadas.includes(materia)) {
      setMateriasSelecionadas(materiasSelecionadas.filter((item) => item !== materia));
    } else {
      setMateriasSelecionadas([...materiasSelecionadas, materia]);
    }
  }

  function toggleItinerario(nome: string) {
    setItinerarioAberto(itinerarioAberto === nome ? null : nome);
  }

  const materiasAgrupadas = ITINERARIOS_CATALOGO.map((itinerario) => ({
    nome: itinerario.nome,
    materias: itinerario.materias.filter((m) => materiasSelecionadas.includes(m)),
  })).filter((itinerario) => itinerario.materias.length > 0);
  

  return (
    <View style={styles.tela}>
      <LinearGradient colors={["#d5f5e3", "#b7e4ca"]} style={styles.cabecalho}>
        <Pressable onPress={handleVoltarLogin}>
          <Ionicons name="arrow-back" size={22} color={themeAluno.text} />
        </Pressable>
        <Text style={styles.tituloCabecalho}>Perfil Aluno</Text>
        <View style={styles.acoesCabecalho}>
          <Ionicons name="notifications-outline" size={22} color={themeAluno.text} />
        </View>
      </LinearGradient>

      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.cardPerfil}>
          <View style={styles.fotoPlaceholder}>
            <Ionicons name="person" size={40} color="#d9d9e8" />
          </View>
          <View style={styles.infoPerfil}>
            <Text style={styles.nome}>{aluno.nome}</Text>
            <View style={styles.badge}>
              <Text style={styles.badgeTexto}>Aluno</Text>
            </View>
            <Text style={styles.matricula}>Matrícula: {aluno.matricula}</Text>
            <Text style={styles.bio}>{aluno.bio}</Text>
          </View>
        </View>

        <View style={styles.secaoCard}>
          <View style={styles.cabecalhoSecao}>
            <Text style={styles.tituloSecao}>Matérias com dificuldade</Text>
            <Pressable onPress={() => setModalMateriasVisivel(true)}>
              <Ionicons name="add-circle-outline" size={24} color={themeAluno.primary} />
            </Pressable>
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
            {materiasSelecionadas.map((materia) => (
              <View key={materia} style={styles.badge}>
                <Text style={styles.badgeTexto}>{materia}</Text>
              </View>
            ))}
          </View>
        </View>

        <Modal visible={modalMateriasVisivel} animationType="slide" transparent>
          <View style={styles.modalFundo}>
            <View style={styles.modalConteudo}>
              <Text style={styles.tituloSecao}>Editar matérias</Text>

      <ScrollView style={{ maxHeight: 400, marginTop: 12 }}>
        {ITINERARIOS_CATALOGO.map((itinerario) => {
          const aberto = itinerarioAberto === itinerario.nome;
          return (
            <View key={itinerario.nome} style={styles.itinerarioBloco}>
              <Pressable
                style={styles.itinerarioCabecalho}
                onPress={() => toggleItinerario(itinerario.nome)}
              >
                <Text style={styles.itinerarioTexto}>{itinerario.nome}</Text>
                <Text>{aberto ? "▲" : "▼"}</Text>
              </Pressable>

              {aberto && (
                <View style={styles.itinerarioMaterias}>
                  {itinerario.materias.map((materia) => {
                    const selecionada = materiasSelecionadas.includes(materia);
                    return (
                      <Pressable
                        key={materia}
                        style={[
                          styles.badge,
                          selecionada && { backgroundColor: themeAluno.primary },
                        ]}
                        onPress={() => toggleMateria(materia)}
                      >
                        <Text
                          style={[
                            styles.badgeTexto,
                            selecionada && { color: "#fff" },
                          ]}
                        >
                          {materia}
                        </Text>
                      </Pressable>
                    );
                  })}
                </View>
              )}
            </View>
          );
        })}
      </ScrollView>

      <View style={{ flexDirection: "row", gap: 12, marginTop: 16 }}>
        <Pressable
          style={styles.botaoEntrar}
          onPress={() => setModalMateriasVisivel(false)}
        >
          <Text style={styles.textoBotaoEntrar}>Cancelar</Text>
        </Pressable>
        <Pressable
          style={[styles.botaoEntrar, { backgroundColor: themeAluno.primary }]}
          onPress={() => setModalMateriasVisivel(false)}
        >
          <Text style={[styles.textoBotaoEntrar, { color: "white" }]}>Salvar</Text>
        </Pressable>
      </View>
    </View>
  </View>
</Modal>

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
        <SecaoAvaliacoes theme={themeAluno} />
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
  acoesCabecalho: {
  flexDirection: "row",
  alignItems: "center",
  gap: 12,
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
  fotoPlaceholder: {
  width: 80,
  height: 80,
  borderRadius: 40,
  backgroundColor: "#f0f0f0",
  justifyContent: "center",
  alignItems: "center",
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
  modalFundo: {
  flex: 1,
  backgroundColor: "rgba(0,0,0,0.4)",
  justifyContent: "flex-end",
  },
  modalConteudo: {
    backgroundColor: "white",
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 16,
    maxHeight: "80%",
  },
  itinerarioBloco: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 8,
    overflow: "hidden",
    marginBottom: 8,
  },
  itinerarioCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: themeAluno.primaryLight,
  },
  itinerarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: themeAluno.text,
    flex: 1,
  },
  itinerarioMaterias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
});
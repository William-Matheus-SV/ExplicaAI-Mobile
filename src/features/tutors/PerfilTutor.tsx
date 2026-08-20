import {
  View,
  Text,
  ScrollView,
  Pressable,
  StyleSheet,
  StatusBar,
  TextInput,
   Modal,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { themeTutor } from "../../shared/styles/themeTutor";
import { useState } from "react";
import { useRouter } from "expo-router";


//dados MOCKADOS para informaçoes pessoais do TUTOR
const TUTOR_DADOS = {
  matricula: "20261234",
  idade: 24,
};


//tipagem typeScript Para Itinerarios
interface ItinerarioComMaterias {
  nome: string;
  materias: string[];
}

// dados mockados itinerarios de MATERIAS OQ O TUTOR JA LECIONA
const MATERIAS_LECIONADAS: ItinerarioComMaterias[] = [
  { nome: "Linguagens, Códigos e suas Tecnologias", materias: ["Português", "Inglês"] },
  { nome: "Matemática e suas Tecnologias", materias: ["Matemática", "Geometria"] },
  { nome: "Ciências da Natureza e suas Tecnologias", materias: ["Física", "Química", ] },
];




const MATCHES = [
  { nome: "Ana Clara", materia: "Matemática" },
  { nome: "Pedro Henrique", materia: "Física" },
  { nome: "Mariana Costa", materia: "Cálculo" },
  { nome: "Mariana Costa", materia: "Cálculo" },
  { nome: "Mariana Costa", materia: "Cálculo" },
  { nome: "Mariana Costa", materia: "Cálculo" },
];


//dados MOCKADOS para o card de Agenda (horários disponíveis)
const AGENDA_MOCK = [
  { dia: "SEG", horario: ["08:00 - 09:00", "10:00 - 12:00", "08:00 - 09:00", "08:00 - 09:00", "08:00 - 09:00"] },
  { dia: "TER", horario: ["10:00 - 12:00", "08:00 - 09:00", "10:00 - 12:00", ] },
  { dia: "QUA", horario: ["14:00 - 15:00"] },
  { dia: "QUI", horario: ["09:00 - 11:00"] },
  { dia: "SEX", horario: ["16:00 - 17:00"] },
];



export default function PerfilTutor() {
  //router
  const router = useRouter();

  /* se algo como biografia do DB for vazio o use State pode ter um Toque para adc.... */
  const [bioTexto, setBioTexto] = useState('Toque para adcionar uma bio');
    const [editando, setEditando] = useState(false);


    

  return (

    <View style={styles.container}>
      <ScrollView>
        <View style={styles.Header}>
          <View style={styles.HeaderContent}>
            <Pressable style={styles.BotaoVoltar}>
              <Ionicons name="arrow-back" size={22} color="white" />
            </Pressable>
            <Text style={styles.HeaderTitulo}>Perfil do Tutor</Text>
            <View style={{ width: 44 }} />
          </View>
        </View>

        <View style={styles.AvatarWrapper}>
          <View style={styles.Avatar}>
            <Ionicons name="person" size={70} color="#d9d9e8" />
            <View style={styles.CameraBadge}>
              <Ionicons name="camera" size={16} color="white" />
            </View>
          </View>
        </View>
        {/* aqui acaba o header e icone do avatar */}

        {/* TODAS AS INFORMAÇOE DE TUTOR */}
        <View style={styles.Conteudo}>
          <Text style={styles.Nome}>João da Silva</Text>
          <View style={styles.SobreMim}>
            <Ionicons name='person-circle-outline' size={22} color={themeTutor.primary}/>
            <Text>Sobre mim:</Text>
          </View>



           {/* bio */}
          <View style={styles.Bio}>
            {editando ? (
              <TextInput
                value={bioTexto}
                onChangeText={setBioTexto}
                onBlur={() => setEditando(false)}
                autoFocus
              />
            ) : (
              <Pressable onPress={() => setEditando(true)}>
                <Text>{bioTexto}</Text>
              </Pressable>
            )}
          </View>




          {/* Informações pessoais */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="person-outline" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Informações pessoais</Text>
              </View>
            </View>
            
            <View style={styles.InfoBox}>
              <View style={styles.InfoItem}>
                <Ionicons name="card-outline" size={20} color={themeTutor.primary} />
                <View style={styles.InfoTextos}>
                  <Text style={styles.InfoLabel}>Matrícula</Text>

                  {/* DADOS MOCKADOS DE TUTOR_DADOS PARA MATRICULA */}

                  <Text style={styles.InfoValor}>{TUTOR_DADOS.matricula}</Text>
                </View>
            </View>

            <View style={styles.InfoItem}>
              <Ionicons name="calendar-outline" size={20} color={themeTutor.primary} />
              <View style={styles.InfoTextos}>
                
                 {/* DADOS MOCKADOS DE TUTOR_DADOS PARA IDADE */}

                <Text style={styles.InfoLabel}>Idade</Text>
                <Text style={styles.InfoValor}>{TUTOR_DADOS.idade} anos</Text>
              </View>
              </View>
            </View>
        </View>

        


                     {/* Matérias que leciona  */}
  <View style={styles.Card}>
    <View style={styles.CardHeader}>
      <View style={styles.CardHeaderEsquerda}>
        <Ionicons name="book-outline" size={20} color={themeTutor.primary} />
        <Text style={styles.CardTitulo}>Matérias que leciona</Text>
      </View>
      <Pressable>
        <Ionicons name="add-circle-outline" size={24} color={themeTutor.primary} />
      </Pressable>
    </View>

      {MATERIAS_LECIONADAS.map((itinerario) => (
        <View key={itinerario.nome} style={styles.ItinerarioSecao}>
          <Text style={styles.ItinerarioNome}>{itinerario.nome}</Text>
          <View style={styles.Materias}>
            {itinerario.materias.map((materia) => (
              <View key={materia} style={styles.MateriaChip}>
                <Text style={styles.MateriaTexto}>{materia}</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
  </View>


    

          {/* matches */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="school-sharp" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Matches</Text>
              </View>
              
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
              >

                <Text style={styles.CardLink}>Ver todos</Text>
                <Ionicons name="chevron-forward" size={14} color={themeTutor.primary} />
              </Pressable>
            </View>


            {/* dados dinamicos q vao vir do back  */}

            <ScrollView horizontal={true} showsHorizontalScrollIndicator={false} style={styles.MatchesLista}>
              {MATCHES.map((match) => (
                <View key={match.nome} style={styles.MatchCard}>
                  <Text style={styles.MatchNome}>{match.nome}</Text>
                  <Text style={styles.MatchMateria}>{match.materia}</Text>
                </View>
              ))}
            </ScrollView>
          </View>

  

          {/* Minha agenda */}
          <View style={styles.Card}>
            <View style={styles.CardHeader}>
              <View style={styles.CardHeaderEsquerda}>
                <Ionicons name="calendar-outline" size={20} color={themeTutor.primary} />
                <Text style={styles.CardTitulo}>Minha agenda</Text>
              </View>

              {/* botao para ir para a AGENDA */}
              <Pressable
                style={{ flexDirection: "row", alignItems: "center", gap: 2 }}
                onPress={() => router.push("/agenda")} 
              >
                <Text style={styles.CardLink}>Ver agenda completa</Text>
                <Ionicons name="chevron-forward" size={14} color={themeTutor.primary} />
              </Pressable>
            </View>


                    {/* dados dinamicos q vao vir do back AGENDA */}
                  <ScrollView horizontal={true} style={styles.Agenda}>

                    {/* percorre o Mock de agenda */}
                    {AGENDA_MOCK.map((item) => {

                      /* pega só os 3 primeiros horários do dia pra exibir */
                      const horariosVisiveis = item.horario.slice(0, 3);

                      /*  se esse dia tem mais de 3 horários (TRUE) vai mostrar "..."*/
                      const temMais = item.horario.length > 3;

                      return (
                        <View key={item.dia} style={styles.DiaCard}>
                          <Text style={styles.DiaSemana}>{item.dia}</Text>
                          {horariosVisiveis.map((hora, index) => (
                            <Text key={index} style={styles.DiaHora}>{hora}</Text>
                          ))}
                          {temMais && <Text style={styles.DiaHora}>...</Text>}
                        </View>
                      );
                    })}
                  </ScrollView>
            </View>
          </View>

          
      </ScrollView>
    </View>
  );
}

/* style da tela */

// #764ba2 #667eea #b57aef cores gradients padrao
const statusBarHeight = StatusBar.currentHeight
  ? StatusBar.currentHeight + 22
  : 64;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f2fa",
  },

  Header: {
    backgroundColor: "#764ba2",
    paddingTop: statusBarHeight,
    paddingHorizontal: 16,
    paddingBottom: 60,
    borderBottomLeftRadius: 40,
    borderBottomRightRadius: 40,
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

  HeaderTitulo: {
    fontSize: 18,
    color: "white",
    fontWeight: "600",
  },

  // o avatar agora fica FORA do Header, sobrepondo ele
  AvatarWrapper: {
    alignItems: "center",
    marginTop: -65, // metade da altura do Avatar, pra "cortar" a curva do header
    zIndex: 2,
  },

  Avatar: {
    width: 130,
    height: 130,
    borderRadius: 65,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 5,
  },

  CameraBadge: {
    position: "absolute",
    right: 0,
    bottom: 0,
    width: 36,
    height: 36,
    borderRadius: 36,
    backgroundColor: "#764ba2",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "white",
  },

  Nome: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#2b2b2b",
    marginTop: 12,
    marginBottom:5,
    textAlign: "center",
  },

  SobreMim:{
    justifyContent:"center",
    alignItems:'center',
    gap:5,
    width: '100%',
    marginBottom: 5,
    flexDirection: "row",
  },

  Bio: {
    borderWidth: 1,
    borderColor: themeTutor.primaryDark,
    borderRadius: 10,
    paddingLeft: 10,
    paddingTop: 10,
    paddingBottom: 10,
    // ou so padding:10
    marginLeft: 10,
    marginRight: 10,
    marginBottom:16
  },

  Conteudo: {
    paddingHorizontal: 16,
    paddingBottom: 90, // espaço pro botão fixo não cobrir o último card
  },

/* fim de bio */

  Card: {
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  CardHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  CardHeaderEsquerda: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  CardTitulo: {
    fontSize: 16,
    fontWeight: "600",
    color: "#2b2b2b",
  },

  CardLink: {
    color: "#764ba2",
    fontSize: 13,
    fontWeight: "500",
  },

  /* Informaçoes pessoais */
  InfoBox: {
    flexDirection: "row",
    backgroundColor: "#f3eefc",
    borderRadius: 12,
    padding: 14,
  },

  InfoItem: {
    flex: 1,
    flexDirection: "row",
    gap: 8,
    alignItems: "center",
  },

  InfoTextos: {
    gap: 2,
  },

  InfoLabel: {
    fontSize: 12,
    color: "#7a7a7a",
  },

  InfoValor: {
    fontSize: 15,
    fontWeight: "600",
    color: "#2b2b2b",
  },


  /* materias */
  Materias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },

  MateriaChip: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    backgroundColor: "#f3eefc",
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
  },

  MateriaTexto: {
    color: "#764ba2",
    fontWeight: "500",
  },

  
ItinerarioSecao: {
  marginTop: 16,
  paddingTop: 12,
  borderTopWidth: 1,
  borderTopColor: themeTutor.secondary,
},

ItinerarioNome: {
  fontSize: 12,
  fontWeight: "700",
  color: "#9A96A3",
  marginBottom: 10,
  textTransform: "uppercase",
  letterSpacing: 0.4,
},

/* ------- */
/* MATCHES */

  MatchesLista: {
    flexDirection: "row",
    gap: 10,
  },

  MatchCard: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#eee0fa",
    borderRadius: 12,
    padding: 10,
    alignItems: "center",
  },

  MatchNome: {
    fontWeight: "600",
    fontSize: 13,
    color: "#2b2b2b",
    marginTop: 4,
    textAlign: "center",
  },

  MatchMateria: {
    fontSize: 12,
    color: "#7a7a7a",
    marginBottom: 4,
  },

  MatchNota: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  MatchNotaTexto: {
    fontSize: 12,
    fontWeight: "600",
    color: "#2b2b2b",
  },


  /* AGENDAAA */
  Agenda: {
    flexDirection: "row",
    gap: 10,
    
  },

  DiaCard: {
    flex: 1,
    backgroundColor: "#f3eefc",
    borderRadius: 12,
    paddingVertical: 15,
    alignItems: "center",
    width:90,
    marginRight:5,
  },

  DiaSemana: {
    fontSize: 16,
    fontWeight: "bold",
    color: themeTutor.primary
  },

  DiaHora: {
    fontSize: 12,
    color: "#2b2b2b",
    marginTop: 4,
  },

 

 

});

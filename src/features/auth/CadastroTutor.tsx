import { View, Text, ScrollView, TextInput, Pressable, StatusBar, StyleSheet, Image, Alert } from 'react-native';
import { useState } from 'react';
import { colors } from "../../shared/styles/colors";
import { Ionicons } from '@expo/vector-icons';
import InputLabel from '../../shared/components/InputLabel';
import SectionTitle from '../../shared/components/SectionTitle';
import CardMaterias from '../../shared/components/CardMaterias';
import { themeTutor } from '../../shared/styles/themeTutor';

//calculo para ter um margem no header dos usuarios
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;





export default function CadastroTutor() {
  //hook dos inputs para guardar valores
  const [nome, setNome] = useState("");
  const [idade, setIdade] = useState("");
  const [matricula, setMatricula] = useState("");
  const [bio, setBio] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState("");

  
  // parte do dropDown
const itinerarios = [
    {
      nome: "Linguagens e suas tecnologias",
      materias: ["Português", "Inglês", "Espanhol", "Artes"],
    },
    {
      nome: "Matemática e suas tecnologias",
      materias: ["Matemática", "Estatística", "Geometria"],
    },
    {
      nome: "Ciências da natureza e suas tecnologias",
      materias: ["Física", "Química", "Biologia"],
    },
    {
      nome: "Ciências humanas e sociais aplicadas",
      materias: ["História", "Geografia", "Filosofia", "Sociologia"],
    },
    {
      nome: "Formação técnica e profissional",
      materias: ["Lógica de Programação", "HTML, CSS e JS", "Banco de Dados"],
    },
  ];

    //hook para guardar os valores de Itinerarios
  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>(
    [],
  );

    
  const [itinerarioAberto, setItinerarioAberto] = useState<string | null>(null);

  function toggleMateria(materia: string) {
    if (materiasSelecionadas.includes(materia)) {
      setMateriasSelecionadas(
        materiasSelecionadas.filter((item) => item !== materia),
      );
    } else {
      setMateriasSelecionadas([...materiasSelecionadas, materia]);
    }
  }

  function toggleItinerario(nomeItinerario: string) {
    if (itinerarioAberto === nomeItinerario) {
      setItinerarioAberto(null);
    } else {
      setItinerarioAberto(nomeItinerario);
    }
  }

  function handleCadastro() {
    setErroSenha("");

    if (!nome.trim() || !idade.trim() || !matricula.trim()) {
      Alert.alert("Atenção", "Preencha todos os campos obrigatórios.");
      return;
    }

    if (senha !== confirmarSenha) {
      setErroSenha("As senhas não coincidem");
      return;
    }

    if (senha.length < 6) {
      setErroSenha("A senha deve ter no mínimo 6 caracteres");
      return;
    }

    console.log("Cadastro válido:", {
      nome,
      idade,
      matricula,
      senha,
      bio,
      materiasSelecionadas,
    });
    /* router.push("/perfil-aluno"); -------------------------------------------- */
  }

  function handleLimpar() {
    setNome("");
    setIdade("");
    setMatricula("");
    setSenha("");
    setConfirmarSenha("");
    setBio("");
    setMateriasSelecionadas([]);
    setItinerarioAberto(null);
    setErroSenha("");
  }


  
  
  return (
    
    <View style={styles.container}>
      {/* organiza views dentro do header */}
      <View style={styles.header}>
        <Pressable style={styles.botaoVoltar}>
          <Ionicons name={'arrow-back'} size={22} color={colors.primaryLight}/>   
        </Pressable>

          {/* organiza itens dentro da view */}
        <View style={styles.headerContent}>
          
          <Image
              source={require("../../../assets/logo.png")}
              style={styles.logoCabecalho}
            />
             <Text style={styles.tituloHeader}>Cadastro de Tutor</Text>
             <Text style={styles.subtituloHeader}>Preencha os dados abaixo para registrar um novo Tutor</Text>
        </View>
      </View>
      {/* termina o header */}


          {/* __-----____---___-- INFORMAÇOES PESSOAIS __-----____---___-- */}
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.card}>
          <SectionTitle icon="person-sharp" size={20} color={colors.primary} title="Informações Pessoais" />

          <InputLabel Label="Nome Completo" placeholder="Digite seu Nome"
            value={nome}
            onChangeText={setNome}
          />

          <View style={styles.campos}>
            <InputLabel Label="Idade" placeholder="Digite sua idade" keyboardType="numeric" 
             value={idade}
            onChangeText={setIdade}
            />
            <InputLabel Label="Matrícula" placeholder="Digite sua Matrícula" keyboardType="numeric"  
            value={matricula}
            onChangeText={setMatricula}
            />
          </View>
          <View style={styles.campos}>
            <InputLabel Label="Senha"  placeholder="Crie uma Senha" secureTextEntry 
             value={senha}
            onChangeText={setSenha}
            />
            <InputLabel Label="Confirmar Senha" placeholder="Confirme sua Senha" secureTextEntry 
             value={confirmarSenha}
            onChangeText={setConfirmarSenha}
            />
          </View>
          {/* {erroSenha ? <Text style={styles.erro}>{erroSenha}</Text> : null} */}
        </View>
        

        {/*__-----____---___-- BIO DESCRIÇAO __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="person-circle-outline" size={20} color={colors.primary} title="Bio/Descrição" />
          <TextInput style={styles.bio} placeholder="Fale um pouco sobre você" multiline 
           value={bio}
            onChangeText={setBio}
            />
        </View>
        

        {/*__-----____---___-- MATERIAS __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="school-sharp" size={20} color={colors.primary} title="Matérias Lecionadas" />

          <Text style={styles.subLabel}>
            Selecione o itinerário e depois as matérias que o tutor está apto a lecionar.
          </Text>

          <View style={styles.listaItinerarios}>
            {itinerarios.map((itinerario) => {
              const aberto = itinerarioAberto === itinerario.nome;

              return (
                <View key={itinerario.nome} style={styles.itinerarioBloco}>
                  <Pressable
                    style={styles.itinerarioCabecalho}
                    onPress={() => toggleItinerario(itinerario.nome)}
                  >
                    <Text style={styles.itinerarioTexto}>
                      {itinerario.nome}
                    </Text>
                    <Text style={styles.itinerarioSeta}>
                      {aberto ? "▲" : "▼"}
                    </Text>
                  </Pressable>

                  {aberto && (
                    <View style={styles.itinerarioMaterias}>
                      {itinerario.materias.map((materia) => (
                        <CardMaterias
                          key={materia}
                          nome={materia}
                          selecionado={materiasSelecionadas.includes(materia)}
                          onPress={() => toggleMateria(materia)}
                        />
                      ))}
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

            {/* View de botoes */}
        <View style={styles.linhaBotoes}>
          {/* botao para limpar */}
          <Pressable style={styles.botaoSecundario} 
            onPress={handleLimpar}>
            <Text style={styles.textoBotaoSecundario}>Limpar</Text>
          </Pressable>

            {/* botao cadastrar */}
          <Pressable style={styles.botaoPrimario}  onPress={handleCadastro} >
            <Text style={styles.textoBotaoPrimario}>Cadastrar Tutor</Text>
          </Pressable>
        </View>
        
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    backgroundColor: '#764ba2',
    paddingTop: statusBarHeight,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 20,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  botaoVoltar: {
    height: 36,
    width: 36,
    borderRadius: 30,
    backgroundColor: "rgba(255,255,255,0.25)",
    justifyContent: 'center',
    alignItems: 'center',
    position:'absolute'
  },
  
  tituloHeader: {
    color: colors.primaryLight,
    fontSize: 22,
    fontWeight: "bold",
  },

  subtituloHeader: {
    color: "rgba(255,255,255,0.85)",
    fontSize: 13,
    textAlign: "center",
    marginTop: 4,
  },

logoCabecalho: {
        width: 48,
        height: 48,
        resizeMode: "contain",
        marginBottom: 8,
    },

  scrollContainer: {
    padding: 16,
    flex: 1,
  },
  campos: {
    width: '100%',
    flexDirection: 'row',
    gap: 10,
    
  },
  bio: {
    width: '100%',
    height: 100,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    padding: 10,
    textAlignVertical: 'top',
    marginBottom: 20,
    backgroundColor: '#fff',
  },
  materiasContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginBottom: 20,
  },

  card:{
    backgroundColor: colors.white,
    borderRadius: 16,
    padding: 16,
    gap: 12,
    marginBottom:20,
  },

  linhaBotoes: {
        flexDirection: "row",
        gap: 12,
    },
    botaoSecundario: {
        flex: 1,
        borderWidth: 1,
        borderColor: "#CCC",
        borderRadius: 8,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    textoBotaoSecundario: {
        color: colors.text,
        fontWeight: "600",
    },
    botaoPrimario: {
        flex: 2,
        backgroundColor: colors.primary,
        borderRadius: 8,
        height: 48,
        justifyContent: "center",
        alignItems: "center",
    },
    textoBotaoPrimario: {
        color: colors.white,
        fontWeight: "bold",
    },

    /* estilo de itinerarios */
subLabel: {
    fontSize: 12,
    color: themeTutor.textSecondary,
    marginTop: -20,
  },
  listaItinerarios: {
    gap: 8,
  },
  itinerarioBloco: {
    borderWidth: 1,
    borderColor: themeTutor.border,
    borderRadius: 8,
    overflow: "hidden",
  },
  itinerarioCabecalho: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    backgroundColor: themeTutor.primaryLight,
  },
  itinerarioTexto: {
    fontSize: 14,
    fontWeight: "600",
    color: themeTutor.text,
    flex: 1,
  },
  itinerarioSeta: {
    fontSize: 12,
    color: themeTutor.textSecondary,
  },
  itinerarioMaterias: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    padding: 12,
  },
  /* aqui termina */
});

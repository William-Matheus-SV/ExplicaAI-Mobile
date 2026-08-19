import { View, Text, ScrollView, TextInput, Pressable, StatusBar, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { colors } from "../../shared/styles/colors";
import { Ionicons } from '@expo/vector-icons';
import InputLabel from '../../shared/components/InputLabel';
import SectionTitle from '../../shared/components/SectionTitle';
import CardMaterias from '../../shared/components/CardMaterias';

//calculo para ter um margem no header dos usuarios
const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

//tipagem TypeScript para os inputs
interface FormularioTutor {
  nome: string;
  idade: string;
  matricula: string;
  senha: string;
  confirmarSenha: string;
  bio: string;
}

const formularioVazio: FormularioTutor = {
  nome: '',
  idade: '',
  matricula: '',
  senha: '',
  confirmarSenha: '',
  bio: '',
}


const MATERIAS_DISPONIVEIS = ["Matemática", "Português", "Física", "Química", "Biologia", "História"];



export default function CadastroTutor() {
  //useState dos formularios
  const [formulario, setFormulario] = useState<FormularioTutor>(formularioVazio);

//
function handleChange(campo: keyof FormularioTutor, valor: string) {
  setFormulario((atual) => ({ ...atual, [campo]: valor }));
}


  const [materiasSelecionadas, setMateriasSelecionadas] = useState<string[]>([]);

  function toggleMateria(materia: string) {
    setMateriasSelecionadas((atual) =>
      atual.includes(materia)
        ? atual.filter((m) => m !== materia)
        : [...atual, materia]
    );
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
            value={formulario.nome}
            onChangeText={(texto) => handleChange('nome', texto)}
          />

          <View style={styles.campos}>
            <InputLabel Label="Idade" placeholder="Digite sua idade" keyboardType="numeric" 
             value={formulario.idade}
            onChangeText={(texto) => handleChange('idade', texto)}
            />
            <InputLabel Label="Matrícula" placeholder="Digite sua Matrícula" keyboardType="numeric"  
            value={formulario.matricula}
            onChangeText={(texto) => handleChange('nome', texto)}
            />
          </View>
          <View style={styles.campos}>
            <InputLabel Label="Senha"  placeholder="Crie uma Senha" secureTextEntry 
             value={formulario.senha}
            onChangeText={(texto) => handleChange('senha', texto)}
            />
            <InputLabel Label="Confirmar Senha" placeholder="Confirme sua Senha" secureTextEntry 
             value={formulario.confirmarSenha}
            onChangeText={(texto) => handleChange('confirmarSenha', texto)}
            />
          </View>
        </View>
        

        {/*__-----____---___-- BIO DESCRIÇAO __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="person-circle-outline" size={20} color={colors.primary} title="Bio/Descrição" />
          <TextInput style={styles.bio} placeholder="Fale um pouco sobre você" multiline 
           value={formulario.bio}
            onChangeText={(texto) => handleChange('bio', texto)}
            />
        </View>
        

        {/*__-----____---___-- MATERIAS __-----____---___-- */}
        <View style={styles.card}>
          <SectionTitle icon="school-sharp" size={20} color={colors.primary} title="Matérias Lecionadas" />

          <View style={styles.materiasContainer}>
            {MATERIAS_DISPONIVEIS.map((materia) => (
              <CardMaterias
                key={materia}
                nome={materia}
                selecionado={materiasSelecionadas.includes(materia)}
                onPress={() => toggleMateria(materia)}
              />
            ))}
          </View>
        </View>

        {/* __-----____---___--HORARIOS ----____----____-----____ */}
        <View style={styles.card}>
          <SectionTitle icon="calendar" size={20} color={colors.primary} title="Minha Agenda" />
        </View>



            {/* View de botoes */}
        <View style={styles.linhaBotoes}>
          {/* botao para limpar */}
          <Pressable style={styles.botaoSecundario} 
            onPress={() => {setFormulario(formularioVazio);
                            setMateriasSelecionadas([])
            }}>
            <Text style={styles.textoBotaoSecundario}>Limpar</Text>
          </Pressable>

            {/* botao cadastrar */}
          <Pressable style={styles.botaoPrimario} /* onPress={handleCadastro} */>
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
    marginBottom:10
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
});

import { View, Text, ScrollView, TextInput, Pressable, StatusBar, StyleSheet } from 'react-native';
import { useState } from 'react';
import InputLabel from '../../shared/components/InputLabel';
import SectionTitle from '../../shared/components/SectionTitle';
import CardMaterias from '../../shared/components/CardMaterias';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;
const MATERIAS_DISPONIVEIS = ["Matemática", "Português", "Física", "Química", "Biologia", "História"];

function CadastroTutor() {
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
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Pressable style={styles.botaoVoltar}>
            <Text style={styles.textoBotaoVoltar}>Voltar</Text>
          </Pressable>
          <Text style={styles.tituloHeader}>Cadastro de Tutor</Text>
        </View>
      </View>

      <ScrollView style={styles.scrollContainer}>
        <SectionTitle title="Informações Pessoais" />

        <InputLabel Label="Nome"  placeholder="Digite seu Nome" />

        <View style={styles.campos}>
          <InputLabel Label="Idade" placeholder="Digite sua idade" keyboardType="numeric" />
          <InputLabel Label="Matrícula" placeholder="Digite sua Matrícula" keyboardType="numeric" />
        </View>

        <View style={styles.campos}>
          <InputLabel Label="Senha"  placeholder="Crie uma Senha" secureTextEntry />
          <InputLabel Label="Confirme Senha" placeholder="Confirme sua Senha" secureTextEntry />
        </View>

        <SectionTitle title="Bio/Descrição" />
        <TextInput style={styles.bio} placeholder="Fale um pouco sobre você" multiline />

        <SectionTitle title="Matérias Lecionadas" />
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 10,
  },
  botaoVoltar: {
    height: 30,
    width: '30%',
    borderRadius: 30,
    borderWidth: 1,
    borderColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textoBotaoVoltar: {
    color: '#ffffff',
  },
  tituloHeader: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
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
});

export default CadastroTutor;
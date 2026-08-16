import { View, Text, StyleSheet, StatusBar, Pressable } from 'react-native';

const statusBarHeight = StatusBar.currentHeight ? StatusBar.currentHeight + 22 : 64;

function PerfilTutor() {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.content}>
          <Pressable style={styles.botaoVoltar}>
            <Text style={styles.textoBotaoVoltar}>Voltar</Text>
          </Pressable>
          <Text style={styles.tituloHeader}>Perfil do Tutor</Text>
        </View>
      </View>

      <View style={styles.conteudoCentral}>
        <Text style={styles.textoPlaceholder}>ola</Text>
        <Text style={styles.textoSecundario}>Aqui virão as informações do tutor</Text>
      </View>
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
    paddingLeft: 16,
    paddingRight: 16,
    paddingBottom: 44,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },

  content: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  botaoVoltar: {
    backgroundColor: 'white',
    width: 88,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 44,
  },

  textoBotaoVoltar: {
    color: '#764ba2',
    fontWeight: '600',
  },

  tituloHeader: {
    fontSize: 16,
    color: '#ffffff',
    fontWeight: 'bold',
  },

  conteudoCentral: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },

  textoPlaceholder: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },

  textoSecundario: {
    fontSize: 14,
    color: '#666',
    marginTop: 8,
  },
});

export default PerfilTutor;
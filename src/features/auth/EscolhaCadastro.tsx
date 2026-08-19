import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useRouter } from 'expo-router';

export default function EscolhaCadastro() {
  const router = useRouter();

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.logo}>
          Explica<Text style={styles.logoGreen}>Aí</Text>
        </Text>

        <Text style={styles.title}>
          Como você quer{'\n'}se cadastrar?
        </Text>

        <Text style={styles.subtitle}>
          Escolha uma opção para continuar
        </Text>

        {/* ALUNO */}
        <View style={styles.cardAluno}>
          <View style={styles.iconAluno}>
            <Text style={styles.icon}>🎓</Text>
          </View>

          <Text style={styles.titleAluno}>Aluno</Text>

          <Text style={styles.description}>
            Aprenda, tire suas dúvidas e encontre tutores para ajudar nas
            matérias em que você possui dificuldade.
          </Text>

          <TouchableOpacity
            style={styles.buttonAluno}
            onPress={() => router.push('/cadastro-aluno')}
          >
            <Text style={styles.buttonTextAluno}>
              Cadastrar como aluno
            </Text>

            <Text style={styles.arrowAluno}>→</Text>
          </TouchableOpacity>
        </View>

        {/* TUTOR */}
        <View style={styles.cardTutor}>
          <View style={styles.iconTutor}>
            <Text style={styles.icon}>▣</Text>
          </View>

          <Text style={styles.titleTutor}>Tutor</Text>

          <Text style={styles.description}>
            Compartilhe seus conhecimentos, ajude alunos e ofereça aulas
            nas matérias que você domina.
          </Text>

          <TouchableOpacity
            style={styles.buttonTutor}
            onPress={() => router.push('/cadastro-tutor')}
          >
            <Text style={styles.buttonTextTutor}>
              Cadastrar como tutor
            </Text>

            <Text style={styles.arrowTutor}>→</Text>
          </TouchableOpacity>
        </View>

        {/* VOLTAR */}
        <TouchableOpacity
          style={styles.loginCard}
          onPress={() => router.push('/login')}
        >
          <Text style={styles.backArrow}>←</Text>

          <View>
            <Text style={styles.loginQuestion}>
              Já tem uma conta?
            </Text>

            <Text style={styles.loginText}>
              Voltar para o login
            </Text>
          </View>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAF8',
  },

  scrollContent: {
    paddingHorizontal: 22,
    paddingTop: 35,
    paddingBottom: 30,
  },

  logo: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: '800',
    color: '#171717',
    marginBottom: 35,
  },

  logoGreen: {
    color: '#20B96B',
  },

  title: {
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '800',
    textAlign: 'center',
    color: '#17202A',
    marginBottom: 12,
  },

  subtitle: {
    fontSize: 18,
    textAlign: 'center',
    color: '#64748B',
    marginBottom: 35,
  },

  cardAluno: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E5F1EA',
    elevation: 3,
  },

  cardTutor: {
    backgroundColor: '#FFFFFF',
    borderRadius: 28,
    padding: 22,
    marginBottom: 22,
    borderWidth: 1,
    borderColor: '#E9E1F7',
    elevation: 3,
  },

  iconAluno: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#E5F7ED',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  iconTutor: {
    width: 90,
    height: 90,
    borderRadius: 20,
    backgroundColor: '#EEE6FF',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 18,
  },

  icon: {
    fontSize: 42,
  },

  titleAluno: {
    fontSize: 30,
    fontWeight: '800',
    color: '#087A43',
    marginBottom: 10,
  },

  titleTutor: {
    fontSize: 30,
    fontWeight: '800',
    color: '#4B20B8',
    marginBottom: 10,
  },

  description: {
    fontSize: 16,
    lineHeight: 25,
    color: '#334155',
  },

  buttonAluno: {
    height: 62,
    borderRadius: 15,
    backgroundColor: '#E1F5E9',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  buttonTutor: {
    height: 62,
    borderRadius: 15,
    backgroundColor: '#EEE5FF',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 25,
  },

  buttonTextAluno: {
    fontSize: 17,
    fontWeight: '700',
    color: '#078442',
  },

  buttonTextTutor: {
    fontSize: 17,
    fontWeight: '700',
    color: '#4B20B8',
  },

  arrowAluno: {
    position: 'absolute',
    right: 20,
    fontSize: 32,
    color: '#078442',
  },

  arrowTutor: {
    position: 'absolute',
    right: 20,
    fontSize: 32,
    color: '#4B20B8',
  },

  loginCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    padding: 22,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E8ECEA',
  },

  backArrow: {
    fontSize: 32,
    color: '#17202A',
    marginRight: 18,
  },

  loginQuestion: {
    fontSize: 16,
    color: '#17202A',
    marginBottom: 5,
  },

  loginText: {
    fontSize: 18,
    fontWeight: '700',
    color: '#20B96B',
  },
});
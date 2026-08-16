import { Pressable, Text, StyleSheet } from 'react-native';

interface CardMateriasProps {
  nome: string;
  selecionado: boolean;
  onPress: () => void;
}

function CardMaterias({ nome, selecionado, onPress }: CardMateriasProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[styles.card, selecionado && styles.cardSelecionado]}
    >
      <Text style={[styles.texto, selecionado && styles.textoSelecionado]}>
        {nome}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#764ba2",
    backgroundColor: "white",
  },
  cardSelecionado: {
    backgroundColor: "#764ba2",
  },
  texto: {
    color: "#764ba2",
  },
  textoSelecionado: {
    color: "white",
  },
});

export default CardMaterias;
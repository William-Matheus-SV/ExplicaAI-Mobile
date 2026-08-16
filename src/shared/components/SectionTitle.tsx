// components/SectionTitle.tsx
import { Text, View } from 'react-native';
import { StyleSheet } from 'react-native';

interface SectionTitleProps {
  title: string;
}

function SectionTitle({ title }: SectionTitleProps) {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderLeftWidth: 4,
    borderLeftColor: "#764ba2",
    marginBottom: 20,
  },
  text: {
    fontSize: 20,
  },
});

export default SectionTitle;
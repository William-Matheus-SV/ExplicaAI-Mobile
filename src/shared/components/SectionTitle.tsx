// components/SectionTitle.tsx
import { Text, View, StyleSheet } from 'react-native';
// Section TITLE permite agora colocar um icone
import { Ionicons } from '@expo/vector-icons';
import { ComponentProps } from 'react';

interface SectionTitleProps {
  title: string;
  icon: ComponentProps<typeof Ionicons>['name']; // reaproveita o tipo do próprio Ionicons
  size: number;
  color: string;
}

function SectionTitle({ title, icon, size, color }: SectionTitleProps) {
  return (
    //view que engloba tudo
    <View style={styles.container}>
        <Ionicons name={icon} size={size} color={color} />
    {/* titulo */}
      <Text style={styles.text}>{title}</Text>
    </View>
  );
}
//#764ba2
const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",   // <- faltava isso
    alignItems: "center",
    gap: 8,
    paddingLeft: 8,
    marginBottom: 20,
  },

  text: {
    fontSize: 20,
  },

});

export default SectionTitle;
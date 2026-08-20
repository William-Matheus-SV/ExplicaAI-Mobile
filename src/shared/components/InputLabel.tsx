import { Text, TextInput, View, StyleSheet, TextInputProps } from 'react-native';
import { themeTutor } from '../styles/themeTutor';

interface InputLabelProps extends TextInputProps {
  Label: string;
  placeholder: string;
}

function InputLabel({ Label, placeholder, ...rest }: InputLabelProps) {
  return (
    <View style={styles.ui}>
      <Text style={styles.Label}>{Label}</Text>
      <View style={styles.BoxInput}>
        <TextInput
          style={styles.Input}
          placeholder={placeholder}
          {...rest}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  ui: {
    flex: 1,
    marginRight: 5,
  },

  BoxInput: {
    height: 40,
    width: "100%",
    borderWidth: 1,
    borderColor: "#ccc",
    flexDirection: "row",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 15,
    backgroundColor: "white",
  },

  Input: {
    height: "100%",
    width: "100%",
    borderRadius: 10,
    paddingHorizontal: 10,
  },

  Label: {
    marginBottom: 5,
    color: themeTutor.text
  }
});

export default InputLabel;
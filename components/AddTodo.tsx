import { useState } from "react";
import {
  Keyboard,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

export default function AddTodo({
  onInsert,
}: {
  onInsert: (x: string) => void;
}) {
  const [text, setText] = useState("");

  const onPress = () => {
    onInsert(text);
    setText("");
    Keyboard.dismiss();
  };

  return (
    <View style={styles.block}>
      <TextInput
        placeholder='할일을 입력하세요.'
        style={styles.input}
        value={text}
        onChangeText={setText}
        onSubmitEditing={onPress}
        returnKeyType='done'
      />
      <TouchableOpacity activeOpacity={0.5} onPress={onPress}>
        <View style={styles.buttonStyle}>
          <Text>+</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    height: 64,
    paddingHorizontal: 16,
    borderColor: "#bdbdbd",
    borderTopWidth: 1,
    borderBottomWidth: 1,
    justifyContent: "center",
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    fontSize: 16,
    paddingVertical: 8,
    flex: 1,
  },
  buttonStyle: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
    backgroundColor: "#26a69a",
    borderRadius: 24,
  },
});

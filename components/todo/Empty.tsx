import { StyleSheet, Text, View } from "react-native";

export default function Empty() {
  return (
    <View style={styles.block}>
      <Text style={styles.description}>야호! 할 일이 없습니다!!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  block: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  description: {
    fontSize: 24,
    color: "#9e9e9e",
  },
});

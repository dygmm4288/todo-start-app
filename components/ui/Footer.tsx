import { Link } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function Footer() {
  return (
    <View style={styles.footer}>
      <Link href={"/"} asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Todo</Text>
        </TouchableOpacity>
      </Link>

      <Link href='/weather' asChild>
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Weather</Text>
        </TouchableOpacity>
      </Link>
    </View>
  );
}

const styles = StyleSheet.create({
  footer: {
    height: 60,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#eee",
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ddd",
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    color: "#333",
  },
});

import { StyleSheet, Text, View } from "react-native";
import { dateFormatting } from "../util/date";

export default function DateHeader({ date }: { date: Date }) {
  return (
    <>
      <View style={styles.block}>
        <Text style={styles.dateText}>{dateFormatting(date)}</Text>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  block: {
    padding: 16,
    backgroundColor: "#26a69a",
  },
  dateText: {
    fontSize: 24,
    color: "white",
  },
});

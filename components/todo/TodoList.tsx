import useTodo from "@/hooks/useTodo";
import { FlatList, StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";

export default function TodoList() {
  const { todos } = useTodo();
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({ item }) => <TodoItem todo={item} />}
      keyExtractor={(item) => item.id.toString()}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    flex: 1,
  },
  separator: {
    backgroundColor: "#e0e0e0",
    height: 1,
  },
});

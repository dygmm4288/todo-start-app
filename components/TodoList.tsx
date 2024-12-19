import { FlatList, StyleSheet, View } from "react-native";
import TodoItem from "./TodoItem";

export type Todo = {
  id: number;
  text: string;
  done: boolean;
};

export default function TodoList({
  todos,
  onToggle,
  onRemove,
}: {
  todos: Todo[];
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  return (
    <FlatList
      ItemSeparatorComponent={() => <View style={styles.separator} />}
      style={styles.list}
      data={todos}
      renderItem={({ item }) => (
        <TodoItem todo={item} onRemove={onRemove} onToggle={onToggle} />
      )}
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

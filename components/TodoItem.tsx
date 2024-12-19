import React from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Todo } from "./TodoList";

export default function TodoItem({
  todo,
  onToggle,
  onRemove,
}: {
  todo: Todo;
  onToggle: (id: number) => void;
  onRemove: (id: number) => void;
}) {
  const remove = () => {
    Alert.alert(
      "삭제",
      "정말로 삭제하시겠어요?",
      [
        { text: "취소", onPress: () => {}, style: "cancel" },
        {
          text: "삭제",
          onPress: () => {
            onRemove(todo.id);
          },
          style: "destructive",
        },
      ],
      {
        cancelable: true,
        onDismiss: () => {},
      },
    );
  };
  return (
    <View style={styles.item}>
      <TouchableOpacity onPress={() => onToggle(todo.id)}>
        <View
          style={{ ...styles.circle, ...(todo.done ? styles.filled : {}) }}
        />
      </TouchableOpacity>
      <Text style={[styles.text, todo.done && styles.lineThrough]}>
        {todo.text}
      </Text>
      <TouchableOpacity onPress={remove}>
        <View>
          <Text>X</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
}
const styles = StyleSheet.create({
  item: {
    flexDirection: "row",
    padding: 16,
    alignItems: "center",
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderColor: "#26a69a",
    borderWidth: 1,
    marginRight: 16,
  },
  filled: {
    backgroundColor: "#26a69a",
  },
  text: {
    flex: 1,
    fontSize: 16,
    color: "#212121",
  },
  lineThrough: {
    textDecorationLine: "line-through",
  },
});

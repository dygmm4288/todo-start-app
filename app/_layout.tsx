import AddTodo from "@/components/AddTodo";
import DateHeader from "@/components/DateHeader";
import Empty from "@/components/Empty";
import TodoList from "@/components/TodoList";
import { useAsyncStorage } from "@react-native-community/async-storage";
import { useEffect, useState } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function RootLayout() {
  const today = new Date();
  const [todos, setTodos] = useState([
    { id: 1, text: "작업환경 설정", done: true },
    { id: 2, text: "리액트 네이티브 기초 공부", done: false },
    { id: 3, text: "투두리스트 만들어보기", done: false },
  ]);
  const onInsert = (text: string) => {
    // 새로 등록할 항목의 id를 구합니다.
    // 등록된 항목 중에서 가장 큰 id를 구하고, 그 값에 1을 더합니다.
    // 만약 리스트가 비어있다면 1을 id로 사용합니다.
    const nextId =
      todos.length > 0 ? Math.max(...todos.map((todo) => todo.id)) + 1 : 1;
    const todo = {
      id: nextId,
      text,
      done: false,
    };

    setTodos(todos.concat(todo));
  };

  const onToggle = (id: number) => {
    const nextTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, done: !todo.done } : todo,
    );
    setTodos(nextTodos);
  };

  const onRemove = (id: number) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  const asyncstorage = useAsyncStorage("todos");

  useEffect(() => {
    async function load() {
      try {
        const rawTodos = await asyncstorage.getItem();
        if (!rawTodos) throw new Error("");
        const savedTodos = JSON.parse(rawTodos);
        setTodos(savedTodos);
      } catch (e) {
        console.log("Failed to load todos");
      }
    }
    load();
  }, []);

  useEffect(() => {
    async function save() {
      try {
        await asyncstorage.setItem(JSON.stringify(todos));
      } catch (e) {
        console.log("Failed to save todos");
      }
    }
    save();
  }, [todos]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.avoid}>
        <DateHeader date={today} />
        {todos.length === 0 ? (
          <Empty />
        ) : (
          <TodoList onToggle={onToggle} todos={todos} onRemove={onRemove} />
        )}
        <AddTodo onInsert={onInsert} />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
});

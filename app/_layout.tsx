import AddTodo from "@/components/todo/AddTodo";
import DateHeader from "@/components/todo/DateHeader";
import Empty from "@/components/todo/Empty";
import TodoList from "@/components/todo/TodoList";
import Loading from "@/components/ui/Loading";
import useTodo from "@/hooks/useTodo";
import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function RootLayout() {
  const today = new Date();
  const isEmpty = useTodo((state) => state.isEmpty());
  const isLoading = useTodo((state) => state.isLoading);
  const fetchTodo = useTodo((state) => state.fetchTodo);

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.avoid}>
        <DateHeader date={today} />
        {isEmpty ? <Empty /> : <TodoList />}
        <AddTodo />
      </KeyboardAvoidingView>
      <Loading isLoading={isLoading} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 50,
  },
});

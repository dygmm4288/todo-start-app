import DateHeader from "@/components/todo/DateHeader";
import Footer from "@/components/ui/Footer";
import Loading from "@/components/ui/Loading";
import useTodo from "@/hooks/useTodo";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Slot } from "expo-router";
import { useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  StyleSheet,
} from "react-native";

export default function RootLayout() {
  const today = new Date();
  const isLoading = useTodo((state) => state.isLoading);
  const fetchTodo = useTodo((state) => state.fetchTodo);
  const client = new QueryClient();

  useEffect(() => {
    fetchTodo();
  }, []);

  return (
    <QueryClientProvider client={client}>
      <SafeAreaView style={{ flex: 1 }}>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : undefined}
          style={styles.avoid}>
          <DateHeader date={today} />
          <Slot />
          <Loading isLoading={isLoading} />
          <Footer />
        </KeyboardAvoidingView>
      </SafeAreaView>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  avoid: {
    flex: 1,
  },
});

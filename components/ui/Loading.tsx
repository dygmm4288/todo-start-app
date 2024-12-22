import { ActivityIndicator, StyleSheet, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = {
  isLoading: boolean;
  content?: string;
};

export default function Loading({
  isLoading,
  content = "잠시만 기다려 주세요...",
}: Props) {
  return (
    <>
      {isLoading && (
        <SafeAreaView style={styles.dimContainer}>
          <ActivityIndicator size='large' color='#ffffff' />
          <Text style={styles.dimText}>{content}</Text>
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  dimContainer: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: 9999,
    justifyContent: "center",
    alignItems: "center",
  },
  dimText: {
    marginTop: 10,
    color: "#fff",
    fontSize: 16,
  },
});

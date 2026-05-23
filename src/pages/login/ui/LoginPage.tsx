import { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/shared/config/colors";
import { spacing, fontSize } from "@/shared/config/theme";
import { AppleAuthButton } from "@/features/auth/ui/AppleAuthButton";
import { useAppleAuthNavigation } from "@/features/auth/model/use-apple-auth-navigation";

export function LoginPage() {
  const { completeAuth } = useAppleAuthNavigation();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>먹로그</Text>
        <Text style={styles.subtitle}>친구들의 솔직한 맛집 기록</Text>

        <AppleAuthButton
          loading={loading}
          onLoadingChange={setLoading}
          onSuccess={completeAuth}
          onError={setError}
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.bg.primary,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    gap: spacing.md,
    width: "100%",
  },
  title: {
    fontSize: 40,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginBottom: spacing.xl,
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.accent.coral,
    textAlign: "center",
  },
});

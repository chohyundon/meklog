import { useEffect } from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import * as Linking from "expo-linking";
import { colors } from "@/shared/config/colors";
import {
  APPLE_OAUTH_REDIRECT_URI,
  createSessionFromUrl,
} from "@/features/auth/api/apple-oauth";
import { useAppleAuthNavigation } from "@/features/auth/model/use-apple-auth-navigation";

export function AuthCallbackPage() {
  const router = useRouter();
  const { completeAuth } = useAppleAuthNavigation();

  useEffect(() => {
    const handleUrl = async (url: string) => {
      if (!url.startsWith(APPLE_OAUTH_REDIRECT_URI.split("?")[0])) return;

      try {
        await createSessionFromUrl(url);
        await completeAuth();
      } catch (error) {
        console.error(error);
        router.replace("/(auth)/login");
      }
    };

    Linking.getInitialURL().then((url) => {
      if (url) void handleUrl(url);
    });

    const subscription = Linking.addEventListener("url", ({ url }) => {
      void handleUrl(url);
    });

    return () => subscription.remove();
  }, [completeAuth, router]);

  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.accent.primary} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.bg.primary,
  },
});

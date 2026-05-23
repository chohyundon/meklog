import { Redirect } from "expo-router";
import { useAuthStore } from "@/entities/session/model/auth-store";

export function SplashPage() {
  const { session } = useAuthStore();
  return <Redirect href={session ? "/(tabs)" : "/(auth)/login"} />;
}

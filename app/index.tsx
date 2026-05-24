import { Redirect } from "expo-router";
import { useAuthStore } from "@/stores/authStore";

export default function SplashScreen() {
  const { session } = useAuthStore();
  return <Redirect href={session ? "/(tabs)" : "/(auth)/login"} />;
}

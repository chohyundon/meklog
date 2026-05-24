import { useCallback } from "react";
import { useRouter } from "expo-router";
import { supabase } from "@/shared/lib/supabase";
import { useAuthStore } from "@/entities/session/model/auth-store";
import { fetchUserProfile } from "@/features/auth/api/fetch-user-profile";

export function useAppleAuthNavigation() {
  const router = useRouter();
  const { setUser } = useAuthStore();

  const completeAuth = useCallback(async () => {
    const { data: { session } } = await supabase.auth.getSession();
    const userId = session?.user?.id;

    if (!userId) {
      throw new Error("세션을 확인할 수 없어요.");
    }

    const profile = await fetchUserProfile(userId);

    if (profile) {
      setUser(profile);
      router.replace("/(tabs)");
    } else {
      router.replace("/(auth)/onboarding");
    }
  }, [router, setUser]);

  return { completeAuth };
}

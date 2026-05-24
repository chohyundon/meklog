import { useCallback } from "react";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";

export function useAuth() {
  const { user, session, signOut: clearAuth } = useAuthStore();

  const signOut = useCallback(async () => {
    await supabase.auth.signOut();
    clearAuth();
  }, [clearAuth]);

  return {
    user,
    session,
    isAuthenticated: !!session,
    signOut,
  };
}

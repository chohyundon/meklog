import { useCallback } from "react";
import { supabase } from "@/shared/lib/supabase";
import { useAuthStore } from "@/entities/session/model/auth-store";

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

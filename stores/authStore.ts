import { create } from "zustand";
import type { Session } from "@supabase/supabase-js";
import type { User } from "@/types";

type AuthState = {
  user: User | null;
  session: Session | null;
  setUser: (user: User | null) => void;
  setSession: (session: Session | null) => void;
  signOut: () => void;
};

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  setUser: (user) => set({ user }),
  setSession: (session) => set({ session }),
  signOut: () => set({ user: null, session: null }),
}));

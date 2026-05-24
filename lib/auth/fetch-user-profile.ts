import { supabase } from "@/lib/supabase";
import type { User } from "@/types";

export async function fetchUserProfile(userId: string): Promise<User | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return data;
}

import { supabase } from "@/shared/lib/supabase";
import type { User } from "@/entities/user/model/types";

export async function fetchUserProfile(userId: string): Promise<User | null> {
  const { data } = await supabase
    .from("users")
    .select("*")
    .eq("id", userId)
    .maybeSingle();

  return data;
}

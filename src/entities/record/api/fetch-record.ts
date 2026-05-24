import { supabase } from "@/shared/lib/supabase";
import type { Record } from "@/entities/record/model/types";

export async function fetchRecord(id: string) {
  const { data, error } = await supabase
    .from("records")
    .select("*, user:users(id, nickname, avatar_url)")
    .eq("id", id)
    .single();

  if (error) throw error;
  return data as Record;
}

import { useInfiniteQuery } from "@tanstack/react-query";
import { supabase } from "@/lib/supabase";
import type { Record } from "@/types";

const PAGE_SIZE = 10;

async function fetchFeed({ pageParam = 0 }: { pageParam: number }) {
  const { data, error } = await supabase
    .from("records")
    .select("*, user:users(id, nickname, avatar_url)")
    .order("created_at", { ascending: false })
    .range(pageParam * PAGE_SIZE, (pageParam + 1) * PAGE_SIZE - 1);

  if (error) throw error;
  return data as Record[];
}

export function useFeed() {
  return useInfiniteQuery({
    queryKey: ["feed"],
    queryFn: fetchFeed,
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.length : undefined,
  });
}

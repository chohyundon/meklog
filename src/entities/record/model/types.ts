import type { User } from "@/entities/user/model/types";

export type Rating = 1 | 2 | 3 | 4 | 5;

export type Record = {
  id: string;
  user_id: string;
  place_id: string;
  place_name: string;
  place_address: string | null;
  place_lat: number | null;
  place_lng: number | null;
  photo_url: string;
  rating: Rating;
  review: string;
  menu_name: string | null;
  created_at: string;
  user?: User;
};

export type Reaction = {
  id: string;
  record_id: string;
  user_id: string;
  emoji: string;
  created_at: string;
};

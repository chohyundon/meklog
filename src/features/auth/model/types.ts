import type { User } from "@/entities/user/model/types";

export type AppleLoginResult = {
  userId: string;
  profile: User | null;
};

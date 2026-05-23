import type { Record } from "@/entities/record/model/types";
import type { User } from "@/entities/user/model/types";

export type FeedCardProps = {
  record: Record;
};

export type StoryRingProps = {
  user: User;
  hasNew?: boolean;
};

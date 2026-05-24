import type { TouchableOpacityProps } from "react-native";

export type User = {
  id: string;
  nickname: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};

export type Friendship = {
  id: string;
  user_id: string;
  friend_id: string;
  created_at: string;
};

export type InviteLink = {
  id: string;
  user_id: string;
  code: string;
  expires_at: string | null;
  created_at: string;
};

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

export type AppleLoginResult = {
  userId: string;
  profile: User | null;
};

export type UploadPayload = {
  placeId: string;
  placeName: string;
  placeAddress?: string;
  placeLat?: number;
  placeLng?: number;
  rating: Rating;
  review: string;
  menuName?: string;
};

export type ButtonVariant = "primary" | "secondary" | "ghost" | "kakao";

export type ButtonProps = TouchableOpacityProps & {
  variant?: ButtonVariant;
  loading?: boolean;
  label: string;
};

export type AvatarProps = {
  uri?: string | null;
  nickname?: string;
  size?: number;
};

export type StarRatingProps = {
  value: number;
  onChange?: (value: number) => void;
  size?: number;
  readonly?: boolean;
};

export type HeaderProps = {
  title?: string;
  showBack?: boolean;
  right?: React.ReactNode;
};

export type FeedCardProps = {
  record: Record;
};

export type StoryRingProps = {
  user: User;
  hasNew?: boolean;
};

export type AppleAuthButtonProps = {
  loading: boolean;
  onLoadingChange: (loading: boolean) => void;
  onSuccess: () => Promise<void>;
  onError: (message: string) => void;
};

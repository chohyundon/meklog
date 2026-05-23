import type { TouchableOpacityProps } from "react-native";

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
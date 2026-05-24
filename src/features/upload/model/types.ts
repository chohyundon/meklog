import type { TouchableOpacityProps } from "react-native";
import type { Rating } from "@/entities/record/model/types";

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

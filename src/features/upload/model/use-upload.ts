import { useState } from "react";
import * as ImagePicker from "expo-image-picker";
import * as ImageManipulator from "expo-image-manipulator";
import { supabase } from "@/shared/lib/supabase";
import { useAuthStore } from "@/entities/session/model/auth-store";
import { useFeedStore } from "@/entities/feed/model/feed-store";
import type { UploadPayload } from "@/features/upload/model/types";

export function useUpload() {
  const { user, session } = useAuthStore();
  const userId = user?.id ?? session?.user?.id;
  const { prependRecord } = useFeedStore();
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function pickImage() {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ["images"],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (result.canceled) return null;
    return result.assets[0].uri;
  }

  async function compressImage(uri: string) {
    const result = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1080 } }],
      { compress: 0.8, format: ImageManipulator.SaveFormat.JPEG }
    );
    return result.uri;
  }

  async function uploadRecord(imageUri: string, payload: UploadPayload) {
    if (!userId) return;
    setUploading(true);
    setError(null);

    try {
      const compressed = await compressImage(imageUri);

      const ext = "jpg";
      const fileName = `${userId}/${Date.now()}.${ext}`;
      const blob = await fetch(compressed).then((r) => r.blob());

      const { error: storageError } = await supabase.storage
        .from("record-photos")
        .upload(fileName, blob, { contentType: "image/jpeg" });

      if (storageError) throw storageError;

      const { data: { publicUrl } } = supabase.storage
        .from("record-photos")
        .getPublicUrl(fileName);

      const { data: record, error: dbError } = await supabase
        .from("records")
        .insert({
          user_id: userId,
          photo_url: publicUrl,
          ...payload,
          place_address: payload.placeAddress,
          place_lat: payload.placeLat,
          place_lng: payload.placeLng,
          menu_name: payload.menuName,
        })
        .select("*, user:users(id, nickname, avatar_url)")
        .single();

      if (dbError) throw dbError;
      prependRecord(record);

      return record;
    } catch (e: unknown) {
      setError(e instanceof Error ? e.message : "업로드 실패");
      return null;
    } finally {
      setUploading(false);
    }
  }

  return { pickImage, uploadRecord, uploading, error };
}

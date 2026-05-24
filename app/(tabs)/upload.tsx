import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Image,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { useUpload } from "@/hooks/useUpload";
import { Button } from "@/components/ui/Button";
import { StarRating } from "@/components/ui/StarRating";
import { colors } from "@/constants/colors";
import { spacing, fontSize, radius } from "@/constants/theme";
import type { Rating } from "@/types";

export default function UploadScreen() {
  const router = useRouter();
  const { pickImage, uploadRecord, uploading, error } = useUpload();

  const [imageUri, setImageUri] = useState<string | null>(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState("");
  const [menuName, setMenuName] = useState("");
  const [placeName, setPlaceName] = useState("");
  const [placeId] = useState("manual");

  const canSubmit =
    imageUri && rating > 0 && review.trim().length >= 1 && placeName.trim().length >= 1;

  async function handlePickImage() {
    const uri = await pickImage();
    if (uri) setImageUri(uri);
  }

  async function handleSubmit() {
    if (!canSubmit) return;

    const result = await uploadRecord(imageUri!, {
      placeId,
      placeName: placeName.trim(),
      rating: rating as Rating,
      review: review.trim(),
      menuName: menuName.trim() || undefined,
    });

    if (result) {
      Alert.alert("업로드 완료!", "맛집 기록이 등록됐어요 🎉", [
        { text: "확인", onPress: () => router.replace("/(tabs)") },
      ]);
    }
  }

  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.appbar}>
        <Text style={styles.appbarTitle}>기록 올리기</Text>
      </View>

      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <TouchableOpacity
            style={[styles.imagePicker, imageUri && styles.imagePickerFilled]}
            onPress={handlePickImage}
            activeOpacity={0.8}
            accessibilityRole="button"
            accessibilityLabel="사진 선택"
          >
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.previewImage} />
            ) : (
              <View style={styles.imagePlaceholder}>
                <Text style={styles.imagePlaceholderIcon}>📷</Text>
                <Text style={styles.imagePlaceholderText}>사진을 선택하세요</Text>
              </View>
            )}
          </TouchableOpacity>

          <View style={styles.section}>
            <Text style={styles.label}>별점 *</Text>
            <StarRating value={rating} onChange={(v) => setRating(v)} size={36} />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>가게 이름 *</Text>
            <TextInput
              style={styles.input}
              placeholder="어느 가게에 갔나요?"
              placeholderTextColor={colors.text.tertiary}
              value={placeName}
              onChangeText={setPlaceName}
              accessibilityLabel="가게 이름 입력"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>메뉴명 (선택)</Text>
            <TextInput
              style={styles.input}
              placeholder="무엇을 먹었나요? (예: 된장찌개)"
              placeholderTextColor={colors.text.tertiary}
              value={menuName}
              onChangeText={setMenuName}
              accessibilityLabel="메뉴명 입력"
            />
          </View>

          <View style={styles.section}>
            <Text style={styles.label}>한줄평 *</Text>
            <TextInput
              style={[styles.input, styles.reviewInput]}
              placeholder="솔직하게 남겨보세요!"
              placeholderTextColor={colors.text.tertiary}
              value={review}
              onChangeText={setReview}
              multiline
              maxLength={200}
              accessibilityLabel="한줄평 입력"
            />
            <Text style={styles.charCount}>{review.length}/200</Text>
          </View>

          {error ? <Text style={styles.errorText}>{error}</Text> : null}

          <Button
            label="업로드하기"
            onPress={handleSubmit}
            loading={uploading}
            disabled={!canSubmit}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  appbar: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  appbarTitle: {
    fontSize: fontSize.lg,
    fontWeight: "700",
    color: colors.text.primary,
  },
  content: {
    padding: spacing.md,
    gap: spacing.lg,
    paddingBottom: 40,
  },
  imagePicker: {
    width: "100%",
    aspectRatio: 1,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderStyle: "dashed",
    borderColor: colors.border.default,
    overflow: "hidden",
  },
  imagePickerFilled: {
    borderStyle: "solid",
    borderColor: colors.border.subtle,
  },
  previewImage: {
    width: "100%",
    height: "100%",
  },
  imagePlaceholder: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.sm,
  },
  imagePlaceholderIcon: { fontSize: 40 },
  imagePlaceholderText: {
    fontSize: fontSize.md,
    color: colors.text.tertiary,
  },
  section: {
    gap: spacing.xs,
  },
  label: {
    fontSize: fontSize.sm,
    fontWeight: "600",
    color: colors.text.secondary,
  },
  input: {
    backgroundColor: colors.bg.input,
    borderRadius: radius.md,
    borderWidth: 1,
    borderColor: colors.border.default,
    paddingHorizontal: spacing.md,
    height: 52,
    fontSize: fontSize.md,
    color: colors.text.primary,
  },
  reviewInput: {
    height: 100,
    paddingTop: spacing.md,
    textAlignVertical: "top",
  },
  charCount: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    textAlign: "right",
  },
  errorText: {
    fontSize: fontSize.sm,
    color: colors.accent.coral,
    textAlign: "center",
  },
  submitButton: {
    marginTop: spacing.xs,
  },
});

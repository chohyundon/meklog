import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "@/lib/supabase";
import { useAuthStore } from "@/stores/authStore";
import { Button } from "@/components/ui/Button";
import { colors } from "@/constants/colors";
import { spacing, fontSize, radius } from "@/constants/theme";

export default function OnboardingScreen() {
  const router = useRouter();
  const { user, session, setUser } = useAuthStore();
  const userId = user?.id ?? session?.user?.id;
  const [nickname, setNickname] = useState("");
  const [bio, setBio] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isValid = nickname.trim().length >= 2 && nickname.trim().length <= 15;

  async function handleComplete() {
    if (!isValid || !userId) return;
    setLoading(true);
    setError("");

    const { data, error: upsertError } = await supabase
      .from("users")
      .upsert({ id: userId, nickname: nickname.trim(), bio: bio.trim() || null })
      .select()
      .single();

    setLoading(false);

    if (upsertError) {
      if (upsertError.code === "23505") {
        setError("이미 사용 중인 닉네임이에요.");
      } else {
        setError("오류가 발생했어요. 다시 시도해주세요.");
      }
      return;
    }

    setUser(data);
    router.replace("/(tabs)");
  }

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
        >
          <Text style={styles.title}>먹로그에 오신 걸 환영해요!</Text>
          <Text style={styles.subtitle}>나를 표현할 닉네임을 정해보세요.</Text>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>닉네임 *</Text>
            <TextInput
              style={[styles.input, !!error && styles.inputError]}
              placeholder="2~15자 이내"
              placeholderTextColor={colors.text.tertiary}
              value={nickname}
              onChangeText={(v) => { setNickname(v); setError(""); }}
              maxLength={15}
              autoFocus
              accessibilityLabel="닉네임 입력"
            />
            {error ? (
              <Text style={styles.errorText}>{error}</Text>
            ) : (
              <Text style={styles.hint}>{nickname.length}/15</Text>
            )}
          </View>

          <View style={styles.fieldGroup}>
            <Text style={styles.label}>한 줄 소개 (선택)</Text>
            <TextInput
              style={styles.input}
              placeholder="맛집 탐험가 🍜"
              placeholderTextColor={colors.text.tertiary}
              value={bio}
              onChangeText={setBio}
              maxLength={50}
              accessibilityLabel="자기소개 입력"
            />
            <Text style={styles.hint}>{bio.length}/50</Text>
          </View>

          <Button
            label="시작하기"
            onPress={handleComplete}
            loading={loading}
            disabled={!isValid}
            style={styles.submitButton}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  content: {
    flexGrow: 1,
    padding: spacing.md,
    paddingTop: spacing.xl * 2,
    gap: spacing.lg,
  },
  title: {
    fontSize: fontSize.xxl,
    fontWeight: "700",
    color: colors.text.primary,
  },
  subtitle: {
    fontSize: fontSize.md,
    color: colors.text.secondary,
    marginTop: -spacing.sm,
  },
  fieldGroup: {
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
  inputError: {
    borderColor: colors.accent.coral,
  },
  hint: {
    fontSize: fontSize.xs,
    color: colors.text.tertiary,
    textAlign: "right",
  },
  errorText: {
    fontSize: fontSize.xs,
    color: colors.accent.coral,
  },
  submitButton: {
    marginTop: spacing.md,
  },
});

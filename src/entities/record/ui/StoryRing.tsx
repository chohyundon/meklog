import { TouchableOpacity, View, Text, StyleSheet } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/shared/config/colors";
import { fontSize, spacing } from "@/shared/config/theme";
import { Avatar } from "@/shared/ui/Avatar";
import type { StoryRingProps } from "@/entities/record/ui/types";

export function StoryRing({ user, hasNew = false }: StoryRingProps) {
  const router = useRouter();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => router.push(`/friend/${user.id}`)}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityLabel={`${user.nickname} 스토리`}
    >
      <View style={[styles.ring, hasNew && styles.ringActive]}>
        <Avatar uri={user.avatar_url} nickname={user.nickname} size={56} />
      </View>
      <Text style={styles.name} numberOfLines={1}>{user.nickname}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    gap: spacing.xs,
    width: 72,
  },
  ring: {
    padding: 2,
    borderRadius: 9999,
    borderWidth: 2,
    borderColor: colors.border.default,
  },
  ringActive: {
    borderColor: colors.accent.primary,
  },
  name: {
    fontSize: fontSize.xs,
    color: colors.text.secondary,
    textAlign: "center",
  },
});

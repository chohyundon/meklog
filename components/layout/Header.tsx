import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { colors } from "@/constants/colors";
import { spacing, fontSize } from "@/constants/theme";
import type { HeaderProps } from "@/types";

export function Header({ title, showBack = false, right }: HeaderProps) {
  const router = useRouter();
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <View style={styles.row}>
        {showBack ? (
          <TouchableOpacity
            onPress={() => router.back()}
            style={styles.backButton}
            accessibilityRole="button"
            accessibilityLabel="뒤로 가기"
          >
            <Text style={styles.backIcon}>←</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.placeholder} />
        )}

        {title ? (
          <Text style={styles.title}>{title}</Text>
        ) : (
          <Text style={styles.logo}>먹로그</Text>
        )}

        <View style={styles.placeholder}>{right}</View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.primary,
    borderBottomWidth: 1,
    borderBottomColor: colors.border.default,
  },
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: spacing.md,
    height: 48,
  },
  title: {
    fontSize: fontSize.lg,
    fontWeight: "600",
    color: colors.text.primary,
  },
  logo: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.accent.primary,
  },
  backButton: {
    padding: spacing.xs,
    minWidth: 44,
    minHeight: 44,
    alignItems: "flex-start",
    justifyContent: "center",
  },
  backIcon: {
    fontSize: fontSize.xl,
    color: colors.text.primary,
  },
  placeholder: {
    minWidth: 44,
  },
});

import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeFeed } from "@/widgets/home-feed/ui/HomeFeed";
import { colors } from "@/shared/config/colors";
import { spacing, fontSize } from "@/shared/config/theme";

export function HomePage() {
  return (
    <SafeAreaView style={styles.container} edges={["top"]}>
      <View style={styles.appbar}>
        <Text style={styles.logo}>먹로그</Text>
      </View>
      <HomeFeed />
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
  logo: {
    fontSize: fontSize.xl,
    fontWeight: "700",
    color: colors.accent.primary,
  },
});

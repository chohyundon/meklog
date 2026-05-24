import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { HomeFeed } from "@/components/HomeFeed";
import { colors } from "@/constants/colors";
import { spacing, fontSize } from "@/constants/theme";

export default function HomeScreen() {
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

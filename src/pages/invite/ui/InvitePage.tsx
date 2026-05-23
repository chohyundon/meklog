import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/shared/config/colors";
import { fontSize } from "@/shared/config/theme";

export function InvitePage() {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.text}>친구 초대 화면</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: fontSize.md, color: colors.text.secondary },
});

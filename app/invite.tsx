import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { fontSize } from "@/constants/theme";

export default function InviteScreen() {
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

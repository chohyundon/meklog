import { View, Text, StyleSheet } from "react-native";
import { useLocalSearchParams } from "expo-router";
import { SafeAreaView } from "react-native-safe-area-context";
import { colors } from "@/constants/colors";
import { fontSize } from "@/constants/theme";

export default function FriendProfileScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.placeholder}>
        <Text style={styles.text}>친구 프로필: {id}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.bg.primary },
  placeholder: { flex: 1, justifyContent: "center", alignItems: "center" },
  text: { fontSize: fontSize.md, color: colors.text.secondary },
});

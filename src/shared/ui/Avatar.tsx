import { View, Text, Image, StyleSheet } from "react-native";
import { colors } from "@/shared/config/colors";
import type { AvatarProps } from "@/shared/ui/types";

export function Avatar({ uri, nickname, size = 40 }: AvatarProps) {
  const initial = nickname ? nickname.charAt(0).toUpperCase() : "?";

  return (
    <View style={[styles.container, { width: size, height: size, borderRadius: size / 2 }]}>
      {uri ? (
        <Image
          source={{ uri }}
          style={{ width: size, height: size, borderRadius: size / 2 }}
          accessibilityLabel={`${nickname ?? "유저"} 프로필 사진`}
        />
      ) : (
        <Text style={[styles.initial, { fontSize: size * 0.4 }]}>{initial}</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.bg.card,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border.default,
    overflow: "hidden",
  },
  initial: {
    color: colors.text.secondary,
    fontWeight: "600",
  },
});

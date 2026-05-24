import { View, TouchableOpacity, Text, StyleSheet } from "react-native";
import { colors } from "@/shared/config/colors";
import type { StarRatingProps } from "@/shared/ui/types";

export function StarRating({ value, onChange, size = 28, readonly = false }: StarRatingProps) {
  return (
    <View style={styles.row} accessibilityRole="adjustable" accessibilityLabel={`별점 ${value}점`}>
      {[1, 2, 3, 4, 5].map((star) => (
        <TouchableOpacity
          key={star}
          onPress={() => onChange?.(star)}
          disabled={readonly}
          activeOpacity={0.7}
          accessibilityRole="button"
          accessibilityLabel={`${star}점`}
        >
          <Text style={{ fontSize: size, color: star <= value ? colors.accent.primary : colors.text.muted }}>
            ★
          </Text>
        </TouchableOpacity>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    gap: 2,
  },
});

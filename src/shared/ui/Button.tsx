import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { colors } from "@/shared/config/colors";
import { fontSize, radius, spacing } from "@/shared/config/theme";
import type { ButtonProps } from "@/shared/ui/types";

export function Button({ variant = "primary", loading, label, style, disabled, ...rest }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.base, styles[variant], (disabled || loading) && styles.disabled, style]}
      activeOpacity={0.75}
      disabled={disabled || loading}
      accessibilityRole="button"
      accessibilityLabel={label}
      {...rest}
    >
      {loading ? (
        <ActivityIndicator color={variant === "kakao" ? "#191919" : colors.text.primary} />
      ) : (
        <Text style={labelStyles[variant]}>{label}</Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  base: {
    height: 52,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.md,
  },
  primary: {
    backgroundColor: colors.accent.primary,
  },
  secondary: {
    backgroundColor: colors.bg.card,
    borderWidth: 1,
    borderColor: colors.border.default,
  },
  ghost: {
    backgroundColor: "transparent",
  },
  kakao: {
    backgroundColor: "#FEE500",
  },
  disabled: {
    opacity: 0.4,
  },
});

const labelStyles = StyleSheet.create({
  primary: { color: "#000", fontSize: fontSize.md, fontWeight: "600" },
  secondary: { color: colors.text.primary, fontSize: fontSize.md, fontWeight: "500" },
  ghost: { color: colors.text.secondary, fontSize: fontSize.md, fontWeight: "500" },
  kakao: { color: "#191919", fontSize: fontSize.md, fontWeight: "600" },
});

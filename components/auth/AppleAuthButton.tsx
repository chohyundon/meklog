import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { Button } from "@/components/ui/Button";
import { spacing } from "@/constants/theme";
import {
  isAppleLoginCancelled,
  signInWithApple,
} from "@/lib/auth/apple-login";
import type { AppleAuthButtonProps } from "@/types";

export function AppleAuthButton({
  loading,
  onLoadingChange,
  onSuccess,
  onError,
}: AppleAuthButtonProps) {
  const [nativeButtonAvailable, setNativeButtonAvailable] = useState(false);

  useEffect(() => {
    if (Platform.OS !== "ios") return;

    AppleAuthentication.isAvailableAsync().then(setNativeButtonAvailable);
  }, []);

  const handleNativeAppleLogin = async () => {
    onLoadingChange(true);

    try {
      await signInWithApple();
      await onSuccess();
    } catch (err: unknown) {
      if (isAppleLoginCancelled(err)) return;

      onError("Apple 로그인에 실패했어요. 다시 시도해주세요.");
    } finally {
      onLoadingChange(false);
    }
  };

  if (Platform.OS === "ios") {
    if (nativeButtonAvailable) {
      return (
        <AppleAuthentication.AppleAuthenticationButton
          buttonType={AppleAuthentication.AppleAuthenticationButtonType.SIGN_IN}
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.WHITE}
          cornerRadius={12}
          style={styles.nativeButton}
          onPress={handleNativeAppleLogin}
        />
      );
    }

    return (
      <Button
        variant="secondary"
        label=" Apple로 로그인"
        onPress={handleNativeAppleLogin}
        loading={loading}
        disabled={loading}
        style={styles.fallbackButton}
        accessibilityLabel="Apple로 로그인"
      />
    );
  }

  return null;
}

const styles = StyleSheet.create({
  nativeButton: {
    width: "100%",
    height: 52,
    marginBottom: spacing.xs,
  },
  fallbackButton: {
    width: "100%",
    backgroundColor: "#000000",
    borderWidth: 1,
    borderColor: "#333333",
  },
});

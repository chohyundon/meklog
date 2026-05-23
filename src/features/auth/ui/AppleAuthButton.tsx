import { useEffect, useState } from "react";
import { Platform, StyleSheet } from "react-native";
import * as AppleAuthentication from "expo-apple-authentication";
import { Button } from "@/shared/ui/Button";
import { spacing } from "@/shared/config/theme";
import {
  isAppleLoginCancelled,
  signInWithApple,
} from "@/features/auth/api/apple-login";
import { signInWithAppleOAuth } from "@/features/auth/api/apple-oauth";
import type { AppleAuthButtonProps } from "@/features/auth/ui/types";

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

  const handleOAuthAppleLogin = async () => {
    onLoadingChange(true);

    try {
      await signInWithAppleOAuth();
      await onSuccess();
    } catch (err: unknown) {
      if (isAppleLoginCancelled(err)) return;

      console.error(err);
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
          buttonStyle={AppleAuthentication.AppleAuthenticationButtonStyle.BLACK}
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

  return (
    <Button
      variant="secondary"
      label=" Apple로 로그인"
      onPress={handleOAuthAppleLogin}
      loading={loading}
      disabled={loading}
      style={styles.fallbackButton}
      accessibilityLabel="Apple로 로그인"
    />
  );
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

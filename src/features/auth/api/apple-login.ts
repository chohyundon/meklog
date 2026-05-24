import * as AppleAuthentication from "expo-apple-authentication";
import { supabase } from "@/shared/lib/supabase";
import { fetchUserProfile } from "@/features/auth/api/fetch-user-profile";
import type { AppleLoginResult } from "@/features/auth/model/types";

export async function signInWithApple(): Promise<AppleLoginResult> {
  const credential = await AppleAuthentication.signInAsync({
    requestedScopes: [
      AppleAuthentication.AppleAuthenticationScope.FULL_NAME,
      AppleAuthentication.AppleAuthenticationScope.EMAIL,
    ],
  });

  if (!credential.identityToken) {
    throw new Error("Apple identity token을 받지 못했어요.");
  }

  const { data, error: authError } = await supabase.auth.signInWithIdToken({
    provider: "apple",
    token: credential.identityToken,
  });

  if (authError) throw authError;

  if (credential.fullName) {
    const nameParts = [
      credential.fullName.givenName,
      credential.fullName.middleName,
      credential.fullName.familyName,
    ].filter(Boolean);

    await supabase.auth.updateUser({
      data: {
        full_name: nameParts.join(" "),
        given_name: credential.fullName.givenName,
        family_name: credential.fullName.familyName,
      },
    });
  }

  const userId = data.user?.id;
  if (!userId) {
    throw new Error("로그인에 실패했어요.");
  }

  const profile = await fetchUserProfile(userId);

  return { userId, profile };
}

export function isAppleLoginCancelled(err: unknown): boolean {
  const code =
    err && typeof err === "object" && "code" in err
      ? (err as { code: string }).code
      : undefined;

  if (code === "ERR_REQUEST_CANCELED") return true;

  return err instanceof Error && err.message === "ERR_REQUEST_CANCELED";
}

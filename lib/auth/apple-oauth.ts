import * as QueryParams from "expo-auth-session/build/QueryParams";
import { makeRedirectUri } from "expo-auth-session";
import * as WebBrowser from "expo-web-browser";
import { supabase } from "@/lib/supabase";

WebBrowser.maybeCompleteAuthSession();

export const APPLE_OAUTH_REDIRECT_URI = makeRedirectUri({
  scheme: "meoklog",
  path: "auth/callback",
});

export async function createSessionFromUrl(url: string) {
  const { params, errorCode } = QueryParams.getQueryParams(url);

  if (errorCode) {
    throw new Error(errorCode);
  }

  const { access_token, refresh_token } = params;

  if (!access_token || !refresh_token) {
    throw new Error("OAuth 세션 토큰을 받지 못했어요.");
  }

  const { data, error } = await supabase.auth.setSession({
    access_token,
    refresh_token,
  });

  if (error) throw error;

  return data.session;
}

export async function signInWithAppleOAuth() {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "apple",
    options: {
      redirectTo: APPLE_OAUTH_REDIRECT_URI,
      skipBrowserRedirect: true,
    },
  });

  if (error) throw error;
  if (!data.url) throw new Error("OAuth URL을 받지 못했어요.");

  const result = await WebBrowser.openAuthSessionAsync(
    data.url,
    APPLE_OAUTH_REDIRECT_URI
  );

  if (result.type !== "success") {
    throw new Error("ERR_REQUEST_CANCELED");
  }

  return createSessionFromUrl(result.url);
}

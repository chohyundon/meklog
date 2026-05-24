/**
 * Apple Sign In client secret (JWT) generator for Supabase.
 *
 * Usage:
 *   APPLE_KEY_ID=YOUR_KEY_ID APPLE_P8_PATH=./AuthKey_XXXX.p8 npm run generate:apple-secret
 *
 * Optional:
 *   APPLE_TEAM_ID=863SZ2QQ6N (default)
 *   APPLE_CLIENT_ID=meoklog.app (default)
 */

import fs from "fs";
import jwt from "jsonwebtoken";

const TEAM_ID = process.env.APPLE_TEAM_ID ?? "863SZ2QQ6N";
const KEY_ID = process.env.APPLE_KEY_ID;
const CLIENT_ID = process.env.APPLE_CLIENT_ID ?? "meoklog.app";
const P8_PATH = process.env.APPLE_P8_PATH;

if (!KEY_ID || !P8_PATH) {
  console.error(`
Apple JWT secret 생성에 필요한 값이 없습니다.

  APPLE_KEY_ID   Apple Developer → Keys 에서 확인
  APPLE_P8_PATH  다운받은 .p8 파일 경로

예시:
  APPLE_KEY_ID=ABC123XYZ APPLE_P8_PATH=./AuthKey_ABC123XYZ.p8 npm run generate:apple-secret
`);
  process.exit(1);
}

if (!fs.existsSync(P8_PATH)) {
  console.error(`파일을 찾을 수 없습니다: ${P8_PATH}`);
  process.exit(1);
}

const privateKey = fs.readFileSync(P8_PATH, "utf8");

const token = jwt.sign({}, privateKey, {
  algorithm: "ES256",
  expiresIn: "180d",
  audience: "https://appleid.apple.com",
  issuer: TEAM_ID,
  subject: CLIENT_ID,
  keyid: KEY_ID,
});

console.log("\n=== Supabase Apple Secret Key (아래 전체를 복사) ===\n");
console.log(token);
console.log("\n=== 만료: 약 6개월 후 재생성 필요 ===\n");
console.log("Supabase → Authentication → Providers → Apple → Secret Key\n");

# Types — meoklog 컨벤션

> `@src/Skils.md` 로 에이전트/팀에 이 규칙을 적용하세요.  
> TypeScript 타입은 **FSD 레이어**와 **도메인** 기준으로 분리합니다.

---

## 원칙

1. **도메인 타입** → `entities/{name}/model/types.ts`
2. **기능 전용 타입** → `features/{name}/model/types.ts`
3. **UI Props** → 컴포넌트 파일 상단 또는 `{slice}/ui/types.ts` (3개 이상일 때만 분리)
4. **API 입출력** → `{slice}/api/types.ts` 또는 `model/types.ts` (feature 한정)
5. **`types/index.ts` 같은 거대 barrel 파일 금지** — slice별로 co-locate

---

## 레이어별 배치

| 종류                         | 위치                            | 예시                                |
| ---------------------------- | ------------------------------- | ----------------------------------- |
| DB / Supabase 테이블 row     | `entities/*/model/types.ts`     | `User`, `Record`, `Reaction`        |
| 엔티티 간 관계               | 해당 엔티티 또는 참조하는 쪽    | `Record.user?: User`                |
| Zustand store state (비공개) | store 파일 내부 `type XxxState` | `AuthState`                         |
| Store / hook 공개 타입       | `model/types.ts`                | `UploadPayload`                     |
| Feature 결과 / 파라미터      | `features/*/model/types.ts`     | `AppleLoginResult`                  |
| Supabase Auth 세션           | `@supabase/supabase-js` 재사용  | `Session`, `User` (auth)            |
| 공통 유틸                    | `shared/types/`                 | `Nullable`, `ID` (정말 공통일 때만) |

---

## import 규칙 (FSD)

```
shared  ←  entities  ←  features  ←  widgets  ←  pages  ←  app
```

- `entities`는 `features` 타입을 import **하지 않음**
- `features`는 다른 `features` 타입 import **지양** — 공통이면 `entities` 또는 `shared`로 내림
- cross-entity 참조: `@/entities/user/model/types` 처럼 **명시적 경로**

```ts
// ✅ Record가 User를 참조
import type { User } from "@/entities/user/model/types";

// ❌ api 파일에서 feature 결과 타입을 export하지 말 것 — model로 이동
// features/auth/api/apple-login.ts
export type AppleLoginResult = { ... }  // → model/types.ts 로
```

---

## 파일 템플릿

### `entities/{entity}/model/types.ts`

Supabase `public` 테이블 1:1 매핑. snake_case 필드명 유지.

```ts
export type User = {
  id: string;
  nickname: string;
  bio: string | null;
  avatar_url: string | null;
  created_at: string;
};
```

### `features/{feature}/model/types.ts`

해당 feature만 쓰는 DTO / form state / API 결과.

```ts
import type { User } from "@/entities/user/model/types";

export type AppleLoginResult = {
  userId: string;
  profile: User | null;
};
```

### `features/{feature}/api/*.ts`

타입 정의 없이 **import만**. 로직만 둠.

```ts
import type { AppleLoginResult } from "@/features/auth/model/types";

export async function signInWithApple(): Promise<AppleLoginResult> { ... }
```

### UI Props (소규모)

```ts
type FeedCardProps = {
  record: Record;
};

export function FeedCard({ record }: FeedCardProps) { ... }
```

---

## 네이밍

| 대상           | 규칙                                  | 예                               |
| -------------- | ------------------------------------- | -------------------------------- |
| DB row         | PascalCase, 단수                      | `User`, `Record`                 |
| API payload    | `{Action}Payload`                     | `UploadPayload`                  |
| API response   | `{Action}Result` / `{Entity}Response` | `AppleLoginResult`               |
| Store (비공개) | `{Name}State`                         | `AuthState`, `FeedState`         |
| Props          | `{Component}Props`                    | `FeedCardProps`                  |
| Enum/union     | PascalCase                            | `Rating = 1 \| 2 \| 3 \| 4 \| 5` |

---

## Supabase / Auth

- **Auth 유저** (`session.user`)와 **앱 프로필** (`entities/user` `User`)는 **다른 타입** — 혼동 금지
- 세션: `import type { Session } from "@supabase/supabase-js"`
- 프로필: `@/entities/user/model/types` 의 `User`

```ts
// entities/session/model/auth-store.ts
import type { Session } from "@supabase/supabase-js";
import type { User } from "@/entities/user/model/types";
```

---

## 새 타입 추가 체크리스트

- [ ] Supabase 테이블 row인가? → `entities/{table}/model/types.ts`
- [ ] 한 feature에서만 쓰는가? → `features/{feature}/model/types.ts`
- [ ] 2개 이상 feature에서 쓰는가? → `entities` 또는 `shared/types`로 승격
- [ ] api/hook/ui 파일에 `export type` 추가하려는가? → **model/types.ts로 이동**
- [ ] `interface` 대신 `type` 사용 (프로젝트 기본)

---

## 현재 meoklog 맵

```
entities/user/model/types.ts         → User, Friendship, InviteLink
entities/record/model/types.ts       → Rating, Record, Reaction
entities/record/ui/types.ts          → FeedCardProps, StoryRingProps
entities/session/model/auth-store.ts → AuthState (내부), Session (@supabase/supabase-js)
entities/feed/model/feed-store.ts    → FeedState (내부)

features/auth/model/types.ts         → AppleLoginResult
features/auth/ui/types.ts            → AppleAuthButtonProps
features/upload/model/types.ts       → UploadPayload

shared/ui/types.ts                   → ButtonProps, AvatarProps, StarRatingProps, ButtonVariant
shared/layout/types.ts               → HeaderProps
```

---

## 마이그레이션 (점진적)

기존 코드에 타입이 api/ui에 섞여 있으면 **기능 수정할 때 같이** `model/types.ts`로 옮깁니다.  
한 PR에 전체 리팩터링하지 않아도 됩니다.

1. `model/types.ts` 생성
2. 타입 이동 + export
3. import 경로 `@/features/.../model/types` 로 변경
4. api/ui에서 `export type` 제거

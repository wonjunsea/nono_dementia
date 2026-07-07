# 메모케어 (MemoCare)

Figma Make 디자인 「치매노노 / 메모케어」를 옮긴 **React Native + Expo (SDK 54) + TypeScript** 앱입니다.
CIST 기반 인지 건강 조기 스크리닝 앱으로 **고령자용**과 **보호자용** 두 흐름을 담고 있습니다.

## 실행 방법

### 0. 준비물 (한 번만)
- **Node.js** (LTS)
- **Android Studio** + 가상 기기(AVD) 1개 — 또는 실제 폰 + **Expo Go** 앱
- 프로젝트 의존성 설치:
  ```
  npm install
  npx expo install expo-audio
  ```

### 1. 에뮬레이터로 실행 (Android Studio)
1. Android Studio → **Device Manager** → 가상 기기 ▶ 로 켜기 (홈 화면이 뜰 때까지 대기)
2. 이 폴더에서:
   ```
   npx expo start -c
   ```
3. 메트로가 뜨면 터미널에서 **`a`** 키를 누르면 에뮬레이터에 앱이 설치·실행됩니다.
   (`-c`는 캐시 초기화. 처음엔 번들링에 1~2분 걸릴 수 있어요.)

### 2. 실제 폰으로 실행 (가장 빠름)
1. 폰에 **Expo Go** 앱 설치
2. 이 폴더에서 `npx expo start`
3. 터미널의 QR 코드를 폰으로 스캔

> 마이크 녹음(CIST 음성 검사)은 **실제 폰**에서 제대로 동작합니다.
> 에뮬레이터는 마이크가 없을 수 있어 녹음이 무음이 되거나 생략되지만, 버튼·애니메이션·플로우는 그대로 동작합니다.

## 주요 스크립트
```
npm start          # = npx expo start
npx expo start -c  # 캐시 비우고 시작
npm run typecheck  # (선택) TypeScript 타입 검사
```

## 화면 구성 (15 화면)
- **온보딩**: 시작 화면 · 로그인/회원가입 · 사용자 유형(고령자/보호자)
- **고령자**: 홈 · CIST 검사(음성·캐릭터) · AI 정서 문답 · 결과·일기 · 달력 일기 · 지역 캠페인 · 알림
- **보호자**: 대시보드 · 일기·반응 · 위험 추이 차트 · 알림

## 디자인 토큰 (theme.ts)
| 항목 | 값 |
|------|-----|
| Primary (세이지 그린) | `#5A8F68` |
| Secondary (연녹색) | `#EAF3EC` |
| Accent (탄 브라운) | `#D4A373` |
| Radius | `14px` |
| 고령자 본문 폰트 | `18px+` (접근성 우선) |
| 버튼 높이 | `60px` |

## 파일 구조 (평면 구성)
- `App.tsx` — 루트 스택(온보딩) + 역할별 네비게이터
- `ElderNavigator.tsx` / `GuardianNavigator.tsx` — 하단 탭 + 상세 스택
- `navTypes.ts` — 네비게이션 타입 / `AppContext.tsx` — 전역 상태
- `ui.tsx` — 공통 컴포넌트 (Button, Card, Screen, AppHeader, Pill, ProgressBar, Avatar 등)
- `theme.ts` — 디자인 토큰
- `*Screen.tsx`, `Elder*.tsx`, `Guardian*.tsx` — 각 화면

## 참고
- 데이터는 데모용 목(mock) 데이터입니다. 실제 API/DB 연동은 아직 없습니다.
- CIST 검사는 음성 입력 프로토타입입니다(마이크 녹음 + 인식 결과 목업). 실제 음성인식(STT) 연동은 추후 확장 가능합니다.
- 캐릭터 '메모이'는 이모지(🐶)로 대체되어 있습니다. 원본 캐릭터 이미지를 넣으면 교체할 수 있습니다.

## 자주 나는 문제
- **`a` 눌렀는데 "No emulators found"** → 에뮬레이터를 먼저 켜세요. `adb devices`로 기기가 보이는지 확인.
- **버전/Metro 에러** → `node_modules` 삭제 후 `npm install` 재실행, 그리고 `npx expo start -c`.

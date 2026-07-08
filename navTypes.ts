import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import type { NavigatorScreenParams } from "@react-navigation/native";

/** Root onboarding + role stacks (CIST 초기 검사는 온보딩 단계) */
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  UserType: undefined;
  Cist: undefined; // CIST 초기 검사 (온보딩)
  Elder: undefined;
  Guardian: undefined;
};

/** Elder area — bottom tabs live inside this stack so detail screens can be pushed */
export type ElderStackParamList = {
  ElderTabs: NavigatorScreenParams<ElderTabParamList>;
  ElderCalendar: undefined;
  ElderCampaign: undefined;
};

/** 하단 탭 4개: 홈 / AI 대화 / 일기 / 알림 */
export type ElderTabParamList = {
  ElderHome: undefined;
  ElderAiChat: undefined;
  ElderResult: undefined;
  ElderNotifications: undefined;
};

/** Guardian area */
export type GuardianTabParamList = {
  GuardianDashboard: undefined;
  GuardianDiary: undefined;
  GuardianChart: undefined;
  GuardianNotifications: undefined;
};

export type RootNav = NativeStackNavigationProp<RootStackParamList>;
export type ElderNav = NativeStackNavigationProp<ElderStackParamList>;
export type GuardianNav = BottomTabNavigationProp<GuardianTabParamList>;

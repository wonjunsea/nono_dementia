import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { NavigatorScreenParams } from "@react-navigation/native";

/** Root onboarding + role stacks */
export type RootStackParamList = {
  Splash: undefined;
  Login: undefined;
  UserType: undefined;
  Elder: undefined;
  Guardian: undefined;
};

/** Elder area (bottom tabs live inside this stack so detail screens can be pushed) */
export type ElderStackParamList = {
  ElderTabs: NavigatorScreenParams<ElderTabParamList>;
  ElderCalendar: undefined;
  ElderCampaign: undefined;
};

export type ElderTabParamList = {
  ElderHome: undefined;
  ElderCist: undefined;
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

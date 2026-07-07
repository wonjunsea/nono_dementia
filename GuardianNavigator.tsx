import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { GuardianTabParamList } from "./navTypes";
import { colors, fontWeight, sizes } from "./theme";

import GuardianDashboardScreen from "./GuardianDashboard";
import GuardianDiaryScreen from "./GuardianDiary";
import GuardianChartScreen from "./GuardianChart";
import GuardianNotificationsScreen from "./GuardianNotifications";

const Tab = createBottomTabNavigator<GuardianTabParamList>();

export default function GuardianNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.mutedForeground,
        tabBarStyle: {
          height: sizes.tabBarHeight,
          paddingBottom: 12,
          paddingTop: 8,
          borderTopColor: colors.border,
          backgroundColor: colors.background,
        },
        tabBarLabelStyle: { fontSize: 13, fontWeight: fontWeight.semibold },
        tabBarIcon: ({ color, size }) => {
          const map: Record<keyof GuardianTabParamList, keyof typeof Ionicons.glyphMap> = {
            GuardianDashboard: "grid",
            GuardianDiary: "heart",
            GuardianChart: "trending-up",
            GuardianNotifications: "notifications",
          };
          return <Ionicons name={map[route.name]} size={size + 4} color={color} />;
        },
      })}
    >
      <Tab.Screen name="GuardianDashboard" component={GuardianDashboardScreen} options={{ title: "대시보드" }} />
      <Tab.Screen name="GuardianDiary" component={GuardianDiaryScreen} options={{ title: "일기·반응" }} />
      <Tab.Screen name="GuardianChart" component={GuardianChartScreen} options={{ title: "위험추이" }} />
      <Tab.Screen
        name="GuardianNotifications"
        component={GuardianNotificationsScreen}
        options={{ title: "알림" }}
      />
    </Tab.Navigator>
  );
}

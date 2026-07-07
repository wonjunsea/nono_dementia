import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

import { ElderStackParamList, ElderTabParamList } from "./navTypes";
import { colors, fontWeight, sizes } from "./theme";

import ElderHomeScreen from "./ElderHome";
import ElderCistScreen from "./ElderCist";
import ElderAiChatScreen from "./ElderAiChat";
import ElderResultScreen from "./ElderResult";
import ElderNotificationsScreen from "./ElderNotifications";
import ElderCalendarScreen from "./ElderCalendar";
import ElderCampaignScreen from "./ElderCampaign";

const Tab = createBottomTabNavigator<ElderTabParamList>();
const Stack = createNativeStackNavigator<ElderStackParamList>();

function ElderTabs() {
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
          const map: Record<keyof ElderTabParamList, keyof typeof Ionicons.glyphMap> = {
            ElderHome: "home",
            ElderCist: "clipboard",
            ElderAiChat: "chatbubbles",
            ElderResult: "book",
            ElderNotifications: "notifications",
          };
          return <Ionicons name={map[route.name]} size={size + 4} color={color} />;
        },
      })}
    >
      <Tab.Screen name="ElderHome" component={ElderHomeScreen} options={{ title: "홈" }} />
      <Tab.Screen name="ElderCist" component={ElderCistScreen} options={{ title: "검사" }} />
      <Tab.Screen name="ElderAiChat" component={ElderAiChatScreen} options={{ title: "AI문답" }} />
      <Tab.Screen name="ElderResult" component={ElderResultScreen} options={{ title: "일기" }} />
      <Tab.Screen
        name="ElderNotifications"
        component={ElderNotificationsScreen}
        options={{ title: "알림" }}
      />
    </Tab.Navigator>
  );
}

export default function ElderNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ElderTabs" component={ElderTabs} />
      <Stack.Screen name="ElderCalendar" component={ElderCalendarScreen} />
      <Stack.Screen name="ElderCampaign" component={ElderCampaignScreen} />
    </Stack.Navigator>
  );
}

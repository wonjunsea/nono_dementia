import React from "react";
import { StatusBar } from "expo-status-bar";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { RootStackParamList } from "./navTypes";
import { colors } from "./theme";
import { AppProvider } from "./AppContext";

import SplashScreen from "./SplashScreen";
import LoginScreen from "./LoginScreen";
import UserTypeScreen from "./UserTypeScreen";
import ElderCistScreen from "./ElderCist";
import ElderNavigator from "./ElderNavigator";
import GuardianNavigator from "./GuardianNavigator";

const Stack = createNativeStackNavigator<RootStackParamList>();

const navTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: colors.background,
    primary: colors.primary,
    card: colors.background,
    text: colors.foreground,
    border: colors.border,
  },
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AppProvider>
        <NavigationContainer theme={navTheme}>
          <StatusBar style="dark" />
          <Stack.Navigator initialRouteName="Splash" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Splash" component={SplashScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="UserType" component={UserTypeScreen} />
            <Stack.Screen name="Cist" component={ElderCistScreen} />
            <Stack.Screen name="Elder" component={ElderNavigator} />
            <Stack.Screen name="Guardian" component={GuardianNavigator} />
          </Stack.Navigator>
        </NavigationContainer>
      </AppProvider>
    </SafeAreaProvider>
  );
}

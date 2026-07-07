import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { RootNav } from "./navTypes";
import { useApp } from "./AppContext";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Screen, AppHeader, Body } from "./ui";

function ChoiceCard({
  icon,
  title,
  desc,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  desc: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.card} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={styles.iconWrap}>
        <Ionicons name={icon} size={34} color={colors.primary} />
      </View>
      <Text style={styles.cardTitle}>{title}</Text>
      <Body style={{ color: colors.mutedForeground, textAlign: "center", marginTop: spacing.sm }}>{desc}</Body>
    </Pressable>
  );
}

export default function UserTypeScreen() {
  const navigation = useNavigation<RootNav>();
  const { setRole } = useApp();

  const pick = (role: "elder" | "guardian") => {
    setRole(role);
    navigation.reset({
      index: 0,
      routes: [{ name: role === "elder" ? "Elder" : "Guardian" }],
    });
  };

  return (
    <Screen scroll={false}>
      <AppHeader title="사용자 유형" onBack={() => navigation.goBack()} />
      <View style={{ paddingHorizontal: spacing.xl, flex: 1 }}>
        <Text style={styles.h1}>어떤 분이신가요?</Text>
        <Body style={{ color: colors.mutedForeground, marginTop: spacing.sm }}>
          유형에 맞춰 화면과 기능을 구성해 드려요.
        </Body>

        <View style={{ gap: spacing.lg, marginTop: spacing.xxl }}>
          <ChoiceCard
            icon="person"
            title="고령자"
            desc="직접 검사하고 매일 뇌 건강을 관리해요"
            onPress={() => pick("elder")}
          />
          <ChoiceCard
            icon="people"
            title="보호자"
            desc="가족의 인지 건강 상태를 함께 살펴요"
            onPress={() => pick("guardian")}
          />
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground, marginTop: spacing.lg },
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 2,
    borderColor: colors.border,
    padding: spacing.xl,
    alignItems: "center",
  },
  iconWrap: {
    width: 72,
    height: 72,
    borderRadius: 36,
    backgroundColor: colors.secondary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.md,
  },
  cardTitle: { fontSize: fontSize.subtitle, fontWeight: fontWeight.bold, color: colors.foreground },
});

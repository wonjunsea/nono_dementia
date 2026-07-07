import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { ElderNav } from "./navTypes";
import { useApp } from "./AppContext";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Screen, Card, Avatar, Pill, ProgressBar, Body, Caption } from "./ui";

function QuickAction({
  icon,
  label,
  color,
  onPress,
}: {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  color: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.quick} onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View style={[styles.quickIcon, { backgroundColor: color }]}>
        <Ionicons name={icon} size={28} color={colors.white} />
      </View>
      <Text style={styles.quickLabel}>{label}</Text>
    </Pressable>
  );
}

export default function ElderHomeScreen() {
  const navigation = useNavigation<ElderNav>();
  const { userName } = useApp();

  return (
    <Screen background={colors.secondary}>
      <View style={styles.headerRow}>
        <View>
          <Caption>안녕하세요</Caption>
          <Text style={styles.name}>{userName}님 👋</Text>
        </View>
        <Pill label="7일 연속 참여" color={colors.primary} textColor={colors.white} icon="flame" />
      </View>

      <Card color={colors.primary} style={{ marginTop: spacing.lg, alignItems: "center" }}>
        <Avatar size={96} emoji="🐶" />
        <Text style={styles.characterMsg}>
          "오늘도 5분만 함께해요!{"\n"}작은 습관이 큰 힘이 돼요 🌿"
        </Text>
      </Card>

      <Card style={{ marginTop: spacing.lg }}>
        <View style={styles.rowBetween}>
          <Text style={styles.cardTitle}>오늘의 뇌 건강</Text>
          <Text style={styles.scoreGood}>양호</Text>
        </View>
        <ProgressBar value={78} />
        <Caption style={{ marginTop: spacing.sm }}>오늘 할 일 3개 중 2개 완료</Caption>
      </Card>

      <Text style={styles.sectionTitle}>바로 시작하기</Text>
      <View style={styles.quickGrid}>
        <QuickAction
          icon="clipboard"
          label="오늘의 검사"
          color={colors.primary}
          onPress={() => navigation.navigate("ElderTabs", { screen: "ElderCist" })}
        />
        <QuickAction
          icon="chatbubbles"
          label="AI 문답"
          color={colors.accent}
          onPress={() => navigation.navigate("ElderTabs", { screen: "ElderAiChat" })}
        />
        <QuickAction
          icon="book"
          label="오늘 일기"
          color="#6B9CB8"
          onPress={() => navigation.navigate("ElderTabs", { screen: "ElderResult" })}
        />
        <QuickAction
          icon="calendar"
          label="달력 보기"
          color="#8A7FAA"
          onPress={() => navigation.navigate("ElderCalendar")}
        />
      </View>

      <Card color={colors.accent} style={{ marginTop: spacing.lg }} onPress={() => navigation.navigate("ElderCampaign")}>
        <View style={styles.rowBetween}>
          <View style={{ flex: 1 }}>
            <Text style={styles.campaignTitle}>이번 주 지역 캠페인 🎉</Text>
            <Body style={{ color: colors.white, marginTop: 4 }}>기억력 게임하고 마을 포인트 받기</Body>
          </View>
          <Ionicons name="chevron-forward" size={26} color={colors.white} />
        </View>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  name: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground, marginTop: 2 },
  characterMsg: {
    color: colors.white,
    fontSize: fontSize.body,
    textAlign: "center",
    marginTop: spacing.md,
    lineHeight: 26,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.md },
  cardTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  scoreGood: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.primary },
  sectionTitle: {
    fontSize: fontSize.bodyLg,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  quickGrid: { flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between", rowGap: spacing.lg },
  quick: { width: "47%", alignItems: "center" },
  quickIcon: {
    width: 64,
    height: 64,
    borderRadius: radius.lg,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: spacing.sm,
  },
  quickLabel: { fontSize: fontSize.body, fontWeight: fontWeight.semibold, color: colors.foreground },
  campaignTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.white },
});

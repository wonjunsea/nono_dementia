import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, fontSize, fontWeight, chartColors } from "./theme";
import { Screen, Card, ProgressBar, Body, Caption, Pill } from "./ui";

const DIARY = [
  { date: "7월 7일", mood: "😊", text: "손주가 놀러 와서 즐거웠다. 기억력 게임도 같이 했다." },
  { date: "7월 6일", mood: "😐", text: "비가 와서 산책은 못 했지만 AI 문답을 했다." },
  { date: "7월 5일", mood: "😄", text: "경로당에서 친구들과 이야기를 많이 나눴다." },
];

const DOMAINS = [
  { label: "기억력", value: 82 },
  { label: "주의력", value: 74 },
  { label: "언어능력", value: 88 },
  { label: "시공간", value: 70 },
];

export default function ElderResultScreen() {
  return (
    <Screen>
      <Text style={styles.h1}>결과 · 일기</Text>

      <Card style={{ marginTop: spacing.lg, alignItems: "center" }} color={colors.primary}>
        <Caption style={{ color: "rgba(255,255,255,0.85)" }}>이번 주 CIST 평균</Caption>
        <Text style={styles.bigScore}>24 / 30</Text>
        <Pill label="정상 범위 유지 중" color="rgba(255,255,255,0.2)" textColor={colors.white} icon="checkmark-circle" />
      </Card>

      <Text style={styles.section}>영역별 결과</Text>
      <Card>
        {DOMAINS.map((d, i) => (
          <View key={d.label} style={{ marginBottom: i === DOMAINS.length - 1 ? 0 : spacing.md }}>
            <View style={styles.rowBetween}>
              <Body style={{ fontWeight: fontWeight.semibold }}>{d.label}</Body>
              <Caption style={{ fontWeight: fontWeight.bold, color: colors.foreground }}>{d.value}%</Caption>
            </View>
            <ProgressBar value={d.value} color={chartColors[i % chartColors.length]} />
          </View>
        ))}
      </Card>

      <Text style={styles.section}>오늘의 일기</Text>
      <View style={{ gap: spacing.md }}>
        {DIARY.map((entry) => (
          <Card key={entry.date}>
            <View style={styles.rowBetween}>
              <View style={styles.dateRow}>
                <Ionicons name="calendar-outline" size={18} color={colors.mutedForeground} />
                <Caption style={{ marginLeft: 6 }}>{entry.date}</Caption>
              </View>
              <Text style={{ fontSize: 22 }}>{entry.mood}</Text>
            </View>
            <Body style={{ marginTop: spacing.sm }}>{entry.text}</Body>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground },
  bigScore: { fontSize: 48, fontWeight: fontWeight.bold, color: colors.white, marginVertical: spacing.xs },
  section: {
    fontSize: fontSize.bodyLg,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginTop: spacing.xl,
    marginBottom: spacing.md,
  },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  dateRow: { flexDirection: "row", alignItems: "center" },
});

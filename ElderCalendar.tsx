import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ElderNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Screen, AppHeader, Card, Caption, Body } from "./ui";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
// mood by day-of-month (mock). undefined = no entry.
const MOODS: Record<number, string> = {
  1: "😊", 2: "😄", 3: "😐", 4: "😊", 5: "😄", 6: "😐", 7: "😊",
};

export default function ElderCalendarScreen() {
  const navigation = useNavigation<ElderNav>();

  // July 2026 starts on Wednesday (offset 3), 31 days.
  const firstDayOffset = 3;
  const daysInMonth = 31;
  const cells: (number | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <Screen>
      <AppHeader title="달력 일기" subtitle="2026년 7월" onBack={() => navigation.goBack()} />

      <Card style={{ marginTop: spacing.lg }}>
        <View style={styles.weekRow}>
          {WEEK.map((w, i) => (
            <Text key={w} style={[styles.weekLabel, i === 0 && { color: colors.destructive }]}>
              {w}
            </Text>
          ))}
        </View>

        <View style={styles.grid}>
          {cells.map((day, i) => (
            <View key={i} style={styles.cell}>
              {day ? (
                <View style={[styles.dayInner, day === 7 && styles.today]}>
                  <Text style={[styles.dayNum, day === 7 && { color: colors.white }]}>{day}</Text>
                  {MOODS[day] ? <Text style={styles.mood}>{MOODS[day]}</Text> : null}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </Card>

      <Card style={{ marginTop: spacing.lg }}>
        <Caption>7월 7일 · 오늘</Caption>
        <Text style={{ fontSize: 30, marginVertical: spacing.xs }}>😊</Text>
        <Body>손주가 놀러 와서 즐거웠다. 기억력 게임도 같이 했다.</Body>
      </Card>

      <View style={styles.legend}>
        <Caption>😊 좋음 · 😐 보통 · 빈 칸은 기록 없음</Caption>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  weekRow: { flexDirection: "row", marginBottom: spacing.sm },
  weekLabel: { flex: 1, textAlign: "center", fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.mutedForeground },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "14.2857%", aspectRatio: 1, padding: 3 },
  dayInner: { flex: 1, alignItems: "center", justifyContent: "center", borderRadius: radius.sm },
  today: { backgroundColor: colors.primary },
  dayNum: { fontSize: fontSize.caption, fontWeight: fontWeight.semibold, color: colors.foreground },
  mood: { fontSize: 14, marginTop: 1 },
  legend: { marginTop: spacing.lg, alignItems: "center" },
});

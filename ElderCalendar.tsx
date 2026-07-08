import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { ElderNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { GreenScreen } from "./ui";

const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
// day -> mood: 1 좋음(😊), 2 보통(😐), 3 힘듦(😔)
const MOODS: Record<number, 1 | 2 | 3> = {
  1: 1, 2: 2, 5: 3, 8: 1, 10: 2, 12: 3, 15: 2, 17: 2, 19: 3, 22: 2, 24: 3, 26: 3, 29: 2,
};
const MOOD_EMOJI: Record<1 | 2 | 3, string> = { 1: "😊", 2: "😐", 3: "😔" };

export default function ElderCalendarScreen() {
  const navigation = useNavigation<ElderNav>();

  // July 2026 starts on Wednesday (offset 3), 31 days.
  const firstDayOffset = 3;
  const daysInMonth = 31;
  const today = 8;
  const cells: (number | null)[] = [
    ...Array(firstDayOffset).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ];

  return (
    <GreenScreen title="2026년 7월" subtitle="13일 일기 작성" onBack={() => navigation.goBack()}>
      {/* Month nav */}
      <View style={styles.monthNav}>
        <Ionicons name="chevron-back" size={22} color={colors.mutedForeground} />
        <Text style={styles.monthText}>2026년 7월</Text>
        <Ionicons name="chevron-forward" size={22} color={colors.mutedForeground} />
      </View>

      <View style={styles.card}>
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
                <View style={[styles.dayInner, day === today && styles.today]}>
                  <Text style={[styles.dayNum, day === today && { color: colors.white }]}>{day}</Text>
                  {MOODS[day] ? <Text style={styles.mood}>{MOOD_EMOJI[MOODS[day]]}</Text> : <View style={{ height: 16 }} />}
                </View>
              ) : null}
            </View>
          ))}
        </View>
      </View>

      {/* Legend */}
      <View style={styles.legend}>
        <Text style={styles.legendItem}>😊 좋음</Text>
        <Text style={styles.legendItem}>😐 보통</Text>
        <Text style={styles.legendItem}>😔 힘듦</Text>
      </View>

      {/* Selected day diary */}
      <Pressable style={styles.diaryCard}>
        <Text style={styles.diaryDate}>7월 8일 · 오늘</Text>
        <Text style={{ fontSize: 30, marginVertical: spacing.xs }}>😊</Text>
        <Text style={styles.diaryText}>손주가 놀러 와서 즐거웠다. 기억력 게임도 같이 했다.</Text>
      </Pressable>
    </GreenScreen>
  );
}

const styles = StyleSheet.create({
  monthNav: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", paddingHorizontal: spacing.sm },
  monthText: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    marginTop: spacing.lg,
  },
  weekRow: { flexDirection: "row", marginBottom: spacing.sm },
  weekLabel: { flex: 1, textAlign: "center", fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.mutedForeground },
  grid: { flexDirection: "row", flexWrap: "wrap" },
  cell: { width: "14.2857%", aspectRatio: 1, padding: 2 },
  dayInner: { flex: 1, alignItems: "center", justifyContent: "center", borderRadius: radius.sm, paddingVertical: 2 },
  today: { backgroundColor: colors.primary },
  dayNum: { fontSize: fontSize.caption, fontWeight: fontWeight.semibold, color: colors.foreground },
  mood: { fontSize: 15, marginTop: 1 },

  legend: { flexDirection: "row", justifyContent: "center", gap: spacing.xl, marginTop: spacing.lg },
  legendItem: { fontSize: fontSize.caption, color: colors.mutedForeground, fontWeight: fontWeight.semibold },

  diaryCard: {
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  diaryDate: { fontSize: fontSize.caption, color: colors.secondaryForeground, fontWeight: fontWeight.bold },
  diaryText: { fontSize: fontSize.body, color: colors.foreground, lineHeight: 24 },
});

import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import LineChart from "./LineChart";

const PERIODS = ["3개월", "6개월", "1년"] as const;
const DATA: Record<string, number[]> = {
  "3개월": [27, 26, 24, 21],
  "6개월": [28, 27, 27, 26, 24, 21],
  "1년": [29, 28, 28, 27, 27, 26, 27, 26, 25, 24, 23, 21],
};

const REGIONS = [
  { name: "강북구", value: 24.1, delta: -0.8, color: colors.guardianPrimary },
  { name: "노원구", value: 25.3, delta: 0.2, color: colors.guardianPrimary },
  { name: "도봉구", value: 23.8, delta: -1.2, color: colors.accent },
  { name: "성북구", value: 24.7, delta: -0.3, color: colors.guardianPrimary },
];

export default function GuardianChartScreen() {
  const [period, setPeriod] = useState<string>("6개월");

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>인지 위험 추이</Text>
        </View>

        <View style={styles.body}>
          {/* Period segmented */}
          <View style={styles.segmentRow}>
            <View style={styles.segment}>
              {PERIODS.map((p) => (
                <Pressable
                  key={p}
                  onPress={() => setPeriod(p)}
                  style={[styles.segmentBtn, period === p && styles.segmentBtnActive]}
                >
                  <Text style={[styles.segmentText, period === p && { color: colors.white }]}>{p}</Text>
                </Pressable>
              ))}
            </View>
            <Pressable style={styles.exportBtn}>
              <Ionicons name="download-outline" size={18} color={colors.mutedForeground} />
              <Text style={styles.exportText}>내보내기</Text>
            </Pressable>
          </View>

          {/* Chart */}
          <View style={styles.card}>
            <View style={styles.chartHead}>
              <Text style={styles.cardTitle}>CIST 인지 점수</Text>
              <View style={{ flexDirection: "row", gap: spacing.md }}>
                <Text style={[styles.legend, { color: colors.primary }]}>— 정상 하한 24</Text>
                <Text style={[styles.legend, { color: colors.destructive }]}>— 경도 치매 18</Text>
              </View>
            </View>
            <View style={{ alignItems: "center", marginTop: spacing.md }}>
              <LineChart
                data={DATA[period]}
                width={300}
                height={160}
                min={15}
                max={30}
                thresholds={[
                  { value: 24, color: colors.primary },
                  { value: 18, color: colors.destructive },
                ]}
              />
            </View>
          </View>

          {/* Stat cards */}
          <View style={styles.statRow}>
            <View style={[styles.card, { flex: 1 }]}>
              <Text style={styles.statLabel}>3개월 변화</Text>
              <Text style={[styles.statValue, { color: colors.destructive }]}>-7점</Text>
            </View>
            <View style={[styles.card, { flex: 1 }]}>
              <Text style={styles.statLabel}>연속 하락일</Text>
              <Text style={[styles.statValue, { color: colors.foreground }]}>14일</Text>
            </View>
          </View>

          {/* Regional comparison */}
          <View style={styles.card}>
            <View style={styles.chartHead}>
              <Text style={styles.cardTitle}>지역 전산 비교</Text>
              <View style={{ flexDirection: "row", alignItems: "center", gap: 4 }}>
                <Ionicons name="location-outline" size={14} color={colors.mutedForeground} />
                <Text style={styles.legend}>서울시 평균</Text>
              </View>
            </View>
            {REGIONS.map((r) => (
              <View key={r.name} style={styles.regionRow}>
                <Text style={styles.regionName}>{r.name}</Text>
                <View style={styles.regionTrack}>
                  <View style={[styles.regionFill, { width: `${(r.value / 30) * 100}%`, backgroundColor: r.color }]} />
                </View>
                <Text style={styles.regionValue}>{r.value}</Text>
                <Text style={[styles.regionDelta, { color: r.delta >= 0 ? colors.primary : colors.destructive }]}>
                  {r.delta >= 0 ? "▲" : "▼"}
                  {Math.abs(r.delta)}
                </Text>
              </View>
            ))}
            <Pressable style={styles.genBtn}>
              <Ionicons name="download-outline" size={18} color={colors.guardianPrimary} />
              <Text style={styles.genText}>지역 전산 그래프 생성</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.guardianPrimary },
  header: { backgroundColor: colors.guardianPrimary, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.lg },
  headerTitle: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold },

  body: { padding: spacing.xl },

  segmentRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  segment: { flexDirection: "row", backgroundColor: colors.muted, borderRadius: radius.md, padding: 3 },
  segmentBtn: { paddingHorizontal: spacing.md, paddingVertical: 8, borderRadius: radius.sm },
  segmentBtnActive: { backgroundColor: colors.guardianPrimary },
  segmentText: { fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.mutedForeground },
  exportBtn: { flexDirection: "row", alignItems: "center", gap: 4 },
  exportText: { fontSize: fontSize.caption, color: colors.mutedForeground, fontWeight: fontWeight.semibold },

  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.lg },
  cardTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  chartHead: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 4 },
  legend: { fontSize: 11, color: colors.mutedForeground, fontWeight: fontWeight.semibold },

  statRow: { flexDirection: "row", gap: spacing.lg },
  statLabel: { fontSize: fontSize.caption, color: colors.mutedForeground },
  statValue: { fontSize: fontSize.title, fontWeight: fontWeight.bold, marginTop: 4 },

  regionRow: { flexDirection: "row", alignItems: "center", marginTop: spacing.md, gap: spacing.sm },
  regionName: { width: 48, fontSize: fontSize.caption, color: colors.foreground, fontWeight: fontWeight.semibold },
  regionTrack: { flex: 1, height: 12, borderRadius: radius.pill, backgroundColor: colors.muted, overflow: "hidden" },
  regionFill: { height: "100%", borderRadius: radius.pill },
  regionValue: { width: 40, textAlign: "right", fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.foreground },
  regionDelta: { width: 40, textAlign: "right", fontSize: 12, fontWeight: fontWeight.bold },

  genBtn: { flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 6, marginTop: spacing.lg, paddingVertical: spacing.md, borderRadius: radius.md, backgroundColor: colors.guardianSecondary },
  genText: { color: colors.guardianPrimary, fontSize: fontSize.body, fontWeight: fontWeight.bold },
});

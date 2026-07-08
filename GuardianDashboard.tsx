import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { GuardianNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import LineChart from "./LineChart";

const TREND = [28, 27, 27, 26, 27, 24, 21];

export default function GuardianDashboardScreen() {
  const navigation = useNavigation<GuardianNav>();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        {/* Blue header */}
        <View style={styles.header}>
          <Text style={styles.mode}>보호자 모드</Text>
          <Text style={styles.name}>김철수 님</Text>
          <Text style={styles.sub}>어머니 김영자의 인지 상태를 모니터링 중</Text>
        </View>

        <View style={styles.body}>
          {/* Ward status */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>피보호자 현황</Text>
            <View style={styles.statusRow}>
              <View>
                <Text style={styles.wardName}>김영자 어르신</Text>
                <Text style={styles.wardSub}>마지막 검사 · 2026년 7월 2일</Text>
              </View>
              <View style={{ alignItems: "flex-end" }}>
                <Text style={styles.bigScore}>21점</Text>
                <Text style={styles.warnText}>주의 필요</Text>
              </View>
            </View>
            <View style={styles.track}>
              <View style={[styles.fill, { width: "70%", backgroundColor: colors.destructive }]} />
            </View>
            <View style={styles.trackLabels}>
              <Text style={styles.trackLabel}>0점</Text>
              <Text style={styles.trackLabel}>30점</Text>
            </View>
          </View>

          {/* Alert */}
          <View style={styles.alertCard}>
            <View style={styles.alertHead}>
              <Ionicons name="warning" size={20} color={colors.destructive} />
              <Text style={styles.alertTitle}>인지 점수 하락 감지</Text>
            </View>
            <Text style={styles.alertText}>
              최근 2주간 5점 하락 (26점 → 21점). 지속적인 하락세가 관찰됩니다.
            </Text>
            <Pressable style={styles.alertBtn} accessibilityRole="button">
              <Text style={styles.alertBtnText}>전문의 상담 예약</Text>
            </Pressable>
          </View>

          {/* Key metrics */}
          <View style={styles.card}>
            <Text style={styles.cardLabel}>이번 주 핵심 지표</Text>
            <View style={styles.metricRow}>
              <Metric value="5/7" unit="일" label="대화 완료" color={colors.primary} />
              <Metric value="24.3" unit="점" label="평균 점수" color={colors.accent} />
              <Metric value="경계" label="위험 지표" color={colors.destructive} />
            </View>
          </View>

          {/* Trend chart */}
          <View style={styles.card}>
            <Pressable style={styles.cardHeadRow} onPress={() => navigation.navigate("GuardianChart")}>
              <Text style={styles.cardTitle}>인지 점수 추이</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Text style={styles.link}>상세 보기</Text>
                <Ionicons name="chevron-forward" size={16} color={colors.guardianPrimary} />
              </View>
            </Pressable>
            <Text style={styles.trendSub}>최근 7개월 · <Text style={{ color: colors.destructive, fontWeight: fontWeight.bold }}>-7점</Text></Text>
            <View style={{ alignItems: "center", marginTop: spacing.md }}>
              <LineChart
                data={TREND}
                width={300}
                height={140}
                min={15}
                max={30}
                thresholds={[
                  { value: 24, color: colors.primary },
                  { value: 18, color: colors.destructive },
                ]}
              />
            </View>
            <View style={styles.legendRow}>
              <Text style={styles.legendItem}>● 정상 범위 ≥ 24</Text>
              <Text style={[styles.legendItem, { color: colors.destructive }]}>● 경도 치매 18</Text>
            </View>
          </View>

          {/* Recent diary */}
          <View style={styles.card}>
            <Pressable style={styles.cardHeadRow} onPress={() => navigation.navigate("GuardianDiary")}>
              <Text style={styles.cardTitle}>최근 일기</Text>
              <Text style={styles.link}>전체 보기</Text>
            </Pressable>
            <Pressable style={styles.diaryRow} onPress={() => navigation.navigate("GuardianDiary")}>
              <Text style={{ fontSize: 24 }}>😊</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <Text style={styles.diaryDate}>7월 2일</Text>
                <Text style={styles.diaryText} numberOfLines={1}>된장찌개가 맛있었고 기분이 좋았다</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
            </Pressable>
            <View style={styles.divider} />
            <Pressable style={styles.diaryRow} onPress={() => navigation.navigate("GuardianDiary")}>
              <Text style={{ fontSize: 24 }}>😔</Text>
              <View style={{ flex: 1, marginLeft: spacing.md }}>
                <View style={{ flexDirection: "row", alignItems: "center", gap: 6 }}>
                  <Text style={styles.diaryDate}>7월 1일</Text>
                  <View style={styles.warnBadge}>
                    <Text style={styles.warnBadgeText}>경고</Text>
                  </View>
                </View>
                <Text style={styles.diaryText} numberOfLines={1}>이름이 기억나지 않아 답답했다</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color={colors.mutedForeground} />
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function Metric({ value, unit, label, color }: { value: string; unit?: string; label: string; color: string }) {
  return (
    <View style={{ flex: 1, alignItems: "center" }}>
      <Text style={[styles.metricValue, { color }]}>
        {value}
        {unit ? <Text style={styles.metricUnit}> {unit}</Text> : null}
      </Text>
      <Text style={styles.metricLabel}>{label}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.guardianPrimary },
  header: { backgroundColor: colors.guardianPrimary, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl },
  mode: { color: "rgba(255,255,255,0.85)", fontSize: fontSize.body },
  name: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold, marginTop: 2 },
  sub: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body, marginTop: 4 },

  body: { padding: spacing.xl, gap: spacing.lg },

  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg },
  cardLabel: { fontSize: fontSize.caption, color: colors.mutedForeground },
  cardHeadRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  cardTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  link: { fontSize: fontSize.caption, color: colors.guardianPrimary, fontWeight: fontWeight.semibold },

  statusRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "flex-start", marginTop: spacing.sm },
  wardName: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  wardSub: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: 4 },
  bigScore: { fontSize: 32, fontWeight: fontWeight.bold, color: colors.destructive },
  warnText: { fontSize: fontSize.caption, color: colors.destructive, fontWeight: fontWeight.bold },
  track: { height: 10, borderRadius: radius.pill, backgroundColor: colors.muted, overflow: "hidden", marginTop: spacing.md },
  fill: { height: "100%", borderRadius: radius.pill },
  trackLabels: { flexDirection: "row", justifyContent: "space-between", marginTop: 6 },
  trackLabel: { fontSize: 12, color: colors.mutedForeground },

  alertCard: { backgroundColor: "#FBEBE9", borderRadius: radius.lg, borderWidth: 1, borderColor: "#F0C9C4", padding: spacing.lg },
  alertHead: { flexDirection: "row", alignItems: "center", gap: 6 },
  alertTitle: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.destructive },
  alertText: { fontSize: fontSize.body, color: colors.foreground, marginTop: spacing.sm, lineHeight: 24 },
  alertBtn: { backgroundColor: colors.destructive, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: "center", marginTop: spacing.lg },
  alertBtnText: { color: colors.white, fontSize: fontSize.body, fontWeight: fontWeight.bold },

  metricRow: { flexDirection: "row", marginTop: spacing.lg },
  metricValue: { fontSize: fontSize.title, fontWeight: fontWeight.bold },
  metricUnit: { fontSize: fontSize.caption, fontWeight: fontWeight.normal },
  metricLabel: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: 4 },

  trendSub: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: 4 },
  legendRow: { flexDirection: "row", justifyContent: "center", gap: spacing.lg, marginTop: spacing.sm },
  legendItem: { fontSize: 12, color: colors.primary, fontWeight: fontWeight.semibold },

  diaryRow: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md },
  diaryDate: { fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.foreground },
  diaryText: { fontSize: fontSize.body, color: colors.mutedForeground, marginTop: 2 },
  divider: { height: 1, backgroundColor: colors.border },
  warnBadge: { backgroundColor: "#FBEBE9", borderRadius: radius.pill, paddingHorizontal: 8, paddingVertical: 2 },
  warnBadgeText: { fontSize: 11, color: colors.destructive, fontWeight: fontWeight.bold },
});

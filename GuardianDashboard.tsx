import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Screen, Card, ProgressBar, Body, Caption, Pill, Avatar } from "./ui";

function Stat({ label, value, sub, color }: { label: string; value: string; sub?: string; color: string }) {
  return (
    <View style={[styles.stat, { flex: 1 }]}>
      <Caption>{label}</Caption>
      <Text style={[styles.statValue, { color }]}>{value}</Text>
      {sub ? <Caption style={{ color }}>{sub}</Caption> : null}
    </View>
  );
}

export default function GuardianDashboardScreen() {
  return (
    <Screen>
      <View style={styles.headerRow}>
        <View>
          <Caption>보호자 대시보드</Caption>
          <Text style={styles.h1}>어머니 (김순자)</Text>
        </View>
        <Avatar size={52} emoji="👵" />
      </View>

      <Card color={colors.primary} style={{ marginTop: spacing.lg }}>
        <View style={styles.rowBetween}>
          <View>
            <Caption style={{ color: "rgba(255,255,255,0.85)" }}>현재 인지 위험도</Caption>
            <Text style={styles.riskLevel}>낮음 · 안정</Text>
          </View>
          <Ionicons name="shield-checkmark" size={40} color={colors.white} />
        </View>
        <Body style={{ color: colors.white, marginTop: spacing.sm }}>
          지난 4주간 점수가 안정적으로 유지되고 있어요.
        </Body>
      </Card>

      <View style={styles.statRow}>
        <Stat label="최근 CIST" value="24/30" sub="정상" color={colors.primary} />
        <Stat label="이번 주 참여" value="6/7일" sub="+1" color={colors.accent} />
        <Stat label="기분 평균" value="😊" sub="긍정" color="#6B9CB8" />
      </View>

      <Text style={styles.section}>최근 활동</Text>
      <Card>
        {[
          { icon: "clipboard", text: "CIST 검사 완료 (24점)", time: "오늘 09:12" },
          { icon: "chatbubbles", text: "AI 정서 문답 3회 대화", time: "오늘 08:40" },
          { icon: "book", text: "일기 작성 · 기분 좋음", time: "어제 20:15" },
        ].map((a, i, arr) => (
          <View key={i} style={[styles.activity, i < arr.length - 1 && styles.activityBorder]}>
            <View style={styles.activityIcon}>
              <Ionicons name={a.icon as keyof typeof Ionicons.glyphMap} size={20} color={colors.primary} />
            </View>
            <View style={{ flex: 1 }}>
              <Body style={{ fontWeight: fontWeight.semibold }}>{a.text}</Body>
              <Caption>{a.time}</Caption>
            </View>
          </View>
        ))}
      </Card>

      <Text style={styles.section}>주간 참여율</Text>
      <Card>
        <View style={styles.rowBetween}>
          <Body style={{ fontWeight: fontWeight.semibold }}>목표 대비 달성</Body>
          <Pill label="86%" color={colors.secondary} textColor={colors.secondaryForeground} />
        </View>
        <ProgressBar value={86} />
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  headerRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground, marginTop: 2 },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  riskLevel: { fontSize: fontSize.subtitle, fontWeight: fontWeight.bold, color: colors.white, marginTop: 2 },
  statRow: { flexDirection: "row", gap: spacing.md, marginTop: spacing.lg },
  stat: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
    alignItems: "center",
  },
  statValue: { fontSize: fontSize.subtitle, fontWeight: fontWeight.bold, marginVertical: 2 },
  section: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground, marginTop: spacing.xl, marginBottom: spacing.md },
  activity: { flexDirection: "row", alignItems: "center", gap: spacing.md, paddingVertical: spacing.md },
  activityBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  activityIcon: { width: 40, height: 40, borderRadius: 20, backgroundColor: colors.secondary, alignItems: "center", justifyContent: "center" },
});

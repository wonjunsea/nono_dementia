import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";

type Noti = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  desc: string;
  time: string;
  warn?: boolean;
};

const ITEMS: Noti[] = [
  { icon: "warning", color: colors.destructive, title: "인지 점수 하락 경고", desc: "최근 2주간 5점 하락했어요 (26점 → 21점).", time: "1시간 전", warn: true },
  { icon: "book", color: colors.guardianPrimary, title: "새 일기가 등록되었어요", desc: "7월 2일 어머니의 일기를 확인해보세요.", time: "오늘 오후 8:15" },
  { icon: "chatbubbles", color: colors.accent, title: "AI 대화 미완료", desc: "어머니가 오늘 대화를 완료하지 않으셨어요.", time: "오늘 오후 6:00" },
  { icon: "stats-chart", color: colors.primary, title: "주간 리포트", desc: "이번 주 평균 인지 점수: 24.3점", time: "6월 30일" },
];

export default function GuardianNotificationsScreen() {
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>알림</Text>
        <Text style={styles.headerSub}>어머니 소식을 확인하세요</Text>
      </View>
      <View style={styles.body}>
        {ITEMS.map((n, i) => (
          <View key={i} style={[styles.card, n.warn && styles.warnCard]}>
            <View style={[styles.iconWrap, { backgroundColor: n.color }]}>
              <Ionicons name={n.icon} size={22} color={colors.white} />
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.title}>{n.title}</Text>
              <Text style={styles.desc}>{n.desc}</Text>
              <Text style={styles.time}>{n.time}</Text>
            </View>
          </View>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.guardianPrimary },
  header: { backgroundColor: colors.guardianPrimary, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl },
  headerTitle: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold },
  headerSub: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body, marginTop: 4 },

  body: { padding: spacing.xl, gap: spacing.md },
  card: {
    flexDirection: "row",
    gap: spacing.md,
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  warnCard: { backgroundColor: "#FBEBE9", borderColor: "#F0C9C4" },
  iconWrap: { width: 44, height: 44, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  title: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  desc: { fontSize: fontSize.body, color: colors.foreground, marginTop: 4, lineHeight: 24 },
  time: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: spacing.sm },
});

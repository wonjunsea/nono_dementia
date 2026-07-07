import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Screen, Card, Body, Caption } from "./ui";

type Noti = {
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  title: string;
  desc: string;
  time: string;
  level: "info" | "warn";
};

const ITEMS: Noti[] = [
  { icon: "warning", color: colors.destructive, title: "주의력 점수 하락", desc: "이번 주 주의력이 지난주 대비 2% 낮아졌어요.", time: "1시간 전", level: "warn" },
  { icon: "checkmark-circle", color: colors.primary, title: "CIST 검사 완료", desc: "어머니가 오늘 검사를 마쳤어요 (24점).", time: "오늘 09:12", level: "info" },
  { icon: "book", color: "#6B9CB8", title: "새 일기가 등록되었어요", desc: "따뜻한 반응을 남겨보세요 💚", time: "어제", level: "info" },
  { icon: "calendar", color: colors.accent, title: "정기 검진 D-3", desc: "7월 10일 신경과 진료 예약이 있어요.", time: "2일 전", level: "info" },
];

export default function GuardianNotificationsScreen() {
  return (
    <Screen>
      <Text style={styles.h1}>알림</Text>
      <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
        {ITEMS.map((n, i) => (
          <Card key={i} style={n.level === "warn" ? styles.warn : undefined}>
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: n.color }]}>
                <Ionicons name={n.icon} size={22} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <Text style={styles.title}>{n.title}</Text>
                <Body style={{ color: colors.mutedForeground, marginTop: 2 }}>{n.desc}</Body>
                <Caption style={{ marginTop: spacing.sm }}>{n.time}</Caption>
              </View>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground },
  warn: { borderColor: colors.destructive, backgroundColor: "#FBEBE9" },
  row: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md },
  iconWrap: { width: 44, height: 44, borderRadius: radius.md, alignItems: "center", justifyContent: "center" },
  title: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.foreground },
});

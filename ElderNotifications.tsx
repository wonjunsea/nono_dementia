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
  unread?: boolean;
};

const ITEMS: Noti[] = [
  { icon: "clipboard", color: colors.primary, title: "오늘의 검사 시간이에요", desc: "5분이면 충분해요. 지금 시작해 볼까요?", time: "방금 전", unread: true },
  { icon: "chatbubbles", color: colors.accent, title: "메모이가 기다리고 있어요", desc: "오늘 기분을 이야기해 주세요 😊", time: "1시간 전", unread: true },
  { icon: "trophy", color: "#8A7FAA", title: "7일 연속 참여 달성!", desc: "꾸준함이 최고의 뇌 운동이에요 🎉", time: "어제" },
  { icon: "megaphone", color: "#6B9CB8", title: "지역 캠페인 안내", desc: "이번 주 마을회관 기억력 교실이 열려요", time: "2일 전" },
];

export default function ElderNotificationsScreen() {
  return (
    <Screen>
      <Text style={styles.h1}>알림</Text>
      <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
        {ITEMS.map((n, i) => (
          <Card key={i} style={n.unread ? styles.unread : undefined}>
            <View style={styles.row}>
              <View style={[styles.iconWrap, { backgroundColor: n.color }]}>
                <Ionicons name={n.icon} size={22} color={colors.white} />
              </View>
              <View style={{ flex: 1 }}>
                <View style={styles.titleRow}>
                  <Text style={styles.title}>{n.title}</Text>
                  {n.unread ? <View style={styles.dot} /> : null}
                </View>
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
  unread: { borderColor: colors.primary, backgroundColor: colors.secondary },
  row: { flexDirection: "row", alignItems: "flex-start", gap: spacing.md },
  iconWrap: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    alignItems: "center",
    justifyContent: "center",
  },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.foreground, flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.destructive, marginLeft: spacing.sm },
});

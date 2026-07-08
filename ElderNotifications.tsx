import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { GreenScreen } from "./ui";

type Noti = { title: string; desc: string; time: string; unread?: boolean };

const ITEMS: Noti[] = [
  { title: "AI 정서 문답 시간이에요", desc: "오늘 아직 대화를 완료하지 않으셨어요.", time: "오늘 오전 9:00", unread: true },
  { title: "보호자 반응", desc: "아드님(김철수)이 어제 일기에 반응을 남겼어요.", time: "어제 오후 3:00" },
  { title: "캠페인 참여 완료", desc: "포인트 500P가 적립되었습니다.", time: "7월 1일" },
  { title: "주간 리포트", desc: "이번 주 평균 인지 점수: 26.8점 (정상 범위)", time: "6월 30일" },
];

export default function ElderNotificationsScreen() {
  return (
    <GreenScreen title="알림" subtitle="새로운 소식을 확인하세요">
      <View style={{ gap: spacing.md }}>
        {ITEMS.map((n, i) => (
          <View key={i} style={styles.card}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{n.title}</Text>
              {n.unread ? <View style={styles.dot} /> : null}
            </View>
            <Text style={styles.desc}>{n.desc}</Text>
            <Text style={styles.time}>{n.time}</Text>
          </View>
        ))}
      </View>
    </GreenScreen>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground, flex: 1 },
  dot: { width: 10, height: 10, borderRadius: 5, backgroundColor: colors.destructive, marginLeft: spacing.sm },
  desc: { fontSize: fontSize.body, color: colors.foreground, marginTop: spacing.sm, lineHeight: 24 },
  time: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: spacing.sm },
});

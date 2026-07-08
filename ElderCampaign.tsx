import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ElderNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { GreenScreen, Avatar } from "./ui";

const CAMPAIGNS = [
  {
    title: "2025 노인 인지 건강 지원",
    badge: "참여 가능",
    badgeColor: colors.primary,
    org: "서울시 노인복지과",
    desc: "매일 AI 대화 참여 시 지역사회 인지 건강 지수에 기여해요.",
    reward: "포인트 500P",
  },
  {
    title: "어르신 치매 예방 교육",
    badge: "마감 D-5",
    badgeColor: colors.accent,
    org: "강북구 보건소",
    desc: "영상 교육 이수 후 퀴즈를 완료하면 지역 상품권이 제공돼요.",
    reward: "상품권 5,000원",
  },
];

export default function ElderCampaignScreen() {
  const navigation = useNavigation<ElderNav>();

  return (
    <GreenScreen
      title="지역 재정 캠페인"
      subtitle="참여하면 포인트와 혜택을 드려요"
      onBack={() => navigation.goBack()}
    >
      {/* Character intro */}
      <View style={styles.charRow}>
        <Avatar size={64} emoji="🐶" />
        <Text style={styles.charText}>참여할수록 지역 치매{"\n"}예방에 도움이 돼요!</Text>
      </View>

      <View style={{ gap: spacing.lg, marginTop: spacing.lg }}>
        {CAMPAIGNS.map((c) => (
          <View key={c.title} style={styles.card}>
            <View style={styles.titleRow}>
              <Text style={styles.title}>{c.title}</Text>
              <View style={[styles.badge, { backgroundColor: c.badgeColor }]}>
                <Text style={styles.badgeText}>{c.badge}</Text>
              </View>
            </View>
            <Text style={styles.org}>{c.org}</Text>
            <Text style={styles.desc}>{c.desc}</Text>
            <View style={styles.footerRow}>
              <Text style={styles.reward}>{c.reward}</Text>
              <Pressable style={styles.applyBtn} accessibilityRole="button" accessibilityLabel="신청하기">
                <Text style={styles.applyText}>신청하기</Text>
              </Pressable>
            </View>
          </View>
        ))}
      </View>
    </GreenScreen>
  );
}

const styles = StyleSheet.create({
  charRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  charText: { flex: 1, fontSize: fontSize.body, color: colors.foreground, fontWeight: fontWeight.semibold, lineHeight: 24 },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  titleRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  title: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground, flex: 1 },
  badge: { borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 4, marginLeft: spacing.sm },
  badgeText: { color: colors.white, fontSize: 12, fontWeight: fontWeight.bold },
  org: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: 6 },
  desc: { fontSize: fontSize.body, color: colors.foreground, marginTop: spacing.md, lineHeight: 24 },
  footerRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.lg },
  reward: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.primary },
  applyBtn: { backgroundColor: colors.primary, borderRadius: radius.md, paddingHorizontal: spacing.xl, paddingVertical: spacing.md },
  applyText: { color: colors.white, fontSize: fontSize.body, fontWeight: fontWeight.bold },
});

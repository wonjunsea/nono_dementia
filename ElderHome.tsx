import React from "react";
import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { ElderNav } from "./navTypes";
import { useApp } from "./AppContext";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Avatar } from "./ui";

function MenuCard({
  title,
  desc,
  badge,
  badgeColor,
  onPress,
}: {
  title: string;
  desc: string;
  badge?: string;
  badgeColor?: string;
  onPress: () => void;
}) {
  return (
    <Pressable style={styles.menuCard} onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View style={{ flex: 1 }}>
        <View style={styles.menuTitleRow}>
          <Text style={styles.menuTitle}>{title}</Text>
          {badge ? (
            <View style={[styles.badge, { backgroundColor: badgeColor ?? colors.secondary }]}>
              <Text style={[styles.badgeText, { color: badgeColor ? colors.white : colors.secondaryForeground }]}>
                {badge}
              </Text>
            </View>
          ) : null}
        </View>
        <Text style={styles.menuDesc}>{desc}</Text>
      </View>
      <Ionicons name="chevron-forward" size={24} color={colors.mutedForeground} />
    </Pressable>
  );
}

export default function ElderHomeScreen() {
  const navigation = useNavigation<ElderNav>();
  const { userName } = useApp();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        {/* Green greeting header */}
        <View style={styles.greenTop}>
          <Avatar size={72} emoji="🐶" />
          <View style={{ flex: 1, marginLeft: spacing.lg }}>
            <Text style={styles.greetSmall}>좋은 하루예요</Text>
            <Text style={styles.greetName}>{userName} 어르신</Text>
            <View style={styles.streakPill}>
              <Text style={styles.streakText}>7일 연속 대화 완료</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          <MenuCard
            title="AI 정서 문답"
            desc="오늘의 기억을 AI와 함께 이야기해요"
            badge="오늘 미완료"
            badgeColor={colors.accent}
            onPress={() => navigation.navigate("ElderTabs", { screen: "ElderAiChat" })}
          />
          <MenuCard
            title="알림 · 일정"
            desc="저장된 일기와 알림을 확인해요"
            onPress={() => navigation.navigate("ElderTabs", { screen: "ElderNotifications" })}
          />
          <MenuCard
            title="지역 재정 캠페인"
            desc="인지 캠페인으로 지역사회에 참여해요"
            badge="신규"
            badgeColor={colors.primary}
            onPress={() => navigation.navigate("ElderCampaign")}
          />

          {/* Recent score */}
          <View style={styles.scoreCard}>
            <Text style={styles.scoreLabel}>최근 인지 점수</Text>
            <View style={styles.scoreRow}>
              <View style={{ flexDirection: "row", alignItems: "flex-end" }}>
                <Text style={styles.scoreNum}>27</Text>
                <Text style={styles.scoreDenom}> / 30점</Text>
              </View>
              <View style={styles.normalPill}>
                <Text style={styles.normalText}>정상 범위</Text>
              </View>
            </View>
            <View style={styles.scoreTrack}>
              <View style={[styles.scoreFill, { width: "90%" }]} />
            </View>
            <Text style={styles.scoreDate}>2026년 7월 1일 검사 기준</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },

  greenTop: {
    backgroundColor: colors.primary,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  greetSmall: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body },
  greetName: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold, marginTop: 2 },
  streakPill: {
    alignSelf: "flex-start",
    backgroundColor: "rgba(255,255,255,0.2)",
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    marginTop: spacing.sm,
  },
  streakText: { color: colors.white, fontSize: fontSize.caption, fontWeight: fontWeight.bold },

  body: { padding: spacing.xl, gap: spacing.lg },

  menuCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    flexDirection: "row",
    alignItems: "center",
  },
  menuTitleRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  menuTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  menuDesc: { fontSize: fontSize.body, color: colors.mutedForeground, marginTop: 6 },
  badge: { borderRadius: radius.pill, paddingHorizontal: spacing.sm, paddingVertical: 3 },
  badgeText: { fontSize: 12, fontWeight: fontWeight.bold },

  scoreCard: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
  },
  scoreLabel: { fontSize: fontSize.body, color: colors.mutedForeground },
  scoreRow: { flexDirection: "row", alignItems: "center", justifyContent: "space-between", marginTop: spacing.sm },
  scoreNum: { fontSize: 44, fontWeight: fontWeight.bold, color: colors.primary, lineHeight: 48 },
  scoreDenom: { fontSize: fontSize.body, color: colors.mutedForeground, marginBottom: 8 },
  normalPill: { backgroundColor: colors.secondary, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 6 },
  normalText: { color: colors.secondaryForeground, fontSize: fontSize.caption, fontWeight: fontWeight.bold },
  scoreTrack: { height: 10, borderRadius: radius.pill, backgroundColor: colors.muted, overflow: "hidden", marginTop: spacing.md },
  scoreFill: { height: "100%", backgroundColor: colors.primary, borderRadius: radius.pill },
  scoreDate: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: spacing.md },
});

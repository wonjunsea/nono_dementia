import React from "react";
import { View, Text, StyleSheet, ScrollView, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import { ElderNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Avatar } from "./ui";

const DOMAINS = [
  { label: "날짜 지남력", value: 4, max: 4 },
  { label: "장소 지남력", value: 4, max: 4 },
  { label: "주의 집중력", value: 4, max: 5 },
  { label: "단어 회상", value: 2, max: 3 },
  { label: "언어 능력", value: 5, max: 5 },
];

export default function ElderResultScreen() {
  const navigation = useNavigation<ElderNav>();

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        {/* Green header with score box */}
        <View style={styles.header}>
          <Text style={styles.dateText}>2026년 7월 2일 · 대화 완료</Text>
          <Text style={styles.title}>오늘의 결과</Text>

          <View style={styles.scoreBox}>
            <View style={styles.scoreCircle}>
              <Text style={styles.scoreNum}>27</Text>
              <Text style={styles.scoreDenom}>/ 30</Text>
            </View>
            <View style={{ marginLeft: spacing.lg }}>
              <Text style={styles.scoreStatus}>정상 범위</Text>
              <Text style={styles.scoreSub}>인지 기능 정상 유지</Text>
            </View>
          </View>
        </View>

        <View style={styles.body}>
          {/* Character comment */}
          <View style={styles.charRow}>
            <Avatar size={64} emoji="🐶" />
            <View style={styles.bubble}>
              <Text style={styles.bubbleText}>수고하셨어요!{"\n"}오늘도 잘 하셨어요.</Text>
            </View>
          </View>

          {/* Domain scores */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>영역별 점수</Text>
            {DOMAINS.map((d, i) => {
              const frac = d.value / d.max;
              const barColor = frac < 0.7 ? colors.accent : colors.primary;
              return (
                <View key={d.label} style={{ marginTop: i === 0 ? spacing.lg : spacing.lg }}>
                  <View style={styles.domainRow}>
                    <Text style={styles.domainLabel}>{d.label}</Text>
                    <Text style={[styles.domainValue, { color: frac < 0.7 ? colors.accent : colors.foreground }]}>
                      {d.value}/{d.max}
                    </Text>
                  </View>
                  <View style={styles.track}>
                    <View style={[styles.fill, { width: `${frac * 100}%`, backgroundColor: barColor }]} />
                  </View>
                </View>
              );
            })}
          </View>

          {/* AI diary link */}
          <Pressable style={styles.diaryCard} onPress={() => navigation.navigate("ElderCalendar")} accessibilityRole="button">
            <View style={{ flex: 1 }}>
              <Text style={styles.diaryTitle}>AI 일기 보기</Text>
              <Text style={styles.diaryDesc}>오늘 대화를 기반으로 작성되었어요</Text>
            </View>
            <Ionicons name="chevron-forward" size={24} color={colors.primary} />
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },

  header: { backgroundColor: colors.primary, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl },
  dateText: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.caption },
  title: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold, marginTop: 4 },
  scoreBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  scoreCircle: { flexDirection: "row", alignItems: "flex-end" },
  scoreNum: { color: colors.white, fontSize: 40, fontWeight: fontWeight.bold, lineHeight: 42 },
  scoreDenom: { color: "rgba(255,255,255,0.85)", fontSize: fontSize.body, marginLeft: 4, marginBottom: 6 },
  scoreStatus: { color: colors.white, fontSize: fontSize.subtitle, fontWeight: fontWeight.bold },
  scoreSub: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.caption, marginTop: 2 },

  body: { padding: spacing.xl },

  charRow: { flexDirection: "row", alignItems: "center", gap: spacing.md },
  bubble: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    borderTopLeftRadius: 4,
    padding: spacing.lg,
  },
  bubbleText: { fontSize: fontSize.body, color: colors.foreground, fontWeight: fontWeight.semibold, lineHeight: 24 },

  card: {
    backgroundColor: colors.card,
    borderRadius: radius.lg,
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  cardTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  domainRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.sm },
  domainLabel: { fontSize: fontSize.body, color: colors.foreground, fontWeight: fontWeight.semibold },
  domainValue: { fontSize: fontSize.body, fontWeight: fontWeight.bold },
  track: { height: 10, borderRadius: radius.pill, backgroundColor: colors.muted, overflow: "hidden" },
  fill: { height: "100%", borderRadius: radius.pill },

  diaryCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    borderWidth: 1.5,
    borderColor: colors.primary,
    padding: spacing.lg,
    marginTop: spacing.lg,
  },
  diaryTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  diaryDesc: { fontSize: fontSize.body, color: colors.mutedForeground, marginTop: 4 },
});

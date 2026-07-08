import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";

const REACTIONS = ["❤️", "😊", "💪", "🙏", "🥺"];

const DIARY = `오늘은 아침부터 조금 피곤했지만, 아들이 정성껏 끓여준 된장찌개를 먹으니 기분이 한결 나아졌다.

오후에는 집 앞 공원을 잠깐 산책했다. 날씨가 맑아서 기분이 좋고, 이웃 어르신을 만나 잠시 이야기를 나눴다.

저녁에는 좋아하는 TV 프로그램을 보며 편안히 쉬었다. 오늘 하루도 무사히 잘 마쳤다는 생각에 감사했다.`;

export default function GuardianDiaryScreen() {
  const [selected, setSelected] = useState<number | null>(1);
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingBottom: spacing.xxl }}>
        {/* Blue header */}
        <View style={styles.header}>
          <Text style={styles.headerTitle}>어머니의 일기</Text>
          <Text style={styles.headerSub}>AI가 작성한 하루 기록</Text>
        </View>

        <View style={styles.body}>
          {/* Score row */}
          <View style={styles.scoreRow}>
            <Text style={{ fontSize: 30 }}>😊</Text>
            <Text style={styles.score}>27점</Text>
            <View style={styles.pill}>
              <Text style={styles.pillText}>정상 범위</Text>
            </View>
            <Text style={styles.date}>7월 2일 · AI 일기</Text>
          </View>

          {/* Diary */}
          <View style={styles.card}>
            <Text style={styles.diaryText}>{DIARY}</Text>
          </View>

          {/* Reaction */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>반응 남기기</Text>
            <View style={styles.emojiRow}>
              {REACTIONS.map((e, i) => (
                <Pressable
                  key={i}
                  onPress={() => setSelected(i)}
                  style={[styles.emojiBtn, selected === i && styles.emojiBtnActive]}
                >
                  <Text style={{ fontSize: 26 }}>{e}</Text>
                </Pressable>
              ))}
            </View>
            <TextInput
              style={styles.input}
              placeholder="응원 메시지를 입력하세요 (선택)"
              placeholderTextColor={colors.mutedForeground}
              value={message}
              onChangeText={setMessage}
            />
            <Pressable
              style={[styles.sendBtn, sent && { backgroundColor: colors.primary }]}
              onPress={() => setSent(true)}
              accessibilityRole="button"
            >
              <Text style={styles.sendText}>{sent ? "반응을 전달했어요 ✓" : "반응 전달하기"}</Text>
            </Pressable>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.guardianPrimary },
  header: { backgroundColor: colors.guardianPrimary, paddingHorizontal: spacing.xl, paddingTop: spacing.md, paddingBottom: spacing.xl },
  headerTitle: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold },
  headerSub: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body, marginTop: 4 },

  body: { padding: spacing.xl },

  scoreRow: { flexDirection: "row", alignItems: "center", gap: spacing.sm, flexWrap: "wrap" },
  score: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.guardianPrimary },
  pill: { backgroundColor: colors.guardianSecondary, borderRadius: radius.pill, paddingHorizontal: spacing.md, paddingVertical: 4 },
  pillText: { color: colors.guardianSecondaryFg, fontSize: fontSize.caption, fontWeight: fontWeight.bold },
  date: { fontSize: fontSize.caption, color: colors.mutedForeground, width: "100%", marginTop: 4 },

  card: { backgroundColor: colors.card, borderRadius: radius.lg, borderWidth: 1, borderColor: colors.border, padding: spacing.lg, marginTop: spacing.lg },
  diaryText: { fontSize: fontSize.body, color: colors.foreground, lineHeight: 28 },

  cardTitle: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground },
  emojiRow: { flexDirection: "row", justifyContent: "space-between", marginTop: spacing.lg },
  emojiBtn: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.muted, alignItems: "center", justifyContent: "center" },
  emojiBtnActive: { backgroundColor: colors.guardianSecondary, borderWidth: 2, borderColor: colors.guardianPrimary },
  input: {
    height: 52,
    backgroundColor: colors.inputBackground,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.body,
    color: colors.foreground,
    marginTop: spacing.lg,
  },
  sendBtn: { backgroundColor: colors.guardianPrimary, borderRadius: radius.md, paddingVertical: spacing.md, alignItems: "center", marginTop: spacing.md },
  sendText: { color: colors.white, fontSize: fontSize.body, fontWeight: fontWeight.bold },
});

import React, { useState } from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, fontSize, fontWeight } from "./theme";
import { Screen, Card, Body, Caption } from "./ui";

type Entry = {
  id: number;
  date: string;
  mood: string;
  text: string;
  reactions: number;
};

const INITIAL: Entry[] = [
  { id: 1, date: "7월 7일", mood: "😊", text: "손주가 놀러 와서 즐거웠다. 기억력 게임도 같이 했다.", reactions: 2 },
  { id: 2, date: "7월 6일", mood: "😐", text: "비가 와서 산책은 못 했지만 AI 문답을 했다.", reactions: 1 },
  { id: 3, date: "7월 5일", mood: "😄", text: "경로당에서 친구들과 이야기를 많이 나눴다.", reactions: 3 },
];

export default function GuardianDiaryScreen() {
  const [entries, setEntries] = useState<Entry[]>(INITIAL);
  const [liked, setLiked] = useState<Record<number, boolean>>({});

  const react = (id: number) => {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, reactions: e.reactions + (liked[id] ? -1 : 1) } : e))
    );
    setLiked((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <Screen>
      <Text style={styles.h1}>일기 · 반응</Text>
      <Caption style={{ marginTop: 4 }}>어머니의 하루에 따뜻한 반응을 남겨보세요.</Caption>

      <View style={{ gap: spacing.md, marginTop: spacing.lg }}>
        {entries.map((e) => (
          <Card key={e.id}>
            <View style={styles.rowBetween}>
              <View style={styles.dateRow}>
                <Ionicons name="calendar-outline" size={18} color={colors.mutedForeground} />
                <Caption style={{ marginLeft: 6 }}>{e.date}</Caption>
              </View>
              <Text style={{ fontSize: 22 }}>{e.mood}</Text>
            </View>
            <Body style={{ marginTop: spacing.sm }}>{e.text}</Body>

            <View style={styles.actions}>
              <Pressable style={styles.reactBtn} onPress={() => react(e.id)} accessibilityLabel="응원하기">
                <Ionicons
                  name={liked[e.id] ? "heart" : "heart-outline"}
                  size={22}
                  color={liked[e.id] ? colors.destructive : colors.mutedForeground}
                />
                <Text style={styles.reactText}>{e.reactions}</Text>
              </Pressable>
              <Pressable style={styles.reactBtn} onPress={() => {}} accessibilityLabel="댓글">
                <Ionicons name="chatbubble-outline" size={20} color={colors.mutedForeground} />
                <Text style={styles.reactText}>댓글</Text>
              </Pressable>
            </View>
          </Card>
        ))}
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dateRow: { flexDirection: "row", alignItems: "center" },
  actions: { flexDirection: "row", gap: spacing.xl, marginTop: spacing.md, paddingTop: spacing.md, borderTopWidth: 1, borderTopColor: colors.border },
  reactBtn: { flexDirection: "row", alignItems: "center", gap: 6 },
  reactText: { fontSize: fontSize.caption, color: colors.mutedForeground, fontWeight: fontWeight.semibold },
});

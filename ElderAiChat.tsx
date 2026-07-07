import React, { useState } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput, Pressable } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Avatar } from "./ui";

type Msg = { id: number; from: "ai" | "me"; text: string };

const INITIAL: Msg[] = [
  { id: 1, from: "ai", text: "안녕하세요! 오늘 기분은 어떠세요? 😊" },
  { id: 2, from: "me", text: "그냥 그래요. 조금 심심하네요." },
  { id: 3, from: "ai", text: "그러셨군요. 오늘 아침엔 무엇을 드셨는지 기억나세요?" },
];

const QUICK = ["기분이 좋아요", "잘 모르겠어요", "오늘 산책했어요"];

export default function ElderAiChatScreen() {
  const [messages, setMessages] = useState<Msg[]>(INITIAL);
  const [text, setText] = useState("");

  const send = (value: string) => {
    const v = value.trim();
    if (!v) return;
    const next: Msg[] = [...messages, { id: Date.now(), from: "me", text: v }];
    setMessages(next);
    setText("");
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { id: Date.now() + 1, from: "ai", text: "말씀해 주셔서 고마워요. 오늘 하루도 잘 기록해 둘게요! 🌿" },
      ]);
    }, 500);
  };

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      <View style={styles.header}>
        <Avatar size={40} emoji="🐶" />
        <View style={{ marginLeft: spacing.md }}>
          <Text style={styles.headerName}>메모이</Text>
          <Text style={styles.headerStatus}>AI 정서 문답 · 온라인</Text>
        </View>
      </View>

      <ScrollView contentContainerStyle={{ padding: spacing.lg, gap: spacing.md }}>
        {messages.map((m) => (
          <View
            key={m.id}
            style={[styles.bubble, m.from === "ai" ? styles.bubbleAi : styles.bubbleMe]}
          >
            <Text style={[styles.bubbleText, m.from === "me" && { color: colors.white }]}>{m.text}</Text>
          </View>
        ))}
      </ScrollView>

      <View style={styles.quickRow}>
        {QUICK.map((q) => (
          <Pressable key={q} style={styles.quickChip} onPress={() => send(q)}>
            <Text style={styles.quickChipText}>{q}</Text>
          </Pressable>
        ))}
      </View>

      <View style={styles.inputRow}>
        <TextInput
          style={styles.input}
          placeholder="메시지를 입력하세요"
          placeholderTextColor={colors.mutedForeground}
          value={text}
          onChangeText={setText}
          onSubmitEditing={() => send(text)}
        />
        <Pressable style={styles.sendBtn} onPress={() => send(text)} accessibilityLabel="전송">
          <Ionicons name="send" size={22} color={colors.white} />
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  headerName: { fontSize: fontSize.body, fontWeight: fontWeight.bold, color: colors.foreground },
  headerStatus: { fontSize: fontSize.caption, color: colors.primary },
  bubble: { maxWidth: "80%", padding: spacing.md, borderRadius: radius.lg },
  bubbleAi: { backgroundColor: colors.secondary, alignSelf: "flex-start", borderBottomLeftRadius: 4 },
  bubbleMe: { backgroundColor: colors.primary, alignSelf: "flex-end", borderBottomRightRadius: 4 },
  bubbleText: { fontSize: fontSize.body, color: colors.foreground, lineHeight: 24 },
  quickRow: { flexDirection: "row", flexWrap: "wrap", gap: spacing.sm, paddingHorizontal: spacing.lg, paddingBottom: spacing.sm },
  quickChip: {
    backgroundColor: colors.muted,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 8,
  },
  quickChipText: { color: colors.foreground, fontSize: fontSize.caption, fontWeight: fontWeight.semibold },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
    padding: spacing.md,
    gap: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },
  input: {
    flex: 1,
    height: 52,
    backgroundColor: colors.inputBackground,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.lg,
    fontSize: fontSize.body,
    color: colors.foreground,
  },
  sendBtn: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
  },
});

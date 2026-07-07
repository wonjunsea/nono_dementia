import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated, Easing } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";

import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Button, Avatar } from "./ui";

const QUESTIONS = [
  "어르신, 오늘 하루 어떠셨어요?\n편하게 이야기해 주세요.",
  "오늘 가장 기억에 남는 일이\n있으셨나요?",
  "요즘 밤에 잠은\n잘 주무시나요?",
];

const CLOSING = "오늘 이야기 들려주셔서 고마워요.\n마음이 한결 가벼워지셨길 바라요 🌿";

type Screen = "intro" | "talking" | "done";
type Phase = "idle" | "recording" | "answered";

export default function ElderAiChatScreen() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const pulse = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (phase === "recording") {
      const loop = Animated.loop(
        Animated.sequence([
          Animated.timing(pulse, { toValue: 1.18, duration: 650, easing: Easing.ease, useNativeDriver: true }),
          Animated.timing(pulse, { toValue: 1, duration: 650, easing: Easing.ease, useNativeDriver: true }),
        ])
      );
      loop.start();
      return () => loop.stop();
    } else {
      pulse.setValue(1);
    }
  }, [phase, pulse]);

  const onMicPress = () => {
    if (phase === "recording") setPhase("answered");
    else setPhase("recording");
  };

  const next = () => {
    if (step + 1 >= QUESTIONS.length) {
      setScreen("done");
    } else {
      setStep(step + 1);
      setPhase("idle");
    }
  };

  const restart = () => {
    setScreen("intro");
    setStep(0);
    setPhase("idle");
  };

  const question = screen === "done" ? CLOSING : QUESTIONS[step];

  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Green header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>AI 정서 문답</Text>
        <Text style={styles.headerSub}>오늘 있었던 이야기를 편하게 들려주세요.</Text>
      </View>

      <View style={styles.body}>
        {/* Character + speech bubble */}
        <View style={styles.charWrap}>
          <Avatar size={140} emoji="🐶" />
        </View>
        <View style={styles.bubble}>
          <View style={styles.bubbleTail} />
          <Text style={styles.bubbleText}>{question}</Text>
        </View>

        {/* Middle area changes by state */}
        {screen === "intro" ? (
          <Text style={styles.instruction}>
            AI가 음성으로 질문을 드리면{"\n"}마이크 버튼을 눌러 답변해 주세요.
          </Text>
        ) : screen === "talking" ? (
          <View style={styles.micArea}>
            <Pressable onPress={onMicPress} accessibilityRole="button" accessibilityLabel="눌러서 말하기">
              <Animated.View
                style={[
                  styles.micButton,
                  phase === "recording" && styles.micButtonActive,
                  { transform: [{ scale: pulse }] },
                ]}
              >
                <Ionicons name={phase === "recording" ? "stop" : "mic"} size={40} color={colors.white} />
              </Animated.View>
            </Pressable>
            <Text style={[styles.micHint, phase === "recording" && { color: colors.destructive, fontWeight: fontWeight.bold }]}>
              {phase === "recording"
                ? "듣고 있어요…"
                : phase === "answered"
                ? "잘 들었어요! 다음으로 넘어가요."
                : "버튼을 눌러 말씀해 주세요"}
            </Text>
          </View>
        ) : (
          <View style={styles.micArea}>
            <Text style={{ fontSize: 40 }}>💚</Text>
          </View>
        )}
      </View>

      {/* Bottom action */}
      <View style={styles.footer}>
        {screen === "intro" ? (
          <Button label="대화 시작하기" icon="mic" onPress={() => setScreen("talking")} />
        ) : screen === "talking" ? (
          <Button
            label={step + 1 >= QUESTIONS.length ? "대화 마치기" : "다음 질문"}
            disabled={phase !== "answered"}
            onPress={next}
          />
        ) : (
          <Button label="다시 이야기하기" variant="secondary" onPress={restart} />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  headerTitle: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold },
  headerSub: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body, marginTop: 4 },

  body: { flex: 1, alignItems: "center", paddingHorizontal: spacing.xl, paddingTop: spacing.xl },

  charWrap: { marginTop: spacing.sm },
  bubble: {
    marginTop: spacing.xl,
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.xl,
    alignSelf: "stretch",
    alignItems: "center",
  },
  bubbleTail: {
    position: "absolute",
    top: -8,
    alignSelf: "center",
    width: 16,
    height: 16,
    backgroundColor: colors.secondary,
    transform: [{ rotate: "45deg" }],
  },
  bubbleText: {
    fontSize: fontSize.subtitle,
    color: colors.foreground,
    fontWeight: fontWeight.semibold,
    textAlign: "center",
    lineHeight: 32,
  },

  instruction: {
    fontSize: fontSize.body,
    color: colors.mutedForeground,
    textAlign: "center",
    marginTop: spacing.xxl,
    lineHeight: 26,
  },

  micArea: { flex: 1, alignItems: "center", justifyContent: "center" },
  micButton: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: colors.primary,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 6,
  },
  micButtonActive: { backgroundColor: colors.destructive, shadowColor: colors.destructive },
  micHint: { marginTop: spacing.lg, fontSize: fontSize.body, color: colors.mutedForeground },

  footer: { padding: spacing.xl, paddingTop: 0 },
});

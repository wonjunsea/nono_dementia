import React, { useEffect, useRef, useState } from "react";
import { View, Text, StyleSheet, Pressable, Animated, Easing, DimensionValue } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
} from "expo-audio";

import { RootNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Button, Card, Caption, Avatar } from "./ui";

type Question = {
  category: string;
  prompt: string;
  hint: string;
  sample: string; // mock recognized answer for prototype
};

const QUESTIONS: Question[] = [
  {
    category: "날짜 지남력",
    prompt: "오늘이 몇 년 몇 월 며칠 무슨 요일인지 말씀해 주세요.",
    hint: "연도, 월, 일, 요일을 순서대로 말씀해 주세요.",
    sample: "2026년 7월 8일 수요일",
  },
  {
    category: "기억력 등록",
    prompt: "다음 세 단어를 따라 말해 주세요.\n'나무, 자동차, 사과'",
    hint: "천천히 또박또박 말씀해 주세요.",
    sample: "나무, 자동차, 사과",
  },
  {
    category: "주의력",
    prompt: "숫자를 거꾸로 말해 주세요.\n'3 - 5 - 7'",
    hint: "끝에서부터 거꾸로 말씀해 주세요.",
    sample: "7 - 5 - 3",
  },
  {
    category: "언어 유창성",
    prompt: "아는 동물 이름을\n최대한 많이 말해 주세요.",
    hint: "생각나는 대로 편하게 말씀해 주세요.",
    sample: "강아지, 고양이, 호랑이, 코끼리, 토끼",
  },
  {
    category: "지연 회상",
    prompt: "조금 전에 외운\n세 단어를 다시 말해 주세요.",
    hint: "기억나는 만큼 말씀해 주세요.",
    sample: "나무, 자동차, 사과",
  },
];

type Phase = "idle" | "recording" | "recorded";

export default function ElderCistScreen() {
  const [step, setStep] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [seconds, setSeconds] = useState(0);
  const [recognized, setRecognized] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [micAllowed, setMicAllowed] = useState<boolean | null>(null);

  const navigation = useNavigation<RootNav>();
  const recorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  const pulse = useRef(new Animated.Value(1)).current;

  const total = QUESTIONS.length;
  const current = QUESTIONS[step];

  // Ask for microphone permission once.
  useEffect(() => {
    (async () => {
      try {
        const status = await AudioModule.requestRecordingPermissionsAsync();
        setMicAllowed(status.granted);
        if (status.granted) {
          await setAudioModeAsync({ allowsRecording: true, playsInSilentMode: true });
        }
      } catch {
        setMicAllowed(false);
      }
    })();
  }, []);

  // Pulsing animation while recording.
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

  // Recording timer.
  useEffect(() => {
    if (phase === "recording") {
      const id = setInterval(() => setSeconds((s) => s + 1), 1000);
      return () => clearInterval(id);
    }
  }, [phase]);

  const startRecording = async () => {
    setSeconds(0);
    setRecognized(null);
    try {
      if (micAllowed) {
        await recorder.prepareToRecordAsync();
        recorder.record();
      }
    } catch {
      // If the emulator has no mic, keep the UI flow working anyway.
    }
    setPhase("recording");
  };

  const stopRecording = async () => {
    try {
      if (micAllowed) await recorder.stop();
    } catch {
      // ignore
    }
    // Prototype: show a mock recognized result (real speech-to-text would go here).
    setRecognized(current.sample);
    setPhase("recorded");
  };

  const onMicPress = () => {
    if (phase === "recording") stopRecording();
    else startRecording();
  };

  const next = () => {
    if (step + 1 >= total) {
      setDone(true);
    } else {
      setStep(step + 1);
      setPhase("idle");
      setSeconds(0);
      setRecognized(null);
    }
  };

  const mmss = `${String(Math.floor(seconds / 60)).padStart(2, "0")}:${String(seconds % 60).padStart(2, "0")}`;

  /* -------------------------------------------------------------- Completed */
  if (done) {
    return (
      <SafeAreaView style={styles.safe} edges={["top"]}>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>CIST 검사 완료</Text>
        </View>
        <View style={styles.completeBody}>
          <Avatar size={120} emoji="🐶" />
          <Text style={styles.doneTitle}>수고하셨어요! 🎉</Text>
          <Text style={styles.doneMsg}>
            메모이와 함께 오늘 검사를 마쳤어요.{"\n"}결과는 '일기' 탭에서 확인할 수 있어요.
          </Text>
          <Card style={styles.scoreCard}>
            <Caption>오늘 점수</Caption>
            <Text style={styles.bigScore}>24 / 30</Text>
            <Caption style={{ color: colors.primary, fontWeight: fontWeight.bold }}>정상 범위</Caption>
          </Card>
          <Button
            label="메모케어 시작하기"
            style={{ marginTop: spacing.xl, alignSelf: "stretch" }}
            onPress={() => navigation.reset({ index: 0, routes: [{ name: "Elder" }] })}
          />
          <Button
            label="다시 검사하기"
            variant="secondary"
            style={{ marginTop: spacing.md, alignSelf: "stretch" }}
            onPress={() => {
              setStep(0);
              setPhase("idle");
              setSeconds(0);
              setRecognized(null);
              setDone(false);
            }}
          />
        </View>
      </SafeAreaView>
    );
  }

  /* ----------------------------------------------------------------- Question */
  return (
    <SafeAreaView style={styles.safe} edges={["top"]}>
      {/* Green header with progress */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>CIST 초기 검사</Text>
        <Text style={styles.headerCount}>
          {step + 1} / {total}
        </Text>
      </View>
      <View style={styles.progressTrack}>
        <View style={[styles.progressFill, { width: `${((step + 1) / total) * 100}%` as DimensionValue }]} />
      </View>

      <View style={styles.body}>
        {/* Character asks the question */}
        <View style={styles.tagRow}>
          <View style={styles.tag}>
            <Text style={styles.tagText}>{current.category}</Text>
          </View>
        </View>

        <View style={styles.charRow}>
          <Avatar size={64} emoji="🐶" />
          <View style={styles.speechBubble}>
            <Text style={styles.question}>{current.prompt}</Text>
          </View>
        </View>
        <Text style={styles.hint}>{current.hint}</Text>

        {/* Mic area */}
        <View style={styles.micArea}>
          <View style={styles.dashed} />

          <Pressable onPress={onMicPress} accessibilityRole="button" accessibilityLabel="눌러서 말하기">
            <Animated.View
              style={[
                styles.micButton,
                phase === "recording" && styles.micButtonActive,
                { transform: [{ scale: pulse }] },
              ]}
            >
              <Ionicons name={phase === "recording" ? "stop" : "mic"} size={44} color={colors.white} />
            </Animated.View>
          </Pressable>

          {phase === "recording" ? (
            <Text style={styles.recordingText}>듣고 있어요… {mmss}</Text>
          ) : phase === "recorded" ? (
            <View style={styles.resultBox}>
              <Caption style={{ color: colors.secondaryForeground, fontWeight: fontWeight.bold }}>인식된 답변</Caption>
              <Text style={styles.resultText}>“{recognized}”</Text>
              <Pressable onPress={startRecording} style={styles.retry}>
                <Ionicons name="refresh" size={16} color={colors.mutedForeground} />
                <Text style={styles.retryText}>다시 말하기</Text>
              </Pressable>
            </View>
          ) : (
            <Text style={styles.micHint}>버튼을 눌러 말씀해 주세요</Text>
          )}

          {micAllowed === false ? (
            <Text style={styles.permHint}>마이크 권한이 없어 녹음은 생략돼요. (버튼은 그대로 동작해요)</Text>
          ) : null}
        </View>
      </View>

      {/* Next button */}
      <View style={styles.footer}>
        <Button
          label={step + 1 >= total ? "검사 완료" : "다음 문항"}
          disabled={phase !== "recorded"}
          onPress={next}
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.background },

  header: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  headerTitle: { color: colors.white, fontSize: fontSize.subtitle, fontWeight: fontWeight.bold },
  headerCount: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body, position: "absolute", right: spacing.lg },

  progressTrack: { height: 6, backgroundColor: "#4A7D58" },
  progressFill: { height: 6, backgroundColor: colors.white },

  body: { flex: 1, padding: spacing.xl },

  tagRow: { flexDirection: "row" },
  tag: {
    backgroundColor: colors.secondary,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
  },
  tagText: { color: colors.secondaryForeground, fontSize: fontSize.caption, fontWeight: fontWeight.bold },

  charRow: { flexDirection: "row", alignItems: "flex-start", marginTop: spacing.lg, gap: spacing.md },
  speechBubble: {
    flex: 1,
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    borderTopLeftRadius: 4,
    padding: spacing.lg,
  },
  question: { fontSize: fontSize.subtitle, fontWeight: fontWeight.bold, color: colors.foreground, lineHeight: 32 },
  hint: { fontSize: fontSize.body, color: colors.mutedForeground, marginTop: spacing.md, lineHeight: 24 },

  micArea: { flex: 1, alignItems: "center", justifyContent: "center" },
  dashed: {
    width: "60%",
    borderBottomWidth: 2,
    borderColor: colors.border,
    borderStyle: "dashed",
    marginBottom: spacing.xl,
  },
  micButton: {
    width: 108,
    height: 108,
    borderRadius: 54,
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
  recordingText: { marginTop: spacing.lg, fontSize: fontSize.bodyLg, color: colors.destructive, fontWeight: fontWeight.bold },

  resultBox: {
    marginTop: spacing.lg,
    backgroundColor: colors.secondary,
    borderRadius: radius.lg,
    padding: spacing.lg,
    alignItems: "center",
    alignSelf: "stretch",
  },
  resultText: { fontSize: fontSize.bodyLg, fontWeight: fontWeight.bold, color: colors.foreground, marginTop: 4, textAlign: "center" },
  retry: { flexDirection: "row", alignItems: "center", gap: 6, marginTop: spacing.md },
  retryText: { fontSize: fontSize.caption, color: colors.mutedForeground, fontWeight: fontWeight.semibold },
  permHint: { marginTop: spacing.md, fontSize: fontSize.caption, color: colors.mutedForeground, textAlign: "center" },

  footer: { padding: spacing.xl, paddingTop: 0 },

  completeBody: { flex: 1, alignItems: "center", justifyContent: "center", padding: spacing.xl },
  doneTitle: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground, marginTop: spacing.lg },
  doneMsg: { fontSize: fontSize.body, color: colors.mutedForeground, textAlign: "center", marginTop: spacing.sm, lineHeight: 26 },
  scoreCard: { marginTop: spacing.xl, alignItems: "center", alignSelf: "stretch" },
  bigScore: { fontSize: 44, fontWeight: fontWeight.bold, color: colors.primary, marginVertical: spacing.xs },
});

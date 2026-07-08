import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

import { RootNav } from "./navTypes";
import { colors, spacing, radius, fontSize, fontWeight } from "./theme";
import { Button } from "./ui";
import Character3D from "./Character3D";

export default function SplashScreen() {
  const navigation = useNavigation<RootNav>();

  return (
    <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
      <View style={styles.hero}>
        <Character3D size={220} />
        <Text style={styles.brand}>메모케어</Text>
        <Text style={styles.sub}>MEMOCARE · CIST 기반 AI 스크리닝</Text>

        <Text style={styles.tagline}>
          매일 5분, AI와 함께하는{"\n"}
          <Text style={{ fontWeight: fontWeight.bold }}>인지 건강 조기 스크리닝</Text>
        </Text>

        <View style={styles.bubble}>
          <Text style={styles.bubbleText}>
            "안녕하세요! 저는 <Text style={{ fontWeight: fontWeight.bold }}>메모이</Text>예요.{"\n"}
            함께 뇌 건강을 지켜볼게요! 🌿"
          </Text>
        </View>
      </View>

      <View style={styles.footer}>
        <Button label="시작하기" onPress={() => navigation.navigate("Login")} />
        <Text style={styles.terms}>계속하면 이용약관 및 개인정보 처리방침에 동의합니다.</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.primary },
  hero: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.xl,
  },
  brand: {
    fontSize: 40,
    fontWeight: fontWeight.bold,
    color: colors.white,
    marginTop: spacing.lg,
  },
  sub: {
    fontSize: fontSize.caption,
    color: "rgba(255,255,255,0.85)",
    letterSpacing: 1,
    marginTop: spacing.xs,
  },
  tagline: {
    fontSize: fontSize.bodyLg,
    color: colors.white,
    textAlign: "center",
    marginTop: spacing.xl,
    lineHeight: 30,
  },
  bubble: {
    backgroundColor: "rgba(255,255,255,0.15)",
    borderRadius: radius.lg,
    padding: spacing.lg,
    marginTop: spacing.xl,
  },
  bubbleText: { color: colors.white, fontSize: fontSize.body, textAlign: "center", lineHeight: 26 },
  footer: { paddingHorizontal: spacing.xl, paddingBottom: spacing.lg },
  terms: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 12,
    textAlign: "center",
    marginTop: spacing.md,
  },
});

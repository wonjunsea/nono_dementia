import React from "react";
import { View, Text, StyleSheet } from "react-native";

import { colors, spacing, radius, fontSize, fontWeight, chartColors } from "./theme";
import { Screen, Card, Body, Caption, Pill } from "./ui";

const WEEKLY = [
  { label: "1주", score: 22 },
  { label: "2주", score: 23 },
  { label: "3주", score: 21 },
  { label: "4주", score: 24 },
  { label: "5주", score: 24 },
  { label: "6주", score: 25 },
];

const MAX = 30;

export default function GuardianChartScreen() {
  return (
    <Screen>
      <Text style={styles.h1}>인지 위험 추이</Text>
      <Caption style={{ marginTop: 4 }}>주간 CIST 점수 변화 (30점 만점)</Caption>

      <Card style={{ marginTop: spacing.lg }}>
        <View style={styles.rowBetween}>
          <Body style={{ fontWeight: fontWeight.bold }}>최근 6주</Body>
          <Pill label="▲ 개선 추세" color={colors.secondary} textColor={colors.secondaryForeground} icon="trending-up" />
        </View>

        <View style={styles.chart}>
          {WEEKLY.map((w) => {
            const h = (w.score / MAX) * 140;
            return (
              <View key={w.label} style={styles.barCol}>
                <Text style={styles.barValue}>{w.score}</Text>
                <View style={[styles.bar, { height: h, backgroundColor: chartColors[0] }]} />
                <Caption>{w.label}</Caption>
              </View>
            );
          })}
        </View>
      </Card>

      <Card style={{ marginTop: spacing.lg }}>
        <Body style={{ fontWeight: fontWeight.bold, marginBottom: spacing.md }}>영역별 변화 (전월 대비)</Body>
        {[
          { label: "기억력", delta: "+4%", up: true },
          { label: "주의력", delta: "-2%", up: false },
          { label: "언어능력", delta: "+1%", up: true },
          { label: "시공간", delta: "+3%", up: true },
        ].map((d, i, arr) => (
          <View key={d.label} style={[styles.deltaRow, i < arr.length - 1 && styles.deltaBorder]}>
            <Body style={{ fontWeight: fontWeight.semibold }}>{d.label}</Body>
            <Text style={[styles.delta, { color: d.up ? colors.primary : colors.destructive }]}>{d.delta}</Text>
          </View>
        ))}
      </Card>

      <Card style={{ marginTop: spacing.lg }} color={colors.secondary}>
        <Body style={{ fontWeight: fontWeight.bold, color: colors.secondaryForeground }}>AI 요약</Body>
        <Body style={{ marginTop: spacing.sm, color: colors.secondaryForeground }}>
          전반적으로 안정적이며 기억력이 꾸준히 향상되고 있어요. 주의력은 소폭 하락했으니 규칙적인 수면을 권장합니다.
        </Body>
      </Card>
    </Screen>
  );
}

const styles = StyleSheet.create({
  h1: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground },
  rowBetween: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: spacing.lg },
  chart: { flexDirection: "row", alignItems: "flex-end", justifyContent: "space-between", height: 190 },
  barCol: { alignItems: "center", flex: 1, gap: 6 },
  bar: { width: 22, borderRadius: radius.sm },
  barValue: { fontSize: fontSize.caption, fontWeight: fontWeight.bold, color: colors.foreground },
  deltaRow: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingVertical: spacing.md },
  deltaBorder: { borderBottomWidth: 1, borderBottomColor: colors.border },
  delta: { fontSize: fontSize.body, fontWeight: fontWeight.bold },
});

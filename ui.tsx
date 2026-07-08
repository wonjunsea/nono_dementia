/**
 * Shared, accessibility-first UI primitives for MemoCare.
 */
import React from "react";
import {
  View,
  Text,
  Pressable,
  ScrollView,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
  DimensionValue,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { colors, radius, spacing, fontSize, fontWeight, sizes, shadow } from "./theme";

/* ----------------------------------------------------------------- Screen */

type ScreenProps = {
  children: React.ReactNode;
  scroll?: boolean;
  style?: StyleProp<ViewStyle>;
  background?: string;
  contentStyle?: StyleProp<ViewStyle>;
  edges?: ("top" | "bottom" | "left" | "right")[];
};

export function Screen({
  children,
  scroll = true,
  style,
  background = colors.background,
  contentStyle,
  edges = ["top"],
}: ScreenProps) {
  return (
    <SafeAreaView style={[{ flex: 1, backgroundColor: background }, style]} edges={edges}>
      {scroll ? (
        <ScrollView
          contentContainerStyle={[{ padding: spacing.xl, paddingBottom: spacing.xxl }, contentStyle]}
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      ) : (
        <View style={[{ flex: 1, padding: spacing.xl }, contentStyle]}>{children}</View>
      )}
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ Header */

export function AppHeader({
  title,
  subtitle,
  onBack,
  right,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  right?: React.ReactNode;
}) {
  return (
    <View style={styles.header}>
      {onBack ? (
        <Pressable
          onPress={onBack}
          accessibilityRole="button"
          accessibilityLabel="뒤로 가기"
          hitSlop={12}
          style={styles.headerBtn}
        >
          <Ionicons name="chevron-back" size={28} color={colors.foreground} />
        </Pressable>
      ) : (
        <View style={styles.headerBtn} />
      )}
      <View style={{ flex: 1, alignItems: "center" }}>
        <Text style={styles.headerTitle} numberOfLines={1}>
          {title}
        </Text>
        {subtitle ? <Text style={styles.headerSubtitle}>{subtitle}</Text> : null}
      </View>
      <View style={styles.headerBtn}>{right}</View>
    </View>
  );
}

/* ------------------------------------------------------------ GreenHeader */
// 고령자 화면 상단의 초록 배너 헤더 (제목 + 부제)
export function GreenHeader({
  title,
  subtitle,
  onBack,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
}) {
  return (
    <View style={styles.greenHeader}>
      {onBack ? (
        <Pressable onPress={onBack} accessibilityLabel="뒤로 가기" hitSlop={12} style={{ marginBottom: spacing.sm }}>
          <Ionicons name="chevron-back" size={28} color={colors.white} />
        </Pressable>
      ) : null}
      <Text style={styles.greenHeaderTitle}>{title}</Text>
      {subtitle ? <Text style={styles.greenHeaderSub}>{subtitle}</Text> : null}
    </View>
  );
}

// 초록 헤더 + 스크롤 본문을 묶은 화면 래퍼 (고령자 화면 공통)
export function GreenScreen({
  title,
  subtitle,
  onBack,
  children,
  scroll = true,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  children: React.ReactNode;
  scroll?: boolean;
}) {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: colors.primary }} edges={["top"]}>
      <View style={{ flex: 1, backgroundColor: colors.background }}>
        <GreenHeader title={title} subtitle={subtitle} onBack={onBack} />
        {scroll ? (
          <ScrollView
            contentContainerStyle={{ padding: spacing.xl, paddingBottom: spacing.xxl }}
            showsVerticalScrollIndicator={false}
          >
            {children}
          </ScrollView>
        ) : (
          <View style={{ flex: 1, padding: spacing.xl }}>{children}</View>
        )}
      </View>
    </SafeAreaView>
  );
}

/* ------------------------------------------------------------------ Button */

type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";

export function Button({
  label,
  onPress,
  variant = "primary",
  icon,
  disabled,
  style,
  small,
}: {
  label: string;
  onPress?: () => void;
  variant?: ButtonVariant;
  icon?: keyof typeof Ionicons.glyphMap;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  small?: boolean;
}) {
  const palette: Record<ButtonVariant, { bg: string; fg: string; border?: string }> = {
    primary: { bg: colors.primary, fg: colors.primaryForeground },
    secondary: { bg: colors.secondary, fg: colors.secondaryForeground },
    outline: { bg: "transparent", fg: colors.primary, border: colors.primary },
    ghost: { bg: "transparent", fg: colors.foreground },
    danger: { bg: colors.destructive, fg: colors.destructiveForeground },
  };
  const p = palette[variant];
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="button"
      accessibilityLabel={label}
      style={({ pressed }) => [
        styles.button,
        {
          height: small ? sizes.buttonHeightSm : sizes.buttonHeight,
          backgroundColor: p.bg,
          borderColor: p.border ?? "transparent",
          borderWidth: p.border ? 2 : 0,
          opacity: disabled ? 0.5 : pressed ? 0.85 : 1,
        },
        style,
      ]}
    >
      {icon ? <Ionicons name={icon} size={22} color={p.fg} style={{ marginRight: 8 }} /> : null}
      <Text style={[styles.buttonText, { color: p.fg, fontSize: small ? fontSize.body : fontSize.bodyLg }]}>
        {label}
      </Text>
    </Pressable>
  );
}

/* -------------------------------------------------------------------- Card */

export function Card({
  children,
  style,
  color = colors.card,
  onPress,
}: {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  color?: string;
  onPress?: () => void;
}) {
  const content = (
    <View style={[styles.card, { backgroundColor: color }, style]}>{children}</View>
  );
  if (onPress) {
    return (
      <Pressable onPress={onPress} accessibilityRole="button">
        {content}
      </Pressable>
    );
  }
  return content;
}

/* ------------------------------------------------------------------ Typography */

export function Title({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.title, style]}>{children}</Text>;
}

export function Subtitle({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.subtitle, style]}>{children}</Text>;
}

export function Body({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.body, style]}>{children}</Text>;
}

export function Caption({ children, style }: { children: React.ReactNode; style?: StyleProp<TextStyle> }) {
  return <Text style={[styles.caption, style]}>{children}</Text>;
}

export function SectionTitle({ children }: { children: React.ReactNode }) {
  return <Text style={styles.sectionTitle}>{children}</Text>;
}

/* ------------------------------------------------------------------- Pill */

export function Pill({
  label,
  color = colors.secondary,
  textColor = colors.secondaryForeground,
  icon,
}: {
  label: string;
  color?: string;
  textColor?: string;
  icon?: keyof typeof Ionicons.glyphMap;
}) {
  return (
    <View style={[styles.pill, { backgroundColor: color }]}>
      {icon ? <Ionicons name={icon} size={16} color={textColor} style={{ marginRight: 6 }} /> : null}
      <Text style={{ color: textColor, fontSize: fontSize.caption, fontWeight: fontWeight.semibold }}>
        {label}
      </Text>
    </View>
  );
}

/* -------------------------------------------------------------- ProgressBar */

export function ProgressBar({ value, color = colors.primary }: { value: number; color?: string }) {
  return (
    <View style={styles.progressTrack}>
      <View
        style={[
          styles.progressFill,
          { width: `${Math.max(0, Math.min(100, value))}%` as DimensionValue, backgroundColor: color },
        ]}
      />
    </View>
  );
}

/* ------------------------------------------------------------------ Avatar */

export function Avatar({ size = 96, emoji = "🐶" }: { size?: number; emoji?: string }) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: colors.secondary,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Text style={{ fontSize: size * 0.5 }}>{emoji}</Text>
    </View>
  );
}

/* ----------------------------------------------------------------- Divider */

export function Divider() {
  return <View style={styles.divider} />;
}

const styles = StyleSheet.create({
  header: {
    height: sizes.headerHeight,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
  },
  headerBtn: { width: 40, alignItems: "center", justifyContent: "center" },
  headerTitle: { fontSize: fontSize.subtitle, fontWeight: fontWeight.bold, color: colors.foreground },
  headerSubtitle: { fontSize: fontSize.caption, color: colors.mutedForeground, marginTop: 2 },

  greenHeader: {
    backgroundColor: colors.primary,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.md,
    paddingBottom: spacing.xl,
  },
  greenHeaderTitle: { color: colors.white, fontSize: fontSize.title, fontWeight: fontWeight.bold },
  greenHeaderSub: { color: "rgba(255,255,255,0.9)", fontSize: fontSize.body, marginTop: 4 },

  button: {
    borderRadius: radius.md,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: spacing.lg,
  },
  buttonText: { fontWeight: fontWeight.bold },

  card: {
    borderRadius: radius.lg,
    padding: spacing.lg,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  title: { fontSize: fontSize.title, fontWeight: fontWeight.bold, color: colors.foreground },
  subtitle: { fontSize: fontSize.subtitle, fontWeight: fontWeight.semibold, color: colors.foreground },
  body: { fontSize: fontSize.body, color: colors.foreground, lineHeight: 26 },
  caption: { fontSize: fontSize.caption, color: colors.mutedForeground },
  sectionTitle: {
    fontSize: fontSize.bodyLg,
    fontWeight: fontWeight.bold,
    color: colors.foreground,
    marginBottom: spacing.md,
  },

  pill: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    paddingHorizontal: spacing.md,
    paddingVertical: 6,
    borderRadius: radius.pill,
  },

  progressTrack: {
    height: 12,
    borderRadius: radius.pill,
    backgroundColor: colors.muted,
    overflow: "hidden",
  },
  progressFill: { height: "100%", borderRadius: radius.pill },

  divider: { height: 1, backgroundColor: colors.border, marginVertical: spacing.md },
});

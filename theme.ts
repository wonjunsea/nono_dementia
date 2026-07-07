/**
 * MemoCare design tokens.
 * Ported from the Figma Make project (theme.css).
 * Accessibility-first: large type and tall touch targets for elderly users.
 */

export const colors = {
  background: "#FFFFFF",
  foreground: "#2D3132",
  card: "#FFFFFF",
  cardForeground: "#1A1F2E",

  primary: "#5A8F68", // sage green
  primaryForeground: "#FFFFFF",

  secondary: "#EAF3EC", // light green surface
  secondaryForeground: "#3D6B4A",

  muted: "#F0EDE6",
  mutedForeground: "#697268",

  accent: "#D4A373", // warm tan
  accentForeground: "#FFFFFF",

  destructive: "#C0392B",
  destructiveForeground: "#FFFFFF",

  border: "rgba(45, 49, 50, 0.12)",
  inputBackground: "#F5F2EC",
  switchBackground: "#C4BFB2",
  ring: "#5A8F68",

  white: "#FFFFFF",
  success: "#5A8F68",
  warning: "#D4A373",
  danger: "#C0392B",
} as const;

// Chart palette (chart-1 ... chart-5 from theme.css)
export const chartColors = [
  "#5A8F68",
  "#D4A373",
  "#6B9CB8",
  "#C0392B",
  "#8A7FAA",
] as const;

export const radius = {
  sm: 8,
  md: 14, // --radius: 0.875rem
  lg: 20,
  xl: 28,
  pill: 999,
} as const;

export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 32,
} as const;

// Larger scale for elder-facing screens (design spec: 고령자 폰트 18px+)
export const fontSize = {
  caption: 14,
  body: 18,
  bodyLg: 20,
  subtitle: 22,
  title: 26,
  display: 32,
} as const;

export const fontWeight = {
  normal: "400",
  medium: "500",
  semibold: "600",
  bold: "700",
} as const;

// Touch targets: buttons 56~64px tall (design spec)
export const sizes = {
  buttonHeight: 60,
  buttonHeightSm: 48,
  tabBarHeight: 72,
  headerHeight: 56,
  canvasWidth: 375,
} as const;

export const shadow = {
  card: {
    shadowColor: "#2D3132",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
  },
} as const;

export const theme = {
  colors,
  chartColors,
  radius,
  spacing,
  fontSize,
  fontWeight,
  sizes,
  shadow,
};

export type Theme = typeof theme;
export default theme;

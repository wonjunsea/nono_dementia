import React from "react";
import { View } from "react-native";
import Svg, { Polyline, Circle, Line as SvgLine } from "react-native-svg";

import { colors } from "./theme";

type Threshold = { value: number; color: string };

export default function LineChart({
  data,
  width = 300,
  height = 150,
  min = 15,
  max = 30,
  color = colors.guardianPrimary,
  thresholds = [],
  highlightLast = true,
}: {
  data: number[];
  width?: number;
  height?: number;
  min?: number;
  max?: number;
  color?: string;
  thresholds?: Threshold[];
  highlightLast?: boolean;
}) {
  const pad = 12;
  const innerW = width - pad * 2;
  const innerH = height - pad * 2;

  const xFor = (i: number) => pad + (data.length <= 1 ? 0 : (i * innerW) / (data.length - 1));
  const yFor = (v: number) => pad + innerH - ((v - min) / (max - min)) * innerH;

  const points = data.map((v, i) => `${xFor(i)},${yFor(v)}`).join(" ");

  return (
    <View>
      <Svg width={width} height={height}>
        {/* threshold lines */}
        {thresholds.map((t, i) => (
          <SvgLine
            key={i}
            x1={pad}
            y1={yFor(t.value)}
            x2={width - pad}
            y2={yFor(t.value)}
            stroke={t.color}
            strokeWidth={1}
            strokeDasharray="4 4"
          />
        ))}
        {/* trend line */}
        <Polyline points={points} fill="none" stroke={color} strokeWidth={2.5} strokeLinejoin="round" />
        {/* dots */}
        {data.map((v, i) => {
          const isLast = i === data.length - 1;
          return (
            <Circle
              key={i}
              cx={xFor(i)}
              cy={yFor(v)}
              r={isLast && highlightLast ? 5 : 3.5}
              fill={isLast && highlightLast ? colors.destructive : color}
            />
          );
        })}
      </Svg>
    </View>
  );
}

// components/CircularProgress.tsx
import React from "react";
import { View, Text } from "react-native";
import Svg, { Circle } from "react-native-svg";

interface CircularProgressProps {
  size: number;
  strokeWidth: number;
  progress: number; // Progress value between 0 and 1
  color: string;
}

const CircularProgress: React.FC<CircularProgressProps> = ({
  size,
  strokeWidth,
  progress,
  color,
}) => {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progress);

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size}>
        {/* Background Circle */}
        <Circle
          stroke="#E0E0E0"
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
        />
        {/* Progress Circle */}
        <Circle
          stroke={color}
          fill="none"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          strokeLinecap="round"
        />
      </Svg>
      <Text
        style={{
          position: "absolute",
          textAlign: "center",
          fontSize: 16,
          color: "#FFFFFF",
          top: size / 2 - 10,
          left: 0,
          right: 0,
        }}
      >
        {Math.round(progress * 100)}%
      </Text>
    </View>
  );
};

export default CircularProgress;

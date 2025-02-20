// components/AzkarCard.tsx
import { useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Button } from "./Button";

interface AzkarCardProps {
  id: number;
  text: string;
  targetCount: number;
}

const AzkarCard: React.FC<AzkarCardProps> = ({ id, text, targetCount }) => {
  const [count, setCount] = useState(0);

  const onIncrement = () => {
    if (count === targetCount) {
      return;
    }
    setCount(count + 1);
  };

  const onReset = () => {
    setCount(0);
  };

  return (
    <View style={styles.card}>
      <Text style={styles.text}>{text}</Text>
      <View
        style={{
          flexDirection: "row",
          gap: 16,
        }}
      >
        <Button onPress={onReset} variant="outline" icon="restart-alt" />
        <View
          style={{
            flexGrow: 1,
          }}
        >
          <Button
            onPress={onIncrement}
            text={count === targetCount ? undefined : count.toString()}
            icon={count === targetCount ? "check-circle-outline" : undefined}
            variant={count === targetCount ? "secondary" : "primary"}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#1E1E1E",
    padding: 16,
    borderRadius: 8,
    gap: 24,
    marginBottom: 24,
  },
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "right", // Align text to the right
    writingDirection: "rtl", // Set writing direction to RTL
    fontFamily: "NotoSansArabic",
  },
  progressContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  count: {
    color: "#4CAF50",
    fontSize: 14,
    marginLeft: 16,
  },
});

export default AzkarCard;

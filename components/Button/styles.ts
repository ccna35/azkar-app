import { StyleSheet } from "react-native";

export const buttonStyles = StyleSheet.create({
  base: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "white",
  },
  primary: {
    backgroundColor: "#007AFF",
  },
  secondary: {
    backgroundColor: "#4CAF50",
  },
  outline: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#007AFF",
  },
  ghost: {
    backgroundColor: "transparent",
  },
  disabled: {
    backgroundColor: "#ccc",
  },
  pressed: {
    opacity: 0.8,
  },
  danger: {
    backgroundColor: "#FF3B30",
  },
});

import { Pressable, Text, View, ActivityIndicator } from "react-native";
import { MaterialIcons } from "@expo/vector-icons"; // Replace with your preferred icon library
import { buttonStyles } from "./styles";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost";

interface ButtonProps {
  text?: string;
  icon?: keyof typeof MaterialIcons.glyphMap; // Expo vector icons
  variant?: ButtonVariant;
  isLoading?: boolean;
  disabled?: boolean;
  onPress: () => void;
}

const Button: React.FC<ButtonProps> = ({
  text,
  icon,
  variant = "primary",
  isLoading = false,
  disabled = false,
  onPress,
}) => {
  const isTextOnly = !!text && !icon;

  return (
    <Pressable
      style={({ pressed }) => [
        buttonStyles.base,
        buttonStyles[variant],
        disabled && buttonStyles.disabled,
        pressed && buttonStyles.pressed,
      ]}
      onPress={!disabled && !isLoading ? onPress : undefined}
    >
      {isLoading ? (
        <ActivityIndicator color="white" />
      ) : (
        <View style={buttonStyles.content}>
          {icon && (
            <MaterialIcons
              name={icon}
              size={20}
              color={variant === "ghost" ? "#333" : "white"}
              style={isTextOnly ? {} : { marginRight: text ? 8 : 0 }}
            />
          )}
          {text && <Text style={buttonStyles.text}>{text}</Text>}
        </View>
      )}
    </Pressable>
  );
};

export default Button;

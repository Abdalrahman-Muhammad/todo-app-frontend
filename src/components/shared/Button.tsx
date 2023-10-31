import { Box, Text } from "@/utils/theme";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

type ButtonProps = {
  label: string;
  onPress: () => void;
  onLongPress?: () => void;
  disabled?: boolean;
  upperCase?: boolean;
};

const Button = ({
  label,
  onPress,
  onLongPress,
  disabled,
  upperCase,
}: ButtonProps) => {
  return (
    <Pressable onPress={onPress} onLongPress={onLongPress} disabled={disabled}>
      <Box
        bg={disabled ? "gray800" : "primary"}
        py="3.5"
        borderRadius="rounded-7xl"
      >
        <Text
          variant="textXs"
          fontWeight="700"
          color="white"
          textAlign="center"
          textTransform={upperCase ? "uppercase" : "none"}
        >
          {label}
        </Text>
      </Box>
    </Pressable>
  );
};

export default Button;

const styles = StyleSheet.create({});

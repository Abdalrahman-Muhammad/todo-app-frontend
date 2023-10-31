import { Box } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { Pressable, StyleSheet } from "react-native";

const NavigationBack = () => {
  const navigation = useNavigation();
  const navigateBack = () => {
    navigation.goBack();
  };
  return (
    <Pressable onPress={navigateBack}>
      <Box bg="gray100" p="2" borderRadius="rounded-7xl">
        <Ionicons name="chevron-back" size={24} color={"black"} />
      </Box>
    </Pressable>
  );
};

export default NavigationBack;

const styles = StyleSheet.create({});

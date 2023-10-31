import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Box, Text, theme } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { CategoriesNavigationType } from "@/navigation/types";
import { Feather } from "@expo/vector-icons";
import { useTheme } from "@shopify/restyle";
const CreateNewList = () => {
  const navigation = useNavigation<CategoriesNavigationType>();
  const theme = useTheme<theme>();

  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {});
  };

  return (
    <Pressable onPress={navigateToCreateCategory}>
      <Box
        p="4"
        bg="lightGray"
        borderRadius="rounded-5xl"
        flexDirection="row"
        mb="5"
        alignItems="center"
      >
        <Feather name="plus" size={24} color={theme.colors.gray500} />
        <Text variant="textXl" fontWeight="600" color="gray650" ml="3">
          CreateNewList
        </Text>
      </Box>
    </Pressable>
  );
};

export default CreateNewList;

const styles = StyleSheet.create({});

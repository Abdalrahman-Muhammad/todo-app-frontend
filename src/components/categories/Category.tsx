import { StyleSheet, Pressable } from "react-native";
import React from "react";
import { Box, Text } from "@/utils/theme";
import { Entypo } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { CategoriesNavigationType } from "@/navigation/types";

type CategoryProps = {
  category: ICategory;
};

const Category = ({ category }: CategoryProps) => {
  const navigation = useNavigation<CategoriesNavigationType>();

  const navigateToCreateCategory = () => {
    navigation.navigate("CreateCategory", {
      category: category,
    });
  };

  const navigateToCtegoryScreen = () => {
    navigation.navigate("Category", {
      id: category.id,
    });
  };

  return (
    <Pressable onPress={navigateToCtegoryScreen}>
      <Box bg="lightGray" p="4" borderRadius="rounded-5xl">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
        >
          <Box flexDirection="row">
            <Text variant="textBase" fontWeight="600" mr="3">
              {category.icon.symbol}
            </Text>
            <Text variant="textBase" fontWeight="600">
              {category.name}
            </Text>
          </Box>
          <Pressable onPress={navigateToCreateCategory}>
            <Entypo name="dots-three-vertical" size={16} />
          </Pressable>
        </Box>
      </Box>
    </Pressable>
  );
};

export default Category;

const styles = StyleSheet.create({});

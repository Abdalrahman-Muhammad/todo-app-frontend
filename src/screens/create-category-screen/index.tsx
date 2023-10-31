import Button from "@/components/shared/Button";
import NavigationBack from "@/components/shared/NavigationBack";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { CategoriesStackParamList } from "@/navigation/types";
import axiosInstance, { BASE_URL } from "@/services/config";
import { getColors, getIcons } from "@/utils/helpers";
import theme, { Box, Text } from "@/utils/theme";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, TextInput, Pressable } from "react-native";
import { useSWRConfig } from "swr";
import useSWRMutation from "swr/mutation";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const createCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  await axiosInstance.post(url, { ...arg });
  try {
  } catch (error) {
    console.log(error);
  }
};
const updateCategoryRequest = async (
  url: string,
  { arg }: { arg: ICategoryRequest }
) => {
  await axiosInstance.put(url, { ...arg });
  try {
  } catch (error) {
    console.log(error);
  }
};
const deleteCategoryRequest = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  await axiosInstance.delete(url + "/category/" + arg.id);
  try {
  } catch (error) {
    console.log(error);
  }
};

type CreateCategoryRouteTypes = RouteProp<
  CategoriesStackParamList,
  "CreateCategory"
>;

const CreateCategoryScreen = () => {
  const navigation = useNavigation();

  const route = useRoute<CreateCategoryRouteTypes>();

  const isEditing = route.params.category ? true : false;

  const { trigger, isMutating } = useSWRMutation(
    "categories/create",
    createCategoryRequest
  );

  //
  const { trigger: updateTrigger } = useSWRMutation(
    "categories/update",
    updateCategoryRequest
  );

  const { trigger: deleteTrigger } = useSWRMutation(
    "categories/",
    deleteCategoryRequest
  );
  const { mutate } = useSWRConfig();

  const COLORS = getColors();
  const ICONS = getIcons();
  const DEFAULT_COLOR = COLORS[0];
  const DEFAULT_ICON = ICONS[0];

  const [newCategory, setNewCategory] = useState<
    Omit<ICategory, "id" | "user" | "isEditable">
  >({
    name: route.params.category?.name ?? "",
    color: route.params.category?.color ?? DEFAULT_COLOR,
    icon: route.params.category?.icon ?? DEFAULT_ICON,
  });

  const createNewCategory = async () => {
    try {
      if (route.params.category) {
        const updatedCategoryItem = {
          ...route.params.category,
          ...newCategory,
        };

        await updateTrigger({
          ...updatedCategoryItem,
        });
      } else {
        await trigger({
          ...newCategory,
        });
      }
      await mutate(BASE_URL + "categories");
      navigation.goBack();
    } catch (error) {}
  };

  const deleteCategory = async () => {
    try {
      if (isEditing && route.params.category?.id)
        await deleteTrigger({
          id: route.params.category?.id,
        });
      await mutate(BASE_URL + "categories");
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  const updateColor = (color: IColor) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        color,
      };
    });
  };
  const updateIcon = (icon: IIcon) => {
    setNewCategory((prev) => {
      return {
        ...prev,
        icon,
      };
    });
  };
  console.log(newCategory);
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={16} />
        <Box
          flexDirection="row"
          justifyContent="space-between"
          alignItems="center"
        >
          <NavigationBack />
          {isEditing && (
            <Pressable onPress={deleteCategory}>
              <MaterialCommunityIcons
                name="delete"
                size={24}
                color={theme.colors.rose500}
              />
            </Pressable>
          )}
        </Box>
        <Box height={16} />
        <Box bg="gray250" borderRadius="rounded-2xl">
          <TextInput
            value={newCategory.name}
            style={{
              fontSize: 20,
              lineHeight: 26,
              padding: 16,
            }}
            placeholder="Create new list"
            placeholderTextColor={theme.colors.gray4}
            maxLength={36}
            onChangeText={(text) => {
              setNewCategory((prev) => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
          />
        </Box>
        <Box height={24} />
        <Box bg="gray250" borderRadius="rounded-2xl" p="4">
          <Box
            bg="white"
            width={80}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center"
          >
            <Text
              fontWeight="600"
              variant="textBase"
              color={newCategory.color.name as any}
            >
              Colors
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {COLORS.map((color) => (
              <Pressable key={color.id} onPress={() => updateColor(color)}>
                <Box
                  style={{
                    backgroundColor: color.code,
                  }}
                  width={24}
                  height={24}
                  borderRadius="rounded-2xl"
                ></Box>
              </Pressable>
            ))}
          </Box>
        </Box>
        <Box height={24} />
        <Box bg="gray250" borderRadius="rounded-2xl" p="4">
          <Box
            bg="white"
            width={60}
            p="2"
            mb="4"
            borderRadius="rounded-2xl"
            alignItems="center"
          >
            <Text
              variant="textBase"
              fontWeight="600"
              color={newCategory.color.name as any}
            >
              {newCategory.icon.symbol}
            </Text>
          </Box>
          <Box flexDirection="row" justifyContent="space-evenly">
            {ICONS.map((icon) => (
              <Pressable key={icon.id} onPress={() => updateIcon(icon)}>
                <Box width={24} height={24} borderRadius="rounded-2xl">
                  <Text>{icon.symbol}</Text>
                </Box>
              </Pressable>
            ))}
          </Box>
        </Box>
        <Box position="absolute" bottom={10} left={0} right={0}>
          <Button
            label={isEditing ? "Edit Category" : "Create new Category"}
            onPress={createNewCategory}
          />
        </Box>
      </Box>
    </SafeAreaWrapper>
  );
};

export default CreateCategoryScreen;

const styles = StyleSheet.create({});

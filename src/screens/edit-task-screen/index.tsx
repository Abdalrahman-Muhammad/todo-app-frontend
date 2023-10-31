import NavigationBack from "@/components/shared/NavigationBack";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { Box, Text } from "@/utils/theme";
import React, { useState } from "react";
import { StyleSheet, Pressable, TextInput, FlatList } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { HomeStackParamList } from "@/navigation/types";
import Loader from "@/components/shared/Loader";
import useSWR, { useSWRConfig } from "swr";
import axiosInstance, { fetcher } from "@/services/config";
import { format, isToday } from "date-fns";
import { today } from "@/components/tasks/task-actions";
import { Calendar } from "react-native-calendars";
import useSWRMutation from "swr/mutation";

type EditTaskRouteType = RouteProp<HomeStackParamList, "EditTask">;

const updateTaskRequest = async (url: string, { arg }: { arg: ITask }) => {
  try {
    await axiosInstance.put(`${url}/${arg.id}`, {
      ...arg,
    });
  } catch (error) {
    console.log("updateTaskRequest :", error);
  }
};
const deleteTaskRequest = async (
  url: string,
  { arg }: { arg: { id: string } }
) => {
  try {
    await axiosInstance.delete(`${url}/${arg.id}`);
  } catch (error) {
    console.log("deleteTaskRequest :", error);
  }
};

const EditTaskScreen = () => {
  const route = useRoute<EditTaskRouteType>();

  const navigation = useNavigation();

  const { trigger } = useSWRMutation("tasks/edit", updateTaskRequest);
  const { trigger: triggerDeleteTask } = useSWRMutation(
    "tasks/",
    deleteTaskRequest
  );

  const { task } = route.params;

  const [updatedTask, setUpdatedTask] = useState(task);

  const { mutate } = useSWRConfig();

  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isSelectingDate, setIsSelectingDate] = useState<boolean>(false);

  const { data: categories, isLoading } = useSWR<ICategory[]>(
    "categories",
    fetcher
  );

  const deleteTask = async () => {
    try {
      await triggerDeleteTask({ id: task.id });
      await mutate("tasks/");
      navigation.goBack();
    } catch (error) {}
  };

  const updateTask = async () => {
    try {
      if (updateTask.name.length.toString().trim().length > 0) {
        await trigger({ ...updatedTask });
        await mutate("tasks/");
        navigation.goBack();
      }
    } catch (error) {}
  };

  if (isLoading || !categories) {
    return <Loader />;
  }

  const selectedCategory = categories?.find(
    (_category) => _category.id === updatedTask.categoryId
  );
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box
          flexDirection="row"
          alignItems="center"
          justifyContent="space-between"
          marginTop="5"
        >
          <NavigationBack />
          <Pressable>
            <MaterialCommunityIcons
              name="delete"
              size={24}
              color="red"
              onPress={deleteTask}
            />
          </Pressable>
        </Box>

        <Box height={20} />
        <Box
          bg="lightGray"
          px="4"
          py="3.5"
          borderRadius="rounded-5xl"
          flexDirection="row"
          position="relative"
        >
          <TextInput
            placeholder="Create a new task"
            style={{
              paddingVertical: 8,
              paddingHorizontal: 8,
              fontSize: 16,
              width: "50%",
            }}
            maxLength={36}
            textAlignVertical="center"
            value={updatedTask.name}
            onChangeText={(text) => {
              setUpdatedTask((prev) => {
                return {
                  ...prev,
                  name: text,
                };
              });
            }}
            onSubmitEditing={updateTask}
          />
          <Box flexDirection="row" alignItems="center">
            <Pressable
              onPress={() => {
                setIsSelectingDate((prev) => !prev);
              }}
            >
              <Box
                flexDirection="row"
                alignContent="center"
                bg="white"
                p="2"
                borderRadius="rounded-xl"
              >
                <Text>
                  {isToday(new Date(updatedTask.date))
                    ? "Today"
                    : format(new Date(updatedTask.date), "MMM dd")}
                </Text>
              </Box>
            </Pressable>
            <Box width={12} />
            <Pressable
              onPress={() => {
                setIsSelectingCategory((prev) => !prev);
              }}
            >
              <Box
                bg="white"
                flexDirection="row"
                alignItems="center"
                p="2"
                borderRadius="rounded-xl"
              >
                <Box
                  width={12}
                  height={12}
                  borderRadius="rounded"
                  borderWidth={2}
                  mr="1"
                  style={{
                    borderColor: selectedCategory?.color.code,
                  }}
                ></Box>
                <Text
                  style={{
                    color: selectedCategory?.color.code,
                  }}
                >
                  {selectedCategory?.name}
                </Text>
              </Box>
            </Pressable>
          </Box>
        </Box>

        {isSelectingCategory && (
          <Box alignItems="flex-end" my="4" justifyContent="flex-end">
            <FlatList
              data={categories}
              renderItem={({ item, index }) => {
                return (
                  <Pressable
                    onPress={() => {
                      setUpdatedTask((prev) => {
                        return {
                          ...prev,
                          categoryId: item.id,
                        };
                      });
                      setIsSelectingCategory(false);
                    }}
                  >
                    <Box
                      bg="gray250"
                      p="2"
                      borderTopStartRadius={
                        index === 0 ? "rounded-3xl" : "none"
                      }
                      borderTopEndRadius={index === 0 ? "rounded-3xl" : "none"}
                      borderBottomStartRadius={
                        categories?.length - 1 === index
                          ? "rounded-2xl"
                          : "none"
                      }
                      borderBottomEndRadius={
                        categories?.length - 1 === index
                          ? "rounded-2xl"
                          : "none"
                      }
                    >
                      <Box flexDirection="row">
                        <Text>{item.icon.symbol}</Text>
                        <Text
                          ml="2"
                          fontWeight={
                            updatedTask.categoryId === item.id ? "700" : "400"
                          }
                        >
                          {item.name}
                        </Text>
                      </Box>
                    </Box>
                  </Pressable>
                );
              }}
            />
          </Box>
        )}
        {isSelectingDate && (
          <Box>
            <Calendar
              minDate={format(today, "Y-MM-dd")}
              onDayPress={(day) => {
                setIsSelectingDate(false);
                const selectedDate = new Date(day.dateString).toISOString();
                setUpdatedTask((prev) => {
                  return {
                    ...prev,
                    date: selectedDate,
                  };
                });
              }}
            />
          </Box>
        )}
      </Box>
    </SafeAreaWrapper>
  );
};

export default EditTaskScreen;

const styles = StyleSheet.create({});

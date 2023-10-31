import Loader from "@/components/shared/Loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { CategoriesStackParamList } from "@/navigation/types";
import { fetcher } from "@/services/config";
import { Box, Text } from "@/utils/theme";
import { RouteProp, useRoute } from "@react-navigation/native";
import React from "react";
import { StyleSheet, FlatList } from "react-native";
import useSWR from "swr";
import NavigationBack from "@/components/shared/NavigationBack";
import TaskActions from "@/components/tasks/task-actions";
import Task from "@/components/tasks/Task";

type CategoryScreenRouteProp = RouteProp<CategoriesStackParamList, "Category">;

//
const CategoryScreen = () => {
  const route = useRoute<CategoryScreenRouteProp>();

  const { id } = route.params;

  const { data: category, isLoading: isLoadingCategory } = useSWR<ICategory>(
    `categories/${id}`,
    fetcher
  );

  const {
    data: tasks,
    isLoading: isLoadingTasks,
    mutate: mutateTasks,
  } = useSWR<ITask[]>(`tasks/tasks-by-categories/${id}`, fetcher, {
    refreshInterval: 1000,
  });
  console.log(tasks);
  if (isLoadingTasks || isLoadingCategory || !category || !tasks) {
    return <Loader />;
  }
  console.log("tasks", tasks);
  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box width={40}>
          <NavigationBack />
        </Box>
        <Box height={16} />
        <Box flexDirection="row">
          <Text variant="textXl" fontWeight="700" ml="3">
            {category.icon.symbol}
          </Text>
          <Text
            variant="textXl"
            fontWeight="700"
            style={{
              color: category.color.code,
            }}
            ml="3"
          >
            {category.name}
          </Text>
        </Box>
        <Box height={16} />
        <TaskActions categoryId={id} />
        <Box height={16} />
        <FlatList
          data={tasks}
          renderItem={({ item, index }) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default CategoryScreen;

const styles = StyleSheet.create({});

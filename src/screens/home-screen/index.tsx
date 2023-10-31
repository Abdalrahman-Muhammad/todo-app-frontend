import Loader from "@/components/shared/Loader";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Task from "@/components/tasks/Task";
import { fetcher } from "@/services/config";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { FlatList } from "react-native";
import { RootState } from "@/store/store";
import { useSelector } from "react-redux";
import useSWR from "swr";

const HomeScreen = () => {
  const user = useSelector((state: RootState) => state.user.user);
  const {
    data: tasks,
    mutate: mutateTasks,
    isLoading,
  } = useSWR<ITask[]>("tasks/", fetcher);

  if (isLoading || !tasks) {
    return <Loader />;
  }

  return (
    <SafeAreaWrapper>
      <Box flex={1} mx="4">
        <Box height={26} />
        <Text variant="text3Xl">Hello, {user?.name}</Text>
        <Box height={26} />
        <FlatList
          data={tasks}
          renderItem={({ item }) => (
            <Task task={item} mutateTasks={mutateTasks} />
          )}
          ItemSeparatorComponent={() => <Box height={14} />}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
        />
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

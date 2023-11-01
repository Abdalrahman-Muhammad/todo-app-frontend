import { StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";
import { Box, Text } from "@/utils/theme";
import { Ionicons } from "@expo/vector-icons";
import useSWRMutation from "swr/mutation";
import axiosInstance from "@/services/config";
import { useNavigation } from "@react-navigation/native";
import { HomeScreenNavigationType } from "@/navigation/types";

type TaskProps = {
  task: ITask;
  mutateTasks: () => Promise<ITask[] | undefined>;
};

interface ITaskStatusRequest {
  id: string;
  isCompleted: boolean;
}

const toggleTaskStatusRequest = async (
  url: string,
  { arg }: { arg: ITaskStatusRequest }
) => {
  try {
    await axiosInstance.put(`${url}/${arg.id}`, { ...arg });
  } catch (error) {
    console.log("error in toggleTaskStatusRequest:", error);
  }
};

const Task = ({ task, mutateTasks }: TaskProps) => {
  const { trigger } = useSWRMutation("tasks/update", toggleTaskStatusRequest);

  const navigation = useNavigation<HomeScreenNavigationType>();

  const toggleTaskStatus = async () => {
    try {
      const updatedTask = {
        id: task.id,
        isCompleted: !task.isCompleted,
      };
      await trigger(updatedTask);
      await mutateTasks();
    } catch (error) {
      console.log("error in toggleTaskStatus:", error);
    }
  };

  const navigateToEditTask = () => {
    navigation.navigate("EditTask", {
      task,
    });
  };

  return (
    <Pressable onPress={toggleTaskStatus} onLongPress={navigateToEditTask}>
      <Box p="4" bg="lightGray" borderRadius="rounded-5xl" flexDirection="row">
        <Box flexDirection="row" alignItems="center">
          <Box
            height={26}
            width={26}
            bg={task.isCompleted ? "green500" : "red500"}
            borderRadius="rounded-4xl"
            alignItems="center"
            justifyContent="center"
          >
            {task.isCompleted && (
              <Ionicons name="ios-checkmark" size={20} color="white" />
            )}
          </Box>

          <Text ml="3" variant="textXs">
            {task.name}
          </Text>
        </Box>
      </Box>
    </Pressable>
  );
};

export default Task;

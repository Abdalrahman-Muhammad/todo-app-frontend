import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { fetcher } from "@/services/config";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { StyleSheet } from "react-native";
import useSWR from "swr";
const HomeScreen = () => {
  const { data, isLoading } = useSWR("categories", fetcher);
  console.log("data", JSON.stringify(data, null, 2));
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>HomeScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});

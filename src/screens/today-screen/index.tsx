import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { StyleSheet } from "react-native";

const TodayScreen = () => {
  return (
    <SafeAreaWrapper>
      <Box>
        <Text>TodayScreen</Text>
      </Box>
    </SafeAreaWrapper>
  );
};

export default TodayScreen;

const styles = StyleSheet.create({});

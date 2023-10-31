import { StyleSheet, ActivityIndicator } from "react-native";
import React from "react";
import SafeAreaWrapper from "./safe-area-wrapper";
import { Box } from "@/utils/theme";

const Loader = () => {
  return (
    <SafeAreaWrapper>
      <Box flex={1} justifyContent="center" alignItems="center">
        <ActivityIndicator />
      </Box>
    </SafeAreaWrapper>
  );
};

export default Loader;

const styles = StyleSheet.create({});

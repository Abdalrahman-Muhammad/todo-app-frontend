import { Image, StyleSheet } from "react-native";
import React from "react";
import { Box, Text } from "@/utils/theme";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "@/navigation/types";
import Button from "@/components/shared/Button";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import { LinearGradient } from "expo-linear-gradient";

const WelcomeScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"Welcome">>();

  const navigateTosignUpScreen = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaWrapper>
      <LinearGradient
        style={{ flex: 1 }}
        colors={[
          "#ffffff",
          "#fef8ff",
          "#fcecff",
          "#f8daff",
          "#fae2ff",
          "#fef9ff",
          "#ffffff",
        ]}
      >
        <Box flex={1} justifyContent="center">
          <Text textAlign="center" variant="textXl" fontWeight="700">
            Do you want to be more productive?!
          </Text>
          <Box mt="3.5" mx="10">
            <Button
              label="Start your journey!"
              onPress={navigateTosignUpScreen}
            />
          </Box>
        </Box>
      </LinearGradient>
    </SafeAreaWrapper>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({});

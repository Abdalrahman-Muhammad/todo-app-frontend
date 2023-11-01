import Button from "@/components/shared/Button";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { Pressable, StyleSheet, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "@/navigation/types";
import { useState } from "react";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Input from "@/components/shared/Input";
import { Controller, useForm } from "react-hook-form";
import { registerUser } from "@/services/api";

export const validateEmail = function (email: string): boolean {
  // Regular expression for email validation
  const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  return emailRegex.test(email);
};

const SignUpScreen = () => {
  const [isLoading, setIsLoading] = useState(false);

  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
  const navigateTosignInScreen = () => {
    navigation.navigate("SignIn");
  };
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      setIsLoading(true);
      const { email, name, password } = data;
      if (!validateEmail(email)) {
        console.log("Invalid email format");
        setError("email", {
          type: "manual",
          message: "Invalid email format",
        });
        setIsLoading(false);
        return;
      }
      // register user
      await registerUser({ email, password, name });
      setIsLoading(false);

      //navigate to login page
      navigateTosignInScreen();
    } catch (error) {
      setIsLoading(false);

      console.log("🚀 ~ file: index.tsx:42 ~ onSubmit ~ error:", error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="6" mt="13">
        <Text variant="textXl" fontWeight="700">
          Welcome,
        </Text>
        <Text variant="textXl" fontWeight="700" mb="6">
          Your journey starts here
        </Text>

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Name"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Name"
              error={errors.name}
            />
          )}
          name="name"
        />
        <Controller
          control={control}
          rules={{ required: true }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="E-mail"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Email"
              error={errors.email}
            />
          )}
          name="email"
        />

        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Password"
              onBlur={onBlur}
              onChangeText={onChange}
              value={value}
              placeholder="Password"
              error={errors.password}
              secureTextEntry
            />
          )}
          name="password"
        />

        <Box mt="6" />
        <Pressable onPress={navigateTosignInScreen}>
          <Text color="primary" textAlign="right">
            Already have an account, Log in?
          </Text>
        </Pressable>
        <Box mb="6" />

        <Button label="Register" onPress={handleSubmit(onSubmit)} upperCase />
        {isLoading ? (
          <Box style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text>Loading...</Text>
          </Box>
        ) : null}
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});

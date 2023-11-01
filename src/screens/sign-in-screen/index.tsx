import Button from "@/components/shared/Button";
import { Box, Text } from "@/utils/theme";
import React, { useState } from "react";
import { ActivityIndicator, Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Controller, useForm } from "react-hook-form";
import { AuthScreenNavigationType } from "@/navigation/types";
import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Input from "@/components/shared/Input";
import { LoginUser } from "@/services/api";
import { useDispatch, useSelector } from "react-redux";
import { updateUser } from "@/store/userActions";
import { AppDispatch, RootState } from "@/store/store";
import Loader from "@/components/shared/Loader";
import { validateEmail } from "../sign-up-screen";

const SignInScreen = () => {
  const [isLoading, setIsLoading] = useState(false);
  const user = useSelector((state: RootState) => state.user.user);
  const dispatch = useDispatch<AppDispatch>();
  const navigation = useNavigation<AuthScreenNavigationType<"SignIn">>();
  const navigateTosignUpScreen = () => {
    navigation.navigate("SignUp");
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm<Omit<IUser, "name">>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: Omit<IUser, "name">) => {
    try {
      setIsLoading(true);
      const { email, password } = data;

      if (!validateEmail(email)) {
        console.log("Invalid email format");
        setError("email", {
          type: "manual",
          message: "Invalid email format",
        });
        setIsLoading(false);
        return;
      }

      const _user = await LoginUser({ email, password });
      dispatch(
        updateUser({
          email: _user.email,
          name: _user.name,
        })
      );
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log("error in login submit", error);
    }
  };

  return (
    <SafeAreaWrapper>
      <Box flex={1} px="6" justifyContent="center">
        <Text variant="textXl" fontWeight="700">
          Welcome Back
        </Text>
        <Box mb="6" />
        <Controller
          control={control}
          rules={{
            required: true,
          }}
          render={({ field: { onChange, onBlur, value } }) => (
            <Input
              label="Email"
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
        <Pressable onPress={navigateTosignUpScreen}>
          <Text color="primary" textAlign="right">
            Register?
          </Text>
        </Pressable>
        <Box mb="6" />

        <Button label="Login" onPress={handleSubmit(onSubmit)} upperCase />

        {isLoading ? (
          <Box style={{ marginTop: 20 }}>
            <ActivityIndicator size="large" color="#007AFF" />
            <Text>Signing in...</Text>
          </Box>
        ) : null}
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({});

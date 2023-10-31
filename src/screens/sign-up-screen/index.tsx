import Button from "@/components/shared/Button";
import { Box, Text } from "@/utils/theme";
import React from "react";
import { Pressable, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { AuthScreenNavigationType } from "@/navigation/types";

import SafeAreaWrapper from "@/components/shared/safe-area-wrapper";
import Input from "@/components/shared/Input";
import { Controller, useForm } from "react-hook-form";
import { registerUser } from "@/services/api";

const SignUpScreen = () => {
  const navigation = useNavigation<AuthScreenNavigationType<"SignUp">>();
  const navigateTosignInScreen = () => {
    navigation.navigate("SignIn");
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<IUser>({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (data: IUser) => {
    try {
      const { email, name, password } = data;
      // register user
      await registerUser({ email, password, name });
      //navigate to login page
      navigateTosignInScreen();
    } catch (error) {}
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
      </Box>
    </SafeAreaWrapper>
  );
};

export default SignUpScreen;

const styles = StyleSheet.create({});

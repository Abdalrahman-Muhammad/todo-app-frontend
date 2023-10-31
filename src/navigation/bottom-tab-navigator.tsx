import CompletedScreen from "@/screens/completed-screen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { StyleSheet } from "react-native";
import HomeStackNavigator from "./home-stack-navigator";
import { RootBottomTabParamList } from "./types";

import CategoriesStackNavigator from "./categories-stack-navigator";
import Icons from "@/components/shared/icons";
import { useTheme } from "@shopify/restyle";

const Tab = createBottomTabNavigator<RootBottomTabParamList>();

const BottomTabNavigator = () => {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarActiveTintColor: "black",
        tabBarInactiveTintColor: theme.colors.gray550,
        tabBarHideOnKeyboard: true,
      }}
    >
      <Tab.Screen
        name="HomeStack"
        component={HomeStackNavigator}
        options={() => ({
          title: "Home",
          tabBarIcon: ({ color }) => <Icons name="home" color={color} />,
          headerShown: false,
        })}
      />
      <Tab.Screen
        name="Completed"
        component={CompletedScreen}
        options={() => ({
          title: "Completed",
          tabBarIcon: ({ color }) => <Icons name="completed" color={color} />,
          headerShown: false,
        })}
      />

      <Tab.Screen
        name="CategoriesStack"
        component={CategoriesStackNavigator}
        options={() => ({
          title: "Categories",
          tabBarIcon: ({ color }) => <Icons name="categories" color={color} />,
          headerShown: false,
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;

const styles = StyleSheet.create({});

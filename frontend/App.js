import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";
import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import QuizScreen from "./screens/QuizScreen";
import ProfileStack from "./navigation/ProfileStack";

const Tab = createMaterialBottomTabNavigator();

const App = () => {
  return (
    <SafeAreaProvider>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Tab.Navigator
          initialRouteName="Home"
          labeled={false}
          barStyle={{ height: "10%" }}
        >
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="home" size={24} color="black" />
                ) : (
                  <Ionicons name="home-outline" size={24} color="black" />
                ),
            }}
          />
          <Tab.Screen
            name="Quiz"
            component={QuizScreen}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="bulb" size={24} color="black" />
                ) : (
                  <Ionicons name="bulb-outline" size={24} color="black" />
                ),
            }}
          />
          <Tab.Screen
            name="Profile"
            component={ProfileStack}
            options={{
              tabBarIcon: ({ focused }) =>
                focused ? (
                  <Ionicons name="person" size={24} color="black" />
                ) : (
                  <Ionicons name="md-person-outline" size={24} color="black" />
                ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default App;

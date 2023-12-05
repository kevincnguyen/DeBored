import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SettingsButton from "../components/Settings/SettingsButton";
import LogoutButton from "../components/Settings/LogoutButton";
import { ImageProvider } from "../contexts/ImageContext";

const Stack = createStackNavigator();

/*
 * The navigation between the profile and profile settings
 */
const ProfileStack = () => {
  return (
    <ImageProvider>
      <Stack.Navigator initialRouteName="Main">
        <Stack.Screen
          name="Main"
          options={{
            headerTitle: "",
            headerRight: () => <SettingsButton />,
            headerShadowVisible: false,
            cardStyle: {
              backgroundColor: "#FFFFFF",
            },
          }}
          component={ProfileScreen}
        />
        <Stack.Screen
          name="Settings"
          options={{
            headerTitle: "Settings",
            headerRight: () => <LogoutButton />,
          }}
          component={SettingsScreen}
        />
      </Stack.Navigator>
    </ImageProvider>
  );
};

export default ProfileStack;

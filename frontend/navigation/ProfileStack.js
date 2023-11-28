import React, { useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SettingsButton from "../components/Settings/SettingsButton";
import LogoutButton from "../components/Settings/LogoutButton";

const Stack = createStackNavigator();

/*
 * The navigation between the profile and profile settings
 */
const ProfileStack = () => {
  // Used to force re-render of profile pictures
  const [imageKey, setImageKey] = useState(0);

  const handleImageRender = () => {
    // Update the key to force a re-render
    setImageKey((prevKey) => prevKey + 1);
  };

  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        options={{
          headerTitle: "",
          // TODO: Render settings button if logged in user is the same as profile
          headerRight: () => <SettingsButton />,
          headerShadowVisible: false,
          cardStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      >
        {(props) => <ProfileScreen {...props} imageKey={imageKey} />}
      </Stack.Screen>
      <Stack.Screen
        name="Settings"
        options={{
          headerTitle: "Settings",
          headerRight: () => <LogoutButton />,
        }}
      >
        {(props) => (
          <SettingsScreen {...props} handleImageRender={handleImageRender} />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
};

export default ProfileStack;

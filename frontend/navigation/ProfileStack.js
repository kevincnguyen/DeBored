import { createStackNavigator } from "@react-navigation/stack";

import ProfileScreen from "../screens/ProfileScreen";
import SettingsScreen from "../screens/SettingsScreen";
import SettingsButton from "../components/Settings/SettingsButton";

const Stack = createStackNavigator();

/*
 * The navigation between the profile and profile settings
 */
const ProfileStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={ProfileScreen}
        options={{
          headerTitle: "",
          headerRight: () => <SettingsButton />,
          headerShadowVisible: false,
          cardStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          headerTitle: "Settings",
        }}
      />
    </Stack.Navigator>
  );
};

export default ProfileStack;

import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

const Tab = createMaterialBottomTabNavigator();

import HomeScreen from "../screens/HomeScreen";
import QuizScreen from "../screens/QuizScreen";
import ProfileStack from "./ProfileStack";

/*
 * The bottom navigation bar to switch between home, quiz, and profile screens
 */
const MainNavigation = () => {
  return (
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
  );
};

export default MainNavigation;

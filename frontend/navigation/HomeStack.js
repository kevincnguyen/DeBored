import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import FriendsScreen from "../screens/FriendsScreen";
import FriendsButton from "../components/Friends/FriendsButton";

const Stack = createStackNavigator();

/*
 * The navigation between the home and friend requests 
 */
const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="Main">
      <Stack.Screen
        name="Main"
        component={HomeScreen}
        options={{
          headerTitle: "",
          headerRight: () => <FriendsButton />,
          headerShadowVisible: false,
          cardStyle: {
            backgroundColor: "#FFFFFF",
          },
        }}
      />
      <Stack.Screen
        name="Friends"
        component={FriendsScreen}
        options={{
          headerTitle: "Friends",
        }}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;

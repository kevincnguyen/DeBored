import { createStackNavigator } from "@react-navigation/stack";

import HomeScreen from "../screens/HomeScreen";
import FriendRequestsScreen from "../screens/FriendRequestsScreen";
import FriendsButton from "../components/Friends/FriendsButton";
import { FriendsProvider } from "../contexts/FriendsContext";

const Stack = createStackNavigator();

/*
 * The navigation between the home and friend requests
 */
const HomeStack = () => {
  return (
    <FriendsProvider>
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
          component={FriendRequestsScreen}
          options={{
            headerTitle: "Friend Requests",
            cardStyle: {
              backgroundColor: "#FFFFFF",
            },
          }}
        />
      </Stack.Navigator>
    </FriendsProvider>
  );
};

export default HomeStack;

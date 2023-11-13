import { createStackNavigator } from "@react-navigation/stack";

import AuthenticationScreen from "../screens/AuthenticationScreen";
import LoginScreen from "../screens/LoginScreen";
import SignUpScreen from "../screens/SignUpScreen";
import ForgotPassordScreen from "../screens/ForgotPasswordScreen";

const Stack = createStackNavigator();

/*
 * The navigation between various authentication screens (login, sign up, and forgot password)
 */
const LoginStack = () => {
  return (
    <Stack.Navigator initialRouteName="SignIn">
      <Stack.Screen
        name="Authentication"
        component={AuthenticationScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerTitle: "", headerBackTitle: "Back" }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={{ headerTitle: "", headerBackTitle: "Back" }}
      />
      <Stack.Screen name="ForgotPassord" component={ForgotPassordScreen} />
    </Stack.Navigator>
  );
};

export default LoginStack;

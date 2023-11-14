import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button } from "react-native-paper";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const AuthenticationScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const navigateToLogin = () => {
    navigation.navigate("Login");
  };

  const navigateToSignup = () => {
    navigation.navigate("SignUp");
  };

  return (
    <View
      style={[
        styles.container,
        { paddingTop: insets.top + 100, paddingBottom: insets.bottom + 100 },
      ]}
    >
      <View style={styles.hookContainer}>
        <View style={styles.headingContainer}>
          <Text style={styles.title}>Bored?</Text>
          <Text style={styles.slogan}>DeBored</Text>
        </View>
        <Text style={styles.text}>Fight boredom. Make friends.</Text>
      </View>
      <View>
        <Button
          mode="contained"
          onPress={navigateToLogin}
          contentStyle={styles.buttonContent}
          labelStyle={styles.text}
          style={styles.button}
        >
          Login
        </Button>
        <Button
          mode="contained-tonal"
          onPress={navigateToSignup}
          contentStyle={styles.buttonContent}
          labelStyle={styles.text}
          style={styles.button}
        >
          Sign up
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  hookContainer: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
  },
  headingContainer: {
    width: "80%",
  },
  title: {
    fontSize: 55,
    fontWeight: "bold",
  },
  slogan: {
    fontSize: 55,
    fontWeight: "bold",
    color: "#7845AC",
  },
  button: {
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 10,
    width: 350,
  },
  text: {
    fontSize: 18,
  },
});

export default AuthenticationScreen;

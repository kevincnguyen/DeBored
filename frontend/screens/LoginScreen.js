import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useUser } from "../contexts/UserContext";
import DismssKeyboard from "../components/Utils/DismissKeyboard";

const LoginScreen = () => {
  const { updateUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    console.log("Logging in");
    Keyboard.dismiss();
    // TODO: use log in route
    updateUser({}); // test user (for now)
  };

  return (
    <DismssKeyboard>
      <View style={styles.container}>
        <View style={styles.input}>
          <Text>Login</Text>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
          />
        </View>
        <Button mode="contained" onPress={handleSubmit}>
          Login
        </Button>
      </View>
    </DismssKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },
  input: {
    width: "80%",
  },
});

export default LoginScreen;

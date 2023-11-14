import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Button, TextInput } from "react-native-paper";

import { useUser } from "../contexts/UserContext";
import DismissKeyboard from "../components/Utils/DismissKeyboard";

const LoginScreen = () => {
  const navigation = useNavigation();
  const { updateUser } = useUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    console.log("Logging in");
    Keyboard.dismiss();
    // TODO: use log in route to validate user
    updateUser({}); // test user (for now)
  };

  const navigateToForgotPassword = () => {
    navigation.navigate("ForgotPassword");
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Login to DeBored</Text>
        <View style={styles.form}>
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
            style={styles.input}
          />
          <TouchableOpacity onPress={navigateToForgotPassword}>
            <Text style={styles.forgot}>Forgot password?</Text>
          </TouchableOpacity>
          <Button
            mode="contained"
            onPress={handleLogin}
            contentStyle={styles.buttonContent}
            labelStyle={styles.text}
            style={styles.button}
          >
            Login
          </Button>
        </View>
      </View>
    </DismissKeyboard>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    paddingBottom: 150,
  },
  title: {
    fontSize: 35,
    fontWeight: "bold",
    marginBottom: 30,
  },
  form: {
    width: "90%",
  },
  input: {
    marginTop: 10,
  },
  forgot: {
    color: "#FF6961",
    textAlign: "right",
    marginTop: 5,
    marginBottom: 25,
  },
  button: {
    borderRadius: 10,
  },
  buttonContent: {
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default LoginScreen;

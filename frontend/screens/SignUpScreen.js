import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Keyboard,
} from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useUser } from "../contexts/UserContext";
import DismissKeyboard from "../components/Utils/DismissKeyboard";

const SignUpScreen = () => {
  const { updateUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    console.log("Creating account");
    Keyboard.dismiss();
    // TODO: use create use route to add to database
    updateUser({}); // test user (for now)
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Create an account</Text>
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Password"
            value={password}
            onChangeText={(password) => setPassword(password)}
            style={styles.input}
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            style={styles.input}
          />
          <Button
            mode="contained"
            onPress={handleSignUp}
            contentStyle={styles.buttonContent}
            labelStyle={styles.text}
            style={styles.button}
          >
            Create account
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
  button: {
    borderRadius: 10,
    marginTop: 50,
  },
  buttonContent: {
    paddingVertical: 5,
  },
  text: {
    fontSize: 16,
  },
});

export default SignUpScreen;

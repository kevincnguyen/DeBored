import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard, Alert } from "react-native";
import { Button, TextInput } from "react-native-paper";

import { useUser } from "../contexts/UserContext";
import DismissKeyboard from "../components/Utils/DismissKeyboard";

const SignUpScreen = () => {
  const { updateUser } = useUser();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);

  const handleSignUp = () => {
    console.log("Creating account");
    Keyboard.dismiss();
    // check if passwords match
    if (password !== confirmPassword) {
      Alert.alert(
        "Error",
        "Passwords do not match",
        [
          {
            text: "OK",
            onPress: () => console.log("OK pressed"),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    // check if all fields are filled
    if (name === "" || email === "" || password === "") {
      Alert.alert(
        "Error",
        "Please fill out all fields",
        [
          {
            text: "OK",
            onPress: () => console.log("OK pressed"),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    // check if email is valid regex
    if (!email.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g)) {
      Alert.alert(
        "Error",
        "Please enter a valid email",
        [
          {
            text: "OK",
            onPress: () => console.log("OK pressed"),
          },
        ],
        { cancelable: false }
      );
      return;
    }
    fetch(
      "https://2zwdgalwbk.execute-api.us-west-2.amazonaws.com/default/CreateUser",
      {
        method: "POST",
        body: JSON.stringify({ name: name, email: email, password: password }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          updateUser({ name: name, email: email, password: password });
        } else {
          throw new Error("Invalid login");
        }
      })
      .catch((err) => {
        console.log(err);
        Alert.alert(
          "Error",
          "Invalid login, please try again.",
          [
            {
              text: "OK",
              onPress: () => console.log("OK pressed"),
            },
          ],
          { cancelable: false }
        );
      });
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
            secureTextEntry={hidePassword}
            right={
              <TextInput.Icon
                icon={hidePassword ? "eye-off" : "eye"}
                onPress={() => setHidePassword(!hidePassword)}
                color="black"
              />
            }
          />
          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
            style={styles.input}
            secureTextEntry={hideConfirmPassword}
            right={
              <TextInput.Icon
                icon={hideConfirmPassword ? "eye-off" : "eye"}
                onPress={() => setHideConfirmPassword(!hideConfirmPassword)}
                color="black"
              />
            }
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

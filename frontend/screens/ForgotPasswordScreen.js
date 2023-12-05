import React, { useState } from "react";
import { View, Text, StyleSheet, Keyboard } from "react-native";
import { Button, TextInput } from "react-native-paper";

import DismissKeyboard from "../components/Utils/DismissKeyboard";

const ForgotPassordScreen = () => {
  const [email, setEmail] = useState("");

  const handleSendEmail = () => {
    console.log("Sending password reset email");
    Keyboard.dismiss();
    // TODO: Create reset password route
  };

  return (
    <DismissKeyboard>
      <View style={styles.container}>
        <Text style={styles.title}>Forgot password?</Text>
        <View style={styles.form}>
          <TextInput
            mode="outlined"
            label="Email"
            value={email}
            onChangeText={(email) => setEmail(email)}
          />
          <Button
            mode="contained"
            onPress={handleSendEmail}
            contentStyle={styles.buttonContent}
            labelStyle={styles.text}
            style={styles.button}
          >
            Send email
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
    marginBottom: 35,
  },
  form: {
    width: "90%",
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

export default ForgotPassordScreen;

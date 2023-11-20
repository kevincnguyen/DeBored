import React, { useState } from "react";
import { View, ScrollView, Image, StyleSheet } from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useUser } from "../contexts/UserContext";

import DefaultImage from "../assets/images/default.png";

/*
 * The profile settings screen that allows users to update information.
 */
const SettingsScreen = () => {
  const { user } = useUser();
  console.log("user",JSON.stringify(user))
  const [name, setName] = useState();
  const [bio, setBio] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleChangePicture = () => {
    console.log("Changing profile picture");
    // TODO: need S3
  };

  const handleSubmit = () => {
    console.log("Saving changes");
    // TODO: need update profile backend route
  };

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scroll}>
        <Image source={DefaultImage} style={styles.picture} />
        <Button
          mode="contained-tonal"
          title="Submit"
          onPress={handleChangePicture}
        >
          Edit picture
        </Button>
        <View style={styles.inputs}>
          <TextInput
            mode="outlined"
            label="Name"
            value={name}
            onChangeText={(name) => setName(name)}
          />
          <TextInput
            mode="outlined"
            label="Bio"
            multiline={true}
            numberOfLines={4}
            value={bio}
            onChangeText={(bio) => setBio(bio)}
          />
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
          <TextInput
            mode="outlined"
            label="Confirm Password"
            value={confirmPassword}
            onChangeText={(confirmPassword) =>
              setConfirmPassword(confirmPassword)
            }
          />
          <Button mode="contained" title="Submit" onPress={handleSubmit}>
            Save Changes
          </Button>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
  },
  inputs: {
    width: "100%",
    flexDirection: "column",
    gap: 10,
    marginVertical: 20,
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
  },
});

export default SettingsScreen;

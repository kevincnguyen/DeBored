import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Keyboard,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import { useUser } from "../contexts/UserContext";

import DefaultImage from "../assets/images/default.png";
import DismissKeyboard from "../components/Utils/DismissKeyboard";

/*
 * The profile settings screen that allows users to update information.
 */
const SettingsScreen = () => {
  const { user } = useUser();
  const [name, setName] = useState(user.name);
  const [bio, setBio] = useState(user.bio);
  const [email, setEmail] = useState(user.email);
  const [password, setPassword] = useState(user.password);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [hidePassword, setHidePassword] = useState(true);
  const [hideConfirmPassword, setHideConfirmPassword] = useState(true);
  const [phone, setPhone] = useState(user.phone);
  const [instagram, setInstagram] = useState(user.instagram);
  const [twitter, setTwitter] = useState(user.twitter);
  const [facebook, setFacebook] = useState(user.facebook);

  const handleChangePicture = () => {
    console.log("Changing profile picture");
    // TODO: need S3
  };

  const handleSubmit = () => {
    console.log("Saving changes");
    // TODO: need update profile backend route
  };

  return (
    <KeyboardAvoidingView
      style={styles.keyboardAvoid}
      behavior="padding"
      enabled
      keyboardVerticalOffset={100}
    >
      <DismissKeyboard>
        <View style={styles.container}>
          <ScrollView
            contentContainerStyle={styles.scroll}
            showsVerticalScrollIndicator={false}
          >
            <Image source={DefaultImage} style={styles.picture} />
            <Button
              mode="contained-tonal"
              title="Submit"
              onPress={handleChangePicture}
            >
              Edit picture
            </Button>
            <View style={styles.inputs}>
              <Text style={styles.header}>Profile</Text>
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
                disabled={true}
              />
              <TextInput
                mode="outlined"
                label="Password"
                value={password}
                onChangeText={(password) => setPassword(password)}
                secureTextEntry={hidePassword}
                right={
                  <TextInput.Icon
                    icon={hidePassword ? "eye-off" : "eye"}
                    onPress={() => {
                      Keyboard.dismiss();
                      setHidePassword(!hidePassword);
                    }}
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
                secureTextEntry={hideConfirmPassword}
                right={
                  <TextInput.Icon
                    icon={hideConfirmPassword ? "eye-off" : "eye"}
                    onPress={() => {
                      Keyboard.dismiss();
                      setHideConfirmPassword(!hideConfirmPassword);
                    }}
                    color="black"
                  />
                }
              />
            </View>
            <View style={styles.inputs}>
              <Text style={styles.header}>Contact Information</Text>
              <TextInput
                mode="outlined"
                label="Phone Number"
                value={phone}
                onChangeText={(phone) => setPhone(phone)}
              />
              <TextInput
                mode="outlined"
                label="Instagram @"
                value={instagram}
                onChangeText={(instagram) => setInstagram(instagram)}
              />
              <TextInput
                mode="outlined"
                label="Twitter @"
                value={twitter}
                onChangeText={(twitter) => setTwitter(twitter)}
              />
              <TextInput
                mode="outlined"
                label="Facebook Link"
                value={facebook}
                onChangeText={(facebook) => setFacebook(facebook)}
              />
              <Button
                mode="contained"
                title="Submit"
                onPress={handleSubmit}
                style={styles.button}
              >
                Save Changes
              </Button>
            </View>
          </ScrollView>
        </View>
      </DismissKeyboard>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  keyboardAvoid: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: 10,
    backgroundColor: "#FFFFFF",
  },
  scroll: {
    flexGrow: 1,
    alignItems: "center",
  },
  inputs: {
    width: "95%",
    flexDirection: "column",
    gap: 10,
    marginBottom: 30,
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60,
    marginBottom: 10,
    marginTop: 20,
  },
  header: {
    fontWeight: "bold",
    marginLeft: 3,
    marginTop: 15,
    color: "#7845AC",
  },
  button: {
    marginTop: 15,
  },
});

export default SettingsScreen;

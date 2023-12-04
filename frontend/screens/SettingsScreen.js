import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  Image,
  StyleSheet,
  Keyboard,
  Alert,
  ActivityIndicator,
  KeyboardAvoidingView,
} from "react-native";
import { Button, TextInput } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import * as FileSystem from "expo-file-system";

import { useUser } from "../contexts/UserContext";
import { useImage } from "../contexts/ImageContext";
import DismissKeyboard from "../components/Utils/DismissKeyboard";

/*
 * The profile settings screen that allows users to update information.
 */
const SettingsScreen = ({ handleImageRender }) => {
  const { user, updateUser } = useUser();
  const { updateImageKey } = useImage();
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState(null);
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

  const handleChangePicture = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.7,
      height: 800,
      width: 800,
    });
    if (!result.canceled) {
      setImage(result.assets[0].uri);
    } else {
      setImage(null);
    }
  };

  const handleSubmit = async () => {
    Keyboard.dismiss();
    // check if all required fields are filled
    if (name === "" || password === "") {
      Alert.alert(
        "Error",
        "Please fill out the name and/or password fields",
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
    // check if passwords match
    if (confirmPassword !== "" && password !== confirmPassword) {
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
    // Convert to Base64 if defined
    let imageBase64;
    if (image) {
      imageBase64 = await FileSystem.readAsStringAsync(image, {
        encoding: "base64",
      });
    }

    // Update S3 and MongoDB
    setLoading(true);
    fetch(
      "https://5cfqsu7tzg.execute-api.us-west-2.amazonaws.com/default/EditInfo",
      {
        method: "POST",
        body: JSON.stringify({
          id: user._id,
          name: name,
          bio: bio,
          password: password,
          image: imageBase64,
          instagram: instagram,
          twitter: twitter,
          facebook: facebook,
          phone: phone,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          console.log(user);
          throw new Error("Invalid profile update");
        }
      })
      .then((response) => {
        console.log(`response: ${JSON.stringify(response)}`);
        updateUser({
          ...user,
          name: name,
          bio: bio,
          password: password,
          instagram: instagram,
          twitter: twitter,
          facebook: facebook,
          phone: phone,
        });
        updateImageKey();
        setImage(null);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
        Alert.alert(
          "Error",
          "Invalid profile update, please try again.",
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
            <Image
              source={{ uri: image || user.profilePicURL }}
              style={styles.picture}
            />
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
                label="Instagram Username"
                value={instagram}
                onChangeText={(instagram) => setInstagram(instagram)}
              />
              <TextInput
                mode="outlined"
                label="Twitter Username"
                value={twitter}
                onChangeText={(twitter) => setTwitter(twitter)}
              />
              <TextInput
                mode="outlined"
                label="Facebook Link"
                value={facebook}
                onChangeText={(facebook) => setFacebook(facebook)}
              />
              {loading ? (
                <ActivityIndicator size="large" />
              ) : (
                <Button
                  mode="contained"
                  title="Submit"
                  onPress={handleSubmit}
                  style={styles.button}
                >
                  Save Changes
                </Button>
              )}
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

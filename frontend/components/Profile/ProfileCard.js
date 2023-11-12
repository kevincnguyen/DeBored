import { View, Text, Image, StyleSheet } from "react-native";

import ContactInfo from "./ContactInfo";
import DefaultImage from "../../assets/images/default.png";

/*
 * A card displaying the profile picture, name, bio, and contact 
 */
const ProfileCard = () => {
  // TODO: use fetched user data
  return (
    <View style={styles.container}>
      <Image source={DefaultImage} style={styles.picture} />
      <Text style={styles.name}>Name</Text>
      <Text style={styles.bio}>Bio</Text>
      <ContactInfo />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 15,
    borderColor: "#DCD6D0",
    borderBottomWidth: 1,
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
});

export default ProfileCard;

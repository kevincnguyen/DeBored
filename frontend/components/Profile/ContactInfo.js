import {
  View,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useUser } from "../../contexts/UserContext";

/**
 * The name of all icons in Ionicons
 */
const icons = [
  "call",
  "logo-instagram",
  "logo-twitter",
  "logo-facebook",
  "mail",
];

const iconMappings = {
  call: "phone",
  "logo-instagram": "instagram",
  "logo-twitter": "twitter",
  "logo-facebook": "facebook",
  mail: "email",
};

/**
 * A row of contact icons
 */
const ContactInfo = () => {
  const { user } = useUser();

  const handlePress = (icon) => {
    if (icon === "call") {
      Alert.alert("Contact Options", "How would you like to contact Name?", [
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:${user.phone}`),
        },
        {
          text: "Text",
          onPress: () => Linking.openURL(`sms:${user.phone}`),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else if (icon === "logo-instagram") {
      Linking.openURL(`https://www.instagram.com/${user.instagram}/`);
    } else if (icon === "logo-twitter") {
      Linking.openURL(`https://www.twitter.com/${user.twitter}/`);
    } else if (icon === "logo-facebook") {
      Linking.openURL(`${user.facebook}/`);
    } else if (icon === "mail") {
      Linking.openURL(`mailto: ${user.email}`);
    }
  };

  const displayIcons = icons
    .filter((icon) => user[iconMappings[icon]] !== "")
    .map((icon) => (
      <TouchableOpacity key={icon} onPress={() => handlePress(icon)}>
        <Ionicons style={styles.icon} name={icon} size={23} color="black" />
      </TouchableOpacity>
    ));

  return <View style={styles.container}>{displayIcons}</View>;
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    paddingTop: 5,
  },
  icon: {
    paddingRight: 8,
  },
});

export default ContactInfo;

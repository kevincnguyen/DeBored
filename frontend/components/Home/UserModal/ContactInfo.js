import {
  View,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

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
const ContactInfo = ({ otherUser }) => {
  const handlePress = (icon) => {
    if (icon === "call") {
      Alert.alert(
        "Contact Options",
        `How would you like to contact ${otherUser.name}?`,
        [
          {
            text: "Call",
            onPress: () => Linking.openURL(`tel:${otherUser.phone}`),
          },
          {
            text: "Text",
            onPress: () => Linking.openURL(`sms:${otherUser.phone}`),
          },
          {
            text: "Cancel",
            style: "cancel",
          },
        ]
      );
    } else if (icon === "logo-instagram") {
      Linking.openURL(`https://www.instagram.com/${otherUser.instagram}/`);
    } else if (icon === "logo-twitter") {
      Linking.openURL(`https://www.twitter.com/${otherUser.twitter}/`);
    } else if (icon === "logo-facebook") {
      Linking.openURL(`${otherUser.facebook}/`);
    } else if (icon === "mail") {
      Linking.openURL(`mailto: ${otherUser.email}`);
    }
  };

  const displayIcons = icons
    .filter((icon) => otherUser[iconMappings[icon]] !== "")
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

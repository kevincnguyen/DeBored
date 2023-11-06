import {
  View,
  TouchableOpacity,
  Linking,
  Alert,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const icons = ["call", "logo-instagram", "mail"];

const ContactInfo = () => {
  const handlePress = (icon) => {
    if (icon === "call") {
      Alert.alert("Contact Options", "How would you like to contact Name?", [
        {
          text: "Call",
          onPress: () => Linking.openURL(`tel:+12345654321`),
        },
        {
          text: "Text",
          onPress: () => Linking.openURL(`sms:+12345654321`),
        },
        {
          text: "Cancel",
          style: "cancel",
        },
      ]);
    } else if (icon === "logo-instagram") {
      Linking.openURL(`https://www.instagram.com/hasbulla.hushetskiy/`);
    } else if (icon === "mail") {
      Linking.openURL(`mailto:hasbulla@gmail.com`);
    }
  };

  const displayIcons = icons.map((icon) => {
    return (
      <TouchableOpacity key={icon} onPress={() => handlePress(icon)}>
        <Ionicons style={styles.icon} name={icon} size={23} color="black" />
      </TouchableOpacity>
    );
  });

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

import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";

import { useFriends } from "../../contexts/FriendsContext";

/*
 * The button used to navigate to the profile settings screen
 */
const FriendsButton = () => {
  const navigation = useNavigation();
  const { friends } = useFriends();

  const handleFriendsPress = () => {
    navigation.navigate("Friends");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFriendsPress}>
        {friends.filter((friend) => friend.status === "PENDING").length > 0 && (
          <View style={styles.active} />
        )}
        <FontAwesome5 name="user-friends" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 20,
    flexDirection: "column",
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  active: {
    backgroundColor: "#AFE1AF",
    height: 6,
    width: 6,
    borderRadius: 6,
  },
});

export default FriendsButton;

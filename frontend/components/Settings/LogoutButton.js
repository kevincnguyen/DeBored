import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

import { useUser } from "../../contexts/UserContext";

/*
 * The button used to logout
 */
const LogoutButton = () => {
  const { updateUser } = useUser();

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => updateUser()}>
        <Text style={styles.text}>Log out</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
  text: {
    color: "#FF6961",
    fontWeight: "bold",
    fontSize: 14,
  },
});

export default LogoutButton;

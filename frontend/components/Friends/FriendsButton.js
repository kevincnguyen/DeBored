import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from '@expo/vector-icons';

/*
 * The button used to navigate to the profile settings screen 
 */
const FriendsButton = () => {
  const navigation = useNavigation();

  const handleFriendsPress = () => {
    navigation.navigate("Friends");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleFriendsPress}>
        <FontAwesome5 name="user-friends" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
});

export default FriendsButton;

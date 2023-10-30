import { View, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

const SettingsButton = () => {
  const navigation = useNavigation();

  const handleSettingsPress = () => {
    navigation.navigate("Settings");
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleSettingsPress}>
        <Ionicons name="settings-outline" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingRight: 20,
  },
});

export default SettingsButton;

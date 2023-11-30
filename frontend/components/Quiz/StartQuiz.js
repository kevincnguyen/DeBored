import { View, Button, StyleSheet } from "react-native";

/**
 * The screen with the start quiz button
 */
const StartQuiz = ({ handleStartPress }) => {
  return (
    <View style={styles.circularButton}>
      <Button
        title="Take the Quiz!"
        onPress={handleStartPress}
        color="#FFFFFF"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circularButton: {
    width: 150, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    borderRadius: 75, // Half of the width/height to create a circle
    backgroundColor: "#7845AC",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartQuiz;

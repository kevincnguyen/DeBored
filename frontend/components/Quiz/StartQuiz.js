import { View, Button, StyleSheet } from "react-native";

const StartQuiz = ({ handleStartPress }) => {
  return (
    <View style={styles.circularButton}>
      <Button
        title="Take the Quiz!"
        onPress={handleStartPress}
        color="#0A0A09"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  circularButton: {
    width: 150, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    borderRadius: 75, // Half of the width/height to create a circle
    backgroundColor: "#f7f728",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default StartQuiz;

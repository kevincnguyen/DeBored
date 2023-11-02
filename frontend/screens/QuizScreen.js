import { View, Text, Button, StyleSheet } from "react-native";

const QuizScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>DeBored Yourself!</Text>
      </View>
      <View style={styles.startButtonContainer}>
        <Button title="Start" onPress={() => handleStartPress()} color="#0a0a09" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end", // Align the content to the bottom
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    flex: 1, // Take up one-third of the available space
    justifyContent: "center",
  },
  headerText: {
    fontSize: 24,
    color: "#ff1100",
    textAlign: "center", // Center the text horizontally
  },
  startButtonContainer: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: "#f7f728",
    alignItems: "center",
    justifyContent: "center",
  },
});

const handleStartPress = () => {
  // Handle the "Start" button press here
  // You can navigate to a new screen or perform any other action
};

export default QuizScreen;

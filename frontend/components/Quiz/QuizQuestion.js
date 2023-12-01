import { View, Text, Button, StyleSheet } from "react-native";

/*
 * Displays a quiz question and all of its possible answer options
 */
const QuizQuestion = ({ question, handleNextQuestion }) => {
  return (
    <View style={styles.questionView}>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.options.map((option, index) => (
        <View style={styles.buttonOutline} key={index}>
          <Button
            title={option}
            onPress={() => handleNextQuestion(option)}
            color="#ffffff"
          />
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionView: {
    minWidth: 100,
    display: "flex",
    alignItems: "stretch",
    textAlign: "center",
    borderColor: "#ffffff",
    borderWidth: 1,
    borderRadius: 10,
  },
  questionText: {
    fontSize: 18,
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonText: {
    color: "#ffffff",
  },
  buttonOutline: {
    borderColor: "#7845AC",
    backgroundColor: "#7845AC",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
});

export default QuizQuestion;

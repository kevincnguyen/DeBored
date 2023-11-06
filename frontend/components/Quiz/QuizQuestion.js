import { View, Text, Button, StyleSheet } from "react-native";

const QuizQuestion = ({ question, handleNextQuestion }) => {
  return (
    <View>
      <Text style={styles.questionText}>{question.question}</Text>
      {question.options.map((option, index) => (
        <Button
          key={index}
          title={option}
          onPress={() => handleNextQuestion(option)}
          color="#0a0a09"
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  questionText: {
    fontSize: 18,
    marginTop: 50,
    marginBottom: 20,
  },
  buttonText: {
    color: "#ecf011",
  },
});

export default QuizQuestion;

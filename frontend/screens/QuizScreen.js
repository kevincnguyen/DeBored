import React, { useState } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const quizQuestions = [
    {
      question: "Outdoor or Indoor?",
      options: ["Outdoor", "Indoor"],
    },
    {
      question: "Solo or Social?",
      options: ["Solo", "Social"],
    },
    {
      question: "Budget",
      options: ["$", "$$$"],
    },
  ];

  const handleStartPress = () => {
    setQuizStarted(true);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < quizQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle quiz completion, e.g., display results
    }
  };

  const renderQuizContent = () => {
    if (quizStarted) {
      if (currentQuestionIndex < quizQuestions.length) {
        return (
          <>
            <Text style={styles.questionText}>
              {quizQuestions[currentQuestionIndex].question}
            </Text>
            {quizQuestions[currentQuestionIndex].options.map((option, index) => (
              <Button
                key={index}
                title={option}
                onPress={() => handleNextQuestion()}
                color="#0a0a09"
              />
            ))}
          </>
        );
      } else {
        // Quiz completed, show results or a completion message
        return <Text>Quiz Completed</Text>;
      }
    } else {
      return (
        <View style={styles.circularButton}>
          <Button
            title="Take the Quiz!"
            onPress={() => handleStartPress()}
            color="#0a0a09"
        />
        </View>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.questionContainer}>{renderQuizContent()}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center the content both horizontally and vertically
    backgroundColor: "#FFFFFF",
  },
  questionContainer: {
    alignItems: "center",
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  circularButton: {
    width: 150, // Adjust the size as needed
    height: 150, // Adjust the size as needed
    borderRadius: 75, // Half of the width/height to create a circle
    backgroundColor: "#f7f728",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ecf011",
  },
});

export default QuizScreen;
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";

import StartQuiz from "../components/Quiz/StartQuiz";
import QuizQuestion from "../components/Quiz/QuizQuestion";
import QuizResults from "../components/Quiz/QuizResults";

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

const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);

  const handleStartPress = () => {
    setQuizStarted(true);
  };

  const handleResetPress = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setChosenAnswers([]);
  };

  const handleNextQuestion = (option) => {
    setChosenAnswers([...chosenAnswers, option]);
    if (currentQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const renderQuizContent = () => {
    if (!quizStarted) {
      return <StartQuiz handleStartPress={handleStartPress} />;
    }

    if (currentQuestionIndex < quizQuestions.length) {
      return (
        <QuizQuestion
          question={quizQuestions[currentQuestionIndex]}
          handleNextQuestion={handleNextQuestion}
        />
      );
    } else {
      return (
        <QuizResults
          chosenAnswers={chosenAnswers}
          handleResetPress={handleResetPress}
        />
      );
    }
  };

  return <View style={styles.container}>{renderQuizContent()}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center", // Center the content both horizontally and vertically
    backgroundColor: "#FFFFFF",
  },
});

export default QuizScreen;

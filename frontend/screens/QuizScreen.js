import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";

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

const locationEntry = [  {
  question: "Enter your location or enter N/A if you would like not to"
}]

/*
 * The DeBored quiz screen that helps users find new activities.
 */
const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [locationEntered, setLocationEntered] = useState(false)

  // Event handler for input change
  const handleLocationInputChange = (text) => {
    setLocationInput(text);
  };



  const handleStartPress = () => {
    setQuizStarted(true);
  };

  const processLocationInput = () => {
    setLocationEntered(true);
  };

  const handleResetPress = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setChosenAnswers([]);
    setLocationEntered(false)
    setLocationInput('');
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
    } else if (!locationEntered) { 
  
      // render screen to get the location
      return (
      <View>
            <Text>Enter your location or enter N/A if you would like not to:</Text>
            <TextInput
              style={styles.input}
              placeholder="location"
              value={locationInput}
              onChangeText={handleLocationInputChange}
            />
            <Button title="Submit" onPress={processLocationInput} />
          </View>
      );
    } else {
      return (
        <QuizResults
          chosenAnswers={chosenAnswers}
          locationInput = {locationInput}
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

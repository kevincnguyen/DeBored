import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";

import StartQuiz from "../components/Quiz/StartQuiz";
import QuizQuestion from "../components/Quiz/QuizQuestion";
import QuizResults from "../components/Quiz/QuizResults";

// List of quiz questions
const quizQuestions = [
  {
    question: "Outdoor or Indoor?",
    options: ["Outdoor", "Indoor", "No Preference"],
  },
  {
    question: "Solo or Social?",
    options: ["Solo", "Social", "No Preference"],
  },
  {
    question: "Budget",
    options: ["$", "$$$", "No Preference"],
  },
  {
    question: "Activity Level",
    options: ["Physically Active", "Relaxed", "No Preference"],
  },
  {
    question: "Time of Day",
    options: ["Morning", "Afternoon", "Nighttime", "No Preference"],
  },
  {
    question: "Technology?",
    options: ["No electronics", "Gadgets and Tech!", "No Preference"],
  },
  {
    question: "Food",
    options: ["No Food", "Foodie!", "No Preference"],
  },
  {
    question: "Adventurous?",
    options: ["Homebody", "I want to explore", "No Preference"],
  }
  
  
];

/*
 * The DeBored quiz screen that helps users find new activities.
 */
const QuizScreen = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [chosenAnswers, setChosenAnswers] = useState([]);
  const [locationInput, setLocationInput] = useState("N/A");
  const [locationEntered, setLocationEntered] = useState(false);

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

  // Reset all variables when the reset is pressed
  const handleResetPress = () => {
    setQuizStarted(false);
    setCurrentQuestionIndex(0);
    setChosenAnswers([]);
    setLocationEntered(false);
    setLocationInput("");
  };

  // Iterate through the questions if we have more of them
  const handleNextQuestion = (option) => {
    setChosenAnswers([...chosenAnswers, option]);
    if (currentQuestionIndex < quizQuestions.length) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const renderQuizContent = () => {
    // Start the quiz
    if (!quizStarted) {
      return <StartQuiz handleStartPress={handleStartPress} />;
    }

    if (currentQuestionIndex < quizQuestions.length) {
      // If we have more questions remaining, continue with the list of questions
      return (
        <QuizQuestion
          question={quizQuestions[currentQuestionIndex]}
          handleNextQuestion={handleNextQuestion}
        />
      );
    } else if (!locationEntered) {
      // render screen to get the location
      return (
        <View style={styles.locationView}>
          <Text style={styles.locationQuestion}>
            Enter your location for location based recommendations. Leave N/A otherwise:
          </Text>
          <TextInput
            style={styles.input}
            placeholder="location"
            value={locationInput}
            onChangeText={handleLocationInputChange}
          />
          <View style={styles.buttonOutline}>
            <Button
              title="Submit"
              onPress={processLocationInput}
              color="#ffffff"
            />
          </View>
        </View>
      );
    } else {
      // When all multiple choice questions and the location is entered, we store the returned values
      // Also account for a reset parameter if the user chooses to reset
      return (
        <QuizResults
          chosenAnswers={chosenAnswers}
          locationInput={locationInput}
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
  locationView: {
    width: 250,
  },
  locationQuestion: {
    fontSize: 18,
    marginTop: 50,
    marginBottom: 20,
    textAlign: "center",
  },
  buttonOutline: {
    borderColor: "#7845AC",
    backgroundColor: "#7845AC",
    borderWidth: 1,
    borderRadius: 10,
    padding: 5,
    margin: 5,
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    borderRadius: 10,
    padding: 10,
  },
});

export default QuizScreen;

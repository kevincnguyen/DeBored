import React, { useState } from "react";
import { View, StyleSheet, TextInput, Text, Button } from "react-native";
import { Provider } from "react-native-paper";
import DropDown from "react-native-paper-dropdown";

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
  },
];

// List of locations for dropdown
const cities = [
  {
    label: "N/A",
    value: "N/A",
  },
  {
    label: "Seattle, WA",
    value: "Seattle, WA",
  },
  {
    label: "Bellevue, WA",
    value: "Bellevue, WA",
  },
  {
    label: "Lynnwood, WA",
    value: "Lynnwood, WA",
  },
  {
    label: "Spokane, WA",
    value: "Spokane, WA",
  },
  {
    label: "New York City, NY",
    value: "New York City, NY",
  },
  {
    label: "Los Angeles, CA",
    value: "Los Angeles, CA",
  },
  {
    label: "Chicago, IL",
    value: "Chicago, IL",
  },
  {
    label: "Houston, TX",
    value: "Houston, TX",
  },
  {
    label: "Phoenix, AZ",
    value: "Phoenix, AZ",
  },
  {
    label: "Philadelphia, PA",
    value: "Philadelphia, PA",
  },
  {
    label: "San Antonio, TX",
    value: "San Antonio, TX",
  },
  {
    label: "San Diego, CA",
    value: "San Diego, CA",
  },
  {
    label: "Dallas, TX",
    value: "Dallas, TX",
  },
  {
    label: "San Jose, CA",
    value: "San Jose, CA",
  },
  {
    label: "Austin, TX",
    value: "Austin, TX",
  },
  {
    label: "Jacksonville, FL",
    value: "Jacksonville, FL",
  },
  {
    label: "San Francisco, CA",
    value: "San Francisco, CA",
  },
  {
    label: "Columbus, OH",
    value: "Columbus, OH",
  },
  {
    label: "Indianapolis, IN",
    value: "Indianapolis, IN",
  },
  {
    label: "Denver, CO",
    value: "Denver, CO",
  },
  {
    label: "Washington, D.C.",
    value: "Washington, D.C.",
  },
  {
    label: "Boston, MA",
    value: "Boston, MA",
  },
  {
    label: "Nashville, TN",
    value: "Nashville, TN",
  },
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
  const [showDropDown, setShowDropDown] = useState(false);

  // Event handler for input change
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
            Select a location for location based recommendations. Select N/A
            otherwise:
          </Text>
          <DropDown
            label={"Location"}
            mode={"outlined"}
            visible={showDropDown}
            showDropDown={() => setShowDropDown(true)}
            onDismiss={() => setShowDropDown(false)}
            value={locationInput}
            setValue={setLocationInput}
            list={cities}
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

  return (
    <Provider>
      <View style={styles.container}>{renderQuizContent()}</View>
    </Provider>
  );
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

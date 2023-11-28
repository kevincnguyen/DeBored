import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

/*
 * The screen that displays the DeBored quiz results
 */
const QuizResults = ({ chosenAnswers, locationInput, handleResetPress }) => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetch(
      "https://5ajg2vdq72.execute-api.us-west-2.amazonaws.com/default/GetActivities",
      {
        method: "POST",
        body: JSON.stringify({
          answers: [...chosenAnswers, locationInput || ""],
        }),
      }
    )
      .then((response) => response.json())
      .then((results) => {
        console.log(`recieved results: ${JSON.stringify(results)}`);
        if (results) {
          setActivities(results.activity);
        } else {
          setActivities(["No activities found"]);
        }
      })
      .catch((err) => {
        console.log(err);
        setActivities(["Encountered an error in fetching activities"]);
      });
  }, [chosenAnswers]);

  const handleRegenerate = () => {
    // find the next item in the activities array
    let next = currentIndex + 1;
    if (next >= activities.length) {
      next = 0;
    }
    setCurrentIndex(next);
  };

  return (
    <View>
      <Button title="Reset" onPress={handleResetPress} color="blue" />
      <View style={styles.container}>
        <Text style={styles.header}>Quiz Completed</Text>
        <Text>{activities[currentIndex]}</Text>
      </View>
      <Button title="Regenerate" onPress={handleRegenerate} color="red" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default QuizResults;

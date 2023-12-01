import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";

import { useUser } from "../../contexts/UserContext";

/*
 * The screen that displays the DeBored quiz results
 */
const QuizResults = ({ chosenAnswers, locationInput, handleResetPress }) => {
  const { user, updateUser } = useUser();
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showSpinner, setShowSpinner] = useState(true);

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
        console.log(`results.activity: ${JSON.stringify(results.activity[0])}`);
        console.log(`type of results.activity: ${typeof results.activity}`);
        if (results) {
          setActivities(results.activity);
          saveActivity(results.activity[0]);
        } else {
          setActivities(["No activities found"]);
        }
        setShowSpinner(false);
      })
      .catch((err) => {
        console.error("Error: ", err);
        setActivities(["Encountered an error in fetching activities"]);
        setShowSpinner(false);
      });

    if (locationInput !== "") {
      fetch(
        "https://5cfqsu7tzg.execute-api.us-west-2.amazonaws.com/default/EditInfo",
        {
          method: "POST",
          body: JSON.stringify({
            id: user._id,
            location: locationInput,
          }),
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            console.log(user);
            throw new Error("Invalid profile update");
          }
        })
        .then((response) => {
          console.log(`response: ${JSON.stringify(response)}`);
          updateUser({
            ...user,
            location: locationInput,
          });
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [chosenAnswers]);

  const handleRegenerate = () => {
    // Find the next item in the activities array
    let next = currentIndex + 1;
    if (next >= activities.length) {
      next = 0;
    }
    setCurrentIndex(next);
    saveActivity(activities[next]);
  };

  const saveActivity = (activity) => {
    const updatedUser = { ...user };
    updatedUser.recentActivities.push(activity);

    // Update MongoDB
    fetch(
      "https://96fv05cgth.execute-api.us-west-2.amazonaws.com/default/UpdateActivities",
      {
        method: "POST",
        body: JSON.stringify({
          id: user._id,
          activity: activity,
        }),
      }
    )
      .then((response) => response.json())
      .then((results) => {
        console.log(`Received results: ${JSON.stringify(results)}`);
        updateUser(updatedUser);
      })
      .catch((err) => {
        console.error("Error: ", err);
      });
  };

  return (
    <View>
      {showSpinner ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <>
          <View style={styles.container}>
            <Text style={styles.header}>Quiz Completed</Text>
            <Text style={styles.results}>{activities[currentIndex]}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <View style={styles.buttonOutline}>
              <Button title="Reset" onPress={handleResetPress} color="white" />
            </View>
            <View style={styles.buttonOutline}>
              <Button
                title="Regenerate"
                onPress={handleRegenerate}
                color="white"
              />
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 40,
    width: 250,
    textAlign: "justify",
    height: 100,
  },
  header: {
    fontSize: 25,
    fontWeight: "bold",
    marginBottom: 20,
  },
  results: {
    fontSize: 18,
  },
  buttonContainer: {
    margin: 20,
    flexDirection: "row",
    justifyContent: "space-between",
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

export default QuizResults;

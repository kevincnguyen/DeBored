import React, { useState, useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";

const quizResults = [
  {
    answers: ["Outdoor", "Solo", "$"],
    activities: [
      "Go for a solo hike in a nearby trail.",
      "Read a book in a quiet park.",
      "Have a picnic by the lake.",
    ],
  },
  {
    answers: ["Outdoor", "Solo", "$$$"],
    activities: [
      "Plan a solo camping trip to a national park.",
      "Explore a nearby city on a solo day trip.",
      "Go on a solo photography adventure in nature.",
    ],
  },
  {
    answers: ["Outdoor", "Social", "$"],
    activities: [
      "Organize a low-budget outdoor picnic with friends.",
      "Play frisbee or have a small sports day in the park.",
      "Join a local outdoor yoga or fitness class.",
    ],
  },
  {
    answers: ["Outdoor", "Social", "$$$"],
    activities: [
      "Arrange a barbecue party with friends in your backyard.",
      "Go on a group adventure tour with outdoor activities.",
      "Plan a day of water sports with friends at a nearby beach.",
    ],
  },
  {
    answers: ["Indoor", "Solo", "$"],
    activities: [
      "Try a new recipe and cook a homemade meal.",
      "Practice a musical instrument on your own.",
      "Have a solo movie night with your favorite films.",
    ],
  },
  {
    answers: ["Indoor", "Solo", "$$$"],
    activities: [
      "Book a spa day for self-pampering and relaxation.",
      "Join an online class to learn a new skill or hobby.",
      "Create your own art or craft project at home.",
    ],
  },
  {
    answers: ["Indoor", "Social", "$"],
    activities: [
      "Host a game night or board game session with friends.",
      "Invite friends for a cozy indoor potluck dinner.",
      "Participate in a community event or workshop.",
    ],
  },
  {
    answers: ["Indoor", "Social", "$$$"],
    activities: [
      "Organize a wine and cheese tasting evening with friends.",
      "Attend a live performance or theater show with a group.",
      "Book a group cooking class at a culinary school.",
    ],
  },
];

const QuizResults = ({ chosenAnswers, handleResetPress }) => {
  const [activities, setActivities] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    // find the matching quiz result
    const result = quizResults.find((result) =>
      result.answers.every((answer, index) => answer === chosenAnswers[index])
    );

    if (result) {
      setActivities(result.activities);
    } else {
      setActivities(["No activities found"]);
    }
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

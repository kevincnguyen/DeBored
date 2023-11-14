import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

/*
 * The home screen including recent popular activities,
 * recommended activities by friends, and friend suggestions.
 */
const HomeScreen = () => {
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.firstHeader}>Recent Popular Activities</Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </ScrollView>
      <Text style={styles.secondHeader}>Recommended by Friends</Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </ScrollView>
      <Text style={styles.thirdHeader}>Discover New People</Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </ScrollView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  firstHeader: {
    fontSize: 24,
    color: "#000000",
    textAlign: "center",
    marginTop: 130,
  },
  secondHeader: {
    fontSize: 24,
    color: "#000000",
    textAlign: "center",
    marginTop: 50,
  },
  thirdHeader: {
    fontSize: 24,
    color: "#000000",
    textAlign: "center",
    marginTop: 50,
  },
  circleContainer: {
    flexDirection: "row",
    marginTop: 30,
    paddingHorizontal: 10, // Adjust padding as needed
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "blue",
    marginLeft: 10, // Adjust margin as needed
  },
});

export default HomeScreen;

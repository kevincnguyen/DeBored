import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";

import { useUser } from "../contexts/UserContext";

/*
 * The home screen including recent popular activities,
 * recommended activities by friends, and friend suggestions.
 */
const HomeScreen = () => {
  const { user } = useUser();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // re-fetch profile data
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.firstHeader}>Discover New People</Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </ScrollView>
      <Text style={styles.secondHeader}>Connect with Friends</Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
      </ScrollView>
      <Text style={styles.thirdHeader}>
        Discover People in {user.location || "Seattle, WA"}
      </Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
        <View style={styles.circle} />
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
    textAlign: "left",
    marginTop: 30,
    marginLeft: 20,
  },
  secondHeader: {
    fontSize: 24,
    color: "#000000",
    textAlign: "left",
    marginTop: 50,
    marginLeft: 20,
  },
  thirdHeader: {
    fontSize: 24,
    color: "#000000",
    textAlign: "left",
    marginTop: 50,
    marginLeft: 20,
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
    backgroundColor: "grey",
    marginLeft: 10, // Adjust margin as needed
  },
});

export default HomeScreen;

import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
} from "react-native";

import { useUser } from "../contexts/UserContext";
import UserTile from "../components/Home/UserTile";

/*
 * The home screen including all users, friends, and
 * people in your area.
 */
const HomeScreen = () => {
  const { user } = useUser();
  const [friends, setFriends] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const discoverLocation = user.location === "" ? "Seattle, WA" : user.location;

  // Fetch initial friends and users
  useEffect(() => {
    getFriends();
    getAllUsers();
  }, []);

  // Re-fetch friends and users upon refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    getFriends();
    getAllUsers();
    setRefreshing(false);
  }, []);

  const getFriends = () => {
    fetch(
      "https://22o4in4v38.execute-api.us-west-2.amazonaws.com/default/GetFriends",
      {
        method: "POST",
        body: JSON.stringify({
          id: user._id,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Cannot find friends");
        }
      })
      .then((response) => {
        console.log(`response: ${JSON.stringify(response)}`);
        setFriends(response.friendDetails);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getAllUsers = () => {
    fetch(
      "https://2bfxpcbbpl.execute-api.us-west-2.amazonaws.com/default/GetUsers",
      {
        method: "POST",
        body: JSON.stringify({
          id: user._id,
        }),
      }
    )
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Cannot find all users");
        }
      })
      .then((response) => {
        console.log(`response: ${JSON.stringify(response)}`);
        setAllUsers(response.allUsers);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
        {allUsers.map((user, index) => (
          <UserTile key={index} user={user} />
        ))}
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
        Discover People in {discoverLocation}
      </Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {allUsers
          .filter((u) => u.location === discoverLocation)
          .map((u, index) => (
            <UserTile key={index} user={u} />
          ))}
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
    paddingHorizontal: 10,
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

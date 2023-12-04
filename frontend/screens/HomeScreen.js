import React, { useState, useEffect, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  ActivityIndicator,
} from "react-native";

import UserTile from "../components/Home/UserTile";
import { useUser } from "../contexts/UserContext";
import { useFriends } from "../contexts/FriendsContext";

/*
 * The home screen including all users, friends, and
 * people in your area.
 */
const HomeScreen = () => {
  const { user } = useUser();
  const { friends, updateFriends } = useFriends();
  const [allUsers, setAllUsers] = useState([]);
  const [fetching, setFetching] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const discoverLocation = user.location === "" ? "Seattle, WA" : user.location;

  // Fetch initial friends and users
  useEffect(() => {
    const fetchData = async () => {
      try {
        setFetching(true);
        await getFriends();
        await getAllUsers();
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };

    fetchData();
  }, []);

  // Re-fetch friends and users upon refresh
  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await getFriends();
      await getAllUsers();
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getFriends = async () => {
    try {
      const response = await fetch(
        "https://22o4in4v38.execute-api.us-west-2.amazonaws.com/default/GetFriends",
        {
          method: "POST",
          body: JSON.stringify({
            id: user._id,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        updateFriends(data.friendDetails);
      } else {
        throw new Error("Cannot find friends");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAllUsers = async () => {
    try {
      const response = await fetch(
        "https://2bfxpcbbpl.execute-api.us-west-2.amazonaws.com/default/GetUsers",
        {
          method: "POST",
          body: JSON.stringify({
            id: user._id,
          }),
        }
      );

      if (response.status === 200) {
        const data = await response.json();
        setAllUsers(data.allUsers);
      } else {
        throw new Error("Cannot find all users");
      }
    } catch (error) {
      console.log(error);
    }
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
        {fetching ? (
          <ActivityIndicator
            size="small"
            color="#0000FF"
            style={styles.loading}
          />
        ) : (
          allUsers.map((otherUser, index) => (
            <UserTile key={index} otherUser={otherUser} />
          ))
        )}
      </ScrollView>
      <Text style={styles.secondHeader}>Connect with Friends</Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {fetching ? (
          <ActivityIndicator
            size="small"
            color="#0000FF"
            style={styles.loading}
          />
        ) : (
          friends
            .filter((friend) => friend.status === "ACCEPTED")
            .map((friend, index) => (
              <UserTile key={index} otherUser={friend.friend} />
            ))
        )}
      </ScrollView>
      <Text style={styles.thirdHeader}>
        Discover People in {discoverLocation}
      </Text>
      <ScrollView
        style={styles.circleContainer}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {fetching ? (
          <ActivityIndicator
            size="small"
            color="#0000ff"
            style={styles.loading}
          />
        ) : (
          allUsers
            .filter((otherUser) => otherUser.location === discoverLocation)
            .map((otherUser, index) => (
              <UserTile key={index} otherUser={otherUser} />
            ))
        )}
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
    marginTop: 20,
    paddingHorizontal: 10,
    height: 110,
  },
  circle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: "grey",
    marginLeft: 10, // Adjust margin as needed
  },
  loading: {
    marginLeft: 10,
  },
});

export default HomeScreen;

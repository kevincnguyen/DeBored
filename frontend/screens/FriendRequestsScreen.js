import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";

import { useUser } from "../contexts/UserContext";
import { useFriends } from "../contexts/FriendsContext";

/*
 * The friends screen including friend requests
 */
const FriendRequestsScreen = () => {
  const { user } = useUser();
  const { friends, updateFriends } = useFriends();
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(async () => {
    try {
      setRefreshing(true);
      await getFriends();
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

  const handleAcceptFriendRequest = async (otherUser) => {
    console.log("Accepting friend request");
    try {
      await fetch(
        "https://1569ca445i.execute-api.us-west-2.amazonaws.com/default/RespondFriend",
        {
          method: "POST",
          body: JSON.stringify({
            requesterId: otherUser._id,
            recipientId: user._id,
            response: "ACCEPT",
          }),
        }
      );
      updateFriends(
        friends.map((friend) =>
          friend.friend._id === otherUser._id
            ? { friend: otherUser, status: "ACCEPTED" }
            : friend
        )
      );
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectFriendRequest = async (otherUser) => {
    console.log("Rejecting friend request");
    try {
      await fetch(
        "https://1569ca445i.execute-api.us-west-2.amazonaws.com/default/RespondFriend",
        {
          method: "POST",
          body: JSON.stringify({
            requesterId: otherUser._id,
            recipientId: user._id,
            response: "REJECT",
          }),
        }
      );
      updateFriends(
        friends.filter((friend) => friend.friend._id !== otherUser._id)
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.circleContainer}>
        {friends
          .filter((friend) => friend.status === "PENDING")
          .map((friend, index) => (
            <View key={index} style={styles.friendRequestContainer}>
              <Image
                source={{ uri: friend.friend.profilePicURL }}
                style={styles.circle}
              />
              <Text style={styles.friendName}>{friend.friend.name}</Text>
              <TouchableOpacity
                style={styles.acceptButton}
                activeOpacity={0.2}
                onPress={() => handleAcceptFriendRequest(friend.friend)}
              >
                <Text style={styles.buttonText}>Accept</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.rejectButton}
                activeOpacity={0.2}
                onPress={() => handleRejectFriendRequest(friend.friend)}
              >
                <Text style={styles.buttonText}>Reject</Text>
              </TouchableOpacity>
            </View>
          ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFFFFF",
  },
  firstHeader: {
    fontSize: 24,
    color: "#000000",
    textAlign: "center",
    marginTop: 30,
  },
  circleContainer: {
    marginTop: 20,
  },
  friendRequestContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  circle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "grey",
    marginLeft: 20,
    marginTop: 10,
  },
  friendName: {
    marginLeft: 15,
  },
  acceptButton: {
    marginLeft: "auto",
    paddingVertical: 8, // Adjust the height
    paddingHorizontal: 25, // Adjust the width
    backgroundColor: "#33B864",
    borderRadius: 10, // Adjust the border radius
  },
  rejectButton: {
    marginLeft: 10,
    marginRight: 10,
    paddingVertical: 8, // Adjust the height
    paddingHorizontal: 25, // Adjust the width
    backgroundColor: "#E34234",
    borderRadius: 10, // Adjust the border radius
  },
  buttonText: {
    color: "#FFFFFF",
  },
});

export default FriendRequestsScreen;

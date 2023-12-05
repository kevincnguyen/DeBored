import React, { useState, useEffect } from "react";
import { View, Text, Image, Alert, StyleSheet } from "react-native";
import { Button } from "react-native-paper";

import ContactInfo from "./ContactInfo";
import { useUser } from "../../../contexts/UserContext";
import { useFriends } from "../../../contexts/FriendsContext";

/*
 * A card displaying the profile picture, name, bio, and contact
 */
const ProfileCard = ({ otherUser }) => {
  const { user } = useUser();
  const { friends, updateFriends } = useFriends();

  // Can be:
  //  - ACCEPTED   - Users are friends
  //  - REQUESTED  - Logged in user has sent request to otherUser
  //  - PENDING    - Logged in user has friend request from otherUser
  //  - ADD FRIEND - Can send friend request
  const [friendStatus, setFriendStatus] = useState(null);

  useEffect(() => {
    const areConnected = friends.find(
      (friend) => friend.friend._id === otherUser._id
    );
    const status = areConnected ? areConnected.status : "ADD FRIEND";
    setFriendStatus(status);
  }, []);

  const handleSendFriendRequest = async () => {
    console.log("Sending friend request");
    try {
      await fetch(
        "https://1569ca445i.execute-api.us-west-2.amazonaws.com/default/RespondFriend",
        {
          method: "POST",
          body: JSON.stringify({
            requesterId: user._id,
            recipientId: otherUser._id,
            response: "SEND",
          }),
        }
      );
      updateFriends([...friends, { friend: otherUser, status: "REQUESTED" }]);
      setFriendStatus("REQUESTED");
    } catch (error) {
      console.error(error);
    }
  };

  const handleAcceptFriendRequest = async () => {
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
      setFriendStatus("ACCEPTED");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRejectFriendRequest = async () => {
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
      setFriendStatus("ADD FRIEND");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFriendRequest = async () => {
    console.log("Removing friend request");
    try {
      await fetch(
        "https://1569ca445i.execute-api.us-west-2.amazonaws.com/default/RespondFriend",
        {
          method: "POST",
          body: JSON.stringify({
            requesterId: user._id,
            recipientId: otherUser._id,
            response: "REJECT",
          }),
        }
      );
      updateFriends(
        friends.filter((friend) => friend.friend._id !== otherUser._id)
      );
      setFriendStatus("ADD FRIEND");
    } catch (error) {
      console.error(error);
    }
  };

  const handleRemoveFriend = async () => {
    console.log("Removing friend");
    try {
      await fetch(
        "https://1569ca445i.execute-api.us-west-2.amazonaws.com/default/RespondFriend",
        {
          method: "POST",
          body: JSON.stringify({
            requesterId: user._id,
            recipientId: otherUser._id,
            response: "REJECT",
          }),
        }
      );
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
      setFriendStatus("ADD FRIEND");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    friendStatus && (
      <View style={styles.container}>
        <Image src={otherUser.profilePicURL} style={styles.picture} />
        <Text style={styles.name}>{otherUser.name}</Text>
        <Text style={styles.bio}>{otherUser.bio}</Text>
        {friendStatus === "ACCEPTED" ? (
          <Button
            icon="account-multiple"
            mode="contained"
            onPress={() => {
              Alert.alert(
                "Remove Friend?",
                `Are you sure you want to unfriend ${otherUser.name}?`,
                [
                  {
                    text: "Cancel",
                    style: "cancel",
                  },
                  {
                    text: "Unfriend",
                    onPress: handleRemoveFriend,
                    style: "destructive",
                  },
                ],
                { cancelable: false }
              );
            }}
            contentStyle={styles.buttonContent}
            labelStyle={styles.text}
            style={styles.button}
          >
            Friends
          </Button>
        ) : friendStatus === "REQUESTED" ? (
          <Button
            icon="clock-time-eight-outline"
            mode="contained-tonal"
            onPress={handleRemoveFriendRequest}
            contentStyle={styles.buttonContent}
            labelStyle={styles.text}
            style={styles.button}
          >
            Requested
          </Button>
        ) : friendStatus === "PENDING" ? (
          <View style={styles.buttonContainer}>
            <Button
              icon="account-plus-outline"
              mode="contained"
              onPress={handleAcceptFriendRequest}
              contentStyle={styles.buttonContent}
              labelStyle={styles.text}
              style={styles.button}
            >
              Accept Friend
            </Button>
            <Button
              icon="account-remove-outline"
              mode="contained-tonal"
              onPress={handleRejectFriendRequest}
              contentStyle={styles.buttonContent}
              labelStyle={styles.text}
              style={styles.button}
            >
              Reject Friend
            </Button>
          </View>
        ) : (
          <Button
            icon="account-plus"
            mode="contained"
            onPress={handleSendFriendRequest}
            contentStyle={styles.buttonContent}
            labelStyle={styles.text}
            style={styles.button}
          >
            Add Friend
          </Button>
        )}
        <ContactInfo otherUser={otherUser} />
      </View>
    )
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: 10,
    paddingBottom: 15,
    borderColor: "#DCD6D0",
    borderBottomWidth: 1,
  },
  picture: {
    height: 120,
    width: 120,
    borderRadius: 60,
  },
  name: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 10,
  },
  bio: {
    fontSize: 18,
    marginTop: 10,
    marginBottom: 20,
  },
  button: {
    marginHorizontal: 5,
    marginBottom: 10,
    borderRadius: 10,
  },
  buttonContent: {
    width: 150,
  },
  buttonContainer: {
    flexDirection: "row",
  },
  text: {
    fontSize: 14,
  },
});

export default ProfileCard;

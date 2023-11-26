import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  RefreshControl,
  ScrollView,
  TouchableOpacity,
} from "react-native";

/*
 * The friends screen including friend requests and friends list
 */
const FriendsScreen = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [friendRequests, setFriendRequests] = useState([
    // Assuming friendRequests is an array of friend requests
    // You can replace this with your actual data structure
    { id: 1, name: "Kevin" },
    { id: 2, name: "Tommy" },
    { id: 3, name: "David" },
    { id: 4, name: "Edwin" },
    { id: 5, name: "Samedh" },
    { id: 6, name: "Kulani" },
    { id: 7, name: "Gail" },
    { id: 8, name: "Perkins" },
    { id: 9, name: "Sam" },
    { id: 10, name: "Battle" },
    // Add more friend requests as needed
  ]);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // re-fetch profile data
      setRefreshing(false);
    }, 1000);
  }, []);

  const handleAccept = (id) => {
    // Handle accept logic here
    console.log(`Accepted friend request with ID: ${id}`);
  };

  const handleReject = (id) => {
    // Handle reject logic here
    console.log(`Rejected friend request with ID: ${id}`);
  };

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <View style={styles.circleContainer}>
        {friendRequests.map((friend) => (
          <View key={friend.id} style={styles.friendRequestContainer}>
            <View style={styles.circle} />
            <Text style={styles.friendName}>{friend.name}</Text>
            <TouchableOpacity
              style={styles.acceptButton}
              activeOpacity={0.2}
              onPress={() => handleAccept(friend.id)}
            >
              <Text style={styles.buttonText}>Accept</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.rejectButton}
              activeOpacity={0.2}
              onPress={() => handleReject(friend.id)}
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
    marginLeft: 'auto',
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

export default FriendsScreen;
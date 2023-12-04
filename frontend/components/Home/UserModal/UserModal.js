import React, { useState, useCallback } from "react";
import {
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  RefreshControl,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import ProfileCard from "./ProfileCard";
import RecentActivities from "./RecentActivities";

/*
 * The profile screen modal for a user
 * including profile information and a users recent DeBored activities.
 */
const UserModal = ({ otherUser, toggleModal }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Re-fetch profile data
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <SafeAreaView>
      <View style={styles.header}>
        <TouchableOpacity onPress={toggleModal}>
          <Ionicons name="chevron-back" size={24} color="black" />
        </TouchableOpacity>
      </View>
      <ScrollView
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        <ProfileCard otherUser={otherUser} />
        <RecentActivities otherUser={otherUser} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 45,
    paddingLeft: 16,
    justifyContent: "center",
  },
});

export default UserModal;

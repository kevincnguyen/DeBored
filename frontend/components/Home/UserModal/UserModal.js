import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";

import ProfileCard from "./ProfileCard";
import RecentActivities from "./RecentActivities";

/*
 * The profile screen modal for a user
 * including profile information and a users recent DeBored activities.
 */
const UserModal = ({ profile }) => {
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      // Re-fetch profile data
      setRefreshing(false);
    }, 1000);
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <ProfileCard profile={profile} />
      <RecentActivities profile={profile} />
    </ScrollView>
  );
};

export default UserModal;

import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";

import ProfileCard from "../components/Profile/ProfileCard";
import RecentActivity from "../components/Profile/RecentActivity";

/*
 * The profile screen including profile information and a users recent DeBored activities.
 */
const ProfileScreen = ({ imageKey }) => {
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
      <ProfileCard imageKey={imageKey} />
      {/* TODO: Render friend request button if viewing other user profile */}
      <RecentActivity />
    </ScrollView>
  );
};

export default ProfileScreen;

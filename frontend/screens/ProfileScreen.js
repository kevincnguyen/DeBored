import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";

import ProfileCard from "../components/Profile/ProfileCard";
import RecentActivities from "../components/Profile/RecentActivities";

/*
 * The profile screen including profile information and a users recent DeBored activities.
 */
const ProfileScreen = () => {
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
      <ProfileCard />
      <RecentActivities />
    </ScrollView>
  );
};

export default ProfileScreen;

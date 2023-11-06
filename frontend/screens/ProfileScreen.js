import React, { useState, useCallback } from "react";
import { RefreshControl, ScrollView } from "react-native";

import ProfileCard from "../components/Profile/ProfileCard";
import RecentActivity from "../components/Profile/RecentActivity";

const ProfileScreen = () => {
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
      <ProfileCard />
      <RecentActivity />
    </ScrollView>
  );
};

export default ProfileScreen;

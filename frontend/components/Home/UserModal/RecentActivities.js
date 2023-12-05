import { View, Text, StyleSheet } from "react-native";

import Activity from "../../Profile/Activity";

/*
 * A list of recent activities displayed on a user profile.
 */
const RecentActivities = ({ otherUser }) => {
  const displayActivities = otherUser.recentActivities
    .reverse()
    .map((activity, index) => (
      <Activity key={`${activity}-${index}`} activity={activity} />
    ));

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Recent Activities</Text>
      {displayActivities}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
});

export default RecentActivities;

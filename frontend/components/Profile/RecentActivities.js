import { View, Text, StyleSheet } from "react-native";

import Activity from "./Activity";
import { useUser } from "../../contexts/UserContext";

/*
 * A list of recent activities displayed on a user profile.
 */
const RecentActivities = () => {
  const { user } = useUser();

  const displayActivities = user.recentActivities
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

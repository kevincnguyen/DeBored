import { View, Text, StyleSheet } from "react-native";

import Activity from "./Activity";
import { useUser } from "../../contexts/UserContext";

/*
 * A list of recent activities displayed on a user profile.
 */
const RecentActivity = () => {
  const { user } = useUser();

  const displayActivities = user.recentActivities.map((activity) => (
    <Activity key={activity} activity={activity} />
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
    marginVertical: 20,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default RecentActivity;

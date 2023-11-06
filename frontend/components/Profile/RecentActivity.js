import { View, Text, StyleSheet } from "react-native";

import Activity from "./Activity";
import DefaultImage from "../../assets/images/default.png";

const activities = [
  {
    name: "Hiking",
    image: DefaultImage,
  },
  {
    name: "Eat Apples",
    image: DefaultImage,
  },
  {
    name: "Watch the Sunset",
    image: DefaultImage,
  },
];

const RecentActivity = () => {
  const displayActivities = activities.map((activity) => (
    <Activity key={activity.name} name={activity.name} image={activity.image} />
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
    padding: 10,
    marginVertical: 10,
  },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
  activity: {
    flex: 1,
    flexDirection: "row",
  },
});

export default RecentActivity;

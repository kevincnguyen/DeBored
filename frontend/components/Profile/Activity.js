import { View, Text, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";

// List of icons to be displayed next to activity
const icons = [
  "smile",
  "heart",
  "star",
  "thumbs-up",
  "coffee",
  "gift",
  "music",
  "camera",
  "rocket",
  "flag",
  "lightbulb",
  "tree",
  "cloud",
  "sun",
  "moon",
  "trophy",
  "bicycle",
  "car",
  "plane",
  "umbrella",
  "beer",
  "book",
  "desktop",
  "mobile",
  "globe",
  "lock",
  "key",
  "envelope",
  "search",
  "comments",
  "users",
  "th",
  "list",
  "check",
  "times",
  "cog",
  "spinner",
  "download",
  "upload",
  "wrench",
  "magic",
  "link",
  "code",
  "terminal",
  "database",
  "puzzle-piece",
  "bug",
  "chart-bar",
  "globe-americas",
];

// List of colors to applied to the icon
const colors = [
  "#85C1E9",
  "#AF8BC8",
  "#F5B7B1",
  "#7FB3D5",
  "#FAD89D",
  "#7FBF9F",
  "#D2B4DE",
  "#F9E79F",
  "#76D7C4",
  "#A9DFBF",
  "#52BE80",
  "#F2D7D5",
  "#A9CCE3",
  "#E1D5E7",
  "#B4CCB9",
  "#FAD7A0",
  "#7FBF9F",
  "#C39BD3",
  "#EBB6B2",
  "#82E0AA",
];

const getRandomIconName = () => {
  const index = Math.floor(Math.random() * icons.length);
  return icons[index];
};

const getRandomColor = () => {
  const index = Math.floor(Math.random() * colors.length);
  return colors[index];
};

/*
 * An activity represented by an icon and activity name
 */
const Activity = ({ activity }) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <FontAwesome5
          name={getRandomIconName()}
          color={getRandomColor()}
          size={40}
        />
      </View>
      <Text style={styles.activity}>{activity}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 5,
  },
  icon: {
    width: 55,
    alignItems: "center",
  },
  activity: {
    fontSize: 18,
    fontWeight: 600,
    marginLeft: 10,
    flex: 1,
    flexWrap: "wrap",
  },
});

export default Activity;

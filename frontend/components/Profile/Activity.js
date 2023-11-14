import { View, Text, Image, StyleSheet } from "react-native";

/*
 * An activity represented by its icon, activity name, and further description
 */
const Activity = ({ name, image }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.picture} source={image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
        {/* TODO: Modal when pressing "see more" with further description of activity */}
        <Text style={styles.caption}>see more</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    marginVertical: 5,
  },
  picture: {
    height: 80,
    width: 80,
    borderRadius: 30,
  },
  info: {
    flexDirection: "column",
    justifyContent: "center",
    paddingLeft: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: 600,
  },
  caption: {
    fontSize: 16,
    fontWeight: 400,
    color: "blue",
  },
});

export default Activity;

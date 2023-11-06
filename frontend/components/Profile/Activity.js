import { View, Text, Image, StyleSheet } from "react-native";

const Activity = ({ name, image }) => {
  return (
    <View style={styles.container}>
      <Image style={styles.picture} source={image} />
      <View style={styles.info}>
        <Text style={styles.name}>{name}</Text>
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

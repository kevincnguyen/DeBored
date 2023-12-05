import React, { useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from "react-native";

import UserModal from "./UserModal/UserModal";

const UserTile = ({ otherUser }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.container}>
        <Image src={otherUser.profilePicURL} style={styles.image} />
        <Text style={styles.name}>{otherUser.name}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <UserModal otherUser={otherUser} toggleModal={toggleModal} />
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 100,
    flexDirection: "column",
    alignItems: "center",
  },
  image: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  name: {
    fontSize: 14,
    fontWeight: 500,
    marginTop: 5,
  },
});

export default UserTile;

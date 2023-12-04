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

const UserTile = ({ user }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  return (
    <View>
      <TouchableOpacity onPress={toggleModal} style={styles.container}>
        <Image style={styles.image} src={user.profilePicURL} />
        <Text style={styles.name}>{user.name}</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={modalVisible}
        onRequestClose={toggleModal}
      >
        <TouchableOpacity onPress={toggleModal}>
          <UserModal profile={user} />
        </TouchableOpacity>
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

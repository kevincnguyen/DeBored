import { View } from "react-native";

import ProfileCard from "../components/Profile/ProfileCard";
import Contact from "../components/Profile/Contact";
import Recent from "../components/Profile/Recent";

const ProfileScreen = () => {
  return (
    <View>
      <ProfileCard />
      <Contact />
      <Recent />
    </View>
  );
};

export default ProfileScreen;

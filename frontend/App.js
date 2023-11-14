import { SafeAreaProvider } from "react-native-safe-area-context";
import { StatusBar } from "expo-status-bar";

import { UserProvider } from "./contexts/UserContext";
import AppFlow from "./navigation/AppFlow";

const App = () => {
  return (
    <UserProvider>
      <StatusBar style="auto" />
      <SafeAreaProvider>
        <AppFlow />
      </SafeAreaProvider>
    </UserProvider>
  );
};

export default App;

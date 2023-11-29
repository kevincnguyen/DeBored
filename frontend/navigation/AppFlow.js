import React, { useState, useEffect, useCallback } from "react";
import { useUser } from "../contexts/UserContext";
import { NavigationContainer } from "@react-navigation/native";
import * as SplashScreen from "expo-splash-screen";

import MainNavigation from "./MainNavigation";
import LoginStack from "./LoginStack";

SplashScreen.preventAutoHideAsync();

/*
 * Controls the initial flow of the app
 */
const AppFlow = () => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        // TODO: check if authenticated user is logged in
        //        1. get from local storage
        //        2. setUser state if logged in
        // simulate checking authentication (for now)
      } catch (err) {
        console.error("Error checking user authentication: ", err);
      } finally {
        setIsLoading(false);
      }
    };
    checkAuthentication();
  }, []);

  // Hide the splash screen once everything is rendered
  const onLayoutRootView = useCallback(async () => {
    if (!isLoading) {
      await SplashScreen.hideAsync();
    }
  }, [isLoading]);

  if (isLoading) {
    return null;
  }

  return (
    <NavigationContainer onReady={onLayoutRootView}>
      {user ? <MainNavigation /> : <LoginStack />}
    </NavigationContainer>
  );
};

export default AppFlow;

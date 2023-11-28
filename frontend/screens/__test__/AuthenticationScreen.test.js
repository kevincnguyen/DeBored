import React from "react";
import renderer from "react-test-renderer";
import { Button } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import AuthenticationScreen from "../AuthenticationScreen";

// Mock the external modules
jest.mock("@react-navigation/native", () => ({
  useNavigation: jest.fn(),
}));
jest.mock("react-native-safe-area-context", () => ({
  useSafeAreaInsets: jest.fn(),
}));

test("renders AuthenticationScreen component correctly", () => {
  useSafeAreaInsets.mockImplementation(() => ({ top: 0, bottom: 0 }));
  const tree = renderer.create(<AuthenticationScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("displays correct text elements", () => {
  useSafeAreaInsets.mockImplementation(() => ({ top: 0, bottom: 0 }));
  const tree = renderer.create(<AuthenticationScreen />).toJSON();
  expect(JSON.stringify(tree)).toMatch("Bored?");
  expect(JSON.stringify(tree)).toMatch("DeBored");
  expect(JSON.stringify(tree)).toMatch("Fight boredom. Make friends.");
});

test("navigates to Login and SignUp screens on button presses", () => {
  const mockNavigate = jest.fn();
  useNavigation.mockImplementation(() => ({ navigate: mockNavigate }));
  useSafeAreaInsets.mockImplementation(() => ({ top: 0, bottom: 0 }));

  const component = renderer.create(<AuthenticationScreen />);
  const root = component.root;

  // Simulating Login button press
  root.findAllByType(Button)[0].props.onPress();
  expect(mockNavigate).toHaveBeenCalledWith("Login");

  // Simulating SignUp button press
  mockNavigate.mockClear();
  root.findAllByType(Button)[1].props.onPress();
  expect(mockNavigate).toHaveBeenCalledWith("SignUp");
});

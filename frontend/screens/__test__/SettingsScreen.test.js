import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../SettingsScreen";
import { useUser } from "../../contexts/UserContext";

// Mock the user context
jest.mock("../../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

// Mock the react-native-paper components
jest.mock("react-native-paper", () => ({
  Button: "Button",
  TextInput: "TextInput",
}));

test("renders SettingsScreen component correctly", () => {
  useUser.mockImplementation(() => ({
    user: { name: "", bio: "", email: "" },
  }));
  const tree = renderer.create(<SettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("contains all input fields with correct labels", () => {
  const component = renderer.create(<SettingsScreen />);
  const textInputs = component.root.findAllByType("TextInput");
  expect(textInputs.length).toBe(5); // 5 inputs: name, bio, email, password, confirm password
});

test("contains buttons for changing picture and saving changes", () => {
  const component = renderer.create(<SettingsScreen />);
  const buttons = component.root.findAllByType("Button");
  expect(buttons.length).toBe(2); // 2 buttons: edit picture and save changes
});

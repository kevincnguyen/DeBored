import React from "react";
import renderer from "react-test-renderer";
import SettingsScreen from "../SettingsScreen";
import { useUser } from "../../contexts/UserContext";
import { useImage } from "../../contexts/ImageContext";

// Mock the user context
jest.mock("../../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

// Mock the image context
jest.mock("../../contexts/ImageContext", () => ({
  useImage: jest.fn(),
}));

// Mock the react-native-paper components
jest.mock("react-native-paper", () => ({
  Button: "Button",
  TextInput: {
    Icon: "TextInput.Icon",
  },
  TextInput: "TextInput",
}));

test("renders SettingsScreen component correctly", () => {
  useUser.mockImplementation(() => ({
    user: { name: "", bio: "", email: "" },
  }));
  useImage.mockImplementation(() => ({
    updateImageKey: () => "",
  }));
  const tree = renderer.create(<SettingsScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("contains all input fields with correct labels", () => {
  useImage.mockImplementation(() => ({
    updateImageKey: () => "",
  }));
  const component = renderer.create(<SettingsScreen />);
  const textInputs = component.root.findAllByType("TextInput");
  // 9 inputs: name, bio, email, password, confirm password, phone, instagram, facebook, twitter
  expect(textInputs.length).toBe(9);
});

test("contains buttons for changing picture and saving changes", () => {
  useImage.mockImplementation(() => ({
    updateImageKey: () => "",
  }));
  const component = renderer.create(<SettingsScreen />);
  const buttons = component.root.findAllByType("Button");
  expect(buttons.length).toBe(2); // 2 buttons: edit picture and save changes
});

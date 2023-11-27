import React from "react";
import renderer from "react-test-renderer";
import ForgotPasswordScreen from "../ForgotPasswordScreen";

// Mock any necessary modules or components
jest.mock("react-native-paper", () => ({
  Button: "Button",
  TextInput: "TextInput",
}));

test("renders ForgotPasswordScreen component correctly", () => {
  const tree = renderer.create(<ForgotPasswordScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("contains TextInput for email", () => {
  const component = renderer.create(<ForgotPasswordScreen />);
  const textInput = component.root.findByProps({ label: "Email" });
  expect(textInput).toBeTruthy();
});

test("contains a button to send email", () => {
  const component = renderer.create(<ForgotPasswordScreen />);
  const button = component.root.findByType("Button");
  expect(button).toBeTruthy();
  // Check button text if possible
});

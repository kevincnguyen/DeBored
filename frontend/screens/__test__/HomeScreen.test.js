import React from "react";
import renderer from "react-test-renderer";
import { useUser } from "../../contexts/UserContext";

import HomeScreen from "../HomeScreen";

// Mock the user context
jest.mock("../../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

test("renders HomeScreen component correctly", () => {
  useUser.mockImplementation(() => ({
    user: { location: "Seattle, WA" },
  }));
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

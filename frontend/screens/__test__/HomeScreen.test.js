import React from "react";
import renderer from "react-test-renderer";
import { useUser } from "../../contexts/UserContext";
import { useFriends } from "../../contexts/FriendsContext";

import HomeScreen from "../HomeScreen";

// Mock the user context
jest.mock("../../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

// Mock the friends context
jest.mock("../../contexts/FriendsContext", () => ({
  useFriends: jest.fn(),
}));

test("renders HomeScreen component correctly", () => {
  useUser.mockImplementation(() => ({
    user: { location: "Seattle, WA" },
  }));
  useFriends.mockImplementation(() => ({
    friends: [],
  }));
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

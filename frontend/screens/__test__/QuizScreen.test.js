import React from "react";
import renderer from "react-test-renderer";
import QuizScreen from "../QuizScreen";
import { useUser } from "../../contexts/UserContext";

// Mock child components
jest.mock("../../components/Quiz/StartQuiz", () => "StartQuiz");
jest.mock("../../components/Quiz/QuizQuestion", () => "QuizQuestion");
jest.mock("../../components/Quiz/QuizResults", () => "QuizResults");

// Mock the user context
jest.mock("../../contexts/UserContext", () => ({
  useUser: jest.fn(),
}));

jest.mock("react-native-paper", () => ({
  Provider: "Provider",
}));

jest.mock("react-native-paper-dropdown", () => ({
  DropDown: "DropDown",
}));

test("renders StartQuiz component initially", () => {
  useUser.mockImplementation(() => ({
    user: { name: "", bio: "", email: "" },
    updateUser: () => {},
  }));
  const tree = renderer.create(<QuizScreen />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0].type).toBe("StartQuiz");
});

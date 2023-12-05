import React from "react";
import renderer from "react-test-renderer";
import QuizScreen from "../QuizScreen";

// Mock child components
jest.mock("../../components/Quiz/StartQuiz", () => "StartQuiz");
jest.mock("../../components/Quiz/QuizQuestion", () => "QuizQuestion");
jest.mock("../../components/Quiz/QuizResults", () => "QuizResults");

jest.mock("react-native-paper", () => ({
  Provider: "Provider",
}));

jest.mock("react-native-paper-dropdown", () => ({
  DropDown: "DropDown",
}));

test("renders StartQuiz component initially", () => {
  const tree = renderer.create(<QuizScreen />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].children[0].type).toBe("StartQuiz");
});

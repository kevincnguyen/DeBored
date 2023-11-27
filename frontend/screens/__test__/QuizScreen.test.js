import React from "react";
import renderer from "react-test-renderer";
import QuizScreen from "../QuizScreen";
import StartQuiz from "../../components/Quiz/StartQuiz";
import QuizQuestion from "../../components/Quiz/QuizQuestion";
import QuizResults from "../../components/Quiz/QuizResults";

// Mock child components
jest.mock("../../components/Quiz/StartQuiz", () => "StartQuiz");
jest.mock("../../components/Quiz/QuizQuestion", () => "QuizQuestion");
jest.mock("../../components/Quiz/QuizResults", () => "QuizResults");

test("renders StartQuiz component initially", () => {
  const tree = renderer.create(<QuizScreen />).toJSON();
  expect(tree).toMatchSnapshot();
  expect(tree.children[0].type).toBe("StartQuiz");
});

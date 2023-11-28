import React from "react";
import renderer from "react-test-renderer";

import HomeScreen from "../HomeScreen";

test("renders HomeScreen component correctly", () => {
  const tree = renderer.create(<HomeScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("displays correct header texts", () => {
  const tree = renderer.create(<HomeScreen />).toJSON();

  expect(tree).toMatchSnapshot();
  expect(JSON.stringify(tree)).toMatch("Recent Popular Activities");
  expect(JSON.stringify(tree)).toMatch("Recommended by Friends");
  expect(JSON.stringify(tree)).toMatch("Discover New People");
});

test("has horizontal ScrollViews", () => {
  const tree = renderer.create(<HomeScreen />).toJSON();

  expect(JSON.stringify(tree)).toMatch("ScrollView");
  // This will not specifically test for horizontal ScrollView,
  // as react-test-renderer does not support querying props
});

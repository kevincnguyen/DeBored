import React from "react";
import renderer from "react-test-renderer";
import ProfileScreen from "../ProfileScreen";
import ProfileCard from "../../components/Profile/ProfileCard";
import RecentActivities from "../../components/Profile/RecentActivities";

// Mock child components
jest.mock("../../components/Profile/ProfileCard", () => "ProfileCard");
jest.mock(
  "../../components/Profile/RecentActivities",
  () => "RecentActivities"
);

test("renders ProfileScreen component correctly", () => {
  const tree = renderer.create(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders ProfileCard and RecentActivities", () => {
  const component = renderer.create(<ProfileScreen />);
  const profileCard = component.root.findAllByType(ProfileCard);
  const recentActivities = component.root.findAllByType(RecentActivities);

  expect(profileCard.length).toBe(1);
  expect(recentActivities.length).toBe(1);
});

import React from "react";
import renderer from "react-test-renderer";
import ProfileScreen from "../ProfileScreen";
import ProfileCard from "../../components/Profile/ProfileCard";
import RecentActivity from "../../components/Profile/RecentActivity";

// Mock child components
jest.mock("../../components/Profile/ProfileCard", () => "ProfileCard");
jest.mock("../../components/Profile/RecentActivity", () => "RecentActivity");

test("renders ProfileScreen component correctly", () => {
  const tree = renderer.create(<ProfileScreen />).toJSON();
  expect(tree).toMatchSnapshot();
});

test("renders ProfileCard and RecentActivity", () => {
  const component = renderer.create(<ProfileScreen />);
  const profileCard = component.root.findAllByType(ProfileCard);
  const recentActivity = component.root.findAllByType(RecentActivity);

  expect(profileCard.length).toBe(1);
  expect(recentActivity.length).toBe(1);
});

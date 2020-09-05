import React from "react";
import { shallow } from "enzyme";

import Avatar from "../index";
import { dummyData } from "../../../assets/test-data";

describe("Avatar component", () => {
  const { profile_path, name } = dummyData;
  it("should render an actor profile image", () => {
    const avatar = shallow(<Avatar actorInfo={{ profile_path, name }} />);
    expect(avatar.find("img").prop("src")).toEqual(profile_path);
  });

  it("should show alt text when image is not rendered", () => {
    const avatar = shallow(<Avatar actorInfo={{ profile_path: "", name }} />);
    expect(avatar.find("img").prop("alt")).toEqual(`${name}'s avatar`);
  });
});

import React from "react";
import { shallow } from "enzyme";
import Works from "../index";
import Work from "../../work";

const exampleActorInfo = {
  actorInfo: {
    known_for: [{ title: "test" }],
  },
};

describe("Works component", () => {
  let works;
  beforeEach(() => {
    works = shallow(<Works actorInfo={exampleActorInfo} />);
  });

  it("should render actor's works title", () => {
    expect(works.find("h2").text()).toEqual("Notable Work");
  });

  // it("should map empty actor's works list", () => {
  //   expect(works.find(Work).length).toBe(1);
  // });
});

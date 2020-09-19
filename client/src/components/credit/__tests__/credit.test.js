import React from "react";
import { shallow } from "enzyme";

import Credit from "../index";

describe("Credit component", () => {
  const creditYear = shallow(<Credit year={2015} />);
  it("should render a movie year when year is present", () => {
    const year = creditYear.find(".Actor--credit-year");
    expect(year.text()).toEqual("2015");
  });

  const creditStatus = shallow(<Credit status="Filming" year={null} />);
  it("should render a movie status when year is not present", () => {
    const status = creditStatus.find(".Actor--credit-year");
    expect(status.text()).toEqual("Filming");
  });

  // const creditRoles = shallow(<Credit r />)
});

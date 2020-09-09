import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { shallow } from "enzyme";
import { App } from "./App";

test("renders App component", () => {
  const app = shallow(
    <Router>
      <App />
    </Router>
  );
  expect(app).toMatchSnapshot();
});

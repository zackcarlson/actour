import React from "react";
import { shallow } from "enzyme";
import Work from "../index";

const exampleImgSrc =
  "https://image.tmdb.org/t/p/original/aWy72XaBX2fvoDk1KbpQdGA1K6X.jpg";
const exampleActor = { poster_path: exampleImgSrc, title: "Victorious" };

describe("Work component", () => {
  const { poster_path, title } = exampleActor;
  it("should render an actor work image", () => {
    const work = shallow(<Work poster_path={poster_path} title={title} />);
    expect(work.find("img").prop("src")).toEqual(exampleImgSrc);
  });

  it("should show alt text when image is not rendered", () => {
    const work = shallow(<Work poster_path={""} title={title} />);
    expect(work.find("img").prop("alt")).toEqual("Movie Poster");
  });

  it("should display title of work", () => {
    const work = shallow(<Work poster_path={poster_path} title={title} />);
    expect(work.find("img").prop("title")).toEqual(title);
  });
});

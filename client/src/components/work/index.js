import React from "react";
import "./index.css";

const Work = ({ poster_path, title }) => (
  <div className="Actor--notable-credit">
    <img src={poster_path} alt="Movie Poster" title={title} />
  </div>
);

export default Work;

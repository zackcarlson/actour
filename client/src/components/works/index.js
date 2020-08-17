import React from "react";
import Work from "../work";
import "./index.css";

const Works = ({ actorInfo }) => {
  return (
    <div className="Actor--notable-work">
      {actorInfo &&
        actorInfo.stats.known_for.map(({ poster_path, title }, i) => {
          return (
            <Work
              poster_path={poster_path}
              title={title}
              key={i + poster_path}
            />
          );
        })}
    </div>
  );
};

export default Works;

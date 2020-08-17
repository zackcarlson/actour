import React from "react";
import Credit from "../credit";
import "./index.css";

const Credits = ({ actorInfo }) => {
  return (
    <div className="Actor--credits">
      {actorInfo &&
        actorInfo.credits.map(({ title, roles, year, status }, i) => {
          return (
            <Credit
              title={title}
              roles={roles}
              year={year}
              status={status}
              i={i}
              key={title + i}
            />
          );
        })}
    </div>
  );
};

export default Credits;

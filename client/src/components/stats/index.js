import React from "react";
import Avatar from "../avatar";
import Highlights from "../highlights";
import "./index.css";

const Stats = ({ actorInfo, name }) => {
  return (
    <div className="Actor--stats">
      <Avatar actorInfo={actorInfo} name={name} />
      <div className="Actor--name">{actorInfo && actorInfo.stats.name}</div>
      <Highlights actorInfo={actorInfo} />
    </div>
  );
};

export default Stats;

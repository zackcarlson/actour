import React from "react";
import "./index.css";

const Avatar = ({ actorInfo, name }) => (
  <div className="Actor--image">
    <img
      src={actorInfo && actorInfo.stats.profile_path}
      alt={`${name}'s avatar`}
    />
  </div>
);

export default Avatar;

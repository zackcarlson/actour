import React from "react";
import "./index.css";

const Avatar = ({ actorInfo }) => (
  <div className="Actor--image">
    <img
      src={actorInfo && actorInfo.profile_path}
      alt={actorInfo && `${actorInfo.name}'s avatar`}
    />
  </div>
);

export default Avatar;

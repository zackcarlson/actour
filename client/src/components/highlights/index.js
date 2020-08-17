import React from "react";
import "./index.css";

const Highlights = ({ actorInfo }) => (
  <div className="Actor--highlights">
    <div className="Actor--credits-count">
      <div className="Actor--credits-number">
        {actorInfo && actorInfo.credits.length}
      </div>
      <div className="Actor--credits-label">Credits</div>
    </div>
    <div className="Actor--awards-count">
      <div className="Actor--awards-number">
        {actorInfo && actorInfo.awards.otherWinsCount}
      </div>
      <div className="Actor--awards-label">Awards</div>
    </div>
  </div>
);

export default Highlights;

import React from "react";
import "./index.css";

const Credit = ({ title, roles, year, status, i }) => {
  return (
    <div className="Actor--credit" key={`${i} ${title}`}>
      <div className="Actor--credit-year">{year ? year : status}</div>
      <div className="Actor--credit-title">{title}</div>
      <div className="Actor--credit-roles">
        {roles && roles.map(({ character }, i) => character).join(" / ")}
      </div>
    </div>
  );
};

export default Credit;

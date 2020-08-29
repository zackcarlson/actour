import React, { lazy, Suspense } from "react";
import "./index.css";
const Avatar = lazy(() =>
  import(
    /* webpackPreload: true */
    "../avatar"
  )
);
const Highlights = lazy(() =>
  import(
    /* webpackPreload: true */
    "../highlights"
  )
);

const Stats = ({ actorInfo }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="Actor--stats">
        <Avatar actorInfo={actorInfo} />
        <div className="Actor--name">{actorInfo && actorInfo.name}</div>
        <Highlights />
      </div>
    </Suspense>
  );
};

export default Stats;

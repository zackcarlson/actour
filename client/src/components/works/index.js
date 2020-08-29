import React, { lazy, Suspense } from "react";
import "./index.css";
const Work = lazy(() =>
  import(
    /* webpackPreload: true */
    "../work"
  )
);

const Works = ({ actorInfo }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="Actor--worksContainer">
        <h2>Notable Work</h2>
        <div className="Actor--notable-works">
          {actorInfo &&
            actorInfo.known_for.map(({ poster_path, title }, i) => {
              return (
                <Work
                  poster_path={poster_path}
                  title={title}
                  key={i + poster_path}
                />
              );
            })}
        </div>
      </div>
    </Suspense>
  );
};

export default Works;

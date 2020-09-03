import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./index.css";

const SkeletonHighlights = () => {
  return (
    <section>
      <ul className="highlights-list">
        {Array(2)
          .fill()
          .map((item, index) => (
            <li className="highlight-card" key={index}>
              <SkeletonTheme color="#b09bf0" highlightColor="#5e47a3">
                <p>
                  <Skeleton height={20} width={50} count={1} />
                </p>
              </SkeletonTheme>
              <SkeletonTheme color="#b09bf0" highlightColor="#5e47a3">
                <div>
                  <Skeleton height={22} width={70} count={1} />
                </div>
              </SkeletonTheme>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SkeletonHighlights;

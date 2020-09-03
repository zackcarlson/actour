import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "./index.css";

const SkeletonCredits = () => {
  return (
    <section>
      <ul className="credits-list">
        {Array(10)
          .fill()
          .map((item, index) => (
            <li className="credit-card" key={index}>
              <SkeletonTheme color="#b09bf0" highlightColor="#4c599e">
                <p className="movie-year">
                  <Skeleton height={15} width={40} count={1} />
                </p>
              </SkeletonTheme>
              <SkeletonTheme color="#b09bf0" highlightColor="#4c599e">
                <div className="movie-title">
                  <Skeleton height={20} width={250} count={1} />
                </div>
              </SkeletonTheme>
              <SkeletonTheme color="#b09bf0" highlightColor="#4c599e">
                <p className="movie-role">
                  <Skeleton height={15} width={80} count={1} />
                </p>
              </SkeletonTheme>
            </li>
          ))}
      </ul>
    </section>
  );
};

export default SkeletonCredits;

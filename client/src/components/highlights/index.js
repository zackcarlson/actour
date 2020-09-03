import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_AWARDS } from "../../queries";
import { handleCache } from "../../utils";
import SkeletonHighlights from "../skeletons/highlights";
import "./index.css";

const Highlights = (props) => {
  const { name, imdb } = useParams();
  const [awards, setAwards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { client } = props;
    const timer = setTimeout(() => {
      handleCache(
        client,
        `${name}-${imdb}-awards`,
        setAwards,
        setIsLoading,
        GET_AWARDS,
        { id: imdb },
        "getAwards"
      );
    }, 800);
    // Cancel the timer while unmounting
    return () => clearTimeout(timer);
  }, [name, props, imdb]);

  return (
    <div className="Actor--highlights">
      {isLoading && !awards ? (
        <SkeletonHighlights />
      ) : (
        <>
          {awards.otherWinsCount && (
            <div className="Actor--awards-count">
              <div className="Actor--awards-number">
                {awards.otherWinsCount}
              </div>
              <div className="Actor--awards-label">Awards</div>
            </div>
          )}

          {awards.awardName && (
            <div className="Actor--awards-highlight">
              <div className="Actor--awards-name">{awards.awardName}</div>
              <div className="Actor--awards-label">Highlight</div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default withApollo(Highlights);

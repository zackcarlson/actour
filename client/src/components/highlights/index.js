import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_AWARDS } from "../../queries";
import { handleCache } from "../../utils";
import "./index.css";

const Highlights = (props) => {
  const { name, imdb } = useParams();
  const [awards, setAwards] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { client } = props;
    handleCache(
      client,
      `${name}-${imdb}-awards`,
      setAwards,
      setIsLoading,
      GET_AWARDS,
      { id: imdb },
      "getAwards"
    );
  }, [name, props, imdb]);

  return (
    <div className="Actor--highlights">
      {isLoading && !awards ? (
        "Loading..."
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

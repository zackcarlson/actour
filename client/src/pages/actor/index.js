import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_ACTOR } from "../../queries";
import "./index.css";

const Actor = (props) => {
  const { name } = useParams();
  const [actorStats, setActorStats] = useState(null);

  useEffect(() => {
    getActorStats();
  }, []);

  const getActorStats = async () => {
    const { client } = props;
    const { data } = await client.query({
      query: GET_ACTOR,
      variables: { query: name },
    });
    setActorStats(data.actor);
  };

  console.log("stats", actorStats);
  return (
    <div className="Actor--container">
      <div className="Actor--stats">
        <div className="Actor--image">
          <img
            src={actorStats && actorStats.profile_path}
            alt={`${name}'s avatar`}
          />
        </div>
        <div className="Actor--name">{actorStats && actorStats.name}</div>

        <div className="Actor--highlights">
          <div className="Actor--movie-count"></div>
          <div className="Actor--award-count"></div>
        </div>
      </div>

      <div className="Actor--notable-work">
        {/* Map through a list of NotableWork components */}
        {actorStats &&
          actorStats.known_for.map(({ poster_path, title }, i) => {
            return (
              <div
                className="Actor--notable-credit"
                key={`${i} ${poster_path}`}
              >
                <img src={poster_path} alt="Movie Poster" title={title} />
              </div>
            );
          })}
      </div>

      <div className="Actor--credits">
        {/* Map through a list of Credit components */}
      </div>
    </div>
  );
};

export default withRouter(withApollo(Actor));

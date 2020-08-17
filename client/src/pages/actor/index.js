import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_ACTOR, GET_ACTOR_IMDB_ID, GET_ACTOR_AWARDS, GET_ACTOR_CREDITS } from "../../queries";
import "./index.css";

const Actor = (props) => {
  const { name } = useParams();
  const [actorInfo, setActorInfo] = useState(null);

  useEffect(() => {
    handleQueries();
  }, []);

  const getActorStats = async () => {
    const { client } = props;
    const { data } = await client.query({
      query: GET_ACTOR,
      variables: { query: name },
    });
    return data.actor;
  };

  const getActorImdbId = async (id) => {
    const { client } = props;
    const { data } = await client.query({
      query: GET_ACTOR_IMDB_ID,
      variables: { id },
    });
    return data.actorDetails.imdb_id;
  };

  const getActorAwards = async (imdbID) => {
    const { client } = props;
    const { data } = await client.query({
      query: GET_ACTOR_AWARDS,
      variables: { id: imdbID },
    });
    return data.actorAwards.awardsSummary;
  };

  const getActorCredits = async (imdbID) => {
    const { client } = props;
    const { data } = await client.query({
      query: GET_ACTOR_CREDITS,
      variables: { id: imdbID },
    });
    return data.actorCredits.filmography;
  }

  const handleQueries = async () => {
    const stats = await getActorStats();
    const imdbID = await getActorImdbId(stats.id);
    const awards = await getActorAwards(imdbID);
    const credits = await getActorCredits(imdbID);
    setActorInfo({
      stats,
      awards,
      credits
    });
  };

  console.log('actor info', actorInfo)
  return (
    <div className="Actor--container">
      <div className="Actor--stats">
        <div className="Actor--image">
          <img
            src={actorInfo && actorInfo.stats.profile_path}
            alt={`${name}'s avatar`}
          />
        </div>
        <div className="Actor--name">{actorInfo && actorInfo.stats.name}</div>

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
      </div>

      <div className="Actor--notable-work">
        {/* Map through a list of NotableWork components */}
        {actorInfo &&
          actorInfo.stats.known_for.map(({ poster_path, title }, i) => {
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
        {actorInfo &&
          actorInfo.credits.map(({title, roles, year, status}, i) => {
            return (
              <div
                className="Actor--credit"
                key={`${i} ${title}`}
              >
                <div className="Actor--credit-year">{year ? year : status}</div>
                <div className="Actor--credit-title">{title}</div>
                <div className="Actor--credit-roles">
                  {roles && (roles.map(({character}, i) => character)).join(" / ")}
                </div>
              </div>
            );
          })
        }
      </div>
    </div>
  );
};

export default withRouter(withApollo(Actor));

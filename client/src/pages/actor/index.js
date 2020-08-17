import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { withApollo } from "react-apollo";
import {
  getActorStats,
  getActorImdbId,
  getActorAwards,
  getActorCredits,
} from "../../utils";
import Credits from "../../components/credits";
import Works from "../../components/works";
import Stats from "../../components/stats";
import "./index.css";

const Actor = (props) => {
  const { name } = useParams();
  const [actorInfo, setActorInfo] = useState(null);

  useEffect(() => {
    const { client } = props;
    const handleQueries = async () => {
      const stats = await getActorStats(name, client);
      const imdbID = await getActorImdbId(stats.id, client);
      const awards = await getActorAwards(imdbID, client);
      const credits = await getActorCredits(imdbID, client);
      setActorInfo({
        stats,
        awards,
        credits,
      });
    };

    handleQueries();
  }, [name, props]);

  return (
    <div className="Actor--container">
      <Stats actorInfo={actorInfo} />
      <Works actorInfo={actorInfo} />
      <Credits actorInfo={actorInfo} />
    </div>
  );
};

export default withRouter(withApollo(Actor));

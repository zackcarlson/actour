import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_ACTOR } from "../../queries";
import Credits from "../../components/credits";
import Works from "../../components/works";
import Stats from "../../components/stats";
import "./index.css";

const Actor = (props) => {
  const { name } = useParams();
  const [actorInfo, setActorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGetActor = async () => {
      const storage = window.localStorage;
      const { client } = props;

      if (storage.getItem(name)) {
        const actor = JSON.parse(window.localStorage.getItem(name));
        setActorInfo(actor);
        setIsLoading(false);
      } else {
        const { data } = await client.query({
          query: GET_ACTOR,
          variables: { query: name },
        });

        storage.setItem(name, JSON.stringify(data.getActor));
        setActorInfo(data.getActor);
        setIsLoading(false);
      }
    };

    handleGetActor();
  }, [name, props]);

  return (
    <div className="Actor--container">
      {isLoading && !actorInfo ? (
        "Loading..."
      ) : (
        <>
          <Stats actorInfo={actorInfo} />
          <Works actorInfo={actorInfo} />
        </>
      )}
      <Credits />
    </div>
  );
};

export default withRouter(withApollo(Actor));

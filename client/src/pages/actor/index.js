import React, { useState, useEffect, lazy, Suspense } from "react";
import { withRouter, useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_ACTOR } from "../../queries";
import { handleCache } from "../../utils";
import Store from "../../state/store.js";
import Metadata from "../../components/metadata";

import "./index.css";

const Credits = lazy(() =>
  import(
    /* webpackPreload: true */
    "../../components/credits"
  )
);
const Works = lazy(() =>
  import(
    /* webpackPreload: true */
    "../../components/works"
  )
);
const Stats = lazy(() =>
  import(
    /* webpackPreload: true */
    "../../components/stats"
  )
);

const Actor = (props) => {
  const { name } = useParams();
  const [actorInfo, setActorInfo] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { client } = props;
    handleCache(
      client,
      name,
      setActorInfo,
      setIsLoading,
      GET_ACTOR,
      { query: name },
      "getActor"
    );
  }, [name, props]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Store>
        <div className="Actor--container">
          {isLoading && !actorInfo ? (
            "Loading..."
          ) : (
            <>
              <Stats actorInfo={actorInfo} />
              <Works actorInfo={actorInfo} />
              <Metadata />
            </>
          )}
          <Credits />
        </div>
      </Store>
    </Suspense>
  );
};

export default withRouter(withApollo(Actor));

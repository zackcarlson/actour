import React, { useState, useEffect } from "react";
import { withRouter, useParams } from "react-router";
import { withApollo } from "react-apollo";
import Credits from "../../components/credits";
import Works from "../../components/works";
import Stats from "../../components/stats";
import "./index.css";

const Actor = (props) => {
  const { name } = useParams();
  const [actorInfo, setActorInfo] = useState(null);

  useEffect(() => {
    const actor = JSON.parse(window.localStorage.getItem(name));
    setActorInfo(actor);
  }, [name]);

  console.log("actorInfo", actorInfo);
  return (
    <div className="Actor--container">
      <Stats actorInfo={actorInfo} />
      <Works actorInfo={actorInfo} />
      <Credits actorInfo={actorInfo} />
    </div>
  );
};

export default withRouter(withApollo(Actor));

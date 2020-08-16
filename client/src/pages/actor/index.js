import React from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
import "./index.css";

const Actor = (props) => {
  return (
    <div className="Actor--container">
      <div className="Actor--stats">
        <div className="Actor--image"></div>
        <div className="Actor--name"></div>

        <div className="Actor--highlights">
          <div className="Actor--movie-count"></div>
          <div className="Actor--award-count"></div>
        </div>
      </div>

      <div className="Actor--notable-work">
        {/* Map through a list of NotableWork components */}
      </div>

      <div className="Actor--credits">
        {/* Map through a list of Credit components */}
      </div>
    </div>
  );
};

export default withRouter(withApollo(Actor));

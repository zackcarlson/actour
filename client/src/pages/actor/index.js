import React from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";

const Actor = (props) => {
  return <div>Actor here</div>;
};

export default withRouter(withApollo(Actor));

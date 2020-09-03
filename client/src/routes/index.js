import React from "react";
import { Route, Switch } from "react-router-dom";
import Landing from "../pages/landing";
import Actor from "../pages/actor";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={Landing} />
    <Route path="/actor/:name/:imdb" component={Actor} />
  </Switch>
);

export default Routes;

import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch, withRouter } from "react-router-dom";
import Landing from "../pages/landing";
import Actor from "../pages/actor";

const Routes = withRouter(({ location }) => (
  <TransitionGroup>
    <CSSTransition key={location.key} classNames="slide" timeout={1000}>
      <Switch location={location}>
        <Route exact path="/" component={Landing} />
        <Route path="/actor/:name/:imdb" component={Actor} />
      </Switch>
    </CSSTransition>
  </TransitionGroup>
));

export default Routes;

import React, { lazy, Suspense } from "react";
// import { CSSTransition, TransitionGroup } from "react-transition-group";
import { Route, Switch } from "react-router-dom";
const Landing = lazy(() =>
  import(
    /* webpackPrefetch: true */
    "../pages/landing"
  )
);
const Actor = lazy(() =>
  import(
    /* webpackPrefetch: true */
    "../pages/actor"
  )
);

const Routes = (props) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Switch>
        <Route exact path="/" component={Landing} />
        <Route path="/actor/:name/:imdb" component={Actor} />
      </Switch>
    </Suspense>
  );
};

export default Routes;

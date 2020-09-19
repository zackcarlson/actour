import React from "react";
import "./App.css";
import { withRouter } from "react-router-dom";
import Routes from "./routes";

export function App() {
  return <Routes />;
}

export default withRouter(App);

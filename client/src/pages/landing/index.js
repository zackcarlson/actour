import React, { useState } from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import "./index.css";

const Landing = (props) => {
  const [isError, setError] = useState(false);
  const [query, setQuery] = useState("");
  const isValidActor = isError && `Please enter a valid actor`;

  const handleChange = (e) => {
    const targetValue = e.target.value;
    handleValidation(targetValue);
    setQuery(targetValue);
  };

  const handleValidation = (inputValue) => {
    if (!inputValue && isError) {
      setError(false);
    }
  };

  const handleSearch = async (e) => {
    if (e.key === "Enter") {
      const { client } = props;
      const GET_ACTOR = gql`
        query Acting($query: String!) {
          actor(query: $query) {
            name
            known_for_department
          }
        }
      `;
      const { data } = await client.query({
        query: GET_ACTOR,
        variables: { query: query },
      });

      data.actor ? handleRedirect() : setError(true);
    }
  };

  const handleRedirect = () => {
    props.history.push(`/actor/${query}`);
  };

  return (
    <div className="Landing--container">
      <div className="Landing--logo"></div>
      <div className="Landing--directions">
        <label htmlFor="site-search">Search the site:</label>
      </div>
      <div className="Landing--container">
        <input
          type="search"
          id="site-search"
          name="q"
          aria-label="Search through site content"
          onChange={handleChange}
          onKeyDown={handleSearch}
        />
      </div>
      <div className="Landing--error">{isValidActor}</div>
    </div>
  );
};

export default withRouter(withApollo(Landing));

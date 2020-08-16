import React, { useState } from "react";
import { withApollo } from "react-apollo";
import gql from "graphql-tag";
import "./index.css";

const Landing = (props) => {
  const [actor, setActor] = useState("");

  const handleChange = (e) => {
    setActor(e.target.value);
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
      const res = await client.query({
        query: GET_ACTOR,
        variables: { query: actor },
      });

      console.log(res);
    }
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
      <div className="Landing--error"></div>
    </div>
  );
};

export default withApollo(Landing);
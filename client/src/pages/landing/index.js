import React, { useState } from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
import { GET_ACTOR } from "../../queries";
import popcorn from "../../assets/images/popcorn.svg";
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

      if (window.localStorage.getItem(query)) {
        const { imdb_id } = JSON.parse(window.localStorage.getItem(query));
        return handleRedirect(imdb_id);
      }

      const { data } = await client.query({
        query: GET_ACTOR,
        variables: { query: query },
      });

      if (data.getActor) {
        window.localStorage.setItem(query, JSON.stringify(data.getActor));
        return handleRedirect(data.getActor.imdb_id);
      }

      setError(true);
    }
  };

  const handleRedirect = (imdbId) => {
    props.history.push(`/actor/${query}/${imdbId}`);
  };

  return (
    <div className="Landing--container">
      <div className="Landing--logo">
        <img src={popcorn} alt="Popcorn Icon" className="Landing--icon" />
      </div>
      <div className="Landing--directions">
        <label htmlFor="site-search">Find your favorite actor</label>
      </div>
      <div className="Landing--input">
        <input
          type="search"
          id="site-search"
          name="q"
          aria-label="Search through site content"
          onChange={handleChange}
          onKeyDown={handleSearch}
          placeholder="Robert De Niro"
        />
      </div>
      <div className="Landing--error">{isValidActor}</div>
    </div>
  );
};

export default withRouter(withApollo(Landing));

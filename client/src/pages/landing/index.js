import React, { useState } from "react";
import { withRouter } from "react-router";
import { withApollo } from "react-apollo";
import { GET_ACTOR } from "../../queries";
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
      <form className="Landing--form">
        <div className="Landing--logo">
          <svg
            width="127"
            height="127"
            viewBox="0 0 127 127"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            <rect width="127" height="127" fill="url(#pattern0)" />
            <defs>
              <pattern
                id="pattern0"
                patternContentUnits="objectBoundingBox"
                width="1"
                height="1"
              >
                <use xlinkHref="#image0" transform="scale(0.00195312)" />
              </pattern>
              <image
                id="image0"
                width="512"
                height="512"
                xlinkHref="data:image/png;base64,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"
              />
            </defs>
          </svg>
        </div>
        <label className="Landing--label" htmlFor="site-search">
          Find An Actor
        </label>
        <input
          type="search"
          id="site-search"
          className="Landing--input"
          name="q"
          aria-label="Search through site content"
          onChange={handleChange}
          onKeyDown={handleSearch}
          placeholder="Robert De Niro"
        />
        <div className="Landing--error">{isValidActor}</div>
      </form>
    </div>
  );
};

export default withRouter(withApollo(Landing));

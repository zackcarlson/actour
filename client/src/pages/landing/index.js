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
      <div className="Landing--form">
        <div className="Landing--logo">
          <svg
            width="162"
            height="196"
            viewBox="0 0 462 496"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g filter="url(#filter0_dd)">
              <path
                d="M451.5 92.2617C451.5 238.893 388 466.762 238.5 480.262C88 469.262 10 238.893 10 92.2617C10 -54.3699 88.5547 52.7617 238.5 52.7617C388.445 52.7617 451.5 -54.3699 451.5 92.2617Z"
                fill="black"
              />
              <path
                d="M364 177.354C364 186.374 342.286 212 315.5 212C288.714 212 267 186.374 267 177.354C267 168.333 288.714 181 315.5 181C342.286 181 364 168.333 364 177.354Z"
                fill="#C1B4E8"
              />
              <path
                d="M209 348C208.425 331.51 216.738 334.68 236.726 333.982C286.677 332.238 298.766 380.979 299.5 402C300.234 423.021 287.56 360.139 237.595 358.855C218.065 358.353 209.369 358.56 209 348Z"
                fill="#C1B4E8"
              />
              <path
                d="M238.5 480.5L234.5 54.5V53H232.5H226.5L219.5 52.5L213.5 52L206.5 51.5L198 50.5L190.5 49.5L184.5 48.5L178.5 47.5L173.5 46.5L168.5 45.5L164 44.5L159 43.5L153 42L149 41L143 39.5L137.5 38L130.5 36L125 34.5L119 32.5L112 30.5L101.5 27L89.5 23.5L85 22L81.5 21L77.5 20L73.5 19L69.5 18L65 17L60 16L56.2855 15.5L50.5 15H46L42 15.5L37.5 16.5L34.5 17.5L31.5 19L28.5 21L25.5 23.5L22.5 27L20.5 30L18.5 34L16.5 38L15 42.5L13.5 48.5L12.5 54L12 59L11 66.5L10.5 73.5L10 84V98L10.5 111.5L11.5 126.5L13 144L13.5 151L14.5 159L16 167.5L17 174.5L18 181.5L19.5 190L21.5 199L23 206L25.5 217L27.5 226L29.5 234.5L32 243.5L35 253.5L38 263.5L41 272.5L44.5 282.5L47.5 290.5L50.5 298.5L53.5 306L56.5 313L59.5 320L61.5 324.5L64.5 331L68 338L71.5 344.5L74.5 350.5L78 356.5L81.5 362.5L84.5 368L88 373.5L91.5 379L95 384.5L98.5 389.5L103 395.5L107 401L111 406L115.5 411.5L121 417.5L126 423L133.5 430.5L141 437.5L147.5 443L156 449.5L163.5 454.5L172.5 460L181 464.5L190.5 469L200 472.5L208.5 475L217.5 477.5L225.5 479L233 480L238.5 480.5Z"
                fill="#EBEBEB"
              />
              <path
                d="M210 202.647C210 193.626 188.286 168 161.5 168C134.714 168 113 193.626 113 202.647C113 211.667 134.714 202.647 161.5 202.647C188.286 202.647 210 211.667 210 202.647Z"
                fill="#192061"
              />
              <path
                d="M237 343C237 361 239 359 227.5 359C177.919 359 160 294.418 160 273.476C160 252.535 176.874 332.773 226.434 334.185C237.5 334.5 237 331.5 237 343Z"
                fill="#192061"
              />
              <path
                d="M233.51 358.5L233.99 334.58L236.605 334.513L236.835 358.5H233.51Z"
                fill="#192061"
                stroke="#192061"
              />
            </g>
            <defs>
              <filter
                id="filter0_dd"
                x="0"
                y="0"
                width="461.5"
                height="495.5"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="-5" />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow"
                />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                />
                <feOffset dy="5" />
                <feGaussianBlur stdDeviation="5" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.5 0"
                />
                <feBlend
                  mode="normal"
                  in2="effect1_dropShadow"
                  result="effect2_dropShadow"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect2_dropShadow"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
        </div>
        <label className="Landing--label" htmlFor="site-search">
          Find an actor
        </label>
        <input
          type="text"
          id="site-search"
          autoComplete="off"
          className="Landing--input"
          aria-label="Search through site content"
          onChange={handleChange}
          onKeyDown={handleSearch}
          placeholder="Robert De Niro"
        />
        <div className="Landing--error">{isValidActor}</div>
      </div>
    </div>
  );
};

export default withRouter(withApollo(Landing));

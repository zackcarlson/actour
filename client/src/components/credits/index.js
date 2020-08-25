import React, { useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_CREDITS } from "../../queries";
import { handleCache } from "../../utils";
import "./index.css";
const Credit = lazy(() =>
  import(
    /* webpackPreload: true */
    "../credit"
  )
);

const Credits = (props) => {
  const { name, imdb } = useParams();
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { client } = props;
    handleCache(
      client,
      `${name}-${imdb}-credits`,
      setCredits,
      setIsLoading,
      GET_CREDITS,
      { id: imdb },
      "getCredits"
    );
  }, [name, props, imdb]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="Actor--credits">
        {isLoading && !credits
          ? "Loading..."
          : credits.map(({ title, roles, year, status }, i) => {
              return (
                <Credit
                  title={title}
                  roles={roles}
                  year={year}
                  status={status}
                  i={i}
                  key={title + i}
                />
              );
            })}
      </div>
    </Suspense>
  );
};

export default withApollo(Credits);

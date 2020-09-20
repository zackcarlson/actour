import React, { useContext, useEffect, useState, lazy, Suspense } from "react";
import { useParams } from "react-router";
import { withApollo } from "react-apollo";
import { GET_CREDITS } from "../../queries";
import { handleCache } from "../../utils";
import SkeletonCredits from "../skeletons/credits";
import "./index.css";
import { CreditsContext } from "../../state/context";
import { updateCredits } from "../../state/actions/credits";

const Credit = lazy(() =>
  import(
    /* webpackPreload: true */
    "../credit"
  )
);

const Credits = (props) => {
  const [store, dispatch] = useContext(CreditsContext);
  const { name, imdb } = useParams();
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const { client } = props;
    const timer = setTimeout(() => {
      handleCache(
        client,
        `${name}-${imdb}-credits`,
        setCredits,
        setIsLoading,
        GET_CREDITS,
        { id: imdb },
        "getCredits",
        updateCredits,
        dispatch
      );
    }, 800);

    return () => clearTimeout(timer);
  }, [name, props, imdb]);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="Actor--creditsContainer">
        <h2>Credits</h2>
        <div className="Actor--credits">
          {isLoading && !credits ? (
            <SkeletonCredits />
          ) : (
            credits.map(({ title, roles, year, status }, i) => {
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
            })
          )}
        </div>
      </div>
    </Suspense>
  );
};

export default withApollo(Credits);

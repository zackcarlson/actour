import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { withApollo } from "react-apollo";
import Credit from "../credit";
import { GET_CREDITS } from "../../queries";
import "./index.css";

const Credits = (props) => {
  const { name, imdb } = useParams();
  const [credits, setCredits] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const handleGetCredits = async () => {
      const storage = window.localStorage;
      const searchTerm = `${name}-${imdb}-credits`;
      const { client } = props;

      if (storage.getItem(searchTerm)) {
        let creds = JSON.parse(window.localStorage.getItem(searchTerm));
        setCredits(creds);
        setIsLoading(false);
      } else {
        const { data } = await client.query({
          query: GET_CREDITS,
          variables: { id: imdb },
        });

        storage.setItem(searchTerm, JSON.stringify(data.getCredits));
        setCredits(data.getCredits);
        setIsLoading(false);
      }
    };

    handleGetCredits();
  }, [name, props, imdb]);

  return (
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
  );
};

export default withApollo(Credits);

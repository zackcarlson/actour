import React, { useContext, useState, useEffect } from "react";
import { CreditsContext } from "../../state/context";
import { withApollo } from "react-apollo";
import { GET_METADATA } from "../../queries";
/*
TODO:

------------
Client
-Create a Credits context provider:
  instantiate to:
    a) cached [actor name]-[imdb id]-credits
    b) empty array

-When getCredits finishes, store result in Credits context

-Metadata page will check if Credits context is full:
  if full:
    a) load metadata objects into Chart.js

  else show skeleton 
------------

*/

const Metadata = (props) => {
  const [store, dispatch] = useContext(CreditsContext);
  const [metadata, setMetadata] = useState([]);
  const { credits } = store;
  const { client } = props;
  console.log("store", store, "dispatch", dispatch);

  useEffect(() => {
    //TODO: import handleCache here, so that way we don't unnecessarily re-run network requests
    const fetchMetadata = async (credits, client, query) => {
      try {
        const ids = credits.map(({ id }) => id);
        const { data } = await client.query({
          query,
          variables: { ids },
        });

        console.log("data", data);
        setMetadata(data.getMetadata);
      } catch (err) {
        console.log("Error getting metadata", err);
      }
    };

    if (credits.length > 0) {
      console.log("inside if block!");
      fetchMetadata(credits, client, GET_METADATA);
    } else {
      console.log("not inside if block");
    }
  }, [credits.length]);

  return metadata.length > 0 ? (
    <ul>
      {metadata.map((credit) => (
        <li>{JSON.stringify(credit)}</li>
      ))}
    </ul>
  ) : (
    <h1>LOADING...</h1>
  );
};

export default withApollo(Metadata);

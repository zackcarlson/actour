import {
  GET_ACTOR,
  GET_ACTOR_IMDB_ID,
  GET_ACTOR_AWARDS,
  GET_ACTOR_CREDITS,
} from "../queries";

export const getActorStats = async (name, client) => {
  const { data } = await client.query({
    query: GET_ACTOR,
    variables: { query: name },
  });
  return data.actor;
};

export const getActorImdbId = async (id, client) => {
  const { data } = await client.query({
    query: GET_ACTOR_IMDB_ID,
    variables: { id },
  });
  return data.actorDetails.imdb_id;
};

export const getActorAwards = async (imdbID, client) => {
  const { data } = await client.query({
    query: GET_ACTOR_AWARDS,
    variables: { id: imdbID },
  });
  return data.actorAwards.awardsSummary;
};

export const getActorCredits = async (imdbID, client) => {
  const { data } = await client.query({
    query: GET_ACTOR_CREDITS,
    variables: { id: imdbID },
  });
  return data.actorCredits.filmography;
};

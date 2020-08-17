import gql from "graphql-tag";

export const GET_ACTOR = gql`
  query Acting($query: String!) {
    actor(query: $query) {
      id
      name
      known_for_department
      profile_path
      known_for {
        poster_path
        title
      }
    }
  }
`;

export const GET_IMDB_ID = gql`
  query ActorDetails($id: Int!) {
    actorDetails(id: $id) {
      imdb_id
    }
  }
`;

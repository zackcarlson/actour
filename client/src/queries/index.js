import gql from "graphql-tag";

export const GET_ACTOR = gql`
  query Actor($query: String!) {
    getActor(query: $query) {
      id
      name
      known_for_department
      profile_path
      known_for {
        poster_path
        title
      }
      imdb_id
      credits {
        title
        year
        status
        category
        roles {
          character
        }
      }
      awards {
        otherWinsCount
        awardName
      }
    }
  }
`;

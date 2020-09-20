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
    }
  }
`;

export const GET_CREDITS = gql`
  query Credits($id: String!) {
    getCredits(id: $id) {
      id
      title
      roles {
        character
      }
      year
      status
      category
    }
  }
`;

export const GET_AWARDS = gql`
  query Awards($id: String!) {
    getAwards(id: $id) {
      otherWinsCount
      awardName
    }
  }
`;

export const GET_METADATA = gql`
  query Metadata($ids: [String!]) {
    getMetadata(ids: $ids) {
      genres
      certificate
    }
  }
`;

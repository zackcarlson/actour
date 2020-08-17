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

export const GET_ACTOR_IMDB_ID = gql`
  query ActorDetails($id: Int!) {
    actorDetails(id: $id) {
      imdb_id
    }
  }
`;

export const GET_ACTOR_AWARDS = gql`
  query ActorAwards($id: String!) {
    actorAwards(id: $id) {
      awardsSummary {
        otherWinsCount
        highlighted {
          awardName
        }
      }
    }
  }
`;

export const GET_ACTOR_CREDITS = gql`
  query ActorCredits($id: String!) {
    actorCredits(id: $id) {
      filmography {
        title
        roles {
          character
        }
        year
        status
        category
      }
    }
  }
`;


const actorTypes = `
  type Query {
    getActor(query: String!): Actor
    getCredits(id: String!): [Credit]
    getAwards(id: String!): Awards
    getMetadata(ids: String!): [Metadata]
  }

  type Metadata {
    genres: [String]
    certificate: String
  }

  type Awards {
    otherWinsCount: Int
    awardName: String
  }

  type Role {
    character: String
  }

  type Credit {
    title: String
    category: String
    roles: [Role]
    year: Int
    status: String
    id: String
  }

  type Movie {
    id: Int
    title: String
    poster_path: String
  }

  type Actor {
    id: Int
    name: String
    known_for_department: String
    profile_path: String
    known_for: [Movie]
    imdb_id: String
  }
`;

module.exports = { actorTypes };

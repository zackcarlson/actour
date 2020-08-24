const actorTypes = `
  type Query {
    getActor(query: String!): Actor
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
    credits: [Credit]
    awards: Awards
  }
`;

module.exports = { actorTypes };

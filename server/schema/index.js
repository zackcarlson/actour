const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList,
  graphqlSync,
} = require("graphql");

const MovieType = new GraphQLObjectType({
  name: "Movie",
  fields: {
    id: { type: GraphQLInt },
    release_date: { type: GraphQLString },
    vote_average: { type: GraphQLInt },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString },
  },
});

const ActorType = new GraphQLObjectType({
  name: "Actor",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    known_for_department: { type: GraphQLString },
    profile_path: { type: GraphQLString },
    known_for: {
      type: new GraphQLList(MovieType),
    },
  },
});

const ActorDetailsType = new GraphQLObjectType({
  name: "ActorDetails",
  fields: {
    birthday: { type: GraphQLString },
    deathday: { type: GraphQLString },
    place_of_birth: { type: GraphQLString },
    imdb_id: { type: GraphQLString },
  },
});

const ActorAwardsHighlightType = new GraphQLObjectType({
  name: "ActorAwardsHighlight",
  fields: {
    awardName: { type: GraphQLString },
  },
});

const ActorAwardsSummaryType = new GraphQLObjectType({
  name: "ActorAwardsSummary",
  fields: {
    otherWinsCount: { type: GraphQLInt },
    highlighted: { type: ActorAwardsHighlightType },
  },
});

const ActorAwardsType = new GraphQLObjectType({
  name: "ActorAwards",
  fields: {
    awardsSummary: { type: ActorAwardsSummaryType },
  },
});

const ActorRoleType = new GraphQLObjectType({
  name: "ActorRole",
  fields: {
    character: {type: GraphQLString}
  }
});

const ActorCreditType = new GraphQLObjectType({
  name: "ActorCredit",
  fields: {
    title: { type: GraphQLString },
    category: { type: GraphQLString },
    roles: {type: new GraphQLList(ActorRoleType)},
    year: {type: GraphQLInt},
    status: {type: GraphQLString}
  },
});

const ActorCreditsType = new GraphQLObjectType({
  name: "ActorCredits",
  fields: {
    filmography: { type: new GraphQLList(ActorCreditType) },
  },
});

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    actor: {
      type: ActorType,
      args: { query: { type: GraphQLString } },
      resolve(_, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${args.query}&page=1&include_adult=false`
          )
          .then((res) => {
            let actor = res.data.results[0];
            if (!actor) return null;

            actor.profile_path =
              "https://image.tmdb.org/t/p/original" + actor.profile_path;

            return actor.known_for_department === "Acting" ? actor : null;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    actorDetails: {
      type: ActorDetailsType,
      args: { id: { type: GraphQLInt } },
      resolve(_, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/person/${args.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
          )
          .then((res) => {
            let actorDetail = res.data;
            return actorDetail;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    actorAwards: {
      type: ActorAwardsType,
      args: { id: { type: GraphQLString } },
      resolve(_, args) {
        return axios({
          method: "GET",
          url: "https://imdb8.p.rapidapi.com/actors/get-awards-summary",
          headers: {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": process.env.IMDB_API_KEY,
            useQueryString: true,
          },
          params: {
            nconst: args.id,
          },
        })
          .then((response) => {
            console.log(response.data);
            return response.data;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
    actorCredits: {
      type: ActorCreditsType,
      args: { id: { type: GraphQLString } },
      resolve(_, args) {
        return axios({
          method: "GET",
          url: "https://imdb8.p.rapidapi.com/actors/get-all-filmography",
          headers: {
            "x-rapidapi-host": "imdb8.p.rapidapi.com",
            "x-rapidapi-key": process.env.IMDB_API_KEY,
            useQueryString: true,
          },
          params: {
            nconst: args.id,
          },
        })
          .then((response) => {
            return response.data;
          })
          .then((credits) => {
            credits.filmography = credits.filmography.filter((credit) => {
              return credit.category === "actor" ? credit : null;
            });

            return credits;
          })
          .catch((error) => {
            console.log(error);
          });
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});

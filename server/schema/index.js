const axios = require("axios");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLSchema,
  GraphQLList
} = require("graphql");

const NewMovieType = new GraphQLObjectType({
  name: "NewMovie",
  fields: {
    id: { type: GraphQLInt },
    release_date: { type: GraphQLString },
    vote_average: { type: GraphQLInt },
    title: { type: GraphQLString },
    poster_path: { type: GraphQLString }
  }
});

const NewActorType = new GraphQLObjectType({
  name: "NewActor",
  fields: {
    id: { type: GraphQLInt },
    name: { type: GraphQLString },
    known_for_department: { type: GraphQLString },
    profile_path: { type: GraphQLString },
    known_for: {
      type: new GraphQLList(NewMovieType)
    }
  }
});

const NewActorDetails = new GraphQLObjectType({
  name: "NewActorDetails",
  fields: {
    birthday: { type: GraphQLString },
    deathday: { type: GraphQLString },
    place_of_birth: { type: GraphQLString },
    imdb_id: { type: GraphQLString }
  }
});

// const NewAwardsType = new GraphQLObjectType({
//   name: "NewAwards",
//   fields: {}
// });

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    newActor: {
      type: new GraphQLList(NewActorType),
      args: { query: { type: GraphQLString } },
      resolve(parentValue, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${args.query}&page=1&include_adult=false`
          )
          .then(res => {
            let actors = res.data.results;
            actors = actors.map(actor => {
              actor.profile_path =
                "https://image.tmdb.org/t/p/original" + actor.profile_path;
              return actor;
            });
            return actors;
          });
      }
    },
    newActorDetails: {
      type: NewActorDetails,
      args: { id: { type: GraphQLInt } },
      resolve(parentValue, args) {
        return axios
          .get(
            `https://api.themoviedb.org/3/person/${args.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
          )
          .then(res => {
            let actorDetail = res.data;
            return actorDetail;
          });
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery
});

const { makeExecutableSchema } = require("graphql-tools");
const { actorResolvers } = require("../resolvers");
const { actorTypes } = require("../types");

const actorSchema = makeExecutableSchema({
  typeDefs: actorTypes,
  resolvers: actorResolvers,
});

module.exports = {
  actorSchema,
};

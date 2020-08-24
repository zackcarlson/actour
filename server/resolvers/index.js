const {
  getActor,
  addActorIMDBID,
  getActorCredits,
  getActorAwards,
} = require("../utils");

const actorResolvers = {
  Query: {
    getActor: async (_, { query }, __, info) => {
      let actor = await getActor(query);
      if (!actor) return actor;

      actor = await addActorIMDBID(actor);
      return actor;
    },
    getCredits: async (_, { id }, __, info) => {
      let credits = await getActorCredits(id);
      return credits;
    },
    getAwards: async (_, { id }, __, info) => {
      let awards = getActorAwards(id);
      return awards;
    },
  },
};

module.exports = {
  actorResolvers,
};

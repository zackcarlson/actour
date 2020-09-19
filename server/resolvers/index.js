const {
  getActor,
  addActorIMDBID,
  getActorCredits,
  getActorAwards,
  getCreditMetadata
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
      let awards = await getActorAwards(id);
      return awards;
    },
    getMetadata: async (_, { ids }, __, info) => {
      let creditMetadata = await getCreditMetadata(ids);
      return creditMetadata
    }
  },
};

module.exports = {
  actorResolvers,
};

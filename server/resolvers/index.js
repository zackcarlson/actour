const {
  getActor,
  addActorIMDBID,
  addActorCredits,
  addActorAwards,
} = require("../utils");

const actorResolvers = {
  Query: {
    getActor: async (_, { query }, __, info) => {
      let actor = await getActor(query);
      if (!actor) return actor;

      actor = await addActorIMDBID(actor);

      const [a, b] = await Promise.all([
        addActorCredits(actor),
        addActorAwards(actor),
      ]);

      actor = a;
      actor = b;

      return actor;
    },
  },
};

module.exports = {
  actorResolvers,
};

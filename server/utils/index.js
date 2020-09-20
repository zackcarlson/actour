require("dotenv").config();
const axios = require("axios");

const getActor = async (query) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/search/person?api_key=${process.env.TMDB_API_KEY}&language=en-US&query=${query}&page=1&include_adult=false`
  );

  const actor = result.data.results[0];
  if (!actor) return null;

  actor.profile_path =
    "https://image.tmdb.org/t/p/original" + actor.profile_path;

  actor.known_for.forEach((movie, i) => {
    movie.poster_path =
      "https://image.tmdb.org/t/p/original" + movie.poster_path;
  });

  return actor.known_for_department === "Acting" ? actor : null;
};

const addActorIMDBID = async (actor) => {
  const result = await axios.get(
    `https://api.themoviedb.org/3/person/${actor.id}?api_key=${process.env.TMDB_API_KEY}&language=en-US`
  );

  actor.imdb_id = result.data.imdb_id;
  return actor;
};

const getActorCredits = async (id) => {
  const result = await axios({
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/actors/get-all-filmography",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": process.env.IMDB_API_KEY,
      useQueryString: true,
    },
    params: {
      nconst: id,
    },
  });

  const getCredit = (credit) => {
    if (credit.category === "actor" || credit.category === "actress") {
      credit.id = credit.id.split("/")[2];
      return credit;
    }
    return null;
  };

  const credits = result.data.filmography.filter(getCredit);

  // actor.credits = credits;
  return credits;
};

const getActorAwards = async (id) => {
  const result = await axios({
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/actors/get-awards-summary",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": process.env.IMDB_API_KEY,
      useQueryString: true,
    },
    params: {
      nconst: id,
    },
  });

  let awards = { otherWinsCount: 0, awardName: "" };
  let awardsSummary = result.data.awardsSummary;

  if (awardsSummary.hasOwnProperty("otherWinsCount")) {
    awards.otherWinsCount = awardsSummary.otherWinsCount;
  }
  if (awardsSummary.hasOwnProperty("highlighted")) {
    awards.awardName = awardsSummary.highlighted.awardName;
  }

  return awards;
};

const createTitleQuery = (credits) => {
  const ids = credits.reduce((accum, id, i) => {
    if (i !== credits.length - 1) accum += `${id}&ids=`;
    else accum += id;
    return accum;
  }, "");
  return ids;
};

const getCreditMetadata = async (ids) => {
  try {
    let Promises = [];

    for (let i = 0; i < ids.length; i += 50) {
      let fiftyCredits = ids.slice(i, i + 50);
      let queryString = createTitleQuery(fiftyCredits);

      let result = await axios({
        method: "GET",
        url: "https://imdb8.p.rapidapi.com/title/get-meta-data",
        headers: {
          "x-rapidapi-host": "imdb8.p.rapidapi.com",
          "x-rapidapi-key": process.env.IMDB_API_KEY,
          useQueryString: true,
        },
        params: {
          ids: queryString,
        },
      });

      const { data } = result;
      Promises = Promises.concat(Object.values(data));
    }

    const metadata = await Promise.all(Promises);
    return metadata;
  } catch (err) {
    console.log("Error batching metadata requests", err);
  }
};

module.exports = {
  getActor,
  addActorIMDBID,
  getActorCredits,
  getActorAwards,
  getCreditMetadata,
};

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

const addActorCredits = async (actor) => {
  const result = await axios({
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/actors/get-all-filmography",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": process.env.IMDB_API_KEY,
      useQueryString: true,
    },
    params: {
      nconst: actor.imdb_id,
    },
  });

  const credits = result.data.filmography.filter((credit) => {
    return credit.category === "actor" || credit.category === "actress"
      ? credit
      : null;
  });

  actor.credits = credits;
  return actor;
};

const addActorAwards = async (actor) => {
  const result = await axios({
    method: "GET",
    url: "https://imdb8.p.rapidapi.com/actors/get-awards-summary",
    headers: {
      "x-rapidapi-host": "imdb8.p.rapidapi.com",
      "x-rapidapi-key": process.env.IMDB_API_KEY,
      useQueryString: true,
    },
    params: {
      nconst: actor.imdb_id,
    },
  });

  actor.awards = { otherWinsCount: 0, awardName: "" };
  let awards = result.data.awardsSummary;

  if (awards.hasOwnProperty("otherWinsCount")) {
    actor.awards.otherWinsCount = awards.otherWinsCount;
  }
  if (awards.hasOwnProperty("highlighted")) {
    actor.awards.awardName = awards.highlighted.awardName;
  }

  return actor;
};

module.exports = {
  getActor,
  addActorIMDBID,
  addActorCredits,
  addActorAwards,
};

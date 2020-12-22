const axios = require("axios");
const twitchClientID = require("../config/keys").twitchClientID;
const {
  flatten,
  count_items,
  sortProperties,
  remove_duplicates,
} = require("./helpers.js");

const featuredApi = async (limit = 8) => {
  try {
    const { data } = await axios.get(
      `https://api.twitch.tv/kraken/streams/featured?&limit=${limit}&client_id=${twitchClientID}`
    );
    return data.featured.map(({ stream }) => stream);
  } catch (e) {
    return null;
  }
};

exports.topGamesApi = async (limit = 8) => {
  try {
    const { data } = await axios.get(
      `https://api.twitch.tv/kraken/games/top?client_id=${twitchClientID}&limit=${limit}`
    );
    return data.top.map(({ game }) => game.name);
  } catch (e) {
    return null;
  }
};

exports.fetchStreamInfo = async ({ user_id }) => {
  try {
    const { data } = await axios.get({
      url: `https://api.twitch.tv/kraken/streams/${user_id}`,
      headers: {
        "Client-ID": twitchClientID,
        "Accept": "application/vnd.twitchtv.v5+json",
      },
    });
    return data.stream;
  } catch (e) {
    return null;
  }
}

exports.fetchGames = async list => {
  let outputGames;
  await Promise.all(
    list.map(async item => {
      try {
        const fetched = await axios.get({
          url: `https://api.twitch.tv/helix/games?name=${item}`,
          headers: { "Client-ID": twitchClientID }
        });
        return fetched.data.data[0];
      } catch (e) {
        console.log(e);
      }
    })
  ).then(result => {
    outputGames = [].concat(result);
  });
  return outputGames;
};

exports.processQuery = (user, prop, count) => {
  const select = user[0].visits[prop];

  const countObj = count_items(select);
  let mostVisited = sortProperties(countObj);
  mostVisited = mostVisited.slice(0, count);

  let recent = remove_duplicates(select);
  recent = recent.slice(recent.length - count);

  let joined = mostVisited.concat(recent);
  return remove_duplicates(joined);
};

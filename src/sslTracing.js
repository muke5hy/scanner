"user strict";

const sslChecker = require("ssl-checker");

const vet = async (url, results) =>
    await sslChecker(url)
      .then((i) => ((i.url = url), i))
      .catch((e) => console.log(`error: ${e}`)),
  get_list = (cfg) => cfg.targets,
  vet_list = async (cfg, results) => {
    get_list(cfg).map(async (i) => await vet(i, results));
  };

module.exports = {
  vet,
  get_list,
  vet_list,
};

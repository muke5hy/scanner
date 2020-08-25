"user strict";

var { sslChecker } = require("ssl-checker");

const vet = async (url, results) =>
    await sslChecker(url)
      .then((i) => ((i.url = url), i))
      .catch((e) => console.log(`error: ${e}`)),
  get_list = (cfg) => cfg.targets,
  vet_list = async (cfg, results) => {
    get_list(cfg).map(async (i) => await vet(i, results));
  };

const checkSsl = async (domain) => {
  return await sslChecker(domain, { method: "GET", port: 443 }).then(
    console.info
  );
};

module.exports = {
  checkSsl,
  vet,
  get_list,
  vet_list,
};

"user strict";

const sslChecker = require("ssl-checker");

const ssl_c = require("ssl-checker");

const vet = async (url, results) =>
    await ssl_c(url)
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

// var ssllabs = require("node-ssllabs");

const getSslDetails = async function (hostname) {
  await sslChecker(`${hostname}ex. badssl.com`);
};

d = getSslDetails("google.com");
console.log(d);

module.exports = getSslDetails;
// ssllabs.scan(
//   {
//     host: "www.google.com",
//     fromCache: true,
//     maxAge: 24,
//   },
//   function (err, host) {
//     console.dir(host);
//   }
// );

// ssllabs.info(function (err, info) {
//   console.dir(info);
// });

// ssllabs.analyze(
//   {
//     host: "www.ssllabs.com",
//     publish: true,
//     startNew: true,
//     all: "done",
//   },
//   function (err, host) {
//     console.dir(host);
//   }
// );

// ssllabs.analyze(
//   {
//     host: "www.ssllabs.com",
//     fromCache: true,
//     maxAge: 72,
//     all: "on",
//     ignoreMismatch: true,
//   },
//   function (err, host) {
//     console.dir(host);
//   }
// );

// ssllabs.getEndpointData(
//   {
//     host: "www.ssllabs.com",
//     s: "64.41.200.100",
//     fromCache: true,
//   },
//   function (err, endpointData) {
//     console.dir(endpointData);
//   }
// );

// ssllabs.getStatusCodes(function (err, statusCodes) {
//   console.dir(statusCodes);
// });

// ssllabs.getRootCertsRaw(function (err, rootCertsRaw) {
//   console.dir(rootCertsRaw);
// });

// ssllabs.getRootCertsRaw(
//   {
//     trustStore: 5,
//   },
//   function (err, rootCertsRaw) {
//     console.dir(rootCertsRaw);
//   }
// );

// ssllabs.getRootCerts(function (err, rootCerts) {
//   console.dir(rootCerts);
// });

// ssllabs.getRootCerts(
//   {
//     trustStore: 5,
//   },
//   function (err, rootCerts) {
//     console.dir(rootCerts);
//   }
// );

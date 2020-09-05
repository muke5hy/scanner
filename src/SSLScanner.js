'user strict';

const sslChecker = require('ssl-checker');

const sslScan = async (url, results) => {
  var parser = new URL(url);
  const host = parser['host'];
  await sslChecker
    .default(host)
    .then((log) => {
      results = { domain: host, ...log };
      // console.log(results);
      return { id: 'ssl', value: results };
    })
    .catch(console.error);
};

module.exports = sslScan;

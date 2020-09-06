'user strict';

// var request = require('request');
var doTiming = require('./TimeScanner.js');
var LighthouseReport = require('./LHScanner.js');
var sslScan = require('./SSLScanner.js');
var tracer = require('./TracerouteScanner.js');

const start = async (req) => {
  const domain = req['domain'];
  const parser = new URL(domain);
  const host = parser['host'];
  promises = [];
  if (req.time) {
    promises.push(doTiming(domain, {}, 3));
  }
  if (req.lighthouse) {
    promises.push(LighthouseReport(domain));
  }
  if (req.ssl) {
    promises.push(sslScan(domain));
  }
  if (req.traceroute) {
    promises.push(tracer.trace(host));
  }

  await Promise.all(promises).then(function (result) {
    for (var i = 0; i < result.length; i++) {
      console.log(i, result[i]);
    }
    console.log(result);
    return result;
  });
};

req = {
  domain: 'https://tikinfluencers.com',
  time: true,
  lighthouse: false,
  ssl: true,
  traceroute: false,
};

start(req)
  .then((res) => {
    console.log(res);
    Object.entries(res).map((c) => {
      console.log(c);
    });
  })
  .catch((err) => {
    console.log(err);
  });

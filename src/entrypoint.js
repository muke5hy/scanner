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

  // if (req.time) {
  //   doTiming(domain, {}, 3);
  // }
  // if (req.lighthouse) {
  //   LighthouseReport(domain);
  // }
  // if (req.ssl) {
  //   sslScan(domain);
  // }
  // if (req.ssl) {
  //   tracer.trace(host);
  // }

  const { time, lh, ssl, trace } = await Promise.all([
    doTiming(domain, {}, 3),
    LighthouseReport(domain),
    sslScan(domain),
    // tracer.trace(host),
  ]);

  console.log(time);
  console.log(lh);
  console.log(ssl);
  console.log(trace);

  return { time, lh, ssl, trace };
};

req = {
  domain: 'https://tikinfluencers.com',
  time: true,
  lighthouse: true,
  ssl: true,
  traceroute: true,
};

start(req)
  .then(({ time, lh, ssl, trace }) => {
    console.log(time);
    console.log(lh);
    console.log(ssl);
    console.log(trace);
  })
  .catch((err) => {
    console.log(err);
  });

"user strict";

// var request = require('request');
var doTiming = require("./TimeScanner.js");
var LighthouseReport = require("./LHScanner.js");
var sslScan = require("./SSLScanner.js");
var tracer = require("./TracerouteScanner.js");

const start = async () => {
  const domain = "https://tikinfluencers.com";
  doTiming(domain, {}, 3);
  LighthouseReport(domain);
  sslScan(domain);
  var parser = new URL(domain);
  const host = parser["host"];
  tracer.trace(host);
};

start();

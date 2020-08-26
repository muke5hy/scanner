"user strict";

// var request = require('request');
var doTiming = require("./timeScanner.js");
var LighthouseReport = require("./lHScanner.js");
var { getSslDetails, vet, get_list, vet_list } = require("./sslScanner.js");
var tracer = require("./tracerouteScanner.js");

const start = async () => {
  const domain = "https://tikinfluencers.com";
  doTiming(domain, {}, 3);
  LighthouseReport(domain);
  getSslDetails(domain);
  tracer.trace(domain);
};

start();

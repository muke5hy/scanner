"user strict";

// var request = require('request');
var doTiming = require("./timeTracing.js");
var LighthouseReport = require("./lHTracing.js");
var { checkSsl, vet, get_list, vet_list } = require("./sslTracing.js");
var tracer = require("./tracerouteTracing.js");

const start = async () => {
  const domain = "https://google.com";
  // doTiming(domain, {}, 3);
  // LighthouseReport(domain);
  checkSsl(domain);
  // tracer.trace("github.com");
};

start();

"user strict";

// var request = require('request');
var doTiming = require("./timeTracing.js");
var LighthouseReport = require("./lHTracing.js");
var { vet, get_list, vet_list } = require("./sslTracing.js");

const start = async () => {
  const domain = "https://google.com";
  doTiming(domain, {}, 3);
  LighthouseReport(domain);
  vet(domain);
};

start();

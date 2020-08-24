"user strict";

// var request = require('request');
var Tracing = require("./tracing.js");
var Tracing = require("./lhouse.js");

const a = Tracing.doTiming("https://google.com", {}, 3);

console.log(Tracing);

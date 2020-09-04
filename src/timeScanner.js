'use strict';

const assert = require('assert');
const url = require('url');
const http = require('http');
const https = require('https');

const TIMEOUT_IN_MILLISECONDS = 30 * 1000;
const NS_PER_SEC = 1e9;
const MS_PER_NS = 1e6;

const request = function ({ method = 'GET', protocol, hostname, port, path, headers = {}, body } = {}, callback) {
  assert(protocol, 'options.protocol is required');
  assert(['http:', 'https:'].includes(protocol), 'options.protocol must be one of: "http:", "https:"');
  assert(hostname, 'options.hostname is required');
  assert(callback, 'callback is required');

  const eventTimes = {
    startAt: process.hrtime(),
    dnsLookupAt: undefined,
    tcpConnectionAt: undefined,
    tlsHandshakeAt: undefined,
    firstByteAt: undefined,
    endAt: undefined,
  };

  const req = (protocol.startsWith('https') ? https : http).request(
    {
      protocol,
      method,
      hostname,
      port,
      path,
      headers,
    },
    (res) => {
      let responseBody = '';

      req.setTimeout(TIMEOUT_IN_MILLISECONDS);

      res.once('readable', () => {
        eventTimes.firstByteAt = process.hrtime();
      });
      res.on('data', (chunk) => {
        responseBody += chunk;
      });

      res.on('end', () => {
        eventTimes.endAt = process.hrtime();

        callback(null, {
          headers: res.headers,
          timings: getTimings(eventTimes),
          body: responseBody,
        });
      });
    },
  );

  req.on('socket', (socket) => {
    socket.on('lookup', () => {
      eventTimes.dnsLookupAt = process.hrtime();
    });
    socket.on('connect', () => {
      eventTimes.tcpConnectionAt = process.hrtime();
    });
    socket.on('secureConnect', () => {
      eventTimes.tlsHandshakeAt = process.hrtime();
    });
    socket.on('timeout', () => {
      req.abort();

      const err = new Error('ETIMEDOUT');
      err.code = 'ETIMEDOUT';
      callback(err);
    });
  });
  req.on('error', callback);

  // Sending body
  if (body) {
    req.write(body);
  }

  req.end();
};

const getTimings = function (eventTimes) {
  var dnsLookup =
    eventTimes.dnsLookupAt !== undefined
      ? getHrTimeDurationInMs(eventTimes.startAt, eventTimes.dnsLookupAt)
      : undefined;
  var tcpConnection = getHrTimeDurationInMs(eventTimes.dnsLookupAt || eventTimes.startAt, eventTimes.tcpConnectionAt);
  var tlsHandshake =
    eventTimes.tlsHandshakeAt !== undefined
      ? getHrTimeDurationInMs(eventTimes.tcpConnectionAt, eventTimes.tlsHandshakeAt)
      : undefined;
  var firstByte = getHrTimeDurationInMs(
    eventTimes.tlsHandshakeAt || eventTimes.tcpConnectionAt,
    eventTimes.firstByteAt,
  );
  var contentTransfer = getHrTimeDurationInMs(eventTimes.firstByteAt, eventTimes.endAt);
  var total = getHrTimeDurationInMs(eventTimes.startAt, eventTimes.endAt);
  return dnsLookup + ',' + tcpConnection + ',' + tlsHandshake + ',' + firstByte + ',' + contentTransfer + ',' + total;
};

const getHrTimeDurationInMs = function (startTime, endTime) {
  const secondDiff = endTime[0] - startTime[0];
  const nanoSecondDiff = endTime[1] - startTime[1];
  const diffInNanoSecond = secondDiff * NS_PER_SEC + nanoSecondDiff;

  return diffInNanoSecond / MS_PER_NS;
};

var response = [];
const doTiming = function (myurl, myheaders, count) {
  if (count > 0) {
    request(
      Object.assign(url.parse(myurl), {
        headers: myheaders,
      }),
      (err, res) => {
        if (err) {
          console.log(err || res.timings);
        } else {
          response.push(res.timings);
        }
        doTiming(myurl, myheaders, count - 1);
      },
    );
  } else {
    return response;
  }
};
// console.log('dnsLookup,tcpConnection,tlsHandshake,firstByte,contentTransfer,total')

module.exports = doTiming;

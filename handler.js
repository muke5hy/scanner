"use strict";

module.exports.fetch = async function (event, context) {
  var messageCount = 0;
  if (event.Records) {
    messageCount += event.Records.length;
  }
  console.log("Message Count: ", messageCount);

  const response = {
    statusCode: 200,
    body: JSON.stringify({
      message: "SQS event processed.",
      input: event,
    }),
  };
};

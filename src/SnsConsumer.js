from 

module.exports.handler = async (event, context) => {
  let message = event.Records[0].Sns.Message;

  message = JSON.parse(message);

  return message;
};

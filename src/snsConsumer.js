const TikTokScraper = require('tiktok-scraper');
const Task = require('./tiktok.js');
const MySqs = require('./sqs_producer.js');
const Utils = require('./utils.js');

module.exports.handler = async (event, context) => {
    let message = event.Records[0].Sns.Message;
    
    message = JSON.parse(message)
    
    return message;
  };
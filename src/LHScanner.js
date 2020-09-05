const lighthouse = require('lighthouse');
const chromeLauncher = require('chrome-launcher');
const argv = require('yargs').argv;
const url = require('url');
const fs = require('fs');
const glob = require('glob');
const path = require('path');

const getHostname = (url) => {
  // use URL constructor and return hostname
  return new URL(url).hostname;
};

const LighthouseReport = async (domain) => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ['--headless'],
  });
  const options = {
    // logLevel: 'info',
    // output: "html",
    // onlyCategories: ['performance'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(domain, options);

  // `.report` is the HTML report as a string
  const reportJson = runnerResult.report;

  let file_name = getHostname(domain);
  fs.writeFileSync(`./output/${file_name}.json`, reportJson);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log('Report is done for', runnerResult.lhr.finalUrl);
  // console.log("Performance score was", JSON.stringify(runnerResult.lhr));
  fs.writeFileSync(`./output/${file_name}-metrics.json`, JSON.stringify(runnerResult.lhr));
  console.log(
    `Lighthouse scores: ${Object.values(runnerResult.categories)
      .map((c) => `${c.title} ${c.score}`)
      .join(', ')}`,
  );
  await chrome.kill();

  return runnerResult.lhr.categories.performance.score * 100;
};

module.exports = LighthouseReport;

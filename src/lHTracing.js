const lighthouse = require("lighthouse");
const chromeLauncher = require("chrome-launcher");
const argv = require("yargs").argv;
const url = require("url");
const fs = require("fs");
const glob = require("glob");
const path = require("path");

const LighthouseReport = async (domain) => {
  const chrome = await chromeLauncher.launch({
    chromeFlags: ["--headless"],
  });
  const options = {
    // logLevel: 'info',
    // output: 'json',
    // onlyCategories: ['performance'],
    port: chrome.port,
  };
  const runnerResult = await lighthouse(domain, options);

  // `.report` is the HTML report as a string
  const reportHtml = runnerResult.report;
  fs.writeFileSync(`${domain}.json`, reportHtml);

  // `.lhr` is the Lighthouse Result as a JS object
  console.log("Report is done for", runnerResult.lhr.finalUrl);
  console.log(
    "Performance score was",
    runnerResult.lhr.categories.performance.score * 100
  );

  await chrome.kill();
};

module.export = LighthouseReport;

const fs = require("fs");
const Eleventy = require("@11ty/eleventy/src/Eleventy");
const workbox = require("workbox-build");

module.exports = (options) => {
  const config = new Eleventy();
  defaultOptions = {
    swDest: `${config.outputDir}/service-worker.js`,
    globDirectory: config.outputDir,
    globPatterns: ["**/*.{html,css,js,jpg,png,gif,webp,svg,woff2,woff}"]
  };
  const opts = Object.assign({}, defaultOptions, options);
  let files = fs.readdirSync(opts.globDirectory);
  if (files.length == 0) {
    return console.error("No files that can be cached, ignoring.");
  } else {
    return workbox.generateSW(opts).then(({ count, size, warnings }) => {
      warnings.forEach(console.warn);
      size = (size / 1048576).toFixed(2);
      console.log(
        `WorkBox: ${count} files will be precached, totaling ${size} MB.`
      );
    });
  }
};
